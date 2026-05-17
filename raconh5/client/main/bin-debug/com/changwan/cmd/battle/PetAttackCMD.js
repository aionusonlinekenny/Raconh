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
 * 宠物攻击协议
 * liangyan
 * create 2017-12-29
*/
var PetAttackCMD = (function (_super) {
    __extends(PetAttackCMD, _super);
    function PetAttackCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.PET_ATTACK;
        return _this;
    }
    PetAttackCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.skillID);
        pkg.writeInt64(this.targetID);
    };
    return PetAttackCMD;
}(BaseCMD));
__reflect(PetAttackCMD.prototype, "PetAttackCMD");
//# sourceMappingURL=PetAttackCMD.js.map