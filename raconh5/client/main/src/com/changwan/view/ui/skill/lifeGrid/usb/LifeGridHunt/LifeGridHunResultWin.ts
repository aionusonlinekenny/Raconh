/**
 * pzx 
 * 猎命结果
 * 17-12-29
 */
class LifeGridHunResultWin extends UIComponent implements IViewManager
{
    protected _back:ResultWinBack;
	protected _goodItems:Array<LifeGridHunResultItem> = [];
	protected _infos:Array<ItemsModelInfo>;
	private _type:number;

	protected _group:eui.Group;
	protected _lossTxt0:Label;
	protected _hontTenBtn:Button;

	protected _vScroller:egret.ScrollView;
	protected _currentView:egret.DisplayObjectContainer;

	private _resImg0:eui.Image;
	private _item1:LifeGridHunResultItem;
	private _item2:LifeGridHunResultItem;
	private _itemGroup:eui.Group;

    
    public constructor()
    {
        super();
		this.touchChildren = true;
		this.setskinname();
    }
	protected setskinname():void
	{
         this.skinName = Manager.path.getSkinName("lifeGrid/LifeGridHunt", "LifeGridHunResultWinSkin");
	}
	protected configUI():void
	{
		super.configUI();
		this._back.titleImg.source = "lifeGrid_gxhd_png";
		this._back.setTxt("")

		this._currentView = Manager.pool.create(egret.DisplayObjectContainer);

		this._vScroller = new egret.ScrollView();
		this._vScroller.x = 50;
		this._vScroller.y =130;
		this._vScroller.width = 600;
		this._vScroller.height = 345;
		this._vScroller.horizontalScrollPolicy = "off"
		this._vScroller.setContent(this._currentView);
		this.addChild(this._vScroller);
		this._vScroller.scrollSpeed = 0.01;
	}

    /** 
	 * @param value 猎命类型
    */
    public show(infos:Array<ItemsModelInfo>,value:number):void
    {
		this._infos = infos;
		this._type = value;
        if(this.parent == null)
        {
            this.x = (Manager.config.gameWidth - this.width) >> 1;
            this.y = 213;
            Manager.layer.tipsLayer.addChild(this);
        }
        this.invalidate(InvalidationType.DATA);
    }

	protected draw():void
	{
		super.draw();
		if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawData();
    }

    protected drawData():void
    {
		if(this._type == 1||this._type==2||this._type == 3) 
		{
			this.drawData2()
			return;
		}
		var goodsLen:number = this._goodItems.length;
		var infosLen:number = this._infos.length;
		var max:number = goodsLen > infosLen ? goodsLen : infosLen;

		var lineMaxCount:number = 4;//单行最多个数
		var dis:number = 128;//两个的位置差
		var item:LifeGridHunResultItem;
		for(var i:number=0; i<max; i++)
		{
			if(i<infosLen)
			{
				if(i >= goodsLen) 
				{
					item = Manager.pool.create(LifeGridHunResultItem);
					this._currentView.addChild(item);
					this._goodItems.push(item);
				}
				this._goodItems[i].x =  (i%lineMaxCount)*dis;
				this._goodItems[i].y =  Math.floor(i/lineMaxCount)*182;
				this._goodItems[i].setData(this._infos[i]);
				this._goodItems[i].playAniEff();
			}
			else
			{
				Manager.pool.push(Goods);
			}
		}
		this.setHuntTen();
	
    }
	private drawData2():void
    {
		this._group.visible = false;
		this._back.btn.x = 237;
		this._itemGroup.visible = true;
		this._currentView.visible = false;
		for(let i:number = 0 ;i<2;i++)
		{
			let j:number = i+1;
			if(this._infos[i])
			{
				this["_item"+j].setData(this._infos[i]);
			}
			else
			{
				this["_item"+j].visible = false;
			}
		}
	}

	private setHuntTen():void
	{
		this._itemGroup.visible = false;
		this._currentView.visible = true;
	    this._group.visible = true;
		this._back.btn.x = 65;
	   let cvos1:LifeGridHuntCvoInfo = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_TEN_ITEM);
       let loss1:GainLossVO = new GainLossVO(cvos1.loss);
       if(loss1.isEnough())
       {
           this._resImg0.source = "LifeGrid_Item_png";
		   this._lossTxt0.text = "" + loss1.num;
           //this._lossTxt0.text = loss1.selfCount + "/" + loss1.num;
       }
       else
       {
           this._resImg0.source = "playRes_gold_54_png";
           cvos1 = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_TEN_CVO);
           loss1 = new GainLossVO(cvos1.loss);
		   this._lossTxt0.text = "" + loss1.num;
           //this._lossTxt0.text = loss1.selfCount + "/" + loss1.num;
        //    if(!loss1.isEnough())
        //    {
        //        let str:string = HtmlUtil.addColorTag("" + loss1.selfCount,Color.RED_STR)+"/" + loss1.num;
        //        HtmlUtil.setTextFlow(this._lossTxt0,str);
        //    }
       }
	   this._lossTxt0.width = this._lossTxt0.textWidth;
	}

    public hide():void
    {
        this.dispose();
    }

    protected addEvent():void
    {
        super.addEvent();

        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._back.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._back.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		this._hontTenBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();

        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._back.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._back.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		this._hontTenBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}

	private onbuyClickCallback():void
	{
		LifeGridView.view.setTap(LifeGridType.RESOLVE);
	}

	protected onClickHandler(e:egret.TouchEvent):void
	{
		let btn = e.target;
		if(btn == this._hontTenBtn)
		{
			let _itemModel = Manager.model.getItems();
			if(_itemModel.lifeGridTotal-_itemModel.lifeGridBagList.length<10)
            {
				let cbi:CallBackInfo = Manager.pool.create(CallBackInfo, this.onbuyClickCallback, this);
                Manager.tips.showTips(LangCVO.getContent("lifeGrid9"), cbi);
				Manager.view.hide(ViewID.LifeGridHunResultWin);
                return;
            }
            let cvos1:LifeGridHuntCvoInfo = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_TEN_ITEM);
            let loss1:GainLossVO = new GainLossVO(cvos1.loss);
            if(loss1.isEnough())
            {
                Manager.control.getLifeGrid().hount(5);
            }
            else
            {
                cvos1 = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_TEN_CVO);
                loss1 = new GainLossVO(cvos1.loss);
                if(loss1.isEnough())
                {
                    Manager.control.getLifeGrid().hount(4);
                }
                else{
                    FloatTips.addTips(LangCVO.getContent("common33"),Color.RED);
                }
            }
			return;
		}
		Manager.view.hide(ViewID.LifeGridHunResultWin);
	}

	public dispose():void
	{
      
		super.dispose();
		for(var i:number=this._goodItems.length-1; i>=0; i--)
        {
            Manager.pool.push(this._goodItems[i]); 
        }
		this._goodItems = null;
		
		this._infos = null;

		this._back.dispose();
		this._back = null;

		this.removeChild(this._group);
		this._group = null;
		this._lossTxt0.dispose();
		this._lossTxt0 = null;
		this._hontTenBtn.dispose();
		this._hontTenBtn = null;

		this._vScroller.removeContent();
		this.removeChild(this._vScroller);
		this._vScroller = null;
		Manager.pool.push(this._currentView)
		this._currentView = null;

		this.disposedraw();
	}
	protected disposedraw():void
	{
		 this._resImg0.parent.removeChild(this._resImg0);
		 this._resImg0 = null;
		 this._item1.dispose();
		this._item2.dispose();
		this._item1 = null;
		this._item2 = null;
		this.removeChild(this._itemGroup);
		this._itemGroup =null;
	}
}