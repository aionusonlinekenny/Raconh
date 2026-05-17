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
 * 日常单个任务
 * luzhihong
 * create 2017-11-23
 */
var DailyItem = (function (_super) {
    __extends(DailyItem, _super);
    function DailyItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("activity", "DailyItemSkin");
        return _this;
    }
    DailyItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._txtValue0.text = LangCVO.getContent("activity1");
        this.addEvent();
    };
    DailyItem.prototype.dataChanged = function () {
        this._cvo = this.data;
        this._icon.load(Manager.path.getActivityPath("activity_icon/" + this._cvo.id + ".png"));
        this._txtDesc.text = this._cvo.description;
        this._txtValue0.text = LangCVO.getContent("activity8") + this._cvo.value; //8	活跃：x
        this._txtValue1.text = LangCVO.getContent("activity9") + this._cvo.gain.num; //9	盟贡：x
        this.updateDaily();
        //引导
        if (Manager.model.getGuide().curID == GuideID.YAN_WU && this._cvo != null && this._cvo.id == ActivityCVO.ID_YANWU) {
            var pos = this._btn0.parent.localToGlobal(this._btn0.x, this._btn0.y);
            Manager.control.getTask().showGuide(pos, this._btn0.width >> 1, this._btn0.height >> 1, this.guideCB, this, false);
        }
    };
    DailyItem.prototype.guideCB = function () {
        this.onClickHandler(null);
        Manager.control.getTask().hideGuide();
    };
    DailyItem.prototype.addEvent = function () {
        // this._model.addEventListener(ActivityEvent.DAILY_UPDATE, this.updateDaily, this);
        this._btn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    DailyItem.prototype.removeEvent = function () {
        // this._model.removeEventListener(ActivityEvent.DAILY_UPDATE, this.updateDaily, this);
        this._btn0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    DailyItem.prototype.updateDaily = function (e) {
        if (e === void 0) { e = null; }
        if (this._cvo == null)
            return;
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
        else if (this._cvo.isOpen) {
            this._btn0.visible = true;
            this._btn1.visible = false;
            this._btnLabel.source = "common_label_qianwang_png";
        }
        else {
            this._btn0.visible = false;
            this._btn1.visible = false;
            this._btnLabel.source = "common_label_not_open_png";
        }
        this._txtCount.text = this._cvo.finishCount + "/" + this._cvo.need;
        // HtmlUtil.setTextFlow(this._txtDesc, this._cvo.description + cw.StringUtil.format("（{0}/{1}）",[this._cvo.finishCount, this._cvo.need]));
    };
    DailyItem.prototype.onClickHandler = function (e) {
        if (e != null && Manager.model.getGuide().curID == GuideID.YAN_WU && this._cvo != null && this._cvo.id == ActivityCVO.ID_YANWU)
            return;
        if (this._cvo.hasGet) {
            return;
        }
        else if (this._cvo.canGet) {
            Manager.control.getActivity().getDailyRewards(this._cvo.id);
        }
        else {
            if (this._cvo.linkArr.length > 1) {
                var type = parseInt(this._cvo.linkArr[1]);
                if (type != LinkType.GOTO_NPC)
                    Manager.link.link(type, this._cvo.linkArr.slice(2));
                else if (Manager.model.self.canJoinActive(true)) {
                    Manager.link.link(type, this._cvo.linkArr.slice(2));
                    Manager.view.hide(10 /* ActivityPanel */);
                }
            }
        }
    };
    DailyItem.prototype.dispose = function () {
        this.removeEvent();
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._icon, this._txtDesc, this._txtCount, this._txtValue0, this._txtValue1, this._btn0, this._btn1);
        ObjectUtil.removes(this._back, this._btnLabel);
        this._cvo = null;
        this._back = null;
        this._icon = null;
        this._txtDesc = null;
        this._txtCount = null;
        this._txtValue0 = null;
        this._txtValue1 = null;
        this._btn0 = null;
        this._btn1 = null;
        this._btnLabel = null;
    };
    return DailyItem;
}(ItemRenderer));
__reflect(DailyItem.prototype, "DailyItem");
//# sourceMappingURL=DailyItem.js.map