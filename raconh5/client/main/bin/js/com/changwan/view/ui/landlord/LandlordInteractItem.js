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
var LandlordInteractItem = /** @class */ (function (_super) {
    __extends(LandlordInteractItem, _super);
    function LandlordInteractItem() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("landlord", "LandlordInteractItemSkin");
        return _this;
    }
    LandlordInteractItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._bgImg) {
            this._bgImg = Manager.pool.create(BitmapRemote);
            this._bgImg.x = this._bg.x;
            this._bgImg.y = this._bg.y;
            this.addChildAt(this._bgImg, this.getChildIndex(this._bg));
            this._bgImg.load(Manager.path.getPanelLandlordPath("landlord_interacBg", "jpg"), this._bg.width, this._bg.height);
        }
        if (!this._langanImg) {
            this._langanImg = Manager.pool.create(BitmapRemote);
            this._langanImg.x = this._langan.x;
            this._langanImg.y = this._langan.y;
            this.addChildAt(this._langanImg, this.getChildIndex(this._langan));
            this._langanImg.load(Manager.path.getPanelLandlordPath("landlord_langan", "png"), this._langan.width, this._langan.height);
        }
    };
    LandlordInteractItem.prototype.initData = function () {
        this._model = Manager.model.getLaird();
        this.checkShowRedIcon();
    };
    LandlordInteractItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._freeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._hudongBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._yazhaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.checkShowRedIcon, this);
        Manager.model.getLaird().addEventListener(LairdEvent.COOLY_INFO_UPDATE, this.checkShowRedIcon, this);
        Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.checkShowRedIcon, this);
        Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_PICK_EXP_UPDATE, this.checkShowRedIcon, this);
    };
    LandlordInteractItem.prototype.removeEvent = function () {
        this._freeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._hudongBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._yazhaBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.checkShowRedIcon, this);
        Manager.model.getLaird().removeEventListener(LairdEvent.COOLY_INFO_UPDATE, this.checkShowRedIcon, this);
        Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.checkShowRedIcon, this);
        Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_PICK_EXP_UPDATE, this.checkShowRedIcon, this);
        _super.prototype.removeEvent.call(this);
    };
    LandlordInteractItem.prototype.checkShowRedIcon = function (e) {
        this._redIcon1.visible = this._model.checkInteractIcon();
        this._redIcon2.visible = this._model.checkCanGetExp();
    };
    LandlordInteractItem.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._freeBtn:
                var cbi = Manager.pool.create(CallBackInfo, this.onFreeComplelte, this);
                Manager.tips.showTips(LangCVO.getContent("laird18", this._coolyInfo.name), cbi, true);
                break;
            case this._hudongBtn:
                Manager.view.show(90 /* LandlordInteractView */, this._coolyInfo);
                break;
            case this._yazhaBtn:
                Manager.view.show(91 /* LandlordPressView */, this._coolyInfo);
                break;
            case this._getBtn:
                if (this._callback != null)
                    this._callback(2);
                break;
        }
    };
    LandlordInteractItem.prototype.onFreeComplelte = function () {
        Manager.control.getLaird().lairdFree(this._coolyInfo.id);
    };
    LandlordInteractItem.prototype.clickBack = function (value) {
        this._callback = value;
    };
    LandlordInteractItem.prototype.updateInfo = function (coolyInfo) {
        this._coolyInfo = coolyInfo;
        if (!this._coolyInfo)
            return;
        this._nickName.text = "Lv." + coolyInfo.level + " " + coolyInfo.name;
        this._clubName.text = LangCVO.getContent("laird13", coolyInfo.clubName);
        this._role.load(Manager.path.getPanelLandlordPath("landlord_career" + coolyInfo.career, "png"));
        this._timeName.text = LangCVO.getContent("laird16");
        var leftTime = this._model.lairdRoleInfo.interactTimes - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        if (leftTime <= 0) {
            this._timeName.text = LangCVO.getContent("laird17");
            leftTime = this._coolyInfo.freeTimes - ((new Date).getTime() / 1000);
            if (leftTime > 0)
                Manager.render.add(this.timeHandler, this, 1000);
        }
        else
            Manager.render.add(this.timeHandler, this, 1000);
        this._timeValue.text = cw.DateUtil.formatStr(leftTime, cw.DateUtil.LEFT_HH_MM_SS, true);
    };
    LandlordInteractItem.prototype.timeHandler = function () {
        var leftTime = this._model.lairdRoleInfo.interactTimes - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        if (leftTime < 0) {
            leftTime = this._coolyInfo.freeTimes - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        }
        if (leftTime < 0) {
            Manager.render.remove(this.timeHandler, this);
            return;
        }
        this._timeValue.text = cw.DateUtil.formatStr(leftTime, cw.DateUtil.LEFT_HH_MM_SS, true);
    };
    LandlordInteractItem.prototype.dispose = function () {
        Manager.render.remove(this.timeHandler, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._bg, this._role, this._langan, this._kuang, this.type1, this.type2, this._nickName, this._clubName, this._freeBtn, this._hudongBtn, this._yazhaBtn, this._timeValue, this._nobody, this._getBtn, this._bgImg, this._langanImg);
        this._bg = null;
        this._role = null;
        this._langan = null;
        this._kuang = null;
        this.type1 = null;
        this.type2 = null;
        if (this._nickName)
            this._nickName.dispose();
        this._nickName = null;
        if (this._clubName)
            this._clubName.dispose();
        this._clubName = null;
        if (this._freeBtn)
            this._freeBtn.dispose();
        this._freeBtn = null;
        if (this._hudongBtn)
            this._hudongBtn.dispose();
        this._hudongBtn = null;
        if (this._yazhaBtn)
            this._yazhaBtn.dispose();
        this._yazhaBtn = null;
        if (this._timeValue)
            this._timeValue.dispose();
        this._timeValue = null;
        this._nobody = null;
        if (this._getBtn)
            this._getBtn.dispose();
        this._getBtn = null;
        if (this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
        if (this._langanImg)
            Manager.pool.push(this._langanImg);
        this._langanImg = null;
        this._model = null;
        this._callback = null;
        this._coolyInfo = null;
    };
    return LandlordInteractItem;
}(UIComponent));
//# sourceMappingURL=LandlordInteractItem.js.map