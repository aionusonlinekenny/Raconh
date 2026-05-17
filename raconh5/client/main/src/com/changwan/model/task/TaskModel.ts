/**
 * pzx
 * 17.11.14
 * 任务mddel
 */
class TaskModel extends egret.EventDispatcher
{
    /** 当前章节id */
    private _sectionId:number=0;
    /**当前主线任务id */
    private _mainID:number=0;

    public isAutoTask:boolean = false;
 /**当前主线任务 */
    private _mainTask:TaskInfo;

    /**任务查询 */
    public queryTaskList(pi:TCPPacketIn):void
    {
        let ln:number = pi.readShort();
        if(ln == 0) return;
        let info:TaskInfo;
        for(let i:number = 0;i<ln;i++)
        {
            info = new TaskInfo();
            info.id = pi.readInt();
            info.status = pi.readByte();
            info.accept_num = pi.readInt();
            let l:number = pi.readShort();
            for(let j:number = 0;j<l;j++)
            {
                let item:TaskChildInfo = new TaskChildInfo();
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
    }
/**任务更新 */
    public updateTaskList(pi:TCPPacketIn):void
    {
        let info:TaskInfo= new TaskInfo();
        info.id = pi.readInt();
        info.status = pi.readByte();
        info.accept_num = pi.readInt();
        let cvo = TaskCVO.getinfo(info.id);
        let l:number = pi.readShort();
        for(let j:number = 0;j<l;j++)
        {
            let item:TaskChildInfo = new TaskChildInfo();
            item.id = pi.readInt();
            item.target_value = pi.readInt();
            item.pro = pi.readInt();
            item.status = pi.readByte();
            info.infoList.push(item);
        }
        this._mainTask = info;
        if(this._mainID != info.id)
        {
            if(cvo && cvo.guideBefore > 0) Manager.model.getGuide().curID = cvo.guideBefore;
            this._mainID = info.id;
        }
   
        this.setSectionId(info.id);
        this.dispatchEvent(new TaskEvent(TaskEvent.TASK_UPDATE_EVENT,info));
        if(info.status == 1)
        {
            let cvo = TaskCVO.getinfo(info.id);
            if(cvo && cvo.guideAfter > 0) Manager.model.getGuide().curID = cvo.guideAfter;
            this.dispatchEvent(new TaskEvent(TaskEvent.TASK_COMPLETE_EVENT,info.id));
            if(this._mainID == 10051)
            {
                //第5关强制弹出首充界面
                Manager.view.show(ViewID.FirstChargeView);
            }
        }
    }

    private setSectionId(taskId:number):void
    {
        let cvo :TaskSectionCvoInfo = TaskCVO.getTaskVerselInfo(taskId);
        if(this._sectionId == cvo.id)
        {
            return;
        }
        this._sectionId = cvo.id;
        this.dispatchEvent(new TaskEvent(TaskEvent.TASK_UPDATE_SECTION_EVENT,cvo))
    }
   
/**提交任务结果 */
    public taskCommit(ip:TCPPacketIn):void
    {
        let taskId:number = ip.readInt();
        /**是否成功 */
        let success:number = ip.readByte();
        if(success == 1)
        {
            //Manager.control.getTask().taskMain();
            let arr:SysNoteiceCVO[] = Manager.model.getSysnotice().getStsList();
            if(!arr) return;
            for(let cvo of arr)
            {
                if(cvo.open_task_id == taskId)
                {
                    Manager.view.show(ViewID.SysNoticeNewSystemView,cvo.icon,cvo.pointId);
                }
            }
        }
    }

     /**当前章节地图id*/
    public get curVerseMapID():number
    {
        let id:number = 0;
        let info:TaskInfo = this.getcurTask();
        if(info)
        {
            let vo:TaskSectionCvoInfo = TaskCVO.getTaskVerselInfo(info.id);
            id = vo.sceneId;
        }
        return id;
    }
/** 主线任务 失败  
 * @param 副本id
*/
    public setCopyResoult(copyId:number):void
    {
        this.isAutoTask = false;
    }
    /** 当前任务 null为做完任务*/
    public getcurTask():TaskInfo
    {
        return this._mainTask;
    }
    /** 该任务是否已完成 */
    public getTaskIdComplete(taskId:number):boolean
    {
        return taskId<this._mainID;
    }


    //`````````````````````````新手剧情start`````````````````````````````//
    /**根据剧情表id解析步骤 */
    public parseStep(id:number):void
    {
        let cvo = StoryCVO.getCVO(id);
        if(Manager.render.contains(this.checkBoss, this)) Manager.render.remove(this.checkBoss, this);
        if(cvo)
        {
            Manager.model.getAuto().autoHook = false;
            switch(cvo.type)
            {
                case StoryOperateType.FIND_PATH:
                    let self = Manager.model.self.view as SelfGameObject;
				    let startP = new egret.Point(self.info.x, self.info.y);
				    let arr = cvo.script.split("|");
                    let posArr = ArrayUtil.parseStringToArray(arr[0], ",")
                    let targetP = new egret.Point(posArr[0], posArr[1]);
				    let path:Array<egret.Point> = Manager.model.getMap().findPath.findpath(startP, targetP);
                    if(arr.length > 1)
                    {
                        this.tempValue = Number(arr[1]);
                        self.eventWalk(path, WalkType.WALK, this.parseStepCallback1, this);
                    }
                    else
                    {
                        self.eventWalk(path, WalkType.WALK, this.parseStepCallback2, this);
                    }
                    break;
                case StoryOperateType.KILL_MON:
                    Manager.model.self.updateTarget(null);
                    Manager.model.getAuto().autoHook = true;
                    let monster = MonsterCVO.getCVO(Number(cvo.script));
                    if(monster && monster.grade == MonsterGrade.ELITE)
                    {
                        Manager.render.add(this.checkBoss, this, 1000, 0, null, true);
                    }
                    break;
                case StoryOperateType.COLLECT:
                    Manager.view.show(ViewID.CollectEffect, "caiji", this.parseStepCallback3, this);
                    break;
                case StoryOperateType.PLAY_EFFECT:
                    let effectArr = cvo.script.split("|");
                    let len = effectArr ? effectArr.length : 0;
                    let effect:SceneEffGameObjectInfo;
                    for(let i = 0; i < len; i++)
                    {
                        effect = Manager.model.getGameobject().getSceneEffByCvoId(Number(effectArr[i]));
                        if(effect) effect.playShow();
                    }
                    if(effect)
                    {
                        let time:number = 2000;
                        if(effect.cvo.type == SceneEffCVO.TYPE_BRIDGE) time = 1200;
                        Manager.control.getMap().view.setShake(0, time, 5, true);
                        Manager.control.getTask().rookieAsk();
                    }
                    break;
                default:
                    break;
            }
        }
    }

    private tempValue:number;
    private parseStepCallback1(arr:string[]):void
    {
        Manager.view.show(ViewID.DialogView2, this.tempValue);
    }
    private parseStepCallback2(arr:string[]):void
    {
        Manager.control.getTask().rookieAsk();
    }
    private parseStepCallback3(arr:string[]):void
    {
        Manager.control.getTask().rookieAsk();
    }

    private checkBoss():void
    {
        //场景只有一个boss
        let arr = Manager.model.getGameobject().getGameObjectsByType(GameObjectType.MONSTER_BOSS);
        if(arr && arr.length > 0)
        {
            let boss = Manager.model.getGameobject().getGameObject(arr[0].id, GameObjectType.MONSTER_BOSS) as MonsterGameObjectInfo;
            if(boss)
            {
                let skillCvo:SkillCVO = SkillCVO.getCVO(RookieConst.SKILL_ID);
                if(!skillCvo) return;
                let skillInfo:SkillInfo = new SkillInfo(skillCvo, 1);
                if(!skillInfo) return;
                Manager.render.remove(this.checkBoss, this);
                Manager.render.add(this.checkBossCallback, this, 4000, 1, null, false, boss, skillInfo);
                Manager.render.add(this.playFirstChargeEff, this, 5500, 1);
            }
        }
    }

    private checkBossCallback(internal:number, boss:MonsterGameObjectInfo, skillInfo:SkillInfo):void
    {
        Manager.control.getBattle().cmdPlayerAttack(boss, skillInfo);
    }

    private playFirstChargeEff():void
    {
        Manager.view.show(ViewID.SkillIconFlyEffect);
    }
    //```````````````````````新手剧情end`````````````````````````//
}