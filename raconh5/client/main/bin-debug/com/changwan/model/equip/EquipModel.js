var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
var EquipModel = (function (_super) {
    __extends(EquipModel, _super);
    function EquipModel() {
        var _this = _super.call(this) || this;
        _this.initLocal = -1;
        _this.equipItemLocalByGem = -1;
        /**攻击套装数据 */
        _this.equipSuitAttackList = [];
        /**防御套装数据 */
        _this.equipSuitDefenseList = [];
        /**铸魂额外战力 */
        _this.zhuhuanOtherFight = 0;
        /**宝石额外战力 */
        _this.gemOtherFight = 0;
        /**套装总战力 */
        _this.suitAllFight = 0;
        return _this;
    }
    /**
     * 获取强化总等级
     */
    EquipModel.prototype.getTotalStrengthenLevel = function () {
        var ret = 0;
        var equipList = Manager.model.getItems().equipStrengthenData;
        for (var i = 1; i <= 8; i++) {
            var info = equipList.get(i);
            if (info) {
                ret += info.level;
            }
        }
        return ret;
    };
    /**
     * 获取宝石总等级
     */
    EquipModel.prototype.getTotalGemLevel = function () {
        var equipList = Manager.model.getItems().equipStrengthenData;
        var count = 0;
        for (var i = 1; i <= 8; i++) {
            var info = equipList.get(i);
            if (info && info.gemList.length > 0) {
                for (var j = 0; j < info.gemList.length; j++) {
                    var id = info.gemList[j].gemId;
                    var level = Number(String(id).substr(String(id).length - 2, 2));
                    count += level;
                }
            }
        }
        return count;
    };
    /**
     * 获取铸魂总等级
     */
    EquipModel.prototype.getTotalZhuhuanLevel = function () {
        var ret = 0;
        var equipList = Manager.model.getItems().equipStrengthenData;
        for (var i = 1; i <= 8; i++) {
            var info = equipList.get(i);
            if (info)
                ret += info.zhuhunLevel;
        }
        return ret;
    };
    EquipModel.prototype.getCanRonglianItems = function (maxCount) {
        if (maxCount === void 0) { maxCount = 9999; }
        var itemList = [];
        var itemPosList = [];
        var equipList = Manager.model.getItems().equipList;
        var list = Manager.model.getItems().getBagItemBySmelt();
        if (list.length == 0)
            return [];
        for (var i = 0; i < list.length; i++) {
            list[i].fight = ItemsModel.getEquipItemFight(list[i]);
            if (itemPosList.indexOf(list[i].cvo.pos) == -1)
                itemPosList.push(list[i].cvo.pos);
        }
        // ArrayUtil.sortOn(list, ["fight"], [1]);
        // console.log("==1===list:" + list.length);
        var posFight = {};
        for (var i = 1; i <= 8; i++) {
            if (itemPosList.indexOf(i) != -1) {
                var equipItem = equipList.get(i);
                if (equipItem)
                    posFight[i] = ItemsModel.getEquipItemFight(equipItem);
                else
                    posFight[i] = 0;
            }
            else {
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
        for (var i = 0; i < list.length; i++) {
            var itemInfo = list[i];
            if (itemInfo) {
                for (var j = 1; j <= 8; j++) {
                    var info = equipList.get(j);
                    if (info) {
                        if (itemInfo.cvo.pos == info.cvo.pos) {
                            // if(posFight[info.cvo.pos] == 0 || posFight[info.cvo.pos] >= itemInfo.fight)
                            if (posFight[info.cvo.pos] >= itemInfo.fight) {
                                if (itemList.length < maxCount)
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
            if (itemList.length >= maxCount)
                break;
        }
        return itemList;
    };
    EquipModel.prototype.checkCanRonglian = function () {
        var itemList = this.getCanRonglianItems(50);
        if (itemList && itemList.length >= 50)
            return true;
        else
            return false;
    };
    EquipModel.prototype.checkEquipUpgrade = function () {
        this.initLocal = -1;
        return this.checkCanStrengthen() || this.checkGemCanPuton() || this.checkCanZhuhun() || this.checkCanSuitUpgrade() || Manager.model.getStarUp().checkCoin();
    };
    /**
     * 判断有足够强化全身装备一次物品
     */
    EquipModel.prototype.checkCanStrengthen = function () {
        if (!OpenCVO.isOpen(OpenConst.ID_STRENGTHEN))
            return false;
        var itemList = {};
        for (var i = 0; i < 8; i++) {
            var level = 0;
            var info = Manager.model.getItems().equipStrengthenData.get(i + 1);
            if (info)
                level = info.level;
            for (var j = 0; j < 1; j++) {
                var cvoInfo = EquipStrengthenCVO.getInfo(i + 1, level + j);
                if (cvoInfo) {
                    if (!itemList[cvoInfo.itemId])
                        itemList[cvoInfo.itemId] = { itemId: cvoInfo.itemId, count: cvoInfo.amount };
                    else
                        itemList[cvoInfo.itemId].count += cvoInfo.amount;
                }
            }
        }
        var ret = true;
        for (var item in itemList) {
            var count = Manager.model.getItems().getCountItemById(itemList[item].itemId);
            if (count < itemList[item].count) {
                ret = false;
                break;
            }
        }
        if (ret)
            this.initLocal = 0;
        return ret;
    };
    /**
     * 判断是否有可镶嵌宝石
     */
    EquipModel.prototype.checkGemCanPuton = function () {
        if (!OpenCVO.isOpen(OpenConst.ID_GEM))
            return false;
        var list = [];
        for (var i = 1; i <= 8; i++) {
            var equipInfo = Manager.model.getItems().equipList.get(i);
            if (equipInfo) {
                var info = Manager.model.getItems().equipStrengthenData.get(i);
                if (info) {
                    var tmpList = [1, 2, 3];
                    var min = -1;
                    for (var j = 0; j < info.gemList.length; j++) {
                        var pos = info.gemList[j].gemPos;
                        var index = tmpList.indexOf(pos);
                        if (index != -1) {
                            tmpList.splice(index, 1);
                            var num = Number(String(info.gemList[j].gemId).substr(String(info.gemList[j].gemId).length - 2, 2));
                            //查找可替换
                            if (Manager.model.getItems().getCountBagItemByType(EquipModel.GEM_TYPE_LIST[pos - 1], num) > 0) {
                                if (min == -1)
                                    min = num;
                                else if (num < min)
                                    min = num;
                            }
                            else {
                                //查找可升级
                                if (Manager.model.getItems().getCountUpgradeByType(EquipModel.GEM_TYPE_LIST[pos - 1], num) >= 2) {
                                    if (min == -1)
                                        min = num;
                                    else if (num < min)
                                        min = num;
                                }
                            }
                        }
                    }
                    if (tmpList.length > 0) {
                        for (var j = 0; j < tmpList.length; j++) {
                            if (Manager.model.getItems().getCountBagItemByType(EquipModel.GEM_TYPE_LIST[tmpList[j] - 1]) > 0) {
                                min = 0;
                                break;
                            }
                        }
                    }
                    if (min != -1)
                        list.push({ pos: i, num: min });
                }
                else {
                    //当前装备有材料并没有镶嵌情况下优化选择
                    var has = false;
                    for (var j = 0; j < EquipModel.GEM_TYPE_LIST.length; j++) {
                        if (Manager.model.getItems().getCountBagItemByType(EquipModel.GEM_TYPE_LIST[j]) > 0) {
                            has = true;
                            break;
                        }
                    }
                    if (has) {
                        if (this.initLocal == -1 || this.initLocal > 1)
                            this.initLocal = 1;
                        return true;
                    }
                }
            }
        }
        if (list.length > 0) {
            if (this.initLocal == -1 || this.initLocal > 1)
                this.initLocal = 1;
            return true;
        }
        else
            return false;
    };
    /**
     * 返回操作物品ID和类型:1为镶嵌，2,升级，3,为替换
     * itemType:物品类型
     * type:1为镶嵌，2为替换或升级
     * curItemId:当前位置物品ID
     */
    EquipModel.prototype.getBestItemId = function (itemType, type, curItemId) {
        var retItemId = 0;
        var retType = 0;
        var list = Manager.model.getItems().getBagItemByList(itemType);
        if (list && list.length > 0) {
            var itemList = [];
            if (curItemId != 0)
                itemList.push({ id: curItemId, count: 1 });
            for (var i = 0; i < list.length; i++) {
                var has = false;
                for (var j = 0; j < itemList.length; j++) {
                    if (itemList[j].id == list[i].base_id) {
                        has = true;
                        itemList[j].count += list[i].quantity;
                    }
                }
                if (!has)
                    itemList.push({ id: list[i].base_id, count: list[i].quantity });
            }
            itemList = ArrayUtil.sortOn(itemList, ["id"], [0]);
            var curBestId = 0;
            if (itemList.length > 0)
                curBestId = itemList[itemList.length - 1].id;
            if (type == 1) {
                retItemId = curBestId;
                retType = 1;
            }
            else {
                for (var i = 0; i < itemList.length; i++) {
                    if (itemList[i].id < curItemId) {
                        var count = Math.floor(itemList[i].count / 3);
                        if (count > 0) {
                            var has = false;
                            var id = itemList[i].id + 1;
                            for (var j = 0; j < itemList.length; j++) {
                                if (itemList[j].id == id) {
                                    has = true;
                                    itemList[j].count += count;
                                    itemList[i].count -= 3 * count;
                                }
                            }
                            if (!has) {
                                itemList.push({ id: id, count: count });
                                itemList[i].count -= 3 * count;
                                itemList = ArrayUtil.sortOn(itemList, ["id"], [0]);
                            }
                        }
                    }
                }
                itemList = ArrayUtil.sortOn(itemList, ["id"], [1]);
                for (var i = 0; i < itemList.length; i++) {
                    var info = ItemsCVO.getCvo(itemList[i].id);
                    if (info) {
                        retItemId = info.id;
                        if (retItemId > curItemId) {
                            var count = Manager.model.getItems().getCountItemById(retItemId);
                            if (count > 0) {
                                retType = 3;
                                break;
                            }
                        }
                        else if (retItemId == curItemId) {
                            if (itemList[i].count >= 3) {
                                retType = 2;
                                break;
                            }
                        }
                    }
                }
            }
        }
        return [retItemId, retType];
    };
    /**
     * 判断是否有足够物品铸魂
     */
    EquipModel.prototype.checkCanZhuhun = function () {
        if (!OpenCVO.isOpen(OpenConst.ID_ZHUHUN))
            return false;
        var ret = false;
        for (var i = 1; i <= 8; i++) {
            ret = false;
            var equipInfo = Manager.model.getItems().equipList.get(i);
            if (equipInfo) {
                var zhuhunLevel = 0;
                var info = Manager.model.getItems().equipStrengthenData.get(i);
                if (info)
                    zhuhunLevel = info.zhuhunLevel;
                if (zhuhunLevel >= EquipModel.ZHUHUAN_MAX_LEVEL)
                    continue;
                var cvoInfo = EquipZhuhunCVO.getInfo(Manager.model.self.attrInfo.career, i, zhuhunLevel);
                if (cvoInfo) {
                    var can = true;
                    for (var j = 0; j < cvoInfo.itemList.length; j++) {
                        if (Manager.model.getItems().getCountItemById(cvoInfo.itemList[j].baseId) < cvoInfo.itemList[j].num) {
                            can = false;
                            break;
                        }
                    }
                    ret = can;
                    if (ret)
                        break;
                }
            }
        }
        if (ret && (this.initLocal == -1 || this.initLocal > 2))
            this.initLocal = 2;
        return ret;
    };
    /**
     * 判断是否可以套装升级
     */
    EquipModel.prototype.checkCanSuitUpgrade = function () {
        if (!OpenCVO.isOpen(OpenConst.ID_SUIT))
            return false;
        var ret = false;
        for (var i = 0; i < EquipModel.SUIT_ATTACK_POS.length; i++) {
            var level = 1;
            for (var j = 0; j < this.equipSuitAttackList.length; j++) {
                if (this.equipSuitAttackList[j].pos == EquipModel.SUIT_ATTACK_POS[i]) {
                    level = this.equipSuitAttackList[j].level + 1;
                    break;
                }
            }
            if (level <= EquipModel.SUIT_MAX_LEVEL) {
                var info = SuitCVO.getSuitUpgradeInfo(level, EquipModel.SUIT_ATTACK_POS[i]);
                if (info) {
                    var num = Manager.model.getItems().getCountItemById(info.loss.baseId);
                    if (num >= info.loss.num) {
                        ret = true;
                        break;
                    }
                }
            }
        }
        for (var i = 0; i < EquipModel.SUIT_DEFENSE_POS.length; i++) {
            var level = 1;
            for (var j = 0; j < this.equipSuitDefenseList.length; j++) {
                if (this.equipSuitDefenseList[j].pos == EquipModel.SUIT_DEFENSE_POS[i]) {
                    level = this.equipSuitDefenseList[j].level + 1;
                    break;
                }
            }
            if (level <= EquipModel.SUIT_MAX_LEVEL) {
                var info = SuitCVO.getSuitUpgradeInfo(level, EquipModel.SUIT_DEFENSE_POS[i]);
                if (info) {
                    var num = Manager.model.getItems().getCountItemById(info.loss.baseId);
                    if (num >= info.loss.num) {
                        ret = true;
                        break;
                    }
                }
            }
        }
        return ret;
    };
    /**
     * 获取强化最大一个部位的强化等级
     */
    EquipModel.prototype.getMaxStrengthenLevel = function () {
        var ret = 0;
        var equipList = Manager.model.getItems().equipStrengthenData;
        for (var i = 1; i <= 8; i++) {
            var info = equipList.get(i);
            if (info) {
                if (info.level > ret)
                    ret = info.level;
            }
        }
        return ret;
    };
    //宝石类型列表:红21，绿22，蓝23
    EquipModel.GEM_TYPE_LIST = [21, 22, 23];
    //铸魂最高等级
    EquipModel.ZHUHUAN_MAX_LEVEL = 15;
    /**套装最高等级 */
    EquipModel.SUIT_MAX_LEVEL = 10;
    /**攻击套装类型列表 */
    EquipModel.SUIT_ATTACK_POS = [EquipType.EQUIP_WEAPON, EquipType.EQUIP_NECKLACE, EquipType.EQUIP_JADE];
    // public static SUIT_DEFENSE_POS:Array<number> = [EquipType.EQUIP_AMULET, EquipType.EQUIP_HELMET, EquipType.EQUIP_CLOTHES, EquipType.EQUIP_GLOVE, EquipType.EQUIP_SHOES];
    /**防御套装类型列表 */
    EquipModel.SUIT_DEFENSE_POS = [EquipType.EQUIP_HELMET, EquipType.EQUIP_CLOTHES, EquipType.EQUIP_GLOVE, EquipType.EQUIP_SHOES, EquipType.EQUIP_AMULET];
    return EquipModel;
}(egret.EventDispatcher));
__reflect(EquipModel.prototype, "EquipModel");
//# sourceMappingURL=EquipModel.js.map