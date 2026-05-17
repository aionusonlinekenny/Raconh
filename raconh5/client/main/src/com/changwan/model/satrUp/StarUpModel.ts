/**
 * drq 
 * 升星Model
 * 2018.4.16
 */
class StarUpModel extends egret.EventDispatcher
{
	private _allEquipList:Array<ItemsModelInfo>;
	private _cvo:StarUpCVO[];
	private _model = this;

	public constructor() {
		super();
		this._cvo = StarUpCVO.getCvo();
	}

	//获取所有装备
	public getAllEquipList():Array<ItemsModelInfo>
	{
		let items1 = Manager.model.getItems().getBagItem();//背包装备
		let items2 = Manager.model.getItems().equipList.values();//身上装备
		//排序
		for(let i=0;i<items1.length;i++)
        {
            for(let j=0;j<items1.length-1;j++)
            {
                if(items1[j+1].base_id < items1[j].base_id)
                {
                    let aaa = items1[j+1];
                    items1[j+1] = items1[j];
                    items1[j] = aaa;
                }
            }
        }
		for(let i=0;i<items2.length;i++)
        {
            for(let j=0;j<items2.length-1;j++)
            {
                if(items2[j+1].base_id < items2[j].base_id)
                {
                    let aaa = items2[j+1];
                    items2[j+1] = items2[j];
                    items2[j] = aaa;
                }
            }
        }
		this._allEquipList = items2.concat(items1);
		return this._allEquipList;
	}

	//获取红色1星、2星装备数组
	public getStarUpList():Array<ItemsModelInfo>
	{
		let starUpList:Array<ItemsModelInfo> = [];
		let  list:Array<ItemsModelInfo> = this.getAllEquipList();
		for(let i=0;i<list.length;i++)
		{
			if(list[i].cvo.quality == 6)
			{
				if(list[i].getStar() == 1 || list[i].getStar() == 2)
				{
					for(let j=0;j<this._cvo.length;j++)
					{
						if(this._cvo[j].item_id == list[i].base_id)
						{
							starUpList.push(list[i]);
							break;
						}
					}
				}
			}
		}
		return starUpList;
	}

	public checkCoin():boolean
	{
		if(!OpenCVO.isOpen(OpenConst.ID_STARUP)) return false;
		let arr:Array<ItemsModelInfo> = this.getStarUpList();
		for(let h=0;h<arr.length;h++)
		{
			let getBottomList = this.getBottomList(arr[h]);
			if(getBottomList.length>0)return true;
		}
		return false;
	}

	public getBottomList(data:ItemsModelInfo):ItemsModelInfo[]
	{
		let star:number = data.getStar();
		let list:ItemsModelInfo[] = this._model.getAllEquipList();
		let bottomList = [];
		if(star == 1)//红一星
		{
			for(let i =0;i<list.length;i++)
			{
				if(list[i].storagetype != 1)//去除身上装备
				{
					if(list[i].cvo.quality == 5)//橙色
					{
						if(list[i].getStar() == 2)
						{
							//去除主装备
							if(data.id != list[i].id || data.storagetype != list[i].storagetype)
							{
								//判断是否在升星表中
								for(let j=0;j<this._cvo.length;j++)
								{
									if(this._cvo[j].item_id == list[i].base_id && this._cvo[j].star == list[i].getStar())
									{
										bottomList.push(list[i]);
										break;
									}
								}
							}
						}
					}
				}
			}
		}else if(star == 2){//红二星
			for(let i =0;i<list.length;i++)
			{
				if(list[i].storagetype != 1)//去除身上装备
				{
					if(list[i].cvo.quality == 6)//红色
					{
						if(list[i].getStar() == 2 || list[i].getStar() == 3)
						{
							//去除主装备
							if(data.id != list[i].id || data.storagetype != list[i].storagetype)
							{
								//判断是否在升星表中
								for(let j=0;j<this._cvo.length;j++)
								{
									if(this._cvo[j].item_id == list[i].base_id  && this._cvo[j].star == list[i].getStar())
									{
										bottomList.push(list[i]);
										break;
									}
								}
							}
						}
					}
				}
			}
		}
		return bottomList;
	}


}