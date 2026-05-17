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
 *  七天登陆
 * create 2018.1.29
 */
var SevenDaysView = (function (_super) {
    __extends(SevenDaysView, _super);
    function SevenDaysView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("cashCow\sevenDays", "SevenDaysViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    SevenDaysView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getcashCow().sevenDaysModel;
        if (!this._fightNumber) {
            this._fightNumber = Manager.pool.create(NumImgView2);
            this.addChild(this._fightNumber);
            this._fightNumber.x = 384;
            this._fightNumber.y = 742;
        }
        if (!this._dayNumber) {
            this._dayNumber = Manager.pool.create(NumImgView2);
            this.addChild(this._dayNumber);
            this._dayNumber.x = 538;
            this._dayNumber.y = 894;
        }
        if (!this._list) {
            this._list = [];
            for (var i = 1; i < 8; i++) {
                var item = this["_sevenDayItem" + i];
                item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickItemHandler, this);
                this._list.push(item);
            }
        }
        if (!this._itemList) {
            this._itemList = [];
            for (var i = 1; i < 5; i++) {
                var item = this["_item" + i];
                this._itemList.push(item);
            }
        }
    };
    SevenDaysView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rewardsHandler, this);
        this._model.addEventListener(CashCowEvent.SEVENDAYS_QUERY_EVENT, this.drawData, this);
        this._model.addEventListener(CashCowEvent.SEVENDAYS_REWARD_EVENT, this.updateReward, this);
    };
    SevenDaysView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._rewardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rewardsHandler, this);
        this._model.removeEventListener(CashCowEvent.SEVENDAYS_QUERY_EVENT, this.drawData, this);
        this._model.removeEventListener(CashCowEvent.SEVENDAYS_REWARD_EVENT, this.updateReward, this);
        for (var i = 1; i < 8; i++) {
            var item = this["_sevenDayItem" + i];
            item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickItemHandler, this);
        }
    };
    SevenDaysView.prototype.clickItemHandler = function (e) {
        if (this._curItem == e.target) {
            return;
        }
        this._curItem.showEffect(false);
        this._curItem = e.target;
        this._curItem.showEffect(true);
        this.updateCurItemData();
    };
    SevenDaysView.prototype.rewardsHandler = function () {
        var cvo;
        if (this._curItem) {
            cvo = this._curItem.cvo;
        }
        if (!cvo.isReward()) {
            FloatTips.addTips(LangCVO.getContent("cashCow6"), Color.RED);
            return;
        }
        Manager.control.getcashCow().sevenDaysReward(cvo.login_day_id);
    };
    SevenDaysView.prototype.updateReward = function (e) {
        var cvo = SevenDaysCVO.getcvo(e.params);
        this._curItem.setData(cvo);
        this.updateRewardItemState();
    };
    SevenDaysView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    SevenDaysView.prototype.drawData = function () {
        var boo = true;
        for (var i = 0; i < 7; i++) {
            var item = this._list[i];
            var cvo = SevenDaysCVO.getcvo(i + 1);
            item.setData(cvo);
            if (cvo.isReward() && cvo.state != 1) {
                if (boo) {
                    this._curItem = item;
                    if (cvo.login_day_id == this._model.login_day) {
                        boo = false;
                    }
                }
            }
            else {
                if (!this._curItem) {
                    if (cvo.login_day_id == this._model.login_day) {
                        this._curItem = item;
                    }
                }
            }
        }
        this._curItem.showEffect(true);
        this.updateCurItemData();
    };
    SevenDaysView.prototype.updateCurItemData = function () {
        var cvo;
        if (this._curItem) {
            cvo = this._curItem.cvo;
        }
        var lossArr = GainLossVO.parse(cvo.rewards);
        for (var i = this._itemList.length - 1; i > -1; i--) {
            if (lossArr[i]) {
                this._itemList[i].setGainLossVO(lossArr[i]);
            }
            else {
                this._itemList[i].clear();
            }
        }
        this._fightNumber.setValue(cvo.fightNum, "nums_fighting_", 25);
        this._dayNumber.setValue(cvo.login_day_id, "nums_sevenDay_", 25);
        this._bitimg.load(Manager.path.getPanelCashCowPath("sevenDay_item_" + cvo.login_day_id, ".png"));
        this._nameImg.source = "cashCowsevendDayname_" + cvo.login_day_id + "_png";
        //this._descImg.source = "cashCowsevendDaydesc_"+cvo.login_day_id+"_png";
        this.updateRewardItemState();
    };
    SevenDaysView.prototype.updateRewardItemState = function () {
        var cvo = this._curItem.cvo;
        if (cvo.state == 1) {
            this._rewardBtn.visible = false;
            this._yijhihuoImg.visible = true;
            this._redIcon.visible = false;
        }
        else {
            this._rewardBtn.visible = true;
            this._redIcon.visible = cvo.isReward();
            this._yijhihuoImg.visible = false;
        }
    };
    SevenDaysView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    SevenDaysView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    SevenDaysView.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.disposes(this._rewardBtn);
            ObjectUtil.removes(this._yijhihuoImg, this._redIcon, this._dayNumber, this._fightNumber, this._descImg, this._nameImg);
        }
        this._model = null;
        this._rewardBtn = null;
        this._yijhihuoImg = null;
        for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
            var item = _a[_i];
            item.dispose();
        }
        for (var _b = 0, _c = this._itemList; _b < _c.length; _b++) {
            var item = _c[_b];
            item.dispose();
        }
        this._list = null;
        this._itemList = null;
        this._sevenDayItem1 = null;
        this._sevenDayItem2 = null;
        this._sevenDayItem3 = null;
        this._sevenDayItem4 = null;
        this._sevenDayItem5 = null;
        this._sevenDayItem6 = null;
        this._sevenDayItem7 = null;
        this._item1 = null;
        this._item2 = null;
        this._item3 = null;
        this._item4 = null;
        Manager.pool.push(this._fightNumber);
        Manager.pool.push(this._dayNumber);
        this._fightNumber = null;
        this._dayNumber = null;
        this._redIcon = null;
        this._curItem = null;
        Manager.pool.push(this._bitimg);
        this._bitimg = null;
        this._nameImg = null;
        this._descImg = null;
    };
    SevenDaysView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return SevenDaysView;
}(UIComponent));
__reflect(SevenDaysView.prototype, "SevenDaysView");
//# sourceMappingURL=SevenDaysView.js.map