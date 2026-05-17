var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseControl = (function () {
    function BaseControl() {
        this.addCMD();
    }
    BaseControl.prototype.addCMD = function () {
    };
    BaseControl.prototype.send = function (protocol) {
        Manager.socket.getCMD(protocol).send();
    };
    return BaseControl;
}());
__reflect(BaseControl.prototype, "BaseControl");
//# sourceMappingURL=BaseControl.js.map