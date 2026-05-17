/**
 * pzx 
 * 命格分解
 */
class LifeGridSeparate extends UIComponent{
	private _vScroller:egret.ScrollView;
	private _currentView:egret.DisplayObjectContainer;
	private _list:LifeGridSeparateItem[];
	private _itemModel:ItemsModel;
	private _splerBtn:Button;
	private _checkBox0:CheckBox;
	private _checkBox1:CheckBox;
	private _checkBox2:CheckBox;
	private _checkBox3:CheckBox;
	private _model:LifeGridModel;
	private _soulTxt:Label;
	private _sepatateTxt:Label;
	private _bosGroup:eui.Group;
	/** 特效数 */
	private _effnum:number;
	private _redIcon:eui.Image;
	public constructor()
    {
        super();
		this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("lifeGrid/LifeGridSeparate", "LifeGridSeparateViewSkin");
		this._list = [];
    }
    protected configUI():void
    {
        super.configUI();
		this._currentView = Manager.pool.create(egret.DisplayObjectContainer);
		this._vScroller = new egret.ScrollView();
		this._vScroller.x = 15;
		this._vScroller.y =297;
		this._vScroller.width = 700;
		this._vScroller.height = 595;
		this._vScroller.horizontalScrollPolicy = "off"
		this._vScroller.setContent(this._currentView);
		this.addChild(this._vScroller);
		this._vScroller.scrollSpeed = 0.01;
		this._itemModel = Manager.model.getItems();
		this._model = Manager.model.getLifeGrid();
		this._sepatateTxt.text ="";
    }

    protected addEvent():void
    {
        super.addEvent();
		this._currentView.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclickItemHnadler,this);
		this._splerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickSeparateHandler,this);
		this._model.addEventListener(LifeGridEvent.LIFEGRID_SEPARATE_EVENT,this.onReturnSeparateHandler,this);
		this._bosGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCheckBoxHandler,this);
	
    }

    protected removeEvent():void
    {
        super.removeEvent();
		this._currentView.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclickItemHnadler,this);
		this._splerBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickSeparateHandler,this);
		this._model.removeEventListener(LifeGridEvent.LIFEGRID_SEPARATE_EVENT,this.onReturnSeparateHandler,this);
		this._bosGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCheckBoxHandler,this);
    }
	private onCheckBoxHandler(e:egret.TouchEvent):void
	{
		this.separateFileGrid();
	}
	private onReturnSeparateHandler():void
	{
		this.darwData();
		this._checkBox0.selected = false;
		this._checkBox1.selected = false;
		this._checkBox2.selected = false;
		this._checkBox3.selected = false;
		for(let item of this._list)
		{
			if(item.visible)
			{
				item.setCheck(false);
			}
		}
		this.getSnolNum();
	}
	private onShowBlastCompleteHandler():void
	{
		this._effnum--;
		if(this._effnum==0)
		{
			let numArr:number[] = [];
			for(let item of this._list)
			{
				if(item.visible && item.statu)
				{
					numArr.push(item.itemId);
				}
			}
			Manager.control.getLifeGrid().separate(numArr);
			this._splerBtn.touchEnabled = true;
		}
	}
	private onClickSeparateHandler(e:egret.TouchEvent):void
	{
		this._effnum = 0;
		for(let item of this._list)
		{
			if(item.visible && item.statu)
			{
				this._effnum++;
				item.playAniEff();
			}
		}
		if(this._effnum>0)
		{
			this._splerBtn.touchEnabled = false;
		}
	}
	private separateFileGrid():void
	{
		let colorArr:number[] = [];//品色   绿色=2 蓝色=3  紫色=4   橙色=5
		if(this._checkBox0.selected)
		{
			colorArr.push(5);
		}
		if(this._checkBox1.selected)
		{
			colorArr.push(4);
		}
		if(this._checkBox2.selected)
		{
			colorArr.push(3);
		}
		if(this._checkBox3.selected)
		{
			colorArr.push(6);
		}
		if(colorArr.length>0)
		{
			let arr:number[]=[];
			let infoArr:ItemsModelInfo[] = this._itemModel.lifeGridBagList;
			for(let info of infoArr)
			{
				let cvo:ItemsCVO = info.cvo;
				for(let color of colorArr)
				{
					if(cvo.quality == color)
					{
						arr.push(info.id);
						break;
					}
				}
			}

			for(let item of this._list)
			{
				if(item.visible)
				{
					let boo:boolean= false;
					for(let id of arr)
					{
						if(item.itemId == id) 
						{
							boo = true;
							break;
						}
					}
					item.setCheck(boo);
				}
			}

		}
		else
		{
			for(let item of this._list)
			{
				if(item.visible) item.setCheck(false);
			}
		}
		this.getSnolNum();
			
	}
	private getSnolNum():void
	{
		let num:number=0;
		for(let item of this._list)
		{
			if(item.visible && item.statu)
			{
				let cvo:LifeGridCVO = item.cvo;
				let loss:GainLossVO = new GainLossVO(cvo.sep_gain);
				num += loss.num
			}
		}
		this._sepatateTxt.text = "+" + num;
	}
	private onclickItemHnadler(e:egret.TouchEvent):void
	{
		let any:any = e.target;
		if(any instanceof LifeGridSeparateItem)
		{
			let item:LifeGridSeparateItem = any;
			item.setEffectImg()
			this.getSnolNum();
		}
	}

    protected initData():void
    {
        super.initData();
		this.darwData();
    }

    private darwData():void{
		let arr:ItemsModelInfo[] = this._itemModel.lifeGridBagList;
		arr = ArrayUtil.sortOn(arr,["pos"]);
		let ln:number = arr.length>this._list.length?arr.length:this._list.length;
		for(let i:number = 0;i<ln;i++)
		{
			let item:LifeGridSeparateItem;
			if(this._list[i]===undefined)
			{
				item = Manager.pool.create(LifeGridSeparateItem);
				item.x = i%3 * (item.width+10);
				item.y = Math.floor(i/3) * (item.height+10);
				this._currentView.addChild(item);
				this._list.push(item);
				item.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this)
			}
			else
			{
				item = this._list[i];
			}
			if(arr[i])
			{
				let info:ItemsModelInfo = arr[i];
				item.visible = true;
				item.setData(info);
			}
			else
			{
				item.clear();
				item.visible = false;

			}
		}
		let h:number =Math.floor(arr.length/3)+1;
		this._currentView.height = h*250;
		this._vScroller.scrollTop = 0;

		this._soulTxt.text = "" + Manager.model.self.attrInfo.soul;
		this.getSnolNum();
		this._redIcon.visible = this._model.checkSeparate();
    }

    public reuse():void
    {
        super.reuse();
       
    }

    public unuse():void
    {
        super.unuse();
       
    }

    public dispose():void
    {
        super.dispose();
		this._vScroller.removeContent();
        ObjectUtil.removes(this._vScroller,this._bosGroup,this._redIcon);
		ObjectUtil.disposes(this._splerBtn,this._checkBox0,this._checkBox1,this._checkBox2,this._checkBox3,
		this._soulTxt,this._sepatateTxt);

		this._list.forEach((item,i)=>
		{
			item.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this)
			item.dispose();
		})
        this._vScroller=null;
		Manager.pool.push(this._currentView);
		this._currentView=null;
		this._list=null;
		this._itemModel=null;
		this._splerBtn=null;
		this._checkBox0=null;
		this._checkBox1=null;
		this._checkBox2=null;
		this._checkBox3=null;
		this._model=null;
		this._soulTxt=null;
		this._sepatateTxt=null;
		this._bosGroup=null;
		this._redIcon = null;
    }
}