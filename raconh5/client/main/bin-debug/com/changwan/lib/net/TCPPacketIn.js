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
var TCPPacketIn = (function (_super) {
    __extends(TCPPacketIn, _super);
    function TCPPacketIn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TCPPacketIn.prototype, "protocol", {
        get: function () {
            return this._protocol;
        },
        set: function (value) {
            this._protocol = value;
        },
        enumerable: true,
        configurable: true
    });
    TCPPacketIn.prototype.parse = function () {
        this._protocol = this.readShort();
        this.readBytes(this, 0, this.bytesAvailable);
        this.position = 0;
    };
    return TCPPacketIn;
}(ByteArrayExtend));
__reflect(TCPPacketIn.prototype, "TCPPacketIn");
//# sourceMappingURL=TCPPacketIn.js.map