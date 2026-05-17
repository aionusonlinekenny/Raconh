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
 * 兑换活动 item
 * 2018.4.19
 */
var ExchangeItem = /** @class */ (function (_super) {
    __extends(ExchangeItem, _super);
    function ExchangeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("rechargeActivity", "ExchangeItemSkin");
        _this._cvo = ExchangeCVO.getCvo();
        _this._model = Manager.model.getExchange();
        _this._end = _this._model._endTime;
        return _this;
    }
    ExchangeItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._duihuanImg.touchEnabled = false;
        this._ilingquImg.touchEnabled = false;
        this.addEvent();
    };
    ExchangeItem.prototype.addEvent = function () {
        this._enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ExchangeItem.prototype.removeEvent = function () {
        this._enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ExchangeItem.prototype.onClickHandler = function () {
        var second = Math.round(this._end - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (second <= 0) {
            FloatTips.addTips(LangCVO.getContent("rechargeActivity10"), Color.RED);
            return;
        }
        if (this.data.id) {
            var any = this._model.getData(this.data);
            if (any.curVip < any.condValue) {
                FloatTips.addTips(LangCVO.getContent("rechargeActivity11", any.condValue), Color.RED);
            }
            else if (any.cur_num1 < any.num1 || any.cur_num2 < any.num2) {
                FloatTips.addTips(LangCVO.getContent("rechargeActivity9"), Color.RED);
            }
            else {
                Manager.control.getExchange().sendExchange(this.data.id);
            }
        }
    };
    ExchangeItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.createItem();
        var any = this._model.getData(this.data);
        this.updateItem(any);
    };
    ExchangeItem.prototype.createItem = function () {
        //消耗物品
        if (this.data.rewards) {
            var arr = this.data.rewards.split("|");
            var arrLoss = [];
            for (var i = 0; i < arr.length; i++) {
                var loss = new GainLossVO(arr[i]);
                arrLoss.push(loss);
            }
            this._item1.setGainLossVO(arrLoss[0]);
            this._item2.setGainLossVO(arrLoss[1]);
        }
        //获取物品
        if (this.data.result) {
            var loss = new GainLossVO(this.data.result);
            this._item3.setGainLossVO(loss);
        }
    };
    ExchangeItem.prototype.updateItem = function (any) {
        this._item1.itemAmount(0, 0);
        this._item2.itemAmount(0, 0);
        var sort = this.data.sort;
        //复原
        if (this._bimfont) {
            this._duihuanImg.source = "common_dh_png";
            Manager.pool.push(this._bimfont);
            this._bimfont = null;
        }
        this._ilingquImg.visible = false;
        this._duihuanImg.visible = true;
        this._duihuanImg.x = 5;
        this._redIcon.visible = false;
        this._enterBtn.touchEnabled = true;
        this._countTxt.visible = true;
        this._enterBtn.visible = true;
        //消耗物品数量
        this._item1.itemAmount(any.cur_num1, any.num1);
        if (any.itemBaseID != 90000001) {
            this._item2.itemAmount(any.cur_num2, any.num2);
        }
        else {
            this._item2.itemAmount(0, 0);
        }
        //领取数量
        if (this.data.maxCurent) {
            this._countTxt.text = "（" + this.data.curCount + "/" + this.data.maxCurent + "）";
        }
        else {
            this._countTxt.text = "";
        }
        var second = Math.round(this._end - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        //按钮显示
        if (this.data.maxCurent && this.data.curCount >= this.data.maxCurent) //已领取
         {
            this._ilingquImg.visible = true;
            this._enterBtn.touchEnabled = false;
            this._countTxt.visible = false;
            this._duihuanImg.visible = false;
            this._enterBtn.visible = false;
        }
        else if (any.curVip < any.condValue) //vip
         {
            this._duihuanImg.x = -12;
            if (!this._bimfont) {
                this._bimfont = Manager.pool.create(NumImgView2, 25);
                this._bimfont.x = 109;
                this._bimfont.y = 28;
                this._btnGroup.addChild(this._bimfont);
            }
            this._bimfont.setValue(any.condValue, "nums_vip_");
            this._duihuanImg.source = "vip_title_png";
        }
        else if (second > 0 && (this.data.maxCurent == 0 || this.data.curCount < this.data.maxCurent) && any.cur_num1 >= any.num1 && any.cur_num2 >= any.num2 && any.curVip >= any.condValue) { //红点
            this._redIcon.visible = true;
        }
    };
    ExchangeItem.prototype.dispose = function () {
        this.removeEvent();
        _super.prototype.dispose.call(this);
        if (this._bimfont) {
            this._bimfont.dispose();
            this._bimfont = null;
        }
        ObjectUtil.removes(this._enterBtn, this._duihuanImg, this._ilingquImg, this._redIcon, this._btnGroup);
        ObjectUtil.disposes(this._countTxt, this._model);
        this._item1 = null;
        this._item2 = null;
        this._item3 = null;
        this._enterBtn = null;
        this._duihuanImg = null;
        this._countTxt = null;
        this._ilingquImg = null;
        this._redIcon = null;
        this._btnGroup = null;
        this._cvo = null;
        this._model = null;
    };
    return ExchangeItem;
}(ItemRenderer));
//# sourceMappingURL=ExchangeItem.js.map