@echo off
set MASTER_DOMAIN=127.0.0.1

:: Tự động tính REPO_ROOT từ vị trí file bat (server_bin\script\ -> lên 2 cấp)
pushd "%~dp0..\.."
set REPO_ROOT=%CD%
popd

set ERL_ROOT=%REPO_ROOT%\client\main\bin-release\web\221211145302\erl10.4
set ERL_ERTS=%ERL_ROOT%\erts-10.4\bin

:: Ghi lại erl.ini với đường dẫn đúng (dùng \\ vì INI cần escape)
set ERL_ROOT_ESC=%ERL_ROOT:\=\\%
set ERL_ERTS_ESC=%ERL_ERTS:\=\\%

(
echo [erlang]
echo Bindir=%ERL_ERTS_ESC%
echo Progname=erl
echo Rootdir=%ERL_ROOT_ESC%
) > "%ERL_ROOT%\bin\erl.ini"

(
echo [erlang]
echo Bindir=%ERL_ERTS_ESC%
echo Progname=erl
echo Rootdir=%ERL_ROOT_ESC%
) > "%ERL_ERTS%\erl.ini"

set PATH=%ERL_ROOT%\bin;%PATH%
set ERL_ROOTDIR=%ERL_ROOT%
set ERL_LIBS=

cd /d "%REPO_ROOT%\server_bin"
"%ERL_ROOT%\bin\erl.exe" +pc unicode -hidden -kernel inet_dist_listen_min 40001 -kernel inet_dist_listen_max 40100 +P 204800 +K true -smp enable -name newserver@%MASTER_DOMAIN% -setcookie stupidcat -pa ebin config -config config/sys -eval "gen_event:start({local, error_logger})" -s main start -extra game %MASTER_DOMAIN% 9002
pause
