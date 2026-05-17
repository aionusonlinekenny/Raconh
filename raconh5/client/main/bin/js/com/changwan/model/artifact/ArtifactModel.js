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
 * create 18.2.8
 * 寻宝model
 *  */
var ArtifactModel = /** @class */ (function (_super) {
    __extends(ArtifactModel, _super);
    function ArtifactModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //珍希列表
        _this._itemList = [];
        //玩家积分
        _this._integral = 0;
        //n已寻宝10的次数
        _this._isTen_count = 0;
        /** 珍希珍表最大取15条数据 */
        _this.MAX_NUM = 15;
        return _this;
    }
    ArtifactModel.prototype.query = function (arr, value, value2) {
        this._itemList = arr;
        this._integral = value;
        this._isTen_count = value2;
        this.dispatchEvent(new ArtifactEvent(ArtifactEvent.ARTIFACT_QUERY_EVENT));
    };
    ArtifactModel.prototype.hunting = function (info) {
        this._itemList.push(info);
        if (this._itemList.length > this.MAX_NUM) {
            this._itemList.pop();
        }
    };
    ArtifactModel.prototype.setIntegral = function (value, count) {
        this._integral = value;
        this._isTen_count = count;
        this.dispatchEvent(new ArtifactEvent(ArtifactEvent.ARTIFACT_INTEGRAL_EVENT));
    };
    /** 积分领奖 */
    ArtifactModel.prototype.integralReward = function () {
        this.dispatchEvent(new ArtifactEvent(ArtifactEvent.ARTIFACT_REWARD_EVENT));
    };
    ArtifactModel.prototype.selfLog = function (arr) {
        this._selfList = arr;
        this.dispatchEvent(new ArtifactEvent(ArtifactEvent.ARTIFACT_LOG_EVENT));
    };
    ArtifactModel.prototype.getItemList = function () {
        if (this._itemList.length < this.MAX_NUM) {
            //不足15条数据
            this.createArtifactInfo();
        }
        return this._itemList;
    };
    ArtifactModel.prototype.createArtifactInfo = function () {
        var any = { 0: { name: "轩辕公山", baseid: 40000804 },
            1: { name: "太史刀狂", baseid: 40000814 },
            2: { name: "钟离真人", baseid: 40000803 },
            3: { name: "武当三疯", baseid: 40000808 },
            4: { name: "少林真仙", baseid: 40000813 },
            5: { name: "左丘渭闾", baseid: 40000818 },
            6: { name: "东郭千里", baseid: 40000804 },
            7: { name: "义薄云天", baseid: 40000814 },
            8: { name: "丐帮乔主", baseid: 40000803 },
            9: { name: "慕容飞鸿", baseid: 40000808 },
            10: { name: "花谢花飞", baseid: 40000813 },
            11: { name: "入梦语嫣", baseid: 40000818 },
            12: { name: "南门飞燕", baseid: 40000804 },
            13: { name: "三生若曦", baseid: 40000814 },
            14: { name: "司空星儿", baseid: 40000803 }
        };
        var ln = this.MAX_NUM - this._itemList.length;
        for (var i = 0; i < ln; i++) {
            var info = new ArtifactLogInfo();
            var obj = any[i];
            info.name = obj.name;
            info.base_id = obj.baseid;
            this._itemList.push(info);
        }
    };
    /** 玩家当前积分 */
    ArtifactModel.prototype.getIntegral = function () {
        return this._integral;
    };
    /**已寻宝10的次数 */
    ArtifactModel.prototype.getTenCount = function () {
        return this._isTen_count;
    };
    /** 个人信息记录 */
    ArtifactModel.prototype.getSelfList = function () {
        return this._selfList;
    };
    return ArtifactModel;
}(egret.EventDispatcher));
//# sourceMappingURL=ArtifactModel.js.map