# RaconH — English Translation Guide

> Reference doc for translating the Egret H5 MMORPG client from Chinese to English.  
> Game engine: **Egret** (TypeScript → `main.min.js`). Server: **XAMPP** at `C:\xampp\htdocs\game\`.

---

## 1. Deployment Map

```
GitHub repo path                                               → XAMPP path (copy here)
─────────────────────────────────────────────────────────────────────────────────────
raconh5/client/main/bin-release/web/221211145302/             → C:\xampp\htdocs\game\
  index.html                                                  → game\index.html
  translate.js                                                → game\translate.js
  main.min.js                                                 → game\main.min.js
  resource/res/cw.txt                                         → game\resource\res\cw.txt
  resource/packs/<sheet>.png  +  .json                        → game\resource\packs\
  resource/game_skins/**/*.exml                               → game\resource\game_skins\
```

After copying files → **hard-refresh browser** (Ctrl+Shift+R) to bypass cache.

---

## 2. How Text Gets to the Screen — 4 Sources

### 2A. `translate.js` — Runtime JS hook (easiest to edit)

**File:** `raconh5/client/main/bin-release/web/221211145302/translate.js`  
**Loaded by:** `index.html` via `<script src="translate.js?v=N">`

Patches these Egret runtime functions at startup (+ every 500 ms for 15 s):

| Hook target | What it intercepts |
|---|---|
| `egret.TextField.prototype.text` setter | All plain text labels |
| `eui.Label.prototype.text` setter | EUI-skinned labels |
| `HtmlUtil.setTextFlow` | HTML-coloured text (item tooltips) |
| `HtmlUtil.addColorTag` | Inline colour tags |
| `AttrVoInfo.prototype.desc` | Stat strings like "气血+340" |
| `AttrCVO._data[id].name` | Attribute names (HP, ATK, DEF …) |
| `AttrDescTypeEx.getAttrName` | Attribute lookup by id |

**How `_rep()` works:**
```js
var _m = { '气血': 'HP', '攻击': 'ATK', ... };
function _rep(s) {
    for (var k in _m) if (s.indexOf(k) >= 0) s = s.split(k).join(_m[k]);
    return s;
}
```
→ Simple substring replacement on every string that flows through patched setters.

**When to add entries here:**  
Any Chinese text rendered via egret.TextField / eui.Label / HtmlUtil at runtime.

**Version bump rule:**  
Each edit → increment `document.title='EN vN'` and `<script src="translate.js?v=N">` in `index.html`.

---

### 2B. `cw.txt` — Binary data file (attr names, item descriptions, quest text)

**File:** `resource/res/cw.txt` (≈2 MB, 68 sections, binary)

**Format:**
```
[1B section_count=68]
  [2B BE name_len][name utf-8][4B BE data_len][data bytes]  × 68
```

**Key sections and what to edit:**

| Section | Content | How text is stored |
|---|---|---|
| `attr_desc_data` | Attribute names (HP, ATK…) | `readUTF name, readUTF shortName, readUTF type, 1B id…` |
| `item_data` | Item names + descriptions | Mixed binary + UTF-8 strings |
| `text_data` | System messages, errors | Mixed binary + readUTF strings |
| `open_data` | Feature unlock conditions | HTML strings: `到达剧情副本第X关后开启` |
| `task_data` | Quest names + conditions | readUTF strings |
| `dungeon_data` | Dungeon/stage names | readUTF strings |
| `boss_data` | Boss names | readUTF strings |

**Tool to inspect/edit:**

```python
# Read a section
import struct
data = open('resource/res/cw.txt', 'rb').read()
count = data[0]; pos = 1
sections = {}
for _ in range(count):
    name_len = struct.unpack_from('>H', data, pos)[0]; pos += 2
    name = data[pos:pos+name_len].decode('utf-8'); pos += name_len
    data_len = struct.unpack_from('>I', data, pos)[0]; pos += 4
    sections[name] = (pos, data_len); pos += data_len

# Search for Chinese text
target = '某段中文'.encode('utf-8')
for sname, (off, length) in sections.items():
    chunk = data[off:off+length]
    if target in chunk:
        print(f'Found in: {sname}')
```

**Script:** `translate_item_data.py` — batch-replaces Chinese substrings in `item_data`.

**Cache note:**  
`cw.txt` is loaded via `PathInfo.getPath("res/cw.txt")` with version from `resource/cw/version.zip`.  
To force browser to reload: bump the version entry for `res/cw.txt` in `version.zip → version.txt`.

---

### 2C. Texture atlas sprites — Baked-text PNG images

**Directory:** `resource/packs/<sheetname>.png` + `<sheetname>.json`

Some UI elements have Chinese text **baked into the PNG pixel art** — translate.js cannot change these. They must be re-drawn.

**JSON frame format:**
```json
{
  "frames": {
    "sprite_name_png": {
      "x": 417, "y": 524,      ← position in atlas
      "w": 92,  "h": 42,       ← trimmed pixel size
      "offX": 14, "offY": 8,   ← offset within canvas
      "sourceW": 181, "sourceH": 52  ← full canvas size
    }
  }
}
```

**Tools:**

```bash
# List all sprites in a sheet
python3 sprite_tool.py list loginsheet

# Extract sprites to sprites/<sheet>/ for editing
python3 sprite_tool.py extract loginsheet
python3 sprite_tool.py extract loginsheet login_serverTitle_png   # single sprite

# Inject edited sprite back into atlas
python3 sprite_tool.py inject loginsheet login_serverTitle_png
```

**GUI editor:** `sprite_editor.py` — Tkinter GUI, browse to `resource/packs`, pick sheet, pick sprite, draw replacement, Save Atlas (auto-bumps `clientVersion`).

**Auto-generate English sprites:** `make_sprites.py` — PIL script that:
1. Loads original sprite as background
2. Samples bg colour from borders
3. Erases old text area with bg fill
4. Draws English text at a font size that fits within original trimmed bounds
5. Saves to `sprites/<sheet>/sprite.png` ready for `sprite_tool.py inject`

**clientVersion cache mechanism:**  
Every sprite load goes through:
```js
t.getVirtualUrl = function(t) {
    return t + "?v=" + Manager.config.clientVersion;
}
```
→ `Save Atlas` in `sprite_editor.py` / `make_sprites.py` auto-increments `clientVersion=N` in `main.min.js`.  
→ Manual inject: run `sprite_tool.py inject` then manually bump `clientVersion` in `main.min.js`.

**Known baked-text sprites:**

| Sheet | Sprite | Original text | Status |
|---|---|---|---|
| `loginsheet` | `login_serverTitle_png` | 选择区服 | ⏳ needs sprite edit |
| `loginsheet` | `login_btnStart_png` | 开始游戏 | ✅ already English in skin |
| `bosssheet` | `boss_title_1_png` | 全民 | ⏳ needs sprite edit |
| `bosssheet` | `boss_title_2_png` | 珍稀掉落 | ⏳ needs sprite edit |
| `activitysheet` | `activity_title_0_png` | 任务 | ⏳ needs sprite edit |
| `activitysheet` | `activity_title_1_png` | 九霄塔 | ⏳ needs sprite edit |
| `activitysheet` | `activity_title_2_png` | 演武场 | ⏳ needs sprite edit |
| `activitysheet` | `activity_title_3_png` | 金玉堂 | ⏳ needs sprite edit |
| `mainsheet` | `main_icon_role_png` | 人物 | ✅ done |
| `mainsheet` | `main_icon_forging_png` | 锻造 | ✅ done |
| `mainsheet` | `main_icon_skill_png` | 技能 | ✅ done |
| `mainsheet` | `main_icon_bag_png` | 背包 | ✅ done |
| `rolesheet` | `role_checkAttr_png` | 查看属性 | ✅ done |
| `rolesheet` | `role_onkeyEquip_png` | 一键装备 | ✅ done |

---

### 2D. EUI skin files `.exml` — Layout, label text, field widths

**Directory:** `resource/game_skins/**/*.exml`

Egret UI skin XML files define widget positions, sizes, and **default text content** for labels.

**When to edit:**
- Default label text is still Chinese in the EXML
- A text field is **too narrow** and word-wraps English text (e.g. "Switch Server" wrapping)
- Need to reposition a label

**Key EXML files edited:**

| File | What was fixed |
|---|---|
| `login/LoginViewSkin.exml` | `_txtClick` width 122→210 so "Switch Server" fits on one line |

**Example — fix wrapping by widening a label:**
```xml
<!-- Before -->
<ns1:Label id="_txtClick" text="Switch Server" x="514" width="122" .../>

<!-- After — widened so text fits on one line -->
<ns1:Label id="_txtClick" text="Switch Server" x="510" width="210" .../>
```

**Note:** Both copies must be kept in sync:
- `raconh5/client/main/bin-release/web/221211145302/resource/game_skins/…` ← deployed
- `raconh5/client/main/resource/game_skins/…` ← source

---

## 3. Quick Reference — Where Does Each Text Come From?

| Text seen in game | Source type | File / Location | Fix method |
|---|---|---|---|
| Attribute names (HP, ATK, DEF…) | `cw.txt` `attr_desc_data` | `resource/res/cw.txt` | Edit binary + translate.js `_an` dict |
| Item names / descriptions | `cw.txt` `item_data` | `resource/res/cw.txt` | `translate_item_data.py` batch replace |
| Quest names | `cw.txt` `task_data` | `resource/res/cw.txt` | Binary edit or translate.js |
| Dungeon unlock condition ("第X关后开启") | `cw.txt` `open_data` | `resource/res/cw.txt` | translate.js: `'到达剧情副本第':'Reach Story Ch.'` |
| Feature names (锻造, 背包…) | `cw.txt` `open_data` | `resource/res/cw.txt` | translate.js `_m` dict |
| System messages / errors | `cw.txt` `text_data` | `resource/res/cw.txt` | translate.js or binary edit |
| Stat line "气血+340" | JS runtime (`AttrVoInfo.desc`) | `main.min.js` | translate.js `AttrVoInfo.prototype.desc` patch |
| Button labels, panel titles | JS runtime (egret.TextField) | `main.min.js` | translate.js `_m` dict |
| Bottom nav icons (Char/Skill…) | Baked PNG | `packs/mainsheet.png` | sprite_tool.py inject |
| "Select Server" button | Baked PNG | `packs/loginsheet.png` → `login_serverTitle_png` | sprite_tool.py inject |
| "Account:" login label | EXML default text | `game_skins/login/LoginViewSkin.exml` | Already English; translate.js also covers it |
| "Switch Server" label | EXML default text | `game_skins/login/LoginViewSkin.exml` | Widen `width` attribute |
| Server name "脚本王1区" | Hardcoded JS + API | `main.min.js` line with `setServer({name:…})` | Edit string directly; live name from `server_list.php` |
| Logo / game title image | Baked PNG (background art) | Various art sheets | Replace image manually |
| Server name (live) | Server-side API | `server_list.php` on game server | Edit PHP/database on server |

---

## 4. translate.js Dictionary — Current Mappings

**File:** `raconh5/client/main/bin-release/web/221211145302/translate.js`

**Current version:** v5  
**Confirm loaded:** browser tab title shows **"EN v5"**

### Attribute IDs (`_an` dict — maps numeric id → English name)
```
10=Speed  11=Max HP  12=HP  13=ATK  14=DEF  15=Pen
16=Hit    17=Eva     18=Crit 19=TEN  20=HP Regen
21=EXP+   22=DMG+    23=DMG- 24=Crit% 25=CritRes
26=CritDMG+ 27=CritDMG- 28=Hit% 29=Eva% 30=HP% 31=ATK% 32=DEF% 33=Pen%
```

### String replacements (`_m` dict — key categories)
- Login/server: `账号→Account`, `点击换服→Switch Server`, `选择区服→Select Server`
- Dungeon: `到达剧情副本第→Reach Story Ch.`, `关后开启→to unlock`
- Gear/forge: `强化→Enh`, `铸魂→Soul Cast`, `镶嵌→Inlay`, `宝石→Gem`
- Stats: `气血→HP`, `攻击→ATK`, `防御→DEF`, `破甲→Pen`, `闪避→Eva`, `暴击→Crit`
- Items: `普通→Normal`, `精良→Elite`, `史诗→Epic`, `传说→Legendary`
- Gems: `蓝冥石(Nlevel)→Sapphire Lv.N`, `血精石(Nlevel)→Blood Crystal Lv.N`
- Features: `墨宠→Pet`, `绝学→Skills`, `盟会→Guild`, `任务→Quest`, `演武场→Arena`

---

## 5. Workflow for Adding New Translations

### Text visible at runtime (egret.TextField / HtmlUtil)
1. Note the Chinese text shown in game
2. Open `translate.js` in the repo
3. Add entry to `_m`: `'原文': 'English'`
4. Bump version: `document.title='EN vN+1'` and `index.html` script tag `?v=N+1`
5. Push → copy `translate.js` + `index.html` to XAMPP → hard refresh

### Text baked into a PNG sprite
1. Find which sheet contains it:
   ```bash
   python3 sprite_tool.py list <sheetname>
   ```
2. Extract the sprite:
   ```bash
   python3 sprite_tool.py extract <sheetname> <sprite_name>
   # → saved to sprites/<sheetname>/<sprite_name>.png
   ```
3. Edit in Photoshop (keep canvas size = `sourceW × sourceH`)
4. Inject back:
   ```bash
   python3 sprite_tool.py inject <sheetname> <sprite_name>
   ```
5. Manually bump `clientVersion=N` → `N+1` in `main.min.js`
6. Push → copy updated `<sheetname>.png` + `<sheetname>.json` + `main.min.js` to XAMPP

### Text in cw.txt binary data
1. Run search script (see Section 2B) to find which section
2. Use `translate_item_data.py` for `item_data` batch replacements
3. For other sections: binary patch with Python `data.replace(old.encode(), new.encode())`
4. Save file, push, copy to XAMPP
5. Bump `res/cw.txt` version in `version.zip` if game still serves cached version

### Text field word-wrapping
1. Find the skin EXML: `resource/game_skins/**/*.exml`
2. Locate the label by its `id` attribute
3. Increase the `width` value until text fits on one line
4. Update both copies:
   - `bin-release/web/221211145302/resource/game_skins/…`
   - `raconh5/client/main/resource/game_skins/…`
5. Push → copy EXML to XAMPP

---

## 6. Files Modified (Full List)

| File | Purpose |
|---|---|
| `index.html` | Loads translate.js; bumped `?v=` each update |
| `translate.js` | Runtime hook — Chinese→English string replacement |
| `main.min.js` | Compiled game JS — edited clientVersion, hardcoded server name |
| `resource/res/cw.txt` | Binary data — attr names, item data translated |
| `resource/cw/version.zip` | Contains version.txt — bumped cw.txt version to force reload |
| `resource/packs/mainsheet.png` + `.json` | Bottom nav icons (Char/Skill/Forge/Bag) |
| `resource/packs/rolesheet.png` + `.json` | Role panel buttons (View Attrs / One-key Equip) |
| `resource/game_skins/login/LoginViewSkin.exml` | Widened Switch Server label |
| `translate_item_data.py` | Script: batch translate item_data in cw.txt |
| `sprite_tool.py` | CLI: list / extract / inject atlas sprites |
| `sprite_editor.py` | GUI: visual sprite editor with atlas save |
| `make_sprites.py` | Script: auto-generate English replacement sprites via PIL |

---

## 7. Important Rules & Gotchas

1. **Never resize sprite canvas.** `sourceW × sourceH` must stay the same after Photoshop edit. Only the content within changes.

2. **New sprite must not exceed original trimmed bounds.** If `new_w > old_w` or `new_h > old_h`, the sprite overlaps neighbours in the atlas and corrupts them. Use `make_sprites.py` which enforces this constraint.

3. **clientVersion controls sprite cache.** Bumping `clientVersion=N` in `main.min.js` forces all sprites to reload. Do this after every atlas change.

4. **translate.js runs before game classes load.** The `setInterval(_patch, 500)` loop re-applies hooks until 15 s after load to catch late-initialized classes. If a class isn't available by then, add a longer timeout or hook it differently.

5. **HtmlUtil text bypasses `.text` setter.** Stat lines like "气血+340" are built as HTML and passed to `HtmlUtil.setTextFlow`, not `.text`. Both hooks are needed.

6. **Server name has two sources.** The hardcoded fallback `{name:"Server 1"}` in `main.min.js` is shown when `server_list.php` API is unreachable. Live name comes from the server API — edit there for permanent change.

7. **EXML changes take effect immediately** (no clientVersion bump needed — EXMLs are loaded as plain text resources, not cached via clientVersion).

8. **Backup files (`.bak`) are gitignored.** `sprite_tool.py inject` auto-creates `.bak` on first run. They stay local only.
