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
 * 火眼金睛单关结算视图
 * liangyan
 * create 2018-03-22
*/
var FireEyeLevelResultView = /** @class */ (function (_super) {
    __extends(FireEyeLevelResultView, _super);
    function FireEyeLevelResultView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("fireEye", "FireEyeLevelResultViewSkin");
        return _this;
    }
    FireEyeLevelResultView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._back) {
            this._back = Manager.pool.create(BitmapRemote);
            this._back.x = 124;
            this._back.y = 348;
            this.addChildAt(this._back, 0);
        }
    };
    FireEyeLevelResultView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    FireEyeLevelResultView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    FireEyeLevelResultView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.onResizeHandler(null);
    };
    FireEyeLevelResultView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    FireEyeLevelResultView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    FireEyeLevelResultView.prototype.drawData = function () {
        if (!this._info)
            return;
        this._back.source = this._info.selfWin ? "fireEye_back_win_png" : "fireEye_back_fail_png";
        var goodsLen = this._info.gainGoods ? this._info.gainGoods.length : 0;
        var expNum;
        var coinNum;
        for (var i = 0; i < goodsLen; i++) {
            if (this._info.gainGoods[i].base_id == ItemsConst.COIN)
                coinNum = this._info.gainGoods[i].quantity;
            else if (this._info.gainGoods[i].base_id == ItemsConst.EXP)
                expNum = this._info.gainGoods[i].quantity;
        }
        var str = StringUtils.setParam(LangCVO.getContent("fireEye6"), Color.GREEN_STR, this._info.findCount, Color.GREEN_STR, this._info.findScore, Color.GREEN_STR, this._info.leftTime, Color.GREEN_STR, this._info.timeScore, "#FD7100", expNum, "#FD7100", coinNum);
        HtmlUtil.setTextFlow(this._levelInfo, str);
        var leadStr = LangCVO.getContent("fireEye21"); //（领先）
        this._otherName.text = this._info.enemyName;
        this._otherScore.text = this._info.enemyScore + (this._info.isSelfLead ? "" : leadStr);
        this._otherTime.text = cw.DateUtil.formatStr(this._info.enemyTime, cw.DateUtil.MM_SS);
        this._myScore.text = this._info.selfScore + (this._info.isSelfLead ? leadStr : "");
        this._myTime.text = cw.DateUtil.formatStr(this._info.selfTime, cw.DateUtil.MM_SS);
        Manager.render.add(this.countDown, this, 1000);
    };
    FireEyeLevelResultView.prototype.countDown = function () {
        this._life--;
        //{0}秒后进入下一关
        HtmlUtil.setTextFlow(this._countDown, StringUtils.setParam(LangCVO.getContent("fireEye7"), this._life));
        if (this._life == 0) {
            Manager.view.hide(135 /* FireEyeLevelResultView */);
            // Manager.control.getFireEye().askEnemyData();
            Manager.link.link(LinkType.PANEL_FIRE_EYE, 1);
        }
    };
    FireEyeLevelResultView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        this.y = Math.round(Manager.global.gameMain.stage.stageHeight - this.height) / 2;
    };
    FireEyeLevelResultView.prototype.show = function (info) {
        if (!info) {
            Manager.view.hide(135 /* FireEyeLevelResultView */);
            return;
        }
        this._info = info;
        this._life = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_LEVEL_COUNTDOWN).value;
        HtmlUtil.setTextFlow(this._countDown, StringUtils.setParam(LangCVO.getContent("fireEye7"), this._life));
        if (!this.parent)
            Manager.layer.tipsLayer.addChild(this);
    };
    FireEyeLevelResultView.prototype.hide = function () {
        if (this.parent)
            this.dispose();
    };
    FireEyeLevelResultView.prototype.dispose = function () {
        if (Manager.render.contains(this.countDown, this))
            Manager.render.remove(this.countDown, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._back, this._levelInfo, this._myName, this._otherName, this._myScore, this._otherScore, this._myTime, this._otherTime, this._countDown);
        this._back = null;
        this._levelInfo.dispose();
        this._levelInfo = null;
        this._myName.dispose();
        this._myName = null;
        this._otherName.dispose();
        this._otherName = null;
        this._myScore.dispose();
        this._myScore = null;
        this._otherScore.dispose();
        this._otherScore = null;
        this._myTime.dispose();
        this._myTime = null;
        this._otherTime.dispose();
        this._otherTime = null;
        this._countDown.dispose();
        this._countDown = null;
        this._info = null;
    };
    return FireEyeLevelResultView;
}(UIComponent));
//# sourceMappingURL=FireEyeLevelResultView.js.map