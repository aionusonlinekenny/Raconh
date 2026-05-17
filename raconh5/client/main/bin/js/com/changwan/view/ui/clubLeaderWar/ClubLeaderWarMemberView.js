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
 * 盟会精英
 * Simon
 * 2018.2.2
 */
var ClubLeaderWarMemberView = /** @class */ (function (_super) {
    __extends(ClubLeaderWarMemberView, _super);
    function ClubLeaderWarMemberView() {
        var _this = _super.call(this) || this;
        _this._memberInited = false;
        _this.skinName = Manager.path.getSkinName("clubLeaderWar", "ClubLeaderWarMemberViewSkin");
        _this.visible = false;
        _this.touchChildren = true;
        return _this;
    }
    ClubLeaderWarMemberView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.visible = true;
        this._model = Manager.model.getClubLeaderWar();
        this._basePopView.titleImg.source = "clubLeaderWar_jinyin_png";
        this._basePopView.bgHeight = 700;
        this.onResizeHandler();
    };
    ClubLeaderWarMemberView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this._cvo = ClubDataCVO.getClubLeaderWarInfo(8);
        Manager.control.getClub().memberListQuery();
    };
    ClubLeaderWarMemberView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._basePopView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getClub().addEventListener(ClubEvent.UPDATE_CLUB_MEMBERINFO_LIST, this.onMemberListUpdateHandler, this);
    };
    ClubLeaderWarMemberView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._basePopView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getClub().removeEventListener(ClubEvent.UPDATE_CLUB_MEMBERINFO_LIST, this.onMemberListUpdateHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ClubLeaderWarMemberView.prototype.onResizeHandler = function (e) {
        this.width = Manager.global.gameMain.stage.stageWidth;
    };
    ClubLeaderWarMemberView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._basePopView.closeBtn:
                Manager.view.hide(104 /* ClubLeaderWarMemberView */);
                break;
        }
    };
    ClubLeaderWarMemberView.prototype.onMemberListUpdateHandler = function (e) {
        var clubMemberList = Manager.model.getClub().clubMemberList;
        var list = [];
        var count = 0;
        for (var i = 0; i < clubMemberList.length - 1; i++) {
            if (clubMemberList[i].type != 1)
                list.push(clubMemberList[i]);
            if (clubMemberList[i].type == 2)
                count += 1;
        }
        list.sort(function (value1, value2) { if (value1.fighting < value2.fighting) {
            return 1;
        }
        else {
            return -1;
        } });
        if (!this._memberInited) {
            this._scrollerList.initBtnListData(ClubLeaderWarMemberItem, list, true);
            this._scrollerList.itemList.layout.gap = -2;
            this._memberInited = true;
        }
        else {
            this._scrollerList.dataProvider(list);
        }
        var maxCount = 0;
        if (this._cvo)
            maxCount = Number(this._cvo.clubLeaderWarInfoValue);
        this._tips.text = LangCVO.getContent("clubLeaderWar20", maxCount - count);
    };
    ClubLeaderWarMemberView.prototype.show = function () {
        Manager.layer.tipsLayer.addChild(this);
    };
    ClubLeaderWarMemberView.prototype.hide = function () {
        this.dispose();
    };
    ClubLeaderWarMemberView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._basePopView, this._scrollerList, this._tips);
        if (this._basePopView)
            this._basePopView.dispose();
        this._basePopView = null;
        if (this._scrollerList)
            this._scrollerList.dispose();
        this._scrollerList = null;
        if (this._tips)
            this._tips.dispose();
        this._tips = null;
    };
    return ClubLeaderWarMemberView;
}(UIComponent));
//# sourceMappingURL=ClubLeaderWarMemberView.js.map