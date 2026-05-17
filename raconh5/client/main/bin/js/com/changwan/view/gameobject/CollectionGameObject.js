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
 * 采集物对象信息类
 * Simon
 * create 2018-3-12
*/
var CollectionGameObject = /** @class */ (function (_super) {
    __extends(CollectionGameObject, _super);
    function CollectionGameObject() {
        return _super.call(this) || this;
    }
    CollectionGameObject.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    CollectionGameObject.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    CollectionGameObject.prototype.onClickHandler = function (e) {
        if (this._collectionInfo && this._collectionInfo.effectName) {
            Manager.model.self.collect(this._collectionInfo, this._collectionInfo.callback, this._collectionInfo.target);
        }
    };
    CollectionGameObject.prototype.pick = function () {
        this.onClickHandler();
    };
    CollectionGameObject.prototype.reuse = function (info) {
        this._collectionInfo = info;
        _super.prototype.reuse.call(this, info);
        this.touchEnabled = true;
    };
    CollectionGameObject.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        if (this._effect) {
            Manager.pool.push(this._effect);
            this._effect = null;
        }
    };
    CollectionGameObject.prototype.drawAll = function () {
        this.move(this._info.x, this._info.y);
        //显示物品
        this._effect = Manager.animation.createEffectAnimation(this._collectionInfo.effectName);
        this.addChild(this._effect);
    };
    //     private onComplete():void
    //     {  
    // 　　     Manager.model.getGameobject().removeGameObject(this.info);
    //     }
    CollectionGameObject.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        if (this._effect) {
            Manager.pool.push(this._effect);
            this._effect = null;
        }
        this._collectionInfo = null;
    };
    return CollectionGameObject;
}(GameObject));
//# sourceMappingURL=CollectionGameObject.js.map