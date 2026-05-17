var FirstCharge = /** @class */ (function () {
    function FirstCharge(owner) {
        this._owner = owner;
        this._visible = false;
        var layer = Manager.layer;
        this._homeImageLayer = ObjectUtil.createConainer();
        layer.homeImageLayer.addChild(this._homeImageLayer);
        this._homeLayer = ObjectUtil.createConainer();
        layer.homeLayer.addChild(this._homeLayer);
        Manager.model.getSysCharge().addEventListener(FirstChargeEvent.FIRSTCHARGE_REWARD_EVENT, this.onHideFirstChargeImgHandler, this);
    }
    FirstCharge.prototype.onClickHandler = function (e) {
        if (OpenCVO.isOpen(OpenConst.ID_FIRST_CHARGE, true))
            Manager.view.show(76 /* FirstChargeView */);
    };
    FirstCharge.prototype.switch = function (visible) {
        // visible = visible && !Manager.model.getSysCharge().isReward;
        if (this._visible == visible)
            return;
        this._visible = visible;
        if (this._visible) {
            if (this._firstChargeAni == null) {
                this._firstChargeAni = Manager.animation.createEffectAnimation("zqqg");
                this._firstChargeAni.x = -59;
                this._firstChargeAni.y = 480;
                this._firstChargeAni.touchEnabled = true;
                this._firstChargeAni.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
                this._homeLayer.addChild(this._firstChargeAni);
            }
            if (Manager.model.getVip().exp >= FirstChargeView.VIP_EXP) {
                if (!this._firstRedIcon) {
                    this._firstRedIcon = Manager.pool.create(BitmapRes, "common_red_icon_png");
                    this._homeImageLayer.addChild(this._firstRedIcon);
                    this._firstRedIcon.x = 107;
                    this._firstRedIcon.y = 580;
                }
            }
            Manager.model.getVip().addEventListener(VipEvent.EXP_UPDATE, this.onHideFirstChargeImgHandler, this);
        }
        else {
            if (this._firstChargeAni) {
                this._firstChargeAni.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
                Manager.pool.push(this._firstChargeAni);
                this._firstChargeAni = null;
            }
            if (this._firstRedIcon) {
                Manager.pool.push(this._firstRedIcon);
                this._firstRedIcon = null;
            }
            Manager.model.getVip().removeEventListener(VipEvent.EXP_UPDATE, this.onHideFirstChargeImgHandler, this);
            // this.showDailyRebateIcon();//第一天开启
            this._owner.switch(HomeView2.DAILY, true);
        }
    };
    FirstCharge.prototype.showTip = function () {
        if (this._firstChargeAni) {
            var pos = this._firstChargeAni.parent.localToGlobal(this._firstChargeAni.x, this._firstChargeAni.y);
            Manager.view.show(119 /* RollTips */, RollTips2.verseList[0], pos);
        }
    };
    FirstCharge.prototype.onHideFirstChargeImgHandler = function (e) {
        if (e === void 0) { e = null; }
        // this.switch(true);
        this._owner.switch(HomeView2.FIRST_CHARGE, true);
    };
    FirstCharge.prototype.getGuidPos = function () {
        return this._homeLayer.localToGlobal(-59, 480);
        // return this._firstChargeAni.parent.localToGlobal(this._firstChargeAni.x,this._firstChargeAni.y);
    };
    return FirstCharge;
}());
//# sourceMappingURL=FirstCharge.js.map