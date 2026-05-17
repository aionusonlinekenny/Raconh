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
 *create 2017-11-30
 *description
*/
var BuffMapAddCMD = (function (_super) {
    __extends(BuffMapAddCMD, _super);
    function BuffMapAddCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.BUFF_MAP_ADD;
        return _this;
    }
    BuffMapAddCMD.prototype.receive = function (pi) {
        var aliveID = pi.readInt64();
        var alive = Manager.model.getGameobject().getGameObject(aliveID);
        if (alive == null)
            return;
        var groupID = pi.readInt();
        var buffLevel = pi.readByte();
        var buff = alive.getBuffById(groupID);
        if (buff == null) {
            buff = BuffCVO.getCVO(groupID, buffLevel);
            alive.addBuff(buff);
        }
    };
    return BuffMapAddCMD;
}(BaseCMD));
__reflect(BuffMapAddCMD.prototype, "BuffMapAddCMD");
//# sourceMappingURL=BuffMapAddCMD.js.map