@echo off
echo 正在生成版本临时文件...
::svn status -v ../main/resource
svn status -v ../main/resource > version.tmp
echo 版本临时文件生成成功,请使用版本导出工具导出版本文件!
pause