class BaseCMD
{
    protected _protocol:number;
    public get protocol():number
    {
        return this._protocol;
    }
    
    public receive(pkg:TCPPacketIn):void{}

    protected processOut(pkg:TCPPacketOut):void{}

    protected get canSend():boolean
    {
        return true;
    }

    public send():void
    {
        if(this.canSend)
        {
            var out:TCPPacketOut = new TCPPacketOut(this._protocol);
            this.processOut(out);
            Manager.socket.send(out);
        }
    }
}