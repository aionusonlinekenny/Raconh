/**
 * 神器
 * pzx 
 * create 18.3.8
 */
class RelicStuffView extends UIComponent{
	private _bodyBit:BitmapRemote;
	/** 左箭头 */
	private _leftImg:eui.Image;
	private _rightImg:eui.Image;
	private _hengfuBit:BitmapRemote;
	/** 未激活img */
	private _actImg:eui.Image;
	private _attrImg:eui.Image;
	private _nameBit:BitmapRemote;
/** 碎片组 */
	private _spGroup:eui.Group;
	private _item0:RelicStuffDebrisItem;
	private _item1:RelicStuffDebrisItem;
	private _item2:RelicStuffDebrisItem;
	private _item3:RelicStuffDebrisItem;
	private _actBtn:Button;
	private _redIcon:eui.Image;

	private _datas:RelicStuffCVO[];
	private _curCvo:RelicStuffCVO;
	private _itemList:RelicStuffDebrisItem [];
	/**当前页 */
	private _page:number;
	private _model:RelicStuffModel;

	private _resList:BitmapRemote[];
	private _completeIndex:number;

	private _container:egret.DisplayObjectContainer;
	private _fighting:NumImgView2;
	private _ani:Animation;
	
	private _guideItem:RelicStuffDebrisItem;

	public constructor()
    {
        super();
		this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("relicStuff", "RelicStuffViewSkin");
    }
    protected configUI():void
    {
        super.configUI();
		this._itemList = [this._item0,this._item1,this._item2,this._item3];
		this._resList = [];
		this._model = Manager.model.getrelicstuff();

		if(!this._container)
		{
			this._container= Manager.pool.create(egret.DisplayObjectContainer);
			this._container.x = this._bodyBit.x;
			this._container.y = this._bodyBit.y;
			this.addChild(this._container);
		} 
		if(!this._fighting)
		{
			this._fighting = Manager.pool.create(NumImgView2);
            this._fighting.x = 280;
            this._fighting.y = 899;
			this.addChild(this._fighting);
		}
    }
	protected initData():void
    {
        super.initData();
		this._datas = RelicStuffCVO.cvos();
		for(let i:number = 0;i<this._datas.length;i++)
		{
			this._curCvo = this._datas[i];
			this._page = i;
			if(!this._curCvo.isActivity())
			{
				break;
			}
		}
		this.drawData();
		this.updateGrayFilter();

		//引导
		if(Manager.model.getGuide().curID == GuideID.RELIC_PIECE)
		{
			//碎片1
			this._guideItem = this._itemList ? this._itemList[0] : null;
			if(!this._guideItem || !this._guideItem.visible)
			{
				Manager.control.getTask().hideGuide();
				return;
			}
			let pos = this._guideItem.parent.localToGlobal(this._guideItem.x,this._guideItem.y);
			Manager.control.getTask().showGuide(pos, this._guideItem.width>>1, this._guideItem.height>>1, this.guideCB, this, false);
		}
		if(Manager.model.getGuide().curID == GuideID.RELIC_ACTIVE)
		{
			//碎片2
			this._guideItem = this._itemList ? this._itemList[1] : null;
			if(!this._guideItem || !this._guideItem.visible)
			{
				Manager.control.getTask().hideGuide();
				return;
			}
			let pos = this._guideItem.parent.localToGlobal(this._guideItem.x,this._guideItem.y);
			Manager.control.getTask().showGuide(pos, this._guideItem.width>>1, this._guideItem.height>>1, this.guideCB, this, false);
		}
    }

    protected addEvent():void
    {
        super.addEvent();
		this._leftImg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchUpdatePageHandler,this);
		this._rightImg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchUpdatePageHandler,this);
		this._model.addEventListener(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT,this.onActivityReturn,this);
		this._actBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSendActivityHandler,this);
		this._attrImg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRelicStuffAttrViewHandler,this);
    }

    protected removeEvent():void
    {
		this._leftImg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchUpdatePageHandler,this);
		this._rightImg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchUpdatePageHandler,this);
		this._model.removeEventListener(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT,this.onActivityReturn,this);
		this._actBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSendActivityHandler,this);
		this._attrImg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRelicStuffAttrViewHandler,this);
        super.removeEvent();
    }
	private onRelicStuffAttrViewHandler():void
	{
		Manager.view.show(ViewID.RelicStuffAttrView,this._curCvo);
	}
	//请求升级神器
	private onSendActivityHandler():void
	{
		Manager.control.getRelicstuff().activity(this._curCvo.id,RelicStuffType.RELICSTUFF_TYPE);
	}
	/** 激活成功返回 */
	private onActivityReturn(e:RelicStuffEvent):void
	{
		let type:number = e.params.type;
		this.drawData();
		if(type== RelicStuffType.RELICSTUFF_TYPE)
		{
			this._curCvo = RelicStuffCVO.cvo(e.params.id);
			Manager.view.show(ViewID.RelicStuffCuccessView,this._curCvo);
		}
	}
	private onTouchUpdatePageHandler(e:egret.TouchEvent):void
	{
		let obj = e.target;
		if(obj == this._leftImg)
		{
			if(this._page== 0)
			{
				return;
			}
			this._page--;
			
		}
		if(obj == this._rightImg)
		{
			if(this._page>= this._datas.length-1)
			{
				return;
			}
			this._page++;
		}
		this._curCvo = this._datas[this._page];
		this.drawData();
		this.updateGrayFilter();
	}
	private updateGrayFilter():void
	{
		if(this._page == 0) 
		{
			FilterUtil.setGrayFilter(this._leftImg);
		}
		else if(this._leftImg.filters) 
		{
			this._leftImg.filters = null;
		}

		if(this._page == this._datas.length-1) 
		{
			FilterUtil.setGrayFilter(this._rightImg);
		}
		else if(this._rightImg.filters) 
		{
			this._rightImg.filters = null;
		}
	}
 	private clearAni():void
    {
        if(this._ani)
		{
			Manager.pool.push(this._ani);
			this._ani = null;
		}
    }

    private drawData():void{

		this._nameBit.load(Manager.path.getRelicStuffPath("label/name"+this._curCvo.id));
		this._hengfuBit.load(Manager.path.getRelicStuffPath("label/zi"+this._curCvo.id));
		
		this._fighting.setValue(this._curCvo.getFightNum(), "nums_fighting_", 25);
		this._redIcon.visible = false;
		this._actBtn.visible = false;
		this.updateDebrisList();
		this.clearAni();
		if(this._curCvo.isActivity())
		{
			//已激活
			//Manager.view.show(ViewID.RelicStuffCuccessView,this._curCvo);
			this._spGroup.visible = true;
			this._actImg.visible = false;
			this._bodyBit.visible = false;
			let arr:string[] = this._curCvo.ani_id.split("/");
			this._ani = Manager.animation.createPanelGlobalAnimation(this._curCvo.ani_id,arr[arr.length-1]);
			this._ani.y = 116;
			this._ani.x = 5;

			let points:string[] = this._curCvo.point.split("|");
			this._ani.x = this._ani.x + Number(points[0]);
			this._ani.y = this._ani.y + Number(points[1]);
			this.addChildAt(this._ani,3);
			this._container.visible = false;
		}
		else
		{
			this._container.visible = true;
			this._bodyBit.visible = true;
			this._bodyBit.load(Manager.path.getRelicStuffPath("body/body" + this._curCvo.id));
			this._actImg.visible = true;
			if(this._curCvo.checkIsActivity())
			{
				this._actBtn.visible = true;
				this._spGroup.visible = false;
				this._redIcon.visible = true;
			}
			else
			{
				//this.updateDebrisList();
				this._spGroup.visible = true;
			}
		}
    }
	//刷新碎片
	private updateDebrisList():void
	{
		let list:RelicStuffDebrisCVO[]= this._curCvo.getDebrisList();
		//this._completeIndex = 0;
		for(let i:number = this._itemList.length -1;i>-1;i--)
		{
			let item = this._itemList[i];
			if(list[i])
			{
				item.setData(list[i]);
				item.visible = true;
				if(list[i].isActivity())
				{
					//this._completeIndex++;
					this.updateBody(list[i],i);
				}
				else
				{
					if(this._resList[i])
					{
						Manager.pool.push(this._resList[i]);
						this._resList[i] = null;
					}
				}
			}
			else
			{
				item.visible = false;
			}
		}
		if(this._itemList.length>2)
		{
			this._spGroup.y = 998;
		}
		else
		{
			this._spGroup.y = 1018;
		}
		
	}

	private updateBody(cvo:RelicStuffDebrisCVO,i:number):void
	{
		let res:BitmapRemote;
		if(this._resList[i])
		{
			res = this._resList[i];
		} 
		else
		{
			res = Manager.pool.create(BitmapRemote);
			this._resList[i] = res;
			res.x = 0;
			res.y = 0;
			this._container.addChild(res);
		}	
		res.load(Manager.path.getRelicStuffPath("debris/debris"+cvo.des_id));		
		//res.load(Manager.path.getRelicStuffPath("debris/debris"+this.cvo.id),-1,-1,this.completeBitres,this);
	}
	// public completeBitres():void
	// {
	// 	this._completeIndex--;
	// 	if(this._completeIndex== 0)
	// 	{
	// 		this._container= Manager.pool.create(egret.DisplayObjectContainer);
	// 		for(let i:number = this._resList.length-1;i>-1;i--)
	// 		{
	// 			let res:BitmapRemote = this._resList[i];
	// 			if(res && res.getBitmap())
	// 			{
	// 				this._container.addChild(res);
	// 			}
	// 		}
	// 		this.drawBitmap();
	// 	}
	// }
	// private drawBitmap():void
	// {
	// 	let renderTexture = new RenderTexture();
	// 	renderTexture.drawToTexture(this._container);
		
	// 	if(this._bitmap.texture) this._bitmap.texture.dispose();
	// 	this._bitmap.texture = renderTexture;
	// 	this._bitmap.pixelHitTest = true;

	// 	if(this._container) Manager.pool.push(this._container);
	// 	this._container = null;
	// }
	/**引导激活墨宠 */
	public guideActPet():void
	{
		if(Manager.model.getGuide().curID == GuideID.RELIC_ACTIVE)
		{
			let pos = this._actBtn.parent.localToGlobal(this._actBtn.x,this._actBtn.y);
			Manager.control.getTask().showGuide(pos, this._actBtn.width>>1, this._actBtn.height>>1,this.callBack,this,false);
		}
	}

	private callBack():void
	{
		this.onSendActivityHandler();
		Manager.control.getTask().hideGuide();
	}

    public reuse():void
    {
        super.reuse();
       
    }

    public unuse():void
    {
        super.unuse();
		this.clear();
    }
	
	private clear(isRemove:boolean=false):void
	{
		if(isRemove)
		{
			ObjectUtil.disposes(this._bodyBit,this._hengfuBit,this._nameBit,this._actBtn);
			ObjectUtil.removes(this._leftImg,this._rightImg,this._actImg,this._attrImg,this._spGroup,this._redIcon)
		}
		this._bodyBit=null;
		this._leftImg=null;
		this._rightImg=null;
		this._hengfuBit=null;
		this._actImg=null;
		this._attrImg=null;
		this._nameBit=null;
		this._spGroup=null;
		this._item0=null;
		this._item1=null;
		this._item2=null;
		this._item3=null;
		this._actBtn=null;
		this._redIcon=null;

		this._datas=null;
		this._curCvo=null;
		this._itemList.forEach((item,i)=>{
			Manager.pool.push(item);
		})
		this._itemList=null;
		this._model=null;
		this._resList.forEach((itm,i)=>{
			if(itm)
			Manager.pool.push(itm);
		})
		this._resList=null;

		this._container=null;
		Manager.pool.push(this._fighting);
		this._fighting=null;
		this.clearAni();
		if(this._guideItem) Manager.pool.push(this._guideItem);
		this._guideItem = null;
	}

	private guideCB():void
	{
		Manager.view.show(ViewID.RelicStuffAttrView, this._guideItem.cvo);
	}

    public dispose():void
    {
		if(Manager.model.getGuide().curID == GuideID.RELIC_PIECE || Manager.model.getGuide().curID == GuideID.RELIC_ACTIVE)
		{
			Manager.control.getTask().hideGuide();
		}
        super.dispose();
        this.clear(true);
    }
}