var BaseControl = /** @class */ (function () {
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
//# sourceMappingURL=BaseControl.js.map