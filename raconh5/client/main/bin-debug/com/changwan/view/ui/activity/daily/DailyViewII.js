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
 * 日常视图
 * luzhihong
 * create 2017-11-23
 */
var DailyViewII = (function (_super) {
    __extends(DailyViewII, _super);
    function DailyViewII() {
        var _this = _super.call(this) || this;
        _this._sItems = [];
        _this._model = Manager.model.getActivity();
        _this.skinName = Manager.path.getSkinName("activity", "DailyViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    DailyViewII.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        // 填充数据
        this._cvos = ActivityCVO.getCVOsType(1);
        this._back0.load(Manager.path.getActivityPath("activity_bg_0.png"));
        this._back1.load(Manager.path.getActivityPath("activity_bg_1.png"));
        this._list.initBtnListData(DailyItemII, null, true);
        this._list.itemList.layout.gap = -5;
        var sItem;
        var scheduleCVOs = ActivityScheduleCVO.getCVOs();
        for (var i = 3; i >= 0; i--) {
            sItem = new DailySceduleItem(scheduleCVOs[i], i == 0 ? 0 : scheduleCVOs[i - 1].value);
            sItem.x = 44 + i * 156;
            sItem.y = 989;
            this.addChild(sItem);
            this._sItems.push(sItem);
        }
    };
    DailyViewII.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(ActivityEvent.DAILY_UPDATE, this.updateDaily, this);
    };
    DailyViewII.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._model.removeEventListener(ActivityEvent.DAILY_UPDATE, this.updateDaily, this);
    };
    DailyViewII.prototype.updateDaily = function (e) {
        this.invalidate("drawList");
    };
    DailyViewII.prototype.drawList = function () {
        this._cvos.sort(function (cvo1, cvo2) {
            // if(cvo1.hasGet && !cvo2.hasGet) return 1;
            // if(!cvo1.hasGet && cvo2.hasGet) return -1;
            // if(cvo1.canGet && !cvo2.canGet) return -1;
            // if(!cvo1.canGet && cvo2.canGet) return 1;
            if (cvo1.isOpen && !cvo2.isOpen)
                return -1;
            if (!cvo1.isOpen && cvo2.isOpen)
                return 1;
            var iconCvo1 = DailyActivityCVO.getCVO(cvo1.id);
            var endTime1 = iconCvo1 ? iconCvo1.endTime : 0;
            var iconCvo2 = DailyActivityCVO.getCVO(cvo2.id);
            var endTime2 = iconCvo2 ? iconCvo2.endTime : 0;
            var todaySeconds = Manager.model.getLogin().serverTimeInfo.todaySeconds;
            if (endTime1 <= todaySeconds && endTime2 > todaySeconds)
                return -1; //活动1已结束，活动2未结束
            if (endTime1 > todaySeconds && endTime2 <= todaySeconds)
                return 1; //活动1未结束，活动2已结束
            return (cvo1.rank > cvo2.rank ? 1 : -1);
        });
        this._list.dataProvider(this._cvos);
    };
    DailyViewII.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawList"))
            this.drawList();
    };
    DailyViewII.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawList();
    };
    DailyViewII.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.dispose(this._list);
        this._model = null;
        this._list = null;
        for (var i = 0; i < 4; i++) {
            this._sItems[i].dispose();
        }
        this._sItems = null;
    };
    return DailyViewII;
}(UIComponent));
__reflect(DailyViewII.prototype, "DailyViewII");
//# sourceMappingURL=DailyViewII.js.map