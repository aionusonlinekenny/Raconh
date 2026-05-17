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
var ClubBFChallengeItem = (function (_super) {
    __extends(ClubBFChallengeItem, _super);
    function ClubBFChallengeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("clubBF", "ClubBFChallengeItemSkin");
        return _this;
    }
    ClubBFChallengeItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.addEvent();
    };
    ClubBFChallengeItem.prototype.dataChanged = function () {
        this._info = this.data;
        this._flag.source = this._info.isDef ? "arenaLogFsIcon_png" : "arenaLogJgIcon_png";
        if (this._info.isRobot) {
            var cvo = MonsterCVO.getCVO(this._info.tempID);
            this._head.load(Manager.path.getBossHeadPath(cvo.url, "r"));
            this._txtName.text = LangCVO.getContent("clubBF38"); //援军
            // this._txtPower.text = LangCVO.getContent("clubBF40") + LangCVO.getContent("clubBF39");//未知
            this._txtPower.text = LangCVO.getContent("clubBF40") + this._info.power; //战力：
            this._txtWin.text = LangCVO.getContent("clubBF41") + LangCVO.getContent("clubBF39"); //未知
        }
        else {
            this._head.load(Manager.path.getRoleHeadPath(1, this._info.career));
            this._txtName.text = this._info.name;
            this._txtPower.text = LangCVO.getContent("clubBF40") + this._info.power; //战力：
            this._txtWin.text = LangCVO.getContent("clubBF41") + this._info.winCount; //连胜：
        }
    };
    ClubBFChallengeItem.prototype.addEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ClubBFChallengeItem.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ClubBFChallengeItem.prototype.onClickHandler = function (e) {
        var isSelfDef = Manager.model.getClubBF().isSelfDef;
        if (this._info.isDef == isSelfDef) {
            FloatTips.addTips(LangCVO.getContent("clubBF42")); //你与该玩家同阵营，无需挑战
            return;
        }
        Manager.control.getClubBF().challengePlayer(this._info.isRobot, this._info.id);
    };
    ClubBFChallengeItem.prototype.dispose = function () {
        this.removeEvent();
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._head, this._txtName, this._txtPower, this._txtWin);
        ObjectUtil.remove(this._flag);
        this._head = null;
        this._flag = null;
        this._txtName = null;
        this._txtPower = null;
        this._txtWin = null;
        this._info = null;
    };
    return ClubBFChallengeItem;
}(ItemRenderer));
__reflect(ClubBFChallengeItem.prototype, "ClubBFChallengeItem");
//# sourceMappingURL=ClubBFChallengeItem.js.map