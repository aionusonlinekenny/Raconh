# Game Chinese-to-English Translation — Session Knowledge Base

## Project Context

Vietnamese game server admin running an Egret H5 MMORPG (based on `cw.txt` binary + `main.min.js`).
Goal: Replace all Chinese strings with English without modifying server logic.

---

## File Locations

| File | Purpose |
|------|---------|
| `raconh5/client/main/bin-release/web/221211145302/resource/res/cw.txt` | Main binary game data (68 sections, ~2MB) |
| `raconh5/client/main/bin-release/web/221211145302/main.min.js` | Minified JS bundle (152 lines, ~1MB) |
| `raconh5/client/main/bin-release/web/221211145302/cw_translations.json` | Auto-generated translation map (15,783 entries) |
| `cw.txt.original` | Backup of binary before first patch (DO NOT DELETE) |

---

## cw.txt Binary Format — VERIFIED CORRECT

```
[1 byte] section_count (= 68)
For each section:
  [2 bytes BE] nameLen
  [nameLen bytes] section name (UTF-8)
  [4 bytes BE] dataLen
  [dataLen bytes] section data
```

### Language Section Internal Format (section name = "language")
```
[1 byte] tableCount
For each table:
  [2 bytes BE] nameLen + name (readUTF)
  [2 bytes BE] entryCount
  For each entry:
    [2 bytes BE] entryId
    [2 bytes BE] valueLen + value (readUTF)
```
→ Translate by **tableName + entryId** (NOT by byte offset). Key = `lang|tableName|id`.

### All Other Sections
All strings are stored as **2-byte BE length-prefixed UTF-8** (`readUTF` format).
→ Translate by **byte offset within section data**. Key = `sectionName|offset`.

### attr_desc_data Format (special)
```
[1 byte] skip
[2 bytes BE] count
For each attr:
  readUTF(fullName), readUTF(shortName), readUTF(type)
  [1 byte] id, [1 byte] format, [1 byte] showStar
```
→ AttrCVO.parse() reads: `i.name = e.readUTF()` → this is the attribute label shown in UI.

---

## Critical: .original File State

**The `.original` backup was taken AFTER sections_en.json was applied** (from an earlier session).
This means `.original` already has English:
- Item names (Gentleman's Sword, Bird King's Boots, etc.)
- Some attribute names (ATK, DEF, Pen, HP in attr_desc_data)
- Some NPC names

**Consequence**: When restoring from `.original` and applying translations, the offsets in
`cw_translations.json` that were captured from the ORIGINAL CHINESE file will NOT match
positions in `.original` (offsets shifted). Use **scan-then-patch** approach instead.

### Correct Apply Workflow
1. Start from `.original` (partially pre-translated baseline)
2. Run `apply_all_translations.py` — applies language section (table/id based) + offset-based where matching
3. Run `patch_remaining_chinese.py` — scans section bytes for Chinese, applies from TRANS dict
4. Commit both `cw.txt` and scripts

---

## JavaScript Hook — How It Works

Appended at END of `main.min.js` as an IIFE:

```javascript
(function(){
    var _m = { /* Chinese → English map */ };
    function _rep(s) { /* substring replace all keys */ }
    
    // Path 1: Rich HTML text (item tooltips, colored text)
    HtmlUtil.setTextFlow = patched;   // intercepts HTML before egret.HtmlTextParser
    HtmlUtil.addColorTag = patched;   // intercepts colored text fragments
    
    // Path 2: Plain text (labels, buttons)
    setTimeout(function() {
        egret.TextField.prototype.text setter = patched;  // intercepts .text = "..."
        egret.TextField.prototype.textFlow setter = patched; // intercepts array-based richtext
    }, 50/500/2000);  // retried 3x to ensure egret is loaded
})();
```

### Why HtmlUtil patches run immediately (not in setTimeout)
`HtmlUtil` is defined in the SAME file (at byte ~827750), so it exists when the IIFE runs.
`egret.TextField.prototype` needs a setTimeout because egret's runtime may initialize lazily.

### Known Limitation
If text is set **during scene pre-initialization** (before 50ms timeout), the `.text` setter
won't catch it. BUT tooltips open on user interaction (hover/click), always after page load.
This is NOT the actual problem — see deployment below.

---

## What Was Confirmed Working ✅

| What | How | Commit |
|------|-----|--------|
| Language section (UI labels, Power, Level, Class, all menu text) | Binary, table/id approach | d5b735d5 |
| task_data (3,980 quest strings) | Binary, offset scan | d5b735d5 |
| dungeon_data (1,369 dungeon names) | Binary, offset scan | d5b735d5 |
| arena_data (999 strings) | Binary, offset scan | d5b735d5 |
| attr_desc_data (ATK/DEF/Pen/HP labels) | Binary, special attr parser | Earlier session |
| Item names (Gentleman's Sword etc.) | Binary, sections_en.json | Earlier session |
| Gem names (Emerald Lv., Ruby Lv.) | Binary, sections_en.json | Earlier session |
| HtmlUtil.setTextFlow patch (rich HTML tooltips) | JS hook | 1ee17412 |
| Item tooltip attribute labels (ATK, DEF etc.) | Binary attr_desc_data | Earlier session |

---

## What Is Still Chinese After Latest Commit ⚠️

| Section | Count | Reason |
|---------|-------|--------|
| task_data | 1,794 | Compound binary records (multi-field), scan misses some |
| scene_data | 1,790 | Mixed offset format, most positions skipped |
| scene_robot_data | 1,008 | Bot player names — intentionally left (cosmetic) |
| text_data | 500 | Compound binary, hard to decode |
| item_data | ~400 | Gem descriptions w/ HTML, title activation descriptions |
| dungeon_data | 324 | Remaining after 1,369 applied |
| meridian_data | 215 | Partially applied |
| mon_data | 206 | Monster names |

Gem descriptions (e.g., `可在"锻造-宝石"中镶嵌\n攻击+75\n战力+300`) handled by JS hook:
- `可在"锻造-宝石"中镶嵌` → `Can be inlaid in "Forge-Gems"` (in `_m`)
- `攻击` → `ATK`, `战力` → `Power`, `气血` → `HP`, `防御` → `DEF` (all in `_m`)

---

## Scripts Reference

| Script | Purpose | Usage |
|--------|---------|-------|
| `populate_translations.py` | Extract all Chinese strings from original cw.txt → cw_translations.json | Run once on Chinese source file |
| `update_translations.py` | Add 169 more translations to cw_translations.json | Run after populate |
| `apply_all_translations.py` | Restore .original + apply all cw_translations.json entries | Run to rebuild cw.txt |
| `patch_remaining_chinese.py` | Scan current cw.txt for remaining Chinese, apply TRANS dict | Run after apply_all |
| `translate_cw.py` | Legacy full-pipeline script (sections_en + language + attr_desc) | Don't use — superseded |

---

## Deployment Instructions (XAMPP)

After committing and pushing:

```bash
# On the Windows server running XAMPP:
# 1. Open the git repo folder in File Explorer
# 2. Pull latest changes:
git pull origin claude/xampp-setup-guide-vFsWS

# 3. Copy updated game files to XAMPP web root:
#    SOURCE: <repo>/raconh5/client/main/bin-release/web/221211145302/
#    DESTINATION: C:\xampp\htdocs\<your-game-folder>\221211145302\
#    Files to copy:
#      - resource/res/cw.txt
#      - main.min.js

# 4. Hard-refresh browser (bypasses cache):
#    Chrome/Edge: Ctrl + Shift + R  (or Ctrl + F5)
#    OR open DevTools (F12) → Network tab → check "Disable cache" → reload
```

> **IMPORTANT**: Normal browser reload (F5) uses cached JS and binary files.
> You MUST do Ctrl+Shift+R or clear browser cache to see changes.

---

## Common Mistakes (Do NOT Repeat)

1. **Offset mismatch**: cw_translations.json offsets are from the CHINESE source file.
   After ANY binary translation (strings change length), all subsequent offsets shift.
   → Always use `patch_remaining_chinese.py` scan-based approach for items not in JSON.

2. **Double HtmlUtil patch**: The IIFE accidentally patches HtmlUtil.setTextFlow twice.
   Second patch wraps the already-patched version → `_rep(_rep(s))` = harmless but wasteful.
   → Keep only ONE patch block for HtmlUtil.

3. **Background agent modifying cw.txt**: Background agent tried to write to cw.txt.
   → Always use `git checkout HEAD -- cw.txt` to restore if unsure of file state.

4. **Not hard-refreshing browser after JS changes**: Browser caches main.min.js aggressively.
   → Ctrl+Shift+R after every deploy.

5. **Translating short words that appear inside English text**: e.g. '级':'Lv' would
   corrupt '蓝冥石(3级)' before the full key is matched.
   → Always put LONGER keys BEFORE shorter ones in `_m` dict.
   → Current order: `蓝冥石(3级)` before `级` — correct.

---

## Screenshot Analysis — What Each Chinese String Means

| Visible Chinese | Source | Fix |
|----------------|--------|-----|
| 攻击 | attr_desc_data name field | Binary already has "ATK" — deploy update |
| 破甲 | attr_desc_data name field | Binary already has "Pen" — deploy update |
| 气血 | attr_desc_data / item desc | Binary "HP" + JS hook '气血':'HP' |
| 强化 | Language section / item desc | Binary translated + JS hook '强化':'Enh' |
| 极品属性 | Language section OR item_data | Binary + JS hook '极品属性':'Bonus Stats' |
| 攻击增加+3% | Item bonus attribute description | JS hook '攻击增加':'ATK+' |
| 破甲增加+10% | Item bonus attribute description | JS hook '破甲增加':'Pen+' |
| 每5级命中+2 | Item per-5-level attribute | JS hook '每5级命中':'Hit/5Lv' |
| 蓝冥石(3级) | Item data OR gem data | JS hook '蓝冥石(3级)':'Sapphire Lv.3' |
| 角色 | Language section / EXML skin | Binary language section translated |
| 防御 | attr_desc_data / item desc | Binary "DEF" + JS hook |
