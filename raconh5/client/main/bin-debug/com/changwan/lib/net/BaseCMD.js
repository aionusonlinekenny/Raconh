var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseCMD = (function () {
    function BaseCMD() {
    }
    Object.defineProperty(BaseCMD.prototype, "protocol", {
        get: function () {
            return this._protocol;
        },
        enumerable: true,
        configurable: true
    });
    BaseCMD.prototype.receive = function (pkg) { };
    BaseCMD.prototype.processOut = function (pkg) { };
    Object.defineProperty(BaseCMD.prototype, "canSend", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    BaseCMD.prototype.send = function () {
        if (this.canSend) {
            var out = new TCPPacketOut(this._protocol);
            this.processOut(out);
            Manager.socket.send(out);
        }
    };
    return BaseCMD;
}());
__reflect(BaseCMD.prototype, "BaseCMD");
//# sourceMappingURL=BaseCMD.js.map