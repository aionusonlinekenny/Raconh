class GainLossVO
{
    /**
     * 类型-元宝
     */
    public static GOLD:string = "gold";
    public static GOLD_NOTICE = "gold_notice";
    /**
     * 类型-铜币 
     */
    public static COIN:string = "coin";
    public static COIN_NOTICE:string  = "coin_notice";
    /**
     * 类型-经验
     */
    public static EXP:string = "exp";
    public static EXP_NOTICE:string  = "exp_notice";
    /**
     * 类型-荣誉
     */
    public static HONOR:string = "honor";
    public static HONOR_NOTICE:string  = "honor_notice";
    /**
     * 类型-掉落包
     */
    public static DROP:string = "drop";
    /**
     * 类型-道具
     */
    public static ITEM:string = "item";
    public static ITEM_NOTICE:string  = "item_notice";
    public static ITEM_NOTICE_FLAG:string  = "item_notice_flag";

      /**
     * 宗门捐献
     */
    public static DONATE:string ="donate";
    public static DONATE_NOTICE:string  = "donate_notice";
    /**
     * 等级
     */
    public static LEVEL:string = "lev";
    /**
     * 宗门贡献
     */
    public static GUILD_DONATE:string = "guild_donate";
    /**
     * 主线副本
     */
    public static DUN_PASS:string = "dun_pass";
    /**
     * 强化总等级
     */
    public static EQM_LEV:string = "eqm_lev";
    /**
     * 宠物阶数
     */
    public static PET_LEV:string = "pet_lev";
    /**
     * 宝石总等级
     */
    public static STONE_LEV:string = "stone_lev";
    /**
     * 铸魂总等级
     */
    public static EQM_SOUL_LEV:string = "eqm_soul_lev";
    /**
     * 经脉总等级
     */
    public static MERIDIAN_LEV:string = "meridian_lev";
    /**
     * 命魂
     */
    public static DESTINY_SOUL:string = "destiny_soul";
    /**
     * 人物转生
     */
    public static REIN:string = "rein";
    /**
     * 人物职业
     */
    public static CAREER:string = "career";
    /**
     * 人物VIP限制
     */
    public static VIP_LEVEL:string = "vip_lev";

    /** 绝学境界值 */
    public static JUEXUE_AMBIT:string = "juexue_ambit";
    /** 翡翠墨玉  (baseId:40000306　　当首具消耗）*/
    public static YUPEIXIAO_ITEM:string = "yupeixiao_item";
        /** 缥缈录星数 */
    public static DIMLY_STAR:string = "dimly_star";
    /**盟主战排名称号 */
    public static CLUB_TITLE:string = "title";

      /**
     * 主线副本ID
     */
    public copyId:number;


    /**
     * 奖励/消耗类型
     */
    public type:string;
    /**
     * 基础ID
     */
    public baseId:number;
    /**
     * 是否绑定
     */
    public bind:boolean;
    /**
     * 数量
     */
    public num:number;
    /**
     * 宠物等阶
     */
    public pet_phase:number;
    /**
     * 宠物星阶
     */
    public pet_level:number;
    /** 特效 */
    public effect:string;

    /**盟会ID */
    public clubId:number;
    /**盟主战排名 */
    public clubLeaderWarRank:number;

    /**
     * 创建一个新的 奖励/消耗对象
     * @param content 数据对象
     * {loss,item,{base_id,isBind,num}}	道具
     * {loss,exp,num}			经验
     * {loss,gold,num}			元宝
     * {gain,coin,num}			铜钱
     * {gain,honor,num}			荣誉
     * {loss,drop,num}			掉落包
     * {Type,gold_notice,num}			元宝(飘字提示)
     * {Type,coin_notice,num}			铜钱(飘字提示)
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
                case GainLossVO.ITEM:
                case GainLossVO.ITEM_NOTICE:
                case GainLossVO.ITEM_NOTICE_FLAG:
                    this.baseId = Number(arr[2]);
                    this.bind = arr[3] == "1";
                    this.num = Number(arr[4]);
                    this.effect = arr[5];
                    break;
                case GainLossVO.GOLD:
                case GainLossVO.COIN:
                case GainLossVO.EXP:
                case GainLossVO.HONOR:
                case GainLossVO.DROP:
                case GainLossVO.GOLD_NOTICE:
                case GainLossVO.COIN_NOTICE:
                case GainLossVO.EXP_NOTICE:
                case GainLossVO.HONOR_NOTICE:
                case GainLossVO.DONATE_NOTICE:
                case GainLossVO.DONATE:
                case GainLossVO.LEVEL:
                case GainLossVO.GUILD_DONATE:
                case GainLossVO.EQM_LEV:
                case GainLossVO.STONE_LEV:
                case GainLossVO.EQM_SOUL_LEV:
                case GainLossVO.MERIDIAN_LEV:
                case GainLossVO.DESTINY_SOUL:
                case GainLossVO.REIN:
                case GainLossVO.CAREER:
                case GainLossVO.VIP_LEVEL:
                case GainLossVO.JUEXUE_AMBIT:
                case GainLossVO.YUPEIXIAO_ITEM:
                case GainLossVO.DIMLY_STAR:
                    this.num = Number(arr[2]);
                    break;
                case GainLossVO.DUN_PASS:
                    this.copyId = Number(arr[2]);
                    this.num = Number(arr[3]);
                    break;
                case GainLossVO.PET_LEV:
                    this.pet_phase = Number(arr[2]);
                    this.pet_level = Number(arr[3]);
                    break;
                case GainLossVO.CLUB_TITLE:
                    this.clubId = Number(arr[2]);
                    this.clubLeaderWarRank = Number(arr[3]);
                    break;
            }
        }
    }

    /**
     * 是否足够消耗
     * @return
     */
    public isEnough(showTips:boolean = false, showItemTips:boolean = false):boolean
	{
        let bool:boolean = this.selfCount >= this.num;
        if(!bool) 
        {
            if(showTips) FloatTips.addTips(LangCVO.getContent("common40", this.name), Color.RED);//{0}不足
            if(showItemTips && this.item) Manager.view.show(ViewID.ItemsTips, this.item);
        }
        return bool;
    }
    /**
     * 当前拥有数量
     * @return 
     */
    public get selfCount():number
    {
        let count:number = 0;
        let info:SelfGameObjectInfo = Manager.model.self;
        switch(this.type)
        {
            case GainLossVO.GOLD:
            case GainLossVO.GOLD_NOTICE:
                count = info.attrInfo.gold;
                break;
            case GainLossVO.COIN:
            case GainLossVO.COIN_NOTICE:
                count = info.attrInfo.coin;
                break;
            case GainLossVO.HONOR:
                count = info.attrInfo.honor;
                break;
            case GainLossVO.DONATE:
                count = info.attrInfo.guildContri;
                break;
            case GainLossVO.ITEM:
            case GainLossVO.ITEM_NOTICE:
            case GainLossVO.ITEM_NOTICE_FLAG:
                count = Manager.model.getItems().getCountItemById(this.baseId);
                break;
            case GainLossVO.DESTINY_SOUL:
                count = info.attrInfo.soul;
                break;
            case GainLossVO.REIN:
                count = Manager.model.self.attrInfo.zhuanshu;
                break;
            case GainLossVO.CAREER:
                count = Manager.model.self.attrInfo.career;
                break;
            case GainLossVO.VIP_LEVEL:
                count = Manager.model.self.attrInfo.vipLevel;
                break;
            case GainLossVO.JUEXUE_AMBIT:
                count = info.attrInfo.juexue_ambit;
                break;
            case GainLossVO.YUPEIXIAO_ITEM:
                count = Manager.model.getItems().getCountItemById(ItemsType.ITEM_40000306);
                break;
            default:
                throw new Error("没有对应类型:" + this.type);
        }
        return count;
    }
    public get name():string
    {
         switch(this.type)
        {
            case GainLossVO.GOLD:
            case GainLossVO.GOLD_NOTICE:
                return "元宝";
            case GainLossVO.COIN:
            case GainLossVO.COIN_NOTICE:
                return "银币";
            case GainLossVO.EXP:
            case GainLossVO.EXP_NOTICE:
                return "经验";
            case GainLossVO.HONOR:
            case GainLossVO.HONOR_NOTICE:
                return "荣誉";
            case GainLossVO.DONATE:
            case GainLossVO.HONOR_NOTICE:
                return "贡献";
            case GainLossVO.ITEM:
            case GainLossVO.ITEM_NOTICE:
            case GainLossVO.ITEM_NOTICE_FLAG:
            case GainLossVO.YUPEIXIAO_ITEM:
                return this.item.cvo.name;
        }
        return "";
    }

    private _item:ItemsModelInfo;
    public get item():ItemsModelInfo
    {
        // if(this._item == null && (this.type == GainLossVO.ITEM||this.type == GainLossVO.ITEM_NOTICE||this.type == GainLossVO.ITEM_NOTICE_FLAG))
        // {
        //     this._item = new ItemsModelInfo();
        //     this._item.base_id = this.baseId;
        //     this._item.bind = this.bind;
        //     this._item.quantity = this.num;
        // }
        if(this._item == null)
        {
            let tID:number = 0;
            if(this.type == GainLossVO.ITEM||this.type == GainLossVO.ITEM_NOTICE||this.type == GainLossVO.ITEM_NOTICE_FLAG) tID = this.baseId;
            else if(this.type == GainLossVO.HONOR) tID = ItemsConst.HONOUR;
            else if(this.type == GainLossVO.GOLD) tID = ItemsConst.YUAN_BAO;
            else if(this.type == GainLossVO.YUPEIXIAO_ITEM) tID = ItemsType.ITEM_40000306;
            if(tID > 0)
            {
                this._item = new ItemsModelInfo();
                this._item.base_id = tID;
                this._item.bind = this.bind;
                this._item.quantity = this.num;
            }
        }
        return this._item;
    }

    public static parse(config:string, splitStr:string="|"):GainLossVO[]
    {
        let arr:string[] = config.split(splitStr);
        let result:GainLossVO[] = [];
        for(let i:number = 0; i < arr.length; i++)
        {
            result.push(new GainLossVO(arr[i]));
        }
        return result;
    }
}