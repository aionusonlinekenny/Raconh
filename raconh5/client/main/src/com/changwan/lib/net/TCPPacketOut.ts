class TCPPacketOut extends cw.ByteArray
{
    private static LENGTH_LEN:number = 2;//协议长度占用字节数
    private static PROTOCOL_LEN:number = 2;//协议号占用字节数
    private static VERIFY_LEN:number = 1;//验证字段占用字节数
    private static COMMON_TOTAL_LEN:number = 5;//需要忽略的公共协议头长度，2字节长度+2字节协议号+1字节服务器验证

    public protocol:number;
    public constructor(protocol:number)
	{
        super();
        this.protocol = protocol;
        this.position = TCPPacketOut.LENGTH_LEN;
        this.writeShort(protocol);
        // this.writeByte(Manager.socket.verify);
        // Manager.socket.addVerify();
        this.position = TCPPacketOut.LENGTH_LEN + TCPPacketOut.PROTOCOL_LEN + TCPPacketOut.VERIFY_LEN;
    }

    public writePacketLenAndVerify(): void
    {
        this.position = 0;
        this.writeShort(this.length - TCPPacketOut.COMMON_TOTAL_LEN);
        this.position = TCPPacketOut.LENGTH_LEN + TCPPacketOut.PROTOCOL_LEN;
        this.writeByte(Manager.socket.verify);
        Manager.socket.addVerify();
        this.position = 0;
    }

    // public writeBytes(bytes:egret.ByteArray, offset:number = 0, length:number = 0): void
    // {
    //     super.writeBytes(bytes, offset, length);
    // }

    public writeUTF(value:string): void
    {
        if (value != null)
            super.writeUTF(value);
        else
            super.writeUTF("");
    }
}