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
 * 经验副本内信息视图
 * luzhihong
 * create 2018.1.11
 */
var CopyExpInfoView = (function (_super) {
    __extends(CopyExpInfoView, _super);
    function CopyExpInfoView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("activity", "CopyExpInfoViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    CopyExpInfoView.prototype.show = function () {
        if (this.parent == null) {
            Manager.layer.uiLayer.addChild(this);
            this.onResizeHandler(null);
        }
    };
    CopyExpInfoView.prototype.hide = function () {
        this.dispose();
    };
    CopyExpInfoView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getCopy().expModel;
        this._cvo = CopyCVO.getCVO(CopyConst.ID_EXP);
        // FilterUtil.setTxtFilter(this._txtExpRate);
        if (!Manager.model.getCopy().expModel.needGuide) {
            Manager.render.add(this.countdown, this, 1000);
            this.countdown();
        }
        else
            HtmlUtil.setTextFlow(this._txtTime, LangCVO.getContent("boss4") + "00:00");
    };
    CopyExpInfoView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnExpUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnKillUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.addEventListener(CopyEvent.EXP_INSPIRE, this.updateExpRate, this);
        this._model.addEventListener(CopyEvent.EXP_GAINS, this.updateExps, this);
        this._model.addEventListener(CopyEvent.EXP_KILLS, this.updateKills, this);
        this._model.addEventListener(CopyEvent.EXP_DATA_INIT, this.updateDataInit, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.COIN, this.onMoneyUpdateHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.GOLD, this.onMoneyUpdateHandler, this);
        Manager.model.getVip().addEventListener(VipEvent.EXP_UPDATE, this.updateRecharge, this);
    };
    CopyExpInfoView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnExpUp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnKillUp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.removeEventListener(CopyEvent.EXP_INSPIRE, this.updateExpRate, this);
        this._model.removeEventListener(CopyEvent.EXP_GAINS, this.updateExps, this);
        this._model.removeEventListener(CopyEvent.EXP_KILLS, this.updateKills, this);
        this._model.removeEventListener(CopyEvent.EXP_DATA_INIT, this.updateDataInit, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.COIN, this.onMoneyUpdateHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.GOLD, this.onMoneyUpdateHandler, this);
        Manager.model.getVip().removeEventListener(VipEvent.EXP_UPDATE, this.updateRecharge, this);
    };
    CopyExpInfoView.prototype.onResizeHandler = function (e) {
        this._group.x = Manager.config.gameWidth - this.parent.x - 110;
    };
    CopyExpInfoView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._btnExpUp:
                Manager.view.show(71 /* CopyExpAddRateView */);
                break;
            case this._btnKillUp:
                Manager.view.show(76 /* FirstChargeView */);
                break;
        }
    };
    CopyExpInfoView.prototype.onMoneyUpdateHandler = function (e) {
        this.invalidate("drawRedIcon");
    };
    CopyExpInfoView.prototype.updateExpRate = function (e) {
        this.invalidate("drawExpRate");
    };
    CopyExpInfoView.prototype.updateExps = function (e) {
        this.invalidate("drawExps");
    };
    CopyExpInfoView.prototype.updateKills = function (e) {
        this.invalidate("drawKills");
    };
    CopyExpInfoView.prototype.updateDataInit = function (e) {
        this.invalidate("drawDataInit");
    };
    CopyExpInfoView.prototype.updateRecharge = function (e) {
        this.invalidate("drawRecharge");
    };
    CopyExpInfoView.prototype.drawExpRate = function () {
        // 41	经验
        var rate = this._model.inspireRate / 10;
        this._txtExpRate.text = LangCVO.getContent("common41") + "+" + rate + "%";
    };
    CopyExpInfoView.prototype.drawRedIcon = function () {
        var canUp = false;
        if (this._model.inspireRate < CopyExpConfigCVO.up_coin_rate_max && CopyExpConfigCVO.up_coin_need.isEnough())
            canUp = true;
        // else if(this._model.inspireRate < CopyExpConfigCVO.up_gold_rate_max && CopyExpConfigCVO.up_gold_need.isEnough()) canUp = true;
        this._expUpRedIcon.visible = canUp;
    };
    CopyExpInfoView.prototype.drawExps = function () {
        // 9	经验池：
        var str = HtmlUtil.addColorTag(GameUtil.getNumShortStr(this._model.exp), Color.GREEN_STR);
        HtmlUtil.setTextFlow(this._txtExp, LangCVO.getContent("copy9") + str);
    };
    CopyExpInfoView.prototype.drawKills = function () {
        var str = HtmlUtil.addColorTag(this._model.kills + "", Color.GREEN_STR);
        HtmlUtil.setTextFlow(this._txtKill, LangCVO.getContent("copy10") + str); //已击杀：
        var cvo = CopyExpScoreCVO.getCVOByKillNum(this._model.kills);
        if (this._score != cvo.score) {
            this._score = cvo.score;
            this._imgScore.source = "copy_exp_score_" + cvo.score + "_png";
            egret.Tween.removeTweens(this._imgScore);
            egret.Tween.get(this._imgScore).to({ scaleX: 3, scaleY: 3 }, 250, egret.Ease.circOut)
                .to({ scaleX: 1, scaleY: 1 }, 250, egret.Ease.circIn);
        }
        var nextCVO = CopyExpScoreCVO.getCVO(cvo.id + 1);
        if (nextCVO) {
            HtmlUtil.setTextFlow(this._txtScore, LangCVO.getContent("copy11", nextCVO.kill_num, HtmlUtil.addColorTag(nextCVO.score, Color.RED_STR))); //击杀{0}只怪可升到{1}评价
        }
        else
            this._txtScore.text = LangCVO.getContent("copy12"); //12	已获得最高评价
    };
    CopyExpInfoView.prototype.drawRecharge = function () {
        this._btnKillUp.visible = this._killUpRedIcon.visible = Manager.model.getVip().exp == 0;
    };
    CopyExpInfoView.prototype.countdown = function () {
        var str = HtmlUtil.addColorTag(cw.DateUtil.formatStr(this._cvo.leftTime, cw.DateUtil.LEFT_MM_SS, true), Color.GREEN_STR);
        HtmlUtil.setTextFlow(this._txtTime, LangCVO.getContent("boss4") + str);
    };
    CopyExpInfoView.prototype.guideCB = function () {
        Manager.control.getCopy().askMonster(CopyConst.ID_EXP);
        Manager.render.add(this.countdown, this, 1000);
        this.countdown();
        Manager.view.show(71 /* CopyExpAddRateView */);
        Manager.model.getCopy().expModel.needGuide = false;
        Manager.control.getTask().hideGuide();
    };
    CopyExpInfoView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawExpRate", "drawDataInit"))
            this.drawExpRate();
        if (this.isInvalid("drawExps", "drawDataInit"))
            this.drawExps();
        if (this.isInvalid("drawKills", "drawDataInit"))
            this.drawKills();
        if (this.isInvalid("drawRedIcon", "drawExpRate", "drawDataInit"))
            this.drawRedIcon();
        if (this.isInvalid("drawRecharge"))
            this.drawRecharge();
    };
    CopyExpInfoView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawExpRate();
        this.drawExps();
        this.drawKills();
        this.drawRedIcon();
        this.drawRecharge();
    };
    /**引导 */
    CopyExpInfoView.prototype.setGuide = function () {
        if (Manager.model.getGuide().curID == GuideID.EXP_COPY) {
            var pos = this._btnExpUp.parent.localToGlobal(this._btnExpUp.x, this._btnExpUp.y);
            Manager.control.getTask().showGuide(pos, this._btnExpUp.width >> 1, this._btnExpUp.height >> 1, this.guideCB, this);
        }
    };
    CopyExpInfoView.prototype.dispose = function () {
        this._model.clean();
        Manager.render.remove(this.countdown, this);
        egret.Tween.removeTweens(this._imgScore);
        if (Manager.model.getGuide().curID == GuideID.EXP_COPY)
            Manager.control.getTask().hideGuide();
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._txtScore, this._txtKill, this._txtTime, this._txtExp, this._txtExpRate);
        ObjectUtil.removes(this._imgScore, this._group, this._btnExpUp, this._btnKillUp, this._expUpRedIcon, this._killUpRedIcon);
        this._txtScore = null;
        this._txtKill = null;
        this._txtTime = null;
        this._txtExp = null;
        this._imgScore = null;
        this._group = null;
        this._btnExpUp = null;
        this._btnKillUp = null;
        this._expUpRedIcon = null;
        this._killUpRedIcon = null;
        this._txtExpRate = null;
        this._model = null;
        this._cvo = null;
    };
    return CopyExpInfoView;
}(UIComponent));
__reflect(CopyExpInfoView.prototype, "CopyExpInfoView", ["IViewManager"]);
//# sourceMappingURL=CopyExpInfoView.js.map