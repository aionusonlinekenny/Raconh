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
 * update devil 2017-11-28
 */
var BasePanel2 = /** @class */ (function (_super) {
    __extends(BasePanel2, _super);
    function BasePanel2() {
        var _this = _super.call(this) || this;
        // public scrollerList:BaseHScrollerList2;
        _this._inited = false;
        _this._bottomImgTopValue = -1;
        _this._isAddBottomImg = true;
        return _this;
    }
    BasePanel2.prototype.reuse = function (imageContainer, effectContainer) {
        this._imgLayer = imageContainer;
        this._effectLayer = Manager.layer.uiLayer;
        _super.prototype.reuse.call(this);
    };
    BasePanel2.prototype.start = function () {
        _super.prototype.start.call(this);
        this.backImg = Manager.pool.create(BitmapRes, "common_panelBg_png", null, null, 720, 1223);
        this.backImg.scale9Grid = new egret.Rectangle(4, 4, 8, 6);
        this.backImg.y = 57;
        this._imgLayer.addChild(this.backImg);
        this.bottomBackImg = Manager.pool.create(BitmapRemote);
        this.bottomBackImg.x = 0;
        this.bottomBackImg.y = 982;
        this.bottomBackImg.load(PathInfo.getPath("res/common/panel_bg2.png", LoaderType.IMAGE), 720, 298);
        this._imgLayer.addChild(this.bottomBackImg);
        this.titleBg1 = Manager.pool.create(BitmapRes, "panel_topBg_png", null, null, 720, 120);
        this.titleBg1.scale9Grid = new egret.Rectangle(7, 19, 46, 4);
        this._imgLayer.addChild(this.titleBg1);
        this.titleBg2 = Manager.pool.create(BitmapRes, "common_titleBg2_png", null, null, 720, 79);
        this.titleBg2.y = 57;
        this._imgLayer.addChild(this.titleBg2);
        this.closeBtn = Manager.pool.create(BitmapRes, "common_closeImg_png");
        this.closeBtn.x = 618;
        this.closeBtn.y = 45;
        this.closeBtn.touchEnabled = true;
        this._imgLayer.addChild(this.closeBtn);
        this._kuangBg = Manager.pool.create(BitmapRes, "panel_bgKuang2_png", null, null, 720, 1280);
        this._kuangBg.scale9Grid = new egret.Rectangle(15, 15, 25, 25);
        this._imgLayer.addChild(this._kuangBg);
        this.downFrameImg = Manager.pool.create(BitmapRes, "panel_bgKuang_png", null, null, 720, 1280);
        this.downFrameImg.scale9Grid = new egret.Rectangle(74, 30, 100, 48);
        this._imgLayer.addChild(this.downFrameImg);
        this.backBtn = Manager.pool.create(BitmapRes, "panel_backBtn2_normal_png");
        this.backBtn.x = 572;
        this.backBtn.y = 1162;
        this.backBtn.touchEnabled = true;
        this._imgLayer.addChild(this.backBtn);
        this._titleImg = Manager.pool.create(BitmapRes);
        this._titleImg.x = 270;
        this._titleImg.y = 70;
        this._imgLayer.addChild(this._titleImg);
        this._backCoin = Manager.pool.create(BitmapRes, "panel_top_itemBg_png", null, null, 105, 30);
        this._backCoin.x = 382;
        this._backCoin.y = 14;
        this._imgLayer.addChild(this._backCoin);
        this._backGold = Manager.pool.create(BitmapRes, "panel_top_itemBg_png", null, null, 105, 30);
        this._backGold.x = 524;
        this._backGold.y = 14;
        this._imgLayer.addChild(this._backGold);
        this.iconCoin = Manager.pool.create(BitmapRes, "panel_coin_54_png");
        this.iconCoin.x = 345;
        this.iconCoin.y = 1;
        this._imgLayer.addChild(this.iconCoin);
        this._iconGold = Manager.pool.create(BitmapRes, "panel_gold_54_png");
        this._iconGold.x = 488;
        this._iconGold.y = 0;
        this._imgLayer.addChild(this._iconGold);
        this._payBtn = Manager.pool.create(BitmapRes, "panel_topPay_png");
        this._payBtn.touchEnabled = true;
        this._payBtn.x = 637;
        this._payBtn.y = 12;
        this._imgLayer.addChild(this._payBtn);
        this.txtName = Manager.pool.create(Label);
        this.txtName.size = 24;
        this.txtName.textColor = 0xd1ccc8;
        this.txtName.width = 280;
        this.txtName.height = 24;
        this.txtName.x = 7;
        this.txtName.y = 15;
        this._imgLayer.addChild(this.txtName);
        this.txtCoin = Manager.pool.create(Label);
        this.txtCoin.textAlign = egret.HorizontalAlign.RIGHT;
        this.txtCoin.size = 24;
        this.txtCoin.textColor = 0xffffff;
        this.txtCoin.width = 100;
        this.txtCoin.height = 24;
        this.txtCoin.x = 383;
        this.txtCoin.y = 16;
        this._imgLayer.addChild(this.txtCoin);
        this.txtGold = Manager.pool.create(Label);
        this.txtGold.textAlign = egret.HorizontalAlign.RIGHT;
        this.txtGold.size = 24;
        this.txtGold.textColor = 0xffffff;
        this.txtGold.width = 100;
        this.txtGold.height = 24;
        this.txtGold.x = 525;
        this.txtGold.y = 16;
        this._imgLayer.addChild(this.txtGold);
        this.scrollerList = new BaseHScrollerList2();
        this.scrollerList.x = 65;
        this.scrollerList.y = 1140;
        this.scrollerList.width = 495;
        this.scrollerList.height = 130;
        this.scrollerList.touchEnabled = true;
        this._imgLayer.addChild(this.scrollerList);
        if (this._bottomImgTopValue != -1) {
            this.bottomBackImg.y = this._bottomImgTopValue;
            this._bottomImgTopValue = -1;
        }
        this.showBottomBackHandler();
        this._inited = true;
        this.touchChildren = true;
    };
    // protected configUI():void
    // {
    // 	super.configUI();
    // 	this.addChildAt(this.backImg, 0);
    // 	if(this._bottomImgTopValue != -1)
    // 	{
    // 		this.bottomBackImg.y = this._bottomImgTopValue;
    // 		this._bottomImgTopValue = -1;
    // 	}
    // 	this.addChild(this.scrollerList);
    // 	this.showBottomBackHandler();
    // 	this._inited = true;
    // }
    BasePanel2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._payBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    BasePanel2.prototype.removeEvent = function () {
        this._payBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    BasePanel2.prototype.onTouchHandler = function (e) {
        Manager.link.link(LinkType.PANEL_RECHARGE);
    };
    BasePanel2.prototype.setBottomBackTop = function (value) {
        this._bottomImgTopValue = value;
        if (!this._inited)
            return;
        if (this.bottomBackImg.y == value)
            return;
        this.bottomBackImg.y = value;
    };
    Object.defineProperty(BasePanel2.prototype, "showBottomBack", {
        set: function (value) {
            if (this._isAddBottomImg == value)
                return;
            this._isAddBottomImg = value;
            if (this._inited)
                this.showBottomBackHandler();
        },
        enumerable: true,
        configurable: true
    });
    BasePanel2.prototype.showBottomBackHandler = function () {
        if (this._isAddBottomImg) {
            if (!this.bottomBackImg.parent)
                this.addChildAt(this.bottomBackImg, 1);
        }
        else {
            if (this.bottomBackImg.parent)
                this.bottomBackImg.parent.removeChild(this.bottomBackImg);
        }
    };
    Object.defineProperty(BasePanel2.prototype, "title", {
        set: function (value) {
            this._titleImg.source = value;
        },
        enumerable: true,
        configurable: true
    });
    BasePanel2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this.bottomBackImg) {
            Manager.pool.push(this.bottomBackImg);
            this.bottomBackImg = null;
        }
        if (this.backImg) {
            Manager.pool.push(this.backImg);
            this.backImg = null;
        }
        if (this.titleBg1) {
            Manager.pool.push(this.titleBg1);
            this.titleBg1 = null;
        }
        if (this.titleBg2) {
            Manager.pool.push(this.titleBg2);
            this.titleBg2 = null;
        }
        if (this.closeBtn) {
            Manager.pool.push(this.closeBtn);
            this.closeBtn = null;
        }
        if (this._kuangBg) {
            Manager.pool.push(this._kuangBg);
            this._kuangBg = null;
        }
        if (this._titleImg) {
            ObjectUtil.remove(this._titleImg);
            this._titleImg = null;
        }
        if (this.backBtn) {
            ObjectUtil.remove(this.backBtn);
            this.backBtn = null;
        }
        if (this.scrollerList) {
            this.scrollerList.dispose();
            this.scrollerList = null;
        }
        if (this.downFrameImg) {
            ObjectUtil.remove(this.downFrameImg);
            this.downFrameImg = null;
        }
        if (this._backCoin) {
            Manager.pool.push(this._backCoin);
            this._backCoin = null;
        }
        if (this._backGold) {
            Manager.pool.push(this._backGold);
            this._backGold = null;
        }
        if (this.iconCoin) {
            Manager.pool.push(this.iconCoin);
            this.iconCoin = null;
        }
        if (this._iconGold) {
            Manager.pool.push(this._iconGold);
            this._iconGold = null;
        }
        if (this._payBtn) {
            Manager.pool.push(this._payBtn);
            this._payBtn = null;
        }
        if (this.txtName) {
            Manager.pool.push(this.txtName);
            this.txtName = null;
        }
        if (this.txtCoin) {
            Manager.pool.push(this.txtCoin);
            this.txtCoin = null;
        }
        if (this.txtGold) {
            Manager.pool.push(this.txtGold);
            this.txtGold = null;
        }
        if (this.scrollerList) {
            this.scrollerList.dispose();
            this.scrollerList = null;
        }
        this._imgLayer = null;
        this._effectLayer = null;
    };
    return BasePanel2;
}(Sprite));
//# sourceMappingURL=BasePanel2.js.map