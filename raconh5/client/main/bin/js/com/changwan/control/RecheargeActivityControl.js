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
 * 18.1.15
     * 充值活动Control
     */
var RecheargeActivityControl = /** @class */ (function (_super) {
    __extends(RecheargeActivityControl, _super);
    function RecheargeActivityControl() {
        var _this = _super.call(this) || this;
        _this._boo = false;
        return _this;
    }
    RecheargeActivityControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_RECHARGEACTIVITY_QUERY, RechargeActivityQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_RECHARGEACTIVITY_REWARD, RechargeActivityRewardCMD);
    };
    /**
     * 查询
     */
    RecheargeActivityControl.prototype.query = function (type) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_RECHARGEACTIVITY_QUERY);
        cmd.type = type;
        cmd.send();
    };
    RecheargeActivityControl.prototype.reward = function (id) {
        if (this._boo) {
            return;
        }
        this._boo = true;
        Manager.render.add(this.render, this, 800, 1);
        var cmd = Manager.socket.getCMD(Protocol.CMD_RECHARGEACTIVITY_REWARD);
        cmd.id = id;
        cmd.send();
    };
    RecheargeActivityControl.prototype.render = function (interval) {
        this._boo = false;
    };
    return RecheargeActivityControl;
}(BaseControl));
//# sourceMappingURL=RecheargeActivityControl.js.map