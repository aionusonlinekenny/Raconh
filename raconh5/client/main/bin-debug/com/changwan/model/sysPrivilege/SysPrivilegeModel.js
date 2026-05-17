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
 * pzx
 * 18.1.11
 */
var SysPrivilegeModel = (function (_super) {
    __extends(SysPrivilegeModel, _super);
    function SysPrivilegeModel() {
        var _this = _super.call(this) || this;
        /**剩余体验的时间 0未激活，大于０为时间，－１已过时*/
        _this._exp_Time = -1;
        _this._datas = [];
        var data = new SysPrivilegeInfo();
        data.id = SysprivilegeType.GOLD_CARD;
        data.fightImg = "sysprivilege_fight5888";
        data.kaImg = "sysprivilege_huangjinka_png";
        data.activeImg = "sysprivilege_28_png";
        data.animationPath = "";
        //会变的
        data.item2_itemImg = "sysprivilege_item2_png";
        data.item2_titleImg = "sysprivilege_title2_png";
        data.rmb = 28;
        _this._datas[0] = data;
        data = new SysPrivilegeInfo();
        data.id = SysprivilegeType.DIAMOND_CARD;
        data.fightImg = "sysprivilege_fight38888";
        data.kaImg = "sysprivilege_zuanshika_png";
        data.activeImg = "sysprivilege_188_png";
        data.animationPath = "";
        data.item2_itemImg = "sysprivilege_item_chongwu2_png";
        data.item2_titleImg = "sysprivilege_jueban_png";
        data.aniPath = "mochong7001";
        data.rmb = 188;
        _this._datas[1] = data;
        return _this;
    }
    SysPrivilegeModel.prototype.getdata = function (value) {
        return this._datas[value];
    };
    SysPrivilegeModel.prototype.getdata2 = function (type) {
        for (var i = 0; i < this._datas.length; i++) {
            if (this._datas[i].id == type)
                return this._datas[i];
        }
        return null;
    };
    /**
     * 服务端返回数据
     * @param id 特权id 已激活
     * @param 是否已领奖 1 已领
     */
    SysPrivilegeModel.prototype.updateData = function (id, reward) {
        for (var _i = 0, _a = this._datas; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.id == id) {
                info.setActive(); //有id就当激活
                info.setReward(reward);
            }
        }
        this.dispatchEvent(new SysPrivilegeEvent(SysPrivilegeEvent.SYSPRIVILEGE_UPDATE_EVENT));
    };
    /** 检测是否有奖励 */
    SysPrivilegeModel.prototype.checkReward = function () {
        for (var _i = 0, _a = this._datas; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.isActive) {
                if (!info.isreward) {
                    return true;
                }
            }
        }
        return false;
    };
    SysPrivilegeModel.prototype.expTime = function (value) {
        this._exp_Time = value;
        if (value > 0) {
            Manager.render.add(this.startTimer, this, 1000);
        }
    };
    /**剩余体验的时间 0未激活，大于０为时间，－１已过时*/
    SysPrivilegeModel.prototype.getExpTime = function () {
        return this._exp_Time;
    };
    SysPrivilegeModel.prototype.startTimer = function () {
        if (this._exp_Time > 0) {
            this._exp_Time--;
        }
        else {
            Manager.render.remove(this.startTimer, this);
            Manager.view.show(156 /* Sysprivilege_ExperienceView */, 2);
        }
        this.dispatchEvent(new SysPrivilegeEvent(SysPrivilegeEvent.SYSPRIVILEGE_EXP_TIME_EVENT));
    };
    return SysPrivilegeModel;
}(egret.EventDispatcher));
__reflect(SysPrivilegeModel.prototype, "SysPrivilegeModel");
//# sourceMappingURL=SysPrivilegeModel.js.map