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
 * 火眼金睛请求对手数据
 * liangyan
 * create 2018-03-27
*/
var FireEyeAskDataCMD = /** @class */ (function (_super) {
    __extends(FireEyeAskDataCMD, _super);
    function FireEyeAskDataCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FIRE_EYE_ENEMY_DATA;
        return _this;
    }
    FireEyeAskDataCMD.prototype.receive = function (pi) {
        var count = pi.readShort();
        var info;
        while (count > 0) {
            info = new FireEyeEnemyInfo();
            info.id = pi.readInt64();
            info.name = pi.readUTF();
            info.career = pi.readByte();
            info.score = pi.readInt();
            if (info.id != Manager.model.self.id)
                Manager.model.getFireEye().enemyInfo = info;
            else
                Manager.model.getFireEye().myInfo = info;
            count--;
        }
    };
    return FireEyeAskDataCMD;
}(BaseCMD));
//# sourceMappingURL=FireEyeAskDataCMD.js.map