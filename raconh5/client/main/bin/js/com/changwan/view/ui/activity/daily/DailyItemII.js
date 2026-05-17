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
 * luzhihong
 * create 2017-3-21
 */
var DailyItemII = /** @class */ (function (_super) {
    __extends(DailyItemII, _super);
    function DailyItemII() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("activity", "DailyItemSkinII");
        return _this;
    }
    DailyItemII.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.addEvent();
        this._btnAdd.visible = false;
    };
    DailyItemII.prototype.dataChanged = function () {
        this._cvo = this.data;
        this._icon.load(Manager.path.getActivityPath("activity_icon/" + this._cvo.id + ".png"));
        this._txtDesc.text = this._cvo.description;
        this._txtTime.text = this._cvo.timeDesc;
        this._txtValue0.text = LangCVO.getContent("activity8") + this._cvo.value; //8	活跃：x
        this._txtValue1.text = LangCVO.getContent("activity9") + this._cvo.gain.num; //9	盟贡：x
        this.updateDaily();
        // this.actUpdate();
    };
    DailyItemII.prototype.addEvent = function () {
        // this._model.addEventListener(ActivityEvent.DAILY_UPDATE, this.updateDaily, this);
        // Manager.model.getActIcon().addEventListener(ActIconEvent.SINGLE_UPDATE,  this.actUpdate, this);
        // Manager.model.getActIcon().addEventListener(ActIconEvent.LIST_UPDATE,  this.actUpdate, this);
        this._btn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    DailyItemII.prototype.removeEvent = function () {
        // this._model.removeEventListener(ActivityEvent.DAILY_UPDATE, this.updateDaily, this);
        // Manager.model.getActIcon().removeEventListener(ActIconEvent.SINGLE_UPDATE,  this.actUpdate, this);
        // Manager.model.getActIcon().removeEventListener(ActIconEvent.LIST_UPDATE,  this.actUpdate, this);
        this._btn0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnAdd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    DailyItemII.prototype.updateDaily = function (e) {
        if (e === void 0) { e = null; }
        if (this._cvo == null)
            return;
        var iconCVO = DailyActivityCVO.getCVO(this._cvo.iconID);
        this._isInTime = iconCVO.isInTime;
        if (this._isInTime)
            this._txtTime.textColor = Color.GREEN;
        else if (iconCVO.endTime <= Manager.model.getLogin().serverTimeInfo.todaySeconds)
            this._txtTime.textColor = Color.RED;
        else
            this._txtTime.textColor = Color.DEF;
        this._txtCount.text = this._cvo.finishCount + "/" + this._cvo.need;
        if (this._cvo.hasGet) {
            this._btn0.visible = false;
            this._btn1.visible = false;
            this._btnLabel.source = "commony_ilingqu_png";
        }
        else if (this._cvo.canGet) {
            this._btn0.visible = false;
            this._btn1.visible = true;
            this._btnLabel.source = "common_label_lingqu_0_png";
        }
        else if (this._cvo.isOpen /*this._isInTime*/) {
            this._btn0.visible = true;
            this._btn1.visible = false;
            this._btnLabel.source = "common_label_qianwang_png";
        }
        else {
            this._btn0.visible = false;
            this._btn1.visible = false;
            this._btnLabel.source = "common_label_not_open_png";
        }
    };
    // private actUpdate(e:ActIconEvent = null):void
    // {
    //     let iconCVO:DailyActivityCVO = DailyActivityCVO.getCVO(this._cvo.iconID);
    //     if(iconCVO.isInTime) this._txtTime.textColor = Color.GREEN;
    //     else if(iconCVO.endTime < 1) this._txtTime.textColor = Color.RED;
    //     else this._txtTime.textColor = Color.DEF;
    // }
    DailyItemII.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._btn0:
            case this._btn1:
                if (this._cvo.hasGet)
                    return;
                else if (!this._cvo.canGet) {
                    if (!this._isInTime) {
                        FloatTips.addTips(LangCVO.getContent("activity10")); //活动未开启
                    }
                    else if (this._cvo.linkArr.length > 1) {
                        var type = parseInt(this._cvo.linkArr[1]);
                        if (type != LinkType.GOTO_NPC)
                            Manager.link.link(type, this._cvo.linkArr.slice(2));
                        else if (Manager.model.self.canJoinActive(true)) {
                            Manager.link.link(type, this._cvo.linkArr.slice(2));
                            Manager.view.hide(10 /* ActivityPanel */);
                        }
                    }
                }
                else
                    Manager.control.getActivity().getDailyRewards(this._cvo.id);
                break;
            case this._btnAdd:
                this.buyCount();
                break;
        }
    };
    DailyItemII.prototype.buyCount = function () {
        // switch(this._cvo.iconID == ActIconID)
        // {
        // }
    };
    DailyItemII.prototype.dispose = function () {
        this.removeEvent();
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._icon, this._txtDesc, this._txtCount, this._txtTime, this._txtValue0, this._txtValue1, this._btn0, this._btn1);
        ObjectUtil.removes(this._back, this._btnAdd, this._btnLabel);
        this._cvo = null;
        this._back = null;
        this._icon = null;
        this._btnAdd = null;
        this._btn0 = null;
        this._btn1 = null;
        this._btnLabel = null;
        this._txtDesc = null;
        this._txtCount = null;
        this._txtTime = null;
        this._txtValue0 = null;
        this._txtValue1 = null;
    };
    return DailyItemII;
}(ItemRenderer));
//# sourceMappingURL=DailyItemII.js.map