/**
 * pzx
 * create 18.2.8
 * 寻宝个人记录info
 *  */
var ArtifactSelfLogInfo = /** @class */ (function () {
    function ArtifactSelfLogInfo() {
        /**物品列表  <base_id>*/
        this.itemList = [];
    }
    ArtifactSelfLogInfo.prototype.desc = function () {
        var str;
        if (this.type == ArtifactType.SENDS_ONE_TYPE) {
            str = LangCVO.getContent("artifact6");
        }
        else if (this.type == 10) {
            str = LangCVO.getContent("artifact7");
        }
        var name = "";
        var sign = "";
        for (var i = this.itemList.length - 1; i > -1; i--) {
            var cvo = ItemsCVO.getCvo(this.itemList[i]);
            if (cvo) {
                name += sign + "【" + HtmlUtil.addColorTag(cvo.name, cvo.colorStr) + "】";
            }
            sign = ",";
        }
        str = StringUtils.setParam(str, name);
        return str;
    };
    return ArtifactSelfLogInfo;
}());
//# sourceMappingURL=ArtifactSelfLogInfo.js.map