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
 * 盟会战排名奖励项
 * luzhihong
 * create 2018.1.30
 */
var ClubBFRankRewardsItem = (function (_super) {
    __extends(ClubBFRankRewardsItem, _super);
    function ClubBFRankRewardsItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("clubBF", "ClubBFRankRewardsItemSkin");
        return _this;
    }
    Object.defineProperty(ClubBFRankRewardsItem.prototype, "cvo", {
        get: function () { return this.data; },
        enumerable: true,
        configurable: true
    });
    ClubBFRankRewardsItem.prototype.dataChanged = function () {
        this._txt.text = this.cvo.desc; //
        if (this.cvo.id == 1)
            this._txt.textColor = Color.RED;
        else if (this.cvo.id == 2)
            this._txt.textColor = Color.ORANGE;
        else if (this.cvo.id == 3)
            this._txt.textColor = Color.PURPLE;
        else
            this._txt.textColor = 0x00A0FD; //Color.BLUE;
        // this.pushGoods();
        this._goodItems = [];
        var item;
        for (var i = 0, len = this.cvo.rewards.length; i < len; i++) {
            item = Manager.pool.create(Goods);
            item.x = 14 + i * 115;
            item.y = 4;
            item.data = this.cvo.rewards[i].item;
            this.addChild(item);
            this._goodItems.push(item);
        }
    };
    ClubBFRankRewardsItem.prototype.pushGoods = function () {
        if (this._goodItems) {
            for (var i = this._goodItems.length - 1; i >= 0; i--) {
                Manager.pool.push(this._goodItems[i]);
            }
            this._goodItems = null;
        }
    };
    ClubBFRankRewardsItem.prototype.dispose = function () {
        this.pushGoods();
        _super.prototype.dispose.call(this);
        ObjectUtil.dispose(this._txt);
        this._txt = null;
    };
    return ClubBFRankRewardsItem;
}(ItemRenderer));
__reflect(ClubBFRankRewardsItem.prototype, "ClubBFRankRewardsItem");
//# sourceMappingURL=ClubBFRankRewardsItem.js.map