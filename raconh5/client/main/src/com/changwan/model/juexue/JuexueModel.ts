/**
 * 绝学model
 * pzx
 * create 2018-2-26
*/
class JuexueModel extends egret.EventDispatcher
{
    private _ambitLv:number= 1;
    /** 秘籍例表 */
    public readonly esotericaList:number[]=[JuexueType.JUEXUE_ESOTERICA_1,JuexueType.JUEXUE_ESOTERICA_2,JuexueType.JUEXUE_ESOTERICA_3,JuexueType.JUEXUE_ESOTERICA_4];
    
    public query(value:number):void
    {
        this._ambitLv = value;
        this.dispatchEvent(new JuexueEvent(JuexueEvent.JUEXUE_QUERY_EVENT));
    }

    public updateAmbitLv(value:number)
    {
        this._ambitLv = value;
        this.dispatchEvent(new JuexueEvent(JuexueEvent.JUEXUE_AMBIT_EVENT));
    }

    public returnUpgrade(cvo:JueXueCVO):void
    {
        this.dispatchEvent(new JuexueEvent(JuexueEvent.JUEXUE_UPGRADE_EVENT,cvo));
    }
    /** 境界阶 */
    public get ambitLv():number
    {
        return this._ambitLv;
    }
    /** 检测是否有可升级 */
    public checkUpgrade(type:number):boolean
    {
        if(type)
        {
            let arr:Array<JueXueCVO> = JueXueCVO.getList(type);
            for(let cvo of arr)
            {
                if(cvo.checkUpgrade())
                {
                    return true;
                }
            }
        }
        else
        {
            let obj:Object = JueXueCVO.data();
            for(let key in obj)
            {
                let cvo:JueXueCVO = obj[key];
                if(cvo.checkUpgrade())
                {
                    return true;
                }
            }
        }
        return false;
    }
    /** 检测是否升级境界 */
    public checkAmbitLv():boolean
    {
        let cvo:JueXueAmbitCVO = JueXueAmbitCVO.getInfo(this._ambitLv);
        if(cvo.loss=="")
        {
            return false;
        }
        else
        {
            let loss:GainLossVO = new GainLossVO(cvo.loss);
            return loss.isEnough();
        }
    }
}