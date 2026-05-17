@echo 以管理员身份运行，否则会拒绝访问系统变量
 
setx /M PATH "%PATH%;%%ERLANG_HOME%%\bin;C:\Program Files\erl9.0\bin;"
 
pause