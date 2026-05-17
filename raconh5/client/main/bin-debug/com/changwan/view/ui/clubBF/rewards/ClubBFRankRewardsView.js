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
 * 盟会战排名奖励视图
 * luzhihong
 * create 2018.1.30
 */
var ClubBFRankRewardsView = (function (_super) {
    __extends(ClubBFRankRewardsView, _super);
    function ClubBFRankRewardsView() {
        var _this = _super.call(this) || this;
        _this.dispatchEvent(new eui.UIEvent(eui.UIEvent.COMPLETE)); //
        _this.touchChildren = true;
        return _this;
    }
    ClubBFRankRewardsView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._list = new BaseVScrollerList();
        this._list.x = 5;
        this._list.y = 122;
        this._list.width = 710;
        this._list.height = 1010;
        this.addChild(this._list);
        this._list.initBtnListData(ClubBFRankRewardsItem, ClubBFRankRewardsCVO.getCVOs(), true);
        this._list.itemList.layout.gap = -5;
    };
    ClubBFRankRewardsView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.dispose(this._list);
        this._list = null;
    };
    return ClubBFRankRewardsView;
}(UIComponent));
__reflect(ClubBFRankRewardsView.prototype, "ClubBFRankRewardsView");
//# sourceMappingURL=ClubBFRankRewardsView.js.map