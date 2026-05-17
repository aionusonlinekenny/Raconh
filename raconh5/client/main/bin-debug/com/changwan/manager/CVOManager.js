var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**            case "rename_data":
                RenameCVO.parse(data);

 * 模板表管理器
 */
var CVOManager = (function () {
    // private _oneData:egret.ByteArray;
    function CVOManager() {
        this._totalLen = 0;
        this._current = 0;
        this._count = 0;
        // this._oneData = new egret.ByteArray();
    }
    CVOManager.prototype.loadDataComplete = function (bytes) {
        this._data = new egret.ByteArray(bytes, bytes.byteLength);
        this._totalLen = this._data.readByte();
        Manager.render.add(this.render, this);
    };
    CVOManager.prototype.render = function () {
        var a = egret.getTimer();
        var name;
        if (this._current < this._totalLen) {
            this._current++;
            var fileName = this._data.readUTF();
            name = fileName;
            var len = this._data.readInt();
            var bytes = new egret.ByteArray();
            bytes.writeBytes(this._data, this._data.position, len);
            // this._oneData.clear();
            // this._oneData.writeBytes(this._data, this._data.position, len);
            this._data.position += len;
            // this.loadFileData(fileName,this._oneData);
            this.loadFileData(fileName, bytes);
        }
        else {
            this._data.clear();
            this._data = null;
            // this._oneData.clear();
            // this._oneData = null;
            Manager.render.remove(this.render, this);
            // if(this._count <= 0)GameDispatcher.getInstance().dispatchEvent(new GlobalEvent(GlobalEvent.PARSE_CVO_COMPLETE));
            this.complete(false);
        }
        if (egret.getTimer() - a > 50)
            egret.log(name, egret.getTimer() - a);
    };
    CVOManager.prototype.complete = function (reduce) {
        if (reduce === void 0) { reduce = true; }
        if (reduce)
            this._count--;
        if (!Manager.render.contains(this.render, this) && this._count <= 0) {
            GameDispatcher.getInstance().dispatchEvent(new GlobalEvent(GlobalEvent.PARSE_CVO_COMPLETE));
        }
    };
    CVOManager.prototype.loadFileData = function (fileName, data) {
        data.position = 0;
        switch (fileName) {
            case "language":
                LangCVO.parse(data);
                break;
            case "role_exp_data":
                RoleExpCVO.parse(data);
                break;
            case "animation_data":
                AnimationCVO.parse(data);
                break;
            case "npc_data":
                NpcCVO.parse(data);
                break;
            case "text_data":
                TextDataCVO.parse(data);
                break;
            case "item_data":
                ItemsCVO.parse(data);
                break;
            case "scene_data":
                MapCVO.parse(data);
                break;
            case "mon_data":
                MonsterCVO.parse(data);
                break;
            case "eqm_enhance_data":
                EquipStrengthenCVO.parse(data);
                break;
            case "eqm_cast_soul_data":
                EquipZhuhunCVO.parse(data);
                break;
            case "task_data":
                this._count++;
                TaskCVO.parse(data);
                break;
            case "skill_data":
                SkillCVO.parse(data);
                break;
            case "meridian_data":
                JingMaiCVO.parse(data);
                break;
            case "attr_desc_data":
                AttrCVO.parse(data);
                break;
            case "attr_power_data":
                AttributeFightingCVO.parse(data);
                break;
            case "activity_data":
                ActivityCVO.parseCVOs(data);
                break;
            case "buff_data":
                BuffCVO.parse(data);
                break;
            case "eqm_stone_data":
                EquipStoneCVO.parse(data);
                break;
            case "shop_data":
                ShopCVO.parse(data);
                break;
            case "title_data":
                TitleCVO.parse(data);
                break;
            case "dungeon_data":
                this._count++;
                CopyCVO.parseCVOs(data);
                break;
            case "cloak_data":
                CloakCVO.parse(data);
                break;
            case "rein_data":
                ReinCVO.parse(data);
                break;
            case "rename_data":
                RenameCVO.parse(data);
                break;
            case "guild_data":
                ClubDataCVO.parse(data);
                break;
            case "guild_war_data":
                ClubBFConfigCVO.parseCVOs(data);
                break;
            case "sys_notice_data":
                SysNoteiceCVO.parse(data);
                break;
            case "fashion_data":
                FashionCVO.parseCVOs(data);
                break;
            case "boss_data":
                BossCVO.parse(data);
                break;
            case "pet_data":
                PetCVO.parse(data);
                break;
            case "weapon_soul_data":
                SoldierCVO.parse(data);
                break;
            case "daily_activity_data":
                DailyActivityCVO.parse(data);
                break;
            case "vip_data":
                VipLevelCVO.parse(data);
                break;
            case "destiny_data":
                LifeGridCVO.parse(data);
                break;
            case "open_data":
                OpenCVO.parse(data);
                break;
            case "scene_effect_data":
                SceneEffCVO.parse(data);
                break;
            case "sys_charge_data":
                SysChargeCVO.parse(data);
                break;
            case "arena_data":
                ArenaCVOTool.parse(data);
                break;
            case "eqm_suit_data":
                SuitCVO.parse(data);
                break;
            case "dun_exp_data":
                CopyExpScoreCVO.parseCVOs(data);
                break;
            case "first_charge_data":
                FirstChargeCVO.parse(data);
                break;
            case "sys_privilege_data":
                SysPrivilegeCVO.parse(data);
                break;
            case "training_data":
                TrainingCVO.parse(data);
                break;
            case "sys_invest_data":
                SysInvestCVO.parse(data);
                break;
            case "cash_cow_data":
                CashCowCVO.parse(data);
                break;
            case "scene_robot_data":
                SceneRobotCVO.parseCVOs(data);
                break;
            case "laird_data":
                LairdCVO.parse(data);
                break;
            case "recharge_activity_data":
                RechargeActivityCVO.parse(data);
                break;
            case "lev_item_data":
                LevItemCVO.parse(data);
                break;
            case "sevendays_data":
                SevenDaysCVO.parse(data);
                break;
            case "treasure_garret_data":
                TreasureGarretCVO.parse(data);
                break;
            case "artifact_data":
                ArtifactCVO.parse(data);
                break;
            case "dialog_data":
                DialogCVO.parse(data);
                break;
            case "juexue_data":
                JueXueCVO.parse(data);
                break;
            case "relic_stuff_data":
                RelicStuffCVO.parse(data);
                break;
            case "daily_rebate_data":
                DailyRebateCVO.parse(data);
                break;
            case "share_data":
                ShareCVO.parse(data);
                break;
            case "upd_notice_data":
                UpdNoticCVO.parse(data);
                break;
            case "srv_rank_data":
                SrvRankCVO.parse(data);
                break;
            case "dun_dimly_data":
                MaterialCopyDataCVO.parse(data);
                break;
            case "daily_sign_data":
                QiandaoCVO.parse(data);
                break;
            case "sharp_eye_data":
                FireEyeCVOTool.parse(data);
                break;
            case "soul_gather_data":
                JuyuanCVO.parse(data);
                break;
            case "eqm_star_data":
                StarUpCVO.parse(data);
                break;
            case "devil_data":
                DevilConfigCVO.parse(data);
                break;
            case "exchange_data":
                ExchangeCVO.parse(data);
                break;
            case "world_storm_data":
                StormFieldCVO.parseCVOs(data);
                break;
            default:
                Trace.error("未定义的表", fileName);
                break;
        }
    };
    return CVOManager;
}());
__reflect(CVOManager.prototype, "CVOManager");
//# sourceMappingURL=CVOManager.js.map