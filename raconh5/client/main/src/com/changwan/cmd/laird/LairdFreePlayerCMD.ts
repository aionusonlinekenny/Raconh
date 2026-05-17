class LairdFreePlayerCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_LAIRD_FREE_PLAYER;
    }

    public playerId:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt64(this.playerId);
    }

    // public receive(pi:TCPPacketIn):void
    // {
    //     let playerId:number = pi.readInt64();
    // }
}