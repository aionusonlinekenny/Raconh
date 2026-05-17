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
 * 魔神降临请求抢夺列表
 * liangyan
 * create 2018-04-10
*/
var DevilGrabListCMD = (function (_super) {
    __extends(DevilGrabListCMD, _super);
    function DevilGrabListCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.DEVIL_GRAB_LIST;
        return _this;
    }
    DevilGrabListCMD.prototype.receive = function (pi) {
        var second = pi.readInt();
        var now = Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        Manager.model.getDevil().canGrabTime = now + second;
        var count = pi.readShort();
        var info;
        var infos = new Array();
        while (count > 0) {
            info = new DevilGrabInfo();
            info.id = pi.readInt64();
            info.name = pi.readUTF();
            info.career = pi.readByte();
            info.score = pi.readInt();
            info.winTimes = pi.readShort();
            info.fight = pi.readInt();
            infos.push(info);
            count--;
        }
        Manager.model.getDevil().grabInfos = infos;
    };
    return DevilGrabListCMD;
}(BaseCMD));
__reflect(DevilGrabListCMD.prototype, "DevilGrabListCMD");
//# sourceMappingURL=DevilGrabListCMD.js.map