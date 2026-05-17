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
 *create 2017-11-16
 *description
*/
var MapMonsterDeadCMD = (function (_super) {
    __extends(MapMonsterDeadCMD, _super);
    function MapMonsterDeadCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MAP_MONSTER_DEAD;
        return _this;
    }
    MapMonsterDeadCMD.prototype.receive = function (pi) {
        var id = pi.readInt(); //怪物ID
        var attackId = pi.readInt64(); //攻击者ID
        var beatBack = (pi.readByte() == 1); //是否死亡击飞
        var info = Manager.model.getGameobject().getMonsterGameObject(id);
        if (info) {
            info.playDeadAnimation(); //死亡特效
            if (info.cvo.deadNoHide)
                return; //配置怪物死亡不消失时，不执行，由AliveFlag移除info
            Manager.model.getGameobject().removeGameObject(info);
        }
    };
    return MapMonsterDeadCMD;
}(BaseCMD));
__reflect(MapMonsterDeadCMD.prototype, "MapMonsterDeadCMD");
//# sourceMappingURL=MapMonsterDeadCMD.js.map