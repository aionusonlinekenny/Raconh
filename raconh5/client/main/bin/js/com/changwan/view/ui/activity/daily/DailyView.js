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
var DailyView = /** @class */ (function (_super) {
    __extends(DailyView, _super);
    function DailyView() {
        var _this = _super.call(this) || this;
        _this._sItems = [];
        _this._model = Manager.model.getActivity();
        _this.skinName = Manager.path.getSkinName("activity", "DailyViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    DailyView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        // 填充数据
        this._cvos = ActivityCVO.getCVOsType(0);
        this._back0.load(Manager.path.getActivityPath("activity_bg_0.png"));
        this._back1.load(Manager.path.getActivityPath("activity_bg_1.png"));
        this._list.initBtnListData(DailyItem, null, true);
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
    DailyView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(ActivityEvent.DAILY_UPDATE, this.updateDaily, this);
    };
    DailyView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._model.removeEventListener(ActivityEvent.DAILY_UPDATE, this.updateDaily, this);
    };
    DailyView.prototype.updateDaily = function (e) {
        this.invalidate("drawList");
    };
    DailyView.prototype.drawList = function () {
        this._cvos.sort(function (a, b) {
            if (a.hasGet && !b.hasGet)
                return 1;
            if (!a.hasGet && b.hasGet)
                return -1;
            if (a.canGet && !b.canGet)
                return -1;
            if (!a.canGet && b.canGet)
                return 1;
            if (a.isOpen && !b.isOpen)
                return -1;
            if (!a.isOpen && b.isOpen)
                return 1;
            return (a.rank > b.rank ? 1 : -1);
        });
        this._list.dataProvider(this._cvos);
    };
    DailyView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawList"))
            this.drawList();
    };
    DailyView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawList();
        //引导
        if (Manager.model.getGuide().curID == GuideID.YAN_WU && this._list != null) {
            // this._list.itemList.addEventListener(eui.UIEvent.ADDED, this.onAddHandler, this);
            for (var i = 0; i < this._cvos.length; i++) {
                if (this._cvos[i].id == ActivityCVO.ID_YANWU) {
                    this._list.scroller.validateNow();
                    this._list.scroller.viewport.scrollV = i * 140;
                    this._list.scroller.addEventListener(eui.UIEvent.CHANGE_START, this.onChangeHandler, this);
                    break;
                }
            }
        }
    };
    DailyView.prototype.onChangeHandler = function (e) {
        Manager.control.getTask().hideGuide();
    };
    DailyView.prototype.dispose = function () {
        if (Manager.model.getGuide().curID == GuideID.YAN_WU) {
            Manager.control.getTask().hideGuide();
            this._list.scroller.removeEventListener(eui.UIEvent.CHANGE_START, this.onChangeHandler, this);
        }
        _super.prototype.dispose.call(this);
        ObjectUtil.dispose(this._list);
        this._model = null;
        this._list = null;
        for (var i = 0; i < 4; i++) {
            this._sItems[i].dispose();
        }
        this._sItems = null;
    };
    return DailyView;
}(UIComponent));
//# sourceMappingURL=DailyView.js.map