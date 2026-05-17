/**
 * 加载类型
 * devil
 * create  2017-11-14
 * update
*/
var LoaderType = /** @class */ (function () {
    function LoaderType() {
    }
    //先加载path.txt（二进制解析加载，然后删除源数据），再加载smallMap.jpg
    LoaderType.MAP_DATA = 0;
    //先加载json再加载png
    LoaderType.ANI = 1;
    //二进制解析加载，不删除源数据
    LoaderType.BIN = 6;
    // //加载声音
    LoaderType.SOUND = 7;
    //加载图片
    LoaderType.IMAGE = 10;
    //帖图加载
    LoaderType.TEXTURE = 11;
    return LoaderType;
}());
//# sourceMappingURL=LoaderType.js.map