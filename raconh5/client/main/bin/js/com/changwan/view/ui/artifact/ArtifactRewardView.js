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
 * 寻宝积分奖励
 * pzx
 * create 18.2.7
 */
var ArtifactRewardView = /** @class */ (function (_super) {
    __extends(ArtifactRewardView, _super);
    function ArtifactRewardView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("artifact", "ArtifactRewardViewSkin");
        return _this;
    }
    ArtifactRewardView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._popupView.titleImg.source = "common_jiangli_png";
        this._list = [];
    };
    ArtifactRewardView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onrewardHandler, this);
        Manager.model.getArtifact().addEventListener(ArtifactEvent.ARTIFACT_REWARD_EVENT, this.drawData, this);
    };
    ArtifactRewardView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._rewardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onrewardHandler, this);
        Manager.model.getArtifact().removeEventListener(ArtifactEvent.ARTIFACT_REWARD_EVENT, this.drawData, this);
    };
    ArtifactRewardView.prototype.onrewardHandler = function () {
        var ineg = Manager.model.getArtifact().getIntegral();
        if (ineg < this._cvo.args) {
            FloatTips.addTips(LangCVO.getContent("artifact5"), Color.RED);
            return;
        }
        Manager.control.getArtifact().integralReward(this._cvo.args);
    };
    ArtifactRewardView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    ArtifactRewardView.prototype.drawData = function () {
        this._cvo = ArtifactIntegralCVO.getCurIntegralCvo();
        var str = LangCVO.getContent("artifact3"); //积分达到{0},可领取{1}
        var ineg = Manager.model.getArtifact().getIntegral();
        var color = Color.GREEN_STR;
        if (ineg < this._cvo.args) {
            color = Color.RED_STR;
            this._redIcon.visible = false;
        }
        else {
            this._redIcon.visible = true;
        }
        var desc = "(" + ineg + "/" + this._cvo.args + ")";
        desc = HtmlUtil.addColorTag(desc, color);
        str = StringUtils.setParam(str, this._cvo.args, desc);
        HtmlUtil.setTextFlow(this._label, str);
        var arr = GainLossVO.parse(this._cvo.rewards);
        var ln = arr.length;
        for (var i = 0; i < ln; i++) {
            var item = new BaseGoods();
            item.setGainLossVO(arr[i]);
            this._group.addChild(item);
            item.x = i * 155;
            this._list.push(item);
        }
        this._group.width = ln * 151;
        // this._group.horizontalCenter = 0;
        this._group.x = Math.round((this.width - this._group.width) / 2);
        if (this._cvo.isReward() == 1) {
            this._rewardBtn.visible = false;
            this._redIcon.visible = false;
            this._ilingquImg.visible = true;
        }
    };
    ArtifactRewardView.prototype.onTouchCloseHandler = function (e) {
        Manager.view.hide(111 /* ArtifactRewardView */);
    };
    ArtifactRewardView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._label.dispose();
        this._rewardBtn.dispose();
        this.removeChild(this._group);
        this.removeChild(this._redIcon);
        this._group = null;
        this._cvo = null;
        for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
            var item = _a[_i];
            item.dispose();
        }
        this._list = null;
        this._redIcon = null;
    };
    return ArtifactRewardView;
}(PopUpView));
//# sourceMappingURL=ArtifactRewardView.js.map