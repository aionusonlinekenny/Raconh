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
 *author Anydo
 *create 2017-11-30
 *description
*/
var BuffSelfAddCMD = /** @class */ (function (_super) {
    __extends(BuffSelfAddCMD, _super);
    function BuffSelfAddCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.BUFF_SELF_ADD;
        return _this;
    }
    BuffSelfAddCMD.prototype.receive = function (pi) {
        var groupID = pi.readInt();
        var buffLevel = pi.readByte();
        var buff = Manager.model.self.getBuffById(groupID);
        if (buff == null) {
            buff = BuffCVO.getCVO(groupID, buffLevel);
            Manager.model.self.addBuff(buff);
        }
    };
    return BuffSelfAddCMD;
}(BaseCMD));
//# sourceMappingURL=BuffSelfAddCMD.js.map