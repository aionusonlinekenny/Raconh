var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 角色对象模型
 * @uddate devil 2017-11-16
 */
var GameObjectModel = (function () {
    function GameObjectModel() {
        this.showCount = 30; //其它玩家最多显示数量
        this._isAddTrainingEffect = false; //标记是否需要添加传功场景特效
        this._objects = {};
        var types = GameObjectType.types;
        var len = types.length;
        var i = 0;
        while (i < len) {
            this._objects[types[i]] = [];
            i++;
        }
        this._queues = [];
        this._needShowInfos = [];
    }
    /**
     * 填加游戏对象 ，如果是自己则及时填加
     */
    GameObjectModel.prototype.addGameObject = function (info) {
        var type = info.getType();
        if (type == GameObjectType.OTHER && this._objects[type].length >= this.showCount) {
            this._needShowInfos.push(info);
            return;
        }
        if (this._objects[type].indexOf(info) == -1)
            this._objects[type].push(info);
        if (type == GameObjectType.DROP) {
            Manager.control.getMap().addGameObject(info.createGameObject());
            return;
        }
        if (this._queues.indexOf(info) == -1) {
            if (type == GameObjectType.SELF)
                this._queues.unshift(info);
            else
                this._queues.push(info);
        }
        if (this._queues.length > 0 && !Manager.render.contains(this.render, this)) {
            Manager.render.add(this.render, this, 100);
        }
    };
    GameObjectModel.prototype.render = function () {
        if (this._queues.length > 0) {
            var info = this._queues.shift();
            if (info.getType() == GameObjectType.NPC && !Manager.model.self.isIn9Scale(info, 3)) { }
            else if (info.getType() == GameObjectType.JUMP_POINT) { }
            else if (info.getType() == GameObjectType.SCENE_EFF && !Manager.model.self.isIn9Scale(info, 5)) { }
            else if (info.getType() == GameObjectType.SCENE_ROBOT && !Manager.model.self.isIn9Scale(info, 2)) { }
            else {
                Manager.control.getMap().addGameObject(info.createGameObject());
            }
        }
        if (this._queues.length <= 0)
            Manager.render.remove(this.render, this);
    };
    GameObjectModel.prototype.getMonsterGameObject = function (id) {
        var types = GameObjectType.monsterTypes;
        var len = types.length;
        var monster;
        for (var i = 0; i < len; i++) {
            monster = this.getGameObject(id, types[i]);
            if (monster != null)
                return monster;
        }
        return null;
    };
    GameObjectModel.prototype.test = function () {
        var infos = this._objects[GameObjectType.OTHER];
        return infos.length > 0 ? infos[0] : null;
    };
    GameObjectModel.prototype.getSceneEffByType = function (sceneEffType) {
        var infos = this._objects[GameObjectType.SCENE_EFF];
        for (var i = 0; i < infos.length; i++) {
            if (infos[i].cvo.type == sceneEffType)
                return infos[i];
        }
        return null;
    };
    GameObjectModel.prototype.getSceneEffByCvoId = function (sceneEffID) {
        var infos = this._objects[GameObjectType.SCENE_EFF];
        for (var i = 0; i < infos.length; i++) {
            if (infos[i].cvo.id == sceneEffID)
                return infos[i];
        }
        return null;
    };
    /**
     * 从场景中删除对象
     * isImmediately	是否立即删除。如果为false,则会延时删除，用于处理怪物死亡的效果
     * delayTime    isImmediately为false时，延迟delayTime(毫秒)再移除gameobject
     */
    GameObjectModel.prototype.removeGameObject = function (info, isImmediately, delayTime) {
        if (isImmediately === void 0) { isImmediately = true; }
        if (delayTime === void 0) { delayTime = 2000; }
        if (info == null)
            return;
        var index = this._objects[info.getType()].indexOf(info);
        if (index != -1) {
            var type = info.getType();
            this._objects[type].splice(index, 1);
            var self_1 = Manager.model.self;
            if (self_1.target == info)
                self_1.updateTarget(null);
            if (self_1.selfPet != null && self_1.selfPet.target == info)
                self_1.selfPet.updateTarget(null);
            info.remove(false, isImmediately, delayTime);
            if (type == GameObjectType.OTHER && this._needShowInfos.length > 0)
                this.addGameObject(this._needShowInfos.shift()); //删除其它玩家时，如果还有没显示的其它玩家，则添加
        }
        index = this._queues.indexOf(info);
        if (index != -1)
            this._queues.splice(index, 1);
    };
    /**
     * 获取指定ID与角色类型的角色信息
     * @param id
     * @param gameObjectType	GameObjectType常量 ,如果为-1，则会遍历所有类型与对应的ID信息类
     */
    GameObjectModel.prototype.getGameObject = function (id, gameObjectType) {
        if (gameObjectType === void 0) { gameObjectType = -1; }
        var info;
        if (gameObjectType == -1) {
            var types = GameObjectType.types;
            var len = types.length;
            for (var i = 0; i < len; i++) {
                info = this.getGameObject(id, types[i]);
                if (info != null)
                    return info;
            }
        }
        else {
            var infos = this._objects[gameObjectType];
            var len = infos.length;
            for (var i = 0; i < len; i++) {
                if (infos[i].id == id)
                    return infos[i];
            }
            //如果是其它玩家，还要查找未显示列表
            if (gameObjectType == GameObjectType.OTHER && (len = this._needShowInfos.length) > 0) {
                for (var i = 0; i < len; i++) {
                    if (this._needShowInfos[i].id == id)
                        return this._needShowInfos[i];
                }
            }
        }
        return null;
    };
    /**
     * 删除游戏中除了自己角色外的所有角色
     */
    GameObjectModel.prototype.removeGameObjects = function () {
        this._needShowInfos = []; //没显示的其它玩家列表，先清除，防边删边加
        var types = GameObjectType.types;
        var len = types.length;
        var objects;
        for (var i = 0; i < len; i++) {
            objects = this._objects[types[i]];
            var j = objects.length - 1;
            while (j >= 0) {
                if (types[i] == GameObjectType.SELF) { }
                else if (types[i] == GameObjectType.SELF_PET) {
                    objects[j].stopWalk();
                }
                else
                    this.removeGameObject(objects[j]);
                j--;
            }
        }
    };
    GameObjectModel.prototype.removeGameObjectByType = function (type) {
        var objects = this._objects[type];
        var i = objects.length - 1;
        while (i >= 0) {
            this.removeGameObject(objects[i]);
            i--;
        }
    };
    /**
     * 获取指定ID的玩家信息
     */
    GameObjectModel.prototype.getPlayerGameObject = function (id) {
        if (id == Manager.model.self.id)
            return Manager.model.self;
        return this.getGameObject(id, GameObjectType.OTHER);
    };
    GameObjectModel.prototype.createElement = function () {
        this.createSelf();
        this.createNPCs();
        this.createJumpPoints();
        this.createSceneEff();
        this.createSceneRobot();
    };
    GameObjectModel.prototype.createSelf = function () {
        if (this._hasInitSelf)
            return;
        var self = Manager.model.self;
        this.addGameObject(self);
        this._hasInitSelf = true;
        if (self.attrInfo.petAniID > 0) {
            var pet = Manager.pool.create(SelfPetGameObjectInfo);
            pet.attrInfo.speed = 220;
            pet.owner = self;
            pet.attrUpdateAni();
            self.setPet(pet);
        }
    };
    GameObjectModel.prototype.createNPCs = function () {
        var npcs = NpcCVO.getCVOsAtMap(Manager.model.getMap().getId());
        var info;
        var len = npcs.length;
        for (var i = 0; i < len; i++) {
            info = Manager.pool.create(NPCGameObjectInfo, npcs[i].id, npcs[i]);
            info.updatePostion(npcs[i].position.x, npcs[i].position.y);
            this.addGameObject(info);
        }
    };
    GameObjectModel.prototype.createJumpPoints = function () {
        var jumps = JumpPointCVO.getCVOsByMapID(Manager.model.getMap().mapCVO.res);
        if (jumps == null || jumps == undefined)
            return;
        var info;
        for (var i = 0; i < jumps.length; i++) {
            info = Manager.pool.create(JumpPointGameObjectInfo, jumps[i].id, jumps[i]);
            info.updatePostion(jumps[i].posX, jumps[i].posY);
            Manager.model.getGameobject().addGameObject(info);
        }
    };
    GameObjectModel.prototype.createSceneEff = function () {
        var effect = SceneEffCVO.getCVOsByMapID(Manager.model.getMap().mapCVO.res);
        if (effect == null || effect == undefined || (effect.length == 0))
            return;
        var info;
        for (var i = 0; i < effect.length; i++) {
            if (effect[i].isTrainingEff && !this._isAddTrainingEffect)
                continue;
            info = Manager.pool.create(SceneEffGameObjectInfo, effect[i].id, effect[i]);
            info.updatePostion(effect[i].position.x, effect[i].position.y);
            Manager.model.getGameobject().addGameObject(info);
        }
    };
    GameObjectModel.prototype.createSceneRobot = function () {
        var robots = SceneRobotCVO.getCVOsByMapID(Manager.model.getMap().mapCVO.res);
        if (robots == null || robots == undefined || (robots.length == 0))
            return;
        var info;
        for (var i = 0; i < robots.length; i++) {
            info = Manager.pool.create(SceneRobotGameObjectInfo, robots[i].id, robots[i]);
            info.updatePostion(robots[i].posx, robots[i].posy);
            Manager.model.getGameobject().addGameObject(info);
        }
    };
    GameObjectModel.prototype.setTrainingEffect = function (isAdd) {
        if (isAdd) {
            if (this._isAddTrainingEffect)
                return;
            if (!Manager.model.getMap().mapCVO)
                return;
            this._isAddTrainingEffect = true;
            var effect = SceneEffCVO.getCVOsByMapID(Manager.model.getMap().mapCVO.res);
            var info = void 0;
            for (var i = 0; i < effect.length; i++) {
                if (!effect[i].isTrainingEff)
                    continue;
                info = Manager.pool.create(SceneEffGameObjectInfo, effect[i].id, effect[i]);
                info.updatePostion(effect[i].position.x, effect[i].position.y);
                Manager.model.getGameobject().addGameObject(info);
            }
        }
        else {
            this._isAddTrainingEffect = false;
            var objects = this._objects[GameObjectType.SCENE_EFF];
            var info = void 0;
            for (var j = objects.length - 1; j >= 0; j--) {
                info = objects[j];
                if (!info.cvo.isTrainingEff)
                    continue;
                this.removeGameObject(info);
            }
        }
    };
    /**
     * 自动挂机更新玩家的目标
     */
    GameObjectModel.prototype.updateHookTarget = function () {
        var self = Manager.model.self;
        if (self.target != null) {
            if ((self.target instanceof MonsterGameObjectInfo) || (self.target instanceof PlayerGameObjectInfo)) {
                if ((self.target).canHited(false)) {
                    self.updateTarget(self.target);
                    return true;
                }
            }
        }
        var playerResults = [];
        if (self.attrInfo.pkMode == PKType.ACT || self.attrInfo.pkMode == PKType.ALL) {
            var player = void 0;
            var players = this._objects[GameObjectType.OTHER];
            for (var i = 0; i < players.length; i++) {
                player = players[i];
                if (!player.canHited(false))
                    continue;
                player.farToSelf = new egret.Point(self.x, self.y).subtract(new egret.Point(player.x, player.y)).length;
                playerResults.push(player);
            }
        }
        var monsters = this._objects[GameObjectType.MONSTER_NORMAL];
        monsters = this._objects[GameObjectType.MONSTER_BOSS].concat(monsters);
        var monster;
        var monsterResults = [];
        for (var i = 0; i < monsters.length; i++) {
            monster = monsters[i];
            if (!monster.canHited(false))
                continue;
            if (monster.cvo.outHookList)
                continue;
            monster.farToSelf = new egret.Point(self.x, self.y).subtract(new egret.Point(monster.x, monster.y)).length;
            monsterResults.push(monster);
        }
        if (monsterResults.length > 0) {
            monsterResults.sort(GameUtil.sortDistance2);
            //野外地图冲到怪堆里面去打，所以取中间距离的怪为目标
            var autoIndex = (Manager.model.getMap().mapCVO.isFieldMap) ? Math.floor(monsterResults.length >> 1) : 0;
            self.updateTarget(monsterResults[autoIndex]);
            return true;
        }
        else if (playerResults.length > 0) {
            playerResults.sort(GameUtil.sortDistance);
            self.updateTarget(playerResults[0]);
            return true;
        }
        return false;
    };
    /**根据类型返回对象数组 */
    GameObjectModel.prototype.getGameObjectsByType = function (gameObjectType) {
        var infos = this._objects[gameObjectType];
        return infos;
    };
    GameObjectModel.prototype.checkJumpPointTrigger = function () {
        var self = Manager.model.self;
        if (self.isingState(BodyStateManger.ISING_JUMP))
            return;
        if (self.isingState(BodyStateManger.ISING_SPRINT))
            return;
        if (self.isingState(BodyStateManger.ISING_FLY))
            return;
        if (self.isingState(BodyStateManger.ISING_SLIDE))
            return;
        if (self.isingState(BodyStateManger.ISING_KITE))
            return;
        if (self.isingState(BodyStateManger.ISING_WATER))
            return;
        var infos = this._objects[GameObjectType.JUMP_POINT];
        for (var i = 0; i < infos.length; i++) {
            if (infos[i].cvo.canTrigger(Manager.model.getMap().mapCVO.res, self.x, self.y)) {
                if (!Manager.model.getAuto().autoHook && Manager.walk.findInfo == null && self && self.view) {
                    var targetPos = self.view.getWalkTarget();
                    if (targetPos)
                        Manager.walk.findInfo = Manager.pool.create(MapFindInfo, targetPos, null);
                }
                if (infos[i].cvo.scriptType > 0)
                    Manager.jump.curInfo = infos[i];
                else
                    Manager.jump.curInfo = null;
                Manager.jump.jump(infos[i].cvo.targets);
                break; //触发一个就不再判断其他跳跃点
            }
        }
    };
    return GameObjectModel;
}());
__reflect(GameObjectModel.prototype, "GameObjectModel");
//# sourceMappingURL=GameObjectModel.js.map