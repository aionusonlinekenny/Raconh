/**
 * pzx
 * 17.11.18
 * 经脉model
 */
class JingMaiModel extends egret.EventDispatcher
{
    /** <角色id,经脉等级> */
    private _jianMaiDic:Dictionary<number,number>;

    public queryJianmai(dic:Dictionary<number,number>)
    {
        this._jianMaiDic = dic;
        this.dispatchEvent(new JingMaiEvent(JingMaiEvent.JINGMAI_UPDATE_EVENT));
        this.checkCoin();
    }
    // 角色id,经脉等级
    public lvUpJianmai(payId:number,level:number)
    {
        if(this._jianMaiDic.containsKey(payId))
        {
            this._jianMaiDic.remove(payId);
        }
        this._jianMaiDic.add(payId,level+1);
         this.dispatchEvent(new JingMaiEvent(JingMaiEvent.JINGMAI_UPGRAPE_EVENT,level));
         this.checkCoin();
    }

    public getId(playId:number):number
    {
        return this._jianMaiDic.get(playId);
    }
    /** 检测是否有足够的可升级经脉 */
    public checkCoin():boolean
    {
        if(!OpenCVO.isOpen(OpenConst.ID_JINGMAI)) return false;
        if(!this._jianMaiDic)
        {
            return false;
        }
        let arr:Array<number> = this._jianMaiDic.values();
        let leve:number = arr[0];
        if(leve>=JingMaiCVO.maxLevel)
        {
            return false;
        }
        let cvo:JingMaiCvoInfo = JingMaiCVO.getInfo(leve);
        let gai:GainLossVO = cvo.gai;
        this.dispatchEvent(new JingMaiEvent(JingMaiEvent.JINGMAI_CHECK_ICON_EVENT,gai.isEnough()));
        return gai.isEnough();
    }

}