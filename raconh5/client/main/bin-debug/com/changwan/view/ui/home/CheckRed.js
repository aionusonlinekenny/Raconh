var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CheckRed = (function () {
    function CheckRed(owner) {
        this._owner = owner;
        this._updateRein = true;
        this._checkClubRedIcon = true;
        this._checkRoleRedIcon = true;
        this._checkSkillRedIcon = true;
        this._checkEquipRedIcon = true;
        this._updateItem = true;
        this.dispatchRender();
        Manager.model.getrelicstuff().addEventListener(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT, this.__relicstuffActivity, this); //天机阁onReinUpdate
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.__itemUpdate, this);
        Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT, this.__updateEquip, this);
        Manager.model.getEquip().addEventListener(EquipEvent.SUIT_INFO_UPDATE, this.__updateEquip, this);
        Manager.model.getSkill().addEventListener(SkillEvent.SKILL_UPDATE, this.__skillUpdate, this);
        Manager.model.getCopy().towerModel.addEventListener(CopyEvent.UPDATE_TOWER_INFO, this.__skillUpdate, this);
        Manager.model.getLifeGrid().addEventListener(LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT, this.__skillUpdate, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.SOUL, this.__skillUpdate, this);
        Manager.model.getjuexue().addEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT, this.__skillUpdate, this);
        Manager.model.getjuexue().addEventListener(JuexueEvent.JUEXUE_AMBIT_EVENT, this.__skillUpdate, this);
        Manager.model.getSoldier().addEventListener(SoldierEvent.SOLDIER_INFO_UPDATE, this.__roleUpdate, this);
        Manager.model.getDress().fashionModel.addEventListener(FashionEvent.UPDATE, this.__roleUpdate, this);
        Manager.model.getCloak().addEventListener(CloakEvent.CLOAK_UPDATE_EVENT, this.__roleUpdate, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.GUILDCONTRI, this.__updateClub, this);
        Manager.model.getClub().addEventListener(ClubEvent.UPDATE_CLUB_INFO, this.__updateClub, this);
        Manager.model.getJingMai().addEventListener(JingMaiEvent.JINGMAI_UPDATE_EVENT, this.__updateClub, this);
        Manager.model.getClub().addEventListener(ClubEvent.UPDATE_CLUB_CAREER, this.__updateClub, this);
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_PK_COUNT, this.__updateClub, this);
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.__updateClub, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.__updateClub, this);
        Manager.model.getJuyuan().addEventListener(JuyuanEvent.JUYUAN_PROGRESS_UPDATE, this.__updateClub, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.COIN, this.__updateClub, this);
        // Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.__updateClub,this);
    }
    CheckRed.prototype.dispatchRender = function () {
        Manager.render.add(this.check, this, 3000);
    };
    CheckRed.prototype.checkOneKeyEquip = function () {
        var ret = false;
        if (OpenCVO.isOpen(OpenConst.ID_ONE_KEY_EQUIP)) {
            ret = Manager.model.getItems().oneKeyUpgradeEquipList.length >= 2;
        }
        return ret;
    };
    CheckRed.prototype.checkRedIcon = function (id) {
        var owner = this._owner;
        if (id == ActIconID.REIN)
            owner.drawRedIcon(ActIconID.REIN, Manager.model.getrelicstuff().checkActivity() || Manager.model.getRein().getCheckCanRein());
        else if (id == ActIconID.CLUB) {
            owner.drawRedIcon(ActIconID.CLUB, OpenCVO.isOpen(OpenConst.ID_CLUB_CENTER) && Manager.model.getClub().checkShowRedIcon()
                || OpenCVO.isOpen(OpenConst.ID_ARENA_PK) && (Manager.model.getArena().hasMaxAwardCanGet || Manager.model.getArena().hasPkCount)
                || OpenCVO.isOpen(OpenConst.ID_LAIRD) && Manager.model.getLaird().checkRedIcon()
                || OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA) && (Manager.model.getCopy().towerModel.canSaodang || Manager.model.getCopy().towerModel.canChallenge())
                || OpenCVO.isOpen(OpenConst.ID_CLUB_LEADER) && Manager.model.getClubLeaderWar().checkCanMobai()
                || Manager.model.getJuyuan().checkCoin());
        }
        else if (id == ActIconID.ROLE) {
            owner.drawRedIcon(ActIconID.ROLE, this.checkOneKeyEquip()
                || Manager.model.getPet().checkCanOperate
                || Manager.model.getSoldier().checkCanUpgrade()
                || Manager.model.getCloak().checkActiveCloak()
                || Manager.model.getDress().fashionModel.hasCanActive);
        }
        else if (id == ActIconID.SKILL) {
            owner.drawRedIcon(ActIconID.SKILL, Manager.model.getItems().checkLifeGridBagAmple()
                || Manager.model.getLifeGrid().isUpgrade()
                || Manager.model.getSkill().checkTipsShow()
                || Manager.model.getLifeGrid().getIsAware()
                || Manager.model.getLifeGrid().getIsSenior()
                || Manager.model.getLifeGrid().isFree()
                || Manager.model.getjuexue().checkUpgrade(null)
                || Manager.model.getjuexue().checkAmbitLv());
        }
        else if (id == ActIconID.EQUIP)
            owner.drawRedIcon(ActIconID.EQUIP, Manager.model.getEquip().checkEquipUpgrade());
        else if (id == ActIconID.BAG)
            owner.drawRedIcon(ActIconID.BAG, Manager.model.getEquip().checkCanRonglian() || Manager.model.getBag().isTooLittle());
    };
    CheckRed.prototype.checkNeedChangeEquipTips = function () {
        var itemInfo = Manager.model.getItems().getCanUseBestEquip();
        if (itemInfo) {
            if (!Manager.tips.changeEquipTips.parent)
                Manager.tips.changeEquipTips.showByParent(Manager.layer.tipLayer);
            Manager.tips.changeEquipTips.setData(itemInfo);
        }
        else {
            if (Manager.tips.changeEquipTips.parent)
                Manager.tips.changeEquipTips.parent.removeChild(Manager.tips.changeEquipTips);
        }
    };
    CheckRed.prototype.__relicstuffActivity = function (event) {
        this._updateRein = true;
        this.dispatchRender();
    };
    CheckRed.prototype.__itemUpdate = function (e) {
        this._updateItem = true;
        this._checkClubRedIcon = true;
        this.dispatchRender();
    };
    CheckRed.prototype.__updateEquip = function (e) {
        if (e === void 0) { e = null; }
        this._checkEquipRedIcon = true;
        this.dispatchRender();
    };
    CheckRed.prototype.__skillUpdate = function (e) {
        this._checkSkillRedIcon = true;
        this.dispatchRender();
    };
    CheckRed.prototype.__roleUpdate = function (e) {
        this._checkRoleRedIcon = true;
        this.dispatchRender();
    };
    CheckRed.prototype.__updateClub = function (e) {
        this._checkClubRedIcon = true;
        this.dispatchRender();
    };
    CheckRed.prototype.check = function (internal) {
        if (this._checkClubRedIcon) {
            this._checkClubRedIcon = false;
            this.checkRedIcon(ActIconID.CLUB);
        }
        else if (this._updateItem) {
            this._updateItem = false;
            this._updateRein = false;
            this._checkRoleRedIcon = false;
            this._checkSkillRedIcon = false;
            this._checkEquipRedIcon = false;
            // Manager.model.getItems().getCanUseBestEquipList();
            this._owner.checkNeedOneKeyRonglian();
            this.checkNeedChangeEquipTips();
            this.checkRedIcon(ActIconID.BAG);
            this.checkRedIcon(ActIconID.REIN);
            this.checkRedIcon(ActIconID.ROLE);
            this.checkRedIcon(ActIconID.SKILL);
            this.checkRedIcon(ActIconID.EQUIP);
            Manager.render.remove(this.check, this);
        }
        else if (!this._updateItem) {
            if (this._updateRein) {
                this._updateRein = false;
                this.checkRedIcon(ActIconID.REIN);
            }
            else if (this._checkRoleRedIcon) {
                this._checkRoleRedIcon = false;
                this.checkRedIcon(ActIconID.ROLE);
            }
            else if (this._checkSkillRedIcon) {
                this._checkSkillRedIcon = false;
                this.checkRedIcon(ActIconID.SKILL);
            }
            else if (this._checkEquipRedIcon) {
                this._checkEquipRedIcon = false;
                this.checkRedIcon(ActIconID.EQUIP);
            }
            else
                Manager.render.remove(this.check, this);
        }
        else {
            Manager.render.remove(this.check, this);
        }
    };
    return CheckRed;
}());
__reflect(CheckRed.prototype, "CheckRed");
//# sourceMappingURL=CheckRed.js.map