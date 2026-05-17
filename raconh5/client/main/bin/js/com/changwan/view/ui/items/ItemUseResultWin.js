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
 * 使用礼包返回结果
 * 17.12.29
 * pzx
 */
var ItemUseResultWin = /** @class */ (function (_super) {
    __extends(ItemUseResultWin, _super);
    function ItemUseResultWin() {
        return _super.call(this) || this;
    }
    ItemUseResultWin.prototype.setskinname = function () {
        this.skinName = Manager.path.getSkinName("Items", "ItemUseResultWinSkin");
    };
    ItemUseResultWin.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getItems();
    };
    /**
     * @param value 道具baseid
    */
    ItemUseResultWin.prototype.show = function (infos, value) {
        this._infos = infos;
        this._baseId = value;
        if (this.parent == null) {
            this.x = (Manager.config.gameWidth - this.width) >> 1;
            this.y = 213;
            Manager.layer.tipsLayer.addChild(this);
        }
        this.invalidate(InvalidationType.DATA);
    };
    ItemUseResultWin.prototype.drawData = function () {
        var goodsLen = this._goodItems.length;
        var infosLen = this._infos.length;
        var max = goodsLen > infosLen ? goodsLen : infosLen;
        var lineMaxCount = 4; //单行最多个数
        var dis = 128; //两个的位置差
        var item;
        for (var i = 0; i < max; i++) {
            if (i < infosLen) {
                if (i >= goodsLen) {
                    item = Manager.pool.create(LifeGridHunResultItem);
                    this._currentView.addChild(item);
                    this._goodItems.push(item);
                }
                this._goodItems[i].x = (i % lineMaxCount) * dis;
                this._goodItems[i].y = Math.floor(i / lineMaxCount) * 182;
                this._goodItems[i].setData(this._infos[i]);
            }
            else {
                Manager.pool.push(Goods);
            }
        }
        var cvo = ItemsCVO.getCvo(this._baseId);
        var count = this._model.getCountItemById(this._baseId);
        if (count > 0) {
            this._group.visible = true;
            this._back.btn.visible = false;
            this._lossTxt0.text = cvo.name + "x" + count;
        }
        else {
            this._group.visible = false;
            this._back.btn.visible = true;
        }
    };
    ItemUseResultWin.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._back.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._back.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._hontTenBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ItemUseResultWin.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._back.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._back.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._hontTenBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ItemUseResultWin.prototype.onClickHandler = function (e) {
        var btn = e.target;
        if (btn == this._hontTenBtn) {
            var count = this._model.getCountItemById(this._baseId);
            if (count > 0) {
                var info = this._model.getItemModesInfo(this._baseId);
                Manager.view.show(66 /* UseItemsTips */, info);
            }
        }
        Manager.view.hide(65 /* ItemUseResultWin */);
    };
    ItemUseResultWin.prototype.disposedraw = function () {
        this._model = null;
        this._baseId = 0;
    };
    return ItemUseResultWin;
}(LifeGridHunResultWin));
//# sourceMappingURL=ItemUseResultWin.js.map