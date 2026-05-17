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
var ClubLeaderWarRankItem = /** @class */ (function (_super) {
    __extends(ClubLeaderWarRankItem, _super);
    function ClubLeaderWarRankItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("clubLeaderWar/item", "ClubLeaderWarRankItemSkin");
        return _this;
    }
    ClubLeaderWarRankItem.prototype.dataChanged = function () {
        var info = this.data;
        if (info) {
            this._rank.text = info.rank + "";
            this._nickName.text = info.nickName + "";
            if (Manager.model.getClubLeaderWar().status == 0)
                this._countWin.text = info.rankWinCount + "";
            else if (Manager.model.getClubLeaderWar().status == 1)
                this._countWin.text = info.winCount + "";
            var clubType = Number(String(Manager.model.self.attrInfo.guildID).substr(-1, 1));
            var titleId = ClubDataCVO.getClubLeaderWarTitle(clubType, info.rank);
            if (titleId) {
                this._title = Manager.pool.create(BitmapRemote);
                this._title.x = 403;
                this._title.y = 22;
                this.addChild(this._title);
                this._title.load(Manager.path.getTitlePath(titleId));
            }
        }
    };
    ClubLeaderWarRankItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._rank, this._nickName, this._countWin, this._title);
        if (this._rank)
            this._rank.dispose();
        this._rank = null;
        if (this._nickName)
            this._nickName.dispose();
        this._nickName = null;
        if (this._countWin)
            this._countWin.dispose();
        this._countWin = null;
        if (this._title)
            Manager.pool.push(this._title);
        this._title = null;
    };
    return ClubLeaderWarRankItem;
}(ItemRenderer));
//# sourceMappingURL=ClubLeaderWarRankItem.js.map