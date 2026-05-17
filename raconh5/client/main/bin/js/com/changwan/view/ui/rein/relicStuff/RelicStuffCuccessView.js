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
 * 神器激活成功
 * pzx
 */
var RelicStuffCuccessView = /** @class */ (function (_super) {
    __extends(RelicStuffCuccessView, _super);
    function RelicStuffCuccessView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("relicStuff", "RelicStuffCuccessViewSkin");
        _this.visible = false;
        _this.touchChildren = false;
        _this.touchEnabled = true;
        return _this;
    }
    RelicStuffCuccessView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.onResizeHandler(null);
        this._diBit.load(Manager.path.getRelicStuffPath("relicStuffdi2"));
    };
    RelicStuffCuccessView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    RelicStuffCuccessView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    RelicStuffCuccessView.prototype.setData = function (data) {
        this._curCvo = data;
        this.invalidate(InvalidationType.DATA);
    };
    RelicStuffCuccessView.prototype.clearAni1 = function () {
        if (this._sucAni) {
            Manager.pool.push(this._sucAni);
            this._sucAni = null;
        }
    };
    RelicStuffCuccessView.prototype.drawData = function () {
        this._nameBit.load(Manager.path.getRelicStuffPath("label/name" + this._curCvo.id));
        this.clearAni();
        var arr = this._curCvo.ani_id.split("/");
        this._ani = Manager.animation.createPanelGlobalAnimation(this._curCvo.ani_id, arr[arr.length - 1]);
        this._ani.y = 116;
        this._ani.x = 5;
        var points = this._curCvo.point.split("|");
        this._ani.x = this._ani.x + Number(points[0]);
        this._ani.y = this._ani.y + Number(points[1]);
        this.addChildAt(this._ani, 3);
        this.clearAni1();
        this._sucAni = Manager.animation.createEffectAnimation("suc");
        this._sucAni.x = Math.round((this.width - 512) / 2);
        this._sucAni.y = Math.round((this.height - 258) / 2) + 150;
        this.addChild(this._sucAni);
    };
    RelicStuffCuccessView.prototype.clearAni = function () {
        if (this._ani) {
            Manager.pool.push(this._ani);
            this._ani = null;
        }
    };
    RelicStuffCuccessView.prototype.addEvent = function () {
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
        _super.prototype.addEvent.call(this);
    };
    RelicStuffCuccessView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    RelicStuffCuccessView.prototype.onTouchCloseHandler = function (e) {
        Manager.view.hide(125 /* RelicStuffCuccessView */);
    };
    RelicStuffCuccessView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        if (!this.visible)
            this.visible = true;
    };
    RelicStuffCuccessView.prototype.show = function (data) {
        this._curCvo = data;
        Manager.layer.tipsLayer.addChild(this);
    };
    RelicStuffCuccessView.prototype.hide = function () {
        this.dispose();
    };
    RelicStuffCuccessView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clearAni();
        this.clearAni1();
        this._curCvo = null;
        this._nameBit.dispose();
        this._nameBit = null;
        this._diBit.dispose();
        this._diBit = null;
    };
    return RelicStuffCuccessView;
}(UIComponent));
//# sourceMappingURL=RelicStuffCuccessView.js.map