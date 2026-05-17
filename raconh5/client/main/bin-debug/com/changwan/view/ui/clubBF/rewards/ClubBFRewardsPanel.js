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
 * 盟会战奖励面板
 * luzhihong
 * create 2018.1.25
 */
var ClubBFRewardsPanel = (function (_super) {
    __extends(ClubBFRewardsPanel, _super);
    function ClubBFRewardsPanel() {
        return _super.call(this, false) || this;
    }
    ClubBFRewardsPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.basePanel.setBottomBackTop(1200);
        this.basePanel.title = "clubBF_rewards_title_png";
        var btnDatas = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "clubBF_rewards_btn_0_png", imgClick: "clubBF_rewards_btn_0_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "clubBF_rewards_btn_1_png", imgClick: "clubBF_rewards_btn_1_png" }
        ];
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
        Manager.render.add(this.renderInvalid, this);
    };
    ClubBFRewardsPanel.prototype.renderInvalid = function (interval) {
        Manager.render.remove(this.renderInvalid, this);
        this.update();
    };
    ClubBFRewardsPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getClubBF().addEventListener(ClubBFEvent.SCORE_UPDATE, this.update, this);
        Manager.model.getClubBF().addEventListener(ClubBFEvent.REWARES_GET_STATE, this.update, this);
    };
    ClubBFRewardsPanel.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Manager.model.getClubBF().removeEventListener(ClubBFEvent.SCORE_UPDATE, this.update, this);
        Manager.model.getClubBF().removeEventListener(ClubBFEvent.REWARES_GET_STATE, this.update, this);
    };
    ClubBFRewardsPanel.prototype.update = function (e) {
        if (e === void 0) { e = null; }
        var btn = this.basePanel.scrollerList.itemList.getElementAt(0);
        if (btn)
            btn.setIconShow(Manager.model.getClubBF().hasCanGet);
    };
    ClubBFRewardsPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(103 /* ClubBFRewardsPanel */);
                break;
        }
    };
    ClubBFRewardsPanel.prototype.onFuncBtnChangeHandler = function (e) {
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1)
            return;
        this._index = index;
        if (this._curView != null)
            this._curView.dispose();
        switch (index) {
            case 0:
                this._curView = new ClubBFScoreRewardsView();
                break;
            case 1:
                this._curView = new ClubBFRankRewardsView();
                break;
        }
        this.addChild(this._curView);
    };
    ClubBFRewardsPanel.prototype.dispose = function () {
        Manager.render.remove(this.renderInvalid, this);
        _super.prototype.dispose.call(this);
        if (this._curView != null) {
            this._curView.dispose();
            this._curView = null;
        }
    };
    return ClubBFRewardsPanel;
}(Panel));
__reflect(ClubBFRewardsPanel.prototype, "ClubBFRewardsPanel");
//# sourceMappingURL=ClubBFRewardsPanel.js.map