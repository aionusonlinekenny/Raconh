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
var ClubLeaderWarLeaderRankItem2 = /** @class */ (function (_super) {
    __extends(ClubLeaderWarLeaderRankItem2, _super);
    function ClubLeaderWarLeaderRankItem2() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("clubLeaderWar/item", "ClubLeaderWarLeaderRankItem2Skin");
        return _this;
    }
    ClubLeaderWarLeaderRankItem2.prototype.dataChanged = function () {
        var info = this.data;
        if (this._info == info)
            return;
        this._info = info;
        if (this._info != null) {
            this.visible = true;
            this._iconRank.source = "rank_" + this._info.rank + "_png";
            this._txtName.text = this._info.nickName;
            this._txtValue.text = LangCVO.getContent("clubLeaderWar7", this._info.fight);
        }
        else {
            this.visible = false;
        }
        if (!this._imageHead)
            this._imageHead = Manager.pool.create(BitmapRemote);
        // this._imageHead.load(Manager.path.getRoleHeadPath(2, this._info.career == 0 ? 2 : 1), 74, 74);
        this._imageHead.load(Manager.path.getRoleHeadPath(2, this._info.career), 74, 74);
        this._imageHead.x = this._headBackImg.x + 13;
        this._imageHead.y = this._headBackImg.y + 13;
        this.addChildAt(this._imageHead, this.getChildIndex(this._headBackImg) + 1);
    };
    ClubLeaderWarLeaderRankItem2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._back, this._headBackImg, this._iconRank, this._txtName, this._txtValue);
        this._info = null;
        this._back = null;
        this._headBackImg = null;
        this._iconRank = null;
        this._txtName.dispose();
        this._txtName = null;
        this._txtValue.dispose();
        this._txtValue = null;
        if (this._imageHead)
            Manager.pool.push(this._imageHead);
        this._imageHead = null;
    };
    return ClubLeaderWarLeaderRankItem2;
}(ItemRenderer));
//# sourceMappingURL=ClubLeaderWarLeaderRankItem2.js.map