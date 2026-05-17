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
 * 投资item
 * pzx
 * create 18.1.13
 */
var SysInvestItem = (function (_super) {
    __extends(SysInvestItem, _super);
    function SysInvestItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("sysInvest", "SysInvestItemSkin");
        _this.addEvent();
        return _this;
    }
    SysInvestItem.prototype.addEvent = function () {
        this._rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRewardHandler, this);
    };
    SysInvestItem.prototype.removeEvent = function () {
        this._rewardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRewardHandler, this);
    };
    SysInvestItem.prototype.onTouchRewardHandler = function (e) {
        if (SysInvestView.instince.getisActive()) {
            Manager.control.getSysInvest().reward(this.data.id);
        }
    };
    SysInvestItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        if (this._list == null) {
            this._list = [];
            for (var i = 0; i < 4; i++) {
                this._list[i] = this["_item" + i];
            }
        }
    };
    SysInvestItem.prototype.dataChanged = function () {
        var cvo = this.data;
        HtmlUtil.setTextFlow(this._descTxt, cvo.desc);
        var arr = GainLossVO.parse(cvo.reward);
        for (var i = 0; i < 4; i++) {
            if (arr[i]) {
                this._list[i].setGainLossVO(arr[i]);
            }
            else {
                this._list[i].clear();
            }
        }
        this._rewardBtn.visible = cvo.state != 1;
        this._ilingquImg.visible = !this._rewardBtn.visible;
        this._redIcon.visible = false;
        if (Manager.model.getSysInvest().isActive("" + cvo.price)) {
            if (cvo.state != 1 && cvo.isReward()) {
                this._redIcon.visible = true;
            }
        }
    };
    SysInvestItem.prototype.reuse = function () {
    };
    SysInvestItem.prototype.unuse = function () {
        this.clear();
    };
    SysInvestItem.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.disposes(this._descTxt, this._rewardBtn, this._item0, this._item1, this._item2, this._item3);
            ObjectUtil.removes(this._ilingquImg, this._redIcon);
        }
        this._descTxt = null;
        this._rewardBtn = null;
        this._item0 = null;
        this._item1 = null;
        this._item2 = null;
        this._item3 = null;
        this._ilingquImg = null;
        this._list = null;
        this._redIcon = null;
    };
    SysInvestItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeEvent();
        this.clear(true);
    };
    return SysInvestItem;
}(ItemRenderer));
__reflect(SysInvestItem.prototype, "SysInvestItem");
//# sourceMappingURL=SysInvestItem.js.map