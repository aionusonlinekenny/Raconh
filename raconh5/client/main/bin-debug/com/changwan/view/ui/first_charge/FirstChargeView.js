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
 * 18.1.8
 * 首充豪礼
 */
var FirstChargeView = (function (_super) {
    __extends(FirstChargeView, _super);
    function FirstChargeView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("first_charge", "FirstChargeViewSkin");
        _this.visible = false;
        return _this;
    }
    FirstChargeView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._itemArr = [this._item0, this._item1, this._item2, this._item3];
        this.onResizeHandler(null);
        if (this._fightBit == null) {
            this._fightBit = Manager.pool.create(BitmapRemote);
            this._fightBit.x = 160;
            this._fightBit.y = 798;
            this.addChild(this._fightBit);
            this._fightBit.touchEnabled = false;
            this._fightBit.load(Manager.path.getPanelFristChargePath("firstCharge_zhandouli2"));
        }
        if (this._dimianAni == null) {
            this._dimianAni = Manager.animation.createEffectAnimation("dimian");
            this._dimianAni.x = 160;
            this._dimianAni.y = 448;
            this.addChildAt(this._dimianAni, 1);
            this._dimianAni.touchEnabled = false;
            this._dimianAni.play();
        }
        if (this._scxlAni == null) {
            this._scxlAni = Manager.animation.createEffectAnimation("scxl");
            this._scxlAni.x = 160;
            this._scxlAni.y = 400;
            this.addChildAt(this._scxlAni, 2);
            this._scxlAni.touchEnabled = false;
            this._scxlAni.play();
        }
        if (this._bitimg == null) {
            this._bitimg = Manager.pool.create(BitmapRemote);
            this._bitimg.x = 0;
            this._bitimg.y = 143;
            this.addChildAt(this._bitimg, 0);
            this._bitimg.load(Manager.path.getPanelFristChargePath("firstCharge_kuang"));
        }
    };
    FirstChargeView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._rewardsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardsHandler, this);
    };
    FirstChargeView.prototype.onTouchCloseHandler = function (e) {
        Manager.view.hide(76 /* FirstChargeView */);
    };
    FirstChargeView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        if (!this.visible)
            this.visible = true;
    };
    FirstChargeView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._rewardsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardsHandler, this);
    };
    FirstChargeView.prototype.onRewardsHandler = function (e) {
        if (Manager.model.getVip().exp < FirstChargeView.VIP_EXP) {
            Manager.view.show(77 /* SysChargePanel */);
            return;
        }
        if (!Manager.model.getSysCharge().isReward) {
            Manager.control.getFirstCharge().reward();
        }
    };
    FirstChargeView.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    FirstChargeView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    FirstChargeView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    FirstChargeView.prototype.setData = function (data) {
        this.invalidate(InvalidationType.DATA);
    };
    FirstChargeView.prototype.drawData = function () {
        var cvo = FirstChargeCVO.cvo();
        var items = GainLossVO.parse(cvo.rewards);
        var str = cvo.effect;
        var reg = /\[|]|[] /g;
        str = str.replace(reg, "");
        var strArr = str.split(",");
        for (var i = 0; i < 4; i++) {
            if (items[i]) {
                this._itemArr[i].baseId = items[i].baseId;
                this._itemArr[i].count = items[i].num;
                this._itemArr[i].setEffect(strArr[i]);
            }
            else {
                this._itemArr[i].clear();
            }
        }
        this._redicon.visible = Manager.model.getVip().exp >= FirstChargeView.VIP_EXP;
    };
    FirstChargeView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    FirstChargeView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    FirstChargeView.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.removes(this._item0, this._item1, this._item2, this._item3, this._close, this._redicon);
        }
        this._rewardsBtn.dispose();
        this._rewardsBtn = null;
        Manager.pool.push(this._item0);
        Manager.pool.push(this._item1);
        Manager.pool.push(this._item2);
        Manager.pool.push(this._item3);
        this._item0 = null;
        this._item1 = null;
        this._item2 = null;
        this._item3 = null;
        this._close = null;
        this._redicon = null;
        if (this._fightBit) {
            Manager.pool.push(this._fightBit);
            this._fightBit = null;
        }
        this._itemArr = null;
        if (this._dimianAni) {
            Manager.pool.push(this._dimianAni);
            this._dimianAni = null;
        }
        if (this._scxlAni) {
            if (this._scxlAni.parent)
                this._scxlAni.parent.removeChild(this._scxlAni);
            Manager.pool.push(this._scxlAni);
            this._scxlAni = null;
        }
        if (this._bitimg) {
            Manager.pool.push(this._bitimg);
            this._bitimg = null;
        }
    };
    FirstChargeView.prototype.show = function (value) {
        if (Manager.view.isOpening(119 /* RollTips */)) {
            Manager.view.hide(119 /* RollTips */);
        }
        Manager.layer.tipsLayer.addChild(this);
    };
    FirstChargeView.prototype.hide = function () {
        this.dispose();
    };
    FirstChargeView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    /** 固定单笔首充1元可领奖 */
    FirstChargeView.VIP_EXP = 1;
    return FirstChargeView;
}(UIComponent));
__reflect(FirstChargeView.prototype, "FirstChargeView");
//# sourceMappingURL=FirstChargeView.js.map