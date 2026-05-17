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
 * 盟主战排名
 */
var ClubLeaderWarRankView = (function (_super) {
    __extends(ClubLeaderWarRankView, _super);
    function ClubLeaderWarRankView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("clubLeaderWar", "ClubLeaderWarRankViewSkin");
        _this.visible = false;
        _this.touchChildren = true;
        return _this;
    }
    ClubLeaderWarRankView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.visible = true;
        this._model = Manager.model.getClubLeaderWar();
        this._basePopView.titleImg.source = "clubLeaderWar_rankTitle_png";
        this._basePopView.bgHeight = 700;
        this.onResizeHandler();
    };
    ClubLeaderWarRankView.prototype.initData = function () {
        Manager.control.getClubLeaderWar().rankQuery();
    };
    ClubLeaderWarRankView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._basePopView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.addEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_RANK_UPDATE, this.onRankUpdateHandler, this);
    };
    ClubLeaderWarRankView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._basePopView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.removeEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_RANK_UPDATE, this.onRankUpdateHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ClubLeaderWarRankView.prototype.onResizeHandler = function (e) {
        this.width = Manager.global.gameMain.stage.stageWidth;
    };
    ClubLeaderWarRankView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._basePopView.closeBtn:
                Manager.view.hide(106 /* ClubLeaderWarRankView */);
                break;
        }
    };
    ClubLeaderWarRankView.prototype.onRankUpdateHandler = function (e) {
        this._scrollerList.initBtnListData(ClubLeaderWarRankItem, this._model.info.rankList, true);
        this._scrollerList.itemList.layout.gap = -2;
        for (var i = 0; i < this._model.info.rankList.length; i++) {
            if (this._model.info.rankList[i].id == Manager.model.self.id) {
                this._myRank.text = this._model.info.rankList[i].rank + "";
                if (this._model.status == 0)
                    this._myWinCount.text = this._model.info.rankList[i].rankWinCount + "";
                else if (this._model.status == 1)
                    this._myWinCount.text = this._model.info.rankList[i].winCount + "";
            }
        }
    };
    ClubLeaderWarRankView.prototype.show = function () {
        Manager.layer.tipsLayer.addChild(this);
    };
    ClubLeaderWarRankView.prototype.hide = function () {
        this.dispose();
    };
    ClubLeaderWarRankView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._basePopView, this._scrollerList, this._myRank, this._myWinCount);
        if (this._basePopView)
            this._basePopView.dispose();
        this._basePopView = null;
        if (this._scrollerList)
            this._scrollerList.dispose();
        this._scrollerList = null;
        if (this._myRank)
            this._myRank.dispose();
        this._myRank = null;
        if (this._myWinCount)
            this._myWinCount.dispose();
        this._myWinCount = null;
        this._model = null;
    };
    return ClubLeaderWarRankView;
}(UIComponent));
__reflect(ClubLeaderWarRankView.prototype, "ClubLeaderWarRankView");
//# sourceMappingURL=ClubLeaderWarRankView.js.map