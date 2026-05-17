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
var RankModel = (function (_super) {
    __extends(RankModel, _super);
    function RankModel() {
        var _this = _super.call(this) || this;
        /*已膜拜的类型*/
        _this._worshipTypes = [];
        return _this;
    }
    Object.defineProperty(RankModel.prototype, "worshipTypes", {
        /*更新所有已膜拜类型*/
        set: function (value) {
            this._worshipTypes = value;
            this.dispatchEvent(new RankEvent(RankEvent.UPDATE_WORSHIP_LIST));
        },
        enumerable: true,
        configurable: true
    });
    /*添加已膜拜类型*/
    RankModel.prototype.addWorshipType = function (type) {
        this._worshipTypes.push(type);
        this.dispatchEvent(new RankEvent(RankEvent.UPDATE_WORSHIP_LIST));
    };
    /*是否已膜拜*/
    RankModel.prototype.hasWorship = function (type) {
        return this._worshipTypes.indexOf(type) != -1;
    };
    RankModel.prototype.checkCanWorship = function () {
        // for(let i:number=0; i<7; i++)
        // {
        //     if(this._worshipTypes.indexOf(i) == -1)
        //         return true;
        // }
        // return false;
        return this._worshipTypes.indexOf(RankConst.TYPE_POWER) == -1; //其它榜的膜拜已取消，只留战力榜，故只判断战力榜就行
    };
    return RankModel;
}(egret.EventDispatcher));
__reflect(RankModel.prototype, "RankModel");
//# sourceMappingURL=RankModel.js.map