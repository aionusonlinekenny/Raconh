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
 * 冲榜竞技
 * pzx
 * 2018-3-20
 */
var SrvRankPanel = (function (_super) {
    __extends(SrvRankPanel, _super);
    function SrvRankPanel() {
        return _super.call(this, false) || this;
    }
    SrvRankPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.basePanel.downFrameImg.visible = false;
        this.basePanel.backBtn.visible = false;
        this.basePanel.scrollerList.visible = false;
        this.basePanel.showBottomBack = false;
        this.basePanel.title = "srvRank_title0_png";
        if (this._bitimg == null) {
            this._bitimg = Manager.pool.create(BitmapRemote);
            this._bitimg.x = 5;
            this._bitimg.y = 116;
            this.basePanel.addChildAt(this._bitimg, 3);
            this._bitimg.load(Manager.path.getPanelSysPrivilegePath("sysprivilege_beijing"));
        }
        if (this._bitimg2 == null) {
            this._bitimg2 = Manager.pool.create(BitmapRemote);
            this._bitimg2.x = 5;
            this._bitimg2.y = 431;
            this.basePanel.addChildAt(this._bitimg2, 3);
            this._bitimg2.load(Manager.path.getPanelSrvRankPath("srvRankdi", Extension.JPG));
        }
    };
    SrvRankPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    SrvRankPanel.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
    };
    SrvRankPanel.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.drawData();
    };
    SrvRankPanel.prototype.drawData = function () {
        if (!this._view) {
            this._view = new SrvRankView;
            this.addChild(this._view);
        }
    };
    SrvRankPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(134 /* SrvRankPanel */);
                break;
        }
    };
    SrvRankPanel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._view);
        if (this._view)
            this._view.dispose();
        this._view = null;
        if (this._bitimg) {
            Manager.pool.push(this._bitimg);
            this._bitimg = null;
            Manager.pool.push(this._bitimg2);
            this._bitimg2 = null;
        }
    };
    return SrvRankPanel;
}(Panel));
__reflect(SrvRankPanel.prototype, "SrvRankPanel");
//# sourceMappingURL=SrvRankPanel.js.map