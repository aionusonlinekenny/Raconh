/**
 * 条件解析
 * liangyan
 * create 2017-11-21
*/
class ConditionVO
{
    /**等级 */
    public static LEVEL:string = "lev";
    /**转生 */
    public static REIN:string = "rein";

    public static VIP:string = "vip_lev";
    /** 职业 */
    public static CAREER:string = "career";
    /**任务 */
    public static TASK:string = "task";
    /**通关副本 */
    public static COPY_PASS:string = "dun_pass";
    /**限制次数:{cond,dun_limit,副本id,次数} */
    public static COPY_LIMIT:string = "dun_limit";
    /**转生boss */
    public static REIN_BOSS:string = "rein_boss";
    /** 神器碎片 */
    public static DEBRIS:string = "debris";

    /**{cond, pet_fc, fc_cnt}宠物总战力 */
    public static PET_FC:string = "pet_fc";
    /**{cond, ambit, ambit_lev}绝学阶段*/
    public static AMBIT:string = "ambit";
    /**{cond, dmg, power}角色战力*/
    public static POWER:string = "power";
    /**{cond, desty, desty_fc}命格总战力*/
    public static DESTY:string = "desty";

    /**宝石总等级*/
    public static STONE_LEV:string = "stone_lev";
    /**铸魂总等级*/
    public static EQM_SOUL_LEV:string = "eqm_soul_lev";

    /**类型 */
    public type:string;
    /**数值 */
    public value:number;
    /**数值2 */
    public value2:number;
    /**转生bossId列表 */
    public bossList:Array<number>;

    public get desc():string
    {
        let str:string = "";
        let copy:CopyCVO;
        switch(this.type)
        {
            case ConditionVO.LEVEL:
                str = StringUtils.setParam(LangCVO.getContent("common10"),this.value);//须要达到{0}级
                break;
            case ConditionVO.REIN:
                str = StringUtils.setParam(LangCVO.getContent("common38"),this.value);//需要达到{0}转
                break;
            case ConditionVO.VIP:
                str = StringUtils.setParam(LangCVO.getContent("common11"),this.value);//须要VIP达到{0}
                break;
            case ConditionVO.CAREER:
                str = StringUtils.setParam(LangCVO.getContent("common22"));//性别错误
                break;
            case ConditionVO.TASK:
                str = StringUtils.setParam(LangCVO.getContent("common24"));//需要完成指定任务
                break;
            case ConditionVO.COPY_PASS:
                copy = CopyCVO.getCVO(this.value);
                if(copy) str = StringUtils.setParam(LangCVO.getContent("common25"), copy.name);//需要通关{0}
                break;
            case ConditionVO.COPY_LIMIT:
                copy = CopyCVO.getCVO(this.value);
                if(copy) str = StringUtils.setParam(LangCVO.getContent("common32"));//次数不足
                break;
            case ConditionVO.REIN_BOSS:
                str = StringUtils.setParam(LangCVO.getContent("common26"),this.value);//需要累计击杀全民boss{0}次
                break;
        }
        return str;
    }

    /**
     * 创建一个新的 条件解析对象
     * @param content 数据对象
     * {cond,lev,1}	            等级
     * {cond,rein,0}			转生
     */
    public constructor(content:string)
	{
        if(content != "")
        {
            var reg:RegExp = /{|}| /g;
            content = content.replace(reg,"");
            let arr:Array<string> = content.split(",");
            this.type = arr[1];
            switch(this.type)
            {
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
                    let list:Array<string> = arr[2].substr(1, arr[2].length - 2).split("_");
                    this.bossList = [];
                    for(let i:number=0; i<list.length; i++)
                        this.bossList.push(Number(list[i]));
                    this.value = Number(arr[3]);
                break;
            }
        }
    }

    /**是否满足条件 */
    public isSatisfy(info:PlayerGameObjectInfo = null, showTips:boolean = false):boolean
	{
        let result:boolean = false;
        let copy:CopyCVO;
        if(!info) info = Manager.model.self;
        switch(this.type)
        {
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
                result =Manager.model.getTask().getTaskIdComplete(this.value);
                break;
            case ConditionVO.COPY_PASS:
                if(this.value == 100)
                {
                    //主线副本
                    copy = CopyCVO.getCVO(this.value);
                    result = copy.cell >= this.value2;
                }
                if(this.value == 101)
                {
                    //爬塔副本
                    result = Manager.model.getCopy().towerModel.history >= this.value2;
                }
                break;
            case ConditionVO.COPY_LIMIT:
                copy = CopyCVO.getCVO(this.value);
                result = copy.enterNum < this.value2;
                break;
            case ConditionVO.REIN_BOSS:
                if(info.attrInfo.zhuanshu >= ReinCVO.maxLevel) result = true;
                else result = Manager.model.getRein().bossCount >= this.value;
                break;
            case ConditionVO.DEBRIS:
                let desCvo:RelicStuffDebrisCVO = RelicStuffDebrisCVO.cvo(this.value);
                result = desCvo.isActivity();
                break;
            case ConditionVO.PET_FC:
                Manager.model.getPet().reParseAllAttrVO();
                result = Manager.model.getPet().allAttrVO.getFighting()>= this.value;
                break;
            case ConditionVO.AMBIT:
                result = Manager.model.getjuexue().ambitLv>= this.value
                break;
            case ConditionVO.POWER:
                result = Manager.model.self.attrInfo.fight>= this.value
                break;
            case ConditionVO.DESTY:
                result = Manager.model.getLifeGrid().getAllFight()>= this.value
                break;
            case ConditionVO.STONE_LEV:
                result = Manager.model.getEquip().getTotalGemLevel()>= this.value
                break;
            case ConditionVO.EQM_SOUL_LEV:
                result = Manager.model.getEquip().getTotalZhuhuanLevel()>= this.value
                break;
            default:
                throw new Error("没有对应类型:" + this.type);
        }
        if(showTips && !result) FloatTips.addTips(this.desc, Color.RED);
        return result;
    }
/** 返回 条件判断列表 */
    public static getVOList(content:string):Array<ConditionVO>
    {
        let arr:Array<ConditionVO> = [];
        if(content != "")
        {
            let strArr:Array<string> = content.split("|");
            for(let key of strArr)
            {
                if(key != "")
                {
                    let cvo:ConditionVO = new ConditionVO(key);
                    arr.push(cvo);
                }
            }
        }
        return arr;
    }
}