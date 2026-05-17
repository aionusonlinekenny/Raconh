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
 * 盟会战内信息小界面
 * luzh
 * 2018.1.29
 */
var ClubBFMiniView = (function (_super) {
    __extends(ClubBFMiniView, _super);
    function ClubBFMiniView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("clubBF", "ClubBFMiniSkin");
        _this.touchChildren = true;
        return _this;
    }
    ClubBFMiniView.prototype.show = function () {
        if (this.parent == null) {
            Manager.layer.uiLayer.addChildAt(this, 0);
        }
    };
    ClubBFMiniView.prototype.hide = function () {
        this.dispose();
    };
    ClubBFMiniView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getClubBF();
        this._bar.labelFunction = function (value, maximum) { return Math.ceil(value / maximum * 10000) / 100 + "%"; };
        if (this._model.isSelfDef) {
            this._back.source = "clubBF_blue_back_png";
            this._title.text = LangCVO.getContent("clubBF28"); //防守
            this._btnClubScore.visible = this._txtClubScore.visible = false;
        }
        else {
            this._back.source = "task_guang_png";
            this._title.text = LangCVO.getContent("clubBF29"); //进攻
            this._btnClubScore.visible = this._txtClubScore.visible = true;
            this._friendClubID = 6 - this._model.defClubType - Manager.model.self.attrInfo.guildType;
        }
        this._txtName.text = MonsterCVO.getCVO(2103).name;
        this._txtClubBuff.text = BuffCVO.getCVO(8105, 1).attrVo.attrInfos[0].desc(true);
        this._aniBtnChallenge = Manager.animation.createEffectAnimation("hctz");
        this._aniBtnChallenge.touchEnabled = true;
        this._aniBtnChallenge.y = 750;
        this._rewardCVOs = ClubBFScoreRewardsCVO.getCVOs();
        Manager.render.add(this.render, this, 1000);
        this.updateChallengeCD(null);
        this.onEnterMap(null);
        this.onResizeHandler(null);
    };
    ClubBFMiniView.prototype.render = function () {
        Manager.control.getClubBF().reqMiniInfos();
    };
    ClubBFMiniView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnAuto.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnClubBuff.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnAttachProps.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnClubScore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._aniBtnChallenge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.addEventListener(ClubBFEvent.ATTACK_BUFF_UPDATE, this.updateAttackBuff, this);
        this._model.addEventListener(ClubBFEvent.SCORE_UPDATE, this.updateScore, this);
        this._model.addEventListener(ClubBFEvent.REWARES_GET_STATE, this.updateGetState, this);
        this._model.addEventListener(ClubBFEvent.CLUB_BUFF_BUY, this.updateClubBuff, this);
        this._model.addEventListener(ClubBFEvent.MINI_INFOS, this.updateMiniInfos, this);
        this._model.addEventListener(ClubBFEvent.CD_UPDATE, this.updateChallengeCD, this);
        this._model.addEventListener(ClubBFEvent.CHALLENGE_AREA_STATE, this.hideImgGoto, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.SCENE_CLICK, this.hideImgGoto, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.ENTER_SCENE, this.onEnterMap, this);
    };
    ClubBFMiniView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnAuto.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnClubBuff.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnAttachProps.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnGet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnClubScore.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._aniBtnChallenge.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.removeEventListener(ClubBFEvent.ATTACK_BUFF_UPDATE, this.updateAttackBuff, this);
        this._model.removeEventListener(ClubBFEvent.SCORE_UPDATE, this.updateScore, this);
        this._model.removeEventListener(ClubBFEvent.REWARES_GET_STATE, this.updateGetState, this);
        this._model.removeEventListener(ClubBFEvent.CLUB_BUFF_BUY, this.updateClubBuff, this);
        this._model.removeEventListener(ClubBFEvent.MINI_INFOS, this.updateMiniInfos, this);
        this._model.removeEventListener(ClubBFEvent.CD_UPDATE, this.updateChallengeCD, this);
        this._model.removeEventListener(ClubBFEvent.CHALLENGE_AREA_STATE, this.hideImgGoto, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.SCENE_CLICK, this.hideImgGoto, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.ENTER_SCENE, this.onEnterMap, this);
        Manager.model.self.removeEventListener(GameObjectEvent.GO_POSITION, this.updateLocation, this);
    };
    ClubBFMiniView.prototype.onResizeHandler = function (e) {
        this.width = Math.round(Manager.config.gameWidth);
        this._aniBtnChallenge.x = this.width / 2 - 140;
        if (this.parent)
            this.x = -this.parent.x;
    };
    ClubBFMiniView.prototype.onEnterMap = function (e) {
        var mapCVO = Manager.model.getMap().mapCVO;
        this._model.hasEnterChallengeArea = false;
        if (mapCVO) {
            if (mapCVO.id == MapConst.ID_CLUB_BF) {
                this.show();
                Manager.model.self.addEventListener(GameObjectEvent.GO_POSITION, this.updateLocation, this);
                this.updateLocation(null);
            }
            else {
                Manager.model.self.removeEventListener(GameObjectEvent.GO_POSITION, this.updateLocation, this);
                if (mapCVO.id == MapConst.ID_CLUB_BF_BOSS || mapCVO.id == MapConst.ID_CLUB_BF_1V1)
                    ObjectUtil.remove(this);
                else
                    Manager.view.hide(100 /* ClubBFMiniView */);
            }
        }
    };
    ClubBFMiniView.prototype.updateLocation = function (e) {
        if (this._model.cd > 0)
            return;
        if (!this._model.hasEnterChallengeArea) {
            if (ClubBFConfigCVO.isInDoorArea(this._model.isSelfDef))
                Manager.control.getClubBF().enterChallengeArea(true); //进入城门时发
        }
        else if (!ClubBFConfigCVO.isInDoorArea(this._model.isSelfDef)) {
            Manager.control.getClubBF().enterChallengeArea(false); //离开城门时发
        }
    };
    ClubBFMiniView.prototype.updateChallengeCD = function (e) {
        if (this._model.cd == 0) {
            if (this._model.autoChallenge)
                this.gotoChallenge();
            ObjectUtil.addOrRemove(this._aniBtnChallenge, this, true);
        }
        else
            ObjectUtil.addOrRemove(this._aniBtnChallenge, this, false);
    };
    ClubBFMiniView.prototype.hideImgGoto = function (e) {
        this._imgGoto.visible = false;
    };
    ClubBFMiniView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._btnAuto:
                this._model.autoChallenge = !this._model.autoChallenge;
                this._imgSelected.visible = this._model.autoChallenge;
                if (this._model.autoChallenge && this._model.cd == 0)
                    this.gotoChallenge();
                break;
            case this._btnClubBuff:
                if (this._model.clubBFHasBuy)
                    break;
                // if(!ClubBFConfigCVO.club_buff_cost.isEnough(true)) break;
                Manager.view.show(96 /* ClubBFBuyBuffView */);
                break;
            case this._btnAttachProps:
                Manager.view.show(97 /* ClubBFAttackBuffView */);
                break;
            case this._btnGet:
                /*if(this._rewardCVOs[0].canGet) */
                Manager.control.getClubBF().getRewards(this._rewardCVOs[0]);
                break;
            case this._btnClubScore:
                FloatTips.addTips(LangCVO.getContent("clubBF34")); //击败守城兽后，积分较高的进攻盟会获胜
                break;
            case this._aniBtnChallenge:
                this.gotoChallenge();
                break;
        }
    };
    ClubBFMiniView.prototype.gotoChallenge = function () {
        if (this._model.hasEnterChallengeArea)
            Manager.view.show(102 /* ClubBFChallengePanel */);
        else {
            Manager.walk.moveTo(ClubBFConfigCVO.doorNearPos(this._model.isSelfDef));
            this._imgGoto.visible = true;
        }
    };
    ClubBFMiniView.prototype.updateChallengeState = function (e) {
        this.invalidate("drawChallengeState");
    };
    ClubBFMiniView.prototype.updateAttackBuff = function (e) {
        this.invalidate("drawAttackBuff");
    };
    ClubBFMiniView.prototype.drawAttackBuff = function () {
        this._btnAttachProps.visible = this._model.atkBuffCVO != null;
    };
    ClubBFMiniView.prototype.updateClubBuff = function (e) {
        this.invalidate("drawClubBuff");
    };
    ClubBFMiniView.prototype.drawClubBuff = function () {
        if (this._model.clubBFHasBuy)
            this._txtClubBuff.filters = [];
        else
            FilterUtil.setGrayFilter(this._txtClubBuff);
    };
    ClubBFMiniView.prototype.updateScore = function (e) {
        this.invalidate("drawScore");
    };
    ClubBFMiniView.prototype.drawScore = function () {
        var str;
        var color;
        var cvo = this._rewardCVOs[0];
        if (cvo.hasGet) {
            this._redIcon.visible = false;
            str = LangCVO.getContent("clubBF31"); //已领取
            str += "\n(" + this._rewardCVOs.length + "/" + this._rewardCVOs.length + ")";
            color = Color.GREEN_STR_2;
        }
        else if (cvo.score <= Manager.model.getClubBF().score) {
            this._redIcon.visible = true;
            str = LangCVO.getContent("clubBF32"); //可领取
            str += "\n(" + (cvo.id - 1) + "/" + this._rewardCVOs.length + ")";
            color = Color.GREEN_STR_2;
        }
        else {
            this._redIcon.visible = false;
            str = LangCVO.getContent("clubBF33", cvo.score); //{0}分可领取
            str += "\n(" + (cvo.id - 1) + "/" + this._rewardCVOs.length + ")";
            color = Color.RED_STR;
        }
        HtmlUtil.setTextFlow(this._txtGet, HtmlUtil.addColorTag(str, color));
    };
    ClubBFMiniView.prototype.updateGetState = function (e) {
        this.invalidate("drawGetState");
    };
    ClubBFMiniView.prototype.drawGetState = function () {
        this._rewardCVOs.sort(ClubBFScoreRewardsCVO.sortFun);
        this.drawScore();
    };
    ClubBFMiniView.prototype.updateMiniInfos = function (e) {
        this._miniData = e.params;
        this.invalidate("drawMiniInfos");
    };
    ClubBFMiniView.prototype.drawMiniInfos = function () {
        // data["bossHP"] = pi.readInt();
        // data["bossMaxHP"] = pi.readInt();
        // data["score"] = pi.readInt();
        // data["rank"] = pi.readInt();
        // data["atkCount"] = pi.readInt();
        // data["defCount"] = pi.readInt();
        // data["clubScores"] = clubScores;
        this._bar.maximum = this._miniData["bossMaxHP"];
        this._bar.value = this._miniData["bossHP"];
        this._txtScore.text = LangCVO.getContent("clubBF5") + this._miniData["score"]; //积分：
        this._txtRank.text = LangCVO.getContent("clubBF35") + this._miniData["rank"]; //排名：
        this._txtNum.text = LangCVO.getContent("clubBF36", this._miniData["defCount"], this._miniData["atkCount"]); //防守进攻人数：{0}/{1}
        var myClubScore = this._miniData["clubScores"][Manager.model.self.attrInfo.guildType];
        var friendClubScore = this._miniData["clubScores"][this._friendClubID];
        HtmlUtil.setTextFlow(this._txtClubScore, LangCVO.getContent("clubBF37", myClubScore, friendClubScore)); //己：{0}\n友：{1}
    };
    ClubBFMiniView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawAttackBuff"))
            this.drawAttackBuff();
        if (this.isInvalid("drawClubBuff"))
            this.drawClubBuff();
        if (this.isInvalid("drawGetState"))
            this.drawGetState();
        if (this.isInvalid("drawScore") && !this.isInvalid("drawGetState"))
            this.drawScore();
        if (this.isInvalid("drawMiniInfos"))
            this.drawMiniInfos();
    };
    ClubBFMiniView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawAttackBuff();
        this.drawClubBuff();
        this.drawGetState();
    };
    ClubBFMiniView.prototype.dispose = function () {
        this._model.clear();
        Manager.render.remove(this.render, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._txtName, this._txtScore, this._txtRank, this._txtNum, this._bar, this._title, this._btnAuto, this._txtClubBuff, this._txtGet, this._txtClubScore);
        ObjectUtil.removes(this._back, this._imgSelected, this._redIcon, this._btnClubBuff, this._btnAttachProps, this._btnGet, this._btnClubScore, this._aniBtnChallenge, this._imgGoto);
        this._txtName = null;
        this._txtScore = null;
        this._txtRank = null;
        this._txtNum = null;
        this._bar = null;
        this._back = null;
        this._title = null;
        this._btnAuto = null;
        this._imgSelected = null;
        this._redIcon = null;
        this._btnClubBuff = null;
        this._btnAttachProps = null;
        this._btnGet = null;
        this._btnClubScore = null;
        this._txtClubBuff = null;
        this._txtGet = null;
        this._txtClubScore = null;
        this._aniBtnChallenge = null;
        this._imgGoto = null;
        this._model = null;
        this._rewardCVOs = null;
        Manager.view.hide(101 /* ClubBFClearCDBtn */);
        Manager.view.hide(95 /* ClubBFClearCDView */);
        Manager.control.getClubBF().hidePKHead();
    };
    return ClubBFMiniView;
}(UIComponent));
__reflect(ClubBFMiniView.prototype, "ClubBFMiniView", ["IViewManager"]);
//# sourceMappingURL=ClubBFMiniView.js.map