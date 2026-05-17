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
 * pzx
 * 17.11.17
 * 经脉人物星位图层
 */
var JingmaiRenSkin = (function (_super) {
    __extends(JingmaiRenSkin, _super);
    function JingmaiRenSkin() {
        var _this = _super.call(this) || this;
        _this._pos = -1;
        return _this;
    }
    JingmaiRenSkin.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        if (this._upgradeAni)
            this._upgradeAni.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onUpgradeHandler, this);
    };
    JingmaiRenSkin.prototype.setSkinName = function (url) {
        this.skinName = Manager.path.getSkinName("jingmai", url);
        this._pos = -1;
    };
    JingmaiRenSkin.prototype.setStarActive = function (value) {
        this._pos = value;
        if (this._list)
            this.updateVilue();
    };
    JingmaiRenSkin.prototype.updateVilue = function () {
        var ln = this._list.length;
        this._aniList = [];
        for (var i = 0; i < ln; i++) {
            if (i < this._pos) {
                this._list[i].visible = true;
                var ani = void 0;
                if (!this._aniList[i]) {
                    ani = Manager.animation.createJingmaiAnimation("jingmailjm");
                    this.addChild(ani);
                    this._aniList.push(ani);
                }
                ani = this._aniList[i];
                ani.x = this._starList[i].x - 31;
                ani.y = this._starList[i].y - 28;
            }
            else {
                this._list[i].visible = false;
            }
            if (this._pos == 8) {
                if (this._jmAni) {
                    this._jmAni.visible = false;
                    this._jmAni.stop();
                }
            }
            else if (i == this._pos) {
                if (!this._jmAni) {
                    this._jmAni = Manager.animation.createJingmaiAnimation("jingmaijm");
                    this.addChild(this._jmAni);
                }
                this._jmAni.x = this._starList[i].x - 101;
                this._jmAni.y = this._starList[i].y - 89;
                this._jmAni.visible = true;
                this._jmAni.play();
            }
            this._starList[i].visible = false;
        }
    };
    JingmaiRenSkin.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._list = [this._star0, this._ling1, this._ling2, this._ling3, this._ling4, this._ling5, this._ling6, this._ling7];
        this._starList = [this._star0, this._star1, this._star2, this._star3, this._star4, this._star5, this._star6, this._star7];
    };
    JingmaiRenSkin.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.setStarActive(this._pos);
    };
    JingmaiRenSkin.prototype.upgradeStar = function () {
        if (this._upgradeAni == null) {
            this._upgradeAni = Manager.animation.createJingmaiAnimation("jingmaiqs");
            this._upgradeAni.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onUpgradeHandler, this);
            this.addChild(this._upgradeAni);
        }
        this._upgradeAni.visible = true;
        this._upgradeAni.play();
        var index;
        if (this._pos == 8) {
            index = 7;
        }
        else {
            index = this._pos;
        }
        this._upgradeAni.x = this._starList[index].x - 32;
        this._upgradeAni.y = this._starList[index].y - 25;
        if (this._jmAni)
            this._jmAni.visible = false;
    };
    JingmaiRenSkin.prototype.onUpgradeHandler = function () {
        this._upgradeAni.visible = false;
        this._upgradeAni.stop();
        if (this._jmAni)
            this._jmAni.visible = true;
        if (this.callBackFun != null) {
            // this.callBackFun();
            this.callBackFun.call(this.target);
        }
    };
    JingmaiRenSkin.prototype.setDiBitmap = function (path) {
        this._bitmap = Manager.pool.create(BitmapRemote);
        this._bitmap.load(Manager.path.getPanelUiImgPath("jingmai/jingmai/jingmai_ren" + path, Extension.PNG));
        this._bitmap.x = JingmaiRenSkin.poses[path];
        this._bitmap.y = 110;
        this.addChildAt(this._bitmap, 0);
    };
    JingmaiRenSkin.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
            var mc = _a[_i];
            this.removeChild(mc);
        }
        this._list = null;
        for (var _b = 0, _c = this._starList; _b < _c.length; _b++) {
            var mc_1 = _c[_b];
            if (mc_1.parent)
                this.removeChild(mc_1);
        }
        this._starList = null;
        this._ling7 = this._ling6 = this._ling5 = this._ling4 = this._ling3 = this._ling2 = this._ling1 = null;
        this._star0 = this._star1 = this._star2 = this._star3 = this._star4 = this._star5 = this._star6 = this._star7 = null;
        if (this._jmAni)
            Manager.pool.push(this._jmAni);
        this._jmAni = null;
        if (this._upgradeAni) {
            this._upgradeAni.stop();
            Manager.pool.push(this._upgradeAni);
        }
        this._upgradeAni = null;
        for (var _d = 0, _e = this._aniList; _d < _e.length; _d++) {
            var ani = _e[_d];
            Manager.pool.push(ani);
        }
        this._aniList = null;
        this.callBackFun = null;
        this.target = null;
        if (this._bitmap) {
            Manager.pool.push(this._bitmap);
            this._bitmap = null;
        }
    };
    JingmaiRenSkin.poses = { 1: 85, 2: 86, 3: 128, 4: 145, 5: 0, 6: 152 };
    return JingmaiRenSkin;
}(UIComponent));
__reflect(JingmaiRenSkin.prototype, "JingmaiRenSkin");
//# sourceMappingURL=JingmaiRenSkin.js.map