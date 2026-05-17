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
 * 冲级好礼
 * 2018.1.25
 */
var LevItemChild = (function (_super) {
    __extends(LevItemChild, _super);
    function LevItemChild() {
        return _super.call(this) || this;
    }
    LevItemChild.prototype.addEvent = function () {
        this._okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRewardHandler, this);
        this._levItemModel.addEventListener(CashCowEvent.LEVITEM_UPDATE_EVENT, this.checkReward, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.roleUpGradeLevHandler, this);
    };
    LevItemChild.prototype.removeEvent = function () {
        this._okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRewardHandler, this);
        this._levItemModel.removeEventListener(CashCowEvent.LEVITEM_UPDATE_EVENT, this.checkReward, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.roleUpGradeLevHandler, this);
    };
    LevItemChild.prototype.roleUpGradeLevHandler = function () {
        this.checkReward();
    };
    LevItemChild.prototype.onTouchRewardHandler = function (e) {
        //请求领奖
        var cvo = this.data;
        if (cvo.checkReward()) {
            if (cvo.totalNum > 0)
                Manager.control.getcashCow().rewardLevItem(cvo.id);
            else
                FloatTips.addTips(LangCVO.getContent("cashCow8"), Color.RED);
        }
        else {
            FloatTips.addTips(LangCVO.getContent("common60"), Color.RED);
        }
    };
    LevItemChild.prototype.initData = function () {
        this._levItemModel = Manager.model.getcashCow().levItemModel;
    };
    LevItemChild.prototype.dataChanged = function () {
        this.checkReward();
        var cvo = this.data;
        HtmlUtil.setTextFlow(this._descTxt, cvo.desc());
        var gossArr = GainLossVO.parse(cvo.rewards);
        for (var i = 0; i < this._list.length; i++) {
            if (gossArr[i]) {
                this._list[i].setGainLossVO(gossArr[i]);
            }
            else {
                this._list[i].clear();
            }
        }
    };
    LevItemChild.prototype.checkReward = function () {
        var cvo = this.data;
        this._okBtn.visible = true;
        this._chongzhiImg.visible = true;
        this._ilingquImg.visible = false;
        if (cvo.num == 0) {
            this._chongzhiImg.source = "common_label_fetch_png";
            if (cvo.checkReward() && cvo.totalNum > 0) {
                this._redIcon.visible = true;
                this._okBtn.filters = null;
                this._chongzhiImg.filters = null;
            }
            else {
                this._redIcon.visible = false;
                FilterUtil.setGrayFilter(this._okBtn);
                FilterUtil.setGrayFilter(this._chongzhiImg);
            }
        }
        else {
            this._okBtn.visible = false;
            this._ilingquImg.visible = true;
            this._redIcon.visible = false;
            this._chongzhiImg.visible = false;
        }
        this._countTxt.text = StringUtils.setParam(LangCVO.getContent("cashCow7"), cvo.totalNum); //剩余{0}份
    };
    LevItemChild.prototype.dispose = function () {
        this._okBtn.filters = null;
        _super.prototype.dispose.call(this);
        this._levItemModel = null;
    };
    return LevItemChild;
}(RechargeActivityItem));
__reflect(LevItemChild.prototype, "LevItemChild");
//# sourceMappingURL=LevItemChild.js.map