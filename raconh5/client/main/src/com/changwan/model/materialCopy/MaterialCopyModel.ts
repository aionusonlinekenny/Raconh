/**
 * 缥缈录
 */
class MaterialCopyModel extends egret.EventDispatcher
{
    /**小关上限 */
	public static CELL_MAX_COUNT:number = 15;
	/**大关上限 */
	public static BIG_CELL_MAX_COUNT:number = 50;

    /**宝箱采集物 */
    public collectionInfo:CollectionGameObjectInfo;

    /**已领取的宝箱id */
    public getAwardId:number = 0;
    /**当前星数 */
    public curStar:number = 0;

    /**已通关层数 */
    public passList = {};
    /**最后通关 */
    public lastPassCell:number = 0;

    public constructor()
    {
        super();

        this.passList = [];
        for(let i:number = 0; i<MaterialCopyModel.BIG_CELL_MAX_COUNT; i++)
            this.passList[i + 1] = [];
    }

    public updatePassList(list:Array<number>):void
    {
        if(!list || list.length == 0) return;
        let tmpList:Array<number> = list;
        tmpList.sort(this.sortOnCell);
        this.lastPassCell = tmpList[tmpList.length - 1];
        for(let i:number=0; i<tmpList.length; i++)
        {
            let type:number = Math.ceil(tmpList[i] / MaterialCopyModel.CELL_MAX_COUNT);
            this.passList[type].push(tmpList[i]);
        }
        this.dispatchEvent(new MaterialEvent(MaterialEvent.MATERIAL_PASS_LIST_UPDATE));
    }

    public updatePassCell(passCell:number):void
    {
        let type:number = Math.ceil(passCell / MaterialCopyModel.CELL_MAX_COUNT);
        if(this.passList[type].indexOf(passCell) == -1)
            this.passList[type].push(passCell);
        this.passList[type].sort(this.sortOnCell);
        this.lastPassCell = passCell;
        this.dispatchEvent(new MaterialEvent(MaterialEvent.MATERIAL_PASS_LIST_UPDATE));
    }

    public sortOnCell(value1:number, value2:number):number
    {
        if(value1 > value2)
            return 1;
        else if(value1 < value2)
            return -1;
        else
            return 0;
    }

    public getPassCellByType(type:number):number
    {
        if(this.passList[type].length > 0)
            return this.passList[type][this.passList[type].length - 1];
        else
            return 0;
    }

    public createCollection(localX:number, localY:number):void
    {
        let info:CollectionGameObjectInfo = Manager.pool.create(CollectionGameObjectInfo, egret.getTimer());
        info.x = localX;
        info.y = localY;
		info.updatePostion(info.x, info.y, false);
        info.setData("box", false,this.collectComplete,this);
		Manager.model.getGameobject().addGameObject(info);
        this.collectionInfo = info;

        Manager.render.add(this.pick, this, 1000);
    }

    private pick():void
    {
        Manager.render.remove(this.pick, this);
        (this.collectionInfo.createGameObject() as CollectionGameObject).pick();
    }

    public collectComplete():void
    {
        Manager.model.self.updateIsingState(BodyStateManger.ISING_COLLECT, false);
        Manager.model.getGameobject().removeGameObject(this.collectionInfo);
        Manager.control.getMaterialCopy().queryCollection();
    }

    /**返回可挑战大关卡 */
    public getCommendItem():number
	{
		// let type:number = 0;
		// for(let i:number=0; i<MaterialCopyModel.BIG_CELL_MAX_COUNT; i++)
		// {
		// 	let id:number;
		// 	if(this.passList[i + 1][this.passList[i + 1].length - 1])
		// 		id = this.passList[i + 1][this.passList[i + 1].length - 1] + 1;
		// 	else
		// 		id = i * MaterialCopyModel.CELL_MAX_COUNT + 1;
		// 	let info:MaterialCopyCVO = MaterialCopyCVO.getCellInfo(id);
		// 	if(info)
		// 	{
		// 		if(Manager.model.self.attrInfo.fight >= info.fight)
		// 		{
		// 			type = info.type1;
		// 			break;
		// 		}
		// 	}
		// }
        // return type;

        let type:number = 0;
        if(this.lastPassCell == 0)
            type = 1;
        else
        {
            let info:MaterialCopyCVO = MaterialCopyCVO.getCellInfo(this.lastPassCell);
            let nextInfo:MaterialCopyCVO = MaterialCopyCVO.getCellInfo(this.lastPassCell + 1);
			if(info && nextInfo)
			{
                if(info.type2 == nextInfo.type2)
                    type = info.type1;
                else
                {
                    if(info.type1 + 1 <= MaterialCopyModel.BIG_CELL_MAX_COUNT)
                    {
                        if(this.passList[info.type1].length > this.passList[info.type1 + 1].length)
                        {
                            type = info.type1 + 1;
                        }
                    }
                    else
                    {
                        if(this.passList[1].length < 15)
                            type = 1;
                    }
                }
            }
        }
        return type;
	}

    /**
     * 返回推荐大关卡编号
     */
    public getRecommendCell():number
    {
        let ret:number = 0;
        let isShowRedIcon:boolean = false;
        for(let i:number=0; i<MaterialCopyCVO.MAX_CELL; i+=3)
        {
            let id:number = i + 1;
        	let cvo:MaterialCopyCVO = MaterialCopyCVO.getCellInfo(id);
			if(cvo)
			{
				let list:Array<number> = this.passList[cvo.type1];
				for(let j:number=id; j<id + 3; j++)
				{
					if(list.indexOf(j) == -1)
					{
						let info:MaterialCopyCVO = MaterialCopyCVO.getCellInfo(j);
						if(info)
						{
							isShowRedIcon = Manager.model.self.attrInfo.fight >= info.fight && Manager.model.self.attrInfo.level >= info.conds.value;
                            if(isShowRedIcon) return cvo.type1;
                        }
                    }
                }
            }
        }
        return ret;
    }
}