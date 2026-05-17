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
 * 珍宝阁界面
 * pzx
 * create 2018-2-3
*/
var TreasureGarretView = /** @class */ (function (_super) {
    __extends(TreasureGarretView, _super);
    function TreasureGarretView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("rein/treasureGarret", "TreasureGarretViewSkin");
        return _this;
    }
    TreasureGarretView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._itemList) {
            this._itemList = [];
            for (var i = 0; i < 6; i++) {
                this._itemList[i] = this["_item" + i];
            }
        }
        this._res.iconSize = PlayerResItems.ICON_54;
        this._res.sign = "";
        this._res.fontSize(26);
        this._model = Manager.model.getShop().treasureGarretModel;
        Manager.control.getShop().treasureGarretQuery();
        this._resGroup.touchEnabled = false;
        this._resGroup.touchChildren = false;
        this._mianfeishuaxinImg.touchEnabled = false;
    };
    TreasureGarretView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._reinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getShop().addEventListener(ShopEvent.SHOP_UPDATE_EVENT, this.drawData, this);
        Manager.model.getShop().addEventListener(ShopEvent.SHOP_BUY_EVENT, this.drawData, this);
    };
    TreasureGarretView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._reinBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getShop().removeEventListener(ShopEvent.SHOP_UPDATE_EVENT, this.drawData, this);
        Manager.model.getShop().removeEventListener(ShopEvent.SHOP_BUY_EVENT, this.drawData, this);
    };
    TreasureGarretView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    TreasureGarretView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    TreasureGarretView.prototype.drawData = function () {
        var arr = Manager.model.getShop().getList(ShopType.TREASUREGARRET_TYPE);
        if (!arr)
            return;
        this._list = this._model.shopList();
        if (!this._list)
            return;
        this._redIcon.visible = false;
        var cvos = [];
        for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
            var shopId = _a[_i];
            var cvo = ShopCVO.getCvo(shopId);
            cvos.push(cvo);
        }
        cvos = ArrayUtil.sortOn(cvos, ["sort"]);
        for (var _b = 0, cvos_1 = cvos; _b < cvos_1.length; _b++) {
            var cvo = cvos_1[_b];
            var j = arr.get(cvo.id);
            if (j) {
                cvo.setCount(j);
            }
            else {
                cvo.setCount(0);
            }
        }
        var ln = this._itemList.length;
        for (var i = 0; i < ln; i++) {
            var item = this._itemList[i];
            if (cvos[i]) {
                item.setData(cvos[i]);
            }
        }
        var treaCvo = TreasureGarretCVO.getCvo(this._model.count());
        var loss = new GainLossVO(treaCvo.loss);
        this._res.setData(loss);
        if (this._model.checkfreeTime()) {
            this.setIsFree();
        }
        else
            this.drawTime();
    };
    TreasureGarretView.prototype.drawTime = function () {
        var second = Math.round(this._model.freeTime - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (second > 0) {
            this._mianfeishuaxinImg.visible = false;
            this._resGroup.visible = true;
            this.countdown();
            Manager.render.add(this.countdown, this, 1000);
        }
        else {
            this.setIsFree();
            return;
        }
    };
    TreasureGarretView.prototype.countdown = function () {
        var second = Math.round(this._model.freeTime - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (second <= 0) {
            this.setIsFree();
            Manager.render.remove(this.countdown, this);
            return;
        }
        var str = LangCVO.getContent("shop2");
        this._timeTxt.text = str + cw.DateUtil.formatStr(second, cw.DateUtil.LEFT_HH_MM_SS, true);
    };
    TreasureGarretView.prototype.setIsFree = function () {
        this._timeTxt.text = ""; //本次免费
        this._redIcon.visible = true;
        this._mianfeishuaxinImg.visible = true;
        this._resGroup.visible = false;
    };
    TreasureGarretView.prototype.onTouchHandler = function (e) {
        if (!this._model.checkfreeTime() && this._model.count() >= TreasureGarretCVO.max_count) {
            FloatTips.addTips(LangCVO.getContent("shop3"), Color.RED);
            return;
        }
        Manager.control.getShop().treasureGarretUpdate();
    };
    TreasureGarretView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    TreasureGarretView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    TreasureGarretView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (Manager.render.contains(this.countdown, this))
            Manager.render.remove(this.countdown, this);
        ObjectUtil.removes(this._resGroup, this._redIcon);
        ObjectUtil.disposes(this._reinBtn, this._timeTxt, this._countTxt, this._res);
        for (var _i = 0, _a = this._itemList; _i < _a.length; _i++) {
            var item = _a[_i];
            item.dispose();
        }
        this._itemList = null;
        this._reinBtn = null;
        this._item0 = null;
        this._item1 = null;
        this._item2 = null;
        this._item3 = null;
        this._item4 = null;
        this._item5 = null;
        this._timeTxt = null;
        this._countTxt = null;
        this._res = null;
        this._model = null;
        this._list = null;
        this._redIcon = null;
        this._mianfeishuaxinImg = null;
        this._resGroup = null;
    };
    return TreasureGarretView;
}(UIComponent));
//# sourceMappingURL=TreasureGarretView.js.map