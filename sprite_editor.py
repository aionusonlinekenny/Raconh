#!/usr/bin/env python3
"""
RaconH Sprite Editor - GUI tool for editing game texture atlas sprites
Run: python sprite_editor.py
Requires: pip install Pillow
"""

import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import json, os, shutil, glob
from PIL import Image, ImageTk, ImageDraw

# ── constants ────────────────────────────────────────────────────────────────
THUMB_SIZE   = (120, 60)
BG_COLOR     = "#1e1e2e"
PANEL_BG     = "#2a2a3e"
ACCENT       = "#7c6af7"
ACCENT2      = "#56cfb2"
TEXT_COLOR   = "#e0e0f0"
MUTED        = "#888899"
BTN_BG       = "#3a3a5a"
BTN_HOVER    = "#4a4a7a"
SEL_BG       = "#3d3d6a"

# ── checkerboard for transparency preview ───────────────────────────────────
def make_checker(w, h, size=10):
    img = Image.new("RGBA", (w, h), (255, 255, 255, 255))
    draw = ImageDraw.Draw(img)
    for y in range(0, h, size):
        for x in range(0, w, size):
            if (x // size + y // size) % 2:
                draw.rectangle([x, y, x+size-1, y+size-1], fill=(200, 200, 200, 255))
    return img

def composite_on_checker(img):
    bg = make_checker(img.width, img.height)
    bg.paste(img, mask=img)
    return bg

# ── atlas helpers ─────────────────────────────────────────────────────────────
def load_atlas(packs_dir, sheet_name):
    png  = os.path.join(packs_dir, sheet_name + ".png")
    jsn  = os.path.join(packs_dir, sheet_name + ".json")
    atlas = Image.open(png).convert("RGBA")
    with open(jsn, "r", encoding="utf-8") as f:
        data = json.load(f)
    return atlas, data

def crop_sprite(atlas, frame):
    x, y, w, h = frame["x"], frame["y"], frame["w"], frame["h"]
    offX, offY = frame["offX"], frame["offY"]
    srcW, srcH = frame["sourceW"], frame["sourceH"]
    cropped = atlas.crop((x, y, x+w, y+h))
    canvas  = Image.new("RGBA", (srcW, srcH), (0,0,0,0))
    canvas.paste(cropped, (offX, offY))
    return canvas

def auto_trim(img):
    bbox = img.getbbox()
    if bbox is None:
        return 0, 0, img
    return bbox[0], bbox[1], img.crop(bbox)

def save_atlas(packs_dir, sheet_name, atlas_img, json_data):
    png  = os.path.join(packs_dir, sheet_name + ".png")
    jsn  = os.path.join(packs_dir, sheet_name + ".json")
    bak_png  = png  + ".bak"
    bak_json = jsn  + ".bak"
    if not os.path.exists(bak_png):
        shutil.copy2(png,  bak_png)
        shutil.copy2(jsn,  bak_json)
    atlas_img.save(png)
    with open(jsn, "w", encoding="utf-8") as f:
        json.dump(json_data, f, ensure_ascii=False, separators=(",", ":"))
    # Bump clientVersion in main.min.js — ALL sprites use ?v=clientVersion
    new_ver = _bump_client_version(packs_dir)
    return new_ver   # returns new version number or None

def _bump_client_version(packs_dir):
    """
    Find main.min.js (at game root = packs/../..) and increment clientVersion.
    This is the ONLY way to bust browser cache for sprite sheets, because
    the version controller appends ?v=clientVersion to ALL resource URLs.
    """
    import re
    game_root = os.path.normpath(os.path.join(packs_dir, "..", ".."))
    js_path   = os.path.join(game_root, "main.min.js")
    if not os.path.exists(js_path):
        return None

    with open(js_path, "r", encoding="utf-8") as f:
        content = f.read()

    m = re.search(r'clientVersion=(\d+)', content)
    if not m:
        return None

    old_ver = int(m.group(1))
    new_ver = old_ver + 1
    new_content = content[:m.start(1)] + str(new_ver) + content[m.end(1):]

    bak = js_path + ".bak"
    if not os.path.exists(bak):
        shutil.copy2(js_path, bak)

    with open(js_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    return new_ver


# ── styled widget helpers ────────────────────────────────────────────────────
def styled_btn(parent, text, cmd, accent=False, width=14):
    bg = ACCENT if accent else BTN_BG
    fg = "#ffffff"
    b  = tk.Button(parent, text=text, command=cmd,
                   bg=bg, fg=fg, relief="flat", bd=0,
                   font=("Segoe UI", 9, "bold" if accent else "normal"),
                   padx=10, pady=5, cursor="hand2", width=width)
    b.bind("<Enter>", lambda e: b.config(bg=ACCENT2 if accent else BTN_HOVER))
    b.bind("<Leave>", lambda e: b.config(bg=bg))
    return b

def label(parent, text, size=9, color=TEXT_COLOR, bold=False, **kw):
    font = ("Segoe UI", size, "bold" if bold else "normal")
    return tk.Label(parent, text=text, bg=kw.pop("bg", PANEL_BG),
                    fg=color, font=font, **kw)

# ── main application ──────────────────────────────────────────────────────────
class SpriteEditor:
    def __init__(self, root):
        self.root       = root
        self.packs_dir  = ""
        self.sheets     = []
        self.cur_sheet  = None
        self.atlas_img  = None   # current PIL Image (atlas)
        self.atlas_data = None   # current JSON dict
        self.modified   = False  # unsaved changes?
        self.thumbs     = {}     # name → ImageTk
        self.cur_sprite = None   # selected sprite name
        self.thumb_btns = {}     # name → frame widget

        root.title("RaconH Sprite Editor")
        root.configure(bg=BG_COLOR)
        root.geometry("1100x720")
        root.minsize(900, 600)

        self._build_ui()

    # ── UI construction ───────────────────────────────────────────────────────
    def _build_ui(self):
        root = self.root

        # ── top bar ──
        top = tk.Frame(root, bg=BG_COLOR, pady=6)
        top.pack(fill="x", padx=10)

        label(top, "Game Packs Folder:", bg=BG_COLOR).pack(side="left")
        self.path_var = tk.StringVar(value="(not selected)")
        tk.Entry(top, textvariable=self.path_var, bg=PANEL_BG, fg=TEXT_COLOR,
                 relief="flat", font=("Segoe UI", 9), width=55,
                 insertbackground=TEXT_COLOR).pack(side="left", padx=6)
        styled_btn(top, "Browse…", self._browse_folder, width=10).pack(side="left")

        tk.Frame(top, bg=ACCENT, width=1, height=24).pack(side="left", padx=10)
        self.save_btn = styled_btn(top, "💾  Save Atlas", self._save_atlas, accent=True, width=14)
        self.save_btn.pack(side="left")

        # ── main pane ──
        pane = tk.PanedWindow(root, orient="horizontal", bg=BG_COLOR,
                              sashwidth=5, sashrelief="flat")
        pane.pack(fill="both", expand=True, padx=10, pady=(0,10))

        # left: sheet list
        left = tk.Frame(pane, bg=PANEL_BG, width=180)
        pane.add(left, minsize=150)
        label(left, "Sheets", size=10, bold=True).pack(pady=(8,4), padx=8, anchor="w")
        tk.Frame(left, bg=ACCENT, height=1).pack(fill="x", padx=8, pady=(0,4))

        lf = tk.Frame(left, bg=PANEL_BG)
        lf.pack(fill="both", expand=True, padx=4, pady=4)
        sb = tk.Scrollbar(lf, troughcolor=PANEL_BG, bg=PANEL_BG)
        sb.pack(side="right", fill="y")
        self.sheet_lb = tk.Listbox(lf, bg=PANEL_BG, fg=TEXT_COLOR,
                                   selectbackground=ACCENT, selectforeground="#fff",
                                   relief="flat", bd=0, font=("Consolas", 9),
                                   yscrollcommand=sb.set, activestyle="none")
        self.sheet_lb.pack(fill="both", expand=True)
        sb.config(command=self.sheet_lb.yview)
        self.sheet_lb.bind("<<ListboxSelect>>", self._on_sheet_select)

        # right area
        right = tk.Frame(pane, bg=BG_COLOR)
        pane.add(right, minsize=600)

        # sprite grid (top-right)
        grid_frame = tk.Frame(right, bg=PANEL_BG, height=260)
        grid_frame.pack(fill="x", pady=(0,6))
        grid_frame.pack_propagate(False)

        label(grid_frame, "Sprites", size=10, bold=True).pack(pady=(6,2), padx=10, anchor="w")
        tk.Frame(grid_frame, bg=ACCENT, height=1).pack(fill="x", padx=10, pady=(0,4))

        grid_scroll_outer = tk.Frame(grid_frame, bg=PANEL_BG)
        grid_scroll_outer.pack(fill="both", expand=True, padx=4, pady=(0,4))
        vsb = tk.Scrollbar(grid_scroll_outer, orient="vertical")
        vsb.pack(side="right", fill="y")
        hsb = tk.Scrollbar(grid_scroll_outer, orient="horizontal")
        hsb.pack(side="bottom", fill="x")
        self.grid_canvas = tk.Canvas(grid_scroll_outer, bg=PANEL_BG,
                                     relief="flat", bd=0,
                                     yscrollcommand=vsb.set,
                                     xscrollcommand=hsb.set,
                                     highlightthickness=0)
        self.grid_canvas.pack(fill="both", expand=True)
        vsb.config(command=self.grid_canvas.yview)
        hsb.config(command=self.grid_canvas.xview)
        self.grid_inner = tk.Frame(self.grid_canvas, bg=PANEL_BG)
        self.grid_canvas.create_window((0,0), window=self.grid_inner, anchor="nw")
        self.grid_inner.bind("<Configure>",
            lambda e: self.grid_canvas.configure(scrollregion=self.grid_canvas.bbox("all")))

        # detail panel (bottom-right)
        detail = tk.Frame(right, bg=PANEL_BG)
        detail.pack(fill="both", expand=True)

        # detail left: preview
        prev_frame = tk.Frame(detail, bg=PANEL_BG, width=360)
        prev_frame.pack(side="left", fill="y", padx=10, pady=10)
        prev_frame.pack_propagate(False)
        label(prev_frame, "Preview", size=10, bold=True).pack(anchor="w")
        tk.Frame(prev_frame, bg=ACCENT, height=1).pack(fill="x", pady=(2,6))
        self.preview_canvas = tk.Canvas(prev_frame, bg="#111120",
                                        relief="flat", bd=0, highlightthickness=1,
                                        highlightbackground=ACCENT,
                                        width=340, height=180)
        self.preview_canvas.pack()
        self.prev_label = label(prev_frame, "No sprite selected",
                                color=MUTED, size=8)
        self.prev_label.pack(pady=4)

        # detail right: info + actions
        info_frame = tk.Frame(detail, bg=PANEL_BG)
        info_frame.pack(side="left", fill="both", expand=True, padx=(0,10), pady=10)

        label(info_frame, "Sprite Info", size=10, bold=True).pack(anchor="w")
        tk.Frame(info_frame, bg=ACCENT, height=1).pack(fill="x", pady=(2,8))

        self.info_var = tk.StringVar(value="─")
        tk.Label(info_frame, textvariable=self.info_var, bg=PANEL_BG, fg=TEXT_COLOR,
                 font=("Consolas", 9), justify="left", anchor="nw").pack(anchor="w")

        tk.Frame(info_frame, bg=PANEL_BG).pack(expand=True, fill="y")  # spacer

        label(info_frame, "Actions", size=10, bold=True).pack(anchor="w", pady=(0,2))
        tk.Frame(info_frame, bg=ACCENT, height=1).pack(fill="x", pady=(0,8))

        btn_row1 = tk.Frame(info_frame, bg=PANEL_BG)
        btn_row1.pack(fill="x", pady=3)
        styled_btn(btn_row1, "⬇  Export PNG", self._export_sprite, width=16).pack(side="left", padx=(0,6))
        styled_btn(btn_row1, "⬆  Replace PNG", self._replace_sprite, width=16).pack(side="left")

        btn_row2 = tk.Frame(info_frame, bg=PANEL_BG)
        btn_row2.pack(fill="x", pady=3)
        styled_btn(btn_row2, "📋  Export All in Sheet", self._export_all, width=22).pack(side="left")

        label(info_frame,
              "Tip: Export PNG → edit in Photoshop →\nReplace PNG to inject back.\n"
              "Keep canvas size the same!",
              size=8, color=MUTED).pack(anchor="w", pady=(10,0))

        # status bar
        self.status_var = tk.StringVar(value="Open a game packs folder to start.")
        tk.Label(root, textvariable=self.status_var, bg=BG_COLOR, fg=MUTED,
                 font=("Segoe UI", 8), anchor="w").pack(fill="x", padx=12, pady=(0,4))

    # ── folder browsing ───────────────────────────────────────────────────────
    def _browse_folder(self):
        path = filedialog.askdirectory(title="Select game packs/ folder")
        if not path:
            return
        jsons = glob.glob(os.path.join(path, "*.json"))
        pngs  = glob.glob(os.path.join(path, "*.png"))
        if not jsons or not pngs:
            messagebox.showwarning("Not found",
                "No .json or .png files found.\n"
                "Select the 'packs' folder inside resource/.")
            return
        self.packs_dir = path
        self.path_var.set(path)
        self._load_sheet_list()

    def _load_sheet_list(self):
        self.sheet_lb.delete(0, "end")
        sheets = []
        for jp in sorted(glob.glob(os.path.join(self.packs_dir, "*.json"))):
            name = os.path.splitext(os.path.basename(jp))[0]
            pp   = os.path.join(self.packs_dir, name + ".png")
            if os.path.exists(pp):
                sheets.append(name)
        self.sheets = sheets
        for s in sheets:
            self.sheet_lb.insert("end", s)
        self._set_status(f"Loaded {len(sheets)} sheets from {self.packs_dir}")

    # ── sheet selection ───────────────────────────────────────────────────────
    def _on_sheet_select(self, _event=None):
        sel = self.sheet_lb.curselection()
        if not sel:
            return
        name = self.sheets[sel[0]]
        if name == self.cur_sheet:
            return
        if self.modified:
            if not messagebox.askyesno("Unsaved changes",
                    f"You have unsaved changes in '{self.cur_sheet}'.\nDiscard and switch?"):
                return
        self._load_sheet(name)

    def _load_sheet(self, name):
        self.cur_sheet  = name
        self.modified   = False
        self.cur_sprite = None
        self.thumbs     = {}
        self.thumb_btns = {}
        try:
            self.atlas_img, self.atlas_data = load_atlas(self.packs_dir, name)
        except Exception as e:
            messagebox.showerror("Error", str(e)); return
        self._build_grid()
        self._set_status(f"Sheet: {name}  ({len(self.atlas_data['frames'])} sprites, "
                         f"atlas {self.atlas_img.width}×{self.atlas_img.height})")

    def _build_grid(self):
        for w in self.grid_inner.winfo_children():
            w.destroy()
        frames = self.atlas_data["frames"]
        cols = max(1, 900 // (THUMB_SIZE[0] + 12))
        for idx, (name, frame) in enumerate(sorted(frames.items())):
            col = idx % cols
            row = idx // cols
            self._make_thumb_cell(name, frame, row, col)

    def _make_thumb_cell(self, name, frame, row, col):
        cell = tk.Frame(self.grid_inner, bg=PANEL_BG,
                        relief="flat", bd=1, cursor="hand2",
                        highlightthickness=1, highlightbackground=PANEL_BG)
        cell.grid(row=row, column=col, padx=4, pady=4)
        self.thumb_btns[name] = cell

        # thumbnail
        try:
            sprite = crop_sprite(self.atlas_img, frame)
            bg_img  = make_checker(THUMB_SIZE[0], THUMB_SIZE[1], 6)
            th = sprite.copy()
            th.thumbnail(THUMB_SIZE, Image.LANCZOS)
            # center on checker
            ox = (THUMB_SIZE[0] - th.width)  // 2
            oy = (THUMB_SIZE[1] - th.height) // 2
            bg_img.paste(th, (ox, oy), th)
            tk_img = ImageTk.PhotoImage(bg_img)
        except Exception:
            tk_img = None
        if tk_img:
            self.thumbs[name] = tk_img
            tk.Label(cell, image=tk_img, bg=PANEL_BG, cursor="hand2").pack(padx=2, pady=(2,0))

        # label (truncated)
        short = name.replace("_png","").replace("_"," ")
        if len(short) > 16: short = short[:15]+"…"
        tk.Label(cell, text=short, bg=PANEL_BG, fg=MUTED,
                 font=("Segoe UI", 7), cursor="hand2").pack(pady=(1,2))

        for w in [cell] + cell.winfo_children():
            w.bind("<Button-1>", lambda e, n=name: self._select_sprite(n))

    def _highlight_thumb(self, name):
        for n, cell in self.thumb_btns.items():
            cell.config(highlightbackground=ACCENT if n==name else PANEL_BG,
                        bg=SEL_BG if n==name else PANEL_BG)
            for ch in cell.winfo_children():
                ch.config(bg=SEL_BG if n==name else PANEL_BG)

    # ── sprite selection & preview ────────────────────────────────────────────
    def _select_sprite(self, name):
        self.cur_sprite = name
        self._highlight_thumb(name)
        frame  = self.atlas_data["frames"][name]
        sprite = crop_sprite(self.atlas_img, frame)

        # preview on checker background, scaled to fit canvas (340×180)
        cw, ch = 340, 180
        display = composite_on_checker(sprite)
        scale   = min(cw / display.width, ch / display.height, 2.0)
        dw = max(1, int(display.width  * scale))
        dh = max(1, int(display.height * scale))
        display = display.resize((dw, dh), Image.LANCZOS)
        self._preview_tk = ImageTk.PhotoImage(display)
        self.preview_canvas.delete("all")
        self.preview_canvas.create_image(cw//2, ch//2, image=self._preview_tk)

        self.prev_label.config(
            text=f"{name}   ({sprite.width}×{sprite.height} px)")

        self.info_var.set(
            f"Name    : {name}\n"
            f"Canvas  : {frame['sourceW']} × {frame['sourceH']} px\n"
            f"Trim    : {frame['w']} × {frame['h']} px\n"
            f"Offset  : ({frame['offX']}, {frame['offY']})\n"
            f"Atlas @ : ({frame['x']}, {frame['y']})\n"
            f"Sheet   : {self.cur_sheet}"
        )
        self._set_status(f"Selected: {name}")

    # ── export ────────────────────────────────────────────────────────────────
    def _export_sprite(self):
        if not self._check_sprite(): return
        name   = self.cur_sprite
        frame  = self.atlas_data["frames"][name]
        sprite = crop_sprite(self.atlas_img, frame)
        default = name + ".png"
        path = filedialog.asksaveasfilename(
            title="Export sprite as PNG",
            initialfile=default,
            defaultextension=".png",
            filetypes=[("PNG Image","*.png")])
        if not path: return
        sprite.save(path)
        self._set_status(f"Exported: {path}  (canvas {sprite.width}×{sprite.height})")
        messagebox.showinfo("Exported",
            f"Saved to:\n{path}\n\n"
            f"Canvas size: {sprite.width}×{sprite.height} px\n"
            f"Edit in Photoshop — keep the same canvas size!\n"
            f"Then use 'Replace PNG' to inject back.")

    def _export_all(self):
        if not self.cur_sheet:
            messagebox.showwarning("No sheet", "Select a sheet first."); return
        folder = filedialog.askdirectory(title="Choose folder for exported sprites")
        if not folder: return
        frames  = self.atlas_data["frames"]
        count   = 0
        for name, frame in frames.items():
            sprite = crop_sprite(self.atlas_img, frame)
            sprite.save(os.path.join(folder, name + ".png"))
            count += 1
        self._set_status(f"Exported {count} sprites to {folder}")
        messagebox.showinfo("Done", f"Exported {count} sprites to:\n{folder}")

    # ── replace / inject ──────────────────────────────────────────────────────
    def _replace_sprite(self):
        if not self._check_sprite(): return
        name  = self.cur_sprite
        frame = self.atlas_data["frames"][name]
        srcW, srcH = frame["sourceW"], frame["sourceH"]

        path = filedialog.askopenfilename(
            title=f"Replace '{name}' — select edited PNG",
            filetypes=[("PNG Image","*.png")])
        if not path: return

        try:
            new_img = Image.open(path).convert("RGBA")
        except Exception as e:
            messagebox.showerror("Error", f"Cannot open image:\n{e}"); return

        # Canvas size check
        if new_img.size != (srcW, srcH):
            ans = messagebox.askyesno(
                "Canvas size mismatch",
                f"Your image is {new_img.width}×{new_img.height} px\n"
                f"Expected canvas: {srcW}×{srcH} px\n\n"
                f"Auto-scale to fit? (May distort image)\n"
                f"Press No to cancel.")
            if not ans: return
            bg = Image.new("RGBA", (srcW, srcH), (0,0,0,0))
            scaled = new_img.resize((srcW, srcH), Image.LANCZOS)
            bg.paste(scaled, (0,0))
            new_img = bg

        # Auto-trim new image
        new_offX, new_offY, trimmed = auto_trim(new_img)
        new_w, new_h = trimmed.size
        old_w, old_h = frame["w"],   frame["h"]
        old_x, old_y = frame["x"],   frame["y"]

        if new_w > old_w or new_h > old_h:
            ok = messagebox.askyesno(
                "Size warning",
                f"Trimmed content ({new_w}×{new_h}) is larger than original slot ({old_w}×{old_h}).\n"
                f"Extra pixels may overlap nearby sprites.\n\nContinue?")
            if not ok: return

        # Patch atlas image
        clear = Image.new("RGBA", (max(old_w, new_w), max(old_h, new_h)), (0,0,0,0))
        self.atlas_img.paste(clear, (old_x, old_y))
        self.atlas_img.paste(trimmed, (old_x, old_y), trimmed)

        # Update JSON frame
        frame["offX"] = new_offX
        frame["offY"] = new_offY
        frame["w"]    = new_w
        frame["h"]    = new_h

        self.modified = True
        self._rebuild_thumb(name)
        self._select_sprite(name)
        self._set_status(f"✓  Replaced '{name}' — click 'Save Atlas' to write to disk.")
        self.root.title(f"RaconH Sprite Editor  ●  {self.cur_sheet} (unsaved)")

    # ── save ──────────────────────────────────────────────────────────────────
    def _save_atlas(self):
        if not self.cur_sheet:
            messagebox.showwarning("Nothing to save", "No sheet loaded."); return
        try:
            new_ver = save_atlas(self.packs_dir, self.cur_sheet,
                                 self.atlas_img, self.atlas_data)
        except Exception as e:
            messagebox.showerror("Save failed", str(e)); return
        self.modified = False
        self.root.title("RaconH Sprite Editor")

        game_root = os.path.normpath(os.path.join(self.packs_dir, "..", ".."))
        js_path   = os.path.join(game_root, "main.min.js")

        if new_ver is not None:
            self._set_status(
                f"✓  Saved — clientVersion bumped to {new_ver} → F5 game to see changes")
            messagebox.showinfo("Saved ✓",
                f"Sprite saved and browser cache busted!\n\n"
                f"Updated files:\n"
                f"  {self.packs_dir}\\{self.cur_sheet}.png\n"
                f"  {self.packs_dir}\\{self.cur_sheet}.json\n"
                f"  {js_path}\n"
                f"      clientVersion → {new_ver}\n\n"
                f"Just press F5 in the game — no extra steps needed.")
        else:
            self._set_status(f"✓  Saved atlas. main.min.js not found at {js_path}")
            messagebox.showwarning("Saved (partial)",
                f"Atlas files saved:\n"
                f"  {self.cur_sheet}.png\n"
                f"  {self.cur_sheet}.json\n\n"
                f"⚠ main.min.js not found at:\n  {js_path}\n\n"
                f"Browse folder should be: [game]/resource/packs\n"
                f"Make sure the packs/ folder is directly inside resource/.")

    # ── helpers ───────────────────────────────────────────────────────────────
    def _check_sprite(self):
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
        frame  = self.atlas_data["frames"][name]
        try:
            sprite  = crop_sprite(self.atlas_img, frame)
            bg_img  = make_checker(THUMB_SIZE[0], THUMB_SIZE[1], 6)
            th = sprite.copy()
            th.thumbnail(THUMB_SIZE, Image.LANCZOS)
            ox = (THUMB_SIZE[0] - th.width)  // 2
            oy = (THUMB_SIZE[1] - th.height) // 2
            bg_img.paste(th, (ox, oy), th)
            tk_img = ImageTk.PhotoImage(bg_img)
            self.thumbs[name] = tk_img
            lbl = tk.Label(cell, image=tk_img, bg=cell.cget("bg"), cursor="hand2")
            lbl.pack(padx=2, pady=(2,0))
            lbl.bind("<Button-1>", lambda e, n=name: self._select_sprite(n))
        except Exception:
            pass
        short = name.replace("_png","").replace("_"," ")
        if len(short) > 16: short = short[:15]+"…"
        l = tk.Label(cell, text=short, bg=cell.cget("bg"), fg=MUTED,
                     font=("Segoe UI", 7), cursor="hand2")
        l.pack(pady=(1,2))
        l.bind("<Button-1>", lambda e, n=name: self._select_sprite(n))

    def _set_status(self, msg):
        self.status_var.set(msg)
        self.root.update_idletasks()

    def on_close(self):
        if self.modified:
            if not messagebox.askyesno("Unsaved changes",
                    "You have unsaved changes. Exit anyway?"):
                return
        self.root.destroy()


# ── entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    root = tk.Tk()
    app  = SpriteEditor(root)
    root.protocol("WM_DELETE_WINDOW", app.on_close)
    root.mainloop()
