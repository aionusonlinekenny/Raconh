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
 * 盟主战三大盟主排名
 */
var ClubLeaderWarLeaderRankView = /** @class */ (function (_super) {
    __extends(ClubLeaderWarLeaderRankView, _super);
    function ClubLeaderWarLeaderRankView() {
        var _this = _super.call(this) || this;
        _this._model = Manager.model.getClubLeaderWar();
        _this.skinName = Manager.path.getSkinName("clubLeaderWar", "ClubLeaderWarLeaderRankViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    ClubLeaderWarLeaderRankView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        Manager.control.getClubLeaderWar().leaderRankQuery();
    };
    ClubLeaderWarLeaderRankView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_LEADER_INFO, this.updateList, this);
    };
    ClubLeaderWarLeaderRankView.prototype.removeEvent = function () {
        this._model.removeEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_LEADER_INFO, this.updateList, this);
        _super.prototype.removeEvent.call(this);
    };
    // private reqRankData():void
    // {
    // 	Manager.control.getClubLeaderWar().leaderRankQuery();
    // 	// let list:Array<ClubLeaderWarLeaderInfo> = [];
    // 	// for(let i:number=0; i<3; i++)
    // 	// {
    // 	// 	let info:ClubLeaderWarLeaderInfo = new ClubLeaderWarLeaderInfo();
    // 	// 	info.rank = i + 1;
    // 	// 	info.roleId = i + 1;
    // 	// 	info.career = 1;
    // 	// 	info.nickName = "专打高富帅";
    // 	// 	info.fight = 50000 - i * 234;
    // 	// 	list.push(info);
    // 	// }
    // 	// this.updateList(list);
    // }
    ClubLeaderWarLeaderRankView.prototype.updateList = function (e) {
        var data = e.params;
        var list = data;
        var len = list.length;
        this._item0.info = len > 0 ? list[0] : null;
        this._list.itemList.itemRendererFunction = function (info) {
            return ClubLeaderWarLeaderRankItem2;
        };
        this._list.itemList.dataProvider = new eui.ArrayCollection(list.slice(1));
        this._list.itemList.allowMultipleSelection = false;
        this._list.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this._list.scroller.scrollPolicyV = eui.ScrollPolicy.ON;
    };
    ClubLeaderWarLeaderRankView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._model = null;
        this._content.parent.removeChild(this._content);
        this._content = null;
        this._item0.dispose();
        this._item0 = null;
        this._list.dispose();
        this._list = null;
    };
    return ClubLeaderWarLeaderRankView;
}(UIComponent));
//# sourceMappingURL=ClubLeaderWarLeaderRankView.js.map