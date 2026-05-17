/**
 * pzx 
 * 17.12.18
 * 预告
 */
class SysNoticeView extends UIComponent
{
	private _item1:BaseGoods;
	private _item2:BaseGoods;
	private _linchunBtn:Button;
	private _redIcon:eui.Image;
	private _taskModel:TaskModel;
	private _model:SysnoticeModel;

	private _vScroller:egret.ScrollView;
	private _currentView:egret.DisplayObjectContainer;
	private _list:Array<SysNoticItem>;
	private _item:SysNoticItem;
	//领取img
	private _ilingquImg:eui.Image;

	public constructor() 
	{
		super();
		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("sysnotice", "SysnoticeViewSkin");
	}
	protected configUI():void
	{
		super.configUI();
		this._model = Manager.model.getSysnotice();
		this._taskModel = Manager.model.getTask();

		this._currentView = Manager.pool.create(egret.DisplayObjectContainer);

		this._vScroller = new egret.ScrollView();
		this._vScroller.x = 25;
		this._vScroller.y =121;
		this._vScroller.width = 690;
		this._vScroller.height = 861;
		this._vScroller.horizontalScrollPolicy = "off";
		this._vScroller.setContent(this._currentView);
		this.addChild(this._vScroller);
		this._vScroller.scrollSpeed = 0.01;

		//引导
		if(Manager.model.getGuide().curID == GuideID.SYS_NOTICE) 
		{
			let pos:egret.Point = this._linchunBtn.parent.localToGlobal(this._linchunBtn.x,this._linchunBtn.y);
			Manager.control.getTask().showGuide(pos, this._linchunBtn.width>>1, this._linchunBtn.height>>1,
												this.guideCB, this, false);
		}
	}
	protected addEvent():void
	{
		super.addEvent();
		this._currentView.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickItemHandler,this);
		this._linchunBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onlinchunBtnChangeHandler,this);
		this._model.addEventListener(SysnoticeEvent.SYSNOTICE_UPDATE_REWARD_EVENT,this.setRedIconShow,this);
	}
	protected removeEvent():void
	{
		this._currentView.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickItemHandler,this);
		this._linchunBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onlinchunBtnChangeHandler,this);
		this._model.removeEventListener(SysnoticeEvent.SYSNOTICE_UPDATE_REWARD_EVENT,this.setRedIconShow,this);
		super.removeEvent();
	}
	private setRedIconShow(e:SysnoticeEvent):void
	{
		let taskId:number = e.params;
		if(this._item.getCvo().taskId == taskId)
		{
			this._redIcon.visible = false;
			this._item.setReadIconShow(false);
			this._linchunBtn.visible = false;
			this._ilingquImg.visible = true;
			let i:number = this._list.indexOf(this._item);
			let item:SysNoticItem = this._list[i+1];
			if(item)
			this.setItemStatus(item);
		}
		else
		{
			for(let item of this._list)
			{
				if(item.getCvo().taskId == taskId)
				{
					item.setReadIconShow(false);
				}
			}
		}
	}
	protected initData():void
	{
		super.initData();
		if(this._model.getStsList())
		{
			this.updateView();
		}

	}

	private updateView():void
	{
		let arr:Array<SysNoteiceCVO> = this._model.getStsList();
		let ln :number = arr.length;
		let item:SysNoticItem;
		let boo:boolean = true;
		let rewardItem:SysNoticItem;
		if(this._list== null)
		{
			this._list = [];
		}
		for(let i:number = 0;i<ln;i++)
		{
			if(this._list[i]==null)
			{
				this._list[i] = Manager.pool.create(SysNoticItem);
				this._list[i].x =  i%4 * 170;
				this._list[i].y = Math.floor(i/4) * 210;
				this._currentView.addChild(this._list[i]);
			}
			item = this._list[i];
			item.setData(arr[i]);
			if(boo)
			{
				if(arr[i].state==0)
				{
					if(Manager.model.getTask().getTaskIdComplete(arr[i].open_task_id))
					{
						rewardItem = item;
						boo = false;
					}
				}
			}
		}
		if(this._item==null)
		{
			if(rewardItem)
			{
				this.setItemStatus(rewardItem);
			}
			else
			this.setItemStatus(this._list[0]);
		}
	}

	protected onClickItemHandler(e:egret.TouchEvent):void
	{
		let item:any = e.target;
		if(item instanceof SysNoticItem)
		{
			this.setItemStatus(item);
		}
	}

	private setItemStatus(item:SysNoticItem):void
	{
		if(this._item)
		{
			if(item == this._item) return;
			this._item.statusEffectImg(false);
		}
		item.statusEffectImg(true);
		this._item = item;
		let arr:Array<string> = this._item.getCvo().reward.split("|");
		for(let i:number = 0;i<arr.length;i++)
		{
			let j:number = i+1;
			let good:BaseGoods =this["_item"+j];
			if(arr[i]!="")
			{
				let loss:GainLossVO = new GainLossVO(arr[i]);
				good.baseId = loss.baseId;
				good.count = loss.num;
			}
			else
			{
				good.clear();
			}
		}
		let scvo:SysNoteiceCVO = this._item.getCvo();
		if(scvo.state == 1)
		{
			this._redIcon.visible = false;
			this._linchunBtn.visible = false;
			this._ilingquImg.visible = true;
		}
		else
		{
			this._redIcon.visible = this._taskModel.getTaskIdComplete(scvo.open_task_id);
			this._linchunBtn.visible = this._redIcon.visible;
			this._ilingquImg.visible = false;
		}
	}
	
	protected onlinchunBtnChangeHandler(e:egret.TouchEvent):void
	{
		if(e != null && Manager.model.getGuide().curID == GuideID.SYS_NOTICE) return;
		Manager.control.getSysnotice().reward(this._item.getCvo().taskId);
		if(this._item.getCvo().panelId.length>0)
		{
			Manager.link.linkStr(this._item.getCvo().panelId);
		}
	}

	private guideCB():void
	{
		this.onlinchunBtnChangeHandler(null);
		Manager.control.getTask().hideGuide();
	}

	public dispose()
	{
		if(Manager.model.getGuide().curID == GuideID.SYS_NOTICE) Manager.control.getTask().hideGuide();
		super.dispose();
		this._item=null;
		this._list.forEach((item,i)=>{
			Manager.pool.push(item);
		});
		this._list = null;
		Manager.pool.push(this._item1);
		this._item1 = null;
		Manager.pool.push(this._item2);
		this._item2 = null;
		this._linchunBtn.dispose();
		this._linchunBtn=null
		this.removeChild(this._redIcon);
		this._redIcon = null;
		this.removeChild(this._vScroller);
		this._vScroller.removeContent();
		this._vScroller=null;
		Manager.pool.push(this._currentView);
		this._currentView=null
		this._taskModel= null;
		this._model = null;
	}
}