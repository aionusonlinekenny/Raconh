class SoldierInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();

        this._protocol = Protocol.SHENBING_INFO;
    }

    public receive(pi:TCPPacketIn):void
    {
        let id:number = pi.readShort();
        Manager.model.getSoldier().curSoldierId = id;
        let len:number = pi.readShort();
        for(let i:number = 0;i<len; i++)
        {
            let id:number = pi.readShort();
            let num:number = pi.readByte();
            Manager.model.getSoldier().getSoldierList().add(id,num);
        }
        Manager.model.getSoldier().dispatchEvent(new SoldierEvent(SoldierEvent.SOLDIER_INFO_UPDATE));
    }
}