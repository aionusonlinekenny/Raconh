var ElementBase = /** @class */ (function () {
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
//# sourceMappingURL=ElementBase.js.map