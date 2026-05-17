class EquipModel extends egret.EventDispatcher
{
	//宝石类型列表:红21，绿22，蓝23
	private static GEM_TYPE_LIST:Array<number> = [21, 22, 23];
	//铸魂最高等级
	public static ZHUHUAN_MAX_LEVEL:number = 15;
	/**套装最高等级 */
	public static SUIT_MAX_LEVEL:number = 10;
	/**攻击套装类型列表 */
	public static SUIT_ATTACK_POS:Array<number> = [EquipType.EQUIP_WEAPON, EquipType.EQUIP_NECKLACE, EquipType.EQUIP_JADE];
	// public static SUIT_DEFENSE_POS:Array<number> = [EquipType.EQUIP_AMULET, EquipType.EQUIP_HELMET, EquipType.EQUIP_CLOTHES, EquipType.EQUIP_GLOVE, EquipType.EQUIP_SHOES];
	/**防御套装类型列表 */
	public static SUIT_DEFENSE_POS:Array<number> = [EquipType.EQUIP_HELMET, EquipType.EQUIP_CLOTHES, EquipType.EQUIP_GLOVE, EquipType.EQUIP_SHOES, EquipType.EQUIP_AMULET];

	public initLocal:number = -1;
	public equipItemLocalByGem:number = -1;

	/**攻击套装数据 */
	public equipSuitAttackList:Array<any> = [];
	/**防御套装数据 */
	public equipSuitDefenseList:Array<any> = [];

	/**铸魂额外战力 */
	public zhuhuanOtherFight:number = 0;
	/**宝石额外战力 */
	public gemOtherFight:number = 0;

	/**套装总战力 */
	public suitAllFight:number = 0;

    public constructor()
    {
		super();
	}

	/**
	 * 获取强化总等级
	 */
	public getTotalStrengthenLevel():number
	{
		let ret:number = 0;
		let equipList:Dictionary<number,EquipStrengthenInfo> = Manager.model.getItems().equipStrengthenData;
		for(let i:number=1; i<=8; i++)
		{
			let info:EquipStrengthenInfo = equipList.get(i);
			if(info)
			{
				ret += info.level;
			}
		}
		return ret;
	}

	/**
	 * 获取宝石总等级
	 */
	public getTotalGemLevel():number
	{
		let equipList:Dictionary<number,EquipStrengthenInfo> = Manager.model.getItems().equipStrengthenData;
		let count:number = 0;
		for(let i:number=1; i<=8; i++)
		{
			let info:EquipStrengthenInfo = equipList.get(i);
			if(info && info.gemList.length > 0)
			{
				for(let j:number=0; j<info.gemList.length; j++)
				{
					let id:number = info.gemList[j].gemId;
					let level:number = Number(String(id).substr(String(id).length - 2, 2));
					count += level;
				}
			}
		}
		return count;
	}

	/**
	 * 获取铸魂总等级
	 */
	public getTotalZhuhuanLevel():number
	{
		let ret:number = 0;
		let equipList:Dictionary<number,EquipStrengthenInfo> = Manager.model.getItems().equipStrengthenData;
		for(let i:number=1; i<=8; i++)
		{
			let info:EquipStrengthenInfo = equipList.get(i);
			if(info)
				ret += info.zhuhunLevel;
		}
		return ret;
	}

    public getCanRonglianItems(maxCount:number = 9999):Array<ItemsModelInfo>
    {
        let itemList:Array<ItemsModelInfo> = [];
		let itemPosList:Array<number> = [];
		let equipList:Dictionary<number,ItemsModelInfo> = Manager.model.getItems().equipList;
		let list:Array<ItemsModelInfo> = Manager.model.getItems().getBagItemBySmelt();
		if(list.length == 0) return [];
		for(let i:number=0; i<list.length; i++)
		{
			list[i].fight = ItemsModel.getEquipItemFight(list[i]);
			if(itemPosList.indexOf(list[i].cvo.pos) == -1)
				itemPosList.push(list[i].cvo.pos);
		}
		// ArrayUtil.sortOn(list, ["fight"], [1]);

		// console.log("==1===list:" + list.length);
		
		let posFight = {};
        for(let i:number=1; i<=8; i++)
        {
            if(itemPosList.indexOf(i) != -1)
            {
                let equipItem:ItemsModelInfo = equipList.get(i);
                if(equipItem)
                    posFight[i] = ItemsModel.getEquipItemFight(equipItem);
                else
                    posFight[i] = 0;
            }
            else
            {
                posFight[i] = 0;
            }
        }

		// for(let i:number=1; i<=8; i++)
		// {
		// 	if(posFight[i] == 0)
		// 	{
		// 		for(let j:number=0; j<list.length; j++)
		// 		{
		// 			let itemInfo:ItemsModelInfo = list[j];
		// 			if(itemInfo.cvo.pos == i)
		// 			{
		// 				list.splice(j, 1);
		// 				break;
		// 			}
		// 		}
		// 	}
		// }

		// console.log("==2===list:" + list.length);

		for(let i:number=0; i<list.length; i++)
		{
			let itemInfo:ItemsModelInfo = list[i];
			if(itemInfo)
			{
				for(let j:number=1; j<=8; j++)
				{
					let info:ItemsModelInfo = equipList.get(j);
					if(info)
					{
						if(itemInfo.cvo.pos == info.cvo.pos)
						{
							// if(posFight[info.cvo.pos] == 0 || posFight[info.cvo.pos] >= itemInfo.fight)
							if(posFight[info.cvo.pos] >= itemInfo.fight)
							{
								if(itemList.length < maxCount)
									itemList.push(itemInfo);
								break;
							}
						}
					// }
					// else
					// {
					// 	if(itemList.length < maxCount)
					// 		itemList.push(itemInfo);
					// 	break;
					}
				}
			}
			if(itemList.length >= maxCount) break;
		}
        return itemList;
    }

	public checkCanRonglian():boolean
    {
		let itemList:Array<ItemsModelInfo> = this.getCanRonglianItems(50);
		if(itemList && itemList.length >= 50)
			return true;
		else
			return false;
	}

	public checkEquipUpgrade():boolean
	{
		this.initLocal = -1;
		return this.checkCanStrengthen() || this.checkGemCanPuton() || this.checkCanZhuhun() || this.checkCanSuitUpgrade() || Manager.model.getStarUp().checkCoin();
	}

	/**
     * 判断有足够强化全身装备一次物品
     */
    public checkCanStrengthen():boolean
    {
		if(!OpenCVO.isOpen(OpenConst.ID_STRENGTHEN)) return false;
        let itemList:Object = {};
        for(let i:number=0; i<8; i++)
        {
            let level:number = 0;
            let info:EquipStrengthenInfo = Manager.model.getItems().equipStrengthenData.get(i + 1);
            if(info) level = info.level;
            for(let j:number=0; j<1; j++)
            {
                let cvoInfo:EquipStrengthenCVO = EquipStrengthenCVO.getInfo(i + 1, level + j);
                if(cvoInfo)
                {
                    if(!itemList[cvoInfo.itemId])
                        itemList[cvoInfo.itemId] = {itemId:cvoInfo.itemId, count:cvoInfo.amount};
                    else
                        itemList[cvoInfo.itemId].count += cvoInfo.amount;
                }
            }
        }
        let ret:boolean = true;
        for(let item in itemList)
        {
            let count:number = Manager.model.getItems().getCountItemById(itemList[item].itemId);
            if(count < itemList[item].count)
            {
                ret = false;
                break;
            }
        }
		if(ret) this.initLocal = 0;
        return ret;
    }

	/**
	 * 判断是否有可镶嵌宝石
	 */
	public checkGemCanPuton():boolean
	{
		if(!OpenCVO.isOpen(OpenConst.ID_GEM)) return false;
		let list:Array<any> = [];
		for(let i:number=1; i<=8; i++)
		{
			let equipInfo:ItemsModelInfo = Manager.model.getItems().equipList.get(i);
			if(equipInfo)
			{
				let info:EquipStrengthenInfo = Manager.model.getItems().equipStrengthenData.get(i);
				if(info)
				{
					let tmpList:Array<number> = [1,2,3];
					let min:number = -1;
					for(let j:number=0; j<info.gemList.length; j++)
					{
						let pos:number = info.gemList[j].gemPos;
						let index:number = tmpList.indexOf(pos);
						if(index != -1)
						{
							tmpList.splice(index, 1);

							let num:number = Number(String(info.gemList[j].gemId).substr(String(info.gemList[j].gemId).length - 2, 2));
							//查找可替换
							if(Manager.model.getItems().getCountBagItemByType(EquipModel.GEM_TYPE_LIST[pos - 1], num) > 0)
							{
								if(min == -1)
									min = num;
								else
									if(num < min) min = num;
							}
							else
							{
								//查找可升级
								if(Manager.model.getItems().getCountUpgradeByType(EquipModel.GEM_TYPE_LIST[pos - 1], num) >= 2)
								{
									if(min == -1)
										min = num;
									else
										if(num < min) min = num;
								}
							}
						}
					}
					if(tmpList.length > 0)
					{
						for(let j:number=0; j<tmpList.length; j++)
						{
							if(Manager.model.getItems().getCountBagItemByType(EquipModel.GEM_TYPE_LIST[tmpList[j] - 1]) > 0)
							{
								min = 0;
								break;
							}
						}
					}
					if(min != -1)
						list.push({pos:i, num:min});
				}
				else
				{
					//当前装备有材料并没有镶嵌情况下优化选择
					let has:boolean = false;
					for(let j:number=0; j<EquipModel.GEM_TYPE_LIST.length; j++)
					{
						if(Manager.model.getItems().getCountBagItemByType(EquipModel.GEM_TYPE_LIST[j]) > 0)
						{
							has = true;
							break;
						}
					}
					if(has)
					{
						if(this.initLocal == -1 || this.initLocal > 1) this.initLocal = 1;
						return true;
					}
				}
			}
		}
		if(list.length > 0)
		{
			if(this.initLocal == -1 || this.initLocal > 1) this.initLocal = 1;
			return true;
		}
		else
			return false;
	}

	/**
	 * 返回操作物品ID和类型:1为镶嵌，2,升级，3,为替换
	 * itemType:物品类型
	 * type:1为镶嵌，2为替换或升级
	 * curItemId:当前位置物品ID
	 */
	public getBestItemId(itemType:number, type:number, curItemId:number):Array<number>
	{
		let retItemId:number = 0;
		let retType:number = 0;
		let list: Array<ItemsModelInfo> = Manager.model.getItems().getBagItemByList(itemType);
		if (list && list.length > 0)
		{
			let itemList:Array<any> = [];
			if(curItemId != 0) itemList.push({id:curItemId, count:1});
			for(let i:number=0; i<list.length; i++)
			{
				let has:boolean = false;
				for(let j:number=0; j<itemList.length; j++)
				{
					if(itemList[j].id == list[i].base_id)
					{
						has = true;
						itemList[j].count += list[i].quantity;
					}
				}
				if(!has)
					itemList.push({id:list[i].base_id, count:list[i].quantity});
			}
			itemList = ArrayUtil.sortOn(itemList, ["id"], [0]);
			let curBestId:number = 0;
			if(itemList.length > 0)
				curBestId = itemList[itemList.length - 1].id;
			if(type == 1)
			{
				retItemId = curBestId;
				retType = 1;
			}
			else
			{
				for(let i:number=0; i<itemList.length; i++)
				{
					if(itemList[i].id < curItemId)
					{
						let count:number = Math.floor(itemList[i].count / 3);
						if(count > 0)
						{
							let has:boolean = false;
							let id:number = itemList[i].id + 1;
							for(let j:number=0; j<itemList.length; j++)
							{
								if(itemList[j].id == id)
								{
									has = true;
									itemList[j].count += count;
									itemList[i].count -= 3 * count;
								}
							}
							if(!has)
							{
								itemList.push({id:id, count:count});
								itemList[i].count -= 3 * count;
								itemList = ArrayUtil.sortOn(itemList, ["id"], [0]);
							}
						}
					}
				}

				itemList = ArrayUtil.sortOn(itemList, ["id"], [1]);
				for(let i:number=0; i<itemList.length; i++)
				{
					let info:ItemsCVO = ItemsCVO.getCvo(itemList[i].id);
					if(info)
					{
						retItemId = info.id;
						if(retItemId > curItemId)
						{
							let count:number = Manager.model.getItems().getCountItemById(retItemId);
							if(count > 0)
							{
								retType = 3;
								break;
							}
						}
						else if(retItemId == curItemId)
						{
							if(itemList[i].count >= 3)
							{
								retType = 2;
								break;
							}
						}
					}
				}
			}
		}
		return [retItemId, retType];
	}

	/**
	 * 判断是否有足够物品铸魂
	 */
	public checkCanZhuhun():boolean
	{
		if(!OpenCVO.isOpen(OpenConst.ID_ZHUHUN)) return false;
		let ret:boolean = false;
		for(let i:number=1; i<=8; i++)
		{
			ret = false;
			let equipInfo:ItemsModelInfo = Manager.model.getItems().equipList.get(i);
			if(equipInfo)
			{
				let zhuhunLevel:number = 0;
				let info:EquipStrengthenInfo = Manager.model.getItems().equipStrengthenData.get(i);
				if(info) zhuhunLevel = info.zhuhunLevel;
				if(zhuhunLevel >= EquipModel.ZHUHUAN_MAX_LEVEL) continue;
				let cvoInfo:EquipZhuhunCVO = EquipZhuhunCVO.getInfo(Manager.model.self.attrInfo.career, i, zhuhunLevel);
				if(cvoInfo)
				{
					let can:boolean = true;
					for(let j:number=0; j<cvoInfo.itemList.length; j++)
					{
						if(Manager.model.getItems().getCountItemById(cvoInfo.itemList[j].baseId) < cvoInfo.itemList[j].num)
						{
							can = false;
							break;
						}
					}
					ret = can;
					if(ret) break;
				}
			}
		}
		if(ret && (this.initLocal == -1 || this.initLocal > 2)) this.initLocal = 2;
		return ret;
	}

	/**
	 * 判断是否可以套装升级
	 */
	public checkCanSuitUpgrade():boolean
	{
		if(!OpenCVO.isOpen(OpenConst.ID_SUIT)) return false;
		let ret:boolean = false;
		for(let i:number=0; i<EquipModel.SUIT_ATTACK_POS.length; i++)
		{
			let level:number = 1;
			for(let j:number=0; j<this.equipSuitAttackList.length; j++)
			{
				if(this.equipSuitAttackList[j].pos == EquipModel.SUIT_ATTACK_POS[i])
				{
					level = this.equipSuitAttackList[j].level + 1;
					break;
				}
			}
			if(level <= EquipModel.SUIT_MAX_LEVEL)
			{
				let info:SuitUpgradeCVO = SuitCVO.getSuitUpgradeInfo(level, EquipModel.SUIT_ATTACK_POS[i]);
				if(info)
				{
					let num:number = Manager.model.getItems().getCountItemById(info.loss.baseId);
					if(num >= info.loss.num)
					{
						ret = true;
						break;
					}
				}
			}
		}

		for(let i:number=0; i<EquipModel.SUIT_DEFENSE_POS.length; i++)
		{
			let level:number = 1;
			for(let j:number=0; j<this.equipSuitDefenseList.length; j++)
			{
				if(this.equipSuitDefenseList[j].pos == EquipModel.SUIT_DEFENSE_POS[i])
				{
					level = this.equipSuitDefenseList[j].level + 1;
					break;
				}
			}
			if(level <= EquipModel.SUIT_MAX_LEVEL)
			{
				let info:SuitUpgradeCVO = SuitCVO.getSuitUpgradeInfo(level, EquipModel.SUIT_DEFENSE_POS[i]);
				if(info)
				{
					let num:number = Manager.model.getItems().getCountItemById(info.loss.baseId);
					if(num >= info.loss.num)
					{
						ret = true;
						break;
					}
				}
			}
		}

		return ret;
	}

	/**
	 * 获取强化最大一个部位的强化等级
	 */
	public getMaxStrengthenLevel():number
	{
		let ret:number = 0;
		let equipList:Dictionary<number,EquipStrengthenInfo> = Manager.model.getItems().equipStrengthenData;
		for(let i:number=1; i<=8; i++)
		{
			let info:EquipStrengthenInfo = equipList.get(i);
			if(info)
			{
				if(info.level > ret)
					ret = info.level;
			}
			
		}
		return ret;
	}
}