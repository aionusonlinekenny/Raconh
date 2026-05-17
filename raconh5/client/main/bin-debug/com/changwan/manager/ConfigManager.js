var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ConfigManager = (function () {
    function ConfigManager() {
        /**
         * 资源地址
         */
        this.resourceUrl = "resource/";
        /**
         * api地址
         */
        this.apiUrl = "";
        /**
         * 平台类型
         */
        this.platform = "";
        /**
         * 地图切块大小
         */
        this.tiledMapSize = 256;
        /**
         * 地图小格子尺寸
         */
        this.gridWH = 40;
        /**
         * 九宫格宽
         */
        this.scale9W = 240;
        /**
         * 九宫格高
         */
        this.scale9H = 400;
        /**
         * 客户端总版本号，一改全改
         */
        this.clientVersion = 5;
        /**
         * 是否自动生成exml文件列表
         */
        this.autoGenerateExmlsList = true;
        /**
         * 默认字体
         */
        this.defaultFont = "Microsoft YaHei";
        egret.TextField.default_fontFamily = this.defaultFont;
        egret.TextField.default_size = 24;
    }
    /**
     * 对相对路径进行root+计算,也就是将相对路径转换成绝对路径.
     */
    ConfigManager.prototype.rootToURL = function (url) {
        if (url.indexOf(this.resourceUrl) > -1)
            return url;
        return this.resourceUrl + url;
    };
    ConfigManager.prototype.parse = function (content) {
        var list = content.split("\r\n");
        var len = list.length;
        var arr;
        for (var i = 0; i < len; i++) {
            if (list[i] != null && list[i].indexOf("=") != -1) {
                arr = list[i].split("=");
                this[arr[0]] = this.parseValue(arr[1]);
            }
        }
    };
    ConfigManager.prototype.parseValue = function (value) {
        if (value == "true")
            return true;
        else if (value == "false")
            return false;
        var num = parseInt(value);
        if (!isNaN(num))
            return num;
        return value;
    };
    return ConfigManager;
}());
__reflect(ConfigManager.prototype, "ConfigManager");
//# sourceMappingURL=ConfigManager.js.map