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
 * boss血条
 * liangyan
 * create 2017-12-06
 * @update devil 2018-04-19
*/
var BossBloodStrip2 = (function (_super) {
    __extends(BossBloodStrip2, _super);
    function BossBloodStrip2() {
        var _this = _super.call(this) || this;
        var layer = Manager.layer;
        _this._imageLayer = ObjectUtil.createConainer();
        layer.homeImageLayer.addChild(_this._imageLayer);
        _this._layer = ObjectUtil.createConainer();
        layer.homeLayer.addChild(_this._layer);
        return _this;
    }
    BossBloodStrip2.prototype.setVisible = function (visible) {
        if (visible) {
            if (!this._imageLayer.parent) {
                var layer = Manager.layer;
                layer.homeLayer.addChild(this._layer);
                layer.homeImageLayer.addChild(this._imageLayer);
            }
        }
        else {
            if (this._imageLayer.parent) {
                this._imageLayer.parent.removeChild(this._imageLayer);
                this._layer.parent.removeChild(this._layer);
            }
        }
    };
    BossBloodStrip2.prototype.start = function () {
        _super.prototype.start.call(this);
        this._back = BitmapRes.create("boss_blood_bg_png");
        this._imageLayer.addChild(this._back);
        this._blood = new BaseBossBlood2(this._imageLayer, this._layer, this._info);
        this._blood.move(116, 45);
        this._back1 = BitmapRes.create("boss_blood_figure_png", 104, 34, 435);
        this._back1.scale9Grid = new egret.Rectangle(35, 19, 11, 10);
        this._imageLayer.addChild(this._back1);
        this._nameTxt = TextField.create(400, 25, 0xfffbeb, 22);
        this._nameTxt.move(114, 13);
        HtmlUtil.setTextFlow(this._nameTxt, this._info.cvo.nameHtml + " Lv：" + this._info.level);
        this._layer.addChild(this._nameTxt);
        this._bossHead = Manager.pool.create(BitmapRemote, Manager.path.getBossHeadPath(this._info.cvo.url));
        this._bossHead.x = 9;
        this._bossHead.y = -15;
        this._layer.addChild(this._bossHead);
    };
    BossBloodStrip2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    BossBloodStrip2.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    BossBloodStrip2.prototype.show = function (info) {
        this._info = info;
        this.start();
        this.addEvent();
        this.layout();
    };
    BossBloodStrip2.prototype.onResizeHandler = function (e) {
        this.layout();
    };
    BossBloodStrip2.prototype.layout = function () {
        this._imageLayer.x = Math.round(Manager.global.gameMain.stage.stageWidth - 539) / 2;
        this._imageLayer.y = 170;
        this._layer.x = this._imageLayer.x;
        this._layer.y = this._imageLayer.y;
    };
    BossBloodStrip2.prototype.hide = function () {
        this.dispose();
    };
    BossBloodStrip2.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawBlood"))
            this.drawBlood();
    };
    BossBloodStrip2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawBlood();
    };
    BossBloodStrip2.prototype.updateBlood = function () {
        this.invalidate("drawBlood");
    };
    BossBloodStrip2.prototype.drawBlood = function () {
        this._blood.updateBlood();
    };
    BossBloodStrip2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeEvent();
        this.removeHurtRankView();
        this._back.pool();
        this._back = null;
        this._back1.pool();
        this._back1 = null;
        this._nameTxt.pool();
        this._nameTxt = null;
        this._bossHead.pool();
        this._bossHead = null;
        this._blood.dispose();
        this._blood = null;
        this._info = null;
        if (this._imageLayer.parent)
            this._imageLayer.parent.removeChild(this._imageLayer);
        this._imageLayer = null;
        if (this._layer.parent)
            this._layer.parent.removeChild(this._layer);
        this._layer = null;
    };
    BossBloodStrip2.prototype.addHurtRankView = function (list, type) {
        if (this._hurtRankView == null) {
            this._hurtRankView = new BossRankView(type);
            this._hurtRankView.x = 115;
            this._hurtRankView.y = 75;
            this._imageLayer.addChild(this._hurtRankView);
        }
        this._hurtRankView.updateList(list);
    };
    BossBloodStrip2.prototype.removeHurtRankView = function () {
        if (this._hurtRankView) {
            this._hurtRankView.dispose();
            this._hurtRankView = null;
        }
    };
    return BossBloodStrip2;
}(BaseRender));
__reflect(BossBloodStrip2.prototype, "BossBloodStrip2", ["IViewManager"]);
//# sourceMappingURL=BossBloodStrip2.js.map