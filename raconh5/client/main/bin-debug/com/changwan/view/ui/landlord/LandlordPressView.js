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
 * 压榨界面
 */
var LandlordPressView = (function (_super) {
    __extends(LandlordPressView, _super);
    function LandlordPressView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("landlord", "LandlordPressViewSkin");
        _this.visible = false;
        return _this;
    }
    LandlordPressView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.visible = true;
        this._base.titleImg.source = "landlord_titleyazha_png";
        this.onResizeHandler();
        this._model = Manager.model.getLaird();
    };
    LandlordPressView.prototype.initData = function () {
        this._nickName.text = this._info.name;
        this._level.text = "Lv." + this._info.level;
        var totalWorkTime;
        if (this._info.isPickAll == 1)
            totalWorkTime = this._info.pickSec;
        else
            totalWorkTime = Math.floor(Manager.model.getLogin().serverTimeInfo.serverTime / 1000) - this._info.catchTimes;
        this._workLeftTime = totalWorkTime;
        Manager.render.add(this.timeHandler, this, 1000);
        this._workTime.text = cw.DateUtil.formatStr(this._workLeftTime, cw.DateUtil.LEFT_HH_MM_SS, true);
        var awardInfo = LairdCVO.getAward(3);
        // this._gold.text = String(Math.ceil((this._info.freeTimes - this._info.catchTimes - this._info.pickSec) / 3600) * awardInfo.award.num);
        var exp = 0;
        var info = LairdCVO.getExpInfoByLevel(this._info.level);
        if (info)
            exp = info.exp;
        if (this._info.isPickAll == 1 || (this._info.catchTimes + this._info.pickSec >= this._info.freeTimes)) {
            // this._exp.text = StringUtils.getBigNum(exp * Math.floor(this._info.pickSec / 60));
            this._exp.text = "0";
        }
        else
            this._exp.text = StringUtils.getBigNum(exp * Math.floor((this._workLeftTime - this._info.pickSec) / 60));
        var totalTime = this._info.freeTimes - this._info.catchTimes;
        this._todayWorkTime.text = StringUtils.getBigNum(Math.floor(this._info.pickSec / 60) * exp) + "/" + StringUtils.getBigNum(Math.floor(totalTime / 60) * exp);
        // this._done.visible = (this._info.catchTimes + this._info.pickSec >= this._info.freeTimes);
        // this._done.x = this._exp.x + 80;
    };
    LandlordPressView.prototype.timeHandler = function () {
        var totalWorkTime;
        if (this._info.isPickAll == 1) {
            // totalWorkTime = this._info.pickSec - this._info.catchTimes;
            totalWorkTime = this._info.pickSec;
        }
        else
            totalWorkTime = Math.floor(Manager.model.getLogin().serverTimeInfo.serverTime / 1000) - this._info.catchTimes;
        // this._workLeftTime = totalWorkTime - this._info.pickSec;
        this._workLeftTime = totalWorkTime;
        this._workTime.text = cw.DateUtil.formatStr(this._workLeftTime, cw.DateUtil.LEFT_HH_MM_SS, true);
    };
    LandlordPressView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._base.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        // this._btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.addEventListener(LairdEvent.LAIRD_PICK_EXP_UPDATE, this.onPickExpUpdateHandler, this);
    };
    LandlordPressView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._base.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        // this._btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.removeEventListener(LairdEvent.LAIRD_PICK_EXP_UPDATE, this.onPickExpUpdateHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    LandlordPressView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    LandlordPressView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._base.closeBtn:
                Manager.view.hide(91 /* LandlordPressView */);
                break;
            case this._btn2:
                Manager.control.getLaird().lairPickExp(0, this._info.id);
                // Manager.view.hide(ViewID.LandlordPressView);
                break;
        }
    };
    LandlordPressView.prototype.onOkHandler = function () {
        Manager.control.getLaird().lairPickExp(1, this._info.id);
        Manager.view.hide(91 /* LandlordPressView */);
    };
    LandlordPressView.prototype.onPickExpUpdateHandler = function (e) {
        Manager.render.remove(this.timeHandler, this);
        this.initData();
    };
    LandlordPressView.prototype.show = function (info) {
        this._info = info;
        Manager.layer.tipsLayer.addChild(this);
    };
    LandlordPressView.prototype.hide = function () {
        this.dispose();
    };
    LandlordPressView.prototype.dispose = function () {
        Manager.render.remove(this.timeHandler, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._base, this._nickName, this._level, this._workTime, this._exp, this._todayWorkTime, this._btn2);
        if (this._base)
            this._base.dispose();
        this._base = null;
        if (this._nickName)
            this._nickName.dispose();
        this._nickName = null;
        if (this._level)
            this._level.dispose();
        this._level = null;
        if (this._workTime)
            this._workTime.dispose();
        this._workTime = null;
        if (this._exp)
            this._exp.dispose();
        this._exp = null;
        if (this._todayWorkTime)
            this._todayWorkTime.dispose();
        this._todayWorkTime = null;
        // if(this._btn1)
        // 	this._btn1.dispose();
        // this._btn1 = null;
        if (this._btn2)
            this._btn2.dispose();
        this._btn2 = null;
        // if(this._gold)
        // 	this._gold.dispose();
        // this._gold = null;
        this._model = null;
        this._info = null;
    };
    return LandlordPressView;
}(UIComponent));
__reflect(LandlordPressView.prototype, "LandlordPressView");
//# sourceMappingURL=LandlordPressView.js.map