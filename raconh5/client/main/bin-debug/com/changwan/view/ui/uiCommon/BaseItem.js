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
 * 物品基类
 */
var BaseItem = (function (_super) {
    __extends(BaseItem, _super);
    function BaseItem() {
        var _this = _super.call(this) || this;
        _this.start();
        _this.addEvent();
        return _this;
    }
    BaseItem.prototype.start = function () {
        _super.prototype.start.call(this);
        this.width = 141;
        this.height = 141;
        this._itemImg = Manager.pool.create(BitmapRemote);
        this._itemImg.x = 31;
        this._itemImg.y = 31;
        this.addChild(this._itemImg);
    };
    BaseItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickFun, this);
    };
    BaseItem.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickFun, this);
        _super.prototype.removeEvent.call(this);
    };
    BaseItem.prototype.clickFun = function (e) {
        if (this._itemInfo.cvo) {
            if (this._itemInfo.cvo.group == 1) {
                Manager.view.show(20 /* BagEquipTips */, this._itemInfo);
            }
            else {
                Manager.view.show(9 /* ItemsTips */, this._itemInfo);
            }
        }
    };
    BaseItem.prototype.reuse = function (itemInfo) {
        _super.prototype.reuse.call(this);
        this.touchEnabled = true;
        this._itemInfo = itemInfo;
        if (this._itemInfo)
            this._itemImg.load(Manager.path.getIconPath(this._itemInfo.cvo.imgId), 80, 80);
    };
    BaseItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clean();
    };
    BaseItem.prototype.clean = function () {
        if (this._itemImg)
            Manager.pool.push(this._itemImg);
        this._itemImg = null;
        this._itemInfo = null;
    };
    BaseItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._itemImg);
        this.clean();
    };
    return BaseItem;
}(Sprite));
__reflect(BaseItem.prototype, "BaseItem");
//# sourceMappingURL=BaseItem.js.map