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
 * 火眼金睛model
 * liangyan
 * create 2018-03-26
*/
var FireEyeModel = (function (_super) {
    __extends(FireEyeModel, _super);
    function FireEyeModel() {
        var _this = _super.call(this) || this;
        GameDispatcher.getInstance().addEventListener(GlobalEvent.CROSS_DAY_EVENT, _this.onCrossDayHandler, _this);
        _this.onCrossDayHandler(null);
        _this.fetchedRewards = [];
        _this._wrongTimes = 0;
        return _this;
    }
    FireEyeModel.prototype.onCrossDayHandler = function (e) {
        this.hasJoin = false;
    };
    Object.defineProperty(FireEyeModel.prototype, "wrongTimes", {
        /**当前错误次数 */
        get: function () { return this._wrongTimes; },
        set: function (value) {
            if (this._wrongTimes == value)
                return;
            var isAdd = this._wrongTimes < value;
            this._wrongTimes = value;
            var maxTimes = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_WRONG_TIMES).value;
            if (isAdd) {
                var banTime = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_BAN_HAND).value;
                var str = LangCVO.getContent("fireEye12", this._wrongTimes, maxTimes, Color.GREEN_STR_2, banTime);
                FloatTips.addTips(str, Color.RED);
            }
            if (this._wrongTimes == maxTimes) {
                if (Manager.control.getFireEye().banView != null) {
                    Manager.control.getFireEye().banView.dispose();
                    Manager.control.getFireEye().banView = null;
                }
                Manager.control.getFireEye().banView = new FireEyeBanView();
                Manager.view.getView(136 /* FireEyePanel */).addChild(Manager.control.getFireEye().banView);
            }
        },
        enumerable: true,
        configurable: true
    });
    return FireEyeModel;
}(egret.EventDispatcher));
__reflect(FireEyeModel.prototype, "FireEyeModel");
//# sourceMappingURL=FireEyeModel.js.map