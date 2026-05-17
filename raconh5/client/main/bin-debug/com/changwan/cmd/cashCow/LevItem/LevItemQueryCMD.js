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
 * 18.1.25
 * 冲级好礼查询
 *  */
var LevItemQueryCMD = (function (_super) {
    __extends(LevItemQueryCMD, _super);
    function LevItemQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_LEVITEM_QUERY;
        return _this;
    }
    LevItemQueryCMD.prototype.receive = function (ip) {
        var ln = ip.readShort();
        for (var i = 0; i < ln; i++) {
            var id = ip.readByte();
            var reward = ip.readByte();
            var num = ip.readShort();
            LevItemCVO.setCount(id, reward, num);
        }
        var act = ip.readByte();
        Manager.model.getcashCow().levItemModel.query(act);
    };
    return LevItemQueryCMD;
}(BaseCMD));
__reflect(LevItemQueryCMD.prototype, "LevItemQueryCMD");
//# sourceMappingURL=LevItemQueryCMD.js.map