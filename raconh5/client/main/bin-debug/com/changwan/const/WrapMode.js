var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WrapMode = (function () {
    function WrapMode() {
    }
    WrapMode.LOOP = 1;
    WrapMode.ONCE = 2;
    WrapMode.ONCE_DEFAULT = 3;
    WrapMode.ATTACK = 4;
    return WrapMode;
}());
__reflect(WrapMode.prototype, "WrapMode");
//# sourceMappingURL=WrapMode.js.map