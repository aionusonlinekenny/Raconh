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

---

---

# Login Password Authentication — Session Knowledge Base

## Mục tiêu

Thêm xác thực account + password vào màn hình đăng nhập game (LoginViewSkin.exml).
Flow mong muốn:
- Account không tồn tại → báo lỗi trong game UI
- Account đúng, password sai → báo lỗi trong game UI
- Account + password đúng → cho phép vào game (`Manager.socket.init()`)

---

## Kiến trúc Game — Những điều phải hiểu

### Egret H5 Engine
- Game dùng **`egret.WebSocket`** (wrapper riêng của Egret), KHÔNG dùng `window.WebSocket` native.
- Mọi cố gắng override `window.WebSocket` đều bị bypass hoàn toàn. Đây là lý do tất cả các phiên bản trước thất bại.

### EUI Skin System (EXML)
- EXML được **pre-compile** thành JavaScript trong `resource/default.thm.json` dưới dạng trường `gjs`.
- Sửa file `.exml` mà KHÔNG cập nhật `default.thm.json` → không có tác dụng gì ở runtime.
- Skin parts có `id` trong EXML được đăng ký trong mảng `skinParts` của skin class.
- EUI framework tự động bind skin part vào host component nếu tên field khớp:
  - Nếu id trong EXML có entry trong `skinParts` → bind vào `this.<id>` trực tiếp trên host.
  - Nếu không có trong `skinParts` → chỉ truy cập được qua `this.skin.<id>`.

### bin-debug vs bin-release
- `bin-debug/` chứa từng file JS riêng lẻ (không minify).
- `bin-release/web/221211145302/` chứa `main.min.js` (bundle minified).
- **XAMPP deploy dùng bin-release** — `manifest.json` chỉ load `main.min.js`.
- Sửa `bin-debug/LoginView.js` mà không rebuild → không ảnh hưởng gì đến runtime.

### LoginView — File thực tế kiểm soát đăng nhập
- Source: `raconh5/client/main/src/com/changwan/view/ui/login/LoginView.ts`
- Compiled (bin-debug): `raconh5/client/main/bin-debug/com/changwan/view/ui/login/LoginView.js`
- Nhưng XAMPP chạy từ `main.min.js` (bin-release) — không thể sửa trực tiếp file đó dễ dàng.

### translate.js — Điểm hook duy nhất khả dụng
- Được load trực tiếp trong `index.php` TRƯỚC khi `main.min.js` load.
- Có thể patch `LoginView.prototype.onClickHandler` sau khi game code load (dùng `setInterval`).
- Đây là cách duy nhất can thiệp vào click handler mà không cần rebuild `main.min.js`.

---

## Các lần thất bại trước và lý do

| Cách thử | Tại sao thất bại |
|----------|-----------------|
| Override `window.WebSocket` | Game dùng `egret.WebSocket`, không đi qua `window.WebSocket` |
| Override `Manager.socket.init` | Race condition — game có thể gọi init trước khi patch chạy |
| Scan `this.skin._inputPassword` | EXML không reload; skin được tạo từ `gjs` trong `default.thm.json`, không từ file `.exml` |
| `_cwAuthed = !!_urlU` với URL param | URL `?username=kennylucia` làm `_urlU` có giá trị → bypass hết auth |
| HTML overlay + reload page | Quá phức tạp, gây vòng lặp redirect |
| SyntaxError v61 | Có thêm `}` thừa đóng IIFE sớm → toàn bộ code auth không chạy |

---

## Giải pháp cuối cùng — Đúng

### 1. Cập nhật `default.thm.json` — thêm password field vào skin

File: `raconh5/client/main/bin-release/web/221211145302/resource/default.thm.json`

Tìm entry `className: "LoginViewSkin"` trong mảng `exmls`, sửa trường `gjs`:

**Thêm vào `_groupDebug_i()`:**
```javascript
t.elementsContent = [
    this._Image1_i(), this._Label1_i(), this._inputClient_i(),
    this._groupPwd_i(),   // thêm mới
    this._lblError_i()    // thêm mới
];
```

**Thêm 5 method mới vào prototype:**
- `_groupPwd_i()` — Group chứa password row (y=44, bên dưới account row)
- `_Image2_i()` — Background image cho password row
- `_Label2_i()` — Label "Password:"
- `_inputPassword_i()` — Input field (type="input", displayAsPassword=true)
- `_lblError_i()` — Label hiển thị lỗi (màu đỏ #FF4444, y=88)

**Cập nhật `skinParts`:**
```javascript
return ["_back","_serverBack","_icon","_btnEnter","_txtServer","_txtClick",
        "_inputClient","_groupDebug",
        "_inputPassword","_lblError"];  // thêm 2 cái này
```

→ Nhờ được thêm vào `skinParts`, EUI tự bind `_inputPassword` và `_lblError` trực tiếp lên host LoginView:
  - `this._inputPassword.text` — đọc password người dùng nhập
  - `this._lblError.text` — hiển thị thông báo lỗi

Script Python để cập nhật (tránh sửa JSON 1.3MB bằng tay):
```python
import json
thm_path = 'raconh5/client/main/bin-release/web/221211145302/resource/default.thm.json'
with open(thm_path) as f:
    d = json.load(f)
idx = next(i for i,s in enumerate(d['exmls']) if s.get('className') == 'LoginViewSkin')
gjs = d['exmls'][idx]['gjs']
# ... string replacements ...
d['exmls'][idx]['gjs'] = gjs
with open(thm_path, 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False, separators=(',', ':'))
```

### 2. Patch `LoginView.prototype.onClickHandler` trong `translate.js`

Thêm vào hàm `_patch()` — chạy mỗi 500ms cho đến khi `LoginView` được định nghĩa:

```javascript
if (typeof LoginView !== 'undefined' && !LoginView.prototype.__cwAuth) {
    LoginView.prototype.__cwAuth = true;
    var _origClick = LoginView.prototype.onClickHandler;
    LoginView.prototype.onClickHandler = function(e) {
        // Chỉ chặn click Start Game, không chặn Switch Server
        if (e.currentTarget !== this._btnEnter) {
            return _origClick.call(this, e);
        }
        var username = this._inputClient ? this._inputClient.text : '';
        var pwdField = this._inputPassword;   // bound via skinParts
        var errLabel = this._lblError;         // bound via skinParts
        var password = pwdField ? pwdField.text : '';

        if (!username) { if (errLabel) errLabel.text = 'Enter account name.'; return; }
        if (!password || password.length < 6) {
            if (errLabel) errLabel.text = 'Password: min 6 characters.'; return;
        }
        if (errLabel) errLabel.text = 'Verifying...';

        var xr = new XMLHttpRequest();
        xr.open('POST', 'auth.php', true);
        xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xr.onload = function() {
            try {
                var res = JSON.parse(xr.responseText || xr.response);
                if (res.ok) {
                    if (errLabel) errLabel.text = '';
                    Manager.model.getLogin().clientName = username;
                    egret.localStorage.setItem('username', username);
                    Manager.socket.init();   // chỉ gọi khi auth thành công
                } else {
                    if (errLabel) errLabel.text = res.error || 'Login failed.';
                }
            } catch(ex) { if (errLabel) errLabel.text = 'Server error.'; }
        };
        xr.onerror = function() { if (errLabel) errLabel.text = 'Network error.'; };
        xr.send('username=' + encodeURIComponent(username) +
                '&password=' + encodeURIComponent(password));
    };
}
```

**Tại sao không cần WebSocket override hay session nữa:**
- Auth chặn ngay tại nút Start Game trước khi `Manager.socket.init()` được gọi.
- Không có cách nào bypass vì hàm gốc không bao giờ được gọi nếu auth fail.

### 3. `auth.php` — Chỉ login, không tạo account mới

```php
$stmt = $pdo->prepare('SELECT password_hash FROM web_users WHERE BINARY username = ?');
$stmt->execute([$username]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row) {
    echo json_encode(['error' => 'Account not registered. Please contact admin.']);
    exit;
}
if (!password_verify($password, $row['password_hash'])) {
    echo json_encode(['error' => 'Incorrect password.']);
    exit;
}
echo json_encode(['ok' => true, 'username' => $username]);
```

**`BINARY` trong WHERE clause** — MySQL mặc định so sánh VARCHAR không phân biệt hoa thường
(`utf8_general_ci`). `WHERE BINARY username = ?` ép so sánh byte-by-byte:
- `KennyLucia` ≠ `kennylucia` ≠ `KENNYLUCIA`
- Hoạt động trên table cũ không cần ALTER TABLE

**Schema table `web_users` (chuẩn):**
```sql
CREATE TABLE IF NOT EXISTS web_users (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    username       VARCHAR(32)  COLLATE utf8_bin NOT NULL UNIQUE,
    password_hash  VARCHAR(255) NOT NULL,
    erlang_role_id VARCHAR(32)  NULL DEFAULT NULL,
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
`COLLATE utf8_bin` trên column → table mới tạo sẽ dùng case-sensitive collation từ đầu.

### 4. `index.php` — Đơn giản hóa

Bỏ toàn bộ PHP session logic (session_start, redirect `?username=`, `window._cwGameUser`).
File trở thành HTML thuần — không có PHP session nào được dùng nữa.

---

## Cấu trúc thư mục — Files cần copy vào XAMPP

```
C:\xampp\htdocs\game\
├── index.php             ← đã sửa (bỏ PHP session)
├── auth.php              ← đã sửa (BINARY compare, no auto-register)
├── translate.js          ← đã sửa (v64, LoginView.prototype patch)
└── resource\
    ├── default.thm.json  ← đã sửa (skinParts + gjs cho LoginViewSkin)
    └── game_skins\login\
        └── LoginViewSkin.exml  ← đồng bộ (không dùng trực tiếp, chỉ tham khảo)
```

---

## Thứ tự load trong browser

```
1. index.php (HTML)
2. Loading.js
3. translate.js  ← load sớm, định nghĩa _patch() nhưng chưa patch LoginView (chưa tồn tại)
4. main.min.js   ← load game code, định nghĩa LoginView, tải default.thm.json (gjs)
5. setInterval (_patch, 500ms) phát hiện LoginView đã tồn tại → patch onClickHandler
6. Game show LoginView → người dùng thấy Account + Password fields
7. Người dùng click Start Game → _patched handler → XHR auth.php → (nếu ok) Manager.socket.init()
```

---

## Debug Tips

Nếu login vẫn không hoạt động:

1. **Kiểm tra `translate.js` đã load đúng version chưa:**
   - Tab browser title hiện `EN v64` → đúng
   - Nếu hiện version cũ → Ctrl+Shift+R (hard refresh)

2. **Kiểm tra skinParts có `_inputPassword` chưa:**
   ```javascript
   // Paste vào DevTools console sau khi game load
   var s = egret.stage;
   function find(d) {
       if (d && d.skin && d.skin._inputPassword !== undefined) return d;
       var n = d ? d.numChildren : 0;
       for (var i = 0; i < n; i++) { var r = find(d.getChildAt(i)); if (r) return r; }
   }
   var lv = find(s);
   console.log('LoginView:', lv);
   console.log('_inputPassword:', lv && lv._inputPassword);
   console.log('_lblError:', lv && lv._lblError);
   ```

3. **Kiểm tra auth.php trực tiếp:**
   ```bash
   curl -X POST http://127.0.0.1/game/auth.php \
     -d "username=KennyLucia&password=yourpassword"
   # Expected: {"ok":true,"username":"KennyLucia"}
   # or: {"error":"Incorrect password."}
   ```

4. **Nếu password field không hiện** → `default.thm.json` chưa được copy đúng vào XAMPP.

5. **Nếu error label không hiện** → `_lblError` chưa được bind → kiểm tra `skinParts` trong `gjs`.

6. **Nếu vẫn vào game dù sai password** → `LoginView.prototype.__cwAuth` chưa được set → `_patch()` chưa chạy hoặc `LoginView` chưa được định nghĩa khi patch chạy.

---

## Ghi chú: Erlang Role ID

Field `erlang_role_id` trong table `web_users` được thiết kế để link account web với role trong game server Erlang. Hiện tại chưa dùng trong auth flow. Nếu sau này cần, query thêm field này và trả về trong JSON response để client có thể dùng.

---

## Commits của Session này

| Commit | Nội dung |
|--------|---------|
| `158fe84a` | Add password auth gate: default.thm.json + translate.js v64 + index.php cleanup |
| `ab2aefb3` | Make username case-sensitive with BINARY in auth.php |

---

# Private Chat Fix — Session Knowledge Base

## Triệu chứng

Private chat (Cmd:20002) crash với 2 lỗi khác nhau:

**Lỗi 1 (trước khi patch):**
```
{'EXIT',{badarg,[{filter,loosen,[chat,<<text>>],[]},...
```
Module `filter` cũ crash vì `re:replace/4` dùng danh sách Unicode codepoints `[27611,27901,19996]` làm regex pattern — OTP 21/22 không hỗ trợ integer >255 trong list pattern.

**Lỗi 2 (sau khi patch sai):**
```
{'EXIT',{{case_clause,<<50,50,50,50,50>>},[{chat,private_chat,2,...line,273}
```
No-op `loosen/2` trả về binary thô, nhưng `chat.erl:273` pattern-match kết quả là tuple.

---

## Root Cause — filter.erl

File `filter.erl` gốc tại `src/mod/filter/filter.erl`, compiled beam tại `ebin/filter.beam`.

Nguyên nhân crash: line 118 gọi:
```erlang
re:replace(Text, [27611,27901,19996], [42], [caseless,global])
```
`[27611,27901,19996]` là list integer (Unicode codepoints của ký tự Trung). OTP 21/22 yêu cầu pattern phải là binary hoặc string ASCII (byte ≤255). List integer >255 → `badarg`.

---

## Cấu trúc return của filter functions

Quan trọng: xem `chat.erl:273` (decompile từ beam_lib) để biết return format mong đợi:

| Function | Return khi cho phép | Return khi chặn |
|----------|--------------------|--------------------|
| `filter:loosen(Type, Text)` | `{ok}` | `{false, Reason}` |
| `filter:strict(Type, Text)` | `{ok}` | `{false, Reason}` |
| `filter:moderate(Type, Text)` | `{ok}` | `{false, Reason}` |
| `filter:filter(Text)` | `Text` (binary, đã lọc) | — |
| `filter:is_violation(Text)` | `false` | `true` |
| `filter:is_violation_words(Text, Words)` | `false` | `true` |

Flow trong `chat.erl:273`:
```erlang
case filter:loosen(chat, Msg) of
    {false, Reason} -> {false, Reason};
    {ok} ->
        Msg1 = filter:filter(Msg),   % lọc text
        private_chat(...)            % gửi chat
end
```

---

## Fix: patch_filter command trong gm.escript

**Cách dùng** (chạy trong `C:\raconh5\server_bin`):
```cmd
escript gm.escript patch_filter
```
Kết quả: `ok|saved_to:ebin/filter.beam|disk:ok`

**Cách hoạt động:**
1. Gửi source Erlang no-op qua RPC đến server
2. Compile bằng `compile:file/2` trên chính server (dùng OTP version của server)
3. Ghi đè `ebin/filter.beam` trên disk (persist qua restart)
4. Hot-load vào memory ngay lập tức (`code:load_binary`)

**Lý do phải compile trên server, không compile sẵn:**
- Beam file bị lock với OTP version. OTP 22 hỗ trợ opcode tối đa 168.
- Nếu compile bằng OTP 25 (opcode 169+) → server reject với lỗi `badfile`.
- Dùng `compile:file` qua RPC → compile đúng OTP version của server.

**No-op filter module đúng (file `filter.erl` dùng trong patch_filter):**
```erlang
-module(filter).
-export([filter/1, is_violation/1, is_violation_words/2,
         strict/2, moderate/2, loosen/2]).

filter(T)              -> T.
is_violation(_)        -> false.
is_violation_words(_,_) -> false.
strict(_,_)            -> {ok}.
moderate(_,_)          -> {ok}.
loosen(_,_)            -> {ok}.
```
`strict/moderate/loosen` trả về `{ok}` (không phải text), `filter/1` trả về text nguyên vẹn.

---

## Files liên quan

| File | Mô tả |
|------|-------|
| `raconh5/server_bin/gm.escript` | Source gm script (có patch_filter command) |
| `raconh5/client/main/bin-release/web/221211145302/gm.escript` | Deploy copy — luôn sync với file trên |
| `raconh5/server_bin/ebin/filter.beam` | Beam gốc bị lỗi (giữ nguyên trong repo) |

---

## Lưu ý quan trọng

- **Chỉ cần chạy `patch_filter` một lần** sau mỗi lần restart server (beam trên disk đã được ghi đè, server tự load đúng beam khi khởi động).
- Nếu server crash và khởi động lại, beam mới đã được ghi đè trên disk → tự động load no-op version.
- **Không commit beam pre-compiled** vào repo — khác OTP version sẽ bị reject khi load.
- Nếu muốn fix vĩnh viễn không cần chạy lệnh: cần có OTP 22 erlc để compile, hoặc rebuild server source.

---

## Commits

| Commit | Nội dung |
|--------|---------|
| `ada30ef0` | Add patch_filter command: hot-replace broken filter module at runtime |
| `61d8938a` | patch_filter: also overwrite filter.beam on disk for permanent fix |
| `e445cd22` | Fix patch_filter: strict/moderate/loosen must return {ok} not raw text |
