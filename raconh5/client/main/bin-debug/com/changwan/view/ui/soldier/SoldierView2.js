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
 * 神兵
 * Simon
 * 2018.4.13
 */
var SoldierView2 = (function (_super) {
    __extends(SoldierView2, _super);
    function SoldierView2() {
        var _this = _super.call(this) || this;
        _this.start();
        _this.addEvent();
        return _this;
    }
    SoldierView2.prototype.start = function () {
        _super.prototype.start.call(this);
        this._bgImg = BitmapRes.create("common_pnl_back1_png", 250, 124, 465, 853);
        this._bgImg.scale9Grid = new egret.Rectangle(32, 27, 19, 15);
        this.addChild(this._bgImg);
        this._leftBgImg = Manager.pool.create(BitmapRemote);
        this._leftBgImg.x = 6;
        this._leftBgImg.y = 124;
        this.addChild(this._leftBgImg);
        this._leftBgImg.load(PathInfo.getPath("res/common/common_pnl_back2.png", LoaderType.IMAGE), 244, 853);
        this._rightBgImg = Manager.pool.create(BitmapRemote);
        this._rightBgImg.load(Manager.path.getPanelUiImgPath("cloak/cloak_di3", "png"), 454, 629);
        this.addChild(this._rightBgImg);
        this._blackImg = Manager.pool.create(BitmapRes, "common_name_back_png");
        this._blackImg.x = 256;
        this._blackImg.y = 158;
        this.addChild(this._blackImg);
        this._nameImg = Manager.pool.create(BitmapRes);
        this._nameImg.x = 273;
        this._nameImg.y = 211;
        this._nameImg.width = 52;
        this._nameImg.height = 170;
        this.addChild(this._nameImg);
        this._fightBg = Manager.pool.create(BitmapRes, "common_fighting_png");
        this._fightBg.x = 264;
        this._fightBg.y = 669;
        this.addChild(this._fightBg);
        this._fightImg = Manager.pool.create(BitmapRes, "common_zhanli_png");
        this._fightImg.x = 327;
        this._fightImg.y = 677;
        this.addChild(this._fightImg);
        this._greyStarList = [];
        this._starList = [];
        for (var i = 0; i < 3; i++) {
            var greyStar = Manager.pool.create(BitmapRes, "common_star_grey_png");
            greyStar.x = 429 + i * 40;
            greyStar.y = 146;
            this.addChild(greyStar);
            this._greyStarList.push(greyStar);
            var star = Manager.pool.create(BitmapRes, "common_star_bright_png");
            star.x = 429 + i * 40;
            star.y = 146;
            this._starList.push(star);
        }
        this._attrImg = Manager.pool.create(BitmapRes, "cloak_shuxingjc_png");
        this._attrImg.x = 269;
        this._attrImg.y = 767;
        this.addChild(this._attrImg);
        this._itemImg = Manager.pool.create(BitmapRes, "cloak_suoxucl_png");
        this._itemImg.x = 500;
        this._itemImg.y = 768;
        this.addChild(this._itemImg);
        this._putonBtn = new Button();
        this._putonBtn.x = 73;
        this._putonBtn.y = 1010;
        this._putonBtn.width = 238;
        this._putonBtn.height = 105;
        this.addChild(this._putonBtn);
        this._activeBtn = new Button();
        this._activeBtn.x = 420;
        this._activeBtn.y = 1010;
        this._activeBtn.width = 238;
        this._activeBtn.height = 105;
        this.addChild(this._activeBtn);
        this._putonImg = BitmapRes.create("common_label_png", 101, 1037, 181, 52);
        this._takeoffImg = BitmapRes.create("common_takeoff_label_png", 101, 1037, 181, 52);
        this._actImg = BitmapRes.create("common_active_png", 450, 1037, 181, 52);
        this._upgradeImg = BitmapRes.create("common_label_png", 450, 1037, 181, 52);
        this._attrTxtList = [];
        for (var i = 0; i < 3; i++) {
            var txt = Manager.pool.create(Label);
            txt.x = 275;
            txt.y = 823 + i * 37;
            this.addChild(txt);
            this._attrTxtList.push(txt);
        }
    };
    SoldierView2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    SoldierView2.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
    };
    SoldierView2.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
    };
    return SoldierView2;
}(RenderSprite));
__reflect(SoldierView2.prototype, "SoldierView2");
//# sourceMappingURL=SoldierView2.js.map