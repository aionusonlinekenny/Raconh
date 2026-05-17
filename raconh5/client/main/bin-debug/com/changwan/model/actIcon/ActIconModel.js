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
 * 活动图标model
 * liangyan
 * create 2017-12-21
*/
var ActIconModel = (function (_super) {
    __extends(ActIconModel, _super);
    function ActIconModel() {
        var _this = _super.call(this) || this;
        // this._noticeIDs = [];
        _this._showIDs = [];
        _this.addEvent();
        var cvos = DailyActivityCVO.getAlwaysShowCVOs();
        var cvo;
        for (var i = 0; i < cvos.length; i++) {
            cvo = cvos[i];
            _this.addID(cvo.id);
        }
        return _this;
    }
    ActIconModel.prototype.addEvent = function () {
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.onUpdateHandler, this);
        Manager.model.getTask().addEventListener(TaskEvent.TASK_UPDATE_EVENT, this.onUpdateHandler, this);
        Manager.model.getTask().addEventListener(TaskEvent.TASK_INIT_EVENT, this.onUpdateHandler, this);
        //GameDispatcher.getInstance().addEventListener(GlobalEvent.CROSS_DAY_EVENT, this.onUpdateHandler, this);
    };
    ActIconModel.prototype.onUpdateHandler = function (e) {
        var cvo;
        var cvos = DailyActivityCVO.getShowCVO(DailyActivityCVO.SHOW_TYPE_NOTICE);
        for (var i = 0; i < cvos.length; i++) {
            cvo = cvos[i];
            if (!this.hasAdd(cvo.id))
                this.addID(cvo.id);
        }
        cvos = DailyActivityCVO.getShowCVO(DailyActivityCVO.SHOW_TYPE_YUNYING);
        for (var i = 0; i < cvos.length; i++) {
            cvo = cvos[i];
            if (!this.hasAdd(cvo.id))
                this.addID(cvo.id);
        }
    };
    Object.defineProperty(ActIconModel.prototype, "showIDs", {
        get: function () {
            return this._showIDs;
        },
        enumerable: true,
        configurable: true
    });
    ActIconModel.prototype.hasAdd = function (id) {
        return this._showIDs.indexOf(id) != -1;
    };
    ActIconModel.prototype.removeID = function (id) {
        var index = this._showIDs.indexOf(id);
        if (index != -1) {
            this._showIDs.splice(index, 1);
            var cvo = DailyActivityCVO.getCVO(id);
            if (cvo && cvo.type == DailyActivityCVO.SHOW_TYPE_NOTICE)
                Manager.model.getLogin().home.updateIcon(ActivityIcon.RIGHT, cvo, true);
            else if (cvo && cvo.type == DailyActivityCVO.SHOW_TYPE_YUNYING)
                Manager.model.getLogin().home.updateIcon(ActivityIcon.TOP, cvo, true);
            //提前出现下一活动图标
            if (cvo.nextID > 0) {
                cvo = DailyActivityCVO.getCVO(cvo.nextID);
                if (cvo)
                    this.addID(cvo.id);
            }
        }
    };
    ActIconModel.prototype.addID = function (id) {
        if (!this.hasAdd(id)) {
            this._showIDs.push(id);
            var cvo = DailyActivityCVO.getCVO(id);
            if (cvo && cvo.type == DailyActivityCVO.SHOW_TYPE_NOTICE) {
                Manager.model.getLogin().home.updateIcon(ActivityIcon.RIGHT, cvo, false);
            }
            else if (cvo && cvo.type == DailyActivityCVO.SHOW_TYPE_YUNYING) {
                Manager.model.getLogin().home.updateIcon(ActivityIcon.TOP, cvo, false);
            }
        }
    };
    /**根据类型返回正在进行的活动cvo */
    ActIconModel.prototype.getIDByType = function (actType) {
        var len = this._showIDs != null ? this._showIDs.length : 0;
        var cvo;
        for (var i = len - 1; i >= 0; i--) {
            cvo = DailyActivityCVO.getCVO(this._showIDs[i]);
            if (cvo && cvo.actType == actType)
                return cvo;
        }
        return null;
    };
    return ActIconModel;
}(egret.EventDispatcher));
__reflect(ActIconModel.prototype, "ActIconModel");
//# sourceMappingURL=ActIconModel.js.map