/**
 * pzx 
 * 17.12.16
 * 主界面上的 预告
 * update devil 2018-04-18
 */
class MainSysnoticeItem2
{
    private _homeImageLayer:egret.DisplayObjectContainer;
    private _homeLayer:egret.DisplayObjectContainer;

    private _back:BitmapRes;
    private _num:NumImgView2;
	private _redIcon:BitmapRes;
	private _image:BitmapRemote;

    private _visible:boolean;
	private _taskModel:TaskModel;
	private _model:SysnoticeModel;
    private _drawView:boolean;
    private _drawRed:boolean;
	private _index:number;
	private _cvo:SysNoteiceCVO;

    public constructor(homeImageLayer:egret.DisplayObjectContainer,homeLayer:egret.DisplayObjectContainer)
    {
        this._homeImageLayer = ObjectUtil.createConainer();
        homeLayer.addChild(this._homeImageLayer);
        this._homeLayer = ObjectUtil.createConainer();
        homeLayer.addChild(this._homeLayer);

		this._taskModel = Manager.model.getTask();
		this._model = Manager.model.getSysnotice();
        this._visible = false;
    }

    public layout(gameWidth:number,height:number):void
    {
        this._homeLayer.x = 0;
        this._homeLayer.y = 711;
        this._homeImageLayer.x = 0;
        this._homeImageLayer.y = 711;
    }

    public switch(visible:boolean):void
    {
        if(this._visible == visible)return;
        this._visible = visible;
        if(this._visible)
        {
            this._back = BitmapRes.create("main_sysnotice_png",0,23);
            this._back.touchEnabled = true;
            this._homeImageLayer.addChild(this._back);
            this._image = Manager.pool.create(BitmapRemote);
            this._homeLayer.addChild(this._image);
            this._num = Manager.pool.create(NumImgView2);
            this._num.x = 100;
            this._num.y = 52;
            this._homeLayer.addChild(this._num);
            this.addEvent();
            if(this._model.getStsList())
            {
                this._drawView = true;
                this._drawRed = true;
                this.dispatchRender();
            }
        }
        else
        {
            Manager.render.remove(this.draw,this);
            this.removeEvent();
            Manager.pool.push(this._back);
            this._back = null;
            Manager.pool.push(this._image);
            this._image = null;
            if(this._redIcon)
            {
                Manager.pool.push(this._redIcon);
                this._redIcon = null;
            }
            if(this._num)
            {
                Manager.pool.push(this._num);
                this._num = null;
            }
            this._cvo = null;
        }
    }

    private addEvent():void
	{
		this._taskModel.addEventListener(TaskEvent.TASK_COMPLETE_EVENT,this.__taskComplete,this);
		this._model.addEventListener(SysnoticeEvent.SYSNOTICE_QUERY_EVENT,this.__updateView,this);
		this._back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenSysnoticeViewHandler,this);
		this._model.addEventListener(SysnoticeEvent.SYSNOTICE_UPDATE_REWARD_EVENT,this.__updateRed,this);
	}

	private removeEvent():void
	{
		this._taskModel.removeEventListener(TaskEvent.TASK_COMPLETE_EVENT,this.__taskComplete,this);
		this._model.removeEventListener(SysnoticeEvent.SYSNOTICE_QUERY_EVENT,this.__updateView,this);
		this._back.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenSysnoticeViewHandler,this);
		this._model.removeEventListener(SysnoticeEvent.SYSNOTICE_UPDATE_REWARD_EVENT,this.__updateRed,this);
	}

    private dispatchRender():void
    {
        Manager.render.add(this.draw,this,1000,1);
    }

    public getGuidePos():egret.Point
    {
        return this._homeImageLayer.parent.localToGlobal(this._homeImageLayer.x,this._homeImageLayer.y);
    }

	private onOpenSysnoticeViewHandler(e:egret.TouchEvent):void
	{
		if(OpenCVO.isOpen(OpenConst.ID_SYSNOTICE, true))
			Manager.view.show(ViewID.SysNoticePanel);
	}

    private draw():void
    {
        if(!this._visible)return;
        if(this._drawView) this.drawView();
        if(this._drawRed)this.drawRed();
        this._drawView = false;
        this._drawRed = false;
    }

    private drawRed():void
    {
        this.showRedIcon(this._model.getlinquReward());
    }

    private showRedIcon(isShow:boolean):void
    {
		if(isShow)
		{
			if(this._redIcon == null)
			{
				this._redIcon = Manager.pool.create(BitmapRes, "main_red_icon_png");
				this._redIcon.x = 168;
				this._redIcon.y = 22;
			    this._homeLayer.addChildAt(this._redIcon, 3);
			}
		}
		else 
        {
            if(this._redIcon)
            {
                Manager.pool.push(this._redIcon);
                this._redIcon = null;
            }
        }
    }


    private drawView():void
    {
		let cvo:SysNoteiceCVO = this._model.getCurNotice();
		if(cvo == null) return;
		if(this._cvo == cvo) return;
		this._cvo = cvo;
		this._image.load(Manager.path.getSysnoticePath(cvo.icon));
		this._image.x = cvo.offsetX;
		this._image.y = cvo.offsetY;
		if(cvo.pass>99)
		{
			this._num.x = 70;
		}
		else if(cvo.pass>9)
		{
			this._num.x = 85;
		}
		else
		{
			this._num.x = 100;
		}
		
		this._num.setValue(cvo.pass,"nums_sysnontic_",13);
    }

    private __taskComplete(e:BaseEvent):void
    {
        if(this._model.getStsList())
        {
            this._drawView = true;
            this._drawRed = true;
            this.dispatchRender();
        }
    }

	private __updateView():void
	{
        this._drawView = true;
        this.dispatchRender();
	}

    private __updateRed():void
    {
        this._drawRed = true;
        this.dispatchRender();
    }
}