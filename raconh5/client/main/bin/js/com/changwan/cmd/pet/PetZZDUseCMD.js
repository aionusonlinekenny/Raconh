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
 * 宠物资质丹使用协议
 * liangyan
 * create 2017-12-18
*/
var PetZZDUseCMD = /** @class */ (function (_super) {
    __extends(PetZZDUseCMD, _super);
    function PetZZDUseCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.PET_ZZD_USE;
        return _this;
    }
    PetZZDUseCMD.prototype.receive = function (pi) {
        var petModel = Manager.model.getPet();
        petModel.zzdUsed = pi.readInt();
        petModel.dispatchEvent(new PetEvent(PetEvent.ZZD_USE));
    };
    return PetZZDUseCMD;
}(BaseCMD));
//# sourceMappingURL=PetZZDUseCMD.js.map