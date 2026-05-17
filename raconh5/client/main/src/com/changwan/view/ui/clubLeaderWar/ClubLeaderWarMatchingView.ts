/**
 * 盟主战匹配
 */
class ClubLeaderWarMatchingView extends UIComponent
{
	/**内容高度 */
	private static ITEM_HEIGHT:number = 50;
	/**内容数量 */
	private static ITEM_NUMS:number = 6;
	/**内容移动间距 */
	private static ITEM_MOVE_STEP:number = 5;
	/**内容移动帧间隔 */
	private static ITEM_MOVE_FRAME1:number = 5;
	private static ITEM_MOVE_FRAME2:number = 20;
	/**滚动停止时间 */
	private static STOP_TIME:number = 2000;
	/**关闭界面时间 */
	private static CLOSE_VIEW_TIME:number = 2000;

	/**内容 */
	private _data:Array<string>;
	/**内容提取定位 */
	private _dataLocal:number;
	/**是否需要停止 */
	private _isStop:boolean;
	/**停止位置 */
	private _stopIndex:number;

	private _items:eui.Group;

	private _itemList:Array<ClubLeaderWarMatchingItem>;
	private _sp:egret.Sprite;

	private _showType:number;

	public static TYPE_CLUB_LEADER_WAR:number = 1;
	public static TYPE_FIRE_EYE:number = 2;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("clubLeaderWar", "ClubLeaderWarMatchingViewSkin");
		this.visible = false;
		this.touchChildren = true;
	}

	protected configUI():void
	{
		super.configUI();

		this.visible = true;

		this._sp = new egret.Sprite();
		this._sp.graphics.beginFill(0,1);
		this._sp.graphics.drawRect(0,0,this._items.width,this._items.height);
		this._sp.graphics.endFill();
		this._sp.x = this._items.x;
		this._sp.y = this._items.y;
		this._items.parent.addChild(this._sp);
		this._items.mask = this._sp;

		this._itemList = [];
		for(let i:number=0; i<ClubLeaderWarMatchingView.ITEM_NUMS; i++)
		{
			let item:ClubLeaderWarMatchingItem = new ClubLeaderWarMatchingItem();
			item.y = i * ClubLeaderWarMatchingView.ITEM_HEIGHT;
			this._items.addChild(item);
			this._itemList.push(item);
		}

		this.onResizeHandler();
	}

	protected initData():void
	{
		this._data = [];
		for(let i:number=0; i<9; i++)
		{
			this._data.push(LangCVO.getContent("clubLeaderWar1" + (i+1)));
		}
		this._stopIndex = 0;

		this._isStop = false;
		let local:number = 0;
		for(let i:number=0; i<this._itemList.length; i++)
		{
			this._dataLocal = local;
			if(this._dataLocal >= this._data.length)
			{
				local = 0;
				this._dataLocal = local;
			}
			this._itemList[i].setValue( this._data[this._dataLocal] );
			local += 1;
		}
		Manager.render.add(this.run, this, ClubLeaderWarMatchingView.ITEM_MOVE_FRAME1);
		if(this._showType == ClubLeaderWarMatchingView.TYPE_CLUB_LEADER_WAR)
			Manager.render.add(this.stop, this, ClubLeaderWarMatchingView.STOP_TIME);
	}

	private run():void
	{
		for(let i:number=0; i<this._itemList.length; i++)
		{
			this._itemList[i].y -= ClubLeaderWarMatchingView.ITEM_MOVE_STEP;
			if(this._itemList[i].y <= -ClubLeaderWarMatchingView.ITEM_HEIGHT)
			{
				this._itemList[i].y = ClubLeaderWarMatchingView.ITEM_HEIGHT * (ClubLeaderWarMatchingView.ITEM_NUMS - 1);

				this._dataLocal += 1;
				if(this._dataLocal >= this._data.length) this._dataLocal = 0;
				this._itemList[i].dataIndex = this._dataLocal;
				this._itemList[i].setValue( this._data[this._dataLocal] );
			}

			if(this._isStop)
			{
				if(this._itemList[i].dataIndex == this._stopIndex && this._itemList[i].y == ClubLeaderWarMatchingView.ITEM_HEIGHT * 2)
				{
					Manager.render.remove(this.run, this);
					if(this._showType == ClubLeaderWarMatchingView.TYPE_CLUB_LEADER_WAR)
						Manager.render.add(this.waitClose, this, ClubLeaderWarMatchingView.CLOSE_VIEW_TIME);
					else if(this._showType == ClubLeaderWarMatchingView.TYPE_FIRE_EYE)
						Manager.render.add(this.waitCloseII, this, 1000);
					this._isStop = false;
				}
			}
		}
	}

	public stop():void
	{
		this._isStop = true;
		Manager.render.remove(this.stop, this);
		Manager.render.remove(this.run, this);
		if(this._showType == ClubLeaderWarMatchingView.TYPE_FIRE_EYE)
		{
			this._stopIndex = Math.floor(this._itemList.length * Math.random());
		}
		Manager.render.add(this.run, this, ClubLeaderWarMatchingView.ITEM_MOVE_FRAME2);
	}

	private waitClose():void
	{
		Manager.control.getClubLeaderWar().matchingQuery();
		Manager.render.remove(this.waitClose, this);
		Manager.view.hide(ViewID.ClubLeaderWarMatchingView);
        // Manager.layer.panelDarkLayer.visible = false;
		// Manager.layer.uiLayer.visible = false;
        // Manager.layer.effectLayer.visible = false;
        Manager.view.hide(ViewID.ClubPanel);
        ObjectUtil.remove(Manager.layer.panelDarkLayer);
        ObjectUtil.remove(Manager.layer.uiLayer);
        ObjectUtil.remove(Manager.layer.effectLayer);
	}
	/**火眼金睛匹配成功 */
	private waitCloseII():void
	{
		Manager.link.link(LinkType.PANEL_FIRE_EYE, 1);
		Manager.render.remove(this.waitCloseII, this);
		Manager.view.hide(ViewID.ClubLeaderWarMatchingView);
	}

	protected addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
	}

	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		super.removeEvent();
	}

	private onResizeHandler(e?:GlobalEvent):void
	{
		this.width = Manager.global.gameMain.stage.stageWidth;
	}

	public show(type:number = ClubLeaderWarMatchingView.TYPE_CLUB_LEADER_WAR):void
	{
		this._showType = type;
		Manager.layer.tipsLayer.addChild(this);
	}

	public hide():void
	{
		this.dispose();
	}

	public dispose():void
	{
		Manager.render.remove(this.run, this);
		Manager.render.remove(this.stop, this);
		Manager.render.remove(this.waitClose, this);
		super.dispose();
		ObjectUtil.removes(this._items, this._sp);
		this._data = null;
		this._items = null;
		if(this._itemList)
		{
			for(let i:number=0; i<this._itemList.length; i++)
			{
				this._itemList[i].dispose();
				this._itemList[i] = null;
			}
			this._itemList = null;
		}
		this._sp = null;
	}
}