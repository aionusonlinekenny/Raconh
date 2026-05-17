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
 * drq
 * 升星 control
 * 2018.4.16
 */
var StarUpControl = (function (_super) {
    __extends(StarUpControl, _super);
    function StarUpControl() {
        return _super.call(this) || this;
    }
    StarUpControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_UP_STAR, StarUpCMD);
    };
    //发
    StarUpControl.prototype.sendStarUp = function (type, id, arr) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_UP_STAR);
        cmd._storageType = type;
        cmd._itemId = id;
        cmd._otherIdList = arr;
        cmd.send();
    };
    return StarUpControl;
}(BaseControl));
__reflect(StarUpControl.prototype, "StarUpControl");
//# sourceMappingURL=StarUpControl.js.map