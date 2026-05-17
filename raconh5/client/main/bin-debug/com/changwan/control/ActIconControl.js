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
 * 活动图标controller
 * liangyan
 * create 2017-12-21
*/
var ActIconControl = (function (_super) {
    __extends(ActIconControl, _super);
    function ActIconControl() {
        return _super.call(this) || this;
    }
    ActIconControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.ACTIVITY_LIST_UPDATE, ActivityStatusListCMD);
        Manager.socket.addCMD(Protocol.ACTIVITY_UPDATE, ActivityStatusCMD);
        Manager.socket.addCMD(Protocol.ACTIVITY_END, ActivityEndCMD);
    };
    return ActIconControl;
}(BaseControl));
__reflect(ActIconControl.prototype, "ActIconControl");
//# sourceMappingURL=ActIconControl.js.map