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
 * 盟会战结算界面
 * luzhihong
 * create 2017-12-1
 */
var ClubBFResult = /** @class */ (function (_super) {
    __extends(ClubBFResult, _super);
    // private _leftTime:number;
    function ClubBFResult() {
        var _this = _super.call(this) || this;
        _this._goodItems = [];
        _this.skinName = Manager.path.getSkinName("clubBF", "ClubBFResultSkin");
        _this.touchChildren = true;
        return _this;
    }
    /**
     * @param isBoss 是否为boss结算
     * @param data 数据
    */
    ClubBFResult.prototype.show = function (defClub, winClub, winCount, score, rank, infos, clubScores) {
        this._defClubType = defClub;
        this._winClubType = winClub;
        this._winCount = winCount;
        this._score = score;
        this._rank = rank;
        this._infos = infos;
        this._clubScores = clubScores;
        // this._leftTime = 10;
        if (this.parent == null) {
            this.y = 213;
            Manager.layer.tipsLayer.addChild(this);
        }
    };
    ClubBFResult.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        var isDefWin = (this._defClubType == this._winClubType);
        var attackClutTypes = this.getAttackClubTypes();
        var attackClubName0 = ClubDataCVO.getClubName(attackClutTypes[0]);
        var attackClubName1 = ClubDataCVO.getClubName(attackClutTypes[1]);
        this._txtClubScore0.text = attackClubName0 + LangCVO.getContent("clubBF5") + this._clubScores[attackClutTypes[0]]; //积分：
        this._txtClubScore1.text = attackClubName1 + LangCVO.getContent("clubBF5") + this._clubScores[attackClutTypes[1]]; //积分：
        if (isDefWin) {
            var defClubName = ClubDataCVO.getClubName(this._defClubType);
            HtmlUtil.setTextFlow(this._txtClubWin, defClubName + "\n" + this._winCount + LangCVO.getContent("clubBF14")); //连胜
            HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("clubBF15")); //城门未被击破，守方获得胜利。
            HtmlUtil.setTextFlow(this._txt1, LangCVO.getContent("clubBF16", defClubName)); //{0}继续占领王城。
        }
        else {
            HtmlUtil.setTextFlow(this._txtClubWin, attackClubName0 + "\n" + attackClubName1); //
            HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("clubBF17")); //城门被击破，攻方获得胜利。
            HtmlUtil.setTextFlow(this._txt1, LangCVO.getContent("clubBF18", attackClubName0)); //{0}占领王城。
        }
        var myClubType = Manager.model.self.attrInfo.guildType;
        var isWin = (isDefWin && myClubType == this._defClubType) || (!isDefWin && myClubType != this._defClubType);
        var str = isWin ? HtmlUtil.addColorTag(LangCVO.getContent("clubBF20"), Color.RED_STR) : HtmlUtil.addColorTag(LangCVO.getContent("clubBF21"), Color.BLUE_STR);
        HtmlUtil.setTextFlow(this._txtResult, LangCVO.getContent("clubBF19") + str); //我的盟会：
        this._txtScore.text = LangCVO.getContent("clubBF22") + this._score; //我的积分：
        this._txtRank.text = LangCVO.getContent("clubBF23") + this._rank; //盟内排名：
        var item;
        for (var i = 0, len = this._infos.length; i < len; i++) {
            item = Manager.pool.create(Goods);
            item.x = i * 128;
            item.data = this._infos[i];
            this._gItems.addChild(item);
            this._goodItems.push(item);
        }
        this._txtTime.text = "";
        // Manager.render.add(this.countDown, this, 1000);
        // this.countDown();
        this.onResizeHandler(null);
    };
    ClubBFResult.prototype.getAttackClubTypes = function () {
        var clubTypes = [];
        for (var i = 1; i <= 3; i++) {
            if (i != this._defClubType)
                clubTypes.push(i);
        }
        if (this._clubScores[clubTypes[0]] < this._clubScores[clubTypes[1]])
            clubTypes.reverse();
        return clubTypes;
    };
    // private countDown():void
    // {
    // 	if(this._leftTime <= 0)
    // 	{
    // 		Manager.view.hide(ViewID.ClubBFResult);
    // 		return;
    // 	}
    // 	this._txtTime.text = LangCVO.getContent("activity2", this._leftTime);
    // 	this._leftTime--;
    // }
    ClubBFResult.prototype.hide = function () {
        this.dispose();
    };
    ClubBFResult.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ClubBFResult.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ClubBFResult.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    ClubBFResult.prototype.onClickHandler = function (e) {
        // if(this._callback && e.currentTarget != this._btnClose) this._callback();
        Manager.view.hide(99 /* ClubBFResult */);
    };
    ClubBFResult.prototype.dispose = function () {
        // Manager.render.remove(this.countDown, this);
        _super.prototype.dispose.call(this);
        for (var i = this._goodItems.length - 1; i >= 0; i--) {
            Manager.pool.push(this._goodItems[i]);
        }
        ObjectUtil.disposes(this._txtClubWin, this._txt0, this._txtClubScore0, this._txtClubScore1, this._txt1, this._txtResult, this._txtScore, this._txtRank, this._txtTime, this._btn);
        ObjectUtil.removes(this._gItems, this._btnClose);
        this._txtClubWin = null;
        this._txt0 = null;
        this._txtClubScore0 = null;
        this._txtClubScore1 = null;
        this._txt1 = null;
        this._txtResult = null;
        this._txtScore = null;
        this._txtRank = null;
        this._txtTime = null;
        this._gItems = null;
        this._btn = null;
        this._btnClose = null;
        this._goodItems = null;
        this._infos = null;
        this._clubScores = null;
    };
    return ClubBFResult;
}(UIComponent));
//# sourceMappingURL=ClubBFResult.js.map