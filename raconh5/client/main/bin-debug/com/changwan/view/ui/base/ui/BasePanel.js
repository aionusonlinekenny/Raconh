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
 * update devil 2017-11-28
 */
var BasePanel = (function (_super) {
    __extends(BasePanel, _super);
    function BasePanel() {
        var _this = _super.call(this) || this;
        // public scrollerList:BaseHScrollerList2;
        _this._inited = false;
        _this._bottomImgTopValue = -1;
        _this._isAddBottomImg = true;
        _this.backImg = Manager.pool.create(BitmapRes, "common_panelBg_png", null, null, 720, 1223);
        _this.backImg.scale9Grid = new egret.Rectangle(4, 4, 8, 6);
        _this.backImg.y = 57;
        _this.addChild(_this.backImg);
        _this.bottomBackImg = Manager.pool.create(BitmapRemote);
        _this.bottomBackImg.x = 0;
        _this.bottomBackImg.y = 982;
        _this.bottomBackImg.load(PathInfo.getPath("res/common/panel_bg2.png", LoaderType.IMAGE), 720, 298);
        _this.addChild(_this.bottomBackImg);
        _this.titleBg1 = Manager.pool.create(BitmapRes, "panel_topBg_png", null, null, 720, 120);
        _this.titleBg1.scale9Grid = new egret.Rectangle(7, 19, 46, 4);
        _this.addChild(_this.titleBg1);
        _this.titleBg2 = Manager.pool.create(BitmapRes, "common_titleBg2_png", null, null, 720, 79);
        _this.titleBg2.y = 57;
        _this.addChild(_this.titleBg2);
        _this.closeBtn = Manager.pool.create(BitmapRes, "common_closeImg_png");
        _this.closeBtn.x = 618;
        _this.closeBtn.y = 45;
        _this.closeBtn.touchEnabled = true;
        _this.addChild(_this.closeBtn);
        _this._kuangBg = Manager.pool.create(BitmapRes, "panel_bgKuang2_png", null, null, 720, 1280);
        _this._kuangBg.scale9Grid = new egret.Rectangle(15, 15, 25, 25);
        _this.addChild(_this._kuangBg);
        _this.downFrameImg = Manager.pool.create(BitmapRes, "panel_bgKuang_png", null, null, 720, 1280);
        _this.downFrameImg.scale9Grid = new egret.Rectangle(74, 30, 100, 48);
        _this.addChild(_this.downFrameImg);
        _this.backBtn = Manager.pool.create(BitmapRes, "panel_backBtn2_normal_png");
        _this.backBtn.x = 572;
        _this.backBtn.y = 1162;
        _this.backBtn.touchEnabled = true;
        _this.addChild(_this.backBtn);
        _this._titleImg = Manager.pool.create(BitmapRes);
        _this._titleImg.x = 270;
        _this._titleImg.y = 70;
        _this.addChild(_this._titleImg);
        _this._backCoin = Manager.pool.create(BitmapRes, "panel_top_itemBg_png", null, null, 105, 30);
        _this._backCoin.x = 382;
        _this._backCoin.y = 14;
        _this.addChild(_this._backCoin);
        _this._backGold = Manager.pool.create(BitmapRes, "panel_top_itemBg_png", null, null, 105, 30);
        _this._backGold.x = 524;
        _this._backGold.y = 14;
        _this.addChild(_this._backGold);
        _this.iconCoin = Manager.pool.create(BitmapRes, "panel_coin_54_png");
        _this.iconCoin.x = 345;
        _this.iconCoin.y = 1;
        _this.addChild(_this.iconCoin);
        _this._iconGold = Manager.pool.create(BitmapRes, "panel_gold_54_png");
        _this._iconGold.x = 488;
        _this._iconGold.y = 0;
        _this.addChild(_this._iconGold);
        _this._payBtn = Manager.pool.create(BitmapRes, "panel_topPay_png");
        _this._payBtn.touchEnabled = true;
        _this._payBtn.x = 637;
        _this._payBtn.y = 12;
        _this.addChild(_this._payBtn);
        _this.txtName = Manager.pool.create(Label);
        _this.txtName.size = 24;
        _this.txtName.textColor = 0xd1ccc8;
        _this.txtName.width = 280;
        _this.txtName.height = 24;
        _this.txtName.x = 7;
        _this.txtName.y = 15;
        _this.addChild(_this.txtName);
        _this.txtCoin = Manager.pool.create(Label);
        _this.txtCoin.textAlign = egret.HorizontalAlign.RIGHT;
        _this.txtCoin.size = 24;
        _this.txtCoin.textColor = 0xffffff;
        _this.txtCoin.width = 100;
        _this.txtCoin.height = 24;
        _this.txtCoin.x = 383;
        _this.txtCoin.y = 16;
        _this.addChild(_this.txtCoin);
        _this.txtGold = Manager.pool.create(Label);
        _this.txtGold.textAlign = egret.HorizontalAlign.RIGHT;
        _this.txtGold.size = 24;
        _this.txtGold.textColor = 0xffffff;
        _this.txtGold.width = 100;
        _this.txtGold.height = 24;
        _this.txtGold.x = 525;
        _this.txtGold.y = 16;
        _this.addChild(_this.txtGold);
        _this.scrollerList = new BaseHScrollerList2();
        _this.scrollerList.x = 65;
        _this.scrollerList.y = 1140;
        _this.scrollerList.width = 495;
        _this.scrollerList.height = 130;
        _this.scrollerList.touchEnabled = true;
        _this.addChild(_this.scrollerList);
        // this.skinName = Manager.path.getSkinName("common", "BasePanelSkin");
        // this.touchChildren = true;
        _this.addChildAt(_this.backImg, 0);
        if (_this._bottomImgTopValue != -1) {
            _this.bottomBackImg.y = _this._bottomImgTopValue;
            _this._bottomImgTopValue = -1;
        }
        _this.addChild(_this.scrollerList);
        _this.showBottomBackHandler();
        _this._inited = true;
        _this.touchChildren = true;
        return _this;
    }
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
    BasePanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._payBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    BasePanel.prototype.removeEvent = function () {
        this._payBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    BasePanel.prototype.onTouchHandler = function (e) {
        Manager.link.link(LinkType.PANEL_RECHARGE);
    };
    BasePanel.prototype.setBottomBackTop = function (value) {
        this._bottomImgTopValue = value;
        if (!this._inited)
            return;
        if (this.bottomBackImg.y == value)
            return;
        this.bottomBackImg.y = value;
    };
    Object.defineProperty(BasePanel.prototype, "showBottomBack", {
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
    BasePanel.prototype.showBottomBackHandler = function () {
        if (this._isAddBottomImg) {
            if (!this.bottomBackImg.parent)
                this.addChildAt(this.bottomBackImg, 2);
        }
        else {
            if (this.bottomBackImg.parent)
                this.bottomBackImg.parent.removeChild(this.bottomBackImg);
        }
    };
    Object.defineProperty(BasePanel.prototype, "title", {
        set: function (value) {
            this._titleImg.source = value;
        },
        enumerable: true,
        configurable: true
    });
    BasePanel.prototype.dispose = function () {
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
    };
    return BasePanel;
}(Sprite));
__reflect(BasePanel.prototype, "BasePanel");
//# sourceMappingURL=BasePanel.js.map