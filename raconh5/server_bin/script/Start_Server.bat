@echo off
set MASTER_DOMAIN=127.0.0.1
set ERL_ROOT=C:\Users\TURKEY\Desktop\Agatests\raconh5\client\main\bin-release\web\221211145302\erl10.4
set PATH=%ERL_ROOT%\bin;%PATH%
set ERL_ROOTDIR=%ERL_ROOT%
set ERL_LIBS=
cd /d "C:\Users\TURKEY\Desktop\Agatests\raconh5\server_bin"
"%ERL_ROOT%\bin\erl.exe" +pc unicode -hidden -kernel inet_dist_listen_min 40001 -kernel inet_dist_listen_max 40100 +P 204800 +K true -smp enable -name newserver@%MASTER_DOMAIN% -setcookie stupidcat -pa ebin config -config config/sys -eval "gen_event:start({local, error_logger})" -s main start -extra game %MASTER_DOMAIN% 9002
pause