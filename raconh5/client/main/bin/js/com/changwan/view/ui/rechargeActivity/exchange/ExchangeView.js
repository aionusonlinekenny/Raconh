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
 * drq
 * 兑换活动
 * 2018.4.19
 */
var ExchangeView = /** @class */ (function (_super) {
    __extends(ExchangeView, _super);
    function ExchangeView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("rechargeActivity", "RechargeActivityViewSkin");
        _this._cvo = ExchangeCVO.getCvo();
        return _this;
    }
    ExchangeView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getExchange();
        this.touchChildren = true;
        this._scroll.initBtnListData(ExchangeItem, [], true);
        this._scroll.touchEnabled = this._scroll.touchChildren = true;
        this._descTxt.lineSpacing = 15;
        this._descTxt.text = LangCVO.getContent("rechargeActivity8");
        this.drawTime();
        this.createItems();
    };
    ExchangeView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(ExchangeEvent.EXCHANGE_UPDATE, this.createItems, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.createItems, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.GOLD, this.createItems, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.VIP_LEVEL, this.createItems, this);
    };
    ExchangeView.prototype.removeEvent = function () {
        this._model.removeEventListener(ExchangeEvent.EXCHANGE_UPDATE, this.createItems, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.createItems, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.GOLD, this.createItems, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.VIP_LEVEL, this.createItems, this);
        _super.prototype.removeEvent.call(this);
    };
    ExchangeView.prototype.drawTime = function () {
        var num = this._model._endTime;
        var second = Math.round(num - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (second > 0) {
            this.countdown();
            Manager.render.add(this.countdown, this, 1000);
        }
        else {
            this.setIsFree();
            return;
        }
    };
    ExchangeView.prototype.countdown = function () {
        var num = this._model._endTime;
        var second = Math.round(num - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (second < 0) {
            this.setIsFree();
            Manager.render.remove(this.countdown, this);
            return;
        }
        var str = cw.DateUtil.formatStr(second, cw.DateUtil.LEFT_DD_HH_MM, true);
        str = HtmlUtil.addColorTag(str, "#fff7e7");
        HtmlUtil.setTextFlow(this._timeTxt, str);
    };
    ExchangeView.prototype.setIsFree = function () {
        HtmlUtil.setTextFlow(this._timeTxt, LangCVO.getContent("rechargeActivity7"));
    };
    ExchangeView.prototype.createItems = function () {
        //排序
        this.sortList();
        this._scroll.dataProvider(this._cvo);
        this._scroll;
    };
    ExchangeView.prototype.sortList = function () {
        for (var i = 0; i < this._cvo.length; i++) {
            var data = this._cvo[i];
            var any = this._model.getData(this._cvo[i]);
            if (data.maxCurent && data.curCount >= data.maxCurent) //已领取
             {
                this._cvo[i].sort = this._cvo.length + 1;
            }
            else if ((data.maxCurent == 0 || data.curCount < data.maxCurent) && any.cur_num1 >= any.num1 && any.cur_num2 >= any.num2 && any.curVip >= any.condValue) {
                this._cvo[i].sort = 0;
            }
        }
        for (var i = 0; i < this._cvo.length; i++) {
            for (var j = 0; j < this._cvo.length - 1; j++) {
                if (this._cvo[j].sort > this._cvo[j + 1].sort) {
                    var a = this._cvo[j + 1];
                    this._cvo[j + 1] = this._cvo[j];
                    this._cvo[j] = a;
                }
            }
        }
    };
    ExchangeView.prototype.dispose = function () {
        if (Manager.render.contains(this.countdown, this))
            Manager.render.remove(this.countdown, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._timeTxt, this._descTxt, this._model);
        this._timeTxt = null;
        this._descTxt = null;
        this._scroll.dispose();
        this._scroll = null;
        this._model = null;
        this._cvo = null;
    };
    return ExchangeView;
}(UIComponent));
//# sourceMappingURL=ExchangeView.js.map