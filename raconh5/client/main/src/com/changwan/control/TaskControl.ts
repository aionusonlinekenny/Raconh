/**
 * pzx 
 * 17.11.14
     * 任务Control
     */
class TaskControl extends BaseControl
{
    private _guideView:GuideView;
    public get guideView():GuideView
    {
        return this._guideView;
    }

    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
         Manager.socket.addCMD(Protocol.CMD_TASK_LIST,TaskListCMD);
         Manager.socket.addCMD(Protocol.CMD_TASK_UPDATE,TaskUpdateListCMD);
         Manager.socket.addCMD(Protocol.CMD_TASK_COMMIT,TaskCommitCMD);
         //Manager.socket.addCMD(Protocol.CMD_TASK_MAIN_HISTORT,TaskMainHistoryCMD);
         Manager.socket.addCMD(Protocol.ROOKIE_STORY, RookieStoryCMD);
    }
    /**
     * 查询
     */
    public query():void
    {
        let cmd:TaskListCMD = Manager.socket.getCMD(Protocol.CMD_TASK_LIST) as TaskListCMD;
        cmd.send();
    }
     /**
     * 提交
     */
    public taskCommit(id:number):void
    {
        let cmd:TaskCommitCMD = Manager.socket.getCMD(Protocol.CMD_TASK_COMMIT) as TaskCommitCMD;
        cmd.task_id = id;
        cmd.send();
    }

    public rookieAsk():void
    {
        let cmd = Manager.socket.getCMD(Protocol.ROOKIE_STORY) as RookieStoryCMD;
        cmd.send();
    }

    public showGuide(globalPos:egret.Point, x:number, y:number, callBack:Function, thisObj:any, modal:boolean = true):void
    {
        if(!globalPos) return;
        if(this._guideView == null) this._guideView = new GuideView();
        if(this._guideView.parent == null) Manager.layer.tipsLayer.addChild(this._guideView);
        else Manager.layer.tipsLayer.addChildAt(this._guideView, Manager.layer.tipsLayer.numChildren - 1);
        // this._guideView.setData(target, x, y, callBack, thisObj, modal);
        this._guideView.setData2(globalPos, x, y, callBack, thisObj, modal);
    }
    public hideGuide():void
    {
        if(this._guideView) this._guideView.hide();
        Manager.model.getGuide().curID = 0;
    }
}