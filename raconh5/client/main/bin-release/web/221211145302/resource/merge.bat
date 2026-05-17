echo off
echo start merge !!!!
ResDepot -pack %cd%\default.res.json %cd%\resource.json %cd%
echo merge successful!!!!
pause