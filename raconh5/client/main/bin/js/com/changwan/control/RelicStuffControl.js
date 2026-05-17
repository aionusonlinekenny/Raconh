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
 * 18.3.9
     * 神器Control
     */
var RelicStuffControl = /** @class */ (function (_super) {
    __extends(RelicStuffControl, _super);
    function RelicStuffControl() {
        return _super.call(this) || this;
    }
    RelicStuffControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_RELICSTUFF_QUERY, RelicStuffQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_RELICSTUFF_ACTIVITY, RelicStuffActivityCMD);
    };
    /**
     * 查询
     */
    RelicStuffControl.prototype.query = function (type) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_RELICSTUFF_QUERY);
        cmd.send();
    };
    RelicStuffControl.prototype.activity = function (id, type) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_RELICSTUFF_ACTIVITY);
        cmd.id = id;
        cmd.type = type;
        cmd.send();
    };
    return RelicStuffControl;
}(BaseControl));
//# sourceMappingURL=RelicStuffControl.js.map