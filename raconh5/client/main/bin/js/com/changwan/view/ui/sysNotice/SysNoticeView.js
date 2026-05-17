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
 * 17.12.18
 * 预告
 */
var SysNoticeView = /** @class */ (function (_super) {
    __extends(SysNoticeView, _super);
    function SysNoticeView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("sysnotice", "SysnoticeViewSkin");
        return _this;
    }
    SysNoticeView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getSysnotice();
        this._taskModel = Manager.model.getTask();
        this._currentView = Manager.pool.create(egret.DisplayObjectContainer);
        this._vScroller = new egret.ScrollView();
        this._vScroller.x = 25;
        this._vScroller.y = 121;
        this._vScroller.width = 690;
        this._vScroller.height = 861;
        this._vScroller.horizontalScrollPolicy = "off";
        this._vScroller.setContent(this._currentView);
        this.addChild(this._vScroller);
        this._vScroller.scrollSpeed = 0.01;
        //引导
        if (Manager.model.getGuide().curID == GuideID.SYS_NOTICE) {
            var pos = this._linchunBtn.parent.localToGlobal(this._linchunBtn.x, this._linchunBtn.y);
            Manager.control.getTask().showGuide(pos, this._linchunBtn.width >> 1, this._linchunBtn.height >> 1, this.guideCB, this, false);
        }
    };
    SysNoticeView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._currentView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
        this._linchunBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlinchunBtnChangeHandler, this);
        this._model.addEventListener(SysnoticeEvent.SYSNOTICE_UPDATE_REWARD_EVENT, this.setRedIconShow, this);
    };
    SysNoticeView.prototype.removeEvent = function () {
        this._currentView.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
        this._linchunBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onlinchunBtnChangeHandler, this);
        this._model.removeEventListener(SysnoticeEvent.SYSNOTICE_UPDATE_REWARD_EVENT, this.setRedIconShow, this);
        _super.prototype.removeEvent.call(this);
    };
    SysNoticeView.prototype.setRedIconShow = function (e) {
        var taskId = e.params;
        if (this._item.getCvo().taskId == taskId) {
            this._redIcon.visible = false;
            this._item.setReadIconShow(false);
            this._linchunBtn.visible = false;
            this._ilingquImg.visible = true;
            var i = this._list.indexOf(this._item);
            var item = this._list[i + 1];
            if (item)
                this.setItemStatus(item);
        }
        else {
            for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.getCvo().taskId == taskId) {
                    item.setReadIconShow(false);
                }
            }
        }
    };
    SysNoticeView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        if (this._model.getStsList()) {
            this.updateView();
        }
    };
    SysNoticeView.prototype.updateView = function () {
        var arr = this._model.getStsList();
        var ln = arr.length;
        var item;
        var boo = true;
        var rewardItem;
        if (this._list == null) {
            this._list = [];
        }
        for (var i = 0; i < ln; i++) {
            if (this._list[i] == null) {
                this._list[i] = Manager.pool.create(SysNoticItem);
                this._list[i].x = i % 4 * 170;
                this._list[i].y = Math.floor(i / 4) * 210;
                this._currentView.addChild(this._list[i]);
            }
            item = this._list[i];
            item.setData(arr[i]);
            if (boo) {
                if (arr[i].state == 0) {
                    if (Manager.model.getTask().getTaskIdComplete(arr[i].open_task_id)) {
                        rewardItem = item;
                        boo = false;
                    }
                }
            }
        }
        if (this._item == null) {
            if (rewardItem) {
                this.setItemStatus(rewardItem);
            }
            else
                this.setItemStatus(this._list[0]);
        }
    };
    SysNoticeView.prototype.onClickItemHandler = function (e) {
        var item = e.target;
        if (item instanceof SysNoticItem) {
            this.setItemStatus(item);
        }
    };
    SysNoticeView.prototype.setItemStatus = function (item) {
        if (this._item) {
            if (item == this._item)
                return;
            this._item.statusEffectImg(false);
        }
        item.statusEffectImg(true);
        this._item = item;
        var arr = this._item.getCvo().reward.split("|");
        for (var i = 0; i < arr.length; i++) {
            var j = i + 1;
            var good = this["_item" + j];
            if (arr[i] != "") {
                var loss = new GainLossVO(arr[i]);
                good.baseId = loss.baseId;
                good.count = loss.num;
            }
            else {
                good.clear();
            }
        }
        var scvo = this._item.getCvo();
        if (scvo.state == 1) {
            this._redIcon.visible = false;
            this._linchunBtn.visible = false;
            this._ilingquImg.visible = true;
        }
        else {
            this._redIcon.visible = this._taskModel.getTaskIdComplete(scvo.open_task_id);
            this._linchunBtn.visible = this._redIcon.visible;
            this._ilingquImg.visible = false;
        }
    };
    SysNoticeView.prototype.onlinchunBtnChangeHandler = function (e) {
        if (e != null && Manager.model.getGuide().curID == GuideID.SYS_NOTICE)
            return;
        Manager.control.getSysnotice().reward(this._item.getCvo().taskId);
        if (this._item.getCvo().panelId.length > 0) {
            Manager.link.linkStr(this._item.getCvo().panelId);
        }
    };
    SysNoticeView.prototype.guideCB = function () {
        this.onlinchunBtnChangeHandler(null);
        Manager.control.getTask().hideGuide();
    };
    SysNoticeView.prototype.dispose = function () {
        if (Manager.model.getGuide().curID == GuideID.SYS_NOTICE)
            Manager.control.getTask().hideGuide();
        _super.prototype.dispose.call(this);
        this._item = null;
        this._list.forEach(function (item, i) {
            Manager.pool.push(item);
        });
        this._list = null;
        Manager.pool.push(this._item1);
        this._item1 = null;
        Manager.pool.push(this._item2);
        this._item2 = null;
        this._linchunBtn.dispose();
        this._linchunBtn = null;
        this.removeChild(this._redIcon);
        this._redIcon = null;
        this.removeChild(this._vScroller);
        this._vScroller.removeContent();
        this._vScroller = null;
        Manager.pool.push(this._currentView);
        this._currentView = null;
        this._taskModel = null;
        this._model = null;
    };
    return SysNoticeView;
}(UIComponent));
//# sourceMappingURL=SysNoticeView.js.map