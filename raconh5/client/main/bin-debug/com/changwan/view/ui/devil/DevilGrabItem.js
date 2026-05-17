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
 * 魔神降临抢夺列表子项
 * liangyan
 * create 2018-04-10
*/
var DevilGrabItem = (function (_super) {
    __extends(DevilGrabItem, _super);
    function DevilGrabItem() {
        return _super.call(this) || this;
    }
    DevilGrabItem.prototype.start = function () {
        _super.prototype.start.call(this);
        this._headBg = BitmapRes.create("common_cb_rect_png", 6, 0, 112, 112);
        this.addChild(this._headBg);
        this._scoreBg = BitmapRes.create("common_back2_png", 0, 112, 123, 38);
        this.addChild(this._scoreBg);
        this._head = Manager.pool.create(BitmapRemote);
        this._head.x = 15;
        this._head.y = 15;
        this.addChildAt(this._head, 1);
        this._winTimesImg = BitmapRes.create("suit_qizi_png");
        this.addChild(this._winTimesImg);
        this._fightTxt = TextField.create(123, 20, 0xfffbeb, 20, egret.HorizontalAlign.CENTER, egret.VerticalAlign.MIDDLE);
        this._fightTxt.move(0, 80);
        this.addChild(this._fightTxt);
        this._scoreTxt = TextField.create(123, 38, 0xfffbeb, 20, egret.HorizontalAlign.CENTER, egret.VerticalAlign.MIDDLE);
        this._scoreTxt.move(0, 112);
        this.addChild(this._scoreTxt);
        this._winTimesTxt = TextField.create(24, 51, 0xfffbeb, 20, egret.HorizontalAlign.CENTER, egret.VerticalAlign.MIDDLE);
        this._winTimesTxt.wordWrap = true;
        this._winTimesTxt.move(5, -8);
        this.addChild(this._winTimesTxt);
    };
    DevilGrabItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    DevilGrabItem.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    DevilGrabItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    DevilGrabItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    DevilGrabItem.prototype.drawData = function () {
        if (this._info == null)
            return;
        this._head.load(Manager.path.getRoleHeadPath(1, this._info.career, 0));
        // let fight = this.setWordsFormat(this._info.fight);
        var score = this.setWordsFormat(this._info.score);
        // this._fightTxt.text = LangCVO.getContent("devil4", fight);
        this._fightTxt.text = this._info.name;
        this._scoreTxt.text = LangCVO.getContent("devil5", score);
        if (this._info.winTimes > 0) {
            this._winTimesImg.visible = this._winTimesTxt.visible = true;
            this._winTimesTxt.text = LangCVO.getContent("devil14", this._info.winTimes); //{0}胜
        }
        else
            this._winTimesImg.visible = this._winTimesTxt.visible = false;
    };
    DevilGrabItem.prototype.setWordsFormat = function (num) {
        if (num < 10000)
            return "" + num;
        if (num >= 100000000)
            return (num / 100000000).toFixed(num % 100000000 == 0 ? 0 : 1) + "亿";
        return (num / 10000).toFixed(num % 10000 == 0 ? 0 : 1) + "万";
    };
    DevilGrabItem.prototype.onTouchHandler = function (e) {
        if (this._info == null)
            return;
        var now = Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        var differ = Math.round(Manager.model.getDevil().canGrabTime - now);
        if (differ > 0) {
            //{0}秒后可发起抢夺
            FloatTips.addTips(LangCVO.getContent("devil11", differ), Color.RED);
            return;
        }
        else if (!Manager.model.self.getAliveFlag())
            FloatTips.addTips(LangCVO.getContent("devil19"), Color.RED); //角色已死亡，无法抢夺
        else
            Manager.control.getDevil().challenge(this._info.id);
    };
    DevilGrabItem.prototype.clear = function () {
        if (this._headBg)
            Manager.pool.push(this._headBg);
        this._headBg = null;
        if (this._scoreBg)
            Manager.pool.push(this._scoreBg);
        this._scoreBg = null;
        if (this._head)
            Manager.pool.push(this._head);
        this._head = null;
        if (this._winTimesImg)
            Manager.pool.push(this._winTimesImg);
        this._winTimesImg = null;
        if (this._fightTxt)
            Manager.pool.push(this._fightTxt);
        this._fightTxt = null;
        if (this._scoreTxt)
            Manager.pool.push(this._scoreTxt);
        this._scoreTxt = null;
        if (this._winTimesTxt)
            Manager.pool.push(this._winTimesTxt);
        this._winTimesTxt = null;
        this._info = null;
    };
    Object.defineProperty(DevilGrabItem.prototype, "info", {
        set: function (info) {
            if (this._info == info)
                return;
            this._info = info;
            this.drawData();
        },
        enumerable: true,
        configurable: true
    });
    DevilGrabItem.prototype.reuse = function () {
        this.touchEnabled = true;
        _super.prototype.reuse.call(this);
    };
    DevilGrabItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    DevilGrabItem.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        this.clear();
    };
    return DevilGrabItem;
}(RenderSprite));
__reflect(DevilGrabItem.prototype, "DevilGrabItem");
//# sourceMappingURL=DevilGrabItem.js.map