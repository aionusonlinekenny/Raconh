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
 * 火眼金睛关卡信息视图
 * liangyan
 * create 2018-03-23
*/
var FireEyeLevelInfoView = /** @class */ (function (_super) {
    __extends(FireEyeLevelInfoView, _super);
    function FireEyeLevelInfoView() {
        var _this = _super.call(this) || this;
        _this.REWARDS = "drawRewards";
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("fireEye", "FireEyeLevelInfoViewSkin");
        return _this;
    }
    FireEyeLevelInfoView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._myHead) {
            var path = Manager.path.getRoleHeadPath(2, Manager.model.self.attrInfo.career);
            this._myHead = Manager.pool.create(BitmapRemote, path);
            this._myHead.x = this._myNameTxt.x - 135;
            this._myHead.y = this._myNameTxt.y - 23;
            this.addChild(this._myHead);
        }
        if (!this._otherHead) {
            this._otherHead = Manager.pool.create(BitmapRemote);
            this._otherHead.x = this._enemyNameTxt.x + 130;
            this._otherHead.y = this._myNameTxt.y - 23;
            this.addChild(this._otherHead);
        }
        if (!this._figure) {
            var path = Manager.path.getFireEyePath("flower_border");
            this._figure = Manager.pool.create(BitmapRemote, path);
            this._figure.x = 91;
            this._figure.y = 402;
            this.addChildAt(this._figure, this.getChildIndex(this._doubleSign) - 1);
        }
        if (!this._levelNum) {
            this._levelNum = Manager.pool.create(NumImgView2);
            this._levelNum.y = this._levelImg.y;
            this.addChild(this._levelNum);
        }
        if (!this._cdNum) {
            this._cdNum = Manager.pool.create(NumImgView2);
            this._cdNum.y = this._cdLabel.y + 5;
            this.addChild(this._cdNum);
        }
        this.addChildAt(this._leadSign, this.numChildren - 1);
        this._sevenSign.visible = this._allSign.visible = false;
        this._model = Manager.model.getFireEye();
        this._info = this._model.nextInfo;
        this._target = [];
    };
    FireEyeLevelInfoView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._sevenBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._allBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._model.addEventListener(FireEyeEvent.FIRE_EYE_UPDATE_REWARDS, this.updateRewerds, this);
    };
    FireEyeLevelInfoView.prototype.removeEvent = function () {
        this._sevenBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._allBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._model.removeEventListener(FireEyeEvent.FIRE_EYE_UPDATE_REWARDS, this.updateRewerds, this);
        _super.prototype.removeEvent.call(this);
    };
    FireEyeLevelInfoView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
        this.drawRewards();
    };
    FireEyeLevelInfoView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
        if (this.isInvalid(this.REWARDS))
            this.drawRewards();
    };
    FireEyeLevelInfoView.prototype.drawData = function () {
        if (this._info == null)
            return;
        var curTime = Math.ceil(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (curTime < this._info.startTime) {
            this._cd = this._info.startTime - curTime;
            Manager.render.add(this.countdown, this, 1000);
        }
        else {
            this.showGameView();
            return;
        }
        var levelCvo = FireEyeLevelCVO.getCVOByID(this._info.level);
        if (levelCvo == null)
            return;
        //头像
        var path = Manager.path.getRoleHeadPath(2, this._model.enemyInfo.career);
        this._otherHead.load(path);
        //关卡数
        this._levelTxt.text = LangCVO.getContent("fireEye1", this._info.level, FireEyeLevelCVO.maxLevel);
        this._levelNum.setValue(this._info.level, "nums_fireEye_", 24);
        this._levelNum.x = this._info.level >= 10 ? this._levelImg.x + 37 : this._levelImg.x + 52;
        //关卡时间
        this._timeTxt.text = cw.DateUtil.formatStr(this._info.levelTime, cw.DateUtil.MM_SS);
        //领先标志
        if (this._model.myGameInfo.score == this._model.enemyGameInfo.score)
            this._leadSign.visible = false;
        else {
            this._leadSign.visible = true;
            this._leadSign.x = this._model.myGameInfo.score > this._model.enemyGameInfo.score ? 131 : 571;
        }
        //双方名字积分
        this._myNameTxt.text = this._model.myInfo.name;
        this._enemyNameTxt.text = this._model.enemyInfo.name;
        this._myScoreTxt.text = LangCVO.getContent("fireEye2", this._model.myInfo.score);
        this._enemyScoreTxt.text = LangCVO.getContent("fireEye2", this._model.enemyInfo.score);
        //目标
        var len = this._info.datas ? this._info.datas.length : 0;
        var item;
        var itemCvo;
        var str;
        for (var i = 0; i < len; i++) {
            itemCvo = FireEyeItemCVO.getFirstCvoByType(this._info.datas[i].type);
            var itemName = itemCvo.name;
            if (itemName.length == 2)
                itemName += "       ";
            else if (itemName.length == 3)
                itemName += "   ";
            str = LangCVO.getContent("fireEye9", itemName, this._info.datas[i].num);
            item = Manager.pool.create(FireEyeLevelItem, str);
            item.x = 268;
            item.y = 571 + (i * 40);
            this.addChild(item);
            this._target.push(item);
        }
        //底部加分规则
        HtmlUtil.setTextFlow(this._findScoreTxt, LangCVO.getContent("fireEye3", Color.GREEN_STR_2, levelCvo.findScore));
        HtmlUtil.setTextFlow(this._timeScoreTxt, LangCVO.getContent("fireEye4", Color.GREEN_STR_2, levelCvo.timeScore));
        //双倍积分标志
        this._doubleSign.visible = this._info.level == FireEyeLevelCVO.maxLevel;
    };
    FireEyeLevelInfoView.prototype.drawRewards = function () {
        if (this._model == null)
            return;
        var myInfo = this._model.myGameInfo;
        if (this._model.fetchedRewards.indexOf(FireEyeConst.ID_LIAN_SHENG) == -1) {
            this._sevenSign.visible = false;
            this._sevenRed.visible = myInfo.winTimes >= FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_WIN_TIMES).value;
            this._sevenBtn.visible = true;
        }
        else {
            this._sevenSign.visible = true;
            this._sevenBtn.visible = this._sevenRed.visible = false;
        }
        if (this._model.fetchedRewards.indexOf(FireEyeConst.ID_WAN_SHENG) == -1) {
            this._allSign.visible = false;
            this._allRed.visible = myInfo.winTimes >= FireEyeLevelCVO.maxLevel;
            this._allBtn.visible = true;
        }
        else {
            this._allSign.visible = true;
            this._allBtn.visible = this._allRed.visible = false;
        }
    };
    FireEyeLevelInfoView.prototype.onTouchHandler = function (e) {
        if (this._model == null)
            return;
        if (Manager.model.getItems().bagSurplus < 1) {
            //背包空间不足
            FloatTips.addTips(LangCVO.getContent("fireEye20"));
            return;
        }
        var myInfo = this._model.myGameInfo;
        switch (e.currentTarget) {
            case this._sevenBtn:
                if (this._model.fetchedRewards.indexOf(FireEyeConst.ID_LIAN_SHENG) != -1)
                    return;
                var liansheng = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_WIN_TIMES).value;
                if (myInfo.winTimes < liansheng) {
                    //当前成功通关<font color='{0}'>{1}/{2}</font>关，未达到要求
                    var str = LangCVO.getContent("fireEye18", Color.RED_STR, myInfo.winTimes, liansheng);
                    FloatTips.addTips(str);
                    return;
                }
                Manager.control.getFireEye().fetchByID(FireEyeConst.ID_LIAN_SHENG);
                break;
            case this._allBtn:
                if (this._model.fetchedRewards.indexOf(FireEyeConst.ID_WAN_SHENG) != -1)
                    return;
                var wansheng = FireEyeLevelCVO.maxLevel;
                if (myInfo.winTimes < wansheng) {
                    //需要全部关卡成功通关
                    FloatTips.addTips(LangCVO.getContent("fireEye19"));
                    return;
                }
                Manager.control.getFireEye().fetchByID(FireEyeConst.ID_WAN_SHENG);
                break;
        }
    };
    FireEyeLevelInfoView.prototype.updateRewerds = function (e) {
        this.invalidate(this.REWARDS);
    };
    FireEyeLevelInfoView.prototype.countdown = function () {
        this._cd--;
        if (this._cd <= 0) {
            Manager.render.remove(this.countdown, this);
            this.showGameView();
        }
        else {
            this._cdNum.setValue(this._cd, "nums_fireEye_", 25);
            this._cdNum.x = this._cd >= 10 ? this._cdLabel.x - 55 : this._cdLabel.x - 30;
        }
    };
    FireEyeLevelInfoView.prototype.showGameView = function () {
        Manager.link.link(LinkType.PANEL_FIRE_EYE, 2);
    };
    FireEyeLevelInfoView.prototype.dispose = function () {
        Manager.render.remove(this.countdown, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._levelTxt, this._timeTxt, this._myNameTxt, this._enemyNameTxt, this._myScoreTxt, this._enemyScoreTxt, this._leadSign, this._doubleSign, this._levelImg, this._cdLabel, this._findScoreTxt, this._timeScoreTxt, this._sevenBtn, this._allBtn, this._sevenSign, this._allSign, this._myHead, this._otherHead, this._figure, this._levelNum, this._cdNum, this._sevenRed, this._allRed);
        this._levelTxt.dispose();
        this._levelTxt = null;
        this._timeTxt.dispose();
        this._timeTxt = null;
        this._myNameTxt.dispose();
        this._myNameTxt = null;
        this._enemyNameTxt.dispose();
        this._enemyNameTxt = null;
        this._myScoreTxt.dispose();
        this._myScoreTxt = null;
        this._enemyScoreTxt.dispose();
        this._enemyScoreTxt = null;
        this._leadSign = null;
        this._doubleSign = null;
        this._levelImg = null;
        this._cdLabel = null;
        this._findScoreTxt.dispose();
        this._findScoreTxt = null;
        this._timeScoreTxt.dispose();
        this._timeScoreTxt = null;
        this._sevenBtn.dispose();
        this._sevenBtn = null;
        this._allBtn.dispose();
        this._allBtn = null;
        this._sevenSign = null;
        this._allSign = null;
        this._sevenRed = null;
        this._allRed = null;
        if (this._myHead)
            Manager.pool.push(this._myHead);
        this._myHead = null;
        if (this._otherHead)
            Manager.pool.push(this._otherHead);
        this._otherHead = null;
        if (this._figure)
            Manager.pool.push(this._figure);
        this._figure = null;
        if (this._levelNum)
            Manager.pool.push(this._levelNum);
        this._levelNum = null;
        if (this._cdNum)
            Manager.pool.push(this._cdNum);
        this._cdNum = null;
        this._model = null;
        this._info = null;
        var len = this._target ? this._target.length : 0;
        for (var i = 0; i < len; i++) {
            if (this._target[i] != null)
                Manager.pool.push(this._target[i]);
            this._target[i] = null;
        }
        this._target = null;
    };
    return FireEyeLevelInfoView;
}(UIComponent));
//# sourceMappingURL=FireEyeLevelInfoView.js.map