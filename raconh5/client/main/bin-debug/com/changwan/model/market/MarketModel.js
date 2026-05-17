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
 * 18.4.17
 * 市场model
 */
var MarketModel = (function (_super) {
    __extends(MarketModel, _super);
    function MarketModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MarketModel.prototype.queryList = function (arr) {
        this._list = arr;
        this.dispatchEvent(new MarketEvent(MarketEvent.MARKET_LIST_INFO_EVENT));
    };
    MarketModel.prototype.updDateList = function (type, id, name) {
        if (!this._list)
            return;
        if (type == 1) {
            var info = new MarketPlayNameInfo;
            info.play_Id = id;
            info.name = name;
            this._list.push(info);
        }
        else if (type == 2) {
            for (var i = this._list.length - 1; i > -1; i--) {
                if (this._list[i].play_Id == id) {
                    this._list.splice(i, 1);
                }
            }
        }
        this.dispatchEvent(new MarketEvent(MarketEvent.MARKET_LIST_INFO_EVENT));
    };
    //当前选中玩家的摊位信息，包括自己的摊位
    MarketModel.prototype.setMarketInfo = function (info) {
        if (info.play_id == Manager.model.self.id) {
            this._selfPalyerInfo = info;
        }
        else {
            this._curPlayInfo = info;
        }
        this.dispatchEvent(new MarketEvent(MarketEvent.MARKET_PLAYER_INFO_EVENT));
    };
    //上架成功返回
    MarketModel.prototype.setSaleItem = function (ip) {
        var id = ip.readInt();
        if (this.curSaleItem && this.curSaleItem.id == id) {
            var info = new MarketItemInfo;
            info.base_id = this.curSaleItem.base_id;
            info.pos = ip.readInt();
            info.quantity = ip.readShort();
            info.price = ip.readInt();
            info.sale_time = ip.readInt();
            //info.infoList = this.curSaleItem.infoList;
            if (this._selfPalyerInfo) {
                this._selfPalyerInfo.itemList.push(info);
            }
            this.curSaleItem = null;
        }
        this.dispatchEvent(new MarketEvent(MarketEvent.MARKET_PLAYER_INFO_EVENT));
    };
    //下架返回
    MarketModel.prototype.noSaleItem = function (pos) {
        var arr = this._selfPalyerInfo.itemList;
        for (var i = arr.length - 1; i > -1; i--) {
            var item = arr[i];
            if (item.pos == pos) {
                arr.splice(i, 1);
                this.dispatchEvent(new MarketEvent(MarketEvent.MARKET_PLAYER_INFO_EVENT));
                break;
            }
        }
    };
    MarketModel.prototype.buyInfo = function (palyId, pos, count) {
        if (this._curPlayInfo.play_id == palyId) {
            var arr = this._curPlayInfo.itemList;
            for (var i = arr.length - 1; i > -1; i--) {
                var item = arr[i];
                if (item.pos == pos) {
                    if (count == 0) {
                        arr.splice(i, 1);
                        this.dispatchEvent(new MarketEvent(MarketEvent.MARKET_BUY_EVENT));
                        // if(arr.length== 0)
                        // {
                        //     for(let j:number= this._list.length -1;j>-1;j--)
                        //     {
                        //         if(palyId == this._list[j].play_Id)
                        //         {
                        //             this._list.splice(j,1);
                        //             this.dispatchEvent(new MarketEvent(MarketEvent.MARKET_UPD_LIST_EVENT));
                        //         }
                        //     }
                        // }
                    }
                    else {
                        item.quantity = count;
                    }
                    break;
                }
            }
        }
    };
    MarketModel.prototype.noticeList = function (arr) {
        this._noticeList = ArrayUtil.sortOn(arr, ["sale_time"], [1]);
        this.dispatchEvent(new MarketEvent(MarketEvent.MARKET_QUERY_NOTICE_EVENT));
    };
    Object.defineProperty(MarketModel.prototype, "list", {
        //获得列表
        get: function () {
            return this._list;
        },
        enumerable: true,
        configurable: true
    });
    MarketModel.prototype.getPlayerMarketInfo = function () {
        return this._curPlayInfo;
    };
    /** 自己的摊位信息 */
    MarketModel.prototype.getSelfMarketInfo = function () {
        return this._selfPalyerInfo;
    };
    /** 交易记录列表 */
    MarketModel.prototype.getnoticeList = function () {
        return this._noticeList;
    };
    return MarketModel;
}(egret.EventDispatcher));
__reflect(MarketModel.prototype, "MarketModel");
//# sourceMappingURL=MarketModel.js.map