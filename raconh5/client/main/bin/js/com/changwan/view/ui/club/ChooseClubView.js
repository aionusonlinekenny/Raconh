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
 * 选择宗门
 * Simon
 * 2017.12.14
 */
var ChooseClubView = /** @class */ (function (_super) {
    __extends(ChooseClubView, _super);
    function ChooseClubView() {
        var _this = _super.call(this) || this;
        _this._clubType = -1;
        _this.skinName = Manager.path.getSkinName("club", "ChooseClubViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    ChooseClubView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.touchEnabled = true;
        this._back0.load(PathInfo.getPath("res/club/club_bg0.jpg", LoaderType.IMAGE));
        this._back1.load(PathInfo.getPath("res/club/club_bg1.jpg", LoaderType.IMAGE));
        this._btnList = [this._club1, this._club2, this._club3];
        this._tuiImgList = [this._tui1, this._tui2, this._tui3];
        Manager.control.getClub().clubRecommendQuery();
    };
    ChooseClubView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._club1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._club2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._club3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getClub().addEventListener(ClubEvent.UPDATE_CLUB_RECOMMEND, this.onClubRecommendUpdateHandler, this);
    };
    ChooseClubView.prototype.removeEvent = function () {
        this._club1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._club2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._club3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getClub().removeEventListener(ClubEvent.UPDATE_CLUB_RECOMMEND, this.onClubRecommendUpdateHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ChooseClubView.prototype.onClickHandler = function (e) {
        var index = this._btnList.indexOf(e.currentTarget);
        var clubId = Manager.model.getClub().clubRecommendInfo[index].clubId;
        this._tipsView = Manager.view.show(39 /* ClubJoinTipsView */, clubId, (index + 1 == this._clubType ? 1 : 0));
    };
    ChooseClubView.prototype.onClubRecommendUpdateHandler = function (e) {
        var minCount = -1;
        var list = Manager.model.getClub().clubRecommendInfo;
        list.sort(this.clubTypeSortOn);
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (i == 0 || minCount > list[i].playerCount) {
                    this._clubType = list[i].clubType;
                    minCount = list[i].playerCount;
                }
            }
        }
        if (this._clubType != -1) {
            for (var i = 0; i < this._tuiImgList.length; i++) {
                this._tuiImgList[i].visible = (i + 1 == this._clubType ? true : false);
            }
        }
    };
    ChooseClubView.prototype.clubTypeSortOn = function (value1, value2) {
        if (value1.clubType > value2.clubType)
            return 1;
        else if (value1.clubType < value2.clubType)
            return -1;
        else
            return 0;
    };
    ChooseClubView.prototype.reuse = function (thisParent) {
        _super.prototype.reuse.call(this);
        this._thisParent = thisParent;
    };
    ChooseClubView.prototype.dispose = function () {
        // if(Manager.model.getGuide().curID == GuideID.CLUB_JOIN) Manager.control.getTask().hideGuide();
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._back0, this._back1, this._club1, this._club2, this._club3, this._tui1, this._tui2, this._tui3);
        this._thisParent = null;
        if (this._back0)
            this._back0.dispose();
        this._back0 = null;
        if (this._back1)
            this._back1.dispose();
        this._back1 = null;
        if (this._club1)
            this._club1.dispose();
        this._club1 = null;
        if (this._club2)
            this._club2.dispose();
        this._club2 = null;
        if (this._club3)
            this._club3.dispose();
        this._club3 = null;
        this._tui1 = null;
        this._tui2 = null;
        this._tui3 = null;
        this._btnList = null;
        this._tuiImgList = null;
        if (this._tipsView)
            Manager.pool.push(this._tipsView);
        this._tipsView = null;
    };
    return ChooseClubView;
}(UIComponent));
//# sourceMappingURL=ChooseClubView.js.map