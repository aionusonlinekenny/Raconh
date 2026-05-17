/**
 * 传功
 * Simon
 * 2018.1.10
 */
class ChuangongView extends RenderSprite
{
	private _item:ChuangongItem;
	private _time:TextField;

	private _model:TrainingModel;
	private _beiList:Array<ChuangongBeiItem>;
	private _selectItem:ChuangongBeiItem;

	private _updateExpTime:number;

	public constructor()
	{
		super();
		this.touchChildren = true;
		this.start();
		this.addEvent();
	}

	protected start():void
    {
        super.start();

		this.width = 333;
		this.height = 150;

		this._model = Manager.model.getTraining();

		this._item = new ChuangongItem();
		this._item.y = 900;

		this._beiList = [];
		for(let i:number=0; i<3; i++)
		{
			let bei:ChuangongBeiItem = new ChuangongBeiItem();
			bei.x = 111 * i;
			this.addChild(bei);
			bei.beiImg.source = "cg_beiImg" + (i+1) + "_png";
			this._beiList.push(bei);
		}

		this._time = TextField.create(63, 24);
        this._time.move(135,118);
        this._time.textColor = Color.GREEN;
        this._time.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._time.textAlign = egret.HorizontalAlign.LEFT;
        this._time.fontFamily = "Microsoft YaHei";
        this._time.size = 24;
		this._time.text = "00:00";

		this.onResizeHandler();
	}

	protected drawAll():void
	{
		super.drawAll();
		this.initData();
	}

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("onTypeUpdateHandler")) this.onTypeUpdateHandler();
		if(this.isInvalid("onDataUpdateHandler")) this.onDataUpdateHandler();
	}

	private initData():void
	{
		this._updateExpTime = 0;
		this.onDataUpdateHandler();
		this._model.trainingHandler();
	}

	protected addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		for(let i:number=0; i<this._beiList.length; i++)
			this._beiList[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBeiItemHandler, this);
		this._model.addEventListener(TrainingEvent.TYPE_UPDATE, this.onTypeUpdate, this);
		this._model.addEventListener(TrainingEvent.DATA_UPDATE, this.onDataUpdate, this);
		Manager.model.getTraining().addEventListener(TrainingEvent.EXP_UPDATE, this.onExpUpdateHandler, this);
	}

	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		for(let i:number=0; i<this._beiList.length; i++)
			this._beiList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBeiItemHandler, this);
		this._model.removeEventListener(TrainingEvent.TYPE_UPDATE, this.onTypeUpdate, this);
		this._model.removeEventListener(TrainingEvent.DATA_UPDATE, this.onDataUpdate, this);
		Manager.model.getTraining().removeEventListener(TrainingEvent.EXP_UPDATE, this.onExpUpdateHandler, this);

		super.removeEvent();
	}
	
	private onResizeHandler(e?:GlobalEvent):void
	{
		this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
	}

	private onClickBeiItemHandler(e:egret.TouchEvent):void
	{
		if(this._item.parent) return;
		let index:number = this._beiList.indexOf(e.currentTarget);
		if(index == -1) return;
		Manager.view.show(ViewID.ChuangongAwardView, index + 1);
	}

	private onTypeUpdate(e:TrainingEvent):void
	{
		this.invalidate("onTypeUpdateHandler");
	}

	private onTypeUpdateHandler():void
	{
		if(!this._item.parent) Manager.layer.uiImageLayer.addChild(this._item);

		for(let i:number=0; i<this._beiList.length; i++)
		{
			if(i != 1)
				this._beiList[i].visible = false;
			else
			{
				this._beiList[i].visible = true;
				this._selectItem = this._beiList[i];
			}
		}
		
		if(this._selectItem)
		{
			this._selectItem.beiImg.source = "cg_beiImg" + this._model.trainingType + "_png";
			this._selectItem.startCountdown(this._model.trainingEndTime);
		}

		let info:TrainingCVO = TrainingCVO.getInfo(this._model.trainingType);
		let expInfo:TrainingExpCVO = TrainingCVO.getExpInfo(Manager.model.self.attrInfo.level);
		if(info && expInfo)
		{
			this._item.setValue(info.expRatio / 1000 * 100);
			let color:number;
			if(this._model.trainingType == 1)
				color = Color.BLUE;
			else if(this._model.trainingType == 2)
				color = Color.PURPLE;
			else if(this._model.trainingType == 3)
				color = Color.ORANGE;
			// this._item.beiName.text = LangCVO.getContent("training4", info.expRatio / 1000);
			// this._item.beiName.textColor = color;
			HtmlUtil.setTextFlow(this._item.value, LangCVO.getContent("training5", Color.WHITE_STR, expInfo.exp * info.expRatio / 1000));
		}

		Manager.model.getTraining().needInitUpdateView = false;
	}

	private onDataUpdate(e?:TrainingEvent):void
	{
		this.invalidate("onDataUpdateHandler");
	}

	private onDataUpdateHandler():void
	{
		if(this._model.trainingType == 0)
		{
			if(this._item.parent) this._item.parent.removeChild(this._item);
			if(this._time.parent) this._time.parent.removeChild(this._time);

			for(let i:number=0; i<this._beiList.length; i++)
			{
				this._beiList[i].visible = !Manager.model.getTraining().info.isPlayed;
				this._beiList[i].beiImg.source = "cg_beiImg" + (i+1) + "_png";
			}
			if(this._selectItem)
				this._selectItem.resetCountdown();
		}
	}

	private onExpUpdateHandler(e:TrainingEvent):void
	{
		this.timeUpdate(e.params as number);
		if(egret.getTimer() - this._updateExpTime < 10000) return;
		this._updateExpTime = egret.getTimer();

		let time:number = e.params;
		let info:TrainingCVO = TrainingCVO.getInfo(this._model.trainingType);
		let expInfo:TrainingExpCVO = TrainingCVO.getExpInfo(Manager.model.self.attrInfo.level);
		if(info && expInfo)
		{
			this._item.value2.text = StringUtils.getBigNum(time * expInfo.exp * info.expRatio / 1000);
		}
	}

	private timeUpdate(value:number):void
	{
		if(this._item.parent)
		{
			if(!this._time.parent) this.addChild(this._time);
		}
		else
		{
			if(this._time.parent) this.removeChild(this._time);
		}

		this._time.text = cw.DateUtil.formatStr(360 - value, cw.DateUtil.MM_SS);
	}

	public show():void
	{
		this.y = 888;
		Manager.layer.uiImageLayer.addChildAt(this, 0);
	}

	public hide():void
	{
		this.dispose();
	}

	public dispose():void
	{
		super.dispose();
		if(this._item)
			this._item.dispose();
		this._item = null;
		if(this._beiList)
		{
			for(let i:number=0; i<this._beiList.length; i++)
			{
				this._beiList[i].dispose();
				this._beiList[i] = null;
			}
			this._beiList = null;
		}
		if(this._time)
			Manager.pool.push(this._time);
		this._time= null;
		this._model = null;
		if(this._selectItem)
			this._selectItem.dispose();
		this._selectItem = null;
	}
}