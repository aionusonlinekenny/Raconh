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
var BuffSelfListCMD = /** @class */ (function (_super) {
    __extends(BuffSelfListCMD, _super);
    function BuffSelfListCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.BUFF_SELF_LIST;
        return _this;
    }
    BuffSelfListCMD.prototype.receive = function (pi) {
        var self = Manager.model.self;
        var groupID;
        var buffLevel;
        var buff;
        var fromID;
        var count = pi.readShort();
        while (count-- > 0) {
            groupID = pi.readInt();
            buffLevel = pi.readByte();
            buff = self.getBuffById(groupID);
            if (buff == null) {
                buff = BuffCVO.getCVO(groupID, buffLevel);
                self.addBuff(buff);
            }
        }
    };
    return BuffSelfListCMD;
}(BaseCMD));
//# sourceMappingURL=BuffSelfListCMD.js.map