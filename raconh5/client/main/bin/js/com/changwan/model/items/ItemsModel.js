var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ItemsModel = /** @class */ (function (_super) {
    __extends(ItemsModel, _super);
    function ItemsModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**bag容量 */
        _this._bagTotal = 150;
        /**deopt容量 */
        _this._deoptTotal = 70;
        _this.bagList = [];
        _this.depotList = [];
        /**列表<位置，信息> */
        _this.equipList = new Dictionary();
        /**
         * 部位强化数据
         */
        _this.equipStrengthenData = new Dictionary();
        /** 命格背包列表 */
        _this.lifeGridBagList = [];
        /** 已配戴的命格列表 */
        _this.lifeGridList = [];
        /** 命格容量 */
        _this._lifeGridTotal = 150;
        /** 属性版本号 */
        _this.attrVersion = 0;
        _this._countCanUseBestEquip = 0;
        _this.canUpgradeEquipList = [];
        _this.oneKeyUpgradeEquipList = [];
        return _this;
    }
    ItemsModel.prototype.addAttrVersion = function () { this.attrVersion++; };
    /**查询返回的物品数据 */
    ItemsModel.prototype.queryItemsList = function (pi) {
        var type = pi.readByte();
        var volume = pi.readShort();
        var ln = pi.readShort();
        var arr = [];
        for (var i = 0; i < ln; i++) {
            var items = new ItemsModelInfo();
            items.storagetype = type;
            items.id = pi.readInt();
            var pos = pi.readShort();
            items.pos = pos;
            items.base_id = pi.readInt();
            items.bind = pi.readByte() == 1;
            items.quantity = pi.readShort();
            var l = pi.readShort();
            for (var j = 0; j < l; j++) {
                var exarr = new ExattrItemsinfo();
                exarr.type = pi.readShort();
                exarr.target = pi.readInt();
                exarr.value = pi.readInt();
                exarr.desc = pi.readUTF();
                items.infoList.push(exarr);
            }
            items.time = pi.readInt();
            arr.push(items);
        }
        if (type == ItemsType.BAG) {
            this._bagTotal = volume;
            this._curBagCount = ln;
        }
        if (type == ItemsType.DEPOT) {
            this._deoptTotal = volume;
        }
        if (type == ItemsType.LIFEGRIDBAG) {
            this._lifeGridTotal = volume;
        }
        this.updatelist(type, arr, false);
    };
    /**刷新物品数据 */
    ItemsModel.prototype.updateItemsList = function (pi) {
        var notice = pi.readByte() != 0;
        var type = pi.readByte();
        var ln = pi.readShort();
        var arr = [];
        for (var i = 0; i < ln; i++) {
            var items = new ItemsModelInfo();
            items.storagetype = type;
            items.id = pi.readInt();
            var pos = pi.readShort();
            items.pos = pos;
            items.base_id = pi.readInt();
            items.bind = pi.readByte() == 1;
            items.quantity = pi.readShort();
            var l = pi.readShort();
            for (var j = 0; j < l; j++) {
                var exarr = new ExattrItemsinfo();
                exarr.type = pi.readShort();
                exarr.target = pi.readInt();
                exarr.value = pi.readInt();
                exarr.desc = pi.readUTF();
                items.infoList.push(exarr);
            }
            items.time = pi.readInt();
            arr.push(items);
        }
        this.updatelist(type, arr, notice);
    };
    /**增加物品数据 */
    ItemsModel.prototype.addTemsList = function (pi) {
        var notice = pi.readByte() != 0;
        var type = pi.readByte();
        var ln = pi.readShort();
        var arr = [];
        var hasEquip = false;
        for (var i = 0; i < ln; i++) {
            var items = new ItemsModelInfo();
            items.storagetype = type;
            items.id = pi.readInt();
            var pos = pi.readShort();
            items.pos = pos;
            items.base_id = pi.readInt();
            items.bind = pi.readByte() == 1;
            items.quantity = pi.readShort();
            var l = pi.readShort();
            for (var j = 0; j < l; j++) {
                var exarr = new ExattrItemsinfo();
                exarr.type = pi.readShort();
                exarr.target = pi.readInt();
                exarr.value = pi.readInt();
                exarr.desc = pi.readUTF();
                items.infoList.push(exarr);
            }
            items.time = pi.readInt();
            this.addItemsList(type, items, notice);
            if (items.cvo.group == ItemsType.EQUIE)
                hasEquip = true;
        }
        if (type == ItemsType.BAG) {
            this._curBagCount = this.bagList.length;
            if (hasEquip && !Manager.render.contains(this.getCanUseBestEquipList, this))
                Manager.render.add(this.getCanUseBestEquipList, this, 1000);
        }
        this.dispatchEvent(new ItemsEvent(ItemsEvent.ITEM_UPDATE_EVENT, type));
    };
    ItemsModel.prototype.addItemsList = function (type, info, notice) {
        switch (type) {
            case ItemsType.EQUIE:
                // if(this.equipList.containsKey(info.career * 100 + info.pos))
                // {
                //     this.equipList.remove(info.career * 100 + info.pos);
                // }
                // this.equipList.add(info.career * 100 + info.pos,info);
                if (this.equipList.containsKey(info.pos)) {
                    this.equipList.remove(info.pos);
                }
                this.equipList.add(info.pos, info);
                break;
            case ItemsType.BAG:
                this.bagList.push(info);
                if (notice)
                    FloatTips.addTips(LangCVO.getContent("item1") + HtmlUtil.addColorTag(info.cvo.name + " x " + info.quantity, Color.toColorStr(info.cvo.color))); //1	获得：
                this.checkItemNeedPrompt(info);
                break;
            case ItemsType.DEPOT:
                this.depotList.push(info);
                break;
            case ItemsType.LIFEGRIDBAG:
                this.lifeGridBagList.push(info);
                if (notice) {
                    FloatTips.addTips(LangCVO.getContent("item1") + HtmlUtil.addColorTag(info.cvo.name + " x " + info.quantity, Color.toColorStr(info.cvo.color))); //1	获得：
                }
                break;
            case ItemsType.LIFEGRID:
                this.lifeGridList[info.pos] = info;
                break;
        }
    };
    ItemsModel.prototype.updatelist = function (type, arr, notice) {
        switch (type) {
            case ItemsType.EQUIE:
                for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                    var key = arr_1[_i];
                    var career = key.career;
                    var sort = key.pos;
                    // if(this.equipList.containsKey(career * 100 + sort))
                    // {
                    //     this.equipList.remove(career * 100 + sort);
                    // }
                    // this.equipList.add(career * 100 + sort,key);
                    if (this.equipList.containsKey(sort)) {
                        this.equipList.remove(sort);
                    }
                    this.equipList.add(sort, key);
                }
                this.dispatchEvent(new ItemsEvent(ItemsEvent.EQUIP_UPDATE_EVENT));
                break;
            case ItemsType.BAG:
                if (arr && arr.length > 0) {
                    var hasEquip = false;
                    for (var i = arr.length - 1; i > -1; i--) {
                        var disCount = arr[i].quantity; //增加的数量
                        var info = this.getItemPos(arr[i].pos, this.bagList);
                        if (info) {
                            disCount -= info.quantity;
                            info.bind = arr[i].bind;
                            info.quantity = arr[i].quantity;
                            info.infoList = arr[i].infoList;
                        }
                        else {
                            this.bagList.push(arr[i]);
                        }
                        if (notice && disCount > 0)
                            FloatTips.addTips(LangCVO.getContent("item1") + HtmlUtil.addColorTag(arr[i].cvo.name + " x " + disCount, Color.toColorStr(arr[i].cvo.color)));
                        this.checkItemNeedPrompt(info);
                        if (info && info.cvo.group == ItemsType.EQUIE)
                            hasEquip = true;
                    }
                    if (hasEquip && !Manager.render.contains(this.getCanUseBestEquipList, this))
                        Manager.render.add(this.getCanUseBestEquipList, this, 1000);
                }
                break;
            case ItemsType.DEPOT:
                if (arr && arr.length > 0) {
                    for (var i = arr.length - 1; i > -1; i--) {
                        var info = this.getItemPos(arr[i].pos, this.depotList);
                        if (info) {
                            info.bind = arr[i].bind;
                            info.quantity = arr[i].quantity;
                        }
                        else {
                            this.depotList.push(arr[i]);
                        }
                    }
                }
                break;
            case ItemsType.LIFEGRIDBAG:
                for (var i = arr.length - 1; i > -1; i--) {
                    var info = this.getItemPos(arr[i].pos, this.lifeGridBagList);
                    if (info) {
                        info.bind = arr[i].bind;
                        info.quantity = arr[i].quantity;
                    }
                    else {
                        this.lifeGridBagList.push(arr[i]);
                    }
                }
                break;
            case ItemsType.LIFEGRID:
                for (var i = 0; i < arr.length; i++) {
                    this.lifeGridList[arr[i].pos] = arr[i];
                }
                break;
        }
        this.dispatchEvent(new ItemsEvent(ItemsEvent.ITEM_UPDATE_EVENT, type));
    };
    ItemsModel.prototype.updateEquipStrengthen = function (list) {
        this.equipOldStrengthenLevel = [];
        if (list) {
            for (var i = 0; i < list.length; i++) {
                var info = new EquipStrengthenInfo();
                info.pos = list[i][0];
                info.level = list[i][1];
                info.fighting = list[i][2];
                info.zhuhunLevel = list[i][3];
                info.zhuhunFighting = list[i][4];
                info.gemList = list[i][5];
                info.gemFighting = list[i][6];
                if (this.equipStrengthenData.containsKey(list[i][0])) {
                    var oldInfo = this.equipStrengthenData.get(list[i][0]);
                    if (oldInfo.level != info.level)
                        this.equipOldStrengthenLevel.push(list[i][0]);
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
            for (var i = 0; i < 8; i++) {
                if (!this.equipStrengthenData.containsKey(i + 1)) {
                    var info = new EquipStrengthenInfo();
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
    };
    /**删除物品 */
    ItemsModel.prototype.dletelItems = function (pi) {
        var notice = pi.readByte();
        var type = pi.readByte();
        var ln = pi.readShort();
        var arr = [];
        for (var i = 0; i < ln; i++) {
            var id = pi.readInt();
            arr.push(id);
        }
        this.deleteList(arr, type);
    };
    ItemsModel.prototype.deleteList = function (list, type) {
        var ln;
        var i;
        switch (type) {
            case ItemsType.EQUIE:
                var arr = this.equipList.values();
                ln = arr.length;
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var id = list_1[_i];
                    for (i = 0; i < ln; i++) {
                        var info = arr[i];
                        if (info.id == id) {
                            this.equipList.remove(info.pos);
                            break;
                        }
                    }
                }
                break;
            case ItemsType.BAG:
                ln = this.bagList.length;
                for (var _a = 0, list_2 = list; _a < list_2.length; _a++) {
                    var id = list_2[_a];
                    for (i = 0; i < ln; i++) {
                        var info = this.bagList[i];
                        if (info.id == id) {
                            this.bagList.splice(i, 1);
                            break;
                        }
                    }
                }
                this._curBagCount = this.bagList.length;
                break;
            case ItemsType.DEPOT:
                ln = this.depotList.length;
                for (var _b = 0, list_3 = list; _b < list_3.length; _b++) {
                    var id = list_3[_b];
                    for (i = 0; i < ln; i++) {
                        var info = this.depotList[i];
                        if (info.id == id) {
                            this.depotList.splice(i, 1);
                            break;
                        }
                    }
                }
                break;
            case ItemsType.LIFEGRID:
                for (var _c = 0, list_4 = list; _c < list_4.length; _c++) {
                    var id = list_4[_c];
                    for (var i_1 = 0; i_1 < this.lifeGridList.length; i_1++) {
                        var info = this.lifeGridList[i_1];
                        if (info && info.id == id)
                            this.lifeGridList[info.pos] = null;
                    }
                }
                break;
            case ItemsType.LIFEGRIDBAG:
                for (var _d = 0, list_5 = list; _d < list_5.length; _d++) {
                    var id = list_5[_d];
                    for (var i_2 = 0; i_2 < this.lifeGridBagList.length; i_2++) {
                        var info = this.lifeGridBagList[i_2];
                        if (info.id == id) {
                            this.lifeGridBagList.splice(i_2, 1);
                            break;
                        }
                    }
                }
                break;
        }
        this.dispatchEvent(new ItemsEvent(ItemsEvent.ITEM_UPDATE_EVENT, type));
    };
    Object.defineProperty(ItemsModel.prototype, "bagTotal", {
        /**bag总容量 */
        get: function () {
            return this._bagTotal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemsModel.prototype, "bagSurplus", {
        /**bag剩余容量 */
        get: function () {
            return this._bagTotal - this._curBagCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemsModel.prototype, "curBagCount", {
        /**bag已使用容量 */
        get: function () {
            return this._curBagCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemsModel.prototype, "deoptTotal", {
        /**仓库总容量 */
        get: function () {
            return this._deoptTotal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取某物品数量
     */
    ItemsModel.prototype.getCountItemById = function (value, isGetDepot) {
        if (isGetDepot === void 0) { isGetDepot = false; }
        var count = 0;
        for (var i = 0; i < this.bagList.length; i++) {
            if (this.bagList[i] && this.bagList[i].cvo.id == value) {
                count += this.bagList[i].quantity;
            }
        }
        if (isGetDepot) {
            for (var i = 0; i < this.depotList.length; i++) {
                if (this.depotList[i] && this.depotList[i].cvo.id == value) {
                    count += this.depotList[i].quantity;
                }
            }
        }
        return count;
    };
    ItemsModel.prototype.getItemPos = function (pos, arr) {
        if (arr === void 0) { arr = this.bagList; }
        var ln = arr.length;
        for (var i = 0; i < ln; i++) {
            if (arr[i].pos == pos) {
                return arr[i];
            }
        }
        return null;
    };
    /**
     * 获取背包某类型物品
     */
    ItemsModel.prototype.getBagItemByList = function (type) {
        var list = [];
        var cvo;
        for (var i = 0; i < this.bagList.length; i++) {
            cvo = this.bagList[i].cvo;
            if (cvo && cvo.type == type) {
                list.push(this.bagList[i]);
            }
        }
        return list;
    };
    /**
     * 统计背包中某类型物品数据
     * type:宝石类型
     * level:宝石等级，设置后获取可替换宝石数量
     */
    ItemsModel.prototype.getCountBagItemByType = function (type, level) {
        if (level === void 0) { level = -1; }
        var count = 0;
        var cvo;
        for (var i = 0; i < this.bagList.length; i++) {
            cvo = this.bagList[i].cvo;
            if (cvo && cvo.type == type) {
                if (level == -1)
                    count += this.bagList[i].quantity;
                else {
                    var itemLevel = Number(String(cvo.id).substr(String(cvo.id).length - 2, 2));
                    if (itemLevel > level)
                        count += this.bagList[i].quantity;
                }
            }
        }
        return count;
    };
    /**
     * 统计某一等级宝石可升级材料数量
     */
    ItemsModel.prototype.getCountUpgradeByType = function (type, level) {
        var count = 0;
        var list = {};
        var cvo;
        for (var i = 0; i < this.bagList.length; i++) {
            cvo = this.bagList[i].cvo;
            if (cvo && cvo.type == type) {
                var tmpLevel = Number(String(cvo.id).substr(String(cvo.id).length - 2, 2));
                if (!list[tmpLevel])
                    list[tmpLevel] = this.bagList[i].quantity;
                else
                    list[tmpLevel] += this.bagList[i].quantity;
            }
        }
        for (var i = 1; i <= level; i++) {
            if (list[i]) {
                var c = Math.floor(list[i] / 3);
                if (list[i + 1])
                    list[i + 1] += c;
                else
                    list[i + 1] = c;
            }
        }
        if (list[level])
            count = list[level];
        else
            count = 0;
        return count;
    };
    /**
     * 返回可熔炼物品列表
     * group--默认1人物装备
     */
    ItemsModel.prototype.getBagItemBySmelt = function (group) {
        if (group === void 0) { group = 1; }
        var list = [];
        var cvo;
        for (var i = 0; i < this.bagList.length; i++) {
            cvo = this.bagList[i].cvo;
            if (cvo && cvo.smelt && cvo.group == group) {
                var star = this.bagList[i].getStar();
                if (cvo.quality == 5 && star == 2 || cvo.quality == 6 && star >= 1 && star <= 3)
                    continue;
                list.push(this.bagList[i]);
            }
        }
        return list;
    };
    ItemsModel.prototype.getBagItem = function (group) {
        if (group === void 0) { group = 1; }
        var list = [];
        var cvo;
        for (var i = 0; i < this.bagList.length; i++) {
            cvo = this.bagList[i].cvo;
            if (cvo && cvo.smelt && cvo.group == group) {
                var star = this.bagList[i].getStar();
                list.push(this.bagList[i]);
            }
        }
        return list;
    };
    /**
     * 获取当前可以穿戴战力最高装备
     */
    ItemsModel.prototype.getCanUseBestEquip = function (pos) {
        if (pos === void 0) { pos = -1; }
        this._countCanUseBestEquip += 1;
        // Trace.trace("======================getCanUseBestEquip:" + this._countCanUseBestEquip);
        this.canUpgradeEquipList = [];
        var itemList = [];
        var selfCareer = Manager.model.self.attrInfo.career;
        var itemPosList = [];
        for (var i = 0; i < this.bagList.length; i++) {
            var itemInfo = this.bagList[i].cvo;
            if (itemInfo && itemInfo.group == ItemsType.EQUIE && this.bagList[i].career == selfCareer) {
                if (pos != -1 && this.bagList[i].cvo.pos != pos)
                    continue;
                if (itemInfo.quality < 5)
                    continue;
                var has = false;
                for (var j = 0; j < itemList.length; j++) {
                    if (itemList[j].base_id == this.bagList[i].base_id) {
                        has = true;
                        break;
                    }
                }
                if (!has) {
                    itemList.push(this.bagList[i]);
                    if (itemPosList.indexOf(this.bagList[i].cvo.pos) == -1)
                        itemPosList.push(this.bagList[i].cvo.pos);
                }
            }
        }
        if (itemList.length == 0)
            return null;
        for (var i = 0; i < itemList.length; i++) {
            itemList[i].fight = ItemsModel.getEquipItemFight(itemList[i]);
        }
        // Trace.trace("=================item length:" + itemList.length);
        itemList.sort(this.sortOnFighting);
        var posFight = {};
        for (var i = 1; i <= 8; i++) {
            if (itemPosList.indexOf(i) != -1) {
                var equipItem = this.equipList.get(i);
                if (equipItem)
                    posFight[i] = ItemsModel.getEquipItemFight(equipItem);
                else
                    posFight[i] = 0;
            }
            else {
                posFight[i] = 0;
            }
        }
        for (var i = 0; i < itemList.length; i++) {
            if (posFight[itemList[i].cvo.pos] != 0) {
                var itemFight = itemList[i].fight;
                if (itemFight > posFight[itemList[i].cvo.pos]) {
                    if (itemList[i].turnLevel == 0) {
                        if (Manager.model.self.attrInfo.level >= itemList[i].cvo.needLevel) {
                            if (this.canUpgradeEquipList.indexOf(itemList[i]) == -1)
                                this.canUpgradeEquipList.push(itemList[i]);
                        }
                    }
                    else if (itemList[i].turnLevel > 0) {
                        if (Manager.model.self.attrInfo.zhuanshu >= itemList[i].turnLevel) {
                            if (this.canUpgradeEquipList.indexOf(itemList[i]) == -1)
                                this.canUpgradeEquipList.push(itemList[i]);
                        }
                    }
                }
            }
            else {
                if (itemList[i].turnLevel == 0) {
                    if (Manager.model.self.attrInfo.level >= itemList[i].cvo.needLevel) {
                        if (this.canUpgradeEquipList.indexOf(itemList[i]) == -1)
                            this.canUpgradeEquipList.push(itemList[i]);
                    }
                }
                else if (itemList[i].turnLevel > 0) {
                    if (Manager.model.self.attrInfo.zhuanshu >= itemList[i].turnLevel) {
                        if (this.canUpgradeEquipList.indexOf(itemList[i]) == -1)
                            this.canUpgradeEquipList.push(itemList[i]);
                    }
                }
            }
        }
        if (this.canUpgradeEquipList.length > 0)
            return this.canUpgradeEquipList[0];
        else
            return null;
    };
    /**
     * 获取当前可以穿戴战力最高装备列表
     */
    ItemsModel.prototype.getCanUseBestEquipList = function () {
        Manager.render.remove(this.getCanUseBestEquipList, this);
        // Trace.trace("======================getCanUseBestEquipList=======");
        this.oneKeyUpgradeEquipList = [];
        var itemList = [];
        var selfCareer = Manager.model.self.attrInfo.career;
        var itemPosList = [];
        for (var i = 0; i < this.bagList.length; i++) {
            var itemInfo = this.bagList[i].cvo;
            if (itemInfo && itemInfo.group == ItemsType.EQUIE && this.bagList[i].career == selfCareer) {
                var equipItem = this.equipList.get(this.bagList[i].cvo.pos);
                if (equipItem && this.bagList[i].base_id < equipItem.base_id)
                    continue;
                var has = false;
                for (var j = 0; j < itemList.length; j++) {
                    if (itemList[j].base_id == this.bagList[i].base_id) {
                        has = true;
                        break;
                    }
                }
                if (!has) {
                    itemList.push(this.bagList[i]);
                    if (itemPosList.indexOf(this.bagList[i].cvo.pos) == -1)
                        itemPosList.push(this.bagList[i].cvo.pos);
                }
            }
        }
        if (itemList.length > 0) {
            for (var i = 0; i < itemList.length; i++) {
                itemList[i].fight = ItemsModel.getEquipItemFight(itemList[i]);
            }
            // Trace.trace("=================item length:" + itemList.length);
            itemList.sort(this.sortOnFighting);
            var posFight = {};
            for (var i = 1; i <= 8; i++) {
                if (itemPosList.indexOf(i) != -1) {
                    var equipItem = this.equipList.get(i);
                    if (equipItem)
                        posFight[i] = ItemsModel.getEquipItemFight(equipItem);
                    else
                        posFight[i] = 0;
                }
                else {
                    posFight[i] = 0;
                }
            }
            var itemTypeList = [];
            for (var i = 1; i <= 8; i++) {
                for (var j = 0; j < itemList.length; j++) {
                    if (itemList[j].cvo.pos != i)
                        continue;
                    if (itemTypeList.indexOf(i) != -1)
                        break;
                    if (posFight[itemList[j].cvo.pos] == 0) {
                        this.oneKeyUpgradeEquipList.push(itemList[j]);
                        itemTypeList.push(itemList[j].cvo.pos);
                        break;
                    }
                    else {
                        if (itemList[j].fight > posFight[itemList[j].cvo.pos]) {
                            if (itemList[j].turnLevel == 0) {
                                if (Manager.model.self.attrInfo.level >= itemList[j].cvo.needLevel) {
                                    this.oneKeyUpgradeEquipList.push(itemList[j]);
                                    itemTypeList.push(itemList[j].cvo.pos);
                                    break;
                                }
                            }
                            else if (itemList[j].turnLevel > 0) {
                                if (Manager.model.self.attrInfo.zhuanshu >= itemList[j].turnLevel) {
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
    };
    /**
     * 按战力倒序排序
     */
    ItemsModel.prototype.sortOnFighting = function (info1, info2) {
        if (info1.fight < info2.fight)
            return 1;
        else if (info1.fight > info2.fight)
            return -1;
        else
            return 0;
    };
    Object.defineProperty(ItemsModel.prototype, "lifeGridTotal", {
        get: function () {
            return this._lifeGridTotal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 使用物品返回结果
     * base_id 使用的物品
     * arr     物品例表
     */
    ItemsModel.prototype.sueItemResultReturn = function (base_id, arr) {
        var cvo = ItemsCVO.getCvo(base_id);
        if (cvo.group == ItemsType.GROUP_GIFT && cvo.type == ItemsType.TYPE_GIFT) {
            Manager.view.show(65 /* ItemUseResultWin */, arr, base_id);
        }
    };
    /**
     * 找到对应的baseid的ItemsModelInfo,,取第一个对应的
     */
    ItemsModel.prototype.getItemModesInfo = function (base_id) {
        for (var i = 0; i < this.bagList.length; i++) {
            if (this.bagList[i] && this.bagList[i].base_id == base_id) {
                return this.bagList[i];
            }
        }
    };
    /** 背包命格是足够 true为足够   value=0侧返回命格背包是否已满  */
    ItemsModel.prototype.checkLifeGridBagAmple = function (value) {
        if (value === void 0) { value = 0; }
        if (value > 0) {
            var num = this._lifeGridTotal - this.lifeGridBagList.length;
            return num >= value;
        }
        return this.lifeGridBagList.length >= this._lifeGridTotal;
    };
    /**获取装备战斗力 */
    ItemsModel.getEquipItemFight = function (itemModelInfo) {
        this._equipFightCount += 1;
        // Trace.trace("==============equipFightCount:" + this._equipFightCount);
        if (!itemModelInfo.cvo)
            return 0;
        if (itemModelInfo.attrVersion == Manager.model.getItems().attrVersion)
            return itemModelInfo.fight;
        var fighting = 0;
        //属性战力
        var attrArr = [];
        var attr = Manager.pool.create(AttrVO, itemModelInfo.cvo.attr);
        if (attr) {
            attrArr = attr.attrInfos;
            fighting += attr.getFighting();
        }
        //铸魂和宝石战力
        var strengthenLevel = 0;
        var strengthenInfo = Manager.model.getItems().equipStrengthenData.get(itemModelInfo.cvo.pos);
        if (strengthenInfo) {
            strengthenLevel = strengthenInfo.level;
            fighting += strengthenInfo.zhuhunFighting + strengthenInfo.gemFighting;
        }
        //强化战力
        var attrVO;
        if (strengthenLevel > 0) {
            var info = EquipStrengthenCVO.getInfo(itemModelInfo.cvo.pos, strengthenLevel);
            if (info && info.attr.length > 0) {
                var str = attrArr[0].id + "," + info.attr[0][1] + "|" + attrArr[1].id + "," + info.attr[1][1];
                attrVO = Manager.pool.create(AttrVO, str);
                fighting += attrVO.getFighting();
                Manager.pool.push(attrVO);
            }
        }
        //极品属性战力
        if (itemModelInfo.infoList.length > 0) {
            var arrList = itemModelInfo.infoList;
            var bestArrList = [];
            var bestArrInfo = void 0;
            for (var i = 0; i < arrList.length; i++) {
                bestArrInfo = arrList[i];
                if (bestArrInfo.type == 1) {
                    //1为极品属性
                    bestArrList.push(bestArrInfo);
                }
            }
            if (bestArrList.length > 0) {
                for (var i = 0; i < bestArrList.length; i++) {
                    bestArrInfo = bestArrList[i];
                    if (bestArrInfo) {
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
    };
    ItemsModel.prototype.useItems = function (info, count) {
        switch (info.cvo.type) {
            case ItemsConst.TYPE_TITLE:
                Manager.control.getDress().actTitle(info.cvo.type, info.cvo.id);
                break;
            default:
                Manager.control.getItems().useItems(info.id, count, info.base_id);
                break;
        }
    };
    //查看是否要弹窗
    ItemsModel.prototype.checkItemNeedPrompt = function (itemInfo) {
        if (itemInfo && itemInfo.cvo && itemInfo.cvo.prompt && OpenCVO.isOpen(itemInfo.cvo.openID)) {
            // Manager.tips.changeEquipTips.setData(itemInfo);
            Manager.pool.create(ItemsPrompt, itemInfo);
        }
    };
    ItemsModel.prototype.sortBagList = function () {
        this.bagList = ArrayUtil.sortOn(this.bagList, ["pos"]);
    };
    ItemsModel.prototype.sortDepotList = function () {
        this.depotList = ArrayUtil.sortOn(this.depotList, ["pos"]);
    };
    ItemsModel._equipFightCount = 0;
    return ItemsModel;
}(egret.EventDispatcher));
//# sourceMappingURL=ItemsModel.js.map