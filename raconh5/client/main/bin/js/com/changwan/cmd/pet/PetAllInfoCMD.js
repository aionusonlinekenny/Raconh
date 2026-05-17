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
 * 宠物全部信息协议
 * liangyan
 * create 2017-12-18
*/
var PetAllInfoCMD = /** @class */ (function (_super) {
    __extends(PetAllInfoCMD, _super);
    function PetAllInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.PET_ALL_INFO;
        return _this;
    }
    PetAllInfoCMD.prototype.receive = function (pi) {
        var petModel = Manager.model.getPet();
        petModel.pinjie = pi.readShort();
        petModel.star = pi.readShort();
        petModel.starExp = pi.readInt();
        petModel.zzdUsed = pi.readInt();
        petModel.wxdUsed = pi.readInt();
        petModel.huanhuaID = pi.readShort();
        petModel.dispatchEvent(new PetEvent(PetEvent.ALL_INFO));
    };
    return PetAllInfoCMD;
}(BaseCMD));
//# sourceMappingURL=PetAllInfoCMD.js.map