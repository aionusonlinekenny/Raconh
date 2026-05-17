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
 * 盟会战面板
 * luzhihong
 * create 2018.1.25
 */
var ClubBFPanel = (function (_super) {
    __extends(ClubBFPanel, _super);
    function ClubBFPanel() {
        return _super.call(this, false) || this;
    }
    ClubBFPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.basePanel.setBottomBackTop(979);
        var btnDatas = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "clubBF_btn_0_png", imgClick: "clubBF_btn_0_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "clubLeaderWar_funcBtn1_png", imgClick: "clubLeaderWar_funcBtn1_png" }
        ];
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
        Manager.render.add(this.renderInvalid, this);
    };
    ClubBFPanel.prototype.renderInvalid = function (interval) {
        Manager.render.remove(this.renderInvalid, this);
        this.update();
        this.onClubLeaderWarInfoUpdateHandler();
    };
    ClubBFPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getClubBF().addEventListener(ClubBFEvent.SCORE_UPDATE, this.update, this);
        Manager.model.getClubBF().addEventListener(ClubBFEvent.REWARES_GET_STATE, this.update, this);
        Manager.model.getClubLeaderWar().addEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_INFO_UPDATE, this.onClubLeaderWarInfoUpdateHandler, this);
    };
    ClubBFPanel.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Manager.model.getClubBF().removeEventListener(ClubBFEvent.SCORE_UPDATE, this.update, this);
        Manager.model.getClubBF().removeEventListener(ClubBFEvent.REWARES_GET_STATE, this.update, this);
        Manager.model.getClubLeaderWar().removeEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_INFO_UPDATE, this.onClubLeaderWarInfoUpdateHandler, this);
    };
    ClubBFPanel.prototype.update = function (e) {
        if (e === void 0) { e = null; }
        var btn = this.basePanel.scrollerList.itemList.getElementAt(0);
        if (btn)
            btn.setIconShow(Manager.model.getClubBF().hasCanGet);
    };
    ClubBFPanel.prototype.onClubLeaderWarInfoUpdateHandler = function (e) {
        if (e === void 0) { e = null; }
        var btn = this.basePanel.scrollerList.itemList.getElementAt(1);
        if (btn)
            btn.setIconShow(OpenCVO.isOpen(OpenConst.ID_CLUB_LEADER) && Manager.model.getClubLeaderWar().checkCanMobai());
    };
    ClubBFPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(93 /* ClubBFPanel */);
                Manager.view.show(38 /* ClubPanel */);
                break;
        }
    };
    ClubBFPanel.prototype.onFuncBtnChangeHandler = function (e) {
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1)
            return;
        var isBack = false;
        switch (index) {
            case 1:
                isBack = !OpenCVO.isOpen(OpenConst.ID_CLUB_LEADER, true);
                break;
        }
        if (isBack) {
            if (this._index == undefined || this._index < 0)
                this.basePanel.scrollerList.itemList.selectedIndex = this._index;
            this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
            return;
        }
        this._index = index;
        if (this._curView != null)
            this._curView.dispose();
        switch (index) {
            case 0:
                this._curView = new ClubBFView(this);
                break;
            case 1:
                this._curView = new ClubLeaderWarView();
                break;
        }
        this.basePanel.addChildAt(this._curView, 2);
        if (this._index == 1)
            this.basePanel.title = "clubLeaderWar_title_png";
        else
            this.basePanel.title = "clubBF_title_" + this._index + "_png";
    };
    ClubBFPanel.prototype.dispose = function () {
        Manager.render.remove(this.renderInvalid, this);
        _super.prototype.dispose.call(this);
        if (this._curView != null) {
            this._curView.dispose();
            this._curView = null;
        }
    };
    return ClubBFPanel;
}(Panel));
__reflect(ClubBFPanel.prototype, "ClubBFPanel");
//# sourceMappingURL=ClubBFPanel.js.map