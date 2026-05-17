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
 * 弹窗通用面板
 * liangyan
 * create 2017-11-02
*/
var BasePopUpView = (function (_super) {
    __extends(BasePopUpView, _super);
    function BasePopUpView() {
        var _this = _super.call(this) || this;
        _this._inited = false;
        _this._diImgY = -1;
        _this._isShowDiImg = true;
        _this.skinName = Manager.path.getSkinName("common", "BasePopUpSkin");
        _this.touchChildren = true;
        return _this;
    }
    BasePopUpView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this.diImg) {
            this.diImg = Manager.pool.create(BitmapRemote);
            this.diImg.x = 0;
            this.diImg.y = 670;
            this.diImg.load(PathInfo.getPath("res/common/panel_bg2.png", LoaderType.IMAGE), 720, 130);
            this.addChildAt(this.diImg, 1);
        }
        this._inited = true;
        if (this._diImgY != -1)
            this.diImg.y = this._diImgY;
        this.diImg.visible = this._isShowDiImg;
    };
    Object.defineProperty(BasePopUpView.prototype, "bgHeight", {
        set: function (h) {
            this._bgImg.height = h;
            // this.diImg.y = this._bgImg.y + this._bgImg.height - 110;
            this._bommImg.y = this._bgImg.y + this._bgImg.height - 8;
            this._kuangImg.height = h;
            this._diImgY = this._bgImg.y + this._bgImg.height - 110;
            if (this._inited)
                this.diImg.y = this._diImgY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePopUpView.prototype, "viewY", {
        set: function (value) {
            this._bgImg.y = value;
            this._bommImg.y = this._bgImg.y + this._bgImg.height - 8;
            this._group.y = this._bgImg.y - 40;
            this._kuangImg.y = this._bgImg.y;
            this._diImgY = this._bgImg.y + this._bgImg.height - 110;
            if (this._inited)
                this.diImg.y = this._diImgY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePopUpView.prototype, "diImgVisible", {
        set: function (value) {
            this._isShowDiImg = value;
            if (this._inited)
                this.diImg.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    BasePopUpView.prototype.dispose = function () {
        if (this.closeBtn) {
            this.closeBtn.dispose();
            this.closeBtn = null;
        }
        if (this._bgImg) {
            this.removeChild(this._bgImg);
            this._bgImg = null;
        }
        if (this.diImg) {
            Manager.pool.push(this.diImg);
            this.diImg = null;
        }
        if (this._bommImg) {
            this.removeChild(this._bommImg);
            this._bommImg = null;
        }
        if (this.titleBg) {
            this.titleBg.parent.removeChild(this.titleBg);
            this.titleBg = null;
        }
        if (this.titleImg) {
            this.titleImg.parent.removeChild(this.titleImg);
            this.titleImg = null;
        }
        this.removeChild(this._kuangImg);
        this._kuangImg = null;
        _super.prototype.dispose.call(this);
    };
    return BasePopUpView;
}(UIComponent));
__reflect(BasePopUpView.prototype, "BasePopUpView");
//# sourceMappingURL=BasePopUpView.js.map