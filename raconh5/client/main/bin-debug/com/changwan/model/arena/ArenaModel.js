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
 *author Anydo
 *create 2017-12-27
 *description
*/
var ArenaModel = (function (_super) {
    __extends(ArenaModel, _super);
    function ArenaModel() {
        var _this = _super.call(this) || this;
        /**0竞技场，1斗地主，2盟主战 */
        _this.playType = 0;
        _this.closeOpenBfPanel = false;
        _this.myMaxRank = 9999;
        _this.maxGetedIDs = [];
        return _this;
    }
    ArenaModel.prototype.updatePKCount = function (pi) {
        this.countLeft = pi.readByte();
        this.countCDTime = pi.readInt();
        this.countHasBuy = pi.readByte();
        this.dispatchEvent(new ArenaEvent(ArenaEvent.UPDATE_PK_COUNT));
    };
    ArenaModel.prototype.updateMaxRankAward = function (pi) {
        this.myMaxRank = pi.readShort();
        this.maxGetedIDs = [];
        var count = pi.readShort();
        for (var i = 0; i < count; i++) {
            this.maxGetedIDs.push(pi.readByte());
        }
        this.dispatchEvent(new ArenaEvent(ArenaEvent.UPDATE_MAX_RANK_AWARD));
    };
    ArenaModel.prototype.updatePKLog = function (pi) {
        var logs = [];
        var count = pi.readShort();
        for (var i = 0; i < count; i++) {
            var log = new ArenaLogInfo();
            log.isAttack = (pi.readByte() == 1);
            log.isWin = (pi.readByte() == 1);
            log.logTime = pi.readInt();
            log.enemyName = pi.readUTF();
            log.rankOld = pi.readShort();
            log.rankNew = pi.readShort();
            log.honour = pi.readShort();
            logs.push(log);
        }
        this.dispatchEvent(new ArenaEvent(ArenaEvent.UPDATE_PK_LOG, logs));
    };
    ArenaModel.prototype.updateRank = function (pi) {
        this.myRank = pi.readShort();
        var ranks = [];
        var count = pi.readShort();
        for (var i = 0; i < count; i++) {
            var one = new ArenaRankInfo();
            one.playerName = pi.readUTF();
            one.career = pi.readByte();
            one.headID = pi.readShort();
            one.rank = pi.readShort();
            one.power = pi.readInt();
            ranks.push(one);
        }
        this.dispatchEvent(new ArenaEvent(ArenaEvent.UPDATE_RANK, ranks));
    };
    ArenaModel.prototype.updatePKData = function (pi, isPlayer) {
        //模拟自己
        if (this.selfInfo)
            Manager.pool.push(this.selfInfo);
        var self = Manager.model.self;
        var selfRole = Manager.pool.create(RoleInfo);
        selfRole.id = self.role.id + 100; //+100避免跟真正的角色ID重叠
        this.selfInfo = Manager.pool.create(PlayerGameObjectInfo, selfRole.id, selfRole);
        this.selfInfo.attrInfo.setValue(AttrDescType.NICKNAME, self.attrInfo.nickName);
        this.selfInfo.attrInfo.setValue(AttrDescType.CAREER, self.attrInfo.career);
        this.selfInfo.attrInfo.setValue(AttrDescType.LEVEL, self.attrInfo.level);
        this.selfInfo.attrInfo.setValue(AttrDescType.HEAD_ICON, self.attrInfo.headIcon);
        this.selfInfo.attrInfo.setValue(AttrDescType.FIGHT, self.attrInfo.fight);
        this.selfInfo.attrInfo.setValue(AttrDescType.HP_MAX, self.attrInfo.hpMax);
        this.selfInfo.attrInfo.setValue(AttrDescType.HP, self.attrInfo.hpMax);
        this.selfInfo.updateStyle(self.attrInfo.clothes, self.attrInfo.weapon, self.attrInfo.wing);
        this.selfInfo.attrInfo.setValue(AttrDescType.SPEED, self.attrInfo.speed);
        this.selfInfo.setDirection(Direction.RIGHT);
        this.selfInfo.attrInfo.setValue(AttrDescType.PET_ANI, self.attrInfo.petAniID);
        if (this.selfInfo.attrInfo.petAniID > 0) {
            var selfPet = Manager.pool.create(PetGameObjectInfo, 3333);
            selfPet.isInvented = true;
            selfPet.attrInfo.setValue(AttrDescType.SPEED, self.attrInfo.speed);
            selfPet.setDirection(Direction.RIGHT);
            this.selfInfo.setPet(selfPet);
        }
        //模拟敌人
        if (isPlayer) {
            if (this.enemyInfo)
                Manager.pool.push(this.enemyInfo);
            var enemyRole = Manager.pool.create(RoleInfo);
            enemyRole.id = pi.readInt64();
            this.enemyInfo = Manager.pool.create(PlayerGameObjectInfo, enemyRole.id, enemyRole);
            this.enemyInfo.attrInfo.setValue(AttrDescType.NICKNAME, pi.readUTF());
            this.enemyInfo.attrInfo.setValue(AttrDescType.CAREER, pi.readByte());
            this.enemyInfo.attrInfo.setValue(AttrDescType.LEVEL, pi.readShort());
            this.enemyInfo.attrInfo.setValue(AttrDescType.HEAD_ICON, pi.readShort());
            this.enemyInfo.attrInfo.setValue(AttrDescType.FIGHT, pi.readInt());
            this.enemyInfo.attrInfo.setValue(AttrDescType.HP_MAX, pi.readInt64());
            this.enemyInfo.attrInfo.setValue(AttrDescType.HP, this.enemyInfo.attrInfo.hpMax);
            this.enemyInfo.updateStyle(pi.readShort(), pi.readShort(), pi.readShort());
            this.enemyInfo.attrInfo.setValue(AttrDescType.SPEED, self.attrInfo.speed);
            this.enemyInfo.setDirection(Direction.LEFT);
            this.enemyInfo.attrInfo.setValue(AttrDescType.PET_ANI, pi.readShort());
            if (this.enemyInfo.attrInfo.petAniID > 0) {
                var enemyPet = Manager.pool.create(PetGameObjectInfo, 4444);
                enemyPet.isInvented = true;
                enemyPet.attrInfo.setValue(AttrDescType.SPEED, self.attrInfo.speed);
                enemyPet.setDirection(Direction.LEFT);
                this.enemyInfo.setPet(enemyPet);
            }
        }
        else {
            var robotRank = pi.readShort();
            var robotName = pi.readUTF();
            var robotCvo = ArenaRobotCVO.getCVOByRank(robotRank);
            robotName = cw.StringUtil.isEmptyStr(robotName) ? robotCvo.nickname : robotName;
            if (this.enemyInfo)
                Manager.pool.push(this.enemyInfo);
            var enemyRole = Manager.pool.create(RoleInfo);
            enemyRole.id = robotRank;
            this.enemyInfo = Manager.pool.create(PlayerGameObjectInfo, robotRank, enemyRole);
            this.enemyInfo.attrInfo.setValue(AttrDescType.NICKNAME, robotName);
            this.enemyInfo.attrInfo.setValue(AttrDescType.CAREER, robotCvo.career);
            this.enemyInfo.attrInfo.setValue(AttrDescType.LEVEL, robotCvo.level);
            this.enemyInfo.attrInfo.setValue(AttrDescType.HEAD_ICON, robotCvo.headID);
            this.enemyInfo.attrInfo.setValue(AttrDescType.FIGHT, robotCvo.power);
            this.enemyInfo.attrInfo.setValue(AttrDescType.HP_MAX, robotCvo.hp);
            // this.enemyInfo.attrInfo.setValue(AttrDescType.FIGHT, self.attrInfo.fight);
            // this.enemyInfo.attrInfo.setValue(AttrDescType.HP_MAX, self.attrInfo.hpMax);
            this.enemyInfo.attrInfo.setValue(AttrDescType.HP, this.enemyInfo.attrInfo.hpMax);
            this.enemyInfo.updateStyle(robotCvo.clothes, robotCvo.weapon, robotCvo.wing);
            this.enemyInfo.attrInfo.setValue(AttrDescType.SPEED, self.attrInfo.speed);
            this.enemyInfo.setDirection(Direction.LEFT);
            this.enemyInfo.attrInfo.setValue(AttrDescType.PET_ANI, robotCvo.petAni);
            if (this.enemyInfo.attrInfo.petAniID > 0) {
                var enemyPet = Manager.pool.create(PetGameObjectInfo, 4444);
                enemyPet.isInvented = true;
                enemyPet.attrInfo.setValue(AttrDescType.SPEED, self.attrInfo.speed);
                enemyPet.setDirection(Direction.LEFT);
                this.enemyInfo.setPet(enemyPet);
            }
        }
        this.selfInfo.updatePostion(this.getSelfBorthPos().x, this.getSelfBorthPos().y);
        this.enemyInfo.updatePostion(this.getEnemyBorthPos().x, this.getEnemyBorthPos().y);
        if (this.selfInfo.getPet())
            this.selfInfo.getPet().updatePostion(this.getSelfPetBorthPos().x, this.getSelfPetBorthPos().y);
        if (this.enemyInfo.getPet())
            this.enemyInfo.getPet().updatePostion(this.getEnemyPetBorthPos().x + 100, this.getEnemyPetBorthPos().y);
        //战斗结果
        this.resultObj = {};
        this.resultObj.isWin = (pi.readByte() == 1);
        if (this.playType == 1)
            Manager.model.getLaird().updatePlayResult(this.resultObj.isWin);
        this.resultObj.enemyName = this.enemyInfo.attrInfo.nickName;
        if (this.playType == 0 || this.playType == 1) {
            this.resultObj.rankOld = pi.readShort();
            this.resultObj.rankNew = pi.readShort();
            this.resultObj.rankMax = pi.readShort();
            this.resultObj.exp = pi.readInt();
            this.resultObj.honour = pi.readInt();
        }
        else if (this.playType == 2) {
            this.resultObj.winCount = pi.readShort();
            this.resultObj.rank = pi.readShort();
            this.resultObj.donate = pi.readInt();
            this.resultObj.honour = pi.readInt();
        }
        Manager.view.show(59 /* ArenaPKHeadView */, Manager.model.getArena().selfInfo, Manager.model.getArena().enemyInfo);
        Manager.view.show(60 /* ArenaJumpBtnView */);
        this.readyByMapLoaded();
    };
    Object.defineProperty(ArenaModel.prototype, "hasMaxAwardCanGet", {
        get: function () {
            if (!OpenCVO.isOpen(OpenConst.ID_ARENA_PK))
                return false;
            var maxCVOs = ArenaMaxRankCVO.cvos;
            var arr = [];
            for (var i = 0; i < maxCVOs.length; i++) {
                if (this.myMaxRank <= maxCVOs[i].rankTarget)
                    arr.push(maxCVOs[i]);
            }
            for (var j = 0; j < arr.length; j++) {
                if (Manager.model.getArena().maxGetedIDs.indexOf(arr[j].id) == -1)
                    return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArenaModel.prototype, "hasPkCount", {
        get: function () {
            return this.countLeft > 0;
        },
        enumerable: true,
        configurable: true
    });
    ArenaModel.prototype.PKHandler = function (enemyRank, enemyPower, enemyName) {
        if (enemyName === void 0) { enemyName = ""; }
        if (this.countLeft <= 0) {
            if (this.countHasBuy < 0)
                this.buyPKCountHandler();
            else
                FloatTips.addTips(LangCVO.getContent("arena4"));
            return;
        }
        var self = Manager.model.self;
        if (self.attrInfo.isTraining) {
            FloatTips.addTips(LangCVO.getContent("training7"), Color.RED);
            return;
        }
        if (self.attrInfo.nickName == enemyName) {
            FloatTips.addTips(LangCVO.getContent("arena5"));
            return;
        }
        if (!self.canJoinActive(true))
            return;
        if (enemyPower > self.attrInfo.fight) {
            var info = Manager.pool.create(CallBackInfo, Manager.control.getArena().cmdPKSend, Manager.control.getArena(), enemyRank);
            Manager.tips.showTips(LangCVO.getContent("arena6"), info, true);
        }
        else
            Manager.control.getArena().cmdPKSend(enemyRank);
    };
    ArenaModel.prototype.renewRankHandler = function (checkTime) {
        if (checkTime) {
            var now = egret.getTimer();
            if (now - this.preRenewTime < 5000) {
                FloatTips.addTips(LangCVO.getContent("arena9", Math.floor((5000 - (now - this.preRenewTime)) / 1000)));
                return;
            }
            this.preRenewTime = now;
        }
        Manager.socket.sendOnlyProtocol(Protocol.ARENA_RANK_UPDATE);
    };
    ArenaModel.prototype.buyPKCountHandler = function () {
        var fullCount = Number(ArenaOtherCVO.getCVO("daily_count").value);
        if (Manager.model.getArena().countLeft >= fullCount) {
            FloatTips.addTips(LangCVO.getContent("arena24"));
            return;
        }
        var gain = new GainLossVO(ArenaOtherCVO.getCVO("price").value);
        if (Manager.model.self.attrInfo.gold < gain.num) {
            FloatTips.addTips(LangCVO.getContent("common33"));
            return;
        }
        var vipLevel = Manager.model.self.attrInfo.vipLevel;
        if (this.countHasBuy >= ArenaVipCountCVO.getCanBuyCount(vipLevel)) {
            FloatTips.addTips(LangCVO.getContent("arena25"));
            return;
        }
        var ok = Manager.pool.create(CallBackInfo, Manager.control.getArena().cmdPKCount, Manager.control.getArena(), 1);
        Manager.tips.showTips(LangCVO.getContent("arena7", gain.num), ok, true);
    };
    ArenaModel.prototype.readyByMapLoaded = function () {
        if (Manager.model.getMap().mapDataLoadComplete && (Manager.model.getMap().getId() == Number(ArenaOtherCVO.getCVO("map_id").value))) {
            this.startCountDown();
        }
        else {
            this.readWhenMapLoaded = true;
        }
    };
    ArenaModel.prototype.checkByMapLoaded = function () {
        if (this.readWhenMapLoaded && (Manager.model.getMap().getId() == Number(ArenaOtherCVO.getCVO("map_id").value))) {
            this.readWhenMapLoaded = false;
            this.startCountDown();
        }
    };
    ArenaModel.prototype.startCountDown = function () {
        this.showOrHideSelf(false);
        Manager.model.getGameobject().addGameObject(this.selfInfo);
        Manager.model.getGameobject().addGameObject(this.enemyInfo);
        if (this.selfInfo.getPet())
            Manager.model.getGameobject().addGameObject(this.selfInfo.getPet());
        if (this.enemyInfo.getPet())
            Manager.model.getGameobject().addGameObject(this.enemyInfo.getPet());
        Manager.view.show(67 /* CountDownTool */, 3, "countDownLabel_png", this.startPK, this);
    };
    ArenaModel.prototype.startPK = function () {
        this.isPlaying = true;
        ArenaBattleUtil.readyData();
        ArenaBattleUtil.startJumpToCenter();
    };
    ArenaModel.prototype.clearPKData = function () {
        this.isPlaying = false;
        this.resultObj = null;
        this.selfInfo = this.enemyInfo = null;
        ArenaBattleUtil.clearData();
    };
    ArenaModel.prototype.exitArenaHandler = function () {
        Manager.view.hide(59 /* ArenaPKHeadView */);
        Manager.view.hide(60 /* ArenaJumpBtnView */);
        // Manager.layer.panelDarkLayer.visible = true;
        // Manager.layer.uiLayer.visible = true;
        // Manager.layer.effectLayer.visible = true;
        if (Manager.layer.panelDarkLayer.parent == null)
            Manager.global.gameMain.addChildAt(Manager.layer.panelDarkLayer, 15 /* panelDarkLayer */);
        if (Manager.layer.uiLayer.parent == null)
            Manager.global.gameMain.addChildAt(Manager.layer.uiLayer, 16 /* uiLayer */);
        if (Manager.layer.effectLayer.parent == null)
            Manager.global.gameMain.addChildAt(Manager.layer.effectLayer, 17 /* effectLayer */);
        this.clearPKData();
        this.showOrHideSelf(true);
    };
    ArenaModel.prototype.showResultToolView = function () {
        this.isPlaying = false;
        ArenaBattleUtil.clearTempTimes();
        if (this.resultObj.isWin) {
            this.selfInfo.setActionStr(FigureAction.STAND);
            this.enemyInfo.setActionStr(FigureAction.DEAD);
            this.enemyInfo.attrInfo.setValue(AttrDescType.HP, 0);
        }
        else {
            this.selfInfo.setActionStr(FigureAction.DEAD);
            this.enemyInfo.setActionStr(FigureAction.STAND);
            this.selfInfo.attrInfo.setValue(AttrDescType.HP, 0);
        }
        if (this.playType == 0)
            Manager.view.show(55 /* ArenaResultView */);
        else if (this.playType == 1) {
            if (this.resultObj.isWin)
                Manager.view.show(89 /* LandlordResultWin */);
            else
                Manager.view.show(92 /* LandlordResultFail */);
        }
        else if (this.playType == 2) {
            Manager.view.show(107 /* ClubLeaderWarResultView */);
        }
        this.dispatchEvent(new ArenaEvent(ArenaEvent.HIDE_JUMP_BTN));
    };
    ArenaModel.prototype.showOrHideSelf = function (show) {
        var self = Manager.model.self;
        // let selfView:SelfGameObject = Manager.control.getMap().getGameObject(self) as SelfGameObject;
        var selfView = self.view;
        if (selfView)
            selfView.visible = show;
        if (self.getPet()) {
            // let selfPetView:SelfPetGameObject = Manager.control.getMap().getGameObject(self.getPet()) as SelfPetGameObject;
            var selfPetView = self.getPet().view;
            if (selfPetView)
                selfPetView.visible = show;
        }
    };
    ArenaModel.prototype.getSelfBorthPos = function () { return PointUtil.getPoint2(ArenaOtherCVO.getCVO("self_borth").value); };
    ArenaModel.prototype.getSelfTargetPos = function () { return PointUtil.getPoint2(ArenaOtherCVO.getCVO("self_target").value); };
    ArenaModel.prototype.getEnemyBorthPos = function () { return PointUtil.getPoint2(ArenaOtherCVO.getCVO("enemy_borth").value); };
    ArenaModel.prototype.getEnemyTargetPos = function () { return PointUtil.getPoint2(ArenaOtherCVO.getCVO("enemy_target").value); };
    ArenaModel.prototype.getSelfPetBorthPos = function () { return PointUtil.getPoint2(ArenaOtherCVO.getCVO("selfpet_borth").value); };
    ArenaModel.prototype.getSelfPetTargetPos = function () { return PointUtil.getPoint2(ArenaOtherCVO.getCVO("selfpet_target").value); };
    ArenaModel.prototype.getEnemyPetBorthPos = function () { return PointUtil.getPoint2(ArenaOtherCVO.getCVO("enemypet_borth").value); };
    ArenaModel.prototype.getEnemyPetTargetPos = function () { return PointUtil.getPoint2(ArenaOtherCVO.getCVO("enemypet_target").value); };
    return ArenaModel;
}(egret.EventDispatcher));
__reflect(ArenaModel.prototype, "ArenaModel");
//# sourceMappingURL=ArenaModel.js.map