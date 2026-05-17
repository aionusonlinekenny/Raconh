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
 *create 2018-1-5
 *description
*/
var ArenaMaxListItem = /** @class */ (function (_super) {
    __extends(ArenaMaxListItem, _super);
    function ArenaMaxListItem() {
        var _this = _super.call(this) || this;
        _this.FULL_WIDTH = 85;
        _this.skinName = Manager.path.getSkinName("arena", "ArenaMaxListItemSkin");
        _this.touchChildren = true;
        return _this;
    }
    ArenaMaxListItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    ArenaMaxListItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._groupHot.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.updateMaxAwardData, this);
    };
    ArenaMaxListItem.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._groupHot.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.updateMaxAwardData, this);
    };
    ArenaMaxListItem.prototype.updateMaxAwardData = function (e) {
        if (e === void 0) { e = null; }
        var hasGet = (Manager.model.getArena().maxGetedIDs.indexOf(this._cvo.id) >= 0);
        var isFull = (Manager.model.getArena().myMaxRank <= this._cvo.rankTarget);
        this._redIcon.visible = isFull && !hasGet;
    };
    ArenaMaxListItem.prototype.onClickHandler = function (e) {
        // if(Manager.model.getArena().maxGetedIDs.indexOf(this._cvo.id) >= 0) return;
        // if(Manager.model.getArena().myMaxRank > this._cvo.rankTarget) return;
        // Manager.control.getArena().cmdMaxRankAward(this._cvo.id);
        var enabled = true;
        if (Manager.model.getArena().maxGetedIDs.indexOf(this._cvo.id) >= 0)
            enabled = false;
        if (Manager.model.getArena().myMaxRank > this._cvo.rankTarget)
            enabled = false;
        var cbi = Manager.pool.create(CallBackInfo, this.clickCallback, this, this._cvo);
        Manager.view.show(61 /* ArenaMaxAwardView */, this._cvo.gains, enabled, cbi);
    };
    ArenaMaxListItem.prototype.clickCallback = function (cvo) {
        if ((Manager.model.getArena().maxGetedIDs.indexOf(cvo.id) == -1) && (Manager.model.getArena().myMaxRank <= cvo.rankTarget)) {
            Manager.control.getArena().cmdMaxRankAward(cvo.id);
        }
    };
    ArenaMaxListItem.prototype.setCVO = function (cvo) {
        this._cvo = cvo;
        this._txt.text = LangCVO.getContent("arena8", this._cvo.rankTarget);
    };
    ArenaMaxListItem.prototype.updateGetData = function () {
        var hasGet = (Manager.model.getArena().maxGetedIDs.indexOf(this._cvo.id) >= 0);
        var isFull = (Manager.model.getArena().myMaxRank <= this._cvo.rankTarget);
        this._redIcon.visible = isFull && !hasGet;
        this._picGeted.visible = hasGet;
        this._picFull.visible = isFull;
        if (Manager.model.getArena().myMaxRank >= this._cvo.rankStart)
            this._picStrip.width = 0;
        else if (isFull)
            this._picStrip.width = this.FULL_WIDTH;
        else {
            this._picStrip.width = ((this._cvo.rankStart - Manager.model.getArena().myMaxRank) / (this._cvo.rankStart - this._cvo.rankTarget)) * this.FULL_WIDTH;
        }
    };
    ArenaMaxListItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._loadComplete) {
            this._txt.dispose();
            this._txt = null;
            this._picStrip = null;
            this._picFull = null;
            this._picBox = null;
            this._picGeted = null;
            this._redIcon = null;
            this._groupHot = null;
        }
        this._cvo = null;
    };
    ArenaMaxListItem.WIDTH = 167;
    return ArenaMaxListItem;
}(UIComponent));
//# sourceMappingURL=ArenaMaxListItem.js.map