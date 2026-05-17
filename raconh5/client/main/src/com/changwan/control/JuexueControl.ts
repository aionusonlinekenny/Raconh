/**
 * pzx 
 * 18.3.1
     * 绝学Control
     */
class JuexueControl extends BaseControl
{
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
         Manager.socket.addCMD(Protocol.CMD_JUEXUE_QUERY,JuexueQueryCMD);
         Manager.socket.addCMD(Protocol.CMD_JUEXUE_UPGRADE,JuexueUpgradeCMD);
         Manager.socket.addCMD(Protocol.CMD_JUEXUE_AMBIT,JuexueAmbitCMD);
    }
    /**
     * 查询
     */
    public query():void
    {
        let cmd:JuexueQueryCMD = Manager.socket.getCMD(Protocol.CMD_JUEXUE_QUERY) as JuexueQueryCMD;
        cmd.send();
    }

    private _upgrideLv:boolean;
    public upgrade(id:number,lev:number):void
    {
        if(this._upgrideLv) return;
        let cmd:JuexueUpgradeCMD = Manager.socket.getCMD(Protocol.CMD_JUEXUE_UPGRADE) as JuexueUpgradeCMD;
        cmd.id = id;
        cmd.lev = lev;
        cmd.send();
        this._upgrideLv = true;
        Manager.render.add(this.upgrideLv,this,500,1,null,true);
        
    }
    private _filterLv:boolean;
    public ambitlv(id:number):void
    {
        if(this._filterLv) return;
        let cmd:JuexueAmbitCMD = Manager.socket.getCMD(Protocol.CMD_JUEXUE_AMBIT) as JuexueAmbitCMD;
        cmd.id = id;
        cmd.send();
        this._filterLv = true;
        Manager.render.add(this.filterLv,this,500,1,null,true);
    }
    private filterLv():void
    {
        this._filterLv = false;
    }
    private upgrideLv():void
    {
        this._upgrideLv = false;
    }
   
}