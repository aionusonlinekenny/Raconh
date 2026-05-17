/**
 * 冲榜竞技图标
 * pzx
 * create 2018-3-１６
*/
class SrvRankIcon2 extends ActBaseIcon2
{
    public constructor(imageContainer01:egret.DisplayObjectContainer,imageContainer:egret.DisplayObjectContainer,container1:egret.DisplayObjectContainer)
    {
        super(imageContainer01,imageContainer,container1);
    }
    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getsrvRank().addEventListener(SrvRankEvent.SRVRANK_UPDATE_LIST,this.__drawRed,this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.CROSS_DAY_EVENT, this.CrossDayHandler, this);
        this.addDayEvent();
    }
    private CrossDayHandler():void
    {
        let i:number = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
		if(i<8)
		{
            this.addDayEvent();
        }
        else
        {
            Manager.model.getActIcon().removeID(this._cvo.id);
        }

    }

    public addDayEvent():void
    {
        let i:number = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
        this.removeDayEvent(i);
        switch(i)
        {
            case SrvRankType.PET_TYPE:
                Manager.model.getPet().addEventListener(PetEvent.UPDATE_ALL_ATTR, this.__drawRed, this);
                break;
            case SrvRankType.LEVE_TYPE:
                Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL,this.__drawRed,this);
                Manager.model.self.addEventListener(GameObjectAttrEvent.TURN_LIVE,this.__drawRed,this);
                break;
            case SrvRankType.JUEXUE_TYPE:
                Manager.model.self.addEventListener(GameObjectAttrEvent.JUEXUE_AMBIT,this.__drawRed,this);
                break;
            case SrvRankType.LIFEGRID_TYPE:
                Manager.model.getLifeGrid().addEventListener(LifeGridEvent.LIFEGRID_WARE_EVENT,this.__drawRed,this);
                Manager.model.getLifeGrid().addEventListener(LifeGridEvent.LIFEGRID_LVUP_EVENT,this.__drawRed,this);
                break
            case SrvRankType.SOUL_TYPE:
                Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT,this.__drawRed,this);
                break;   
            case SrvRankType.GEM_TYPE:
                Manager.model.getEquip().addEventListener(EquipEvent.GEM_UPDATE_EVENT,this.__drawRed,this);
                break;
            case SrvRankType.FIGHT_TYPE:
                Manager.model.self.addEventListener(GameObjectAttrEvent.FIGHT,this.__drawRed,this);
                break;  
        }
        
    }

    private removeDayEvent(day:number):void
    {
        day--;
        switch(day)
        {
            case SrvRankType.PET_TYPE:
                Manager.model.getPet().removeEventListener(PetEvent.UPDATE_ALL_ATTR, this.__drawRed, this);
                break;
            case SrvRankType.LEVE_TYPE:
                Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL,this.__drawRed,this);
                Manager.model.self.removeEventListener(GameObjectAttrEvent.TURN_LIVE,this.__drawRed,this);
                break;
            case SrvRankType.JUEXUE_TYPE:
                Manager.model.self.removeEventListener(GameObjectAttrEvent.JUEXUE_AMBIT,this.__drawRed,this);
                break;
            case SrvRankType.LIFEGRID_TYPE:
                Manager.model.getLifeGrid().removeEventListener(LifeGridEvent.LIFEGRID_WARE_EVENT,this.__drawRed,this);
                Manager.model.getLifeGrid().removeEventListener(LifeGridEvent.LIFEGRID_LVUP_EVENT,this.__drawRed,this);
                break
            case SrvRankType.SOUL_TYPE:
                Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT,this.__drawRed,this);
                break;   
            case SrvRankType.GEM_TYPE:
                Manager.model.getEquip().removeEventListener(EquipEvent.GEM_UPDATE_EVENT,this.__drawRed,this);
                break;
            case SrvRankType.FIGHT_TYPE:
                Manager.model.self.removeEventListener(GameObjectAttrEvent.FIGHT,this.__drawRed,this);
                break;  
        }
    }

    protected removeEvent():void
    {
        Manager.model.getsrvRank().removeEventListener(SrvRankEvent.SRVRANK_UPDATE_LIST,this.__drawRed,this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.CROSS_DAY_EVENT, this.CrossDayHandler, this);
        super.removeEvent();
    }


    protected hasRedIcon():boolean
    {
        let i:number = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
		if(i<8)
		{
			let arr:SrvRankCVO[] = SrvRankCVO.cvos(i);
            for(let cvo of arr)
            {
                if(cvo.checkReward())
                {
                    return true;
                }
            }
        }
        return false;
    }
}