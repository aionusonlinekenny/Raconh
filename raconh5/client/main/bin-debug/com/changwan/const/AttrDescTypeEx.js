var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AttrDescTypeEx = (function () {
    function AttrDescTypeEx() {
    }
    AttrDescTypeEx.getAttrName = function (value) {
        var info = AttrCVO.getInfo(value);
        if (info)
            return info.name;
        return "";
    };
    return AttrDescTypeEx;
}());
__reflect(AttrDescTypeEx.prototype, "AttrDescTypeEx");
//# sourceMappingURL=AttrDescTypeEx.js.map