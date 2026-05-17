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
 * 复活面板信息协议
 * liangyan
 * create 2017-12-06
*/
var ReviveInfoCMD = /** @class */ (function (_super) {
    __extends(ReviveInfoCMD, _super);
    function ReviveInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.REVIVE_INFO;
        return _this;
    }
    ReviveInfoCMD.prototype.receive = function (pi) {
        var serverID = pi.readInt();
        var id = pi.readInt64();
        var name = pi.readUTF();
        var fight = pi.readInt();
        var mapID = Manager.model.getMap().getId();
        var map = MapCVO.getCVO(mapID);
        if (!map)
            return;
        if (map.reliveType == ReviveType.FREE_CD)
            Manager.view.show(34 /* ReviveCDView */, map.reliveTime);
        else
            Manager.view.show(35 /* ReviveChooseView */, serverID, name, fight);
    };
    return ReviveInfoCMD;
}(BaseCMD));
//# sourceMappingURL=ReviveInfoCMD.js.map