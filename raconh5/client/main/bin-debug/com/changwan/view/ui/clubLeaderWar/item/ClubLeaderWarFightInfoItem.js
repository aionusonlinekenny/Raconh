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
var ClubLeaderWarFightInfoItem = (function (_super) {
    __extends(ClubLeaderWarFightInfoItem, _super);
    function ClubLeaderWarFightInfoItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("clubLeaderWar/item", "ClubLeaderWarFightInfoItemSkin");
        return _this;
    }
    ClubLeaderWarFightInfoItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this.txt1, this.txt2, this.nickName, this.count, this.btn);
        if (this.nickName)
            this.nickName.dispose();
        this.nickName = null;
        if (this.count)
            this.count.dispose();
        this.count = null;
        if (this.btn)
            this.btn.dispose();
        this.btn = null;
    };
    return ClubLeaderWarFightInfoItem;
}(ItemRenderer));
__reflect(ClubLeaderWarFightInfoItem.prototype, "ClubLeaderWarFightInfoItem");
//# sourceMappingURL=ClubLeaderWarFightInfoItem.js.map