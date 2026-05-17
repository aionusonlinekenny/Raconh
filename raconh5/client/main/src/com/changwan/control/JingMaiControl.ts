/**
 * pzx 
 * 17.11.18
     * 经脉Control
     */
class JingMaiControl extends BaseControl
{
    private _upgrideLv:boolean;
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.CMD_JINGMAI_QUEYT_INFO,JingMaiQueryCMD);
         Manager.socket.addCMD(Protocol.CMD_JINGMAI_LV_UP,JingMaiLvUpCMD);
    }
    /**
     * 查询
     */
    public query():void
    {
        let cmd:JingMaiQueryCMD = Manager.socket.getCMD(Protocol.CMD_JINGMAI_QUEYT_INFO) as JingMaiQueryCMD;
        cmd.send();
    }
     /**
     * 提交
     */
    public jianMaiLvUp(leve:number,palyId:number):void
    {
        if(this._upgrideLv) return;
        let cmd:JingMaiLvUpCMD = Manager.socket.getCMD(Protocol.CMD_JINGMAI_LV_UP) as JingMaiLvUpCMD;
        cmd.leve = leve;
        cmd.playid = palyId;
        cmd.send();
        this._upgrideLv = true;
        Manager.render.add(this.upgrideLv,this,500,1,null,true);
    }
    private upgrideLv():void
    {
        this._upgrideLv = false;
    }

}