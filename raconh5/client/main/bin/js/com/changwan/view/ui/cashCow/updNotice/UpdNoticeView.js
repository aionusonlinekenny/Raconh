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
 * 游戏公告
 * 2018.３．１９
 */
var UpdNoticeView = /** @class */ (function (_super) {
    __extends(UpdNoticeView, _super);
    function UpdNoticeView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("udpNotice", "UpdNoticeViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    UpdNoticeView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._desc.lineSpacing = 10;
        this._list = [this._item0, this._item1, this._item2, this._item3];
    };
    UpdNoticeView.prototype.addEvent = function () {
        this._rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardHandler, this);
        Manager.model.getSysnotice().addEventListener(SysnoticeEvent.UPD_NOTICE_EVENT, this.onReturnReward, this);
        _super.prototype.addEvent.call(this);
    };
    UpdNoticeView.prototype.removeEvent = function () {
        this._rewardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardHandler, this);
        Manager.model.getSysnotice().removeEventListener(SysnoticeEvent.UPD_NOTICE_EVENT, this.onReturnReward, this);
        _super.prototype.removeEvent.call(this);
    };
    UpdNoticeView.prototype.onRewardHandler = function () {
        Manager.control.getSysnotice().updNotice();
    };
    UpdNoticeView.prototype.onReturnReward = function () {
        this._cvo = UpdNoticCVO.cvo();
        this.drawRedIcon();
    };
    UpdNoticeView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this._cvo = UpdNoticCVO.cvo();
        this.drawData();
    };
    UpdNoticeView.prototype.drawData = function () {
        this._desc.text = this._cvo.content;
        this._desc.height = this._desc.textHeight;
        var arr = GainLossVO.parse(this._cvo.rewards);
        for (var i = this._list.length - 1; i > -1; i--) {
            if (arr[i]) {
                this._list[i].setGainLossVO(arr[i]);
            }
            else {
                this._list[i].clear();
            }
        }
        this.drawRedIcon();
    };
    UpdNoticeView.prototype.drawRedIcon = function () {
        this._rewardBtn.visible = this._redIcon.visible = !this._cvo.isReward;
        this._ilingquImg.visible = this._cvo.isReward;
    };
    UpdNoticeView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._desc, this._item0, this._item1, this._item2, this._item3, this._rewardBtn);
        this.removeChild(this._redIcon);
        this.removeChild(this._ilingquImg);
        this._desc = null;
        this._item0 = null;
        this._item1 = null;
        this._item2 = null;
        this._item3 = null;
        this._rewardBtn = null;
        this._redIcon = null;
        this._cvo = null;
        this._list = null;
        this._ilingquImg = null;
    };
    return UpdNoticeView;
}(UIComponent));
//# sourceMappingURL=UpdNoticeView.js.map