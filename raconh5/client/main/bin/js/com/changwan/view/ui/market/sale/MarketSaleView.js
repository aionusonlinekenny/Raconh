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
 * 市场上架
 * pzx
 * create 2018-4-12
 */
var MarketSaleView = /** @class */ (function (_super) {
    __extends(MarketSaleView, _super);
    function MarketSaleView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("market", "MarketSaleViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    MarketSaleView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._bagModel = Manager.model.getItems();
        this._model = Manager.model.getmarketModel();
        this._bagModel.sortBagList();
        this._vscroll.initBtnListData(MarketSaleBagItem, [], true);
        if (!this._itemList) {
            this._itemList = [this._item0, this._item1, this._item2, this._item3, this._item4, this._item5, this._item6, this._item7];
        }
        Manager.control.getmarket().playerInfo(Manager.model.self.id);
    };
    MarketSaleView.prototype.addEvent = function () {
        this._bagModel.addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.drawBagData, this);
        this._jiluImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._model.addEventListener(MarketEvent.MARKET_PLAYER_INFO_EVENT, this.drawPalyerInfoHandler, this);
        _super.prototype.addEvent.call(this);
    };
    MarketSaleView.prototype.removeEvent = function () {
        this._bagModel.removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.drawBagData, this);
        this._jiluImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._model.removeEventListener(MarketEvent.MARKET_PLAYER_INFO_EVENT, this.drawPalyerInfoHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    MarketSaleView.prototype.onTouchHandler = function (e) {
        if (e.target == this._jiluImg) {
            Manager.view.show(146 /* MarketSaleNotesView */);
        }
    };
    //玩家摊位信息返回
    MarketSaleView.prototype.drawPalyerInfoHandler = function () {
        this._curPlayInfo = this._model.getSelfMarketInfo();
        if (this._curPlayInfo.play_id == Manager.model.self.id) {
            var arr = this._curPlayInfo.itemList;
            for (var i = this._itemList.length - 1; i > -1; i--) {
                if (arr[i]) {
                    this._itemList[i].setData(arr[i]);
                }
                else {
                    this._itemList[i].clear();
                }
            }
            this._curTxt.text = arr.length + "/" + 8;
        }
    };
    MarketSaleView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawBagData(null);
    };
    MarketSaleView.prototype.drawBagData = function (e) {
        if (e == null || e.params == ItemsType.BAG) {
            var arr = this._bagModel.bagList;
            var infoList = [];
            var ln = arr.length;
            var list = [];
            for (var i = 0; i < ln; i++) {
                if (list.length > 4) {
                    infoList.push(list);
                    list = [];
                }
                if (arr[i].cvo.market > 0 && !arr[i].bind) {
                    list.push(arr[i]);
                }
            }
            if (list.length != 0 && list.length <= 4) {
                infoList.push(list);
            }
            while (infoList.length < 3) {
                infoList.push([]);
            }
            this._vscroll.dataProvider(infoList);
        }
    };
    MarketSaleView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    MarketSaleView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    MarketSaleView.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.removes(this._jiluImg);
            ObjectUtil.disposes(this._curTxt, this._vscroll);
            this._itemList.forEach(function (item, i) {
                item.dispose();
            });
        }
        this._jiluImg = null;
        this._curTxt = null;
        this._vscroll = null;
        this._item0 = null;
        this._item1 = null;
        this._item2 = null;
        this._item3 = null;
        this._item4 = null;
        this._item5 = null;
        this._item6 = null;
        this._item7 = null;
        this._bagModel = null;
        this._model = null;
        this._curPlayInfo = null;
        this._itemList = null;
    };
    MarketSaleView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return MarketSaleView;
}(UIComponent));
//# sourceMappingURL=MarketSaleView.js.map