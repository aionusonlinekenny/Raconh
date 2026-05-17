/**
 * pzx
 * 18.1.15
 * 投资model
 */
class SysInvestModel extends egret.EventDispatcher
{
    /**
     * 激活介格例表 保存的介格代已激活
    */
    private _actList:string[]=[];


    public queryList(ip:TCPPacketIn):void
    {
        let ln:number = ip.readShort();
        for(let i:number=0;i<ln;i++)
        {
            let type:number = ip.readShort();
            this._actList.push("" + type);
        }
        this.sysList(ip);
    }

    /**更新 */
    public sysList(ip:TCPPacketIn):void
    {
        let ln:number = ip.readShort();
        for(let i:number=0;i<ln;i++)
        {
            let id:number = ip.readByte();
            let state:number = ip.readByte();
            SysInvestCVO.setState(id,state);
        }
        this.dispatchEvent(new SysInvestEvent(SysInvestEvent.SYSINVEST_UPDATE_EVENT));
    }
    public isActive(price:string):boolean
    {
        for(let key of this._actList)
        {
            if(key == price)
            {
                return true;
            }
        }
        return false;
    }
    /** 检测是否有奖励可领 */
    public checkReward(price:string):boolean
    {
        if(this.isActive(price))
        {
            let arr:SysInvestCVO[] = SysInvestCVO.getCvos(price);
            for(let cvo of arr)
            {
                if(cvo.state!=1 && cvo.isReward())
                {
                    return true;
                }
            }
        }
        return false;
    }
  
}