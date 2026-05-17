/**
 * pzx 
 * 17.12.27
     * Control
     */
class LifeGridControl extends BaseControl
{
    private  _timeboo:boolean;
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
         Manager.socket.addCMD(Protocol.CMD_LIFEGRID_INFO,LifeGridCDQueryCMD);
         Manager.socket.addCMD(Protocol.CMD_LIFEGRID_HUNT,LifeGridHuntCMD);
         Manager.socket.addCMD(Protocol.CMD_LIFEGRID_LEV_UP,LifeGridLvUpCMD);
         Manager.socket.addCMD(Protocol.CMD_LIFEGRID_WARE,LifeGridWareCMD);
         Manager.socket.addCMD(Protocol.CMD_LIFEGRID_SEPARATE,LifeGridSeparateCMD);
         
    }
    /**
     * 查询
     */
    public query():void
    {
        let cmd:LifeGridCDQueryCMD = Manager.socket.getCMD(Protocol.CMD_LIFEGRID_INFO) as LifeGridCDQueryCMD;
        cmd.send();
    }
    
    public hount(free:number):void
    {
        let cmd:LifeGridHuntCMD = Manager.socket.getCMD(Protocol.CMD_LIFEGRID_HUNT) as LifeGridHuntCMD;
        cmd.type = free;
        cmd.send();
    }
 
    /**
     * 孔位置
        lv   目标等级'
     */
    public levelUp(lv:number,pos:number):void
    {
        if(this._timeboo) return;
        Manager.render.add(this.updateTime,this,500,1,null,true);
        let cmd:LifeGridLvUpCMD = Manager.socket.getCMD(Protocol.CMD_LIFEGRID_LEV_UP) as LifeGridLvUpCMD;
        cmd.leve = lv;
        cmd.index = pos;
        cmd.send();
        this._timeboo = true;
    }
    private updateTime():void
    {
        this._timeboo = null;
    }   
     /**
     * 穿戴
     * 命格唯一id
     * pos 孔位置
     */
    public ware(id:number,pos:number):void
    {
        let cmd:LifeGridWareCMD = Manager.socket.getCMD(Protocol.CMD_LIFEGRID_WARE) as LifeGridWareCMD;
        cmd.id = id;
        cmd.index = pos;
        cmd.send();
    }
     /**
     * 分解  id列表
     */
    public separate(arr:number[]):void
    {
        let cmd:LifeGridSeparateCMD = Manager.socket.getCMD(Protocol.CMD_LIFEGRID_SEPARATE) as LifeGridSeparateCMD;
        cmd.array = arr;
        cmd.send();
    }
}