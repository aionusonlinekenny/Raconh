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
 * 市场吊牌
 * pzx
 * create 2018-4-11
 */
var MarketView = (function (_super) {
    __extends(MarketView, _super);
    function MarketView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("market", "MarketViewSkin");
        return _this;
    }
    MarketView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.touchChildren = true;
        this._hScroll.initBtnListData(MarketPlayerNameItem, [], true);
        this._model = Manager.model.getmarketModel();
        Manager.control.getmarket().query();
        if (!this._itemList) {
            this._itemList = [this._item0, this._item1, this._item2, this._item3, this._item4, this._item5, this._item6, this._item7];
        }
        if (!this._bimCareer) {
            this._bimCareer = Manager.pool.create(BitmapRemote);
            this._bimCareer.x = 25;
            this._bimCareer.y = 398;
            this.addChildAt(this._bimCareer, 0);
            this._bimCareer.load(Manager.path.getPanelUiImgPath("market/market_career_1", "png"));
        }
    };
    MarketView.prototype.addEvent = function () {
        this._model.addEventListener(MarketEvent.MARKET_LIST_INFO_EVENT, this.drawListHanler, this);
        this._model.addEventListener(MarketEvent.MARKET_PLAYER_INFO_EVENT, this.drawPalyerInfoHandler, this);
        this._hScroll.itemList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);
        this._model.addEventListener(MarketEvent.MARKET_UPD_LIST_EVENT, this.drawList, this);
        this._friendsImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addFriendHandler, this);
        this._model.addEventListener(MarketEvent.MARKET_BUY_EVENT, this.onBuyHandler, this);
        _super.prototype.addEvent.call(this);
    };
    MarketView.prototype.removeEvent = function () {
        this._model.removeEventListener(MarketEvent.MARKET_LIST_INFO_EVENT, this.drawListHanler, this);
        this._model.removeEventListener(MarketEvent.MARKET_PLAYER_INFO_EVENT, this.drawPalyerInfoHandler, this);
        this._hScroll.itemList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);
        this._model.removeEventListener(MarketEvent.MARKET_UPD_LIST_EVENT, this.drawList, this);
        this._friendsImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addFriendHandler, this);
        this._model.removeEventListener(MarketEvent.MARKET_BUY_EVENT, this.onBuyHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    /** 购买返回 */
    MarketView.prototype.onBuyHandler = function () {
        var index = Math.round(Math.random() * 4);
        this._npcTxt.text = LangCVO.getContent("market2" + index);
        this.drawPalyerInfoHandler();
    };
    //加好友
    MarketView.prototype.addFriendHandler = function () {
        if (this._model.getPlayerMarketInfo())
            Manager.control.getFriends().addFriends(this._model.getPlayerMarketInfo().play_id, 1);
    };
    /**列表返回 */
    MarketView.prototype.drawListHanler = function () {
        if (this._model.list[0]) {
            this._model.list[0].isClick = true;
            Manager.control.getmarket().playerInfo(this._model.list[0].play_Id);
            this._selectIndex = 0;
        }
        this.drawList();
    };
    MarketView.prototype.drawList = function () {
        this._hScroll.dataProvider(this._model.list);
    };
    //玩家摊位信息返回
    MarketView.prototype.drawPalyerInfoHandler = function () {
        this._curPlayInfo = this._model.getPlayerMarketInfo();
        var index = Math.round(Math.random() * 4);
        this._npcTxt.text = LangCVO.getContent("market1" + index);
        if (this._curPlayInfo) {
            //this._bimCareer.load(Manager.path.getPanelUiImgPath("market/market_career_"+this._curPlayInfo.career,"png"))
            var arr = this._curPlayInfo.itemList;
            for (var i = this._itemList.length - 1; i > -1; i--) {
                if (arr[i]) {
                    this._itemList[i].setData(arr[i]);
                    this._itemList[i].visible = true;
                }
                else {
                    this._itemList[i].visible = false;
                }
            }
            if (!this._kuanImg.visible)
                this._kuanImg.visible = true;
        }
    };
    //点击玩家名，请求摊位信息
    MarketView.prototype.onShortcutHandler = function (e) {
        if (e.target instanceof List)
            return;
        var index = this._hScroll.itemList.selectedIndex;
        if (index < 0)
            return;
        if (index == this._selectIndex) {
            return;
        }
        var item = this._hScroll.itemList.getChildAt(index);
        if (!this._selectedItem) {
            this._selectedItem = this._hScroll.itemList.getChildAt(0);
        }
        this._selectedItem.setSelect(false);
        this._selectedItem = item;
        var info = this._selectedItem.data;
        Manager.control.getmarket().playerInfo(info.play_Id);
        this._selectedItem.setSelect(true);
        this._selectIndex = index;
    };
    MarketView.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    MarketView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
    };
    MarketView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    MarketView.prototype.setData = function (data) {
        this.invalidate(InvalidationType.DATA);
    };
    MarketView.prototype.drawData = function () {
    };
    MarketView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    MarketView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    MarketView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._friendsImg, this._kuanImg);
        ObjectUtil.disposes(this._hScroll, this._npcTxt);
        this._friendsImg = null;
        this._hScroll = null;
        this._model = null;
        this._selectedItem = null;
        this._item0 = null;
        this._item1 = null;
        this._item2 = null;
        this._item3 = null;
        this._item4 = null;
        this._item5 = null;
        this._item6 = null;
        this._item7 = null;
        this._itemList.forEach(function (item, i) {
            item.dispose();
        });
        this._itemList = null;
        ;
        this._curPlayInfo = null;
        Manager.pool.push(this._bimCareer);
        this._bimCareer = null;
        this._npcTxt = null;
        this._kuanImg = null;
    };
    return MarketView;
}(UIComponent));
__reflect(MarketView.prototype, "MarketView");
//# sourceMappingURL=MarketView.js.map