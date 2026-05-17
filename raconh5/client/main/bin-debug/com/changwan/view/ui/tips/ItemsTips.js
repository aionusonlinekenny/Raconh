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
var ItemsTips = (function (_super) {
    __extends(ItemsTips, _super);
    function ItemsTips() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("tips", "ItemsTipsSkin");
        return _this;
    }
    ItemsTips.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._group.touchEnabled = false;
        this.onResizeHandler(null);
    };
    ItemsTips.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._tipspanel.addEventListener("closeView", this.closefun, this);
        this._useBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.useFun, this);
        this._fangruckBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.moveFun, this);
        this._quchuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.quchuFun, this);
        this._marketBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMarketHandler, this);
    };
    ItemsTips.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._tipspanel.removeEventListener("closeView", this.closefun, this);
        this._useBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.useFun, this);
        this._fangruckBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.moveFun, this);
        this._quchuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.quchuFun, this);
        this._marketBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMarketHandler, this);
    };
    ItemsTips.prototype.onMarketHandler = function () {
        if (OpenCVO.isOpen(OpenConst.ID_MARKET, true)) {
            if (this._info) {
                Manager.view.show(149 /* MarketSaleTipsView */, this._info);
                this.closefun(null);
            }
        }
    };
    ItemsTips.prototype.onResizeHandler = function (e) {
        this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
    };
    ItemsTips.prototype.closefun = function (e) {
        Manager.view.hide(9 /* ItemsTips */);
    };
    ItemsTips.prototype.useFun = function (e) {
        if (this._info) {
            var cvo = this._info.cvo;
            var i = cvo.openView;
            if (i == 1) {
                Manager.view.show(66 /* UseItemsTips */, this._info);
            }
            else if (i > 1) {
                var str = "" + i;
                var viewId = Math.round(i / 10);
                var tap = Number(str.substr(str.length - 1, 1));
                Manager.link.link(viewId, tap);
            }
            Manager.view.hide(9 /* ItemsTips */);
        }
    };
    ItemsTips.prototype.moveFun = function (e) {
        Manager.control.getItems().moveItems(2, 3, this._info.pos);
        Manager.view.hide(9 /* ItemsTips */);
    };
    ItemsTips.prototype.quchuFun = function (e) {
        Manager.control.getItems().moveItems(3, 2, this._info.pos);
        Manager.view.hide(9 /* ItemsTips */);
    };
    ItemsTips.prototype.setData = function (value) {
        _super.prototype.setData.call(this, value);
    };
    ItemsTips.prototype.drawData = function () {
        var value = this._data;
        var cvo;
        this._marketBtn.visible = false;
        if (value instanceof ItemsModelInfo) {
            this._info = value;
            cvo = this._info.cvo;
            this._tipspanel.setData(cvo, this._info.quantity, this._info.bind);
            this._bgImg.visible = true;
            this._bgImg.height = 236;
            this._tipspanel.x = 0;
            this._tipspanel.y = 0;
            if (this._info.storagetype == 0) {
                this._bgImg.visible = false;
                this._useBtn.visible = false;
                this._fangruckBtn.visible = false;
                this._quchuBtn.visible = false;
                this._tipspanel.horizontalCenter = "0";
                this._tipspanel.verticalCenter = "0";
            }
            else if (this._info.storagetype == ItemsType.BAG) {
                this._fangruckBtn.visible = true;
                this._quchuBtn.visible = false;
                if (cvo.openView == 0) {
                    this._useBtn.visible = false;
                    this._fangruckBtn.y = 26;
                    this._bgImg.height = 135;
                }
                else {
                    this._useBtn.visible = true;
                    this._fangruckBtn.y = 125;
                }
                if (!this._info.bind && cvo.market > 0) {
                    this._marketBtn.y = this._fangruckBtn.y + 90;
                    this._bgImg.height = this._marketBtn.y + 110;
                    this._marketBtn.visible = true;
                }
            }
            else if (this._info.storagetype == ItemsType.DEPOT) {
                this._useBtn.visible = false;
                this._fangruckBtn.visible = false;
                this._quchuBtn.visible = true;
                this._bgImg.height = 135;
            }
        }
        else if (value instanceof ItemsCVO) {
            this._tipspanel.setData(value, 1);
            this._bgImg.visible = false;
            this._useBtn.visible = false;
            this._fangruckBtn.visible = false;
            this._quchuBtn.visible = false;
            this._tipspanel.horizontalCenter = "0";
            this._tipspanel.verticalCenter = "0";
        }
        _super.prototype.drawData.call(this);
    };
    ItemsTips.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._tipspanel.dispose();
        this._tipspanel = null;
        if (this._info)
            this._info = null;
        this._useBtn.dispose();
        this._useBtn = null;
        this._fangruckBtn.dispose();
        this._fangruckBtn = null;
        this._quchuBtn.dispose();
        this._quchuBtn = null;
        this._bgImg = null;
    };
    return ItemsTips;
}(BaseItemsTips));
__reflect(ItemsTips.prototype, "ItemsTips");
//# sourceMappingURL=ItemsTips.js.map