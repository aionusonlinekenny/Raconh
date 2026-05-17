var BaseCMD = /** @class */ (function () {
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
//# sourceMappingURL=BaseCMD.js.map