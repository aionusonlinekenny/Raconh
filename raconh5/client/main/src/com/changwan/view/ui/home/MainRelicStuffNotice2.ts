/** 
 * 神器小界面提示
 * pzx
 * create 18.3.13
 * @updateTime devil 2018-04-17
 */
class MainRelicStuffNotice2 implements cw.IDispose
{
    private _homeImageLayer:egret.DisplayObjectContainer;
    private _homeLayer:egret.DisplayObjectContainer;
    
    private _back:BitmapRes;
    private _back1:BitmapRes;
    private _descTxt:TextField;
    private _nameBit:BitmapRemote;

    
    private _visible:boolean;
	private _model:RelicStuffModel;
	private _taskModel:TaskModel;
    private _curCvo:RelicStuffCVO;
    private _owner:HomeView2;
    private _drawData:boolean;
	private _ani:Animation;
	private _id:number=-1;

    public constructor(homeImageLayer:egret.DisplayObjectContainer,homeLayer:egret.DisplayObjectContainer,owner:HomeView2)
    {
        this._homeImageLayer = ObjectUtil.createConainer();
        homeImageLayer.addChild(this._homeImageLayer);
        this._homeLayer = ObjectUtil.createConainer();
        homeLayer.addChild(this._homeLayer);

        this._visible = false;
		this._model = Manager.model.getrelicstuff();
		this._taskModel = Manager.model.getTask();
        this._owner = owner;
        this._drawData = true;
    }

    public getGuidPos():egret.Point
    {
        return this._homeImageLayer.parent.localToGlobal(this._homeImageLayer.x,this._homeImageLayer.y);
    }

    public move(x:number,y:number):void
    {
        this._homeLayer.x = x;
        this._homeLayer.y = y;
        this._homeImageLayer.x = x;
        this._homeImageLayer.y = y;
    }

    public switch(visible:boolean):void
    {
        if(this._visible == visible)return;
        this._visible = visible;
        if(this._visible)
        {
            this._id = -1;
            this._drawData = true;
            if(this._back == null)
            {
                this._back = BitmapRes.create("relicStuff_taizi_png",22,115);
                this._back.touchEnabled = true;
                this._homeImageLayer.addChild(this._back);
            }
            if(this._back1 == null)
            {
                this._back1 = BitmapRes.create("common_name_back_png",147,-24);
                this._back1.height = 320;
                this._homeImageLayer.addChild(this._back1);
            }
            if(this._nameBit == null)
            {
                this._nameBit = Manager.pool.create(BitmapRemote);
                this._nameBit.x = 168;
                this._nameBit.y = 23;
                this._nameBit.width = 44;
                this._nameBit.height = 166;
                this._homeLayer.addChild(this._nameBit);
            }
            if(this._descTxt == null)
            {
                this._descTxt = TextField.create(193,54,0xfff7e7,22,"center");
                this._descTxt.y = 160;
                this._descTxt.lineSpacing = 6;
                this._homeLayer.addChild(this._descTxt);
            }
            this.addEvent();
            this.dispatchRender();
        }
        else
        {
            this.removeEvent();
            if(this._back != null)
            {
                Manager.pool.push(this._back);
                this._back = null;
            }
            if(this._back1 != null)
            {
                Manager.pool.push(this._back1);
                this._back1 = null;
            }
            if(this._descTxt != null)
            {
                Manager.pool.push(this._descTxt);
                this._descTxt = null;
            }
            if(this._nameBit != null)
            {
                Manager.pool.push(this._nameBit);
                this._nameBit = null;
            }
            if(this._ani)
            {
                Manager.pool.push(this._ani);
                this._ani = null;
            }
        }
    }

    private dispatchRender():void
    {
        Manager.render.add(this.draw,this,500,1);
    }

    protected addEvent():void
    {
		this._back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchOpenHandler,this);
		this._model.addEventListener(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT,this.onActivityReturn,this);
    }

    protected removeEvent():void
    {
		this._back.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchOpenHandler,this);
		this._model.removeEventListener(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT,this.onActivityReturn,this);
    }

	private onTouchOpenHandler():void
    {
		Manager.view.show(ViewID.ReinPanel);
	}

	/** 激活成功返回 */
	private onActivityReturn(e:RelicStuffEvent):void
	{
		let type:number = e.params.type;
		if(type== RelicStuffType.RELICSTUFF_TYPE)
		{
			this._curCvo = RelicStuffCVO.cvo(e.params.id+1);
			if(this._curCvo == null) this._owner.disposeView(HomeView2.MAIN_RELICE_STUFF);
            else this.drawData();
		}
        else
        {
            this._drawData = true;
            this.dispatchRender();
        }
	}

	private draw():void
	{
        if(this._drawData) 
        {
            this.drawData();
            this._drawData = false;
        }
	}

    private drawData():void
    {
		if(!this._curCvo) return;
		this.drawView();
		let arr:RelicStuffDebrisCVO[] = this._curCvo.getDebrisList();
		let cvo:RelicStuffDebrisCVO = arr[arr.length-1];//不可激活：显示“再战*关”（条件同最后一个碎片的激活条件）
		let val:string="";
		if(cvo.checkisActivity() || cvo.isActivity())
		{
			val = LangCVO.getContent("common59");//<font color='#00ff00'>可激活</font>
		}
		else
		{
			if(this._taskModel.getcurTask())
			{
				let con:ConditionVO = cvo.condVo;
				let taskcvo:TaskCvoInfo = TaskCVO.getinfo(con.value);
				let curCvo:TaskCvoInfo = TaskCVO.getinfo(this._taskModel.getcurTask().id);
				let isact:number = taskcvo.verse - curCvo.verse+1;
				val = StringUtils.setParam(LangCVO.getContent("relicstuff4"),isact);//再战{0}关
			}
		}

		let desc:string = StringUtils.setParam(this._curCvo.desc,val);
		HtmlUtil.setTextFlow(this._descTxt,desc);
    }

	private drawView():void
	{
		if(this._id == this._curCvo.id) return;
		this._id = this._curCvo.id;
		this._nameBit.load(Manager.path.getRelicStuffPath("label/name"+this._curCvo.id));
        if(this._ani)
        {
            Manager.pool.push(this._ani);
            this._ani = null;
        }
		this._ani = Manager.animation.createPanelGlobalAnimation("relicStuff/ani/"+this._curCvo.mainAni_id,this._curCvo.mainAni_id);
		this._ani.x = -310;
		this._ani.y = -315;
		this._homeLayer.addChild(this._ani);
	}

    public setData(data:RelicStuffCVO):void
    {
        if(this._curCvo == data)return;
		this._curCvo = data;
        if(!this._visible)return;
        this._drawData = true;
        this.dispatchRender();
    }

    public dispose():void
    {
        this.switch(false);
        Manager.render.remove(this.draw,this);
        this._homeImageLayer.parent.removeChild(this._homeImageLayer);
        this._homeImageLayer = null;
        this._homeLayer.parent.removeChild(this._homeLayer);
        this._homeLayer = null;
        this._model = null;
        this._taskModel = null;
        this._curCvo = null;
        this._owner = null;
    }
}