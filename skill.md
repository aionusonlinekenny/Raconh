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

**Stack: XAMPP (Apache) on Windows. NOT phpstudy_pro. NOT nginx.**

After committing and pushing:

```
# On the Windows server running XAMPP:
# 1. Pull latest changes in git repo folder:
git pull origin claude/xampp-setup-guide-vFsWS

# 2. Copy updated game files to XAMPP web root:
#    SOURCE: <repo>/raconh5/client/main/bin-release/web/221211145302/
#    DESTINATION: C:\xampp\htdocs\<your-game-folder>\
#    Files that change often:
#      - resource/res/cw.txt        (binary translations)
#      - translate.js               (JS hook translations)
#      - resource/default.thm.json  (skin/UI changes)
#      - admin.php                  (admin panel updates)

# 3. Hard-refresh browser (bypasses cache):
#    Chrome/Edge: Ctrl + Shift + R  (or Ctrl + F5)
#    OR open DevTools (F12) → Network tab → check "Disable cache" → reload
```

> **IMPORTANT**: Normal browser reload (F5) uses cached JS and binary files.
> You MUST do Ctrl+Shift+R or clear browser cache to see changes.

---

## WebSocket Architecture (XAMPP setup)

**Game JS always connects to: `ws://[location.hostname]:9002`**

`location.hostname` = the hostname in the browser's address bar.

- If player opens `http://127.0.0.1/game/` → game connects to `ws://127.0.0.1:9002`
- If player opens `http://192.168.1.100/game/` → game connects to `ws://192.168.1.100:9002`

**Erlang game server** (Start_Server.bat) starts with `-extra game GAME_BIND GAME_PORT`:
- `game.beam` reads args as `[Master="game", _Index=GAME_BIND, Port=GAME_PORT]`
- **`GAME_BIND` is the `_Index` positional argument and is IGNORED by Erlang code.**
- `gen_tcp:listen(Port, [...])` in `sys_listener.erl` has no `{ip, _}` option → binds to **0.0.0.0** always.
- `GAME_PORT=9002` → must match what game JS connects to.

**No nginx proxy needed with XAMPP.** Apache does NOT proxy WebSocket on port 9002;
Erlang handles port 9002 directly.

> The file `raconh5/phpstudy_pro/Extensions/Nginx1.15.11/conf/vhosts/ws_proxy_9002.conf`
> exists in the repo but is **NOT applicable** to XAMPP setups. Ignore it.

### Erlang listener TCP options (from sys_listener.beam)
```erlang
gen_tcp:listen(Port, [binary, {packet,0}, {active,false}, {reuseaddr,true},
    {nodelay,false},        % Nagle algorithm ON → small packets may be coalesced
    {delay_send,true},      % buffers sends → 101 Switching Protocols may be delayed ~40ms
    {send_timeout,5000},
    {send_timeout_close,false}, {exit_on_close,false}])
```
- 10 acceptors spawned (`start_acceptor(10, LSocket)`)
- `recv(Socket, 5, 5000)` reads first 5 bytes within 5s to detect protocol (WebSocket = `"GET /"`)
- Bots/scanners that connect but never send data → `{tcp_error,timeout}` after 5s — normal/expected

### PC players connecting slowly or intermittently
Root cause checklist:
1. **Windows Firewall** — port 9002 must have an inbound allow rule.
   `Start_Server.bat` now runs `netsh advfirewall` automatically (requires admin).
   Manual: Control Panel → Windows Defender Firewall → Inbound Rules → New Rule → Port 9002 TCP.
2. **Router port forwarding** — for players outside the LAN, port 9002 must be forwarded to the server PC.
3. **delay_send + nodelay:false** — adds ~40ms to the 101 WS handshake response. Compounded with high RTT, this can slow initial connection but should not cause failures.
4. Mobile connects immediately because mobile is typically on the same WiFi (LAN) as the server — no firewall/NAT involved.

### Common mistake: changing GAME_PORT to 19002
If Erlang is restarted with `GAME_PORT=19002` but there is no nginx proxy,
the game client will connect to port 9002 and find nothing listening → connect/disconnect loop.
**Always keep `GAME_PORT=9002` with XAMPP.**

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

**QUAN TRỌNG — Lịch sử debug (v88→v89→v90):**

| Version | Cách làm | Vấn đề |
|---------|---------|--------|
| v88 | Gọi `_origClick` với synthetic event `{currentTarget:self._btnEnter}` | TypeError — original handler gọi `e.stopPropagation()` v.v. trên plain object |
| v89 | Block `socket.init=no-op`, gọi `_origClick.call(self, e)` với real event, sau đó restore và gọi real init từ XHR callback | First login after refresh luôn fail: client disconnect ngay sau khi server nhận login packet. Second attempt OK. |
| **v90** | **Skip `_origClick` hoàn toàn** cho `_btnEnter` path. Set model fields trực tiếp, gọi `socket.init` chỉ từ XHR callback. | ✅ WORKING |

**Tại sao v89 fail:** Decompile `main.min.js` xác nhận original handler chỉ làm 2 việc trước socket.init:
```javascript
Manager.model.getLogin().clientName = this._inputClient.text;
egret.localStorage.setItem("username", this._inputClient.text);
```
Khi `_origClick` được gọi ngay cả với `socket.init` bị block thành no-op, game engine framework có thể set state nội bộ (flags, timers) giả định rằng một kết nối đang được thiết lập. Khi real `socket.init` được gọi ~200ms sau từ XHR callback, trạng thái pre-set đó gây conflict lần đầu tiên.

**v90 — Code đúng cuối cùng:**

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

        // Replicate only the 2 pre-init lines from original handler — do NOT call _origClick
        try { Manager.model.getLogin().clientName = username; } catch(_ex) {}
        try { egret.localStorage.setItem('username', username); } catch(_ex) {}

        var xr = new XMLHttpRequest();
        xr.open('POST', 'auth.php', true);
        xr.timeout = 8000;
        xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xr.onload = function() {
            try {
                var res = JSON.parse(xr.responseText || xr.response);
                if (res.ok) {
                    if (errLabel) errLabel.text = '';
                    try { Manager.socket.init.call(Manager.socket); } catch(_ex) {}
                } else {
                    if (errLabel) errLabel.text = res.error || 'Login failed.';
                }
            } catch(ex) { if (errLabel) errLabel.text = 'Server error.'; }
        };
        xr.onerror = function() { if (errLabel) errLabel.text = 'Network error.'; };
        xr.ontimeout = function() { if (errLabel) errLabel.text = 'Server timeout. Try again.'; };
        xr.send('username=' + encodeURIComponent(username) +
                '&password=' + encodeURIComponent(password));
    };
}
```

**Tại sao không cần WebSocket override hay session nữa:**
- Auth chặn ngay tại nút Start Game trước khi `Manager.socket.init()` được gọi.
- Không có cách nào bypass vì hàm gốc không bao giờ được gọi nếu auth fail.

### 2b. `extra_translations.json` — Admin-managed translations (không đụng translate.js)

File: `raconh5/client/main/bin-release/web/221211145302/extra_translations.json`

Plain JSON object: `{"Chinese text": "English translation", ...}`

**translate.js** load file này async lúc khởi động và merge vào `_m`:
```javascript
(function(){
    var xr=new XMLHttpRequest();
    xr.open('GET','extra_translations.json?_='+Date.now(),true);
    xr.onload=function(){
        try{
            var ex=JSON.parse(xr.responseText||xr.response);
            if(ex&&typeof ex==='object'){Object.keys(ex).forEach(function(k){_m[k]=ex[k];});}
        }catch(_){}
    };
    xr.send(null);
})();
```

**admin.php** có tab "✏️ Extra JS Translations" (`tmode=extra`) để:
- Xem tất cả entries
- Tìm kiếm (Chinese hoặc English)
- Thêm entry mới (form ở đầu trang)
- Sửa giá trị inline → Save All
- Xóa từng entry

**Quy tắc thứ tự (quan trọng):** `extra_translations.json` được load async, các entries được **append** vào `_m` sau khi `_m` gốc đã chạy xong. Nếu có key trùng → extra file **ghi đè** giá trị trong translate.js. Dùng điều này để "patch" các translation sai trong translate.js mà không cần sửa file.

**Lưu ý timing:** Load là async (~vài ms), text được set SAU khi game render (user interaction). Với text hiển thị ngay lúc game load (title labels v.v.) có thể chưa kịp. Nhưng tooltip, button click, panel open → luôn có đủ thời gian.

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

---

# EXML Runtime Loading + UI Fixes — Session Knowledge Base

## Vấn đề cốt lõi: tại sao sửa .exml không có tác dụng

Egret kiểm tra `exmls[0].gjs` trong `default.thm.json` trước. Nếu có `gjs` → dùng compiled JS, **bỏ qua hoàn toàn file .exml**. Phải xóa `gjs` và thay bằng `content` (raw EXML XML string).

### Giải pháp: dùng trường `content` thay `gjs`

```json
{
  "path": "resource/game_skins/boss/BossPrivateItemSkin.exml",
  "className": "BossPrivateItemSkin",
  "content": "<?xml version=\"1.0\" encoding=\"utf-8\"?>..."
}
```

Khi có `content`, Egret gọi `$parseURLContent(path, content)` → parse EXML at runtime qua EXMLParser → sửa file .exml có tác dụng ngay.

**Lưu ý:** Không được xóa `gjs` hoàn toàn (để entry trống). `$loadAll` trong `eui.min.js` gọi `h(s, a)` với object entry → `t.indexOf("://")` fail → crash ở 62% loading. Phải dùng `content` field.

---

## Workflow sửa EXML (quan trọng)

1. Sửa file `.exml` trong `resource/game_skins/`
2. Chạy `sync_exml.php` để embed content vào `default.thm.json`:
   - Qua browser: `http://localhost/game/sync_exml.php`
   - Hoặc qua BAT: `C:\raconh5\sync_exml.bat` (dùng PHP từ XAMPP)
3. Hard refresh browser (Ctrl+Shift+R)

**File sync_exml.php** (`raconh5/client/main/bin-release/web/221211145302/sync_exml.php`):
- Đọc tất cả entry trong `default.thm.json`
- Với mỗi entry: đọc file .exml, embed vào `content`, xóa `gjs`
- Ghi lại `default.thm.json`

**File sync_exml.bat** (`sync_exml.bat` ở root repo):
- Tự detect PHP tại `C:\xampp\php\php.exe` hoặc `D:\xampp\php\php.exe`
- SCRIPT path: `C:\xampp\htdocs\game\sync_exml.php`

---

## UI Fixes đã làm

### Guild Hall (ClubViewSkin.exml)
File: `resource/game_skins/club/ClubViewSkin.exml`

| Thay thế | Từ | Thành |
|----------|-----|-------|
| Column header Rank | `<e:Image source="club_career_png".../>` | `<ns1:Label text="Rank" x="118" y="410".../>` |
| Column header Name | `<e:Image source="common_label_name_png".../>` | `<ns1:Label text="Name" x="290" y="410".../>` |
| Column header Power | `<e:Image source="common_fight_rank_png".../>` | `<ns1:Label text="Power" x="537" y="410".../>` |
| Normal Donation label | `<e:Image source="club_gx_word1_png".../>` | `<ns1:Label text="Normal Donation" x="250" y="814".../>` |
| Premium Donation label | `<e:Image source="club_gx_word2_png".../>` | `<ns1:Label text="Premium Donation" x="250" y="949".../>` |

### Boss List 2-line layout (BossPrivateItemSkin / BossPublicItemSkin)
File: `resource/game_skins/boss/BossPrivateItemSkin.exml` và `BossPublicItemSkin.exml`

```xml
<!-- Trước: name và level cùng y=148, chồng lên nhau -->
<!-- Sau: name dòng 1, level dòng 2 -->
<ns1:Label id="_txtName" x="7" y="136" width="176" size="20" textAlign="center"/>
<ns1:Label id="_txtLv"   x="7" y="159" width="176" size="20" textAlign="center"/>
```

### Task name font size (DailyItemSkin.exml)
File: `resource/game_skins/activity/DailyItemSkin.exml`
- `_txtDesc` label tại `size="28"` — đây là chỗ hiện tên task (Smelt, Enh, Level Up...)
- Đổi `size` để thay font size

### Fragment Attribute Popup (RelicStuffAttrViewSkin.exml)
File: `resource/game_skins/relicStuff/RelicStuffAttrViewSkin.exml`
- Popup hiện "碎片属性" với Power, HP, ATK, DEF, Pen và "Obtained by..." text
- `_attrTxt0..3`: 4 stat labels (2 cột × 2 hàng), y=586 và y=627
- `_versTxt`: dòng "Obtained by..." màu xanh lá (#00ff00), y=788
- `_desc1`, `_desc2`: mô tả cam, trong `_descGroup` tại x=204, y=668

---

## Switch Server Button Crash

**Lỗi:** `can't access property 0, e is undefined` trong `ServerSelectView.configUI`

**Root cause:** `LoginView.serverList` là null. `configUI` gọi `e[0].list.length` ngay lập tức.

**Fix trong translate.js:**
```javascript
// Guard null serverList khi mở dialog Switch Server
if(typeof ServerSelectView!=='undefined'&&!ServerSelectView.prototype.__cwSSV){
    ServerSelectView.prototype.__cwSSV=true;
    var _origCfgSSV=ServerSelectView.prototype.configUI;
    ServerSelectView.prototype.configUI=function(){
        if(this._parent&&!this._parent.serverList){
            this._parent.serverList=[{list:[{name:'Server 1',host:location.hostname,
                port:9002,serverID:10001,state:0}]}];
        }
        _origCfgSSV.call(this);
    };
}
// Patch LoginView.show() để fetch server list sớm
if(typeof LoginView!=='undefined'&&!LoginView.prototype.__cwPDS){
    LoginView.prototype.__cwPDS=true;
    var _origShowLV=LoginView.prototype.show;
    LoginView.prototype.show=function(){
        _origShowLV.call(this);
        try{this.postDataToServer();}catch(ex){}
    };
}
```

**server_list.php** cần đặt tại game root (`C:\xampp\htdocs\game\server_list.php`) vì `Manager.config.apiUrl=""` → request đến root, không phải `/api/`.

---

## Admin Panel — Player Stats

### Role ID Discovery (theo thứ tự)

1. **`web_users.erlang_role_id`** — column được persist từ lần trước
2. **`t_log_register`** — `SELECT account, MAX(rid) FROM t_log_register GROUP BY account` (case-insensitive với `strtolower`)
3. **`gm.escript listall`** — dump toàn bộ `role_base` ETS table, build map `account→rid` (case-insensitive)
4. **Quét tất cả MySQL tables** — tìm table có cả cột `account`/`name` + `rid`/`role_id`, query từng account thiếu RID
5. **Manual Set RID** — form input trong sidebar cho account "no role ID"

Khi tìm thấy RID → persist vào `web_users.erlang_role_id` ngay để lần sau không cần tìm lại.

### web_users Schema hiện tại

```sql
CREATE TABLE web_users (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    username       VARCHAR(32) COLLATE utf8_bin NOT NULL UNIQUE,
    password_hash  VARCHAR(255) NOT NULL,
    erlang_role_id VARCHAR(32)  NULL DEFAULT NULL,
    status         VARCHAR(16)  NOT NULL DEFAULT 'active',  -- active|banned|locked
    ban_reason     VARCHAR(255) NOT NULL DEFAULT '',
    banned_at      DATETIME NULL,
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

Các cột được tự động `ALTER TABLE ADD COLUMN IF NOT EXISTS` trong `getDB()` của admin.php.

### Account Moderation Actions

| Action | POST `action=` | Tác dụng |
|--------|---------------|----------|
| Ban | `ban_player` | Set status='banned', lưu reason, tự kick nếu online |
| Unban | `unban_player` | Set status='active', xóa reason |
| Lock | `lock_player` | Set status='locked', tự kick nếu online |
| Unlock | `unlock_player` | Set status='active' |
| Kick | `kick_player` | Gọi `gmKick(rid)` → `gm.escript kick <rid>` |
| Delete Account | `delete_account` | Xóa khỏi `web_users` (Mnesia KHÔNG bị xóa) |
| Delete Role | `delete_role` | Xóa khỏi Mnesia, cần gõ `DELETE` để confirm |

**auth.php** check status sau password_verify:
- `banned` → trả về `{"error": "This account has been banned. Reason: ..."}` 
- `locked` → trả về `{"error": "This account is temporarily locked."}`

---

## gm.escript — Commands đầy đủ

| Command | Usage | Mô tả |
|---------|-------|-------|
| `get` | `get <rid>` | Lấy stats từ Mnesia (lev, exp, gold, coin, vip, online, name) |
| `find` | `find <account>` | Tìm rid theo account name (case-insensitive, dùng ets:tab2list) |
| `listall` | `listall` | Dump toàn bộ role_base: `rid\|account\|name\|lev` mỗi dòng |
| `set` | `set <rid> lev\|exp\|gold\|gold_bind\|coin\|vip_lev <value>` | Sửa stat (player phải offline) |
| `rename` | `rename <rid> <base64_name>` | Đổi tên nhân vật (player phải offline) |
| `kick` | `kick <rid>` | Kick player đang online (exit process của họ) |
| `delete_role` | `delete_role <rid>` | Xóa role_data + role_base khỏi Mnesia (player phải offline) |
| `online` | `online` | List tất cả player đang online |
| `patch_filter` | `patch_filter` | Hot-replace filter module (fix private chat crash) |
| `clear_filter` | `clear_filter` | Xóa ETS + Mnesia sensitive word cache |
| `fields` | `fields <rid>` | Dump tất cả fields của role_base record (debug) |

**Quan trọng:** `find` và `listall` dùng `ets:tab2list` thay vì `mnesia:dirty_foldl`.  
Lý do: `dirty_foldl` cần serialize anonymous fun qua RPC → fail nếu khác OTP version giữa escript (erl9.0) và game server. `ets:tab2list` không cần truyền fun → luôn hoạt động.

---

## Commits của Session này

| Commit | Nội dung |
|--------|---------|
| `a031b136` | Guild Hall, Boss 2-line, EXML content loading, sync_exml.php, translate.js patches |
| `d4c6f0f3` | Fix Switch Server: server_list.php at game root + LoginView.show() patch |
| `9b3aa315` | Fix Switch Server crash: guard null serverList in ServerSelectView.configUI |
| `d2d47c33` | Admin: auto-discover missing role IDs via gm.escript gmFind fallback |
| `cf6b38d8` | Admin: case-insensitive RID lookup + manual Set RID form |
| `693ff54e` | Admin: scan all MySQL tables with account+rid columns |
| `612ae310` | gm.escript: add listall command + case-insensitive find (both use ets:tab2list) |
| `7f71ac5b` | gm.escript: replace dirty_foldl with ets:tab2list (fix rpc_failed) |
| `2ae76245` | Admin: ban/lock/kick/delete_role features + auth.php status check |

---

# Arena Rank Label Fix — Session Knowledge Base

## Triệu chứng

Trong panel "拾剑台" (Arena History), 4 chest items hiển thị nhãn **"Rank #"** (không có số) thay vì "Rank #1", "Rank #2-3", v.v.

---

## Cơ chế hiển thị rank — Dòng chảy dữ liệu

```
ArenaMaxRankCVO.parse()
  → o.rankTarget = e.readShort()          // số nguyên từ binary protocol

ArenaMaxListView.configUI()
  → for each cvo:
      var n = new ArenaMaxListItem          // 1. constructor: skin bind ngay lập tức
      n.setCVO(e[i])                        // 2. gọi ngay: _txt.text = LangCVO.getContent("arena8", rankTarget)
      n.x = ...; n.y = 2
      this._group.addChild(n)              // 3. addChild → __addedToStage → Manager.render.add(renderInvalid)

// Sau đó, render queue xử lý (deferred):
renderInvalid → drawAll → drawInit → ArenaMaxListItem.configUI()
```

### `LangCVO.getContent("arena8", rankTarget)`
- `arena8` trong `cw.txt` binary = `"第{0}名"` (Chinese template)
- `cw.StringUtil.format("第{0}名", [rankTarget])` = `"第N名"` (ví dụ: "第1名", "第2名")
- Đây là TEXT được set vào `_txt.text`

---

## Timing — Điều quan trọng nhất

| Thời điểm | Sự kiện | `_cvo` | `_txt` |
|-----------|---------|--------|--------|
| Constructor `new ArenaMaxListItem` | Skin bind synchronous qua `setSkin()` | null | bound ✓ |
| `n.setCVO(e[i])` | Set `_cvo`, set `_txt.text = "第N名"` | set ✓ | bound ✓ |
| `addChild(n)` | Đưa vào stage | set ✓ | bound ✓ |
| Render queue fires → `configUI()` | Deferred | set ✓ | bound ✓ |

**Kết luận:** Cả `_cvo` và `_txt` đều ĐÃ available khi `setCVO` gọi. Patch tại `setCVO` là timing tốt nhất.

---

## Translation Chain — Cách `_rep()` xử lý "第N名"

### Path 1: Regex (thêm bởi session này)
```
"第1名" → s.replace(/第(\d+)名/g, 'Rank #$1') → "Rank #1" ✓
```
- Chỉ hoạt động với số nguyên đơn (regex `\d+`)

### Path 2: `_m` dictionary chain (original, vẫn còn)
```
"第2-3名"
  → _m['第'] = 'Ch.' → "Ch.2-3名"
  → _m['Ch.2-3名'] = 'Rank #2-3' → "Rank #2-3" ✓
```
- Xử lý range text như "2-3", "4-10", "11-50", v.v.
- Có sẵn trong `_m` dict tại line 251-253

**Cả 2 path đều đúng và bổ sung nhau.** Regex xử lý trường hợp số đơn, `_m` xử lý range.

### Kiểm tra: `_m` scan có làm hỏng "Rank #1" không?
- Tất cả key trong `_m` đều là ký tự Trung → "Rank #1" không có ký tự Trung → **không bị ảnh hưởng** ✓

---

## Nguyên nhân lỗi sau khi sửa translate.js

### Nguyên nhân 1: Browser cache (QUAN TRỌNG NHẤT)
- `index.html` load `translate.js?v=80` — browser cache theo URL
- Nếu không đổi version number → browser serve bản cũ từ cache
- **MỌI thay đổi translate.js đều phải kèm tăng version số**
- Xác nhận: tab title hiện `"EN vXX"` → đúng version đang chạy

### Nguyên nhân 2: Label width quá hẹp
- `ArenaMaxListItemSkin.exml`: `_txt` có `width="91"` tại `size="24"`
- Tại size 24px, "Rank #" ≈ 80-85px, "Rank #1" ≈ 95-100px
- Với `textAlign="center"` và `width=91`, text "Rank #1" có thể vừa đủ, nhưng "Rank #2-3" (~120px) bị clip → chỉ thấy "Rank #"
- **Fix:** Mở rộng từ `width="91" x="75"` → `width="163" x="2"` (full skin width = 167px)

### Nguyên nhân 3: Patch không đúng timing (các lần thất bại)
- `draw()` hook → method không tồn tại trên `ArenaMaxListItem`
- `updateGetData()` hook → có thể fire trước khi patch chạy
- `configUI` hook alone → đúng timing nhưng không đủ nếu width bị clip

---

## Fix Đúng (commit `746b6ad7`)

### 1. Patch `setCVO` trực tiếp (primary fix)
```javascript
if(typeof ArenaMaxListItem!=='undefined'&&ArenaMaxListItem.prototype.setCVO&&!ArenaMaxListItem.prototype.__cwAMLS){
    ArenaMaxListItem.prototype.__cwAMLS=true;
    var _origAMLS=ArenaMaxListItem.prototype.setCVO;
    ArenaMaxListItem.prototype.setCVO=function(t){
        _origAMLS.call(this,t);
        try{if(this._txt&&this._cvo&&this._cvo.rankTarget!=null)this._txt.text='Rank #'+this._cvo.rankTarget;}catch(ex){}
    };
}
```
- Gọi original trước (để `_cvo` được set)
- Sau đó override `_txt.text` với giá trị đúng

### 2. Patch `configUI` (secondary/belt-and-suspenders)
```javascript
if(typeof ArenaMaxListItem!=='undefined'&&ArenaMaxListItem.prototype.configUI&&!ArenaMaxListItem.prototype.__cwAMLCUI){
    ArenaMaxListItem.prototype.__cwAMLCUI=true;
    var _origAMLCUI=ArenaMaxListItem.prototype.configUI;
    ArenaMaxListItem.prototype.configUI=function(){
        _origAMLCUI.call(this);
        try{if(this._txt&&this._cvo&&this._cvo.rankTarget!=null)this._txt.text='Rank #'+this._cvo.rankTarget;}catch(ex){}
    };
}
```

### 3. Mở rộng label trong EXML
```xml
<!-- Trước: -->
<ns1:Label id="_txt" x="75" width="91" size="24" textAlign="center" y="101"/>
<!-- Sau: -->
<ns1:Label id="_txt" x="2" width="163" size="24" textAlign="center" y="101"/>
```
File: `resource/game_skins/arena/ArenaMaxListItemSkin.exml`

### 4. Cache bust — BẮT BUỘC mỗi khi sửa translate.js
- `index.html`: `translate.js?v=80` → `translate.js?v=83`
- `translate.js`: `document.title='EN v80'` → `document.title='EN v83'`

---

## Quy tắc Cache Busting — KHÔNG ĐƯỢC QUÊN

> **Mỗi lần sửa `translate.js`, BẮT BUỘC phải:**
> 1. Tăng version number trong `document.title='EN vXX'`
> 2. Tăng version number trong `index.html`: `translate.js?v=XX`
> 3. Cả 2 số phải KHỚP nhau

Kiểm tra nhanh: nhìn tab title trong browser, nếu hiện đúng version → code mới đang chạy.

---

## Lỗi Prototype Patch — Pattern Đúng

Khi patch một method trên prototype của class Egret:

```javascript
// ✅ Đúng
if(typeof ClassName!=='undefined'&&ClassName.prototype.methodName&&!ClassName.prototype.__cwFLAG){
    ClassName.prototype.__cwFLAG=true;          // đặt flag trên prototype, không phải instance
    var _orig=ClassName.prototype.methodName;   // lưu original
    ClassName.prototype.methodName=function(){  // override trên prototype
        _orig.call(this, ...arguments);         // gọi original với đúng context
        try{ /* thêm logic */ }catch(ex){}      // wrap try/catch để không crash silent
    };
}
```

**Lý do `try/catch`:** Nếu `_txt` hay `_cvo` null → patch không crash, chỉ bỏ qua.  
**Lý do flag trên prototype:** Flag được share toàn bộ instances, `_patch()` chỉ chạy 1 lần/class.

---

## Egret EUI Skin Binding — Tóm tắt

| Thời điểm | Sự kiện |
|-----------|---------|
| `new ClassName()` → constructor | `setSkin()` chạy synchronous → tất cả skin parts (`_txt`, `_pic`, ...) được bind |
| Trước `addChild()` | Skin parts đã sẵn sàng — có thể gọi `setCVO`, set text |
| `addChild()` | `__addedToStage` → `Manager.render.add(renderInvalid)` |
| Render queue fires | `drawInit()` → `configUI()` + `addEvent()` + `initData()` |

**Nguyên tắc:** Patch `setCVO` (hoặc bất kỳ method nào gọi trước `addChild`) là timing an toàn nhất để set text.

---

## Commits Arena Fix

| Commit | Nội dung |
|--------|---------|
| `23e0d2a4` | [FAILED] draw() hook — method không tồn tại |
| `5c5b408e` | [FAILED] updateGetData() hook — timing sai |
| `7f5162af` | [FAILED] configUI hook + regex — width issue + cache |
| `746b6ad7` | ✅ setCVO patch + widen label + cache bust v83 |

---

# Guild Hall UI Fixes — Session Knowledge Base

## 1. Overlap "Current Masterncy available" — ClubViewSkin.exml

### Nguyên nhân
Label tĩnh `text="Current Master:"` ở `x=192, size=24` → chiếm ~182px → đè lên `_masterName` ở `x=312`.

### Fix
```xml
<!-- Trước -->
<ns1:Label text="Current Master:" x="192" y="262" size="24"/>
<ns1:Label id="_masterName" text="Vacancy" x="312" y="262" size="24"/>

<!-- Sau -->
<ns1:Label text="Master:" x="192" y="262" size="24"/>
<ns1:Label id="_masterName" text="Vacancy" x="278" y="262" size="24"/>
```
- "Master:" ≈ 86px từ x=192 → kết thúc tại ~x=278 → không còn overlap

---

## 2. Rút ngắn "Remaining attempts: N" → "Attempts left: N"

### Nguồn dữ liệu
- Text đến từ `LangCVO.getContent("club5", numValue)` → language binary `club|5`
- Giá trị gốc: `"剩余次数<font color='#38B800'>{0}</font>次"` (47 bytes)

### Quy tắc: KHÔNG dùng `apply_all_translations.py` để sửa 1 entry
`apply_all_translations.py` rebuild toàn bộ `cw.txt` từ `.original` → **mất tất cả patches từ các session trước** → game crash Error #1025 (readUTF fail).

### Fix đúng: Targeted binary patch
```python
import struct
CW = '.../cw.txt'
with open(CW,'rb') as f:
    data = bytearray(f.read())

old_val = "剩余次数<font color='#38B800'>{0}</font>次".encode('utf-8')
new_val = "Attempts left: <font color='#38B800'>{0}</font>".encode('utf-8')
# Nếu cùng length → in-place, không cần update section size
# Nếu khác length → phải update language section dlen trong outer header

old_entry = struct.pack('>H', len(old_val)) + old_val
new_entry = struct.pack('>H', len(new_val)) + new_val
pos = data.find(old_entry)
data[pos:pos+len(old_entry)] = new_entry

# Nếu khác length, update outer section dlen:
diff = len(old_entry) - len(new_entry)
# tìm dlen_pos của section 'language' → struct.pack_into('>I', data, dlen_pos, dlen-diff)

with open(CW,'wb') as f:
    f.write(data)
```

---

## 3. XML Parse Error: `&` trong EXML — BẮT BUỘC escape

### Lỗi
```
XML Parsing Error: not well-formed
<ns1:Label text="Next: Guild rank {0} & clear current difficulty" .../>
```

### Nguyên nhân
Trong XML, `&` là ký tự đặc biệt. Phải escape trong attribute value.

### Fix
```xml
<!-- SAI -->
text="Guild rank {0} & clear current difficulty"

<!-- ĐÚNG -->
text="Guild rank {0} &amp; clear current difficulty"
```

### Bảng escape XML đầy đủ
| Ký tự | Escape | Khi nào dùng |
|-------|--------|--------------|
| `&` | `&amp;` | Luôn luôn trong XML |
| `<` | `&lt;` | Trong attribute hoặc text node |
| `>` | `&gt;` | Trong attribute hoặc text node |
| `"` | `&quot;` | Trong attribute `"..."` |
| `'` | `&apos;` | Trong attribute `'...'` |

Files bị lỗi: `CopyExpViewSkin.exml`, `CopySilverViewSkin.exml` — đều fix bằng `&amp;`.

**Sau khi sửa EXML phải sync vào `default.thm.json`** (chạy sync_exml.php hoặc Python script).

---

## 4. Cấu trúc Guild Hall UI — Hai file EXML

### Member list (dòng trắng)
File: `resource/game_skins/club/items/ClubMemberItemViewSkin.exml`
```xml
<e:Skin class="ClubMemberItemViewSkin" width="655" height="55">
    <ns1:Label id="_career"   x="90"  y="14" size="24"/>  <!-- "Rank 5 Disciple" -->
    <ns1:Label id="_nickName" horizontalCenter="0" y="14" size="24"/>  <!-- Tên -->
    <ns1:Label id="_fighting" x="537" y="14" size="24"/>  <!-- Power -->
</e:Skin>
```

### Dòng của chính mình (dòng xanh lá)
File: `resource/game_skins/club/ClubViewSkin.exml` tại y=676
```xml
<ns1:Label id="_clubCareer" x="121" y="690" size="24" textColor="0x38b800"/>
<ns1:Label id="_nickName"   horizontalCenter="3.5" y="690" size="24" textColor="0x38b800"/>
<ns1:Label id="_fighting"   x="567" y="690" size="24" textColor="0x38b800"/>
```

**Muốn dời label rank sang trái → phải sửa CẢ HAI file** để đồng nhau.

---

## 5. Dịch chuỗi Chinese trong cw.txt — Quy trình đúng

### Tìm entry nào còn Chinese
```python
python3 -c "
import struct, unicodedata
# ... parse language section ...
for tname, entries in tables.items():
    for eid, val in entries.items():
        if any(unicodedata.category(c) == 'Lo' for c in val):
            print(f'{tname}|{eid}: {val[:60]}')
"
```

### Dịch guild welcome message (club|15)
- Chinese: `'风云聚会，龙翔九天，欢迎少侠加入本盟会。'` (60 bytes)
- English: `'Heroes gather, dragons soar — welcome, young hero!'` (52 bytes)
- Patch: targeted binary + update language section dlen (diff=8)

### Quy trình an toàn để dịch 1 entry
1. Đọc current value từ binary (xác nhận đúng entry)
2. Tính byte length của old và new value
3. Nếu same length → in-place replace (không cần update header)
4. Nếu khác length → update length prefix + update section dlen trong outer
5. Verify bằng cách parse lại binary sau khi patch

### KHÔNG BAO GIỜ dùng `apply_all_translations.py` để sửa 1 entry
→ Script rebuild từ `.original` → mất tất cả patches → Error #1025 crash 37%

---

## Commits

| Commit | Nội dung |
|--------|---------|
| `bb8fb780` | [BROKEN] Guild Hall label fix + club5 dịch bằng apply_all_translations.py → crash 37% |
| `79252e18` | Restore cw.txt + targeted binary patch club5 |
| `5c467926` | Fix XML &amp; trong CopyExp/CopySilverViewSkin |
| `3e1e53f0` | Dịch club\|15 welcome message binary patch |

