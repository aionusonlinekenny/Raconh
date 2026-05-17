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
 * 排行榜控制器
 * luzhihong
 * create 2017-11-03
 */
var RankControl = (function (_super) {
    __extends(RankControl, _super);
    function RankControl() {
        return _super.call(this) || this;
    }
    RankControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.RANK_WORSHIP_LIST, RankWorshipListCMD);
        Manager.socket.addCMD(Protocol.RANK_WORSHIP, RankWorshipCMD);
        Manager.socket.addCMD(Protocol.RANK_LIST, RankListCMD);
    };
    /**
     * 膜拜
     * @param type:排行榜类型
     * @param id:第一名玩家
     * */
    RankControl.prototype.worship = function (type, id) {
        var cmd = Manager.socket.getCMD(Protocol.RANK_WORSHIP);
        cmd.type = type;
        cmd.id = id;
        cmd.send();
    };
    /**
     * 请求排行榜数据
     * @param type:排行榜类型
     * */
    RankControl.prototype.reqRankData = function (type) {
        var cmd = Manager.socket.getCMD(Protocol.RANK_LIST);
        cmd.type = type;
        cmd.send();
    };
    return RankControl;
}(BaseControl));
__reflect(RankControl.prototype, "RankControl");
//# sourceMappingURL=RankControl.js.map