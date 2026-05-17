var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
 * 火眼金睛√×
 * liangyan
 * create 2018-04-03
*/
var FireEyeStatus = (function (_super) {
    __extends(FireEyeStatus, _super);
    function FireEyeStatus() {
        return _super.call(this) || this;
    }
    FireEyeStatus.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawLayout();
    };
    FireEyeStatus.prototype.drawLayout = function () {
        if (this._bm == null) {
            this._bm = Manager.pool.create(BitmapRes, this._status ? "fireEye_right_png" : "fireEye_wrong_png");
            this.addChild(this._bm);
        }
        Manager.render.add(this.remove, this, this._status ? 500 : 3000, 1);
    };
    FireEyeStatus.prototype.remove = function () {
        Manager.render.remove(this.remove, this);
        Manager.pool.push(this);
    };
    FireEyeStatus.prototype.reuse = function (status) {
        this._status = status;
        _super.prototype.reuse.call(this);
    };
    FireEyeStatus.prototype.unuse = function () {
        Manager.render.remove(this.remove, this);
        _super.prototype.unuse.call(this);
        if (this._bm)
            Manager.pool.push(this._bm);
        this._bm = null;
        this._status = false;
    };
    FireEyeStatus.prototype.dispose = function () {
        Manager.render.remove(this.remove, this);
        _super.prototype.dispose.call(this);
        if (this._bm)
            Manager.pool.push(this._bm);
        this._bm = null;
    };
    return FireEyeStatus;
}(RenderSprite));
__reflect(FireEyeStatus.prototype, "FireEyeStatus");
//# sourceMappingURL=FireEyeStatus.js.map