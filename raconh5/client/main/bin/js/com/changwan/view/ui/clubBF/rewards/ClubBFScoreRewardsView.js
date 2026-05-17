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
 * 盟会战积分奖励视图
 * luzhihong
 * create 2018.1.30
 */
var ClubBFScoreRewardsView = /** @class */ (function (_super) {
    __extends(ClubBFScoreRewardsView, _super);
    function ClubBFScoreRewardsView() {
        var _this = _super.call(this) || this;
        _this.dispatchEvent(new eui.UIEvent(eui.UIEvent.COMPLETE)); //
        _this.touchChildren = true;
        return _this;
    }
    ClubBFScoreRewardsView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getClubBF();
        this._cvos = ClubBFScoreRewardsCVO.getCVOs();
        this._list = new BaseVScrollerList();
        this._list.x = 5;
        this._list.y = 122;
        this._list.width = 710;
        this._list.height = 1010;
        this.addChild(this._list);
        this._list.initBtnListData(ClubBFScoreRewardsItem, null, true);
        this._list.itemList.layout.gap = -5;
        this.drawList();
    };
    ClubBFScoreRewardsView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getClubBF().addEventListener(ClubBFEvent.REWARES_GET_STATE, this.updateList, this);
    };
    ClubBFScoreRewardsView.prototype.removeEvent = function () {
        Manager.model.getClubBF().removeEventListener(ClubBFEvent.REWARES_GET_STATE, this.updateList, this);
        _super.prototype.removeEvent.call(this);
    };
    ClubBFScoreRewardsView.prototype.updateList = function (e) {
        this.invalidate("drawList");
    };
    ClubBFScoreRewardsView.prototype.drawList = function () {
        this._cvos.sort(ClubBFScoreRewardsCVO.sortFun);
        this._list.dataProvider(this._cvos);
    };
    ClubBFScoreRewardsView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawList"))
            this.drawList();
    };
    ClubBFScoreRewardsView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawList();
    };
    ClubBFScoreRewardsView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.dispose(this._list);
        this._model = null;
        this._cvos = null;
        this._list = null;
    };
    return ClubBFScoreRewardsView;
}(UIComponent));
//# sourceMappingURL=ClubBFScoreRewardsView.js.map