var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 资源回收类型
 */
var ResourceGCType = (function () {
    function ResourceGCType() {
    }
    /**
     * 资源存在于内存的时间，以MS为单位
     * @params type ResourceGCType类型
     */
    ResourceGCType.getGCTime = function (type) {
        if (type == ResourceGCType.NOW)
            return 0;
        else if (type == ResourceGCType.CVO)
            return 0;
        else if (type == ResourceGCType.SOUND)
            return 0;
        else if (type == ResourceGCType.MAP)
            return 60000;
        else if (type == ResourceGCType.COMMON)
            return 60000;
        else if (type == ResourceGCType.AVATAR)
            return 60000 * 2;
        return 60000;
    };
    //一直存在于游戏内存中
    ResourceGCType.NEVER = 1;
    //直接从内存中GC
    ResourceGCType.NOW = 2;
    ResourceGCType.CVO = 3;
    ResourceGCType.MAP = 4;
    ResourceGCType.COMMON = 5;
    ResourceGCType.AVATAR = 6; //形象资源
    ResourceGCType.SOUND = 7;
    return ResourceGCType;
}());
__reflect(ResourceGCType.prototype, "ResourceGCType");
//# sourceMappingURL=ResourceGCType.js.map