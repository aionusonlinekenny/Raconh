# PayPal Integration Plan

## Context

Game: Chinese H5 MMORPG (Erlang OTP 20, node `newserver@127.0.0.1`, cookie `stupidcat`)  
Current payment: KuDai platform SDK (appid=`1000047`, key=`88589689c85dea6e79bdf4502a50c0db`)  
Goal: Replace KuDai with PayPal for international players

## Prerequisites (user must provide before coding)

- [ ] PayPal Business account created
- [ ] PayPal app created at https://developer.paypal.com → get **Client ID** and **Secret**
- [ ] Server has a **public domain or IP** (PayPal webhook cannot reach localhost)
- [ ] Decide gold exchange rate: e.g. $1 USD = 10 gold (元宝)

## Files to create / modify

### 1. `raconh5/client/main/bin-release/web/221211145302/pay_order.php` (NEW)
- Receives POST from client: `role_id`, `amount_usd`, `charge_type`
- Creates PayPal order via REST API (`POST /v2/checkout/orders`)
- Returns `{ orderID }` JSON to client
- Uses PayPal sandbox for testing, live for production

### 2. `raconh5/client/main/bin-release/web/221211145302/pay_notify.php` (NEW)
- PayPal webhook endpoint (must be public URL)
- Verifies webhook signature using PayPal SDK
- On `PAYMENT.CAPTURE.COMPLETED` event:
  - Extracts `role_id`, `gold_amount` from custom_id field
  - Calls `gm.escript charge <role_id> <gold_amount>`
  - Logs transaction to MySQL `t_log_charge`

### 3. `raconh5/server_bin/gm.escript` (ADD command)
Add new `charge` command:
```erlang
main(["charge", RoleIdStr, GoldStr]) ->
    %% Add gold to player (works while offline OR online via role process)
    %% Also update vip_exp so VIP level recalculates correctly
```
Path: write gold to `role_base` position 24 AND update `vip_exp` in `role_vip`  
If player is online: need to find role process pid and send message, or use `charge:apply_pay` RPC

### 4. Client JS: `PlatformManager.js`
File: `raconh5/client/main/bin/js/com/changwan/manager/PlatformManager.js`  
Change `kudaiPay()` method to use PayPal JS SDK instead of KuDai SDK.

New flow in client:
```javascript
// Load PayPal JS SDK
// <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD"></script>

// Replace kudaiPay() with:
paypal.Buttons({
    createOrder: function() {
        return fetch('/api/pay_order.php', {
            method: 'POST',
            body: JSON.stringify({ role_id, amount_usd, charge_type })
        }).then(res => res.json()).then(data => data.orderID);
    },
    onApprove: function(data) {
        return fetch('/api/pay_capture.php', {
            method: 'POST',
            body: JSON.stringify({ orderID: data.orderID })
        }).then(res => res.json()).then(details => {
            // Show success message in game
        });
    }
}).render('#paypal-button-container');
```

### 5. `raconh5/client/main/bin-release/web/221211145302/pay_capture.php` (NEW)
- Called by client after player approves PayPal payment
- Captures the PayPal order (`POST /v2/checkout/orders/{id}/capture`)
- Credits gold immediately (don't wait for webhook, use webhook as backup)

## Key technical notes

### How PHP talks to Erlang (already working pattern)
```php
// Same pattern as admin.php gmExec()
$out = shell_exec('"C:\\Program Files\\erl9.0\\bin\\escript.exe" "C:\\raconh5\\server_bin\\gm.escript" charge ' . $role_id . ' ' . $gold_amount);
```

### Gold amount calculation
```php
$gold = (int)($amount_usd * GOLD_PER_USD);  // e.g. $6 → 60 gold (matches existing 6RMB=60 ratio)
```

### Charge packages (from existing game config)
| USD  | Gold | Bound Gold (bonus) |
|------|------|--------------------|
| $6   | 60   | +60 first charge   |
| $18  | 180  | +180 first charge  |
| $30  | 300  | +300 first charge  |
| $60  | 600  | +600 first charge  |

### VIP update after charge
When adding gold via charge command, also update `vip_exp` in `role_vip`:
```erlang
NewVipExp = OldVipExp + GoldAdded,
NewVipLev = vip_data:get_vip(NewVipExp),
%% setelement into role_ext position 38
```

### PayPal REST API credentials storage
Store in `admin.php` constants or a separate `config.php`:
```php
define('PAYPAL_CLIENT_ID', 'YOUR_CLIENT_ID');
define('PAYPAL_SECRET',    'YOUR_SECRET');
define('PAYPAL_MODE',      'sandbox');  // change to 'live' for production
define('GOLD_PER_USD',     10);         // confirm exchange rate with user
```

## PayPal webhook events to handle
- `PAYMENT.CAPTURE.COMPLETED` — main success event, credit gold
- `PAYMENT.CAPTURE.DENIED` — log failure
- `CHECKOUT.ORDER.APPROVED` — optional, can use capture flow instead

## Testing flow
1. Use PayPal sandbox accounts (buyer + seller) from developer.paypal.com
2. Test with sandbox Client ID first
3. Verify gold appears in Mnesia after payment
4. Switch to live credentials when ready

## Files NOT needed / already handled
- No changes to Erlang beam files needed (gm.escript handles everything via RPC)
- No changes to MySQL schema needed (t_log_charge already exists)
- KuDai SDK (`kdsdk.04wan.com/js/kudaigame_v3.js`) can be removed once PayPal is live
