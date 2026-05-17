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
var LandlordInfoView = /** @class */ (function (_super) {
    __extends(LandlordInfoView, _super);
    function LandlordInfoView(thisParent) {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this._thisParent = thisParent;
        _this.skinName = Manager.path.getSkinName("landlord", "LandlordInfoViewSkin");
        return _this;
    }
    LandlordInfoView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getLaird();
        this._statusList = [this._status0, this._status1, this._status2];
        if (this._bgImg == null) {
            this._bgImg = Manager.pool.create(BitmapRemote);
            this._bgImg.x = this._back.x;
            this._bgImg.y = this._back.y;
            this.addChildAt(this._bgImg, this.getChildIndex(this._back));
            this._bgImg.load(Manager.path.getPanelLandlordPath("landlord_di1", "jpg"), this._back.width, this._back.height);
        }
        // if(this._roleImg == null)
        // {
        // 	this._roleImg = Manager.pool.create(BitmapRemote);
        // 	this._roleImg.x = 2;
        // 	this._roleImg.y = 151;
        // 	this._back.addChild(this._roleImg);
        // 	this._roleImg.load(Manager.path.getPanelLandlordPath("landlord_career" + Manager.model.self.attrInfo.career, "png"));
        // }
        if (!this._roleModel) {
            this._roleModel = Manager.pool.create(RoleAnimation, Manager.model.self.attrInfo.clothes, Manager.model.self.attrInfo.weapon, Manager.model.self.attrInfo.wing);
            this._roleModel.scaleX = 0.8;
            this._roleModel.scaleY = 0.8;
            this._back.addChild(this._roleModel);
        }
        this._roleModel.x = -280;
        this._roleModel.y = -180;
        if (this._rightDownImg == null) {
            this._rightDownImg = Manager.pool.create(BitmapRemote);
            this._rightDownImg.x = -13;
            this._rightDownImg.y = 533;
            this._back.addChild(this._rightDownImg);
            this._rightDownImg.load(Manager.path.getPanelLandlordPath("landlord_kuang", "png"));
        }
    };
    LandlordInfoView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.onInfoUpdateHandler();
    };
    LandlordInfoView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(LairdEvent.COOLY_INFO_UPDATE, this.onInfoUpdateHandler, this);
        this._model.addEventListener(LairdEvent.LAIRD_SEEK_HELP_UPDATE, this.onInfoUpdateHandler, this);
        this._btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    LandlordInfoView.prototype.removeEvent = function () {
        this._model.removeEventListener(LairdEvent.COOLY_INFO_UPDATE, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(LairdEvent.LAIRD_SEEK_HELP_UPDATE, this.onInfoUpdateHandler, this);
        this._btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    LandlordInfoView.prototype.onInfoUpdateHandler = function (e) {
        for (var i = 0; i < 3; i++) {
            this._statusList[i].visible = this._model.curStatus == i;
        }
        this._desc.text = LangCVO.getContent("laird" + (this._model.curStatus + 1));
        switch (this._model.curStatus) {
            case LairdStatusType.STATUS_FREE:
                this._value11.text = (this._model.lairdRoleInfo ? this._thisParent.catchInfo.value - this._model.lairdRoleInfo.catchCount : this._thisParent.catchInfo.value) + "/" + this._thisParent.catchInfo.value;
                this._value12.text = (this._model.lairdRoleInfo ? this._thisParent.rescueInfo.value - this._model.lairdRoleInfo.rescueCount : this._thisParent.rescueInfo.value) + "/" + this._thisParent.rescueInfo.value;
                break;
            case LairdStatusType.STATUS_LORD:
                this._value21.text = (this._model.lairdRoleInfo ? this._thisParent.catchInfo.value - this._model.lairdRoleInfo.catchCount : this._thisParent.catchInfo.value) + "/" + this._thisParent.catchInfo.value;
                this._value22.text = (this._model.lairdRoleInfo ? this._thisParent.interactInfo.value - this._model.lairdRoleInfo.interactCount : this._thisParent.interactInfo.value) + "/" + this._thisParent.interactInfo.value;
                this._value23.text = (this._model.lairdRoleInfo ? this._thisParent.rescueInfo.value - this._model.lairdRoleInfo.rescueCount : this._thisParent.rescueInfo.value) + "/" + this._thisParent.rescueInfo.value;
                var totalExp = 0;
                var curExp = 0;
                var list = this._model.coolyInfoList;
                for (var i = 0; i < list.length; i++) {
                    var coolyInfo = list[i];
                    var expInfo = LairdCVO.getExpInfoByLevel(coolyInfo.level);
                    if (expInfo) {
                        totalExp += Math.floor((coolyInfo.freeTimes - coolyInfo.catchTimes) / 60) * expInfo.exp;
                        // let totalWorkTime:number = Math.floor((new Date).getTime() / 1000) - coolyInfo.catchTimes;
                        // let workLeftTime:number = totalWorkTime - coolyInfo.pickSec;
                        // if(workLeftTime < 0) workLeftTime = 0;
                        curExp += Math.floor(coolyInfo.pickSec / 60) * expInfo.exp;
                    }
                }
                this._value24.text = StringUtils.getBigNum(curExp) + "/" + StringUtils.getBigNum(totalExp);
                break;
            case LairdStatusType.STATUS_COOLY:
                this._value31.text = (this._model.lairdRoleInfo ? this._thisParent.interactInfo.value - this._model.lairdRoleInfo.interactCount : this._thisParent.interactInfo.value) + "/" + this._thisParent.interactInfo.value;
                this._value32.text = (this._model.lairdRoleInfo ? this._thisParent.seekHelpInfo.value - this._model.lairdRoleInfo.seekHelpCount : this._thisParent.seekHelpInfo.value) + "/" + this._thisParent.seekHelpInfo.value;
                break;
        }
    };
    LandlordInfoView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._btn1:
                this._thisParent.changeItem(3);
                break;
            case this._btn2:
                // Manager.layer.panelDarkLayer.visible = false;
                // Manager.layer.uiLayer.visible = false;
                // Manager.layer.effectLayer.visible = false;
                Manager.view.hide(38 /* ClubPanel */);
                ObjectUtil.remove(Manager.layer.panelDarkLayer);
                ObjectUtil.remove(Manager.layer.uiLayer);
                ObjectUtil.remove(Manager.layer.effectLayer);
                Manager.control.getLaird().lairdFight(2, this._model.lordInfoList[0].id);
                break;
        }
    };
    LandlordInfoView.prototype.reuse = function (thisParent) {
        _super.prototype.reuse.call(this);
        this._thisParent = thisParent;
    };
    LandlordInfoView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._back, this._status0, this._status1, this._status2, this._value11, this._value12, this._value21, this._value22, this._value23, this._value24, this._value31, this._value32, this._btn1, this._btn2, this._desc);
        this._back = null;
        this._status0 = null;
        this._status1 = null;
        this._status2 = null;
        this._value11.dispose();
        this._value11 = null;
        this._value12.dispose();
        this._value12 = null;
        this._value21.dispose();
        this._value21 = null;
        this._value22.dispose();
        this._value22 = null;
        this._value23.dispose();
        this._value23 = null;
        this._value24.dispose();
        this._value24 = null;
        this._value31.dispose();
        this._value31 = null;
        this._value32.dispose();
        this._value32 = null;
        if (this._btn1)
            this._btn1.dispose();
        this._btn1 = null;
        if (this._btn2)
            this._btn2.dispose();
        this._btn2 = null;
        if (this._desc)
            this._desc.dispose();
        this._desc = null;
        this._statusList = null;
        if (this._bgImg)
            this._bgImg.dispose();
        this._bgImg = null;
        // if(this._roleImg)
        // 	this._roleImg.dispose();
        // this._roleImg = null;
        if (this._roleModel)
            this._roleModel.dispose();
        this._roleModel = null;
        if (this._rightDownImg)
            this._rightDownImg.dispose();
        this._rightDownImg = null;
        this._thisParent = null;
        this._model = null;
    };
    return LandlordInfoView;
}(UIComponent));
//# sourceMappingURL=LandlordInfoView.js.map