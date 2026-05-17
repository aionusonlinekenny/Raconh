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
 * 分享
 * pzx
 * create 2018-3-１６
*/
var SharePanel = /** @class */ (function (_super) {
    __extends(SharePanel, _super);
    function SharePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("share", "SharePanelSkin");
        return _this;
    }
    SharePanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._popupView.titleImg.source = "share_fenxiangyouxi_png";
        if (this._bitimg == null) {
            this._bitimg = Manager.pool.create(BitmapRemote);
            this._bitimg.y = 316;
            this._bitimg.x = 0;
            this._popupView.addChildAt(this._bitimg, 1);
            this._bitimg.load(Manager.path.getPanelUiImgPath("share/share_tupian"));
        }
        this._shareImg.touchEnabled = false;
        this._popupView.bgHeight = 580;
        this._popupView.viewY = 320;
        Manager.control.getshare().query();
    };
    SharePanel.prototype.addEvent = function () {
        this._shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardHandler, this);
        Manager.model.getshare().addEventListener(ShareEvent.SHARE_UPDATE, this.updateStatus, this);
        _super.prototype.addEvent.call(this);
    };
    SharePanel.prototype.removeEvent = function () {
        this._shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardHandler, this);
        Manager.model.getshare().removeEventListener(ShareEvent.SHARE_UPDATE, this.updateStatus, this);
        _super.prototype.removeEvent.call(this);
    };
    SharePanel.prototype.onRewardHandler = function () {
        var cvo = ShareCVO.cvo();
        if (cvo.status) {
            Manager.control.getshare().reward();
        }
        else {
            //分享调用
            //    Manager.control.getshare().shareInfo();
            Manager.platform.share();
        }
    };
    SharePanel.prototype.onTouchCloseHandler = function (e) {
        Manager.view.hide(131 /* SharePanel */);
    };
    SharePanel.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.darwData();
    };
    SharePanel.prototype.darwData = function () {
        var cvo = ShareCVO.cvo();
        var arr = GainLossVO.parse(cvo.rewards);
        this._list = [];
        for (var i = arr.length - 1; i > -1; i--) {
            var item = Manager.pool.create(BaseGoods);
            item.x = 145 + (i % 3) * 141;
            item.y = 500 + Math.floor(i / 3) * 141;
            this.addChild(item);
            this._list.push(item);
            item.setGainLossVO(arr[i]);
        }
        this.updateStatus();
    };
    SharePanel.prototype.updateStatus = function () {
        var cvo = ShareCVO.cvo();
        if (cvo.isReward()) {
            this.onTouchCloseHandler(null);
            return;
        }
        if (cvo.status) {
            this._shareImg.source = "common_label_fetch_png";
        }
        else {
            this._shareImg.source = "share_fenxiangyouxi_png";
        }
        this._redIcon.visible = cvo.status;
    };
    SharePanel.prototype.show = function () {
        _super.prototype.show.call(this);
    };
    SharePanel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._shareImg);
        ObjectUtil.disposes(this._shareBtn);
        if (this._bitimg) {
            Manager.pool.push(this._bitimg);
            this._bitimg = null;
        }
        this._list.forEach(function (item, i) {
            Manager.pool.push(item);
        });
        this._shareBtn = null;
        this._shareImg = null;
        this._list = null;
    };
    return SharePanel;
}(PopUpView));
//# sourceMappingURL=SharePanel.js.map