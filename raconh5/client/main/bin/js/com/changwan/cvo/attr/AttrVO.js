/**
 * 17.11.20
 * pzx
 * 属性拆分
 */
var AttrVO = /** @class */ (function () {
    function AttrVO() {
    }
    AttrVO.prototype.getinfo = function (id) {
        return this._attrs[id];
    };
    Object.defineProperty(AttrVO.prototype, "attrInfos", {
        /**获得列表 */
        get: function () {
            var result = new Array();
            for (var key in this._attrs) {
                result.push(this._attrs[key]);
            }
            if (result.length > 1)
                result.sort(function (a, b) { return (a.id > b.id ? 1 : -1); });
            return result;
        },
        enumerable: true,
        configurable: true
    });
    AttrVO.prototype.getNum = function (id) {
        var i = 0;
        if (this._attrs == null)
            return i;
        var vo = this._attrs[id];
        if (vo) {
            i = vo.num;
        }
        return i;
    };
    AttrVO.prototype.getName = function (id) {
        var str = "";
        if (this._attrs == null)
            return str;
        var vo = this._attrs[id];
        if (vo) {
            str = vo.name;
        }
        return str;
    };
    /**获得战斗力 */
    AttrVO.prototype.getFighting = function () {
        var figList = AttributeFightingCVO.getData();
        var self = Manager.model.self;
        var fightnum = 0;
        for (var obj in this._attrs) {
            var vo = this._attrs[obj];
            if (vo.id >= 30) {
                //加成战斗力加成转换
                var v = 0;
                switch (vo.id) {
                    case 30:
                    case 38:
                        v = 11;
                        break;
                    case 31:
                    case 39:
                        v = 13;
                        break;
                    case 32:
                    case 40:
                        v = 14;
                        break;
                    case 33:
                    case 41:
                        v = 15;
                        break;
                    case 34:
                    case 42:
                        v = 16;
                        break;
                    case 35:
                    case 43:
                        v = 17;
                        break;
                    case 36:
                    case 44:
                        v = 18;
                        break;
                    case 37:
                    case 45:
                        v = 19;
                        break;
                }
                if (vo.id >= 30 && vo.id <= 37) {
                    fightnum += Math.floor(self.attrInfo.getValue(v) * figList.get(v) * vo.num / 1000);
                }
                else if (vo.id >= 38 && vo.id <= 45) {
                    var level = Math.floor(self.attrInfo.level / 5);
                    fightnum += Math.floor(level * figList.get(v) * vo.num / 1000);
                }
            }
            else {
                fightnum += vo.num * figList.get(vo.id);
            }
        }
        return Math.floor(fightnum);
    };
    /**
    *
    * @param content 数据对象 ： 属性标识id，数量|属性标识id，数量
    *
    * 属性标识id对应   attr_desc_data 表
    */
    AttrVO.prototype.reuse = function (content) {
        if (content && content != "") {
            this._attrs = {};
            var arr = content.split("|");
            for (var i = 0; i < arr.length; i++) {
                var list = arr[i].split(",");
                if (list.length > 1) {
                    var cvo = AttrCVO.getInfo(Number(list[0]));
                    var vo = new AttrVoInfo();
                    vo.name = cvo.name;
                    vo.shortName = cvo.shortName;
                    vo.type = cvo.type;
                    vo.id = cvo.id;
                    vo.format = cvo.format;
                    vo.showStar = cvo.showStar;
                    vo.num = Number(list[1]);
                    this._attrs[vo.id] = vo;
                }
            }
        }
    };
    AttrVO.prototype.unuse = function () {
        for (var key in this._attrs) {
            delete this._attrs[key];
        }
        this._attrs = null;
    };
    AttrVO.prototype.dispose = function () {
        this.unuse();
    };
    /** 移动*/
    AttrVO.SPEED = 10;
    /**生命上限 */
    AttrVO.HP_MAX = 11;
    /** 生命*/
    AttrVO.HP = 12;
    /**攻击 */
    AttrVO.DMG = 13;
    /**防御 */
    AttrVO.DEFENCE = 14;
    /**破甲 */
    AttrVO.ARMOR = 15;
    /**命中 */
    AttrVO.HITRATE = 16;
    /**闪避 */
    AttrVO.EVASION = 17;
    /**暴击 */
    AttrVO.CRITRATE = 18;
    /**坚韧 */
    AttrVO.TENACITY = 19;
    /**生命恢复 */
    AttrVO.RECOVER = 20;
    /**经验加成 */
    AttrVO.EXP_PER = 21;
    /**伤害加深 */
    AttrVO.DMG_ENHANCE = 22;
    /**伤害减免 */
    AttrVO.DMG_REDUCE = 23;
    /**暴击加成 */
    AttrVO.CRITRATE_PER = 24;
    /**暴击减少 */
    AttrVO.ANTI_CRITRATE_PER = 25;
    /**暴伤加成 */
    AttrVO.CRITDMG_PER = 26;
    /**暴伤减免 */
    AttrVO.ANTI_CRITDMG_PER = 27;
    /**命中几率 */
    AttrVO.HITRATE_PER = 28;
    /**闪避几率 */
    AttrVO.EVASION_PER = 29;
    /**攻击加成 */
    AttrVO.DMG_PER = 30;
    /**防御加成 */
    AttrVO.DEFENCE_PER = 31;
    /**破甲加成 */
    AttrVO.ARMOR_PER = 32;
    /**生命加成 */
    AttrVO.HP_MAX_PER = 33;
    return AttrVO;
}());
//# sourceMappingURL=AttrVO.js.map