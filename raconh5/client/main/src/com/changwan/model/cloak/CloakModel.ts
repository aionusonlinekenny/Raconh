/**
 * pzx
 * 17.12.1
 * 披风mddel
 */
class CloakModel extends egret.EventDispatcher
{
    /**例表 <披风id,星数>*/
    private _cloakList:Dictionary<number,number>;
    private _currentId:number=0;
    /** 被选中的披风id */
    public pitchId:number

    public constructor()
    {
        super();
    }
   
    /**查询 */
    public queryList(currenId:number,dic:Dictionary<number,number>):void
    {
        this._cloakList = dic;
        this._currentId = currenId;
        this.dispatchEvent(new CloakEvent(CloakEvent.CLOAK_UPDATE_EVENT));
       // this.dispatchEvent(new ShopEvent(ShopEvent.SHOP_UPDATE_EVENT));
    }

/**返回激活 */
    public activateCloak(id:number,num:number):void
    {
        this._cloakList.add(id,num);
        this.dispatchEvent(new CloakEvent(CloakEvent.CLOAK_UPDATE_EVENT));
        this.setCurrentId(id);
    }
   //返回升星
    public upGradeStarCloak(id:number,num:number):void
    {
        this._cloakList.remove(id);
        this._cloakList.add(id,num);
        this.dispatchEvent(new CloakEvent(CloakEvent.CLOAK_UPDATE_EVENT));
    }
/** 返回 穿戴*/
    public setCurrentId(value:number):void
    {
        this._currentId = value;
        this.dispatchEvent(new CloakEvent(CloakEvent.CLOAK_WARE_EVENT));
    }

    public getcloakList():Dictionary<number,number>
    {
        if(this._cloakList == null)
        {
            Manager.control.getCloak().query();
            this._cloakList = new Dictionary<number,number>();
        }
        return this._cloakList;
    }
   
     /**获取例表 */
    public getList():Array<CloakCVO>
    {
       let arr:Array<CloakCVO> = CloakCVO.getList();
       let dic:Dictionary<number,number> = this.getcloakList();
       for(let info of arr)
       {
           if(dic.containsKey(info.id))
           {
               info.setStarNum(dic.get(info.id));
           }
       }
       arr = ArrayUtil.sortOn(arr,["sort"]);
       return arr;
    }
    /**当前使用披风id(0则是卸下) */
    public get currentId():number
    {
        return this._currentId;
    }
    /**
     * 是否可激活或者升星的披风
     */
    public checkActiveCloak():boolean
    {
        if(!OpenCVO.isOpen(OpenConst.ID_CLOAK)) return false;
        if(this._cloakList== null)
        {
             this.getcloakList();
             return false;
        }
        let arr:CloakCVO[] = this.getList();
        for(let info of arr)
        {
            if(info.num == 0)
            {
                let conList:ConditionVO[] = info.act_cond;
                let boo:boolean= true;
                for(let con of conList)
                {
                    if(!con.isSatisfy())
                    {
                        boo = false;
                        break;
                    }
                }
                if(boo)
                {
                    let loss:GainLossVO = info.losse;
                    if(loss.isEnough()) 
                    {
                        return true;
                    }
                }
            }
            else
            {
                if(info.num<3)
                {
                  
                    let starCvo:CloakStarCvoInfo = info.starArr[info.num];
                    let loss:GainLossVO = new GainLossVO(starCvo.loss);
                    if(loss.isEnough())
                    {
                        return true;
                    }
                }
            }
        }
        return false;

    }

}