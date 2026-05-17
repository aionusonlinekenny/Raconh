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
 * 互动界面2
 */
var LandlordInteractView2 = (function (_super) {
    __extends(LandlordInteractView2, _super);
    function LandlordInteractView2(thisParent) {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this._thisParent = thisParent;
        _this.skinName = Manager.path.getSkinName("landlord", "LandlordInteractViewSkin2");
        return _this;
    }
    LandlordInteractView2.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getLaird();
        if (this._bgImg == null) {
            this._bgImg = Manager.pool.create(BitmapRemote);
            this._back.addChild(this._bgImg);
            this._bgImg.load(Manager.path.getPanelLandlordPath("landlord_di2", "jpg"));
        }
        if (this._rightDownImg == null) {
            this._rightDownImg = Manager.pool.create(BitmapRemote);
            this._rightDownImg.x = -13;
            this._rightDownImg.y = 533;
            this._back.addChild(this._rightDownImg);
            this._rightDownImg.load(Manager.path.getPanelLandlordPath("landlord_kuang", "png"));
        }
    };
    LandlordInteractView2.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this._name.text = "Lv." + this._model.lordInfoList[0].level + " " + this._model.lordInfoList[0].name;
        this._clubName.text = LangCVO.getContent("laird13", this._model.lordInfoList[0].guildName);
        this._itemList = [this._btn1, this._btn2, this._btn3, this._btn4];
        this._itemNameList = [this._name1, this._name2, this._name3, this._name4];
        this._typeList = [];
        var list = LairdCVO.getInteractByType(2);
        for (var i = 0; i < list.length; i++) {
            this._itemNameList[i].text = list[i].name;
            this._typeList.push(list[i].id);
        }
        var awardInfo = LairdCVO.getAward(2);
        if (awardInfo) {
            var str = "";
            this._itemInfo = ItemsCVO.getCvo(awardInfo.award.baseId);
            if (this._itemInfo) {
                str = "<font color='" + this._itemInfo.colorStr + "'><u>" + awardInfo.award.name + "</u></font>" + " X " + awardInfo.award.num;
                HtmlUtil.setTextFlow(this._itemName, str);
            }
        }
        // this._itemName.text = awardInfo.award.name + " X " + awardInfo.award.num;
        this.interactInfo();
    };
    LandlordInteractView2.prototype.interactInfo = function () {
        this._value1.text = (this._thisParent.interactInfo.value - this._model.lairdRoleInfo.interactCount) + "/" + this._thisParent.interactInfo.value;
        var leftTime = this._model.lairdRoleInfo.interactTimes - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        if (leftTime <= 0)
            leftTime = 0;
        else
            Manager.render.add(this.timeHandler, this, 1000);
        this._time.text = cw.DateUtil.formatStr(leftTime, cw.DateUtil.LEFT_HH_MM_SS, true);
    };
    LandlordInteractView2.prototype.timeHandler = function () {
        var leftTime = this._model.lairdRoleInfo.interactTimes - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        if (leftTime < 0) {
            Manager.render.remove(this.timeHandler, this);
            return;
        }
        this._time.text = cw.DateUtil.formatStr(leftTime, cw.DateUtil.LEFT_HH_MM_SS, true);
    };
    LandlordInteractView2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.addEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.onInfoUpdateHandler, this);
        this._itemName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
    };
    LandlordInteractView2.prototype.removeEvent = function () {
        this._btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.removeEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.onInfoUpdateHandler, this);
        this._itemName.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    LandlordInteractView2.prototype.onClickItemHandler = function (e) {
        if (this._itemInfo) {
            Manager.view.show(9 /* ItemsTips */, this._itemInfo);
        }
    };
    LandlordInteractView2.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._btn1:
            case this._btn2:
            case this._btn3:
            case this._btn4:
                var leftTime = this._model.lairdRoleInfo.interactTimes - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
                if (leftTime > 0) {
                    FloatTips.addTips(LangCVO.getContent("laird10"), Color.RED);
                    return;
                }
                var index = this._itemList.indexOf(e.currentTarget);
                if (index != -1)
                    Manager.control.getLaird().lairdInteract(this._typeList[index], this._model.lordInfoList[0].id);
                break;
        }
    };
    LandlordInteractView2.prototype.onInfoUpdateHandler = function (e) {
        this.interactInfo();
    };
    LandlordInteractView2.prototype.reuse = function (thisParent) {
        _super.prototype.reuse.call(this);
        this._thisParent = thisParent;
    };
    LandlordInteractView2.prototype.dispose = function () {
        Manager.render.remove(this.timeHandler, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._back, this._value1, this._name, this._clubName, this._btn1, this._btn2, this._btn3, this._btn4, this._name1, this._name2, this._name3, this._name4, this._itemName, this._time, this._bgImg, this._rightDownImg);
        this._back = null;
        if (this._value1)
            this._value1.dispose();
        this._value1 = null;
        if (this._name)
            this._name.dispose();
        this._name = null;
        if (this._clubName)
            this._clubName.dispose();
        this._clubName = null;
        this._btn1 = null;
        this._btn2 = null;
        this._btn3 = null;
        this._btn4 = null;
        if (this._name1)
            this._name1.dispose();
        this._name1 = null;
        if (this._name2)
            this._name2.dispose();
        this._name2 = null;
        if (this._name3)
            this._name3.dispose();
        this._name3 = null;
        if (this._name4)
            this._name4.dispose();
        this._name4 = null;
        if (this._itemName)
            this._itemName.dispose();
        this._itemName = null;
        if (this._time)
            this._time.dispose();
        this._time = null;
        if (this._bgImg)
            this._bgImg.dispose();
        this._bgImg = null;
        if (this._rightDownImg)
            this._rightDownImg.dispose();
        this._rightDownImg = null;
        this._thisParent = null;
        this._model = null;
        this._itemList = null;
        this._itemNameList = null;
        this._typeList = null;
    };
    return LandlordInteractView2;
}(UIComponent));
__reflect(LandlordInteractView2.prototype, "LandlordInteractView2");
//# sourceMappingURL=LandlordInteractView2.js.map