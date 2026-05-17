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
var BagEquipTips = /** @class */ (function (_super) {
    __extends(BagEquipTips, _super);
    function BagEquipTips() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("tips", "BagEquipTipsSkin");
        return _this;
    }
    BagEquipTips.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._group.touchEnabled = false;
        this.onResizeHandler(null);
    };
    BagEquipTips.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._equipTips._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closefun, this);
        this._useBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.useFun, this);
        this._fangruckBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.moveFun, this);
        this._quchuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.quchuFun, this);
    };
    BagEquipTips.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._equipTips._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closefun, this);
        this._useBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.useFun, this);
        this._fangruckBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.moveFun, this);
        this._quchuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.quchuFun, this);
    };
    BagEquipTips.prototype.onResizeHandler = function (e) {
        this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
    };
    BagEquipTips.prototype.closefun = function (e) {
        Manager.view.hide(20 /* BagEquipTips */);
    };
    BagEquipTips.prototype.useFun = function (e) {
        Manager.control.getItems().moveItems(this._info.storagetype, ItemsType.EQUIE, this._info.pos);
        Manager.view.hide(20 /* BagEquipTips */);
    };
    BagEquipTips.prototype.moveFun = function (e) {
        Manager.control.getItems().moveItems(2, 3, this._info.pos);
        Manager.view.hide(20 /* BagEquipTips */);
    };
    BagEquipTips.prototype.quchuFun = function (e) {
        Manager.control.getItems().moveItems(3, 2, this._info.pos);
        Manager.view.hide(20 /* BagEquipTips */);
    };
    BagEquipTips.prototype.setData = function (value) {
        _super.prototype.setData.call(this, value);
    };
    BagEquipTips.prototype.drawData = function () {
        var value = this._data;
        if (value instanceof ItemsModelInfo) {
            this._info = value;
            this._equipTips.setData(this._info.cvo, value);
            this._bgImg.visible = true;
            this._bgImg.height = 236;
            this._equipTips.x = 0;
            this._equipTips.y = 0;
            if (this._info.storagetype == 0) {
                this._bgImg.visible = false;
                this._useBtn.visible = false;
                this._fangruckBtn.visible = false;
                this._quchuBtn.visible = false;
                this._equipTips.horizontalCenter = "0";
                this._equipTips.verticalCenter = "0";
            }
            else if (this._info.storagetype == ItemsType.BAG) {
                this._useBtn.visible = true;
                this._fangruckBtn.visible = true;
                this._quchuBtn.visible = false;
            }
            else if (this._info.storagetype == ItemsType.DEPOT) {
                this._useBtn.visible = false;
                this._fangruckBtn.visible = false;
                this._quchuBtn.visible = true;
                this._bgImg.height = 135;
            }
        }
        else if (value instanceof ItemsCVO) {
            this._equipTips.setData(value);
            this._bgImg.visible = false;
            this._useBtn.visible = false;
            this._fangruckBtn.visible = false;
            this._quchuBtn.visible = false;
            this._equipTips.horizontalCenter = "0";
            this._equipTips.verticalCenter = "0";
        }
        _super.prototype.drawData.call(this);
    };
    BagEquipTips.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._equipTips.dispose();
        if (this._info)
            this._info = null;
        this._bgImg.parent.removeChild(this._bgImg);
        this._bgImg = null;
        ObjectUtil.disposes(this._useBtn, this._fangruckBtn, this._quchuBtn);
        this._useBtn = null;
        this._fangruckBtn = null;
        this._quchuBtn = null;
    };
    return BagEquipTips;
}(BaseItemsTips));
//# sourceMappingURL=BagEquipTips.js.map