@echo off
title Sync EXML to default.thm.json

REM --- Find XAMPP PHP ---
set PHP=
if exist "C:\xampp\php\php.exe"     set PHP=C:\xampp\php\php.exe
if exist "D:\xampp\php\php.exe"     set PHP=D:\xampp\php\php.exe
if exist "C:\wamp64\bin\php\php8.2.0\php.exe" set PHP=C:\wamp64\bin\php\php8.2.0\php.exe

REM --- Fallback: try php in PATH ---
if "%PHP%"=="" where php >nul 2>&1 && set PHP=php

if "%PHP%"=="" (
    echo ERROR: PHP not found.
    echo Please install XAMPP or set the PHP path manually in this bat file.
    pause
    exit /b 1
)

set SCRIPT=C:\xampp\htdocs\game\raconh5\client\main\bin-release\web\221211145302\sync_exml.php

echo Using PHP: %PHP%
echo Script:    %SCRIPT%
echo.

"%PHP%" "%SCRIPT%"

echo.
pause
