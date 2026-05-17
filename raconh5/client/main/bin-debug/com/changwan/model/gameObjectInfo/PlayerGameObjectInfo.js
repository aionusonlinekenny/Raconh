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
 *人物视图信息类
 * Anydo
 * create
 * update devil 2017-11-08
*/
var PlayerGameObjectInfo = (function (_super) {
    __extends(PlayerGameObjectInfo, _super);
    function PlayerGameObjectInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._jumpHeigth = 0;
        return _this;
    }
    Object.defineProperty(PlayerGameObjectInfo.prototype, "jumpHeigth", {
        get: function () { return this._jumpHeigth; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerGameObjectInfo.prototype, "clothes", {
        get: function () {
            return this.attrInfo.clothes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerGameObjectInfo.prototype, "weapon", {
        get: function () {
            return this.attrInfo.weapon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerGameObjectInfo.prototype, "wing", {
        get: function () {
            return this.attrInfo.wing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerGameObjectInfo.prototype, "role", {
        get: function () {
            return this._role;
        },
        enumerable: true,
        configurable: true
    });
    PlayerGameObjectInfo.prototype.attrUpdateMoveSpeed = function () {
        if (this._view != null)
            this._view.eventSpeed();
    };
    PlayerGameObjectInfo.prototype.canHited = function (showMsg) {
        var self = Manager.model.self;
        if (self.attrInfo.pkMode == PKType.PEACE) {
            if (showMsg)
                FloatTips.addTips(LangCVO.getContent("battle10")); //您处于和平模式，不能进行PK！
            return false;
        }
        if (!this._aliveFlag) {
            if (showMsg)
                FloatTips.addTips(LangCVO.getContent("pk25")); //目标已死亡
            return false;
        }
        if (self.attrInfo.bfType == BFType.ARENA)
            return false; //个人竞技不能战斗
        if (Manager.model.getMap().isAbsolutrPoint(this.x, this.y)) {
            if (showMsg)
                FloatTips.addTips(LangCVO.getContent("battle15")); //对方处于安全区域，不能进行PK！
            return false;
        }
        if (Manager.model.getMap().isAbsolutrPoint(self.x, self.y)) {
            if (showMsg)
                FloatTips.addTips(LangCVO.getContent("battle16")); //您处于安全区域，不能进行PK！
            return false;
        }
        if (self.attrInfo.pkMode == PKType.ALL)
            return true;
        if (self.attrInfo.pkMode == PKType.CLUB) {
            if (self.attrInfo.guildName == this.attrInfo.guildName && self.attrInfo.guildName != "") {
                if (showMsg)
                    FloatTips.addTips(LangCVO.getContent("battle13")); //您和对方同在一个战盟，不能进行PK！
                return false;
            }
        }
        if (!Manager.model.getMap().isWalkPoint(this.x, this.y)) {
            if (showMsg)
                FloatTips.addTips(LangCVO.getContent("battle12"));
            return false;
        }
        if (!this.isType(GameObjectType.SELF) && self.isingState(BodyStateManger.ISING_BF)) {
            if (self.attrInfo.union > 0) {
                if (self.attrInfo.union == this.attrInfo.union) {
                    if (showMsg)
                        FloatTips.addTips(LangCVO.getContent("battle14")); //不可攻击相同阵营的成员！
                    return false;
                }
            }
        }
        return true;
    };
    PlayerGameObjectInfo.prototype.attrUpdatePkMode = function () {
        if (this._view != null)
            this._view.eventPkMode();
    };
    PlayerGameObjectInfo.prototype.attrUpdateVipLevel = function () {
        if (this._view != null)
            this._view.eventVipLevel();
        this.dispatchEvent(new GameObjectAttrEvent(GameObjectAttrEvent.VIP_LEVEL));
    };
    PlayerGameObjectInfo.prototype.attrUpdateTitle = function () {
        if (this._view != null)
            this._view.eventTitle();
    };
    PlayerGameObjectInfo.prototype.isTraining = function (value) {
        if (this._view != null) {
            this._view.eventTraining(value);
            this.isSetTraining = value;
        }
    };
    PlayerGameObjectInfo.prototype.attrUpdateGuild = function () {
        if (this._view != null)
            this._view.eventGuild();
    };
    PlayerGameObjectInfo.prototype.attrUpdatePet = function () {
        if (this.attrInfo.petAniID > 0) {
            var pet = this.getPet();
            if (!pet) {
                pet = Manager.pool.create(this.isType(GameObjectType.SELF) ? SelfPetGameObjectInfo : PetGameObjectInfo);
                pet.attrInfo.speed = 220;
                this.setPet(pet);
            }
            pet.attrUpdateAni();
        }
        else
            this.setPet(null);
    };
    PlayerGameObjectInfo.prototype.getAnimationType = function () {
        return AnimationType.PLAYER;
    };
    PlayerGameObjectInfo.prototype.getName = function () {
        return this.attrInfo.nickName;
    };
    PlayerGameObjectInfo.prototype.attrUpdateLevel = function (oldValue) {
        if (this._view != null)
            this._view.eventLevel(oldValue);
        this.dispatchEvent(new GameObjectAttrEvent(GameObjectAttrEvent.LEVEL));
    };
    PlayerGameObjectInfo.prototype.getType = function () {
        return GameObjectType.OTHER;
    };
    PlayerGameObjectInfo.prototype.start = function () {
        this.attackActionIndex = 0;
        _super.prototype.start.call(this);
    };
    PlayerGameObjectInfo.prototype.reuse = function (id, role) {
        this._role = role;
        _super.prototype.reuse.call(this, id);
    };
    PlayerGameObjectInfo.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        if (this._role != null) {
            Manager.pool.push(this._role);
            this._role = null;
        }
        this._pet = null;
    };
    PlayerGameObjectInfo.prototype.setAliveFlag = function (value) {
        if (!value) {
            this.resetHitedWhiteFilter();
            var self_1 = Manager.model.self;
            if (self_1.target == this)
                self_1.updateTarget(null);
            if (self_1.selfPet != null && self_1.selfPet.target == this)
                self_1.selfPet.updateTarget(null);
            this.updateIsingState(BodyStateManger.ISING_JUMP, false);
            this.updateIsingState(BodyStateManger.ISING_SPRINT, false);
            this.updateIsingState(BodyStateManger.ISING_SLIDE, false);
            this.updateIsingState(BodyStateManger.ISING_KITE, false);
            this.updateIsingState(BodyStateManger.ISING_WATER, false);
        }
        _super.prototype.setAliveFlag.call(this, value);
    };
    PlayerGameObjectInfo.prototype.setBattleFlag = function (value) {
        _super.prototype.setBattleFlag.call(this, value);
        var selfId = Manager.model.self.id;
        if (this._view && (this.id == selfId || this.attackID == selfId))
            this._view.eventStrip(value);
    };
    PlayerGameObjectInfo.prototype.updateStyle = function (clothes, weapon, wing) {
        var isChange = (this.attrInfo.clothes != clothes || this.attrInfo.weapon != weapon || this.attrInfo.wing != wing);
        if (isChange) {
            this.attrInfo.clothes = clothes;
            this.attrInfo.weapon = weapon;
            this.attrInfo.wing = wing;
            if (this._view != null && !this.hasBianID)
                this._view.eventStyle();
        }
    };
    PlayerGameObjectInfo.prototype.parse = function (data) {
        this.attrInfo.setValue(AttrDescType.NICKNAME, data.readUTF());
        this.attrInfo.setValue(AttrDescType.HP_MAX, data.readInt64());
        this.attrInfo.setValue(AttrDescType.HP, data.readInt64());
        this.attrInfo.setValue(AttrDescType.SPEED, data.readShort());
        this.updatePostion(data.readShort(), data.readShort());
        this.attrInfo.setValue(AttrDescType.UNION, data.readInt());
        this.attrInfo.setValue(AttrDescType.PK_MODE, data.readByte());
        this.attrInfo.setValue(AttrDescType.LEVEL, data.readShort());
        this.attrInfo.setValue(AttrDescType.FIGHT, data.readInt());
        this.attrInfo.setValue(AttrDescType.CAREER, data.readByte());
        this.attrInfo.setValue(AttrDescType.HEAD_ICON, data.readByte());
        this.attrInfo.setValue(AttrDescType.TURN_LIVE, data.readByte());
        this.attrInfo.setValue(AttrDescType.TITLE_ID, data.readShort());
        this.updateGuild(data.readInt64(), data.readByte(), data.readUTF(), data.readUTF());
        this.attrInfo.setValue(AttrDescType.VIP_LEVEL, data.readByte());
        this.attrInfo.setValue(AttrDescType.BF_TYPE, data.readInt());
        this.updateStyle(data.readShort(), data.readShort(), data.readShort());
        this.attrInfo.setValue(AttrDescType.PET_ANI, data.readShort());
        this.parseBuff(data);
        this.attrInfo.setValue(AttrDescType.TRAINING_TYPE, data.readByte());
        this.attrInfo.setValue(AttrDescType.TRAINING_POS, data.readShort());
        this.attrInfo.setValue(AttrDescType.TRAINING_STATUS, data.readByte());
    };
    PlayerGameObjectInfo.prototype.handleCurentPath = function (path, localX, localY) {
        if (this.isingState(BodyStateManger.ISING_JUMP))
            return path;
        return _super.prototype.handleCurentPath.call(this, path, localX, localY);
    };
    PlayerGameObjectInfo.prototype.parseBuff = function (data) {
        var buff;
        var buffGroupID;
        var buffLevel;
        var buffLen = data.readShort();
        for (var i = 0; i < buffLen; i++) {
            buffGroupID = data.readInt();
            buffLevel = data.readByte();
            buff = this.getBuffById(buffGroupID);
            if (buff == null) {
                buff = BuffCVO.getCVO(buffGroupID, buffLevel);
                this.addBuff(buff);
            }
        }
    };
    PlayerGameObjectInfo.prototype.updateGuild = function (guildId, guildJob, guildName, guildJobName) {
        if (this.attrInfo.guildID == guildId && this.attrInfo.guildJob == guildJob && this.attrInfo.guildName == guildName)
            return;
        this.attrInfo.guildID = guildId;
        this.attrInfo.guildJob = guildJob;
        this.attrInfo.guildName = guildName;
        this.attrInfo.guildJobName = guildJobName;
        if (this._view != null)
            this._view.eventGuild();
    };
    PlayerGameObjectInfo.prototype.getPet = function () {
        return this._pet;
    };
    PlayerGameObjectInfo.prototype.setPet = function (value) {
        if (this._pet != null && this._pet != value) {
            Manager.model.getGameobject().removeGameObject(this._pet);
        }
        if (this._pet == value)
            return;
        this._pet = value;
        if (this._pet != null) {
            this._pet.setActionStr(FigureAction.STAND);
            this._pet.owner = this;
            if (!this._pet.isInvented)
                Manager.model.getGameobject().addGameObject(this._pet);
        }
    };
    PlayerGameObjectInfo.prototype.attrUpdateBlood = function (oldValue) {
        _super.prototype.attrUpdateBlood.call(this, oldValue);
        if (!this._aliveFlag && this.attrInfo.hp > 0)
            this.setAliveFlag(true);
    };
    PlayerGameObjectInfo.prototype.playRandomAttack = function () {
        this.attackActionIndex++;
        if (this.attackActionIndex > 3)
            this.attackActionIndex = 1;
        this.setActionStr("attack" + this.attackActionIndex);
    };
    PlayerGameObjectInfo.prototype.getBombShootPos = function () {
        return new egret.Point(this.x, this.y - 70);
    };
    /**
     * @param flag 1脚底 2名称高度 3名称高度一半
     */
    PlayerGameObjectInfo.prototype.getBuffAniPos = function (flag) {
        if (flag == 1)
            return new egret.Point();
        else if (flag == 2)
            return new egret.Point(0, -190);
        return new egret.Point(0, -70);
    };
    PlayerGameObjectInfo.prototype.getSctPos = function () {
        return new egret.Point(this.x, this.y - 70);
    };
    PlayerGameObjectInfo.prototype.updateBuffState = function (value, isAdd) {
        var bol = _super.prototype.updateBuffState.call(this, value, isAdd);
        if (bol) {
            if (!this.can(CanType.CAN_WALK, false) || !this.can(CanType.CAN_JUMP, false) || !this.can(CanType.CAN_SPRINT, false)) {
                if (this._view != null)
                    this._view.stopWalk();
            }
        }
        return bol;
    };
    PlayerGameObjectInfo.prototype.dispatchJumpSyn = function (startPos, targets) {
        if (this._view != null)
            this._view.eventJumpSyn(startPos, targets);
        this.updateIsingState(BodyStateManger.ISING_JUMP, true);
    };
    PlayerGameObjectInfo.prototype.updateJumpHeight = function (h) {
        this._jumpHeigth = h;
        if (this._view != null)
            this._view.eventJumpHeight(h);
    };
    PlayerGameObjectInfo.prototype.finishJump = function () {
        this._jumpHeigth = 0;
        if (this._view != null)
            this._view.eventJumpHeight(0);
        this.updateIsingState(BodyStateManger.ISING_JUMP, false);
    };
    PlayerGameObjectInfo.prototype.can = function (canType, showMsg) {
        if (!Manager.model.getMap().mapDataLoadComplete) {
            return false;
        }
        if (this.isingCan(canType, BodyStateManger.ISING_FLY)) {
            if (showMsg)
                FloatTips.addTips(LangCVO.getContent("battle1"));
        }
        else if (this.isingCan(canType, BodyStateManger.ISING_JUMP)) {
            if (showMsg)
                FloatTips.addTips(LangCVO.getContent("battle2"));
        }
        else if (this.isingCan(canType, BodyStateManger.ISING_SPRINT)) {
            if (showMsg)
                FloatTips.addTips(LangCVO.getContent("battle3"));
        }
        else if (this.isingCan(canType, BodyStateManger.ISING_BF)) {
            if (showMsg)
                FloatTips.addTips(LangCVO.getContent("battle4"));
        }
        else if (this.isingCan(canType, BodyStateManger.ISING_SUB)) {
            if (showMsg)
                FloatTips.addTips(LangCVO.getContent("battle5"));
        }
        else if (this.buffCan(canType, BodyStateManger.ISING_SLIDE)) {
            if (showMsg)
                FloatTips.addTips(LangCVO.getContent("battle17"));
        }
        else if (this.buffCan(canType, BodyStateManger.ISING_KITE)) {
            if (showMsg)
                FloatTips.addTips(LangCVO.getContent("battle18"));
        }
        else if (this.buffCan(canType, BodyStateManger.ISING_WATER)) {
            if (showMsg)
                FloatTips.addTips(LangCVO.getContent("battle19"));
        }
        else if (this.buffCan(canType, BodyStateManger.BUFF_XUAN_YUN)) {
            if (showMsg)
                FloatTips.addTips(LangCVO.getContent("battle6"));
        }
        else if (this.buffCan(canType, BodyStateManger.BUFF_JIN_TIAO)) {
            if (showMsg)
                FloatTips.addTips(LangCVO.getContent("battle7"));
        }
        else if (this.buffCan(canType, BodyStateManger.BUFF_CHAO_FENG)) {
            if (showMsg)
                FloatTips.addTips(LangCVO.getContent("battle8"));
        }
        else if (this.buffCan(canType, BodyStateManger.BUFF_CHEN_MO)) {
            if (showMsg)
                FloatTips.addTips(LangCVO.getContent("battle9"));
        }
        else {
            return true;
        }
        return false;
    };
    PlayerGameObjectInfo.prototype.buffCan = function (canType, state) {
        return this.isBuffState(state) && (Manager.bodyState.buffCanDic[state] & canType) == canType;
    };
    PlayerGameObjectInfo.prototype.isingCan = function (canType, state) {
        return this.isingState(state) && (Manager.bodyState.isingCanDic[state] & canType) == canType;
    };
    PlayerGameObjectInfo.prototype.isBuffState = function (value) {
        return value == (this._buffState & value);
    };
    PlayerGameObjectInfo.prototype.isingState = function (value) {
        return value == (this._isingState & value);
    };
    PlayerGameObjectInfo.prototype.remove = function (onlyView, isImmediately) {
        if (isImmediately === void 0) { isImmediately = true; }
        if (!onlyView) {
            if (this._pet != null) {
                Manager.model.getGameobject().removeGameObject(this._pet);
                this._pet = null;
            }
        }
        _super.prototype.remove.call(this, onlyView, isImmediately);
    };
    PlayerGameObjectInfo.prototype.createGameObject = function () {
        if (this._view == null)
            this._view = Manager.pool.create(PlayerGameObject, this);
        return this._view;
    };
    PlayerGameObjectInfo.prototype.dispose = function () {
        if (this._role != null) {
            Manager.pool.push(this._role);
            this._role = null;
        }
        _super.prototype.dispose.call(this);
        this._pet = null;
    };
    return PlayerGameObjectInfo;
}(AliveGameObjectInfo));
__reflect(PlayerGameObjectInfo.prototype, "PlayerGameObjectInfo");
//# sourceMappingURL=PlayerGameObjectInfo.js.map