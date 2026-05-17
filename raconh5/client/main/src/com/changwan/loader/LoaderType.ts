/**
 * 加载类型
 * devil
 * create  2017-11-14
 * update
*/
class LoaderType
{
    //先加载path.txt（二进制解析加载，然后删除源数据），再加载smallMap.jpg
    public static MAP_DATA:number = 0;
    //先加载json再加载png
    public static ANI:number = 1;
    //二进制解析加载，不删除源数据
    public static BIN:number = 6;
    // //加载声音
    public static SOUND:number = 7;
    //加载图片
    public static IMAGE:number = 10;
    //帖图加载
    public static TEXTURE:number = 11;
}