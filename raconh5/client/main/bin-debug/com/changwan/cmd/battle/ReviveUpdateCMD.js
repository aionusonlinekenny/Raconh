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
 * 复活更新数据协议
 * liangyan
 * create 2017-12-07
*/
var ReviveUpdateCMD = (function (_super) {
    __extends(ReviveUpdateCMD, _super);
    function ReviveUpdateCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.REVIVE_UPDATE;
        return _this;
    }
    ReviveUpdateCMD.prototype.receive = function (pi) {
        var x = pi.readInt();
        var y = pi.readInt();
        var hp = pi.readInt();
        Manager.model.self.updatePostion(x, y);
        Manager.model.self.attrInfo.setValue(AttrDescType.HP, hp);
    };
    return ReviveUpdateCMD;
}(BaseCMD));
__reflect(ReviveUpdateCMD.prototype, "ReviveUpdateCMD");
//# sourceMappingURL=ReviveUpdateCMD.js.map