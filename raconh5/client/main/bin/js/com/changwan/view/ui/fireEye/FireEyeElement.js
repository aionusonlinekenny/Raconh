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
 * 火眼金睛画布图标
 * liangyan
 * create 2018-03-21
*/
var FireEyeElement = /** @class */ (function (_super) {
    __extends(FireEyeElement, _super);
    function FireEyeElement() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.touchChildren = false;
        _this.start();
        _this.addEvent();
        return _this;
    }
    FireEyeElement.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    FireEyeElement.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    FireEyeElement.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    FireEyeElement.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    FireEyeElement.prototype.drawData = function () {
        if (this._data == null)
            return;
        if (!this._icon) {
            var path = Manager.path.getIconPath(this._data.cvo.resID);
            this._icon = Manager.pool.create(BitmapRemote);
            this._icon.load(path, -1, -1, this.setAnchor, this);
            this._icon.scaleX = this._icon.scaleY = this._data.scale / 100;
            this._icon.rotation = this._data.rotation;
            this.addChild(this._icon);
        }
        if (this._data.cvo.type == FireEyeItemCVO.TYPE_GOOD_CAT) {
            Manager.render.add(this.shake, this, 3000);
        }
    };
    FireEyeElement.prototype.setAnchor = function () {
        if (this._icon == null)
            return;
        this._icon.anchorOffsetX = this._icon.width / 2;
        this._icon.anchorOffsetY = this._icon.height / 2;
    };
    FireEyeElement.prototype.shake = function () {
        if (this._isShaking)
            return;
        var iconR = this._data.rotation;
        this._isShaking = true;
        egret.Tween.get(this._icon).to({ rotation: iconR - 45 }, 500).call(this.tweenCallBack, this, [iconR]);
    };
    FireEyeElement.prototype.tweenCallBack = function (iconR) {
        egret.Tween.get(this._icon).to({ rotation: iconR + 45 }, 500).call(this.tweenCallBack1, this);
    };
    FireEyeElement.prototype.tweenCallBack1 = function () {
        this._isShaking = false;
    };
    FireEyeElement.prototype.onTouchHandler = function (e) {
        if (this._data == null)
            return;
        if (this._data.selected)
            return;
        if (this._isDelay)
            return;
        Manager.control.getFireEye().selectByID(this._data.uniqueID, this._data.cvo.id);
        this._isDelay = true;
        Manager.render.add(this.delay, this, 800, 1, null, true);
    };
    FireEyeElement.prototype.delay = function () {
        this._isDelay = false;
    };
    Object.defineProperty(FireEyeElement.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    FireEyeElement.prototype.reuse = function (data) {
        this._data = data;
        this._isShaking = false;
        _super.prototype.reuse.call(this);
    };
    FireEyeElement.prototype.unuse = function () {
        this.removeEvent();
        Manager.render.remove(this.shake, this);
        Manager.render.remove(this.delay, this);
        egret.Tween.removeTweens(this._icon);
        _super.prototype.unuse.call(this);
        ObjectUtil.remove(this._icon);
        if (this._icon)
            Manager.pool.push(this._icon);
        this._icon = null;
        // if(this._status) Manager.pool.push(this._status);
        // this._status = null;
        this._data = null;
        this._isShaking = false;
        this._isDelay = false;
    };
    FireEyeElement.prototype.dispose = function () {
        this.removeEvent();
        Manager.render.remove(this.shake, this);
        Manager.render.remove(this.delay, this);
        egret.Tween.removeTweens(this._icon);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._icon);
        if (this._icon)
            Manager.pool.push(this._icon);
        this._icon = null;
        // if(this._status) Manager.pool.push(this._status);
        // this._status = null;
        this._data = null;
        this._isShaking = false;
        this._isDelay = false;
    };
    return FireEyeElement;
}(RenderSprite));
//# sourceMappingURL=FireEyeElement.js.map