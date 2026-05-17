/**
 * 活动图标model
 * liangyan
 * create 2017-12-21
*/
class ActIconModel extends egret.EventDispatcher
{
    
    public constructor()
    {
        super();
        // this._noticeIDs = [];
        this._showIDs = [];
        this.addEvent();

        let cvos = DailyActivityCVO.getAlwaysShowCVOs();
        let cvo:DailyActivityCVO;
        for(let i = 0; i < cvos.length; i++) 
        {
            cvo = cvos[i];
            this.addID(cvo.id);
        }
        
    }
    

    private addEvent():void
    {
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.onUpdateHandler, this);
        Manager.model.getTask().addEventListener(TaskEvent.TASK_UPDATE_EVENT, this.onUpdateHandler, this);
        Manager.model.getTask().addEventListener(TaskEvent.TASK_INIT_EVENT, this.onUpdateHandler, this);
		//GameDispatcher.getInstance().addEventListener(GlobalEvent.CROSS_DAY_EVENT, this.onUpdateHandler, this);
    }

    private onUpdateHandler(e:BaseEvent):void
    {
        let cvo:DailyActivityCVO;
        let cvos = DailyActivityCVO.getShowCVO(DailyActivityCVO.SHOW_TYPE_NOTICE);
        for(let i = 0; i < cvos.length; i++) 
        {
            cvo = cvos[i];
            if(!this.hasAdd(cvo.id)) this.addID(cvo.id);
        }

        cvos = DailyActivityCVO.getShowCVO(DailyActivityCVO.SHOW_TYPE_YUNYING);
        for(let i = 0; i < cvos.length; i++) 
        {
            cvo = cvos[i];
            if(!this.hasAdd(cvo.id)) this.addID(cvo.id);
        }
    }

    private _showIDs:Array<number>;
	public get showIDs():Array<number>
    {
        return this._showIDs;
    }
	public hasAdd(id:number):boolean
    {
        return this._showIDs.indexOf(id) != -1;
    }
	public removeID(id:number):void
	{
		let index = this._showIDs.indexOf(id);
		if(index != -1)
        {
            this._showIDs.splice(index, 1);
            let cvo = DailyActivityCVO.getCVO(id);
            if(cvo && cvo.type == DailyActivityCVO.SHOW_TYPE_NOTICE) Manager.model.getLogin().home.updateIcon(ActivityIcon.RIGHT,cvo, true);
            else if(cvo && cvo.type == DailyActivityCVO.SHOW_TYPE_YUNYING) Manager.model.getLogin().home.updateIcon(ActivityIcon.TOP,cvo, true);
            //提前出现下一活动图标
            if(cvo.nextID > 0)
            {
                cvo = DailyActivityCVO.getCVO(cvo.nextID);
                if(cvo) this.addID(cvo.id);
            }
        }
        
	}
	public addID(id:number):void
	{
		if(!this.hasAdd(id))
        {
            this._showIDs.push(id);
            let cvo = DailyActivityCVO.getCVO(id);
            if(cvo && cvo.type == DailyActivityCVO.SHOW_TYPE_NOTICE) 
            {
                Manager.model.getLogin().home.updateIcon(ActivityIcon.RIGHT,cvo, false);
            }
            else if(cvo && cvo.type == DailyActivityCVO.SHOW_TYPE_YUNYING) 
            {
                Manager.model.getLogin().home.updateIcon(ActivityIcon.TOP,cvo, false);
            }
        }
	}
    /**根据类型返回正在进行的活动cvo */
    public getIDByType(actType:number):DailyActivityCVO
    {
        let len = this._showIDs != null ? this._showIDs.length : 0;
        let cvo:DailyActivityCVO;
        for(let i = len - 1; i >= 0; i--)
        {
            cvo = DailyActivityCVO.getCVO(this._showIDs[i]);
            if(cvo && cvo.actType == actType) return cvo;
        }
        return null;
    }

}