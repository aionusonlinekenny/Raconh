/**
 * 缥渺录图标
 * Simon
 * create 2018-3-29
*/
class MaterialIcon2 extends ActBaseIcon2
{
    public constructor(imageContainer01:egret.DisplayObjectContainer,imageContainer:egret.DisplayObjectContainer,container1:egret.DisplayObjectContainer)
    {
        super(imageContainer01,imageContainer,container1);
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.__drawRed, this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.TURN_LIVE, this.__drawRed, this);
        Manager.model.getMaterialCopy().addEventListener(MaterialEvent.MATERIAL_PASS_LIST_UPDATE, this.__drawRed, this);
    }

    protected removeEvent():void
    {
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.__drawRed, this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.TURN_LIVE, this.__drawRed, this);
        Manager.model.getMaterialCopy().removeEventListener(MaterialEvent.MATERIAL_PASS_LIST_UPDATE, this.__drawRed, this);
        super.removeEvent();
    }

    protected hasRedIcon():boolean
    {
        let isShow:boolean = false;
        for(let i:number=0; i<MaterialCopyModel.BIG_CELL_MAX_COUNT; i++)
        {
            let baseId:number = i * MaterialCopyModel.CELL_MAX_COUNT;
            let itemId:number = 0;
            let list:Array<number> = Manager.model.getMaterialCopy().passList[i + 1];
            if(list && list.length > 0)
            {
                let tmpId:number = list[list.length - 1] + 1;
                if(tmpId <= baseId + MaterialCopyModel.CELL_MAX_COUNT)
                    itemId = tmpId;
            }
            else
            {
                itemId = baseId + 1;
            }
            for(let j:number=itemId; j<=baseId + MaterialCopyModel.CELL_MAX_COUNT; j++)
            {
                let info:MaterialCopyCVO = MaterialCopyCVO.getCellInfo(j);
                if(info)
                {
                    if(Manager.model.self.attrInfo.fight >= info.fight && Manager.model.self.attrInfo.level >= info.conds.value)
                    {
                        isShow = true;
                        break;
                    }
                }
            }
            if(isShow) break;
        }
        return isShow;
    }
}