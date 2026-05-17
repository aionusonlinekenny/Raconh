var GainLossVO = /** @class */ (function () {
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
    function GainLossVO(content) {
        if (content != "") {
            var reg = /{|}| /g;
            content = content.replace(reg, "");
            var arr = content.split(",");
            this.type = arr[1];
            switch (this.type) {
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
    GainLossVO.prototype.isEnough = function (showTips, showItemTips) {
        if (showTips === void 0) { showTips = false; }
        if (showItemTips === void 0) { showItemTips = false; }
        var bool = this.selfCount >= this.num;
        if (!bool) {
            if (showTips)
                FloatTips.addTips(LangCVO.getContent("common40", this.name), Color.RED); //{0}不足
            if (showItemTips && this.item)
                Manager.view.show(9 /* ItemsTips */, this.item);
        }
        return bool;
    };
    Object.defineProperty(GainLossVO.prototype, "selfCount", {
        /**
         * 当前拥有数量
         * @return
         */
        get: function () {
            var count = 0;
            var info = Manager.model.self;
            switch (this.type) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GainLossVO.prototype, "name", {
        get: function () {
            switch (this.type) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GainLossVO.prototype, "item", {
        get: function () {
            // if(this._item == null && (this.type == GainLossVO.ITEM||this.type == GainLossVO.ITEM_NOTICE||this.type == GainLossVO.ITEM_NOTICE_FLAG))
            // {
            //     this._item = new ItemsModelInfo();
            //     this._item.base_id = this.baseId;
            //     this._item.bind = this.bind;
            //     this._item.quantity = this.num;
            // }
            if (this._item == null) {
                var tID = 0;
                if (this.type == GainLossVO.ITEM || this.type == GainLossVO.ITEM_NOTICE || this.type == GainLossVO.ITEM_NOTICE_FLAG)
                    tID = this.baseId;
                else if (this.type == GainLossVO.HONOR)
                    tID = ItemsConst.HONOUR;
                else if (this.type == GainLossVO.GOLD)
                    tID = ItemsConst.YUAN_BAO;
                else if (this.type == GainLossVO.YUPEIXIAO_ITEM)
                    tID = ItemsType.ITEM_40000306;
                if (tID > 0) {
                    this._item = new ItemsModelInfo();
                    this._item.base_id = tID;
                    this._item.bind = this.bind;
                    this._item.quantity = this.num;
                }
            }
            return this._item;
        },
        enumerable: true,
        configurable: true
    });
    GainLossVO.parse = function (config, splitStr) {
        if (splitStr === void 0) { splitStr = "|"; }
        var arr = config.split(splitStr);
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            result.push(new GainLossVO(arr[i]));
        }
        return result;
    };
    /**
     * 类型-元宝
     */
    GainLossVO.GOLD = "gold";
    GainLossVO.GOLD_NOTICE = "gold_notice";
    /**
     * 类型-铜币
     */
    GainLossVO.COIN = "coin";
    GainLossVO.COIN_NOTICE = "coin_notice";
    /**
     * 类型-经验
     */
    GainLossVO.EXP = "exp";
    GainLossVO.EXP_NOTICE = "exp_notice";
    /**
     * 类型-荣誉
     */
    GainLossVO.HONOR = "honor";
    GainLossVO.HONOR_NOTICE = "honor_notice";
    /**
     * 类型-掉落包
     */
    GainLossVO.DROP = "drop";
    /**
     * 类型-道具
     */
    GainLossVO.ITEM = "item";
    GainLossVO.ITEM_NOTICE = "item_notice";
    GainLossVO.ITEM_NOTICE_FLAG = "item_notice_flag";
    /**
   * 宗门捐献
   */
    GainLossVO.DONATE = "donate";
    GainLossVO.DONATE_NOTICE = "donate_notice";
    /**
     * 等级
     */
    GainLossVO.LEVEL = "lev";
    /**
     * 宗门贡献
     */
    GainLossVO.GUILD_DONATE = "guild_donate";
    /**
     * 主线副本
     */
    GainLossVO.DUN_PASS = "dun_pass";
    /**
     * 强化总等级
     */
    GainLossVO.EQM_LEV = "eqm_lev";
    /**
     * 宠物阶数
     */
    GainLossVO.PET_LEV = "pet_lev";
    /**
     * 宝石总等级
     */
    GainLossVO.STONE_LEV = "stone_lev";
    /**
     * 铸魂总等级
     */
    GainLossVO.EQM_SOUL_LEV = "eqm_soul_lev";
    /**
     * 经脉总等级
     */
    GainLossVO.MERIDIAN_LEV = "meridian_lev";
    /**
     * 命魂
     */
    GainLossVO.DESTINY_SOUL = "destiny_soul";
    /**
     * 人物转生
     */
    GainLossVO.REIN = "rein";
    /**
     * 人物职业
     */
    GainLossVO.CAREER = "career";
    /**
     * 人物VIP限制
     */
    GainLossVO.VIP_LEVEL = "vip_lev";
    /** 绝学境界值 */
    GainLossVO.JUEXUE_AMBIT = "juexue_ambit";
    /** 翡翠墨玉  (baseId:40000306　　当首具消耗）*/
    GainLossVO.YUPEIXIAO_ITEM = "yupeixiao_item";
    /** 缥缈录星数 */
    GainLossVO.DIMLY_STAR = "dimly_star";
    /**盟主战排名称号 */
    GainLossVO.CLUB_TITLE = "title";
    return GainLossVO;
}());
//# sourceMappingURL=GainLossVO.js.map