@echo off
:: Run this ONCE as Administrator to allow players to connect via WebSocket (port 9002).
:: Right-click this file -> "Run as administrator"

set GAME_PORT=9002

netsh advfirewall firewall show rule name="Erlang Game WS %GAME_PORT%" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Firewall rule for port %GAME_PORT% already exists. Nothing to do.
    goto done
)

echo Adding Windows Firewall inbound rule for Erlang WebSocket port %GAME_PORT%...
netsh advfirewall firewall add rule name="Erlang Game WS %GAME_PORT%" protocol=TCP dir=in localport=%GAME_PORT% action=allow
if %errorlevel% equ 0 (
    echo [OK] Firewall rule added. Players can now connect on port %GAME_PORT%.
) else (
    echo [ERROR] Failed to add rule. Make sure you right-clicked and chose "Run as administrator".
)

:done
pause
