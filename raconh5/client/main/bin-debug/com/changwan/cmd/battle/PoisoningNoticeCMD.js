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
 *author Anydo
 *create 2017-12-14
 *description
*/
var PoisoningNoticeCMD = (function (_super) {
    __extends(PoisoningNoticeCMD, _super);
    function PoisoningNoticeCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.POISONING_NOTICE;
        return _this;
    }
    PoisoningNoticeCMD.prototype.receive = function (pi) {
        var attackID = pi.readInt64();
        var attackedID = pi.readInt64();
        var hurtValue = pi.readInt();
        var attack = Manager.model.getGameobject().getGameObject(attackID);
        var attacked = Manager.model.getGameobject().getGameObject(attackedID);
        if (!attack.isSelfGO && !attacked.isSelfGO)
            return;
        var direction = attack ? PointUtil.getAngle(attack.x, attack.y, attacked.x, attacked.y) : 0;
        var sctType = (attacked.isType(GameObjectType.SELF)) ? SCTConst.TYPE_HURT : SCTConst.TYPE_SKILL;
        attacked.playSCT(sctType, hurtValue, direction);
    };
    return PoisoningNoticeCMD;
}(BaseCMD));
__reflect(PoisoningNoticeCMD.prototype, "PoisoningNoticeCMD");
//# sourceMappingURL=PoisoningNoticeCMD.js.map