var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * create 18.2.8
 * 寻宝珍希记录info
 *  */
var ArtifactLogInfo = (function () {
    function ArtifactLogInfo() {
    }
    Object.defineProperty(ArtifactLogInfo.prototype, "desc", {
        get: function () {
            var str = LangCVO.getContent("artifact4");
            var cvo = ItemsCVO.getCvo(this.base_id);
            var itemName = HtmlUtil.addColorTag("【" + cvo.name + "】", cvo.colorStr);
            str = StringUtils.setParam(str, this.name, itemName);
            return str;
        },
        enumerable: true,
        configurable: true
    });
    return ArtifactLogInfo;
}());
__reflect(ArtifactLogInfo.prototype, "ArtifactLogInfo");
//# sourceMappingURL=ArtifactLogInfo.js.map