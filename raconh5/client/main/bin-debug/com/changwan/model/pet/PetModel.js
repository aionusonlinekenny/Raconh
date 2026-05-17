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
/**
 * 宠物model
 * liangyan
 * create 2017-12-16
*/
var PetModel = (function (_super) {
    __extends(PetModel, _super);
    function PetModel() {
        var _this = _super.call(this) || this;
        _this._pinjie = 0;
        _this._star = 0;
        _this._starExp = 0;
        _this._zzdUsed = 0;
        _this._wxdUsed = 0;
        _this._huanhuaID = 0;
        _this._itemStyles = [];
        _this.initSkills();
        _this.analysisGoods();
        return _this;
    }
    Object.defineProperty(PetModel.prototype, "pinjie", {
        /**品阶 */
        get: function () { return this._pinjie; },
        set: function (value) {
            if (this._pinjie == value)
                return;
            this._pinjie = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PetModel.prototype, "star", {
        /**星数 */
        get: function () { return this._star; },
        set: function (value) {
            if (this._star == value)
                return;
            this._star = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PetModel.prototype, "starExp", {
        /**升星进度 */
        get: function () { return this._starExp; },
        set: function (value) {
            if (this._starExp == value)
                return;
            this._starExp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PetModel.prototype, "zzdUsed", {
        /**资质丹使用数量 */
        get: function () { return this._zzdUsed; },
        set: function (value) {
            if (this._zzdUsed == value)
                return;
            this._zzdUsed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PetModel.prototype, "wxdUsed", {
        /**悟性丹使用数量 */
        get: function () { return this._wxdUsed; },
        set: function (value) {
            if (this._wxdUsed == value)
                return;
            this._wxdUsed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PetModel.prototype, "huanhuaID", {
        /**幻化id */
        get: function () { return this._huanhuaID; },
        set: function (value) {
            if (this._huanhuaID == value)
                return;
            this._huanhuaID = value;
        },
        enumerable: true,
        configurable: true
    });
    PetModel.prototype.addItemStyle = function (resId) {
        if (this.hasItemStyle(resId))
            return;
        this._itemStyles.push(resId);
        this.dispatchEvent(new PetEvent(PetEvent.ITEM_STYLE_LIST, resId));
    };
    PetModel.prototype.hasItemStyle = function (resId) {
        return (this._itemStyles.indexOf(resId) != -1);
    };
    PetModel.prototype.setPetSkillLevel = function (groupId, level) {
        this._skillsDic[groupId] = level;
        this.dispatchEvent(new PetEvent(PetEvent.UPGRADE_SKILL, groupId));
    };
    PetModel.prototype.getPetSkillLevel = function (groupId) {
        return this._skillsDic[groupId] ? this._skillsDic[groupId] : 0;
    };
    PetModel.prototype.initSkills = function () {
        this._skillsDic = {};
        var skillCvos = SkillCVO.getPetPanelSkills();
        for (var i = 0; i < skillCvos.length; i++) {
            this.setPetSkillLevel(skillCvos[i].groupID, 0);
        }
    };
    PetModel.prototype.checkOneSkillCanUp = function (groupId) {
        var level = this._skillsDic[groupId];
        if (level <= 0 || level >= SkillCVO.getCVO(groupId).maxLevel)
            return false;
        var cvo = PetSkillLevelCVO.getCVO(groupId, level + 1);
        return cvo.loss.isEnough();
    };
    PetModel.prototype.analysisGoods = function () {
        this._attrZZD = [];
        this._attrWXD = [];
        //资质丹
        var cvo = ItemsCVO.getCvo(ItemsConst.PET_ZZD);
        if (cvo && cvo.attr != "") {
            var attr = Manager.pool.create(AttrVO, cvo.attr);
            if (attr)
                this._attrZZD = attr.attrInfos;
        }
        //悟性丹
        cvo = ItemsCVO.getCvo(ItemsConst.PET_WXD);
        if (cvo && cvo.attr != "") {
            var attr = Manager.pool.create(AttrVO, cvo.attr);
            if (attr)
                this._attrWXD = attr.attrInfos;
        }
    };
    PetModel.prototype.delayParseAllAttrVO = function () {
        Manager.render.add(this.reParseAllAttrVO, this);
    };
    PetModel.prototype.reParseAllAttrVO = function () {
        Manager.render.remove(this.reParseAllAttrVO, this);
        if (this._pinjie < 1) {
            if (this.allAttrVO)
                Manager.pool.push(this.allAttrVO);
            this.allAttrVO = Manager.pool.create(AttrVO, "11|0");
            return;
        }
        var attrStr = PetCVO.getCVO(this._pinjie, this._star).attrStr;
        var attrArr = attrStr.split("|");
        var result = "";
        for (var i = 0; i < attrArr.length; i++) {
            var arr = attrArr[i].split(",");
            if (arr.length > 1) {
                //悟性丹按比增加属性
                for (var k = 0; k < this._attrWXD.length; k++) {
                    if (Number(arr[0]) == this._attrWXD[k].id) {
                        arr[1] = Math.round(Number(arr[1]) * (this._attrWXD[k].num * this._wxdUsed / 1000 + 1)) + "";
                        break;
                    }
                }
                //资质丹直接增加属性
                for (var j = 0; j < this._attrZZD.length; j++) {
                    if (Number(arr[0]) == this._attrZZD[j].id) {
                        arr[1] = Number(arr[1]) + this._attrZZD[j].num * this._zzdUsed + "";
                        break;
                    }
                }
                //道具外形直接增加属性
                for (var m = 0; m < this._itemStyles.length; m++) {
                    var avis = PetStyleCVO.getCVOByResId(this._itemStyles[m]).attrVO.attrInfos;
                    for (var n = 0; n < avis.length; n++) {
                        if (Number(arr[0]) == avis[n].id) {
                            arr[1] = Number(arr[1]) + avis[n].num + "";
                            break;
                        }
                    }
                }
            }
            if (i == attrArr.length - 1)
                result += arr[0] + "," + arr[1];
            else
                result += arr[0] + "," + arr[1] + "|";
        }
        if (this.allAttrVO)
            Manager.pool.push(this.allAttrVO);
        this.allAttrVO = Manager.pool.create(AttrVO, result);
        this.dispatchEvent(new PetEvent(PetEvent.UPDATE_ALL_ATTR));
    };
    PetModel.prototype.getAttrStr = function (attrStr) {
        if (this._curData && this._curData.zzdNum == this._zzdUsed && this._curData.wxdNum == this._wxdUsed && this._curData.baseStr == attrStr) {
            return this._curData.resultStr;
        }
        var attrArr = attrStr.split("|");
        var result = "";
        for (var i = 0; i < attrArr.length; i++) {
            var arr = attrArr[i].split(",");
            if (arr.length > 1) {
                //悟性丹按比增加属性
                for (var k = 0; k < this._attrWXD.length; k++) {
                    if (Number(arr[0]) == this._attrWXD[k].id) {
                        arr[1] = Math.round(Number(arr[1]) * (this._attrWXD[k].num * this._wxdUsed / 1000 + 1)) + "";
                        break;
                    }
                }
                //资质丹直接增加属性
                for (var j = 0; j < this._attrZZD.length; j++) {
                    if (Number(arr[0]) == this._attrZZD[j].id) {
                        arr[1] = Number(arr[1]) + this._attrZZD[j].num * this._zzdUsed + "";
                        break;
                    }
                }
            }
            if (i == attrArr.length - 1)
                result += arr[0] + "," + arr[1];
            else
                result += arr[0] + "," + arr[1] + "|";
        }
        this._curData = { zzdNum: this._zzdUsed, wxdNum: this._wxdUsed, baseStr: attrStr, resultStr: result };
        return result;
    };
    /**检测宠物进阶 */
    PetModel.prototype.checkCanUpgrade = function () {
        if (this._pinjie >= PetCVO.MAX_PINJIE)
            return false;
        var cvo = PetCVO.getCVO(this._pinjie, this._star);
        if (!cvo)
            return false;
        return cvo.loss.isEnough();
    };
    /**检测宠物喂养 */
    PetModel.prototype.checkCanFeed = function () {
        var cvo = PetCVO.getCVO(this._pinjie, this._star);
        if (!cvo)
            return false;
        //资质丹
        var bagCount = Manager.model.getItems().getCountItemById(ItemsConst.PET_ZZD);
        if (bagCount > 0)
            return this._zzdUsed < cvo.zzdMax;
        //悟性丹
        bagCount = Manager.model.getItems().getCountItemById(ItemsConst.PET_WXD);
        if (bagCount > 0)
            return this._wxdUsed < cvo.wxdMax;
        return false;
    };
    /**检测宠物技能 */
    PetModel.prototype.checkSkillCanUp = function () {
        for (var groupID in this._skillsDic) {
            if (this.checkOneSkillCanUp(parseInt(groupID)))
                return true;
        }
        return false;
    };
    Object.defineProperty(PetModel.prototype, "checkCanOperate", {
        /**检测可操作（进阶、喂养，激活、升级技能） */
        get: function () {
            if (!OpenCVO.isOpen(OpenConst.ID_PET))
                return false;
            return this.checkCanUpgrade() || this.checkCanFeed() || this.checkSkillCanUp();
        },
        enumerable: true,
        configurable: true
    });
    return PetModel;
}(egret.EventDispatcher));
__reflect(PetModel.prototype, "PetModel");
//# sourceMappingURL=PetModel.js.map