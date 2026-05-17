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
 * 宠物进阶协议
 * liangyan
 * create 2017-12-18
*/
var PetUpgradeCMD = (function (_super) {
    __extends(PetUpgradeCMD, _super);
    function PetUpgradeCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.PET_UPGRADE;
        return _this;
    }
    PetUpgradeCMD.prototype.receive = function (pi) {
        var petModel = Manager.model.getPet();
        petModel.pinjie = pi.readShort();
        petModel.star = pi.readShort();
        petModel.starExp = pi.readInt();
        petModel.dispatchEvent(new PetEvent(PetEvent.UPGRADE));
    };
    return PetUpgradeCMD;
}(BaseCMD));
__reflect(PetUpgradeCMD.prototype, "PetUpgradeCMD");
//# sourceMappingURL=PetUpgradeCMD.js.map