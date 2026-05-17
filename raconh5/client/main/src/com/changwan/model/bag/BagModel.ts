class BagModel extends egret.EventDispatcher
{
    public constructor()
    {
        super();
    }

    // public checkCanRonglian():boolean
    // {
	// 	if(!OpenCVO.isOpen(OpenConst.ID_RONGLIAN)) return false;
    //     let itemList = [];
	// 	let cantMoveLit = {};
	// 	let list:Array<ItemsModelInfo> = Manager.model.getItems().getBagItemBySmelt();
	// 	list.sort(this.fightingSort);
    //     let equipList:Dictionary<number,ItemsModelInfo> = Manager.model.getItems().equipList;
	// 	for(let i:number=0; i<list.length; i++)
	// 	{
	// 		let itemInfo:ItemsModelInfo = list[i];
	// 		if(itemInfo && itemInfo.cvo.group == 1)
	// 		{
	// 			let has:boolean = false;
	// 			let hasPos:boolean = false;
	// 			for(let j:number=1; j<=8; j++)
	// 			{
	// 				let info:ItemsModelInfo = equipList.get(j);
	// 				if(info)
	// 				{
	// 					if( Number(String(info.base_id).substr(6, 2)) == Number(String(itemInfo.base_id).substr(6,2)))
	// 					{
	// 						hasPos = true;
	// 						let itemInfoAttrVo = Manager.pool.create(AttrVO, itemInfo.cvo.attr);
	// 						let equipInfoAttrVo:AttrVO = Manager.pool.create(AttrVO, info.cvo.attr);
	// 						if(equipInfoAttrVo.getFighting() >= itemInfoAttrVo.getFighting())
	// 						{
	// 							itemList.push(itemInfo);
	// 							has = true;
	// 							break;
	// 						}
	// 						else
	// 						{
	// 							if(!cantMoveLit[ String(itemInfo.base_id).substr(6,2) ])
	// 								cantMoveLit[ String(itemInfo.base_id).substr(6,2) ] = itemInfo;
	// 						}
	// 					}
	// 				}
	// 			}
	// 			if(!has)
	// 			{
	// 				if(!hasPos)
	// 				{
	// 					if(!cantMoveLit[ String(itemInfo.base_id).substr(6,2) ])
	// 						cantMoveLit[ String(itemInfo.base_id).substr(6,2) ] = itemInfo;
	// 				}
	// 				if(cantMoveLit[ String(itemInfo.base_id).substr(6,2) ] != itemInfo)
	// 				{
	// 					itemList.push(itemInfo);
	// 				}
	// 			}
	// 		}
	// 		else
	// 		{
	// 			itemList.push(itemInfo);
	// 		}
	// 	}
    //     return itemList.length >= 50 ? true : false;
    // }

	private fightingSort(info1:ItemsModelInfo, info2:ItemsModelInfo):number
	{
		let vo1:AttrVO = Manager.pool.create(AttrVO, info1.cvo.attr);
		let vo2:AttrVO = Manager.pool.create(AttrVO, info2.cvo.attr);
		let f1:number = vo1.getFighting();
		let f2:number = vo2.getFighting();
		Manager.pool.push(vo1);
		Manager.pool.push(vo2);
		if(f1 < f2) return 1;
		else if(f1 > f2) return -1;
		else return 0;
	}

	/**
	 * 快速熔炼
	 */
	public quickRonglian():void
	{
		let itemList:Array<ItemsModelInfo> = Manager.model.getEquip().getCanRonglianItems(50);
		Manager.control.getEquip().equipRonglian(itemList);
	}

	private _callBack:CallBackInfo;
	/*剩余格子是否太少*/
	// public isTooLittle(oneKeyFusoin:boolean=false, callBack:Function=null, callBackParam:any=null):boolean
	public isTooLittle(oneKeyFusoin:boolean=false, callBack:CallBackInfo = null):boolean
	{
		this._callBack = callBack;
		if(Manager.model.getItems().bagSurplus <= 5)
        {
			if(oneKeyFusoin)
			{
				let ok:CallBackInfo = Manager.pool.create(CallBackInfo,this.callBack,this)
				Manager.tips.showTips(LangCVO.getContent("activity6"),ok,true);//背包已满，是否一键熔炼
			}

            return true;
        }
		return false;
	}

	private callBack():void
	{
		Manager.model.getBag().quickRonglian();
		if(this._callBack != null)
		{
			this._callBack.actCallBack();
			Manager.pool.push(this._callBack);
			this._callBack = null;
		}
	}
}