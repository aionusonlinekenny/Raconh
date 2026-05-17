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
 * pzx
 * 2017.11.6
 * 使用tips
 */
var UseItemsTips = (function (_super) {
    __extends(UseItemsTips, _super);
    function UseItemsTips() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("tips", "UseItemsTipsSkin");
        return _this;
    }
    UseItemsTips.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.touchChildren = true;
        this._goods.touchEnabled = false;
        this.onResizeHandler();
    };
    UseItemsTips.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._basePopupSkin.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closefun, this);
        this._useBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.useFun, this);
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closefun, this);
    };
    UseItemsTips.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._basePopupSkin.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closefun, this);
        this._useBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.useFun, this);
        this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closefun, this);
        _super.prototype.removeEvent.call(this);
    };
    UseItemsTips.prototype.onResizeHandler = function (e) {
        this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
    };
    UseItemsTips.prototype.closefun = function (e) {
        Manager.view.hide(66 /* UseItemsTips */);
        //if(this.parent)this.parent.removeChild(this);
    };
    UseItemsTips.prototype.useFun = function (e) {
        // switch(this._info.cvo.type)
        // {
        // 	case ItemsConst.TYPE_TITLE:
        // 		Manager.control.getDress().actTitle(this._info.cvo.type, this._info.cvo.id);
        // 	break;
        // 	default:
        // 		Manager.control.getItems().useItems(this._info.id,this._addScorlle.current,this._info.base_id);
        // 	break;
        // }
        Manager.model.getItems().useItems(this._info, this._addScorlle.current);
        Manager.view.hide(66 /* UseItemsTips */);
    };
    UseItemsTips.prototype.setData = function (value) {
        this._info = value;
        _super.prototype.setData.call(this, value);
    };
    UseItemsTips.prototype.drawData = function () {
        this._addScorlle.setData(this._info.quantity, true);
        this._nameTxt.text = this._info.cvo.name;
        this._goods.baseId = this._info.base_id;
        this._goods.count = this._info.quantity;
        _super.prototype.drawData.call(this);
    };
    UseItemsTips.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._useBtn.dispose();
        this._useBtn = null;
        this._closeBtn.dispose();
        this._closeBtn = null;
        Manager.pool.push(this._goods);
        this._goods = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._addScorlle.dispose();
        this._addScorlle = null;
        this._basePopupSkin.dispose();
        this._basePopupSkin = null;
        this._info = null;
    };
    return UseItemsTips;
}(BaseItemsTips));
__reflect(UseItemsTips.prototype, "UseItemsTips");
//# sourceMappingURL=UseItemsTips.js.map