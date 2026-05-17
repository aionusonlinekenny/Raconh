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
var TCPPacketOut = (function (_super) {
    __extends(TCPPacketOut, _super);
    function TCPPacketOut(protocol) {
        var _this = _super.call(this) || this;
        _this.protocol = protocol;
        _this.position = TCPPacketOut.LENGTH_LEN;
        _this.writeShort(protocol);
        // this.writeByte(Manager.socket.verify);
        // Manager.socket.addVerify();
        _this.position = TCPPacketOut.LENGTH_LEN + TCPPacketOut.PROTOCOL_LEN + TCPPacketOut.VERIFY_LEN;
        return _this;
    }
    TCPPacketOut.prototype.writePacketLenAndVerify = function () {
        this.position = 0;
        this.writeShort(this.length - TCPPacketOut.COMMON_TOTAL_LEN);
        this.position = TCPPacketOut.LENGTH_LEN + TCPPacketOut.PROTOCOL_LEN;
        this.writeByte(Manager.socket.verify);
        Manager.socket.addVerify();
        this.position = 0;
    };
    // public writeBytes(bytes:egret.ByteArray, offset:number = 0, length:number = 0): void
    // {
    //     super.writeBytes(bytes, offset, length);
    // }
    TCPPacketOut.prototype.writeUTF = function (value) {
        if (value != null)
            _super.prototype.writeUTF.call(this, value);
        else
            _super.prototype.writeUTF.call(this, "");
    };
    TCPPacketOut.LENGTH_LEN = 2; //协议长度占用字节数
    TCPPacketOut.PROTOCOL_LEN = 2; //协议号占用字节数
    TCPPacketOut.VERIFY_LEN = 1; //验证字段占用字节数
    TCPPacketOut.COMMON_TOTAL_LEN = 5; //需要忽略的公共协议头长度，2字节长度+2字节协议号+1字节服务器验证
    return TCPPacketOut;
}(cw.ByteArray));
__reflect(TCPPacketOut.prototype, "TCPPacketOut");
//# sourceMappingURL=TCPPacketOut.js.map