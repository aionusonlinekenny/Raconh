var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ElementBase = (function () {
    function ElementBase() {
    }
    ElementBase.prototype.reuse = function (gameObject) {
        this._gameObject = gameObject;
        this.start();
    };
    ElementBase.prototype.unuse = function () { };
    ElementBase.prototype.start = function () { };
    ElementBase.prototype.dispose = function () {
        if (this._diposeFlag)
            return;
        this._diposeFlag = true;
        this.disposeSelf();
    };
    ElementBase.prototype.disposeSelf = function () {
        this._gameObject = null;
    };
    return ElementBase;
}());
__reflect(ElementBase.prototype, "ElementBase", ["cw.IPool", "cw.IDispose"]);
//# sourceMappingURL=ElementBase.js.map