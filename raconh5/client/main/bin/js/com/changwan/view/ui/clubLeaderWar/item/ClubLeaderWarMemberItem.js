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
var ClubLeaderWarMemberItem = /** @class */ (function (_super) {
    __extends(ClubLeaderWarMemberItem, _super);
    function ClubLeaderWarMemberItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("clubLeaderWar/item", "ClubLeaderWarMemberItemSkin");
        return _this;
    }
    ClubLeaderWarMemberItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ClubLeaderWarMemberItem.prototype.onClickHandler = function (e) {
        Manager.control.getClubLeaderWar().designateQuery(this._info.roleId);
    };
    ClubLeaderWarMemberItem.prototype.dataChanged = function () {
        this._info = this.data;
        if (this._info) {
            var careerInfo = ClubDataCVO.getClubCareerById(this._info.clubCareer);
            if (careerInfo) {
                this._name.text = "[" + careerInfo.careerName + "]" + this._info.nickName;
            }
            this._btn.visible = !(this._info.type == 2);
            // this._titleImg.visible = this._info.type == 2;
            if (this._info.type == 2) {
                var clubType = Number(String(Manager.model.self.attrInfo.guildID).substr(-1, 1));
                var rankList = Manager.model.getClubLeaderWar().info.rankList;
                var rank = 0;
                for (var i = 0; i < rankList.length; i++) {
                    if (rankList[i].id == this._info.roleId) {
                        rank = rankList[i].rank;
                        break;
                    }
                }
                var titleId = ClubDataCVO.getClubLeaderWarTitle(clubType, rank);
                if (titleId) {
                    this._titleImg = Manager.pool.create(BitmapRemote);
                    this._titleImg.x = 403;
                    this._titleImg.y = 22;
                    this.addChild(this._titleImg);
                    this._titleImg.load(Manager.path.getTitlePath(titleId));
                }
            }
        }
    };
    ClubLeaderWarMemberItem.prototype.dispose = function () {
        if (this._btn)
            this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._name, this._titleImg, this._btn);
        if (this._name)
            this._name.dispose();
        this._name = null;
        if (this._btn)
            this._btn.dispose();
        this._btn = null;
        if (this._titleImg)
            Manager.pool.push(this._titleImg);
        this._titleImg = null;
    };
    return ClubLeaderWarMemberItem;
}(ItemRenderer));
//# sourceMappingURL=ClubLeaderWarMemberItem.js.map