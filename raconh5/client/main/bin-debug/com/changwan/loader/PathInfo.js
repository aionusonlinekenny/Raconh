var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 路径信息类，相关的参数key是相对路径，并且不是版本号,尽量不提供key接口，防止错误引用
 * devil
 * create  2017-11-10
 * update
*/
var PathInfo = (function () {
    /**
     * @param key			相对路径地址
     * @param version
     * @param size
     */
    function PathInfo(key, version) {
        this._key = key;
        if (version)
            this.url = Manager.config.rootToURL(key) + "?v=" + version;
        else
            this.url = Manager.config.rootToURL(key) + "?v=" + Manager.config.clientVersion;
        // this.size = size;
        // this.memory = memory;
        PathInfo._dic[key] = this;
    }
    /**
     * @param key   相对路径并且不带版本号的地址
     * @param version	地图图片采用客户端编辑日期版本号记录，只有加载地图图片时才会生效，其它的情况下都会传入默认值
     */
    PathInfo.getPath = function (key, loaderType) {
        var path = PathInfo._dic[key];
        if (path == null) {
            path = new PathInfo(key);
            egret.log("不存在资源路径:", key, loaderType);
        }
        path.setLoaderType(loaderType);
        return path;
    };
    PathInfo.prototype.setLoaderType = function (loaderType) {
        this.loaderType = loaderType;
        if (loaderType == LoaderType.ANI) {
            var tempKey = this._key.split(".json").join(".png"); //.json变为.png
            var path2 = PathInfo.getPath(tempKey);
            this.url2 = path2.url; //Manager.config.rootToURL(tempKey) + "?v=" + version;
        }
        else if (loaderType == LoaderType.MAP_DATA) {
            var tempKey = this._key.split("path.txt").join("smallMap.jpg"); //path.txt变为smallMap.jpg
            var path2 = PathInfo.getPath(tempKey);
            this.url2 = path2.url; //Manager.config.rootToURL(tempKey) + "?v=" + version;
        }
    };
    PathInfo._dic = {};
    return PathInfo;
}());
__reflect(PathInfo.prototype, "PathInfo");
//# sourceMappingURL=PathInfo.js.map