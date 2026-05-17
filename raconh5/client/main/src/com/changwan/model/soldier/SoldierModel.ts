/**
 * 兵魂
 * Simon
 * 2017.12.21
 */
class SoldierModel extends egret.EventDispatcher
{
    public curSoldierId:number = 0;
    /**列表 <兵魂id,星数>*/
    private _soldierList:Dictionary<number,number>;
    public selectId:number;
    public canUpgradeLocal:number = 0;
    public list:Array<SoldierCVO> = [];

    public activate(id:number, star:number):void
    {
        this._soldierList.add(id,star);
        this.list = this.getList();
        this.dispatchEvent(new SoldierEvent(SoldierEvent.SOLDIER_UPGRADE_STAR, id));
    }

    public upgradeStar(id:number, star:number):void
    {
        this._soldierList.remove(id);
        this._soldierList.add(id,star);
        this.list = this.getList();
        this.dispatchEvent(new SoldierEvent(SoldierEvent.SOLDIER_UPGRADE_STAR, id));
    }

    public set currentId(value:number)
    {
        this.curSoldierId = value;
        this.dispatchEvent(new SoldierEvent(SoldierEvent.SOLDIER_PUTON));
    }

    public get currentId():number
    {
        return this.curSoldierId;
    }

    public getList():Array<SoldierCVO>
    {
       let arr:Array<SoldierCVO> = SoldierCVO.getList();
       let dic:Dictionary<number,number> = this.getSoldierList();
       for(let info of arr)
       {
           if(dic.containsKey(info.id))
           {
               info.soldierStarNum = dic.get(info.id);
           }
       }
       arr = ArrayUtil.sortOn(arr,["sort"]);
       return arr;
    }

    public getSoldierList():Dictionary<number,number>
    {
        if(this._soldierList == null)
        {
            this._soldierList = new Dictionary<number,number>();
        }
        return this._soldierList;
    }

    public checkCanUpgrade(localId:number = 0):boolean
    {
        if(!OpenCVO.isOpen(OpenConst.ID_SHENBING)) return false;
        let ret:boolean = false;
        let list:Array<SoldierCVO> = this.getList();
        let i:number = 0;
        for(let info of list)
        {
            if(localId != 0 && info.id != localId) continue;

            if(info.soldierStarNum < 10)
            {
                let needItemInfo:GainLossVO = new GainLossVO(info.starInfoList[info.soldierStarNum + 1].loss);
                if(needItemInfo)
                {
                    if(Manager.model.getItems().getCountItemById(needItemInfo.baseId) >= needItemInfo.num)
                    {
                        ret = true;
                        this.canUpgradeLocal = info.id;
                        break;
                    }
                }
                else
                    return false;
            }
            i += 1;
        }
        if(!ret && localId == 0) this.canUpgradeLocal = 0;
        return ret;
    }
}