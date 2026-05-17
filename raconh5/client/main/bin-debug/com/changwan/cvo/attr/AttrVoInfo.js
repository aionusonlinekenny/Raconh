var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * 17.11.20
 * 属性信息
 */
var AttrVoInfo = (function () {
    function AttrVoInfo() {
        this.sign = " +";
    }
    /** 文本内容 */
    AttrVoInfo.prototype.desc = function (short, color) {
        if (short === void 0) { short = false; }
        if (color === void 0) { color = null; }
        var tName = short ? this.shortName : this.name;
        var str;
        if (this.format == 1) {
            //format== 1为须要显示%
            str = this.sign + (Math.round(this.num * 10) / 100) + "%";
            // str = this.sign + Number(this.num/1000 * 100).toFixed(2) + "%"
            if (color != null) {
                str = HtmlUtil.addColorTag(str, color);
            }
            str = tName + str;
        }
        else {
            if (this.id >= 38 && this.id <= 45)
                str = this.sign + this.num / 1000;
            else
                str = this.sign + this.num;
            if (color != null) {
                str = HtmlUtil.addColorTag(str, color);
            }
            str = tName + str;
        }
        return str;
    };
    return AttrVoInfo;
}());
__reflect(AttrVoInfo.prototype, "AttrVoInfo");
//# sourceMappingURL=AttrVoInfo.js.map