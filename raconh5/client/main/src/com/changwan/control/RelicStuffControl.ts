/**
 * pzx 
 * 18.3.9
     * 神器Control
     */
class RelicStuffControl extends BaseControl
{
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
         Manager.socket.addCMD(Protocol.CMD_RELICSTUFF_QUERY,RelicStuffQueryCMD);
         Manager.socket.addCMD(Protocol.CMD_RELICSTUFF_ACTIVITY,RelicStuffActivityCMD);

    }
    /**
     * 查询
     */
    public query(type:number):void
    {
        let cmd:RelicStuffQueryCMD = Manager.socket.getCMD(Protocol.CMD_RELICSTUFF_QUERY) as RelicStuffQueryCMD;
        cmd.send();
    }

    public activity(id:number,type:number):void
    {
        let cmd:RelicStuffActivityCMD = Manager.socket.getCMD(Protocol.CMD_RELICSTUFF_ACTIVITY) as RelicStuffActivityCMD;
        cmd.id = id;
        cmd.type = type;
        cmd.send();
    }
    
}