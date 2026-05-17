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
 * 已膜拜列表
 * luzhihong
 * create 2017-11-03
 */
var RankWorshipListCMD = /** @class */ (function (_super) {
    __extends(RankWorshipListCMD, _super);
    function RankWorshipListCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.RANK_WORSHIP_LIST;
        return _this;
    }
    RankWorshipListCMD.prototype.receive = function (pi) {
        // array('name' => 'worship_list', 'type' => 'arr', 'desc' => '已膜拜的排行榜类型', 'vars' => array(
        // 	array('name' => 'rank_type', 'type' => 'int16', 'desc' => '排行榜类型'),
        var len = pi.readShort();
        var types = [];
        while (len--) {
            types.push(pi.readShort());
        }
        Manager.model.getRank().worshipTypes = types;
    };
    return RankWorshipListCMD;
}(BaseCMD));
//# sourceMappingURL=RankWorshipListCMD.js.map