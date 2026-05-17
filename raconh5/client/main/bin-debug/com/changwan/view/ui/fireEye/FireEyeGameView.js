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
 * 火眼金睛游戏界面
 * liangyan
 * create 2018-03-28
*/
var FireEyeGameView = (function (_super) {
    __extends(FireEyeGameView, _super);
    function FireEyeGameView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("fireEye", "FireEyeGameViewSkin");
        return _this;
    }
    FireEyeGameView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (this._scroll == null) {
            this._scroll = new egret.ScrollView();
            this._scroll.horizontalScrollPolicy = "off";
            this._scroll.width = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_CANVAS_WIDTH).value;
            this._scroll.height = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_SEE_HEIGHT).value;
            this._scroll.x = 10;
            this._scroll.y = 197;
            this._scroll.scrollSpeed = 0.01;
            this._scroll.bounces = false;
            this.addChild(this._scroll);
        }
        if (this._canvas == null)
            this._canvas = Manager.pool.create(FireEyeCanvas);
        this._canvas.touchChildren = true;
        this._scroll.setContent(this._canvas);
    };
    FireEyeGameView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getFireEye().addEventListener(FireEyeEvent.FIRE_EYE_PLAYER_DATA, this.onFireEyeHandler, this);
    };
    FireEyeGameView.prototype.removeEvent = function () {
        Manager.model.getFireEye().removeEventListener(FireEyeEvent.FIRE_EYE_PLAYER_DATA, this.onFireEyeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    FireEyeGameView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    FireEyeGameView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    FireEyeGameView.prototype.drawData = function () {
        if (Manager.control.getFireEye().banView != null)
            Manager.view.getView(136 /* FireEyePanel */).addChild(Manager.control.getFireEye().banView);
        if (Manager.control.getFireEye().finishView != null)
            Manager.view.getView(136 /* FireEyePanel */).addChild(Manager.control.getFireEye().finishView);
        this._levelInfo = Manager.model.getFireEye().nextInfo;
        //关卡数
        this._levelTxt.text = LangCVO.getContent("fireEye1", this._levelInfo.level, FireEyeLevelCVO.maxLevel);
        //关卡时间
        var curTime = Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        this._cd = Math.round(this._levelInfo.startTime + this._levelInfo.levelTime - curTime);
        this._timeTxt.text = cw.DateUtil.formatStr(this._cd, cw.DateUtil.MM_SS);
        Manager.render.add(this.countdown, this, 1000);
        //双方进度
        this.onFireEyeHandler(null);
    };
    FireEyeGameView.prototype.countdown = function () {
        this._cd--;
        if (this._cd <= 0) {
            Manager.render.remove(this.countdown, this);
        }
        else if (this._cd <= 10) {
            this._timeTxt.textColor = Color.RED;
            if (this._redBorder == null) {
                var path = Manager.path.getFireEyePath("red_back");
                this._redBorder = Manager.pool.create(BitmapRemote, path);
                this._redBorder.x = this._scroll.x + 25;
                this._redBorder.y = this._scroll.y - 3;
                this._redBorder.touchEnabled = false;
                this.addChildAt(this._redBorder, this.getChildIndex(this._scroll) + 1);
                Manager.render.add(this.shine, this, 600);
            }
        }
        this._timeTxt.text = cw.DateUtil.formatStr(this._cd, cw.DateUtil.MM_SS);
    };
    FireEyeGameView.prototype.shine = function () {
        var isShow = this._redBorder.visible;
        this._redBorder.visible = !isShow;
    };
    FireEyeGameView.prototype.onFireEyeHandler = function (e) {
        var myInfo = Manager.model.getFireEye().myGameInfo;
        var enemyInfo = Manager.model.getFireEye().enemyGameInfo;
        var rateStr = LangCVO.getContent("fireEye13", myInfo.rate) + "  " + LangCVO.getContent("fireEye14", enemyInfo.rate);
        HtmlUtil.setTextFlow(this._rateTxt, rateStr);
        if (this._levelInfo == null)
            return;
        var len = this._levelInfo.datas ? this._levelInfo.datas.length : 0;
        var targetLen = myInfo.targets ? myInfo.targets.length : 0;
        var itemCvo;
        var curNum;
        var sumNum;
        var color;
        var str = "";
        for (var i = 0; i < len; i++) {
            itemCvo = FireEyeItemCVO.getFirstCvoByType(this._levelInfo.datas[i].type);
            curNum = 0;
            if (targetLen > 0) {
                for (var j = 0; j < targetLen; j++) {
                    if (myInfo.targets[j].type == itemCvo.type)
                        curNum = myInfo.targets[j].num;
                }
            }
            sumNum = this._levelInfo.datas[i].num;
            color = curNum < sumNum ? Color.RED_STR : Color.GREEN_STR_2;
            str += LangCVO.getContent("fireEye10", itemCvo.name, color, curNum, sumNum);
            if (i != len - 1)
                str += "     ";
        }
        HtmlUtil.setTextFlow(this._itemTxt, str);
    };
    FireEyeGameView.prototype.drawStatus = function (id, newData) {
        if (this._canvas == null)
            return;
        this._canvas.drawStatus(id, newData);
    };
    FireEyeGameView.prototype.dispose = function () {
        Manager.render.remove(this.countdown, this);
        Manager.render.remove(this.shine, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._levelTxt, this._timeTxt, this._rateTxt, this._itemTxt, this._scroll);
        this._levelTxt.dispose();
        this._levelTxt = null;
        this._timeTxt.dispose();
        this._timeTxt = null;
        this._rateTxt.dispose();
        this._rateTxt = null;
        this._itemTxt.dispose();
        this._itemTxt = null;
        if (this._scroll) {
            this._scroll.removeContent();
            this.removeChild(this._scroll);
        }
        this._scroll = null;
        if (this._canvas)
            Manager.pool.push(this._canvas);
        this._canvas = null;
        if (this._redBorder)
            Manager.pool.push(this._redBorder);
        this._redBorder = null;
    };
    return FireEyeGameView;
}(UIComponent));
__reflect(FireEyeGameView.prototype, "FireEyeGameView");
//# sourceMappingURL=FireEyeGameView.js.map