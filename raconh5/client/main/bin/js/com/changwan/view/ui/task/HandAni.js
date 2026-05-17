var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 点击手势
 * luzh
 * 2018.2.26
 */
var HandAni = /** @class */ (function (_super) {
    __extends(HandAni, _super);
    function HandAni(x, y) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this.play();
        return _this;
    }
    HandAni.prototype.countDown = function () {
        this._isFirst = !this._isFirst;
        this.source = this._isFirst ? "guide_hand0_png" : "guide_hand1_png";
    };
    HandAni.prototype.play = function () {
        Manager.render.add(this.countDown, this, 500);
    };
    HandAni.prototype.pause = function () {
        Manager.render.remove(this.countDown, this);
    };
    HandAni.prototype.dispose = function () {
        if (Manager.render.contains(this.countDown, this))
            Manager.render.remove(this.countDown, this);
        if (this.parent != null)
            this.parent.removeChild(this);
    };
    return HandAni;
}(eui.Image));
//# sourceMappingURL=HandAni.js.map