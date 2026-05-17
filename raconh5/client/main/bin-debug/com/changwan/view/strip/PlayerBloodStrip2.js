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
 * 玩家血条
 * liangyan
 * create 2017-12-06
 * @update devil 2018-04-21
*/
var PlayerBloodStrip2 = (function (_super) {
    __extends(PlayerBloodStrip2, _super);
    function PlayerBloodStrip2() {
        var _this = _super.call(this) || this;
        var layer = Manager.layer;
        _this._homeImageLayer = ObjectUtil.createConainer();
        layer.homeImageLayer.addChild(_this._homeImageLayer);
        _this._homeLayer = ObjectUtil.createConainer();
        layer.homeLayer.addChild(_this._homeLayer);
        _this.start();
        _this.addEvent();
        return _this;
    }
    PlayerBloodStrip2.prototype.start = function () {
        _super.prototype.start.call(this);
        this._back = BitmapRes.create("arenaPkHeadHpBack_png", 107, 8);
        this._homeImageLayer.addChild(this._back);
        this._strip = BitmapRes.create("strip_red2_png", 111, 70, 164, 18);
        this._homeImageLayer.addChild(this._strip);
        this._back1 = BitmapRes.create("arenaPkHeadBack_png", 0, 3);
        this._homeImageLayer.addChild(this._back1);
        this._back2 = BitmapRes.create("arenaPkHeadHpPic_png", 263, 62);
        this._homeImageLayer.addChild(this._back2);
        this._imageHead = Manager.pool.create(BitmapRemote);
        this._imageHead.width = 100;
        this._imageHead.height = 100;
        this._imageHead.x = 10;
        this._imageHead.y = 12;
        this._homeLayer.addChild(this._imageHead);
        this._fightLable = BitmapRes.create("common_zhanli3_png", 98, 0);
        this._homeImageLayer.addChild(this._fightLable);
        this._txtName = TextField.create(142, 25, 0xffffff, 22, "left");
        this._txtName.move(124, 39);
        this._homeLayer.addChild(this._txtName);
        this._fightNum = Manager.pool.create(NumImgView2);
        this._fightNum.x = this._fightLable.x + 25;
        this._fightNum.y = this._fightLable.y + 2;
        this._fightNum.scaleX = this._fightNum.scaleY = 0.8;
        this._homeLayer.addChild(this._fightNum);
    };
    PlayerBloodStrip2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    PlayerBloodStrip2.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        if (this._info)
            this._info.removeEventListener(GameObjectAttrEvent.HP, this.__updateBlood, this);
    };
    PlayerBloodStrip2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
        this.drawBlood();
        this.layout(Manager.config.gameWidth, Manager.config.gameHeight);
    };
    PlayerBloodStrip2.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
        if (this.isInvalid("drawBlood"))
            this.drawBlood();
    };
    PlayerBloodStrip2.prototype.drawData = function () {
        this._txtName.text = this._info.attrInfo.nickName;
        this._imageHead.load(Manager.path.getRoleHeadPath(2, this._info.attrInfo.career));
        this._fightNum.setValue(this._info.attrInfo.fight, "nums_fighting_", 20);
        this._info.addEventListener(GameObjectAttrEvent.HP, this.__updateBlood, this);
    };
    PlayerBloodStrip2.prototype.drawBlood = function () {
        this._strip.width = (this._info.attrInfo.hp / this._info.attrInfo.hpMax) * 164;
    };
    PlayerBloodStrip2.prototype.layout = function (gameWidth, gameHeight) {
        this._homeImageLayer.x = Math.round(gameWidth - 295) / 2;
        this._homeImageLayer.y = 200;
        this._homeLayer.x = this._homeImageLayer.x;
        this._homeLayer.y = this._homeImageLayer.y;
    };
    PlayerBloodStrip2.prototype.__updateBlood = function (e) {
        this.invalidate("drawBlood");
    };
    PlayerBloodStrip2.prototype.onResizeHandler = function (e) {
        this.layout(Manager.config.gameWidth, Manager.config.gameHeight);
    };
    PlayerBloodStrip2.prototype.show = function (info) {
        if (this._info)
            this._info.removeEventListener(GameObjectAttrEvent.HP, this.__updateBlood, this);
        this._info = info;
        this.invalidate(InvalidationType.DATA);
        this.invalidate("drawBlood");
    };
    PlayerBloodStrip2.prototype.hide = function () {
        this.dispose();
    };
    PlayerBloodStrip2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeEvent();
        this._homeImageLayer.parent.removeChild(this._homeImageLayer);
        this._homeImageLayer = null;
        this._homeLayer.parent.removeChild(this._homeLayer);
        this._homeLayer = null;
        this._back.pool();
        this._back = null;
        this._strip.pool();
        this._strip = null;
        this._back1.pool();
        this._back1 = null;
        this._back2.pool();
        this._back2 = null;
        this._fightLable.pool();
        this._fightLable = null;
        this._imageHead.pool();
        this._imageHead = null;
        this._txtName.pool();
        this._txtName = null;
        this._fightNum.dispose();
        this._fightNum = null;
        this._info = null;
    };
    return PlayerBloodStrip2;
}(BaseRender));
__reflect(PlayerBloodStrip2.prototype, "PlayerBloodStrip2", ["IViewManager"]);
//# sourceMappingURL=PlayerBloodStrip2.js.map