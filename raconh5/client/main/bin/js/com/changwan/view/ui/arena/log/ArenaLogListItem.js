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
 *author Anydo
 *create 2017-12-28
 *description
*/
var ArenaLogListItem = /** @class */ (function (_super) {
    __extends(ArenaLogListItem, _super);
    function ArenaLogListItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("arena", "ArenaLogListItemSkin");
        return _this;
    }
    ArenaLogListItem.prototype.dataChanged = function () {
        var info = this.data;
        if (info == null)
            return;
        this._picResult = Manager.pool.create(BitmapRes, info.isWin ? "arenaLogWinIcon_png" : "arenaLogFailIcon_png");
        this._picResult.x = 7;
        this._picResult.y = 5;
        this.addChild(this._picResult);
        this._picFlag = Manager.pool.create(BitmapRes, info.isAttack ? "arenaLogJgIcon_png" : "arenaLogFsIcon_png");
        this.addChild(this._picFlag);
        this._txtTime.text = cw.DateUtil.formatStr(info.logTime, cw.DateUtil.YYYY_MM_DD_HH_MM_SS);
        this._txtName.text = info.enemyName;
        this._txtHonour.text = String(info.honour);
        if (info.rankOld > info.rankNew)
            this._txtRank.text = LangCVO.getContent("arena3", info.rankNew); //"排名降低至第{0}名";
        else if (info.rankOld < info.rankNew)
            this._txtRank.text = LangCVO.getContent("arena2", info.rankNew); //"排名上升至第{0}名";
        else
            this._txtRank.text = "";
    };
    ArenaLogListItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        Manager.pool.push(this._picFlag);
        this._picFlag = null;
        Manager.pool.push(this._picResult);
        this._picResult = null;
        this._txtTime.dispose();
        this._txtTime = null;
        this._txtName.dispose();
        this._txtName = null;
        this._txtHonour.dispose();
        this._txtHonour = null;
        this._txtRank.dispose();
        this._txtRank = null;
    };
    return ArenaLogListItem;
}(ItemRenderer));
//# sourceMappingURL=ArenaLogListItem.js.map