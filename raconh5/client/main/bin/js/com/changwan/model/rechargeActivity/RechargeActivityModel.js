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
 * 18.1.20
 * 充值活动model
 */
var RechargeActivityModel = /** @class */ (function (_super) {
    __extends(RechargeActivityModel, _super);
    function RechargeActivityModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //活动剩余时间列表
        _this._timeLists = [];
        //充值额度例表
        _this._moneyLists = [];
        return _this;
    }
    RechargeActivityModel.prototype.quperTypeList = function (type) {
        Manager.control.getRecheargeActivity().query(type);
        // if(this._timeLists[type]==null)
        // {
        //     Manager.control.getRecheargeActivity().query(type);
        //     return;
        // }
        // this.dispatchEvent(new RechargeActivityEvent(RechargeActivityEvent.RECHARGEACTIVITY_QUERY_EVENT));
    };
    /** type活动类型1：单笔充值 2：今日累充3：累计充值 ，time 活动剩余时间，array:充值额度例表长度为0侧未充值，[any[id]=已领取次数]*/
    RechargeActivityModel.prototype.queryList = function (type, time, array, any) {
        this._timeLists[type] = time;
        this._moneyLists[type] = array;
        RechargeActivityCVO.setListinfo(any);
        RechargeActivityCVO.setmoneyInfo(type, array);
        this.dispatchEvent(new RechargeActivityEvent(RechargeActivityEvent.RECHARGEACTIVITY_QUERY_EVENT));
    };
    RechargeActivityModel.prototype.returnReward = function (id) {
        RechargeActivityCVO.setCurent(id);
        this.dispatchEvent(new RechargeActivityEvent(RechargeActivityEvent.RECHARGEACTIVITY_UPDATE_EVENT, id));
    };
    /** 活动剩余时间 */
    RechargeActivityModel.prototype.getTime = function (type) {
        if (this._timeLists[type]) {
            return this._timeLists[type];
        }
        return 0;
    };
    /**充值额度例表 */
    RechargeActivityModel.prototype.getMoney = function (type) {
        if (this._moneyLists[type]) {
            return this._moneyLists[type];
        }
        return [];
    };
    /** 获得活动开放的列表 */
    RechargeActivityModel.prototype.getTitleTabList = function () {
        this._cvoList = new Dictionary();
        var btnDatas = [];
        var boo;
        if (this.setTitleTob(RechargeActivityType.RECHARGEACTIVITY_SINGLE_TYPE) > 0) {
            boo = this.checkReward(RechargeActivityType.RECHARGEACTIVITY_SINGLE_TYPE);
            btnDatas.push({ showRedIcon: boo, bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rechargeActivity_bottom_1_png", imgClick: "rechargeActivity_bottom_1_png", type: RechargeActivityType.RECHARGEACTIVITY_SINGLE_TYPE });
        }
        if (this.setTitleTob(RechargeActivityType.RECHARGEACTIVITY_TODAY_TYPE) > 0) {
            boo = this.checkReward(RechargeActivityType.RECHARGEACTIVITY_TODAY_TYPE);
            btnDatas.push({ showRedIcon: boo, bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rechargeActivity_bottom_2_png", imgClick: "rechargeActivity_bottom_2_png", type: RechargeActivityType.RECHARGEACTIVITY_TODAY_TYPE });
        }
        if (this.setTitleTob(RechargeActivityType.RECHARGEACTIVITY_TOTAL_TYPE) > 0) {
            boo = this.checkReward(RechargeActivityType.RECHARGEACTIVITY_TOTAL_TYPE);
            btnDatas.push({ showRedIcon: boo, bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rechargeActivity_bottom_3_png", imgClick: "rechargeActivity_bottom_3_png", type: RechargeActivityType.RECHARGEACTIVITY_TOTAL_TYPE });
        }
        return btnDatas;
    };
    RechargeActivityModel.prototype.setTitleTob = function (type) {
        var arr = RechargeActivityCVO.getCvos(type);
        if (arr.length > 0) {
            this._cvoList.add(type, arr);
        }
        return arr.length;
    };
    RechargeActivityModel.prototype.getCvoList = function (type) {
        var arr = this._cvoList.get(type);
        return arr;
    };
    /**检测是否有可领奖 true为有 */
    RechargeActivityModel.prototype.checkReward = function (type) {
        var arr = this._cvoList.get(type);
        if (arr && arr.length > 0) {
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var cvo = arr_1[_i];
                if (cvo.num > 0) {
                    return true;
                }
            }
        }
        return false;
    };
    return RechargeActivityModel;
}(egret.EventDispatcher));
//# sourceMappingURL=RechargeActivityModel.js.map