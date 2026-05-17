DIR_ROOT=`pwd` # 起始目录
DIR_RES=${DIR_ROOT}/main/resource # 资源库安装目录
DIR_PHP=${DIR_ROOT}/php	#php工具目录
DIR_CLIENT=${DIR_ROOT}   #客户端目录
DIR_CLIENT_MAIN=${DIR_ROOT}/main   #客户端目录
##EGRET= 'C:/Users/Administrator/AppData/Roaming/Egret/engine/5.0.14/tools/bin'
## 程序目录
PHP=php  # php主程序所在路径
##EGRET=egret

## 生成资源版本文件
fun_version()
{
    cd ${DIR_RES}
	#echo ${DIR_PHP}/version.php
	path=`cygpath -p ${DIR_PHP}/version.php -a -w`
	${PHP} $path
}

##发布
fun_publish()
{
	echo "Git开始更新client,分支"
	##cd ${DIR_CLIENT}
	##git checkout "develop"
	##git pull
	cd ${DIR_CLIENT_MAIN}
	echo "开始编译代码"
	echo ${EGRET} egret clean
}


##帮助命令
fun_help()
{
	echo "version       		生成资源版本文件"
	echo "publish               发布版本"
}

## 执行入口
Cmd=""
if [ $# -eq 0 ]; then
    fun_help
else
    fun_$1 $*
fi
exit 0