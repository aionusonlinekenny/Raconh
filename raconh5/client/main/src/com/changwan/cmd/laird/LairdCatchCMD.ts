class LairdCatchCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_LAIRD_CATCH;
    }

    protected processOut(pkg:TCPPacketOut):void
    {
        // pkg.writeByte(this.trainingType);
    }

    public receive(pi:TCPPacketIn):void
    {
        let list:Array<LairdCatchInfo> = [];
        let len:number = pi.readShort();
        for(let i:number=0; i<len; i++)
        {
            let info:LairdCatchInfo = new LairdCatchInfo();
            info.id = pi.readInt64();
            info.name = pi.readUTF();
            info.level = pi.readShort();
            info.career = pi.readByte();
            info.fight = pi.readInt();
            info.status = pi.readByte();
            info.catchType = pi.readByte();
            info.timeStamp = pi.readInt();
            info.lordName = pi.readUTF();
            list.push(info);
        }
        list.reverse();
        
        Manager.model.getLaird().dispatchEvent(new LairdEvent(LairdEvent.LAIRD_CATCH_INFO_UPDATE, list));
    }
}