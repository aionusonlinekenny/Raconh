var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HtmlUtil = (function () {
    function HtmlUtil() {
    }
    // <font color="#0000ff" size="30" fontFamily="Microsoft YaHei">Microsoft YaHei blue large</font><font color="#ff7f50" size="10">珊瑚色<b>局部加粗</b>小字体</font><i>斜体</i>
    // 宋体"SimSun"   微软雅黑"Microsoft YaHei"
    HtmlUtil.setTextFlow = function (tf, htmlText) {
        tf.textFlow = (new egret.HtmlTextParser).parser(htmlText);
    };
    HtmlUtil.addBTag = function (str) {
        return "<b>" + str + "</b>";
    };
    HtmlUtil.addUTag = function (str) {
        return "<u>" + str + "</u>";
    };
    HtmlUtil.addFont = function (str, font) {
        return "<font fontFamily='" + font + "'>" + str + "</font>";
    };
    HtmlUtil.addColorTag = function (str, color) {
        return "<font color='" + color + "'>" + str + "</font>";
    };
    HtmlUtil.addFontTag = function (str, color, size) {
        if (size === void 0) { size = 0; }
        if (size == 0)
            size = egret.TextField.default_size;
        return "<font color='" + color + "' size='" + size + "'>" + str + "</font>";
    };
    HtmlUtil.addATag = function (str, event) {
        if (event === void 0) { event = ""; }
        return "<a href = 'event:" + event + "'>" + str + "</a>";
    };
    HtmlUtil.addTag = function (text, color, size, bold) {
        if (size === void 0) { size = 0; }
        if (bold === void 0) { bold = false; }
        if (size == 0)
            size = egret.TextField.default_size;
        if (bold)
            text = this.addBTag(text);
        return this.addFontTag(text, color, size);
    };
    return HtmlUtil;
}());
__reflect(HtmlUtil.prototype, "HtmlUtil");
//# sourceMappingURL=HtmlUtil.js.map