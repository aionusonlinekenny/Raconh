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
 * 充值活动item
 * 2018.1.20
 */
var RechargeActivityItem = /** @class */ (function (_super) {
    __extends(RechargeActivityItem, _super);
    function RechargeActivityItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("rechargeActivity", "RechargeActivityItemSkin");
        return _this;
    }
    RechargeActivityItem.prototype.addEvent = function () {
        this._okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRewardHandler, this);
        this._model.addEventListener(RechargeActivityEvent.RECHARGEACTIVITY_UPDATE_EVENT, this.updateView, this);
    };
    RechargeActivityItem.prototype.removeEvent = function () {
        this._okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRewardHandler, this);
        this._model.removeEventListener(RechargeActivityEvent.RECHARGEACTIVITY_UPDATE_EVENT, this.updateView, this);
    };
    RechargeActivityItem.prototype.onTouchRewardHandler = function (e) {
        var cvo = this.data;
        if (cvo.num == 0) {
            Manager.view.show(77 /* SysChargePanel */);
        }
        else if (cvo.num > 0) {
            Manager.control.getRecheargeActivity().reward(cvo.id);
        }
    };
    RechargeActivityItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        if (this._list == null) {
            this._list = [];
            for (var i = 0; i < 4; i++) {
                this._list[i] = this["_item" + i];
            }
        }
        this._fetchImg.touchEnabled = this._chongzhiImg.touchEnabled = false;
        this.initData();
        this.addEvent();
    };
    RechargeActivityItem.prototype.initData = function () {
        this._model = Manager.model.getrechargeActivity();
    };
    RechargeActivityItem.prototype.updateView = function (e) {
        var cvo = this.data;
        if (cvo.id == e.params) {
            this.updatreMoneyCount();
            var num = cvo.num;
            if (num == -1 || num == 0) {
                RechargeActivityView.instance.updateViewHandler();
            }
        }
    };
    RechargeActivityItem.prototype.dataChanged = function () {
        var cvo = this.data;
        var gossArr = GainLossVO.parse(cvo.rewards);
        for (var i = 0; i < this._list.length; i++) {
            if (gossArr[i]) {
                this._list[i].setGainLossVO(gossArr[i]);
            }
            else {
                this._list[i].clear();
            }
        }
        this.updatreMoneyCount();
    };
    RechargeActivityItem.prototype.updatreMoneyCount = function () {
        var cvo = this.data;
        var str = LangCVO.getContent("rechargeActivity" + (cvo.type + 3));
        var arr = this._model.getMoney(cvo.type);
        var chargeMoney = 0;
        for (var i = arr.length - 1; i > -1; i--) {
            chargeMoney += arr[i];
        }
        var color = Color.RED_STR;
        var num = cvo.num;
        this._redIcon.visible = false;
        if (num == -1) {
            /**已领完 */
            this._rewardGroup.visible = false;
            this._ilingquImg.visible = true;
            color = Color.GREEN_STR;
        }
        else if (num == 0) {
            this._rewardGroup.visible = true;
            this._chongzhiImg.visible = true;
            this._ilingquImg.visible = false;
            this._fetchImg.visible = false;
        }
        else if (num > 0) {
            this._rewardGroup.visible = true;
            this._chongzhiImg.visible = false;
            this._ilingquImg.visible = false;
            this._fetchImg.visible = true;
            color = Color.GREEN_STR;
            this._redIcon.visible = true;
        }
        if (cvo.type == RechargeActivityType.RECHARGEACTIVITY_SINGLE_TYPE) {
            //单笔特殊处理
            if (num > 0 || num == -1) {
                chargeMoney = cvo.RMB;
            }
            else {
                chargeMoney = 0;
            }
        }
        var money = "（" + chargeMoney + "/" + cvo.RMB + "）";
        money = HtmlUtil.addColorTag(money, color);
        str = StringUtils.setParam(str, cvo.RMB, money);
        HtmlUtil.setTextFlow(this._descTxt, str);
        if (cvo.maxCurent > 0) {
            this._countTxt.text = "（" + cvo.curent + "/" + cvo.maxCurent + "）";
        }
        else {
            this._countTxt.text = "";
        }
    };
    RechargeActivityItem.prototype.reuse = function () {
    };
    RechargeActivityItem.prototype.unuse = function () {
        this.clear();
    };
    RechargeActivityItem.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.disposes(this._descTxt, this._okBtn, this._item0, this._item1, this._item2, this._item3, this._countTxt);
            ObjectUtil.removes(this._ilingquImg, this._rewardGroup, this._fetchImg, this._chongzhiImg, this._redIcon);
        }
        this._descTxt = null;
        this._okBtn = null;
        this._item0 = null;
        this._item1 = null;
        this._item2 = null;
        this._item3 = null;
        this._ilingquImg = null;
        this._list = null;
        this._rewardGroup = null;
        this._okBtn = null;
        this._countTxt = null;
        this._fetchImg = null;
        this._chongzhiImg = null;
        this._redIcon = null;
        this._model = null;
    };
    RechargeActivityItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeEvent();
        this.clear(true);
    };
    return RechargeActivityItem;
}(ItemRenderer));
//# sourceMappingURL=RechargeActivityItem.js.map