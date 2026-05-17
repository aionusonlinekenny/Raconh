/**
 * 条件解析
 * liangyan
 * create 2017-11-21
*/
var ConditionVO = /** @class */ (function () {
    /**
     * 创建一个新的 条件解析对象
     * @param content 数据对象
     * {cond,lev,1}	            等级
     * {cond,rein,0}			转生
     */
    function ConditionVO(content) {
        if (content != "") {
            var reg = /{|}| /g;
            content = content.replace(reg, "");
            var arr = content.split(",");
            this.type = arr[1];
            switch (this.type) {
                case ConditionVO.LEVEL:
                case ConditionVO.REIN:
                case ConditionVO.VIP:
                case ConditionVO.CAREER:
                case ConditionVO.TASK:
                case ConditionVO.DEBRIS:
                case ConditionVO.PET_FC:
                case ConditionVO.AMBIT:
                case ConditionVO.POWER:
                case ConditionVO.DESTY:
                case ConditionVO.STONE_LEV:
                case ConditionVO.EQM_SOUL_LEV:
                    this.value = Number(arr[2]);
                    break;
                case ConditionVO.COPY_PASS:
                case ConditionVO.COPY_LIMIT:
                    this.value = Number(arr[2]);
                    this.value2 = Number(arr[3]);
                    break;
                case ConditionVO.REIN_BOSS:
                    var list = arr[2].substr(1, arr[2].length - 2).split("_");
                    this.bossList = [];
                    for (var i = 0; i < list.length; i++)
                        this.bossList.push(Number(list[i]));
                    this.value = Number(arr[3]);
                    break;
            }
        }
    }
    Object.defineProperty(ConditionVO.prototype, "desc", {
        get: function () {
            var str = "";
            var copy;
            switch (this.type) {
                case ConditionVO.LEVEL:
                    str = StringUtils.setParam(LangCVO.getContent("common10"), this.value); //须要达到{0}级
                    break;
                case ConditionVO.REIN:
                    str = StringUtils.setParam(LangCVO.getContent("common38"), this.value); //需要达到{0}转
                    break;
                case ConditionVO.VIP:
                    str = StringUtils.setParam(LangCVO.getContent("common11"), this.value); //须要VIP达到{0}
                    break;
                case ConditionVO.CAREER:
                    str = StringUtils.setParam(LangCVO.getContent("common22")); //性别错误
                    break;
                case ConditionVO.TASK:
                    str = StringUtils.setParam(LangCVO.getContent("common24")); //需要完成指定任务
                    break;
                case ConditionVO.COPY_PASS:
                    copy = CopyCVO.getCVO(this.value);
                    if (copy)
                        str = StringUtils.setParam(LangCVO.getContent("common25"), copy.name); //需要通关{0}
                    break;
                case ConditionVO.COPY_LIMIT:
                    copy = CopyCVO.getCVO(this.value);
                    if (copy)
                        str = StringUtils.setParam(LangCVO.getContent("common32")); //次数不足
                    break;
                case ConditionVO.REIN_BOSS:
                    str = StringUtils.setParam(LangCVO.getContent("common26"), this.value); //需要累计击杀全民boss{0}次
                    break;
            }
            return str;
        },
        enumerable: true,
        configurable: true
    });
    /**是否满足条件 */
    ConditionVO.prototype.isSatisfy = function (info, showTips) {
        if (info === void 0) { info = null; }
        if (showTips === void 0) { showTips = false; }
        var result = false;
        var copy;
        if (!info)
            info = Manager.model.self;
        switch (this.type) {
            case ConditionVO.LEVEL:
                result = info.attrInfo.level >= this.value;
                break;
            case ConditionVO.REIN:
                result = info.attrInfo.zhuanshu >= this.value;
                break;
            case ConditionVO.VIP:
                result = info.attrInfo.vipLevel >= this.value;
                break;
            case ConditionVO.CAREER:
                result = info.attrInfo.career == this.value;
                break;
            case ConditionVO.TASK:
                result = Manager.model.getTask().getTaskIdComplete(this.value);
                break;
            case ConditionVO.COPY_PASS:
                if (this.value == 100) {
                    //主线副本
                    copy = CopyCVO.getCVO(this.value);
                    result = copy.cell >= this.value2;
                }
                if (this.value == 101) {
                    //爬塔副本
                    result = Manager.model.getCopy().towerModel.history >= this.value2;
                }
                break;
            case ConditionVO.COPY_LIMIT:
                copy = CopyCVO.getCVO(this.value);
                result = copy.enterNum < this.value2;
                break;
            case ConditionVO.REIN_BOSS:
                if (info.attrInfo.zhuanshu >= ReinCVO.maxLevel)
                    result = true;
                else
                    result = Manager.model.getRein().bossCount >= this.value;
                break;
            case ConditionVO.DEBRIS:
                var desCvo = RelicStuffDebrisCVO.cvo(this.value);
                result = desCvo.isActivity();
                break;
            case ConditionVO.PET_FC:
                Manager.model.getPet().reParseAllAttrVO();
                result = Manager.model.getPet().allAttrVO.getFighting() >= this.value;
                break;
            case ConditionVO.AMBIT:
                result = Manager.model.getjuexue().ambitLv >= this.value;
                break;
            case ConditionVO.POWER:
                result = Manager.model.self.attrInfo.fight >= this.value;
                break;
            case ConditionVO.DESTY:
                result = Manager.model.getLifeGrid().getAllFight() >= this.value;
                break;
            case ConditionVO.STONE_LEV:
                result = Manager.model.getEquip().getTotalGemLevel() >= this.value;
                break;
            case ConditionVO.EQM_SOUL_LEV:
                result = Manager.model.getEquip().getTotalZhuhuanLevel() >= this.value;
                break;
            default:
                throw new Error("没有对应类型:" + this.type);
        }
        if (showTips && !result)
            FloatTips.addTips(this.desc, Color.RED);
        return result;
    };
    /** 返回 条件判断列表 */
    ConditionVO.getVOList = function (content) {
        var arr = [];
        if (content != "") {
            var strArr = content.split("|");
            for (var _i = 0, strArr_1 = strArr; _i < strArr_1.length; _i++) {
                var key = strArr_1[_i];
                if (key != "") {
                    var cvo = new ConditionVO(key);
                    arr.push(cvo);
                }
            }
        }
        return arr;
    };
    /**等级 */
    ConditionVO.LEVEL = "lev";
    /**转生 */
    ConditionVO.REIN = "rein";
    ConditionVO.VIP = "vip_lev";
    /** 职业 */
    ConditionVO.CAREER = "career";
    /**任务 */
    ConditionVO.TASK = "task";
    /**通关副本 */
    ConditionVO.COPY_PASS = "dun_pass";
    /**限制次数:{cond,dun_limit,副本id,次数} */
    ConditionVO.COPY_LIMIT = "dun_limit";
    /**转生boss */
    ConditionVO.REIN_BOSS = "rein_boss";
    /** 神器碎片 */
    ConditionVO.DEBRIS = "debris";
    /**{cond, pet_fc, fc_cnt}宠物总战力 */
    ConditionVO.PET_FC = "pet_fc";
    /**{cond, ambit, ambit_lev}绝学阶段*/
    ConditionVO.AMBIT = "ambit";
    /**{cond, dmg, power}角色战力*/
    ConditionVO.POWER = "power";
    /**{cond, desty, desty_fc}命格总战力*/
    ConditionVO.DESTY = "desty";
    /**宝石总等级*/
    ConditionVO.STONE_LEV = "stone_lev";
    /**铸魂总等级*/
    ConditionVO.EQM_SOUL_LEV = "eqm_soul_lev";
    return ConditionVO;
}());
//# sourceMappingURL=ConditionVO.js.map