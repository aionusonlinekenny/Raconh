/**
 * pzx 
 * 18.1.15
     * 充值活动Control
     */
class RecheargeActivityControl extends BaseControl
{
    private _boo:boolean = false;
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
         Manager.socket.addCMD(Protocol.CMD_RECHARGEACTIVITY_QUERY,RechargeActivityQueryCMD);
         Manager.socket.addCMD(Protocol.CMD_RECHARGEACTIVITY_REWARD,RechargeActivityRewardCMD);
    }
    /**
     * 查询
     */
    public query(type:number):void
    {
        let cmd:RechargeActivityQueryCMD = Manager.socket.getCMD(Protocol.CMD_RECHARGEACTIVITY_QUERY) as RechargeActivityQueryCMD;
        cmd.type = type;
        cmd.send();
    }

    public reward(id:number):void
    {
        if(this._boo) 
        {
            return 
        }
        this._boo = true;
        Manager.render.add(this.render,this,800,1);
        let cmd:RechargeActivityRewardCMD = Manager.socket.getCMD(Protocol.CMD_RECHARGEACTIVITY_REWARD) as RechargeActivityRewardCMD;
        cmd.id = id;
        cmd.send();
    }

    private render(interval:number):void
    {
        this._boo = false;
    }
}