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
 * 盟会战积分奖励项
 * luzhihong
 * create 2018.1.30
 */
var ClubBFScoreRewardsItem = (function (_super) {
    __extends(ClubBFScoreRewardsItem, _super);
    function ClubBFScoreRewardsItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("clubBF", "ClubBFScoreRewardsItemSkin");
        return _this;
    }
    ClubBFScoreRewardsItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.addEvent();
    };
    ClubBFScoreRewardsItem.prototype.dataChanged = function () {
        this._cvo = this.data;
        this.pushGoods();
        this._goodItems = [];
        var item;
        for (var i = 0, len = this._cvo.rewards.length; i < len; i++) {
            item = Manager.pool.create(Goods);
            item.x = 14 + i * 115;
            item.y = 4;
            item.data = this._cvo.rewards[i].item;
            this.addChild(item);
            this._goodItems.push(item);
        }
        if (this._cvo.hasGet) {
            this._label.visible = true;
            this._btn.visible = false;
        }
        else {
            this._label.visible = false;
            this._btn.visible = true;
        }
        this.updateScore(null);
    };
    ClubBFScoreRewardsItem.prototype.addEvent = function () {
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getClubBF().addEventListener(ClubBFEvent.SCORE_UPDATE, this.updateScore, this);
    };
    ClubBFScoreRewardsItem.prototype.removeEvent = function () {
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getClubBF().removeEventListener(ClubBFEvent.SCORE_UPDATE, this.updateScore, this);
    };
    ClubBFScoreRewardsItem.prototype.updateScore = function (e) {
        var color = this._cvo.score > Manager.model.getClubBF().score ? Color.RED_STR : Color.DEF_STR;
        HtmlUtil.setTextFlow(this._txt, LangCVO.getContent("clubBF5") + HtmlUtil.addColorTag(this._cvo.score + "", color));
        this._txt.text = LangCVO.getContent("clubBF5") + this._cvo.score; //积分：
        this._redIcon.visible = this._cvo.canGet;
    };
    ClubBFScoreRewardsItem.prototype.onClickHandler = function (e) {
        Manager.control.getClubBF().getRewards(this._cvo);
    };
    ClubBFScoreRewardsItem.prototype.pushGoods = function () {
        if (this._goodItems) {
            for (var i = this._goodItems.length - 1; i >= 0; i--) {
                Manager.pool.push(this._goodItems[i]);
            }
            this._goodItems = null;
        }
    };
    ClubBFScoreRewardsItem.prototype.dispose = function () {
        this.removeEvent();
        this.pushGoods();
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._txt, this._btn);
        ObjectUtil.removes(this._label, this._redIcon);
        this._txt = null;
        this._btn = null;
        this._label = null;
        this._redIcon = null;
        this._cvo = null;
    };
    return ClubBFScoreRewardsItem;
}(ItemRenderer));
__reflect(ClubBFScoreRewardsItem.prototype, "ClubBFScoreRewardsItem");
//# sourceMappingURL=ClubBFScoreRewardsItem.js.map