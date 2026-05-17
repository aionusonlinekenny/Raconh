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
 * 传功
 * Simon
 * 2018.1.10
 */
var ChuangongView = /** @class */ (function (_super) {
    __extends(ChuangongView, _super);
    function ChuangongView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.start();
        _this.addEvent();
        return _this;
    }
    ChuangongView.prototype.start = function () {
        _super.prototype.start.call(this);
        this.width = 333;
        this.height = 150;
        this._model = Manager.model.getTraining();
        this._item = new ChuangongItem();
        this._item.y = 900;
        this._beiList = [];
        for (var i = 0; i < 3; i++) {
            var bei = new ChuangongBeiItem();
            bei.x = 111 * i;
            this.addChild(bei);
            bei.beiImg.source = "cg_beiImg" + (i + 1) + "_png";
            this._beiList.push(bei);
        }
        this._time = TextField.create(63, 24);
        this._time.move(135, 118);
        this._time.textColor = Color.GREEN;
        this._time.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._time.textAlign = egret.HorizontalAlign.LEFT;
        this._time.fontFamily = "Microsoft YaHei";
        this._time.size = 24;
        this._time.text = "00:00";
        this.onResizeHandler();
    };
    ChuangongView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.initData();
    };
    ChuangongView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("onTypeUpdateHandler"))
            this.onTypeUpdateHandler();
        if (this.isInvalid("onDataUpdateHandler"))
            this.onDataUpdateHandler();
    };
    ChuangongView.prototype.initData = function () {
        this._updateExpTime = 0;
        this.onDataUpdateHandler();
        this._model.trainingHandler();
    };
    ChuangongView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        for (var i = 0; i < this._beiList.length; i++)
            this._beiList[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBeiItemHandler, this);
        this._model.addEventListener(TrainingEvent.TYPE_UPDATE, this.onTypeUpdate, this);
        this._model.addEventListener(TrainingEvent.DATA_UPDATE, this.onDataUpdate, this);
        Manager.model.getTraining().addEventListener(TrainingEvent.EXP_UPDATE, this.onExpUpdateHandler, this);
    };
    ChuangongView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        for (var i = 0; i < this._beiList.length; i++)
            this._beiList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBeiItemHandler, this);
        this._model.removeEventListener(TrainingEvent.TYPE_UPDATE, this.onTypeUpdate, this);
        this._model.removeEventListener(TrainingEvent.DATA_UPDATE, this.onDataUpdate, this);
        Manager.model.getTraining().removeEventListener(TrainingEvent.EXP_UPDATE, this.onExpUpdateHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ChuangongView.prototype.onResizeHandler = function (e) {
        this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
    };
    ChuangongView.prototype.onClickBeiItemHandler = function (e) {
        if (this._item.parent)
            return;
        var index = this._beiList.indexOf(e.currentTarget);
        if (index == -1)
            return;
        Manager.view.show(82 /* ChuangongAwardView */, index + 1);
    };
    ChuangongView.prototype.onTypeUpdate = function (e) {
        this.invalidate("onTypeUpdateHandler");
    };
    ChuangongView.prototype.onTypeUpdateHandler = function () {
        if (!this._item.parent)
            Manager.layer.uiImageLayer.addChild(this._item);
        for (var i = 0; i < this._beiList.length; i++) {
            if (i != 1)
                this._beiList[i].visible = false;
            else {
                this._beiList[i].visible = true;
                this._selectItem = this._beiList[i];
            }
        }
        if (this._selectItem) {
            this._selectItem.beiImg.source = "cg_beiImg" + this._model.trainingType + "_png";
            this._selectItem.startCountdown(this._model.trainingEndTime);
        }
        var info = TrainingCVO.getInfo(this._model.trainingType);
        var expInfo = TrainingCVO.getExpInfo(Manager.model.self.attrInfo.level);
        if (info && expInfo) {
            this._item.setValue(info.expRatio / 1000 * 100);
            var color = void 0;
            if (this._model.trainingType == 1)
                color = Color.BLUE;
            else if (this._model.trainingType == 2)
                color = Color.PURPLE;
            else if (this._model.trainingType == 3)
                color = Color.ORANGE;
            // this._item.beiName.text = LangCVO.getContent("training4", info.expRatio / 1000);
            // this._item.beiName.textColor = color;
            HtmlUtil.setTextFlow(this._item.value, LangCVO.getContent("training5", Color.WHITE_STR, expInfo.exp * info.expRatio / 1000));
        }
        Manager.model.getTraining().needInitUpdateView = false;
    };
    ChuangongView.prototype.onDataUpdate = function (e) {
        this.invalidate("onDataUpdateHandler");
    };
    ChuangongView.prototype.onDataUpdateHandler = function () {
        if (this._model.trainingType == 0) {
            if (this._item.parent)
                this._item.parent.removeChild(this._item);
            if (this._time.parent)
                this._time.parent.removeChild(this._time);
            for (var i = 0; i < this._beiList.length; i++) {
                this._beiList[i].visible = !Manager.model.getTraining().info.isPlayed;
                this._beiList[i].beiImg.source = "cg_beiImg" + (i + 1) + "_png";
            }
            if (this._selectItem)
                this._selectItem.resetCountdown();
        }
    };
    ChuangongView.prototype.onExpUpdateHandler = function (e) {
        this.timeUpdate(e.params);
        if (egret.getTimer() - this._updateExpTime < 10000)
            return;
        this._updateExpTime = egret.getTimer();
        var time = e.params;
        var info = TrainingCVO.getInfo(this._model.trainingType);
        var expInfo = TrainingCVO.getExpInfo(Manager.model.self.attrInfo.level);
        if (info && expInfo) {
            this._item.value2.text = StringUtils.getBigNum(time * expInfo.exp * info.expRatio / 1000);
        }
    };
    ChuangongView.prototype.timeUpdate = function (value) {
        if (this._item.parent) {
            if (!this._time.parent)
                this.addChild(this._time);
        }
        else {
            if (this._time.parent)
                this.removeChild(this._time);
        }
        this._time.text = cw.DateUtil.formatStr(360 - value, cw.DateUtil.MM_SS);
    };
    ChuangongView.prototype.show = function () {
        this.y = 888;
        Manager.layer.uiImageLayer.addChildAt(this, 0);
    };
    ChuangongView.prototype.hide = function () {
        this.dispose();
    };
    ChuangongView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._item)
            this._item.dispose();
        this._item = null;
        if (this._beiList) {
            for (var i = 0; i < this._beiList.length; i++) {
                this._beiList[i].dispose();
                this._beiList[i] = null;
            }
            this._beiList = null;
        }
        if (this._time)
            Manager.pool.push(this._time);
        this._time = null;
        this._model = null;
        if (this._selectItem)
            this._selectItem.dispose();
        this._selectItem = null;
    };
    return ChuangongView;
}(RenderSprite));
//# sourceMappingURL=ChuangongView.js.map