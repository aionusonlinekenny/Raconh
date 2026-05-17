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
 * 魔神降临摇骰视图
 * liangyan
 * create 2018-04-17
*/
var DevilRollDiceView = /** @class */ (function (_super) {
    __extends(DevilRollDiceView, _super);
    function DevilRollDiceView() {
        var _this = _super.call(this) || this;
        _this.DICE_SUM = 11;
        _this.pointArr = [[177, 373], [344, 373], [269, 407], [414, 334], [137, 350], [254, 330], [201, 394], [316, 293], [382, 370], [291, 407], [393, 255]];
        _this.touchChildren = true;
        _this.start();
        _this.addEvent();
        return _this;
    }
    DevilRollDiceView.prototype.start = function () {
        _super.prototype.start.call(this);
        var path = Manager.path.getDevilPath("roll_back");
        this._back = Manager.pool.create(BitmapRemote, path);
        this.addChild(this._back);
        this._dices = [];
        var dice;
        for (var i = 0; i < this.DICE_SUM; i++) {
            dice = new DevilDiceItem(Math.round(100 * Math.random()));
            dice.setMoving();
            this.addChild(dice);
            this._dices.push(dice);
        }
        path = Manager.path.getDevilPath("roll_glass");
        this._glass = Manager.pool.create(BitmapRemote, path);
        this._glass.x = 102;
        this._glass.y = 54;
        this.addChild(this._glass);
        this._maxTxt = TextField.create(252, 32, 0xFFF7E6, 24, egret.HorizontalAlign.CENTER, egret.VerticalAlign.MIDDLE);
        this._maxTxt.x = 200;
        this._maxTxt.y = 680;
        this.addChild(this._maxTxt);
        this._btn = new Button();
        this._btn.skinName = '<?xml version="1.0" encoding="utf-8"?>'
            + '<e:Skin class="Button1Skin" xmlns:e="http://ns.egret.com/eui" states="up,down,disabled" xmlns:ns1="*">'
            + '<e:Image width="100%" height="100%" source="common_btn1_1_png" source.down="common_btn1_2_png"/>'
            + '<e:Image source="devil_roll_title_png" x="0" y="27"/>'
            + '<e:Label id="labelDisplay" horizontalCenter="0" verticalCenter="0"/>'
            + '</e:Skin>';
        this._btn.setSize(238, 105);
        this._btn.move(200, 700);
        this.addChild(this._btn);
        this._cdTxt = TextField.create(80, 32, 0xFFF7E6, 24, egret.HorizontalAlign.CENTER, egret.VerticalAlign.MIDDLE);
        this._cdTxt.x = 325;
        this._cdTxt.y = 735;
        this.addChild(this._cdTxt);
    };
    DevilRollDiceView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getDevil().addEventListener(DevilEvent.DEVIL_ROLL_MAX_UPDATE, this.onDevilHandler, this);
    };
    DevilRollDiceView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getDevil().removeEventListener(DevilEvent.DEVIL_ROLL_MAX_UPDATE, this.onDevilHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    DevilRollDiceView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - 606) / 2;
        this.y = Math.round(Manager.global.gameMain.stage.stageHeight - 788) / 2;
    };
    DevilRollDiceView.prototype.onTouchHandler = function (e) {
        var dice;
        for (var i = 0; i < this.DICE_SUM; i++) {
            dice = this._dices[i];
            dice.stop(this.pointArr[i][0], this.pointArr[i][1]);
        }
        Manager.control.getDevil().rollDice();
    };
    DevilRollDiceView.prototype.onDevilHandler = function (e) {
        if (e == null)
            return;
        this._cd = Number(e.params);
        this._cdTxt.text = LangCVO.getContent("devil18", this._cd); //（{0}）
        Manager.render.add(this.countDown, this, 1000);
    };
    DevilRollDiceView.prototype.countDown = function () {
        if (this._cd <= 0) {
            Manager.render.remove(this.countDown, this);
            Manager.view.hide(153 /* DevilRollDiceView */);
        }
        else
            this._cdTxt.text = LangCVO.getContent("devil18", this._cd); //（{0}）
        this._cd--;
    };
    DevilRollDiceView.prototype.updateMax = function (name, value) {
        //{0}  摇出<font color='{1}'>{2}</font>点
        HtmlUtil.setTextFlow(this._maxTxt, LangCVO.getContent("devil17", name, Color.GREEN_STR_2, value));
    };
    DevilRollDiceView.prototype.updateMyDice = function (value) {
        egret.Tween.removeTweens(this);
        if (this._myDice)
            this._myDice.dispose();
        this._myDice = null;
        this._myDice = new DevilDiceItem(value);
        this._myDice.x = 330;
        this._myDice.y = 585;
        this._myDice.alpha = 0;
        this._myDice.anchorOffsetX = this._myDice.width / 2;
        this._myDice.anchorOffsetY = this._myDice.height / 2;
        this._myDice.scaleX = this._myDice.scaleY = 0.5;
        this.addChild(this._myDice);
        egret.Tween.get(this._myDice, { loop: false }).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 1500);
    };
    DevilRollDiceView.prototype.show = function () {
        if (this.parent == null) {
            this.onResizeHandler(null);
            Manager.layer.tipsLayer.addChild(this);
        }
    };
    DevilRollDiceView.prototype.hide = function () {
        if (this.parent != null)
            this.disposeSelf();
    };
    DevilRollDiceView.prototype.disposeSelf = function () {
        Manager.render.remove(this.countDown, this);
        egret.Tween.removeTweens(this);
        _super.prototype.disposeSelf.call(this);
        if (this._back)
            Manager.pool.push(this._back);
        this._back = null;
        if (this._glass)
            Manager.pool.push(this._glass);
        this._glass = null;
        if (this._maxTxt)
            Manager.pool.push(this._maxTxt);
        this._maxTxt = null;
        if (this._btn)
            this._btn.dispose();
        this._btn = null;
        if (this._cdTxt)
            Manager.pool.push(this._cdTxt);
        this._cdTxt = null;
        if (this._myDice) {
            ObjectUtil.remove(this._myDice);
            this._myDice.dispose();
        }
        this._myDice = null;
        for (var i = 0; i < this.DICE_SUM; i++) {
            ObjectUtil.remove(this._dices[i]);
            this._dices[i].dispose();
            this._dices[i] = null;
        }
        this._dices.length = 0;
    };
    return DevilRollDiceView;
}(RenderSprite));
//# sourceMappingURL=DevilRollDiceView.js.map