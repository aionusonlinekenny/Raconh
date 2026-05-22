#!/usr/bin/env python3
"""
RaconH Sprite Editor  v3
─────────────────────────
• Browse texture atlas sheets
• Live preview of any sprite
• Edit frame fields directly (x, y, w, h, offX, offY, sourceW, sourceH)
• Quick-crop buttons (left / right / top / bottom)
• Multi-select sprites  (Ctrl+Click = toggle, Shift+Click = range)
• Export selected sprites to a folder in one click
• Replace PNG from Photoshop
• Save atlas + auto-bump clientVersion

Run:  python sprite_editor.py
Needs: pip install Pillow
"""

import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import json, os, shutil, glob, re
from PIL import Image, ImageTk, ImageDraw

# ── palette ───────────────────────────────────────────────────────────────────
BG      = "#1e1e2e"
PANEL   = "#2a2a3e"
ACCENT  = "#7c6af7"
ACCENT2 = "#56cfb2"
TEXT    = "#e0e0f0"
MUTED   = "#888899"
BTN     = "#3a3a5a"
BTN_H   = "#4a4a7a"
SEL     = "#3d3d6a"
RED     = "#e06060"
THUMB   = (120, 60)

# ── helpers ───────────────────────────────────────────────────────────────────
def checker(w, h, size=10):
    img  = Image.new("RGBA", (w, h), (255, 255, 255, 255))
    draw = ImageDraw.Draw(img)
    for y in range(0, h, size):
        for x in range(0, w, size):
            if (x // size + y // size) % 2:
                draw.rectangle([x, y, x+size-1, y+size-1], fill=(200, 200, 200, 255))
    return img

def on_checker(img):
    bg = checker(img.width, img.height)
    bg.paste(img, mask=img)
    return bg

def crop_sprite(atlas, f):
    c = atlas.crop((f["x"], f["y"], f["x"]+f["w"], f["y"]+f["h"]))
    canvas = Image.new("RGBA", (f["sourceW"], f["sourceH"]), (0, 0, 0, 0))
    canvas.paste(c, (f["offX"], f["offY"]))
    return canvas

def auto_trim(img):
    bbox = img.getbbox()
    if not bbox:
        return 0, 0, img
    return bbox[0], bbox[1], img.crop(bbox)

def bump_client_version(packs_dir):
    js = os.path.normpath(os.path.join(packs_dir, "..", "..", "main.min.js"))
    if not os.path.exists(js):
        return None
    with open(js, "r", encoding="utf-8") as f:
        src = f.read()
    m = re.search(r'clientVersion=(\d+)', src)
    if not m:
        return None
    nv = int(m.group(1)) + 1
    bak = js + ".bak"
    if not os.path.exists(bak):
        shutil.copy2(js, bak)
    with open(js, "w", encoding="utf-8") as f:
        f.write(src[:m.start(1)] + str(nv) + src[m.end(1):])
    return nv

def save_atlas(packs_dir, sheet, atlas_img, json_data):
    png = os.path.join(packs_dir, sheet + ".png")
    jsn = os.path.join(packs_dir, sheet + ".json")
    for p in (png, jsn):
        bak = p + ".bak"
        if not os.path.exists(bak):
            shutil.copy2(p, bak)
    atlas_img.save(png)
    with open(jsn, "w", encoding="utf-8") as f:
        json.dump(json_data, f, ensure_ascii=False, separators=(",", ":"))
    return bump_client_version(packs_dir)

def mk_btn(parent, text, cmd, accent=False, width=14):
    bg = ACCENT if accent else BTN
    b  = tk.Button(parent, text=text, command=cmd, bg=bg, fg="#fff",
                   relief="flat", bd=0,
                   font=("Segoe UI", 9, "bold" if accent else "normal"),
                   padx=8, pady=4, cursor="hand2", width=width)
    b.bind("<Enter>", lambda e: b.config(bg=ACCENT2 if accent else BTN_H))
    b.bind("<Leave>", lambda e: b.config(bg=bg))
    return b

def lbl(parent, text, size=9, color=TEXT, bold=False, **kw):
    return tk.Label(parent, text=text,
                    bg=kw.pop("bg", PANEL), fg=color,
                    font=("Segoe UI", size, "bold" if bold else "normal"), **kw)

# ── main app ──────────────────────────────────────────────────────────────────
class SpriteEditor:
    FIELDS = ("x", "y", "w", "h", "offX", "offY", "sourceW", "sourceH")

    def __init__(self, root):
        self.root        = root
        self.packs_dir   = ""
        self.sheets      = []
        self.cur_sheet   = None
        self.atlas_img   = None
        self.atlas_data  = None
        self.modified    = False
        self.thumbs      = {}
        self.cur_sprite  = None
        self.thumb_btns  = {}
        self._orig_frame = {}   # saved values before editing (for Reset)
        self._vars       = {}   # field name → IntVar
        self._preview_tk = None
        self._after_id   = None

        self.selected    = set()   # names of multi-selected sprites
        self._sorted_names = []    # ordered sprite names for Shift+range

        root.title("RaconH Sprite Editor  v3")
        root.configure(bg=BG)
        root.geometry("1280x780")
        root.minsize(1000, 640)
        self._build_ui()

    # ── UI ────────────────────────────────────────────────────────────────────
    def _build_ui(self):
        root = self.root

        # top bar
        top = tk.Frame(root, bg=BG, pady=6)
        top.pack(fill="x", padx=10)
        lbl(top, "Game Packs Folder:", bg=BG).pack(side="left")
        self.path_var = tk.StringVar(value="(not selected)")
        tk.Entry(top, textvariable=self.path_var, bg=PANEL, fg=TEXT,
                 relief="flat", font=("Segoe UI", 9), width=60,
                 insertbackground=TEXT).pack(side="left", padx=6)
        mk_btn(top, "Browse…", self._browse, width=10).pack(side="left")
        tk.Frame(top, bg=ACCENT, width=1, height=24).pack(side="left", padx=10)
        self.save_btn = mk_btn(top, "💾  Save Atlas", self._save, accent=True, width=15)
        self.save_btn.pack(side="left")

        # main paned window
        pane = tk.PanedWindow(root, orient="horizontal", bg=BG,
                              sashwidth=5, sashrelief="flat")
        pane.pack(fill="both", expand=True, padx=10, pady=(0, 10))

        # ── left: sheet list ──
        left = tk.Frame(pane, bg=PANEL, width=175)
        pane.add(left, minsize=140)
        lbl(left, "Sheets", size=10, bold=True).pack(pady=(8,4), padx=8, anchor="w")
        tk.Frame(left, bg=ACCENT, height=1).pack(fill="x", padx=8, pady=(0,4))
        lf = tk.Frame(left, bg=PANEL)
        lf.pack(fill="both", expand=True, padx=4, pady=4)
        sb = tk.Scrollbar(lf, troughcolor=PANEL, bg=PANEL)
        sb.pack(side="right", fill="y")
        self.sheet_lb = tk.Listbox(lf, bg=PANEL, fg=TEXT,
                                   selectbackground=ACCENT, selectforeground="#fff",
                                   relief="flat", bd=0, font=("Consolas", 9),
                                   yscrollcommand=sb.set, activestyle="none")
        self.sheet_lb.pack(fill="both", expand=True)
        sb.config(command=self.sheet_lb.yview)
        self.sheet_lb.bind("<<ListboxSelect>>", self._on_sheet_select)

        # ── right area ──
        right = tk.Frame(pane, bg=BG)
        pane.add(right, minsize=700)

        # sprite grid (top)
        gf = tk.Frame(right, bg=PANEL, height=240)
        gf.pack(fill="x", pady=(0, 6))
        gf.pack_propagate(False)

        # grid header row: title + selection counter + select-all buttons
        gh = tk.Frame(gf, bg=PANEL)
        gh.pack(fill="x", padx=10, pady=(6,2))
        lbl(gh, "Sprites", size=10, bold=True, bg=PANEL).pack(side="left")
        lbl(gh, "  Ctrl+Click = toggle  •  Shift+Click = range",
            size=8, color=MUTED, bg=PANEL).pack(side="left", padx=6)
        self.sel_count_var = tk.StringVar(value="")
        tk.Label(gh, textvariable=self.sel_count_var, bg=PANEL, fg=ACCENT2,
                 font=("Segoe UI", 9, "bold")).pack(side="left", padx=8)
        mk_btn(gh, "Deselect All", self._deselect_all, width=12).pack(side="right", padx=(4,0))
        mk_btn(gh, "Select All",   self._select_all,   width=10).pack(side="right")

        tk.Frame(gf, bg=ACCENT, height=1).pack(fill="x", padx=10, pady=(0,4))
        go = tk.Frame(gf, bg=PANEL)
        go.pack(fill="both", expand=True, padx=4, pady=(0,4))
        vsb = tk.Scrollbar(go, orient="vertical")
        vsb.pack(side="right", fill="y")
        hsb = tk.Scrollbar(go, orient="horizontal")
        hsb.pack(side="bottom", fill="x")
        self.grid_cv = tk.Canvas(go, bg=PANEL, relief="flat", bd=0,
                                 yscrollcommand=vsb.set, xscrollcommand=hsb.set,
                                 highlightthickness=0)
        self.grid_cv.pack(fill="both", expand=True)
        vsb.config(command=self.grid_cv.yview)
        hsb.config(command=self.grid_cv.xview)
        self.grid_inner = tk.Frame(self.grid_cv, bg=PANEL)
        self.grid_cv.create_window((0,0), window=self.grid_inner, anchor="nw")
        self.grid_inner.bind("<Configure>",
            lambda e: self.grid_cv.configure(scrollregion=self.grid_cv.bbox("all")))

        # detail panel (bottom, split into 3 columns)
        detail = tk.Frame(right, bg=PANEL)
        detail.pack(fill="both", expand=True)

        # col 1: preview
        prev_f = tk.Frame(detail, bg=PANEL, width=320)
        prev_f.pack(side="left", fill="y", padx=10, pady=10)
        prev_f.pack_propagate(False)
        lbl(prev_f, "Preview", size=10, bold=True).pack(anchor="w")
        tk.Frame(prev_f, bg=ACCENT, height=1).pack(fill="x", pady=(2,6))
        self.prev_cv = tk.Canvas(prev_f, bg="#111120", relief="flat", bd=0,
                                 highlightthickness=1, highlightbackground=ACCENT,
                                 width=300, height=160)
        self.prev_cv.pack()
        self.prev_lbl = lbl(prev_f, "No sprite selected", color=MUTED, size=8)
        self.prev_lbl.pack(pady=4)

        # col 2: frame adjuster (NEW)
        adj_f = tk.Frame(detail, bg=PANEL, width=310)
        adj_f.pack(side="left", fill="y", padx=(0,6), pady=10)
        adj_f.pack_propagate(False)
        self._build_adjuster(adj_f)

        # col 3: actions
        act_f = tk.Frame(detail, bg=PANEL)
        act_f.pack(side="left", fill="both", expand=True, padx=(0,10), pady=10)
        self._build_actions(act_f)

        # status bar
        self.status_var = tk.StringVar(value="Open a packs folder to start.")
        tk.Label(root, textvariable=self.status_var, bg=BG, fg=MUTED,
                 font=("Segoe UI", 8), anchor="w").pack(fill="x", padx=12, pady=(0,4))

    def _build_adjuster(self, parent):
        lbl(parent, "Frame Adjuster", size=10, bold=True).pack(anchor="w")
        tk.Frame(parent, bg=ACCENT, height=1).pack(fill="x", pady=(2,6))

        # ── individual field spinboxes ──
        fields_f = tk.Frame(parent, bg=PANEL)
        fields_f.pack(fill="x")

        lbl(fields_f, "Field", size=8, bold=True, color=MUTED).grid(
            row=0, column=0, sticky="w", padx=(0,4), pady=2)
        lbl(fields_f, "Value", size=8, bold=True, color=MUTED).grid(
            row=0, column=1, sticky="w", pady=2)
        lbl(fields_f, "±", size=8, bold=True, color=MUTED).grid(
            row=0, column=2, columnspan=2, pady=2)

        self._vars = {}
        FIELD_TIPS = {
            "x":       "Atlas X  — pixel column in sheet.png",
            "y":       "Atlas Y  — pixel row in sheet.png",
            "w":       "Trim W   — visible width in atlas",
            "h":       "Trim H   — visible height in atlas",
            "offX":    "Offset X — left padding in source frame",
            "offY":    "Offset Y — top padding in source frame",
            "sourceW": "Source W — full frame width on screen",
            "sourceH": "Source H — full frame height on screen",
        }
        for row, name in enumerate(self.FIELDS, start=1):
            v = tk.IntVar(value=0)
            self._vars[name] = v

            lbl(fields_f, f"{name}", size=9, color=TEXT).grid(
                row=row, column=0, sticky="w", padx=(0,8), pady=1)
            sp = tk.Spinbox(fields_f, textvariable=v, from_=-9999, to=9999,
                            width=7, bg=BTN, fg=TEXT, relief="flat",
                            insertbackground=TEXT, buttonbackground=BTN,
                            font=("Consolas", 9))
            sp.grid(row=row, column=1, padx=(0,4), pady=1, sticky="w")
            sp.bind("<Return>",    lambda e, n=name: self._apply_fields())
            sp.bind("<FocusOut>",  lambda e, n=name: self._apply_fields())

            tk.Button(fields_f, text="-1", command=lambda n=name: self._delta(n, -1),
                      bg=BTN, fg=TEXT, relief="flat", font=("Consolas", 8),
                      width=3, cursor="hand2").grid(row=row, column=2, padx=1)
            tk.Button(fields_f, text="+1", command=lambda n=name: self._delta(n, +1),
                      bg=BTN, fg=TEXT, relief="flat", font=("Consolas", 8),
                      width=3, cursor="hand2").grid(row=row, column=3, padx=1)

        # ── quick crop section ──
        tk.Frame(parent, bg=ACCENT, height=1).pack(fill="x", pady=(10, 6))
        lbl(parent, "Quick Crop  (x+N, w-N, offX+N)", size=9, bold=True).pack(anchor="w")

        crop_f = tk.Frame(parent, bg=PANEL)
        crop_f.pack(fill="x", pady=4)

        lbl(crop_f, "N =", size=9, bg=PANEL).grid(row=0, column=0, sticky="w", padx=(0,4))
        self.crop_n = tk.IntVar(value=4)
        tk.Spinbox(crop_f, textvariable=self.crop_n, from_=1, to=50,
                   width=4, bg=BTN, fg=TEXT, relief="flat",
                   insertbackground=TEXT, buttonbackground=BTN,
                   font=("Consolas", 9)).grid(row=0, column=1, padx=(0,8))
        lbl(crop_f, "pixels", size=8, color=MUTED, bg=PANEL).grid(row=0, column=2, sticky="w")

        crop_btns = tk.Frame(parent, bg=PANEL)
        crop_btns.pack(fill="x", pady=2)

        crop_defs = [
            # label,             action
            ("◀ Crop Left",  lambda: self._quick_crop("left")),
            ("Crop Right ▶", lambda: self._quick_crop("right")),
            ("▲ Crop Top",   lambda: self._quick_crop("top")),
            ("Crop Bottom ▼",lambda: self._quick_crop("bottom")),
        ]
        for i, (txt, cmd) in enumerate(crop_defs):
            mk_btn(crop_btns, txt, cmd, width=14).grid(
                row=i//2, column=i%2, padx=3, pady=2)

        # ── apply / reset row ──
        tk.Frame(parent, bg=ACCENT, height=1).pack(fill="x", pady=(8, 6))
        ar = tk.Frame(parent, bg=PANEL)
        ar.pack(fill="x")
        mk_btn(ar, "✓  Apply",  self._apply_fields, accent=True, width=12).pack(side="left", padx=(0,6))
        mk_btn(ar, "↺  Reset",  self._reset_fields, width=10).pack(side="left")

        lbl(parent,
            "Apply updates preview immediately.\n"
            "Click '💾 Save Atlas' in top bar to\n"
            "write changes to disk.",
            size=8, color=MUTED).pack(anchor="w", pady=(8,0))

    def _build_actions(self, parent):
        lbl(parent, "Sprite Info", size=10, bold=True).pack(anchor="w")
        tk.Frame(parent, bg=ACCENT, height=1).pack(fill="x", pady=(2,6))
        self.info_var = tk.StringVar(value="─")
        tk.Label(parent, textvariable=self.info_var, bg=PANEL, fg=TEXT,
                 font=("Consolas", 9), justify="left", anchor="nw").pack(anchor="w")

        tk.Frame(parent, bg=PANEL).pack(expand=True, fill="y")

        lbl(parent, "Actions", size=10, bold=True).pack(anchor="w", pady=(0,2))
        tk.Frame(parent, bg=ACCENT, height=1).pack(fill="x", pady=(0,8))

        r1 = tk.Frame(parent, bg=PANEL)
        r1.pack(fill="x", pady=3)
        mk_btn(r1, "⬇  Export PNG",    self._export,  width=16).pack(side="left", padx=(0,6))
        mk_btn(r1, "⬆  Replace PNG",   self._replace, width=16).pack(side="left")

        r2 = tk.Frame(parent, bg=PANEL)
        r2.pack(fill="x", pady=3)
        self.exp_sel_btn = mk_btn(r2, "⬇  Export Selected (0)",
                                  self._export_selected, width=24)
        self.exp_sel_btn.pack(side="left")

        r3 = tk.Frame(parent, bg=PANEL)
        r3.pack(fill="x", pady=3)
        mk_btn(r3, "📋  Export All in Sheet", self._export_all, width=22).pack(side="left")

        lbl(parent,
            "Ctrl+Click sprites to build a selection,\n"
            "then Export Selected → choose folder.\n\n"
            "Tip: Export PNG → edit in Photoshop →\n"
            "Replace PNG to inject back.\n"
            "Keep canvas size the same!",
            size=8, color=MUTED).pack(anchor="w", pady=(10,0))

    # ── folder / sheet loading ────────────────────────────────────────────────
    def _browse(self):
        p = filedialog.askdirectory(title="Select resource/packs/ folder")
        if not p:
            return
        if not glob.glob(os.path.join(p, "*.json")):
            messagebox.showwarning("Not found",
                "No .json files found.\nSelect the 'packs/' folder inside resource/.")
            return
        self.packs_dir = p
        self.path_var.set(p)
        self._load_sheet_list()

    def _load_sheet_list(self):
        self.sheet_lb.delete(0, "end")
        sheets = []
        for jp in sorted(glob.glob(os.path.join(self.packs_dir, "*.json"))):
            name = os.path.splitext(os.path.basename(jp))[0]
            if os.path.exists(os.path.join(self.packs_dir, name + ".png")):
                sheets.append(name)
        self.sheets = sheets
        for s in sheets:
            self.sheet_lb.insert("end", s)
        self._status(f"Loaded {len(sheets)} sheets")

    def _on_sheet_select(self, _=None):
        sel = self.sheet_lb.curselection()
        if not sel:
            return
        name = self.sheets[sel[0]]
        if name == self.cur_sheet:
            return
        if self.modified:
            if not messagebox.askyesno("Unsaved changes",
                    f"Discard unsaved changes in '{self.cur_sheet}'?"):
                return
        self._load_sheet(name)

    def _load_sheet(self, name):
        self.cur_sheet  = name
        self.modified   = False
        self.cur_sprite = None
        self.thumbs     = {}
        self.thumb_btns = {}
        try:
            png = os.path.join(self.packs_dir, name + ".png")
            jsn = os.path.join(self.packs_dir, name + ".json")
            self.atlas_img  = Image.open(png).convert("RGBA")
            with open(jsn, encoding="utf-8") as f:
                self.atlas_data = json.load(f)
        except Exception as e:
            messagebox.showerror("Error", str(e)); return
        self._build_grid()
        self._status(f"Sheet: {name}  ({len(self.atlas_data['frames'])} sprites)")

    # ── sprite grid ───────────────────────────────────────────────────────────
    def _build_grid(self):
        for w in self.grid_inner.winfo_children():
            w.destroy()
        self.selected.clear()
        self._update_sel_ui()
        frames = self.atlas_data["frames"]
        self._sorted_names = sorted(frames.keys())
        cols = max(1, 860 // (THUMB[0] + 12))
        for idx, name in enumerate(self._sorted_names):
            self._make_cell(name, frames[name], idx // cols, idx % cols)

    def _make_cell(self, name, frame, row, col):
        cell = tk.Frame(self.grid_inner, bg=PANEL, relief="flat",
                        highlightthickness=1, highlightbackground=PANEL,
                        cursor="hand2")
        cell.grid(row=row, column=col, padx=4, pady=4)
        self.thumb_btns[name] = cell
        try:
            sp   = crop_sprite(self.atlas_img, frame)
            bg   = checker(*THUMB, 6)
            th   = sp.copy()
            th.thumbnail(THUMB, Image.LANCZOS)
            ox   = (THUMB[0]-th.width)//2
            oy   = (THUMB[1]-th.height)//2
            bg.paste(th, (ox, oy), th)
            tki  = ImageTk.PhotoImage(bg)
            self.thumbs[name] = tki
            tk.Label(cell, image=tki, bg=PANEL, cursor="hand2").pack(padx=2, pady=(2,0))
        except Exception:
            pass
        short = name.replace("_png","").replace("_"," ")
        if len(short) > 16:
            short = short[:15]+"…"
        tk.Label(cell, text=short, bg=PANEL, fg=MUTED,
                 font=("Segoe UI", 7), cursor="hand2").pack(pady=(1,2))
        for w in [cell]+cell.winfo_children():
            w.bind("<Button-1>",         lambda e, n=name: self._click(n))
            w.bind("<Control-Button-1>", lambda e, n=name: self._ctrl_click(n))
            w.bind("<Shift-Button-1>",   lambda e, n=name: self._shift_click(n))

    def _hl_cell(self, name):
        """Repaint a single cell according to cur_sprite + selected state."""
        cell = self.thumb_btns.get(name)
        if not cell:
            return
        is_cur = (name == self.cur_sprite)
        is_sel = (name in self.selected)
        if is_cur:
            border, bg_c = ACCENT,  SEL
        elif is_sel:
            border, bg_c = ACCENT2, SEL
        else:
            border, bg_c = PANEL,   PANEL
        cell.config(highlightbackground=border, bg=bg_c)
        for ch in cell.winfo_children():
            ch.config(bg=bg_c)

    def _hl_all(self):
        """Repaint every cell (after bulk selection changes)."""
        for name in self.thumb_btns:
            self._hl_cell(name)

    # ── multi-select click handlers ───────────────────────────────────────────
    def _click(self, name):
        """Regular click → single selection, set cur_sprite."""
        self.selected = {name}
        self._select(name)      # sets cur_sprite, loads adjuster, updates preview
        self._hl_all()
        self._update_sel_ui()

    def _ctrl_click(self, name):
        """Ctrl+Click → toggle name in selection; keep cur_sprite unchanged."""
        if name in self.selected:
            self.selected.discard(name)
        else:
            self.selected.add(name)
            # Move cur_sprite to last Ctrl-clicked so adjuster stays useful
            self._select(name)
        self._hl_all()
        self._update_sel_ui()

    def _shift_click(self, name):
        """Shift+Click → range-select from cur_sprite to name."""
        if not self.cur_sprite or not self._sorted_names:
            self._click(name)
            return
        try:
            a = self._sorted_names.index(self.cur_sprite)
            b = self._sorted_names.index(name)
        except ValueError:
            self._click(name)
            return
        lo, hi = min(a, b), max(a, b)
        self.selected |= set(self._sorted_names[lo:hi+1])
        self._hl_all()
        self._update_sel_ui()

    def _select_all(self):
        if not self.cur_sheet: return
        self.selected = set(self._sorted_names)
        self._hl_all()
        self._update_sel_ui()

    def _deselect_all(self):
        self.selected.clear()
        self._hl_all()
        self._update_sel_ui()

    def _update_sel_ui(self):
        n = len(self.selected)
        if n == 0:
            self.sel_count_var.set("")
            if hasattr(self, "exp_sel_btn"):
                self.exp_sel_btn.config(text="⬇  Export Selected (0)")
        else:
            self.sel_count_var.set(f"{n} selected")
            if hasattr(self, "exp_sel_btn"):
                self.exp_sel_btn.config(text=f"⬇  Export Selected ({n})")

    # ── sprite selection ──────────────────────────────────────────────────────
    def _select(self, name):
        """Set cur_sprite (adjuster target). Does NOT change self.selected."""
        prev = self.cur_sprite
        self.cur_sprite  = name
        self._orig_frame = dict(self.atlas_data["frames"][name])
        # Repaint old and new cur_sprite cells
        if prev:
            self._hl_cell(prev)
        self._hl_cell(name)
        self._load_vars(self.atlas_data["frames"][name])
        self._refresh_preview()
        self._refresh_info()
        self._status(f"Selected: {name}  ({len(self.selected)} in export set)"
                     if self.selected else f"Selected: {name}")

    def _load_vars(self, frame):
        for k in self.FIELDS:
            self._vars[k].set(frame.get(k, 0))

    def _refresh_preview(self):
        if not self.cur_sprite:
            return
        frame = self.atlas_data["frames"][self.cur_sprite]
        try:
            sp    = crop_sprite(self.atlas_img, frame)
            disp  = on_checker(sp)
            cw, ch = 300, 160
            scale = min(cw / max(disp.width, 1), ch / max(disp.height, 1), 2.0)
            dw    = max(1, int(disp.width  * scale))
            dh    = max(1, int(disp.height * scale))
            disp  = disp.resize((dw, dh), Image.LANCZOS)
            self._preview_tk = ImageTk.PhotoImage(disp)
            self.prev_cv.delete("all")
            self.prev_cv.create_image(cw//2, ch//2, image=self._preview_tk)
            self.prev_lbl.config(
                text=f"{self.cur_sprite}  ({sp.width}×{sp.height} px)")
        except Exception as e:
            self.prev_cv.delete("all")
            self.prev_lbl.config(text=f"Preview error: {e}")

    def _refresh_info(self):
        if not self.cur_sprite:
            return
        f = self.atlas_data["frames"][self.cur_sprite]
        self.info_var.set(
            f"Name    : {self.cur_sprite}\n"
            f"Canvas  : {f['sourceW']} × {f['sourceH']} px\n"
            f"Trim    : {f['w']} × {f['h']} px\n"
            f"Offset  : ({f['offX']}, {f['offY']})\n"
            f"Atlas @ : ({f['x']}, {f['y']})\n"
            f"Sheet   : {self.cur_sheet}")

    # ── frame adjuster ────────────────────────────────────────────────────────
    def _delta(self, field, d):
        """Increment a single field by d and apply."""
        if not self._check(): return
        self._vars[field].set(self._vars[field].get() + d)
        self._apply_fields()

    def _quick_crop(self, side):
        """
        Smart crop — adjusts the linked triple so the visible sprite
        content stays at the same screen position while cutting pixels.

        Crop left  → x+N, w-N, offX+N   (skip N pixels from left in atlas)
        Crop right → w-N                 (drop N pixels from right)
        Crop top   → y+N, h-N, offY+N
        Crop bottom→ h-N
        """
        if not self._check(): return
        n = self.crop_n.get()
        if side == "left":
            self._vars["x"].set(self._vars["x"].get() + n)
            self._vars["w"].set(max(1, self._vars["w"].get() - n))
            self._vars["offX"].set(self._vars["offX"].get() + n)
        elif side == "right":
            self._vars["w"].set(max(1, self._vars["w"].get() - n))
        elif side == "top":
            self._vars["y"].set(self._vars["y"].get() + n)
            self._vars["h"].set(max(1, self._vars["h"].get() - n))
            self._vars["offY"].set(self._vars["offY"].get() + n)
        elif side == "bottom":
            self._vars["h"].set(max(1, self._vars["h"].get() - n))
        self._apply_fields()

    def _apply_fields(self):
        """Write spinbox values → JSON frame, refresh preview."""
        if not self._check(): return
        frame = self.atlas_data["frames"][self.cur_sprite]
        for k in self.FIELDS:
            frame[k] = self._vars[k].get()
        self.modified = True
        self.root.title(f"RaconH Sprite Editor  ●  {self.cur_sheet} (unsaved)")
        self._refresh_preview()
        self._refresh_info()
        self._rebuild_thumb(self.cur_sprite)
        self._status(f"✎  Modified '{self.cur_sprite}' — click 💾 Save Atlas to write.")

    def _reset_fields(self):
        """Restore fields to values at the time the sprite was selected."""
        if not self._check(): return
        self.atlas_data["frames"][self.cur_sprite] = dict(self._orig_frame)
        self._load_vars(self._orig_frame)
        self._refresh_preview()
        self._refresh_info()
        self._rebuild_thumb(self.cur_sprite)
        self._status(f"Reset '{self.cur_sprite}' to original values.")

    # ── export / replace ──────────────────────────────────────────────────────
    def _export(self):
        if not self._check(): return
        name  = self.cur_sprite
        frame = self.atlas_data["frames"][name]
        sp    = crop_sprite(self.atlas_img, frame)
        path  = filedialog.asksaveasfilename(
            title="Export sprite as PNG", initialfile=name+".png",
            defaultextension=".png", filetypes=[("PNG","*.png")])
        if not path: return
        sp.save(path)
        self._status(f"Exported: {path}")
        messagebox.showinfo("Exported",
            f"Saved to:\n{path}\n\n"
            f"Canvas: {sp.width}×{sp.height} px\n"
            f"Edit in Photoshop — keep the same canvas size!")

    def _export_selected(self):
        if not self.cur_sheet:
            messagebox.showwarning("No sheet", "Select a sheet first."); return
        if not self.selected:
            messagebox.showwarning("Nothing selected",
                "Ctrl+Click sprites to select them first."); return
        folder = filedialog.askdirectory(title=f"Export {len(self.selected)} sprites to…")
        if not folder: return
        errors = []
        for name in sorted(self.selected):
            try:
                frame = self.atlas_data["frames"][name]
                crop_sprite(self.atlas_img, frame).save(
                    os.path.join(folder, name + ".png"))
            except Exception as e:
                errors.append(f"{name}: {e}")
        n = len(self.selected) - len(errors)
        self._status(f"Exported {n}/{len(self.selected)} sprites to {folder}")
        if errors:
            messagebox.showwarning("Partial export",
                f"Exported {n} sprites.\n\nFailed:\n" + "\n".join(errors))
        else:
            messagebox.showinfo("Done ✓",
                f"Exported {n} sprite{'s' if n!=1 else ''} to:\n{folder}\n\n"
                + "\n".join(sorted(self.selected)[:20])
                + ("\n…" if len(self.selected) > 20 else ""))

    def _export_all(self):
        if not self.cur_sheet:
            messagebox.showwarning("No sheet", "Select a sheet first."); return
        folder = filedialog.askdirectory(title="Choose export folder")
        if not folder: return
        n = 0
        for name, frame in self.atlas_data["frames"].items():
            crop_sprite(self.atlas_img, frame).save(
                os.path.join(folder, name+".png"))
            n += 1
        self._status(f"Exported {n} sprites to {folder}")
        messagebox.showinfo("Done", f"Exported {n} sprites to:\n{folder}")

    def _replace(self):
        if not self._check(): return
        name  = self.cur_sprite
        frame = self.atlas_data["frames"][name]
        srcW, srcH = frame["sourceW"], frame["sourceH"]
        path = filedialog.askopenfilename(
            title=f"Replace '{name}' — select edited PNG",
            filetypes=[("PNG","*.png")])
        if not path: return
        try:
            new_img = Image.open(path).convert("RGBA")
        except Exception as e:
            messagebox.showerror("Error", str(e)); return
        if new_img.size != (srcW, srcH):
            if not messagebox.askyesno("Canvas mismatch",
                    f"Image is {new_img.width}×{new_img.height}, expected {srcW}×{srcH}.\n"
                    f"Auto-scale to fit?"):
                return
            bg = Image.new("RGBA", (srcW, srcH), (0,0,0,0))
            bg.paste(new_img.resize((srcW, srcH), Image.LANCZOS))
            new_img = bg
        nx, ny, trimmed = auto_trim(new_img)
        nw, nh = trimmed.size
        ox, oy = frame["x"], frame["y"]
        ow, oh = frame["w"], frame["h"]
        if nw > ow or nh > oh:
            if not messagebox.askyesno("Size warning",
                    f"New content ({nw}×{nh}) > original slot ({ow}×{oh}).\n"
                    f"May overlap nearby sprites. Continue?"):
                return
        clear = Image.new("RGBA", (max(ow,nw), max(oh,nh)), (0,0,0,0))
        self.atlas_img.paste(clear, (ox, oy))
        self.atlas_img.paste(trimmed, (ox, oy), trimmed)
        frame.update(offX=nx, offY=ny, w=nw, h=nh)
        self._orig_frame = dict(frame)
        self._load_vars(frame)
        self.modified = True
        self.root.title(f"RaconH Sprite Editor  ●  {self.cur_sheet} (unsaved)")
        self._rebuild_thumb(name)
        self._select(name)
        self._status(f"✓  Replaced '{name}' — click 💾 Save Atlas.")

    # ── save ──────────────────────────────────────────────────────────────────
    def _save(self):
        if not self.cur_sheet:
            messagebox.showwarning("Nothing to save", "No sheet loaded."); return
        try:
            nv = save_atlas(self.packs_dir, self.cur_sheet,
                            self.atlas_img, self.atlas_data)
        except Exception as e:
            messagebox.showerror("Save failed", str(e)); return
        self.modified = False
        self.root.title("RaconH Sprite Editor  v3")
        if nv:
            self._status(f"✓  Saved — clientVersion → {nv}")
            messagebox.showinfo("Saved ✓",
                f"Files updated:\n"
                f"  {self.cur_sheet}.png\n"
                f"  {self.cur_sheet}.json\n"
                f"  main.min.js  (clientVersion → {nv})\n\n"
                f"Press F5 in the game.")
        else:
            self._status(f"✓  Saved  (main.min.js not found — bump clientVersion manually)")
            messagebox.showwarning("Saved (partial)",
                f"Atlas saved. main.min.js not found.\n"
                f"Make sure packs/ folder is inside resource/.")

    # ── utilities ─────────────────────────────────────────────────────────────
    def _check(self):
        if not self.cur_sheet:
            messagebox.showwarning("No sheet", "Select a sheet first."); return False
        if not self.cur_sprite:
            messagebox.showwarning("No sprite", "Select a sprite first."); return False
        return True

    def _rebuild_thumb(self, name):
        cell = self.thumb_btns.get(name)
        if not cell: return
        for w in cell.winfo_children():
            w.destroy()
        frame = self.atlas_data["frames"][name]
        try:
            sp  = crop_sprite(self.atlas_img, frame)
            bg  = checker(*THUMB, 6)
            th  = sp.copy()
            th.thumbnail(THUMB, Image.LANCZOS)
            ox  = (THUMB[0]-th.width)//2
            oy  = (THUMB[1]-th.height)//2
            bg.paste(th, (ox, oy), th)
            tki = ImageTk.PhotoImage(bg)
            self.thumbs[name] = tki
            lbl_w = tk.Label(cell, image=tki, bg=cell.cget("bg"), cursor="hand2")
            lbl_w.pack(padx=2, pady=(2,0))
            lbl_w.bind("<Button-1>", lambda e, n=name: self._select(n))
        except Exception:
            pass
        short = name.replace("_png","").replace("_"," ")
        if len(short) > 16: short = short[:15]+"…"
        l = tk.Label(cell, text=short, bg=cell.cget("bg"), fg=MUTED,
                     font=("Segoe UI", 7), cursor="hand2")
        l.pack(pady=(1,2))
        l.bind("<Button-1>",         lambda e, n=name: self._click(n))
        l.bind("<Control-Button-1>", lambda e, n=name: self._ctrl_click(n))
        l.bind("<Shift-Button-1>",   lambda e, n=name: self._shift_click(n))
        # Restore correct highlight after rebuild
        self._hl_cell(name)

    def _status(self, msg):
        self.status_var.set(msg)
        self.root.update_idletasks()

    def on_close(self):
        if self.modified:
            if not messagebox.askyesno("Unsaved changes", "Exit without saving?"):
                return
        self.root.destroy()


# ── entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    root = tk.Tk()
    app  = SpriteEditor(root)
    root.protocol("WM_DELETE_WINDOW", app.on_close)
    root.mainloop()
