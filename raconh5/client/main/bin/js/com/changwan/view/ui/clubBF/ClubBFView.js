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
 * 盟会战视图
 * luzhihong
 * create 2018.1.29
 */
var ClubBFView = /** @class */ (function (_super) {
    __extends(ClubBFView, _super);
    function ClubBFView(parentView) {
        var _this = _super.call(this) || this;
        _this._items = [];
        _this._enterCDEndTime = 0;
        _this._timeStr = "";
        _this._parentView = parentView;
        _this.skinName = Manager.path.getSkinName("clubBF", "ClubBFViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    ClubBFView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getClubBF();
        this._cvo = DailyActivityCVO.getCVO(ActIconID.CLUB_BF);
        this._back.load(Manager.path.getClubBFPath("back.jpg"));
        var item;
        var len = this._cvo.rewards.length;
        for (var i = 0; i < len; i++) {
            item = Manager.pool.create(Goods);
            item.x = 128 + i * 128;
            item.y = 845;
            item.data = this._cvo.rewards[i].item;
            this.addChild(item);
            this._items.push(item);
        }
        this._parentView.addChild(this._btnExplain);
    };
    ClubBFView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.updateRewards();
        Manager.control.getClubBF().reqInfo();
    };
    ClubBFView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnExplain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnRewards.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnTips.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.addEventListener(ClubBFEvent.INFO_UPDATE, this.updateInfo, this);
        this._model.addEventListener(ClubBFEvent.CLUB_POWERS, this.updateClubPowers, this);
        this._model.addEventListener(ClubBFEvent.SCORE_UPDATE, this.updateRewards, this);
        this._model.addEventListener(ClubBFEvent.REWARES_GET_STATE, this.updateRewards, this);
        Manager.model.getActIcon().addEventListener(ActIconEvent.SINGLE_UPDATE, this.actUpdate, this);
        Manager.model.getActIcon().addEventListener(ActIconEvent.LIST_UPDATE, this.actUpdate, this);
    };
    ClubBFView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnExplain.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnRewards.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnTips.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.removeEventListener(ClubBFEvent.INFO_UPDATE, this.updateInfo, this);
        this._model.removeEventListener(ClubBFEvent.CLUB_POWERS, this.updateClubPowers, this);
        this._model.removeEventListener(ClubBFEvent.SCORE_UPDATE, this.updateRewards, this);
        this._model.removeEventListener(ClubBFEvent.REWARES_GET_STATE, this.updateRewards, this);
        Manager.model.getActIcon().removeEventListener(ActIconEvent.SINGLE_UPDATE, this.actUpdate, this);
        Manager.model.getActIcon().removeEventListener(ActIconEvent.LIST_UPDATE, this.actUpdate, this);
    };
    ClubBFView.prototype.updateRewards = function (e) {
        if (e === void 0) { e = null; }
        this._redIcon.visible = this._model.hasCanGet;
    };
    ClubBFView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._btnEnter:
                if (Manager.model.self.attrInfo.guildID == 0) //无盟会
                 {
                    Manager.view.show(38 /* ClubPanel */);
                }
                else {
                    if (!this._cvo.isInTime) {
                        FloatTips.addTips(this._timeStr); //
                        return;
                    }
                    var cd = this.enterCD;
                    if (cd > 0) {
                        FloatTips.addTips(LangCVO.getContent("clubBF25", cd)); //{0}秒后可前往战场
                        return;
                    }
                    if (!this._cvo.isAllCondSatisfy(true))
                        return;
                    if (!Manager.model.self.canJoinActive(true))
                        return;
                    Manager.control.getClubBF().enter();
                    Manager.view.hide(93 /* ClubBFPanel */);
                }
                break;
            case this._btnExplain:
                Manager.view.show(94 /* ClubBFExplainView */);
                break;
            case this._btnRewards:
                Manager.view.show(103 /* ClubBFRewardsPanel */);
                break;
            case this._btnTips:
                var str = LangCVO.getContent("clubBF45");
                if (this._clubPowers) {
                    str += "\n" + LangCVO.getContent("clubBF46");
                    str += HtmlUtil.addColorTag("\n1、" + ClubDataCVO.getClubName(this._clubPowers[0]["id"]) + this._clubPowers[0]["power"], Color.ORANGE_STR);
                    str += HtmlUtil.addColorTag("\n2、" + ClubDataCVO.getClubName(this._clubPowers[1]["id"]) + this._clubPowers[1]["power"], Color.PURPLE_STR);
                    str += HtmlUtil.addColorTag("\n3、" + ClubDataCVO.getClubName(this._clubPowers[2]["id"]) + this._clubPowers[2]["power"], Color.BLUE_STR);
                    // for(var i:number=0; i<this._clubPowers.length; i++)
                    // {
                    //     str += "\n" + (i+1) + "、" + ClubDataCVO.getClubName(this._clubPowers[i]["id"]) + this._clubPowers[i]["power"];
                    // }
                }
                Manager.view.show(109 /* TextTips */, str);
                break;
        }
    };
    Object.defineProperty(ClubBFView.prototype, "enterCD", {
        get: function () {
            var left = Math.ceil(this._enterCDEndTime - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
            return left > 0 ? left : 0;
        },
        enumerable: true,
        configurable: true
    });
    ClubBFView.prototype.updateInfo = function (e) {
        // {clubID:clubID, winCount:winCount, enterCD:enterCD}
        var clubID = e.params.clubID;
        var winCount = e.params.winCount;
        this._enterCDEndTime = e.params.enterCD;
        if (clubID == 0)
            Manager.control.getClubBF().reqClubPowers();
        else {
            var str = ClubDataCVO.getClubName(clubID) + "\n" + winCount + LangCVO.getContent("clubBF14"); //连胜
            HtmlUtil.setTextFlow(this._txtClub, str);
        }
    };
    ClubBFView.prototype.updateClubPowers = function (e) {
        this._clubPowers = e.params;
        var str = ClubDataCVO.getClubName(this._clubPowers[0]["id"]) + "\n" + LangCVO.getContent("clubBF26"); //	总战力第一盟
        HtmlUtil.setTextFlow(this._txtClub, str);
    };
    ClubBFView.prototype.actUpdate = function (e) {
        this.invalidate("drawActUpdate");
    };
    ClubBFView.prototype.drawActUpdate = function () {
        this.drawActUpdateHandler();
        Manager.render.add(this.drawActUpdateHandler, this, 1000);
    };
    ClubBFView.prototype.drawActUpdateHandler = function () {
        if (this._cvo.isInTime)
            this._txtTime.text = "";
        else {
            // this._txtTime.text = this._cvo.timeDesc;
            var nextDate = ClubBFConfigCVO.nextStartTime;
            // let startTimeStr:string = cw.DateUtil.formatStr(this._cvo.startTime, cw.DateUtil.HH_MM, true);
            // let endTimeStr:string = cw.DateUtil.formatStr(this._cvo.endTime, cw.DateUtil.HH_MM, true);
            // this._timeStr = LangCVO.getContent("clubBF24", nextDate.getMonth(), nextDate.getDate(), startTimeStr, endTimeStr, GameUtil.getWeekDayStr(nextDate.getDay()));// 战场开启时间：{0}月{1}日{2}-{3}（{4}）
            // this._txtTime.text = this._timeStr;
            var time = Math.round((nextDate.getTime() - Manager.model.getLogin().serverTimeInfo.serverTime) / 1000);
            if (time < 0) {
                Manager.render.remove(this.drawActUpdateHandler, this);
                HtmlUtil.setTextFlow(this._txtTime, LangCVO.getContent("clubBF48", "00:00:00"));
                return;
            }
            if (time > 24 * 3600) {
                var day = Math.floor((time + Manager.model.getLogin().serverTimeInfo.todaySeconds) / (24 * 3600));
                HtmlUtil.setTextFlow(this._txtTime, LangCVO.getContent("clubBF47", day));
            }
            else {
                var timeStr = cw.DateUtil.formatStr(time, cw.DateUtil.LEFT_HH_MM_SS, true);
                HtmlUtil.setTextFlow(this._txtTime, LangCVO.getContent("clubBF48", timeStr));
            }
        }
    };
    ClubBFView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawActUpdate"))
            this.drawActUpdate();
    };
    ClubBFView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawActUpdate();
    };
    ClubBFView.prototype.dispose = function () {
        Manager.render.remove(this.drawActUpdateHandler, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._back, this._txtClub, this._txtTime, this._btnEnter, this._btnRewards, this._btnTips);
        ObjectUtil.removes(this._btnExplain, this._redIcon);
        for (var i = this._items.length - 1; i >= 0; i--) {
            this._items[i].dispose();
        }
        this._back = null;
        this._txtClub = null;
        this._txtTime = null;
        this._btnEnter = null;
        this._btnExplain = null;
        this._btnRewards = null;
        this._btnTips = null;
        this._items = null;
        this._model = null;
        this._cvo = null;
        this._clubPowers = null;
        this._parentView = null;
    };
    return ClubBFView;
}(UIComponent));
//# sourceMappingURL=ClubBFView.js.map