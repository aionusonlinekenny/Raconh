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
 * pzx
 * 17.11.14
 * 任务mddel
 */
var TaskModel = /** @class */ (function (_super) {
    __extends(TaskModel, _super);
    function TaskModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 当前章节id */
        _this._sectionId = 0;
        /**当前主线任务id */
        _this._mainID = 0;
        _this.isAutoTask = false;
        return _this;
        //```````````````````````新手剧情end`````````````````````````//
    }
    /**任务查询 */
    TaskModel.prototype.queryTaskList = function (pi) {
        var ln = pi.readShort();
        if (ln == 0)
            return;
        var info;
        for (var i = 0; i < ln; i++) {
            info = new TaskInfo();
            info.id = pi.readInt();
            info.status = pi.readByte();
            info.accept_num = pi.readInt();
            var l = pi.readShort();
            for (var j = 0; j < l; j++) {
                var item = new TaskChildInfo();
                item.id = pi.readInt();
                item.target_value = pi.readInt();
                item.pro = pi.readInt();
                item.status = pi.readByte();
                info.infoList.push(item);
            }
            this._mainID = info.id;
            this._mainTask = info;
        }
        this.dispatchEvent(new TaskEvent(TaskEvent.TASK_INIT_EVENT));
    };
    /**任务更新 */
    TaskModel.prototype.updateTaskList = function (pi) {
        var info = new TaskInfo();
        info.id = pi.readInt();
        info.status = pi.readByte();
        info.accept_num = pi.readInt();
        var cvo = TaskCVO.getinfo(info.id);
        var l = pi.readShort();
        for (var j = 0; j < l; j++) {
            var item = new TaskChildInfo();
            item.id = pi.readInt();
            item.target_value = pi.readInt();
            item.pro = pi.readInt();
            item.status = pi.readByte();
            info.infoList.push(item);
        }
        this._mainTask = info;
        if (this._mainID != info.id) {
            if (cvo && cvo.guideBefore > 0)
                Manager.model.getGuide().curID = cvo.guideBefore;
            this._mainID = info.id;
        }
        this.setSectionId(info.id);
        this.dispatchEvent(new TaskEvent(TaskEvent.TASK_UPDATE_EVENT, info));
        if (info.status == 1) {
            var cvo_1 = TaskCVO.getinfo(info.id);
            if (cvo_1 && cvo_1.guideAfter > 0)
                Manager.model.getGuide().curID = cvo_1.guideAfter;
            this.dispatchEvent(new TaskEvent(TaskEvent.TASK_COMPLETE_EVENT, info.id));
            if (this._mainID == 10051) {
                //第5关强制弹出首充界面
                Manager.view.show(76 /* FirstChargeView */);
            }
        }
    };
    TaskModel.prototype.setSectionId = function (taskId) {
        var cvo = TaskCVO.getTaskVerselInfo(taskId);
        if (this._sectionId == cvo.id) {
            return;
        }
        this._sectionId = cvo.id;
        this.dispatchEvent(new TaskEvent(TaskEvent.TASK_UPDATE_SECTION_EVENT, cvo));
    };
    /**提交任务结果 */
    TaskModel.prototype.taskCommit = function (ip) {
        var taskId = ip.readInt();
        /**是否成功 */
        var success = ip.readByte();
        if (success == 1) {
            //Manager.control.getTask().taskMain();
            var arr = Manager.model.getSysnotice().getStsList();
            if (!arr)
                return;
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var cvo = arr_1[_i];
                if (cvo.open_task_id == taskId) {
                    Manager.view.show(48 /* SysNoticeNewSystemView */, cvo.icon, cvo.pointId);
                }
            }
        }
    };
    Object.defineProperty(TaskModel.prototype, "curVerseMapID", {
        /**当前章节地图id*/
        get: function () {
            var id = 0;
            var info = this.getcurTask();
            if (info) {
                var vo = TaskCVO.getTaskVerselInfo(info.id);
                id = vo.sceneId;
            }
            return id;
        },
        enumerable: true,
        configurable: true
    });
    /** 主线任务 失败
     * @param 副本id
    */
    TaskModel.prototype.setCopyResoult = function (copyId) {
        this.isAutoTask = false;
    };
    /** 当前任务 null为做完任务*/
    TaskModel.prototype.getcurTask = function () {
        return this._mainTask;
    };
    /** 该任务是否已完成 */
    TaskModel.prototype.getTaskIdComplete = function (taskId) {
        return taskId < this._mainID;
    };
    //`````````````````````````新手剧情start`````````````````````````````//
    /**根据剧情表id解析步骤 */
    TaskModel.prototype.parseStep = function (id) {
        var cvo = StoryCVO.getCVO(id);
        if (Manager.render.contains(this.checkBoss, this))
            Manager.render.remove(this.checkBoss, this);
        if (cvo) {
            Manager.model.getAuto().autoHook = false;
            switch (cvo.type) {
                case StoryOperateType.FIND_PATH:
                    var self_1 = Manager.model.self.view;
                    var startP = new egret.Point(self_1.info.x, self_1.info.y);
                    var arr = cvo.script.split("|");
                    var posArr = ArrayUtil.parseStringToArray(arr[0], ",");
                    var targetP = new egret.Point(posArr[0], posArr[1]);
                    var path = Manager.model.getMap().findPath.findpath(startP, targetP);
                    if (arr.length > 1) {
                        this.tempValue = Number(arr[1]);
                        self_1.eventWalk(path, WalkType.WALK, this.parseStepCallback1, this);
                    }
                    else {
                        self_1.eventWalk(path, WalkType.WALK, this.parseStepCallback2, this);
                    }
                    break;
                case StoryOperateType.KILL_MON:
                    Manager.model.self.updateTarget(null);
                    Manager.model.getAuto().autoHook = true;
                    var monster = MonsterCVO.getCVO(Number(cvo.script));
                    if (monster && monster.grade == MonsterGrade.ELITE) {
                        Manager.render.add(this.checkBoss, this, 1000, 0, null, true);
                    }
                    break;
                case StoryOperateType.COLLECT:
                    Manager.view.show(132 /* CollectEffect */, "caiji", this.parseStepCallback3, this);
                    break;
                case StoryOperateType.PLAY_EFFECT:
                    var effectArr = cvo.script.split("|");
                    var len = effectArr ? effectArr.length : 0;
                    var effect = void 0;
                    for (var i = 0; i < len; i++) {
                        effect = Manager.model.getGameobject().getSceneEffByCvoId(Number(effectArr[i]));
                        if (effect)
                            effect.playShow();
                    }
                    if (effect) {
                        var time = 2000;
                        if (effect.cvo.type == SceneEffCVO.TYPE_BRIDGE)
                            time = 1200;
                        Manager.control.getMap().view.setShake(0, time, 5, true);
                        Manager.control.getTask().rookieAsk();
                    }
                    break;
                default:
                    break;
            }
        }
    };
    TaskModel.prototype.parseStepCallback1 = function (arr) {
        Manager.view.show(113 /* DialogView2 */, this.tempValue);
    };
    TaskModel.prototype.parseStepCallback2 = function (arr) {
        Manager.control.getTask().rookieAsk();
    };
    TaskModel.prototype.parseStepCallback3 = function (arr) {
        Manager.control.getTask().rookieAsk();
    };
    TaskModel.prototype.checkBoss = function () {
        //场景只有一个boss
        var arr = Manager.model.getGameobject().getGameObjectsByType(GameObjectType.MONSTER_BOSS);
        if (arr && arr.length > 0) {
            var boss = Manager.model.getGameobject().getGameObject(arr[0].id, GameObjectType.MONSTER_BOSS);
            if (boss) {
                var skillCvo = SkillCVO.getCVO(RookieConst.SKILL_ID);
                if (!skillCvo)
                    return;
                var skillInfo = new SkillInfo(skillCvo, 1);
                if (!skillInfo)
                    return;
                Manager.render.remove(this.checkBoss, this);
                Manager.render.add(this.checkBossCallback, this, 4000, 1, null, false, boss, skillInfo);
                Manager.render.add(this.playFirstChargeEff, this, 5500, 1);
            }
        }
    };
    TaskModel.prototype.checkBossCallback = function (internal, boss, skillInfo) {
        Manager.control.getBattle().cmdPlayerAttack(boss, skillInfo);
    };
    TaskModel.prototype.playFirstChargeEff = function () {
        Manager.view.show(126 /* SkillIconFlyEffect */);
    };
    return TaskModel;
}(egret.EventDispatcher));
//# sourceMappingURL=TaskModel.js.map