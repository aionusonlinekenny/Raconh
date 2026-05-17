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
 * 互动界面
 */
var LandlordInteractView = /** @class */ (function (_super) {
    __extends(LandlordInteractView, _super);
    function LandlordInteractView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("landlord", "LandlordInteractViewSkin");
        _this.visible = false;
        return _this;
    }
    LandlordInteractView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.visible = true;
        this._base.titleImg.source = "landlord_titleHudong_png";
        this._itemList = [this._btn1, this._btn2, this._btn3, this._btn4];
        this._itemNameList = [this._name1, this._name2, this._name3, this._name4];
        this.onResizeHandler();
    };
    LandlordInteractView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this._model = Manager.model.getLaird();
        this._typeList = [];
        var list = LairdCVO.getInteractByType(1);
        for (var i = 0; i < list.length; i++) {
            this._itemNameList[i].text = list[i].name;
            this._typeList.push(list[i].id);
        }
        var leftTime = this._model.lairdRoleInfo.interactTimes - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        if (leftTime <= 0)
            leftTime = 0;
        else
            Manager.render.add(this.timeHandler, this, 1000);
        this._time.text = cw.DateUtil.formatStr(leftTime, cw.DateUtil.LEFT_HH_MM_SS, true);
        var awardInfo = LairdCVO.getAward(1);
        if (awardInfo) {
            var str = "";
            this._itemInfo = ItemsCVO.getCvo(awardInfo.award.baseId);
            if (this._itemInfo) {
                str = "<font color='" + this._itemInfo.colorStr + "'><u>" + awardInfo.award.name + "</u></font>" + " X " + awardInfo.award.num;
                HtmlUtil.setTextFlow(this._itemName, str);
            }
        }
    };
    LandlordInteractView.prototype.timeHandler = function () {
        var leftTime = this._model.lairdRoleInfo.interactTimes - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        if (leftTime < 0) {
            Manager.render.remove(this.timeHandler, this);
            return;
        }
        this._time.text = cw.DateUtil.formatStr(leftTime, cw.DateUtil.LEFT_HH_MM_SS, true);
    };
    LandlordInteractView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._base.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._itemName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
    };
    LandlordInteractView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._base.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._itemName.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    LandlordInteractView.prototype.onClickItemHandler = function (e) {
        if (this._itemInfo) {
            Manager.view.show(9 /* ItemsTips */, this._itemInfo);
        }
    };
    LandlordInteractView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    LandlordInteractView.prototype.onClickHandler = function (e) {
        var target = e.currentTarget;
        switch (target) {
            case this._base.closeBtn:
                Manager.view.hide(90 /* LandlordInteractView */);
                break;
            case this._btn1:
            case this._btn2:
            case this._btn3:
            case this._btn4:
                var leftTime = this._model.lairdRoleInfo.interactTimes - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
                if (leftTime > 0) {
                    FloatTips.addTips(LangCVO.getContent("laird10"), Color.RED);
                    return;
                }
                var index = this._itemList.indexOf(target);
                if (index != -1)
                    Manager.control.getLaird().lairdInteract(this._typeList[index], this._info.id);
                Manager.view.hide(90 /* LandlordInteractView */);
                break;
        }
    };
    LandlordInteractView.prototype.show = function (info) {
        this._info = info;
        Manager.layer.tipsLayer.addChild(this);
    };
    LandlordInteractView.prototype.hide = function () {
        this.dispose();
    };
    LandlordInteractView.prototype.dispose = function () {
        Manager.render.remove(this.timeHandler, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._base, this._btn1, this._btn2, this._btn3, this._btn4, this._name1, this._name2, this._name3, this._name4, this._itemName, this._time);
        if (this._base)
            this._base.dispose();
        this._base = null;
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
        this._itemList = null;
        this._itemNameList = null;
        this._typeList = null;
        this._info = null;
    };
    return LandlordInteractView;
}(UIComponent));
//# sourceMappingURL=LandlordInteractView.js.map