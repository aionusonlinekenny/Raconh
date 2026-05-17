class TCPPacketIn extends ByteArrayExtend
{
    private _protocol:number;

    public get protocol():number
    {
        return this._protocol;
    }

    public set protocol(value:number)
    {
        this._protocol = value;
    }

    public parse():void
	{
        this._protocol = this.readShort();
        this.readBytes(this,0,this.bytesAvailable);
        this.position = 0;
    }
}