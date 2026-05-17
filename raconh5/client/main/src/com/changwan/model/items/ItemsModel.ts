class ItemsModel extends egret.EventDispatcher
{
    /**bag容量 */
    private _bagTotal:number=150;
    /**当前背包使用数 */
    private _curBagCount:number;
    /**deopt容量 */
    private _deoptTotal:number=70;
    public bagList:Array<ItemsModelInfo> = [];
    public depotList:Array<ItemsModelInfo> = [];
    /**列表<位置，信息> */
    public equipList:Dictionary<number,ItemsModelInfo> = new Dictionary<number,ItemsModelInfo>();
    /**
     * 部位强化数据
     */
    public equipStrengthenData:Dictionary<number, EquipStrengthenInfo> = new Dictionary<number, EquipStrengthenInfo>();
    public equipOldStrengthenLevel:Array<number>;
    /** 命格背包列表 */
    public lifeGridBagList:Array<ItemsModelInfo> = [];
    /** 已配戴的命格列表 */
    public lifeGridList:Array<ItemsModelInfo> = [];
    /** 命格容量 */
    private _lifeGridTotal:number=150;
    /** 属性版本号 */
    public attrVersion:number = 0;
    public addAttrVersion():void{ this.attrVersion++; }

    /**查询返回的物品数据 */
    public queryItemsList(pi:TCPPacketIn):void
    {
        var type:number = pi.readByte();
        var volume:number = pi.readShort();
        var ln:number = pi.readShort();
        var arr:ItemsModelInfo[] = [];
        for(var i:number = 0;i<ln;i++)
        {
            var items:ItemsModelInfo = new ItemsModelInfo();
            items.storagetype = type;
            items.id = pi.readInt();
            var pos:number = pi.readShort();
            items.pos = pos;
            items.base_id = pi.readInt();
            items.bind = pi.readByte() == 1;
            items.quantity = pi.readShort();
            var l:number = pi.readShort();
            for(var j:number= 0;j<l;j++)
            {
                var exarr:ExattrItemsinfo = new ExattrItemsinfo();
                exarr.type = pi.readShort();
                exarr.target = pi.readInt();
                exarr.value = pi.readInt();
                exarr.desc = pi.readUTF();
                items.infoList.push(exarr);
            }
            items.time = pi.readInt();
            arr.push(items);
        }

        if(type == ItemsType.BAG)
        {
             this._bagTotal = volume;
             this._curBagCount = ln;
        }
        if(type == ItemsType.DEPOT)
        {
            this._deoptTotal = volume;
        }
        if(type == ItemsType.LIFEGRIDBAG)
        {
            this._lifeGridTotal = volume;
        }
       this.updatelist(type,arr,false);
    }


     /**刷新物品数据 */
    public updateItemsList(pi:TCPPacketIn):void
    {
        var notice:boolean = pi.readByte() != 0;
        var type:number = pi.readByte();
        var ln:number = pi.readShort();
        var arr:ItemsModelInfo[] = [];
        for(var i:number = 0;i<ln;i++)
        {
            var items:ItemsModelInfo = new ItemsModelInfo();
            items.storagetype = type;
            items.id = pi.readInt();
            var pos:number = pi.readShort();
            items.pos = pos;
            items.base_id = pi.readInt();
            items.bind = pi.readByte() == 1;
            items.quantity = pi.readShort();
            var l:number = pi.readShort();
            for(var j:number= 0;j<l;j++)
            {
                var exarr:ExattrItemsinfo = new ExattrItemsinfo();
                exarr.type = pi.readShort();
                exarr.target = pi.readInt();
                exarr.value = pi.readInt();
                exarr.desc = pi.readUTF();
                items.infoList.push(exarr);
            }
            items.time = pi.readInt();
            arr.push (items);
        }
        this.updatelist(type,arr,notice);
    }

      /**增加物品数据 */
    public addTemsList(pi:TCPPacketIn):void
    {
        var notice:boolean = pi.readByte() != 0;
        var type:number = pi.readByte();
        var ln:number = pi.readShort();
        var arr:ItemsModelInfo[] = [];
        let hasEquip:boolean = false;
        for(var i:number = 0;i<ln;i++)
        {
            var items:ItemsModelInfo = new ItemsModelInfo();
            items.storagetype = type;
            items.id = pi.readInt();
            var pos:number = pi.readShort();
            items.pos = pos;
            items.base_id = pi.readInt();
            items.bind = pi.readByte() == 1;
            items.quantity = pi.readShort();
            var l:number = pi.readShort();
            for(var j:number= 0;j<l;j++)
            {
                var exarr:ExattrItemsinfo = new ExattrItemsinfo();
                exarr.type = pi.readShort();
                exarr.target = pi.readInt();
                exarr.value = pi.readInt();
                exarr.desc = pi.readUTF();
                items.infoList.push(exarr);
            }
            items.time = pi.readInt();
            this.addItemsList(type,items,notice);

            if(items.cvo.group == ItemsType.EQUIE) hasEquip = true;
        }
        if(type == ItemsType.BAG)
        {
            this._curBagCount = this.bagList.length;

            if(hasEquip && !Manager.render.contains(this.getCanUseBestEquipList, this))
            Manager.render.add(this.getCanUseBestEquipList, this, 1000);
        }
        this.dispatchEvent(new ItemsEvent(ItemsEvent.ITEM_UPDATE_EVENT,type));
    }
    private addItemsList(type:number,info:ItemsModelInfo,notice:boolean):void
    {
        switch(type)
        {
            case ItemsType.EQUIE:
               
                // if(this.equipList.containsKey(info.career * 100 + info.pos))
                // {
                //     this.equipList.remove(info.career * 100 + info.pos);
                // }
                // this.equipList.add(info.career * 100 + info.pos,info);

                if(this.equipList.containsKey(info.pos))
                {
                    this.equipList.remove(info.pos);
                }
                this.equipList.add(info.pos,info);
                
                break;
            case ItemsType.BAG:
                this.bagList.push(info);
                if(notice) FloatTips.addTips(LangCVO.getContent("item1") + HtmlUtil.addColorTag(info.cvo.name+" x "+info.quantity, Color.toColorStr(info.cvo.color)));//1	获得：
                this.checkItemNeedPrompt(info);
                break;
            case ItemsType.DEPOT:
                this.depotList.push(info);
                break;
            case ItemsType.LIFEGRIDBAG:
                this.lifeGridBagList.push(info);
                if(notice) 
                {
                    FloatTips.addTips(LangCVO.getContent("item1") + HtmlUtil.addColorTag(info.cvo.name+" x "+info.quantity, Color.toColorStr(info.cvo.color)));//1	获得：
                }
                break;
            case ItemsType.LIFEGRID:
                this.lifeGridList[info.pos] = info;
                break;

        }
        
    }

    private updatelist(type:number,arr:ItemsModelInfo[],notice:boolean):void
    {
         switch(type)
        {
            case ItemsType.EQUIE:
                for(var key of arr)
                {
                    let career:number = key.career;
                    let sort:number = key.pos;
                    // if(this.equipList.containsKey(career * 100 + sort))
                    // {
                    //     this.equipList.remove(career * 100 + sort);
                    // }
                    // this.equipList.add(career * 100 + sort,key);
                    if(this.equipList.containsKey(sort))
                    {
                        this.equipList.remove(sort);
                    }
                    this.equipList.add(sort,key);
                }
                this.dispatchEvent(new ItemsEvent(ItemsEvent.EQUIP_UPDATE_EVENT));
                break;
            case ItemsType.BAG:
                if(arr && arr.length > 0)
                {
                    let hasEquip:boolean = false;
                    for(let i:number= arr.length-1; i>-1; i--)
                    {
                        var disCount:number = arr[i].quantity;//增加的数量
                        let info:ItemsModelInfo = this.getItemPos(arr[i].pos,this.bagList);
                        if(info)
                        {
                            disCount -= info.quantity;
                            info.bind = arr[i].bind;
                            info.quantity = arr[i].quantity;
                            info.infoList = arr[i].infoList;
                        }
                        else
                        {
                            this.bagList.push(arr[i]);
                        }

                        if(notice && disCount > 0) FloatTips.addTips(LangCVO.getContent("item1") + HtmlUtil.addColorTag(arr[i].cvo.name+" x "+disCount, Color.toColorStr(arr[i].cvo.color)));
                        this.checkItemNeedPrompt(info);
                        if(info && info.cvo.group == ItemsType.EQUIE) hasEquip = true;
                    }

                    if(hasEquip && !Manager.render.contains(this.getCanUseBestEquipList, this))
                        Manager.render.add(this.getCanUseBestEquipList, this, 1000);
                }
                break;
            case ItemsType.DEPOT:
                 if(arr && arr.length > 0)
                {
                    for(let i:number= arr.length-1; i>-1; i--)
                    {
                        let info:ItemsModelInfo = this.getItemPos(arr[i].pos,this.depotList);
                        if(info)
                        {
                            info.bind = arr[i].bind;
                            info.quantity = arr[i].quantity;
                        }
                        else
                        {
                            this.depotList.push(arr[i]);
                        }
                    }
                }
                break;
            case ItemsType.LIFEGRIDBAG:
                for(let i:number= arr.length-1; i>-1; i--)
                {
                    let info:ItemsModelInfo = this.getItemPos(arr[i].pos,this.lifeGridBagList);
                    if(info)
                    {
                        info.bind = arr[i].bind;
                        info.quantity = arr[i].quantity;
                    }
                    else
                    {
                        this.lifeGridBagList.push(arr[i]);
                    }
                }
                break;
            case ItemsType.LIFEGRID:
                for(let i:number=0; i<arr.length; i++)
                {
                   this.lifeGridList[arr[i].pos] = arr[i];
                }
                break;


        }
        this.dispatchEvent(new ItemsEvent(ItemsEvent.ITEM_UPDATE_EVENT,type));
    }

    public updateEquipStrengthen(list:Array<Array<any>>):void
    {
        this.equipOldStrengthenLevel = [];
        if(list)
        {
            for(let i:number=0; i<list.length; i++)
            {
                let info:EquipStrengthenInfo = new EquipStrengthenInfo();
                info.pos = list[i][0];
                info.level = list[i][1];
                info.fighting = list[i][2];
                info.zhuhunLevel = list[i][3];
                info.zhuhunFighting = list[i][4];
                info.gemList = list[i][5];
                info.gemFighting = list[i][6];
                if(this.equipStrengthenData.containsKey(list[i][0]))
                {
                    let oldInfo:EquipStrengthenInfo = this.equipStrengthenData.get(list[i][0]);
                    if(oldInfo.level != info.level) this.equipOldStrengthenLevel.push(list[i][0]);
                    oldInfo.level = info.level;
                    oldInfo.fighting = info.fighting;
                    oldInfo.zhuhunLevel = info.zhuhunLevel;
                    oldInfo.zhuhunFighting = info.zhuhunFighting;
                    oldInfo.gemList = info.gemList;
                    oldInfo.gemFighting = info.gemFighting;
                }
                else
                    this.equipStrengthenData.add(info.pos, info);
            }

            for(let i:number=0; i<8; i++)
            {
                if(!this.equipStrengthenData.containsKey(i + 1))
                {
                    let info:EquipStrengthenInfo = new EquipStrengthenInfo();
                    info.pos = i + 1;
                    info.level = 0;
                    info.fighting = 0;
                    info.zhuhunLevel = 0;
                    info.zhuhunFighting = 0;
                    info.gemList = [];
                    info.gemFighting = 0;
                    this.equipStrengthenData.add(info.pos, info);
                }
            }
        }
        this.dispatchEvent(new ItemsEvent(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT));
    }
/**删除物品 */
    public dletelItems(pi:TCPPacketIn):void
    {
        var notice:number = pi.readByte();
        let type:number = pi.readByte();
        var ln:number = pi.readShort();
        var arr:number[] = [];
        for(var i:number= 0;i<ln;i++)
        {
            let id:number = pi.readInt();
           arr.push(id);
        }
        this.deleteList(arr,type);
    }
    private deleteList(list:number[],type:number):void
    {
        var ln:number;
        var i:number;
        switch(type)
        {
            case ItemsType.EQUIE:
                var arr:ItemsModelInfo[] = this.equipList.values();
                ln= arr.length;
                for(var id of list)
                {
                     for(i=0;i<ln;i++)
                    {
                        var info:ItemsModelInfo = arr[i]
                        if(info.id == id)
                        {
                            this.equipList.remove(info.pos);
                            break;
                        }
                    }
                }
                break;
            case ItemsType.BAG:
                 ln= this.bagList.length;
                 for(var id of list)
                {
                    for(i=0;i<ln;i++)
                    {
                        var info:ItemsModelInfo = this.bagList[i]
                        if(info.id == id)
                        {
                            this.bagList.splice(i,1);
                            break;
                        }
                    }
                }
                this._curBagCount = this.bagList.length;
                break;
            case ItemsType.DEPOT:
                ln = this.depotList.length;
                for(var id of list)
                {
                    for(i=0;i<ln;i++)
                    {
                        var info:ItemsModelInfo = this.depotList[i]
                        if(info.id == id)
                        {
                            this.depotList.splice(i,1);
                            break;
                        }
                    }
                }
                break;
            case ItemsType.LIFEGRID:
                for(var id of list)
                {
                    for(let i:number=0; i<this.lifeGridList.length; i++)
                    {
                         var info:ItemsModelInfo = this.lifeGridList[i]
                         if(info && info.id == id)
                         this.lifeGridList[info.pos] = null;
                    }
                }
                break;
            case ItemsType.LIFEGRIDBAG:
                for(var id of list)
                {
                    for(let i:number=0; i<this.lifeGridBagList.length; i++)
                    {
                         var info:ItemsModelInfo = this.lifeGridBagList[i]
                         if(info.id == id)
                         {
                            this.lifeGridBagList.splice(i,1);
                            break;
                        }
                    }
                }
                break;
        }
        this.dispatchEvent(new ItemsEvent(ItemsEvent.ITEM_UPDATE_EVENT,type));
    }
    /**bag总容量 */
    public get bagTotal():number
    {
        return this._bagTotal;
    }
    /**bag剩余容量 */
    public get bagSurplus():number
    {
        return this._bagTotal - this._curBagCount;
    }
    /**bag已使用容量 */
    public get curBagCount():number
    {
        return this._curBagCount;
    }
    /**仓库总容量 */
    public get deoptTotal():number
    {
        return this._deoptTotal;
    }

    /**
     * 获取某物品数量
     */
    public getCountItemById(value:number, isGetDepot:boolean = false):number
    {
        let count:number = 0;
        for(let i:number=0; i<this.bagList.length; i++)
        {
            if(this.bagList[i] && this.bagList[i].cvo.id == value)
            {
                count += this.bagList[i].quantity;
            }
        }
        if(isGetDepot)
        {
            for(let i:number=0; i<this.depotList.length; i++)
            {
                if(this.depotList[i] && this.depotList[i].cvo.id == value)
                {
                    count += this.depotList[i].quantity;
                }
            }
        }
        return count;
    }

    public getItemPos(pos:number,arr:ItemsModelInfo[]=this.bagList):ItemsModelInfo
    {
        let ln:number = arr.length;
        for(let i:number=0; i< ln; i++)
        {
            if(arr[i].pos == pos)
            {
                return arr[i];
            }
        }
        return null;
    }

    /**
     * 获取背包某类型物品
     */
    public getBagItemByList(type:number):Array<ItemsModelInfo>
    {
        let list:Array<ItemsModelInfo> = [];
        let cvo:ItemsCVO;
        for(let i:number=0; i<this.bagList.length; i++)
        {
            cvo = this.bagList[i].cvo;
            if(cvo && cvo.type == type)
            {
                list.push(this.bagList[i]);
            }
        }
        return list;
    }

    /**
     * 统计背包中某类型物品数据
     * type:宝石类型
     * level:宝石等级，设置后获取可替换宝石数量
     */
    public getCountBagItemByType(type:number, level:number = -1):number
    {
        let count:number = 0;
        let cvo:ItemsCVO;
        for(let i:number=0; i<this.bagList.length; i++)
        {
            cvo = this.bagList[i].cvo;
            if(cvo && cvo.type == type)
            {
                if(level == -1)
                    count += this.bagList[i].quantity;
                else
                {
                    let itemLevel:number = Number(String(cvo.id).substr(String(cvo.id).length - 2, 2));
                    if(itemLevel > level)
                        count += this.bagList[i].quantity;
                }
            }
        }
        return count;
    }

    /**
     * 统计某一等级宝石可升级材料数量
     */
    public getCountUpgradeByType(type:number, level:number):number
    {
        let count:number = 0;
        let list = {};
        let cvo:ItemsCVO;
        for(let i:number=0; i<this.bagList.length; i++)
        {
            cvo = this.bagList[i].cvo;
            if(cvo && cvo.type == type)
            {
                let tmpLevel:number = Number(String(cvo.id).substr(String(cvo.id).length - 2, 2));
                if(!list[tmpLevel])
                    list[tmpLevel] = this.bagList[i].quantity;
                else
                    list[tmpLevel] += this.bagList[i].quantity;
            }
        }
        for(let i:number = 1; i<=level; i++)
        {
            if(list[i])
            {
                let c:number = Math.floor(list[i] / 3);
                if(list[i + 1])
                    list[i + 1] += c;
                else
                    list[i + 1] = c;
            }
        }
        if(list[level])
            count = list[level];
        else
            count = 0;
        return count;
    }

    /**
     * 返回可熔炼物品列表
     * group--默认1人物装备
     */
    public getBagItemBySmelt(group:number = 1):Array<ItemsModelInfo>
    {
        let list:Array<ItemsModelInfo> = [];
        let cvo:ItemsCVO;
        for(let i:number=0; i<this.bagList.length; i++)
        {
            cvo = this.bagList[i].cvo;
            if(cvo && cvo.smelt && cvo.group == group)
            {
                let star:number = this.bagList[i].getStar();
			    if(cvo.quality == 5 && star == 2 || cvo.quality == 6 && star >= 1 && star <= 3) continue;
                list.push(this.bagList[i]);
            }
        }
        return list;
    }

    public getBagItem(group:number = 1):Array<ItemsModelInfo>
    {
        let list:Array<ItemsModelInfo> = [];
        let cvo:ItemsCVO;
        for(let i:number=0; i<this.bagList.length; i++)
        {
            cvo = this.bagList[i].cvo;
            if(cvo && cvo.smelt && cvo.group == group)
            {
                let star:number = this.bagList[i].getStar();
                list.push(this.bagList[i]);
            }
        }
        return list;
    }

    private _countCanUseBestEquip:number = 0;
    public canUpgradeEquipList:Array<ItemsModelInfo> = [];
    /**
     * 获取当前可以穿戴战力最高装备
     */
    public getCanUseBestEquip(pos:number = -1):ItemsModelInfo
    {
        this._countCanUseBestEquip += 1;
        // Trace.trace("======================getCanUseBestEquip:" + this._countCanUseBestEquip);

        this.canUpgradeEquipList = [];
        let itemList:Array<ItemsModelInfo> = [];
        let selfCareer:number = Manager.model.self.attrInfo.career;
        let itemPosList:Array<number> = [];
		for(let i:number=0; i<this.bagList.length; i++)
		{
			let itemInfo:ItemsCVO = this.bagList[i].cvo;
			if(itemInfo && itemInfo.group == ItemsType.EQUIE && this.bagList[i].career == selfCareer)
			{
                if(pos != -1 && this.bagList[i].cvo.pos != pos) continue;
                if(itemInfo.quality < 5) continue;
                let has:boolean = false;
                for(let j:number=0; j<itemList.length; j++)
                {
                    if(itemList[j].base_id == this.bagList[i].base_id)
                    {
                        has = true;
                        break;
                    }
                }
                if(!has)
                {
                    itemList.push(this.bagList[i]);
                    if(itemPosList.indexOf(this.bagList[i].cvo.pos) == -1)
                        itemPosList.push(this.bagList[i].cvo.pos);
                }
            }
        }
        if(itemList.length == 0) return null;
        for(let i:number=0; i<itemList.length; i++)
        {
            itemList[i].fight = ItemsModel.getEquipItemFight(itemList[i]);
        }
        // Trace.trace("=================item length:" + itemList.length);
        itemList.sort(this.sortOnFighting);

        let posFight = {};
        for(let i:number=1; i<=8; i++)
        {
            if(itemPosList.indexOf(i) != -1)
            {
                let equipItem:ItemsModelInfo = this.equipList.get(i);
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

        for(let i:number=0; i<itemList.length; i++)
        {
            if(posFight[itemList[i].cvo.pos] != 0)
			{
                let itemFight:number = itemList[i].fight;
				if(itemFight > posFight[itemList[i].cvo.pos])
				{
                    if(itemList[i].turnLevel == 0)
                    {
                        if(Manager.model.self.attrInfo.level >= itemList[i].cvo.needLevel)
                        {
                            if(this.canUpgradeEquipList.indexOf(itemList[i]) == -1)
                                this.canUpgradeEquipList.push(itemList[i]);
                        }
                    }
                    else if(itemList[i].turnLevel > 0)
                    {
                        if(Manager.model.self.attrInfo.zhuanshu >= itemList[i].turnLevel)
                        {
                            if(this.canUpgradeEquipList.indexOf(itemList[i]) == -1)
                                this.canUpgradeEquipList.push(itemList[i]);
                        }
                    }
				}
            }
            else
            {
                if(itemList[i].turnLevel == 0)
                {
                    if(Manager.model.self.attrInfo.level >= itemList[i].cvo.needLevel)
                    {
                        if(this.canUpgradeEquipList.indexOf(itemList[i]) == -1)
                            this.canUpgradeEquipList.push(itemList[i]);
                    }
                }
                else if(itemList[i].turnLevel > 0)
                {
                    if(Manager.model.self.attrInfo.zhuanshu >= itemList[i].turnLevel)
                    {
                        if(this.canUpgradeEquipList.indexOf(itemList[i]) == -1)
                            this.canUpgradeEquipList.push(itemList[i]);
                    }
                }
            }
		}
        if(this.canUpgradeEquipList.length > 0)
            return this.canUpgradeEquipList[0];
        else
            return null;
    }

    public oneKeyUpgradeEquipList:Array<ItemsModelInfo> = [];

    /**
     * 获取当前可以穿戴战力最高装备列表
     */
    public getCanUseBestEquipList():void
    {
        Manager.render.remove(this.getCanUseBestEquipList, this);

        // Trace.trace("======================getCanUseBestEquipList=======");
        this.oneKeyUpgradeEquipList = [];
        let itemList:Array<ItemsModelInfo> = [];
        let selfCareer:number = Manager.model.self.attrInfo.career;
        let itemPosList:Array<number> = [];
		for(let i:number=0; i<this.bagList.length; i++)
		{
			let itemInfo:ItemsCVO = this.bagList[i].cvo;
			if(itemInfo && itemInfo.group == ItemsType.EQUIE && this.bagList[i].career == selfCareer)
			{
                let equipItem:ItemsModelInfo = this.equipList.get(this.bagList[i].cvo.pos);
                if(equipItem && this.bagList[i].base_id < equipItem.base_id) continue;
                let has:boolean = false;
                for(let j:number=0; j<itemList.length; j++)
                {
                    if(itemList[j].base_id == this.bagList[i].base_id)
                    {
                        has = true;
                        break;
                    }
                }
                if(!has)
                {
                    itemList.push(this.bagList[i]);
                    if(itemPosList.indexOf(this.bagList[i].cvo.pos) == -1)
                        itemPosList.push(this.bagList[i].cvo.pos);
                }
            }
        }
        if(itemList.length > 0)
        {
            for(let i:number=0; i<itemList.length; i++)
            {
                itemList[i].fight = ItemsModel.getEquipItemFight(itemList[i]);
            }
            // Trace.trace("=================item length:" + itemList.length);
            itemList.sort(this.sortOnFighting);

            let posFight = {};
            for(let i:number=1; i<=8; i++)
            {
                if(itemPosList.indexOf(i) != -1)
                {
                    let equipItem:ItemsModelInfo = this.equipList.get(i);
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

            let itemTypeList:Array<number> = [];
            for(let i:number=1; i<=8; i++)
            {
                for(let j:number=0; j<itemList.length; j++)
                {
                    if(itemList[j].cvo.pos != i) continue;
                    if(itemTypeList.indexOf(i) != -1) break;
                    if(posFight[itemList[j].cvo.pos] == 0)
                    {
                        this.oneKeyUpgradeEquipList.push(itemList[j]);
                        itemTypeList.push(itemList[j].cvo.pos);
                        break;
                    }
                    else
                    {
                        if(itemList[j].fight > posFight[itemList[j].cvo.pos])
                        {
                            if(itemList[j].turnLevel == 0)
                            {
                                if(Manager.model.self.attrInfo.level >= itemList[j].cvo.needLevel)
                                {
                                    this.oneKeyUpgradeEquipList.push(itemList[j]);
                                    itemTypeList.push(itemList[j].cvo.pos);
                                    break;
                                }
                            }
                            else if(itemList[j].turnLevel > 0)
                            {
                                if(Manager.model.self.attrInfo.zhuanshu >= itemList[j].turnLevel)
                                {
                                    this.oneKeyUpgradeEquipList.push(itemList[j]);
                                    itemTypeList.push(itemList[j].cvo.pos);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        
        this.dispatchEvent(new ItemsEvent(ItemsEvent.ONEKEY_UPGRADE_EQUIP_LIST));
    }

    /**
     * 按战力倒序排序
     */
    private sortOnFighting(info1:ItemsModelInfo, info2:ItemsModelInfo):number
    {
        if(info1.fight < info2.fight)
            return 1;
        else if(info1.fight > info2.fight)
            return -1;
        else
            return 0;
    }
    public get lifeGridTotal():number
    {
        return this._lifeGridTotal;
    }
    /**
     * 使用物品返回结果
     * base_id 使用的物品
     * arr     物品例表
     */
    public sueItemResultReturn(base_id:number,arr:ItemsModelInfo[]):void
    {
        let cvo:ItemsCVO = ItemsCVO.getCvo(base_id);
        if(cvo.group == ItemsType.GROUP_GIFT && cvo.type == ItemsType.TYPE_GIFT)
        {
            Manager.view.show(ViewID.ItemUseResultWin,arr,base_id);
        }
    }
    /**
     * 找到对应的baseid的ItemsModelInfo,,取第一个对应的
     */
    public getItemModesInfo(base_id:number):ItemsModelInfo
    {
        for(let i:number=0; i<this.bagList.length; i++)
        {
            if(this.bagList[i] && this.bagList[i].base_id == base_id)
            {
                return this.bagList[i]
            }
        }
    }
    /** 背包命格是足够 true为足够   value=0侧返回命格背包是否已满  */
    public checkLifeGridBagAmple(value:number=0):boolean
    {
        if(value>0)
        {
            let num:number = this._lifeGridTotal - this.lifeGridBagList.length;
            return num >=value;
        }
        return this.lifeGridBagList.length >= this._lifeGridTotal;
    }

    private static _equipFightCount:number = 0;

    /**获取装备战斗力 */
    public static getEquipItemFight(itemModelInfo:ItemsModelInfo):number
    {
        this._equipFightCount += 1;
        // Trace.trace("==============equipFightCount:" + this._equipFightCount);

        if(!itemModelInfo.cvo) return 0;
        if(itemModelInfo.attrVersion == Manager.model.getItems().attrVersion) return itemModelInfo.fight;
        let fighting:number= 0;
        //属性战力
        let attrArr:Array<AttrVoInfo> = [];
        let attr:AttrVO = Manager.pool.create(AttrVO, itemModelInfo.cvo.attr);
        if(attr)
        {
            attrArr = attr.attrInfos;
            fighting += attr.getFighting();
        }
        
        //铸魂和宝石战力
        let strengthenLevel:number = 0;
        let strengthenInfo:EquipStrengthenInfo = Manager.model.getItems().equipStrengthenData.get(itemModelInfo.cvo.pos);
		if(strengthenInfo)
        {
            strengthenLevel = strengthenInfo.level;
            fighting += strengthenInfo.zhuhunFighting + strengthenInfo.gemFighting;
        }
        //强化战力
        let attrVO:AttrVO;
        if(strengthenLevel > 0)
        {
            let info:EquipStrengthenCVO = EquipStrengthenCVO.getInfo(itemModelInfo.cvo.pos, strengthenLevel);
            if(info && info.attr.length > 0)
            {
                let str:string = attrArr[0].id+","+ info.attr[0][1]+"|"+attrArr[1].id+","+info.attr[1][1];
                attrVO = Manager.pool.create(AttrVO,str);
                fighting += attrVO.getFighting();
                Manager.pool.push(attrVO);
            }
        }
        //极品属性战力
		if(itemModelInfo.infoList.length > 0)
		{
			let arrList:Array<ExattrItemsinfo> = itemModelInfo.infoList;
			let bestArrList:Array<ExattrItemsinfo> = [];
			let bestArrInfo:ExattrItemsinfo;
			for(let i:number=0; i<arrList.length; i++)
			{
				bestArrInfo = arrList[i];
				if(bestArrInfo.type == 1)
				{
					//1为极品属性
					bestArrList.push(bestArrInfo);
				}
			}
			if(bestArrList.length>0)
			{
				for(let i:number=0; i<bestArrList.length; i++)
				{
					bestArrInfo = bestArrList[i];
                    if(bestArrInfo)
                    {
                        attrVO = Manager.pool.create(AttrVO, bestArrInfo.target + "," + bestArrInfo.value);
                        fighting += attrVO.getFighting();
                        Manager.pool.push(attrVO);
                    }
				}
			}
		}
        Manager.pool.push(attr);
        itemModelInfo.fight = fighting;
        itemModelInfo.attrVersion = Manager.model.getItems().attrVersion;
        return itemModelInfo.fight;
    }

    public useItems(info:ItemsModelInfo, count:number):void
    {
        switch(info.cvo.type)
		{
			case ItemsConst.TYPE_TITLE:
				Manager.control.getDress().actTitle(info.cvo.type, info.cvo.id);
			break;
			default:
				Manager.control.getItems().useItems(info.id,count,info.base_id);
			break;
		}
    }



    //查看是否要弹窗
	private checkItemNeedPrompt(itemInfo:ItemsModelInfo)
	{
		if(itemInfo && itemInfo.cvo && itemInfo.cvo.prompt && OpenCVO.isOpen(itemInfo.cvo.openID))
		{
			// Manager.tips.changeEquipTips.setData(itemInfo);
            Manager.pool.create(ItemsPrompt, itemInfo);
		}
	}

    public sortBagList():void
    {
        this.bagList = ArrayUtil.sortOn(this.bagList,["pos"]);
    }
    public sortDepotList():void
    {
        this.depotList = ArrayUtil.sortOn(this.depotList,["pos"]);
    }

}