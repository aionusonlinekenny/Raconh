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
 * 魔神降临model
 * liangyan
 * create 2018-04-10
*/
var DevilModel = (function (_super) {
    __extends(DevilModel, _super);
    function DevilModel() {
        var _this = _super.call(this) || this;
        _this._grabInfos = [];
        return _this;
    }
    Object.defineProperty(DevilModel.prototype, "lastKingInfo", {
        /**上期霸主信息 */
        get: function () {
            return this._lastKingInfo;
        },
        set: function (value) {
            if (this._lastKingInfo == value)
                return;
            this._lastKingInfo = value;
            this.dispatchEvent(new DevilEvent(DevilEvent.DEVIL_LAST_KING_UPDATE));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevilModel.prototype, "grabInfos", {
        /**抢夺列表信息 */
        get: function () {
            return this._grabInfos;
        },
        set: function (value) {
            if (this._grabInfos == value)
                return;
            this._grabInfos = value;
            this.dispatchEvent(new DevilEvent(DevilEvent.DEVIL_GRAB_LIST_UPDATE));
        },
        enumerable: true,
        configurable: true
    });
    DevilModel.prototype.updatePKData = function (pi) {
        this._result = pi.readByte() == 1;
        this._score = pi.readInt();
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
        this.selfInfo.attrInfo.setValue(AttrDescType.HP, pi.readInt64());
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
        this.enemyInfo.attrInfo.setValue(AttrDescType.HP, pi.readInt64());
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
        this.selfInfo.updatePostion(self.x, self.y);
        this.enemyInfo.updatePostion(this.getEnemyBirthPos().x, this.getEnemyBirthPos().y);
        if (this.selfInfo.getPet())
            this.selfInfo.getPet().updatePostion(self.getPet().x, self.getPet().y);
        if (this.enemyInfo.getPet())
            this.enemyInfo.getPet().updatePostion(this.enemyInfo.x + 50, this.enemyInfo.y + 50);
        Manager.view.show(59 /* ArenaPKHeadView */, Manager.model.getDevil().selfInfo, Manager.model.getDevil().enemyInfo);
        this.readyByMapLoaded();
    };
    DevilModel.prototype.readyByMapLoaded = function () {
        if (Manager.model.getMap().mapDataLoadComplete
            && (Manager.model.getMap().getId() == Number(DevilConfigCVO.getCVO(DevilConfigCVO.ID_GRAB_MAP).value))) {
            this.addPlayers();
        }
        else
            this.readWhenMapLoaded = true;
    };
    DevilModel.prototype.checkByMapLoaded = function () {
        if (this.readWhenMapLoaded && (Manager.model.getMap().getId() == Number(DevilConfigCVO.getCVO(DevilConfigCVO.ID_GRAB_MAP).value))) {
            this.readWhenMapLoaded = false;
            this.addPlayers();
        }
    };
    DevilModel.prototype.addPlayers = function () {
        this.showOrHideSelf(false);
        Manager.model.getGameobject().addGameObject(this.selfInfo);
        Manager.model.getGameobject().addGameObject(this.enemyInfo);
        if (this.selfInfo.getPet())
            Manager.model.getGameobject().addGameObject(this.selfInfo.getPet());
        if (this.enemyInfo.getPet())
            Manager.model.getGameobject().addGameObject(this.enemyInfo.getPet());
        Manager.render.add(this.startPK, this, 1500, 1, null, true);
    };
    DevilModel.prototype.startPK = function () {
        this.isGrabing = true;
        DevilBattleUtil.readyData();
        DevilBattleUtil.startWalkToCenter();
    };
    DevilModel.prototype.clearPKData = function () {
        this.isGrabing = false;
        this.selfInfo = this.enemyInfo = null;
        DevilBattleUtil.clearData();
    };
    DevilModel.prototype.exitGrabHandler = function () {
        Manager.view.show(155 /* DevilGrabEff */);
        Manager.view.hide(59 /* ArenaPKHeadView */);
        if (Manager.layer.panelDarkLayer.parent == null)
            Manager.global.gameMain.addChildAt(Manager.layer.panelDarkLayer, 15 /* panelDarkLayer */);
        if (Manager.layer.uiLayer.parent == null)
            Manager.global.gameMain.addChildAt(Manager.layer.uiLayer, 16 /* uiLayer */);
        if (Manager.layer.effectLayer.parent == null)
            Manager.global.gameMain.addChildAt(Manager.layer.effectLayer, 17 /* effectLayer */);
        this.clearPKData();
        this.showOrHideSelf(true);
    };
    DevilModel.prototype.showResultView = function () {
        this.isGrabing = false;
        if (this._result) {
            this.selfInfo.setActionStr(FigureAction.STAND);
            this.enemyInfo.setActionStr(FigureAction.DEAD);
            this.enemyInfo.attrInfo.setValue(AttrDescType.HP, 0);
        }
        else {
            this.selfInfo.setActionStr(FigureAction.DEAD);
            this.enemyInfo.setActionStr(FigureAction.STAND);
            this.selfInfo.attrInfo.setValue(AttrDescType.HP, 0);
        }
        //您成功战胜了<font color='{0}'>{1}</font>，抢夺了<font color='{2}'>{3}</font>积分
        //您被<font color='{0}'>{1}</font>击败，获得了安慰奖励<font color='{2}'>{3}</font>积分
        var str = LangCVO.getContent(this._result ? "devil15" : "devil16", Color.GREEN_STR_2, this.enemyInfo.getName(), Color.GREEN_STR_2, this._score);
        FloatTips.addTips(str, this._result ? Color.YELLOR : Color.RED);
        Manager.render.add(this.sendExitGrab, this, 1500, 1, null, true);
    };
    DevilModel.prototype.sendExitGrab = function () {
        Manager.control.getDevil().exitGrab();
    };
    DevilModel.prototype.showOrHideSelf = function (show) {
        var self = Manager.model.self;
        var selfView = self.view;
        if (selfView)
            selfView.visible = show;
        if (self.getPet()) {
            var selfPetView = self.getPet().view;
            if (selfPetView)
                selfPetView.visible = show;
        }
    };
    DevilModel.prototype.getSelfTargetPos = function () {
        if (this.selfInfo == null)
            return null;
        else
            return new egret.Point(this.selfInfo.x, this.selfInfo.y);
    };
    DevilModel.prototype.getSeflPetTargetPos = function () { return PointUtil.getPoint2(DevilConfigCVO.getCVO(DevilConfigCVO.ID_SELF_PET_TARGET_POS).value); };
    DevilModel.prototype.getEnemyBirthPos = function () { return PointUtil.getPoint2(DevilConfigCVO.getCVO(DevilConfigCVO.ID_ENEMY_BIRTH_POS).value); };
    DevilModel.prototype.getEnemyTargetPos = function () {
        if (this.selfInfo == null)
            return null;
        else
            return new egret.Point(this.selfInfo.x - 100, this.selfInfo.y + 50);
    };
    DevilModel.prototype.getEnemyPetBirthPos = function () { return PointUtil.getPoint2(DevilConfigCVO.getCVO(DevilConfigCVO.ID_ENEMY_PET_BIRTH_POS).value); };
    DevilModel.prototype.getEnemyPetTargetPos = function () {
        if (this.selfInfo == null)
            return null;
        else
            return new egret.Point(this.selfInfo.getPet().x - 100, this.selfInfo.getPet().y + 50);
    };
    return DevilModel;
}(egret.EventDispatcher));
__reflect(DevilModel.prototype, "DevilModel");
//# sourceMappingURL=DevilModel.js.map