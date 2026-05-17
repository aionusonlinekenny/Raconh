/**
 * pzx
 * 17.12.16
 * Sysnoticemddel
 */
class SysnoticeModel extends egret.EventDispatcher
{
    /**例表<sysnoticeCvo> */
    private _sysList:SysNoteiceCVO[];

    private _taskCompleteList:Array<number>;

    /**查询 */
    public querySysList(arr:SysnoticeInfo[]):void
    {
       this._sysList = SysNoteiceCVO.getCvos();
       let ln:number = arr.length;
       let sl:number = this._sysList.length;
       for(let i:number = 0;i<ln;i++)
       {
           let info:SysnoticeInfo = arr[i];
           for(let j:number= 0;j<sl;j++)
           {
               let cvo:SysNoteiceCVO = this._sysList[j];
               if(cvo.taskId == info.taskId)
               {
                   cvo.setState(info.state)
                   break;
               }
           }
       }
       this._sysList = ArrayUtil.sortOn(this._sysList,["id"]);
       this.dispatchEvent(new SysnoticeEvent(SysnoticeEvent.SYSNOTICE_QUERY_EVENT));
    }
    public getCurNotice():SysNoteiceCVO
    {
        let task:TaskInfo = Manager.model.getTask().getcurTask();
        if(task)
        {
            for(let obj of this._sysList)
            {
                if(obj.open_task_id >= task.id)
                {
                    return obj;
                }
            }
            return this._sysList[this._sysList.length-1]
        }
    }
/**更新 */
    public updateSysList(taskId:number,statu:number):void
    {
        for(let cvo of this._sysList)
        {
            if(cvo.taskId == taskId)
            {
                cvo.setState(statu);
                break;
            }
        }
        this.dispatchEvent(new SysnoticeEvent(SysnoticeEvent.SYSNOTICE_UPDATE_REWARD_EVENT,taskId));
    }

    private setSectionId(taskId:number):void
    {
        
    }
   
    /**列表 */
    public getStsList():SysNoteiceCVO[]
    {
        return this._sysList;
    }
    /**检测是否有可领取的奖励 */
    public getlinquReward():boolean
    {
        for(let cvo of this._sysList)
        {
            if(cvo.state == 0)
            {
                if(Manager.model.getTask().getTaskIdComplete(cvo.open_task_id))
                {

                    return true;
                }
            }
        }
        return false;
    }
    /** 游戏公告返回 */
    public returnUpdNotice():void
    {
        this.dispatchEvent(new SysnoticeEvent(SysnoticeEvent.UPD_NOTICE_EVENT));
    }
}