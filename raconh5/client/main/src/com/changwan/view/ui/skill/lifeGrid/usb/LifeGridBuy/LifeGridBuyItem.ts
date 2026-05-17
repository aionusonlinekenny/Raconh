class LifeGridBuyItem extends ItemRenderer{
	private _buyBtn:Button;
	private _goods:BaseGoods;
	private _nameTxt:Label;
	private _attrTxt0:Label;
	private _attrTxt1:Label;
	private _numTxt:Label;
	private _copyTxt:Label;
	private _yiyouImg:eui.Image;
	private _numGroup:eui.Group;
	private _cvo:ShopCVO;
	private _self:SelfGameObjectInfo;
	private _itemsModel:ItemsModel;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("lifeGrid/LifeGridBuy", "LifeGridBuyItemSkin");
    }

	protected createChildren():void
    {
        super.createChildren();
		this.configUI();
		this.addEvent();
    }

  
	protected dataChanged():void
    {
        super.dataChanged();
		this._cvo = this.data;
		this.darwData();
    }

    private configUI():void
    {
		this._self = Manager.model.self;
		this._itemsModel = Manager.model.getItems();
    }

    private addEvent():void
    {
		this._self.addEventListener(GameObjectAttrEvent.DESTINY_FRAG, this.onCoinUpdateHandler, this);
		this._buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onbuyClickHandler,this);
		this._itemsModel.addEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.darwData,this);
    }
	private onbuyClickHandler(e:egret.TouchEvent):void
	{
		let frag:number = this._self.attrInfo.destinyfrig;
		if(frag<this._cvo.price)
		{
			FloatTips.addTips(LangCVO.getContent("lifeGrid6"),Color.RED);
			return
		}
		let _itemModel = Manager.model.getItems();
		if(_itemModel.lifeGridTotal-_itemModel.lifeGridBagList.length<1)
		{
			let cbi:CallBackInfo = Manager.pool.create(CallBackInfo, this.onbuyClickCallback, this);
			Manager.tips.showTips(LangCVO.getContent("lifeGrid9"), cbi);
			return;
		}
		let view:LifeGridFuseView = Manager.view.show(ViewID.LifeGridFuseView);
		view.setbuyData(this._cvo);
	}
	private onbuyClickCallback():void
	{
		LifeGridView.view.setTap(LifeGridType.RESOLVE);
	}
	private onCoinUpdateHandler():void
	{
		this.setBuyBtnColor();
	}

    protected removeEvent():void
    {
		this._self.removeEventListener(GameObjectAttrEvent.DESTINY_FRAG, this.onCoinUpdateHandler, this);
		this._buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onbuyClickHandler,this);
		this._itemsModel.removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.darwData,this);
    }

    private darwData(e:BaseEvent=null):void{
		if(e && e.params != ItemsType.LIFEGRIDBAG)
		{
			return;
		}
		let itemCvo:ItemsCVO = ItemsCVO.getCvo(this._cvo.base_id);
		this._goods.setCvo(itemCvo);
		let name:string = HtmlUtil.addColorTag(itemCvo.name+"Lv.1",itemCvo.colorStr);
		HtmlUtil.setTextFlow(this._nameTxt,name);
		let cvo:LifeGridCVO = LifeGridCVO.getInfo(this._cvo.base_id,1);//固定读1级属性，有事找策划
		let attvoArr:AttrVoInfo[] = cvo.attrVos();
		if(attvoArr[0])
		{
			attvoArr[0].sign = "+";
			HtmlUtil.setTextFlow(this._attrTxt0,attvoArr[0].desc(false, Color.GREEN_STR));
		}
		else
		{
			this._attrTxt0.text = "";
		}
		if(attvoArr[1])
		{
			attvoArr[1].sign = "+";
			HtmlUtil.setTextFlow(this._attrTxt1,attvoArr[1].desc(false, Color.GREEN_STR));
		}
		else
		{
			this._attrTxt1.text = "";
		}
		let condit:ConditionVO = new ConditionVO(this._cvo.show_cond);
		

		let arr:ItemsModelInfo[]=[];
		let infoArr:ItemsModelInfo[] = this._itemsModel.lifeGridList;
		for(let info of infoArr)
		{
			if(info) arr.push(info);
		}
		infoArr = this._itemsModel.lifeGridBagList;
		for(let info of infoArr)
		{
			arr.push(info);
		}
		let isyiyou:boolean = false;
		for(let info of arr)
		{
			if(info.base_id == this._cvo.base_id)
			{
				//已有属性
				isyiyou = true;
				break;
			}
		}
		if(isyiyou && itemCvo.condition != "")
		{
			this._numGroup.visible = false;
			this._yiyouImg.visible = true;
			
		}
		else
		{
			this._numGroup.visible = true;
			this._yiyouImg.visible = false;
		}
		this.setBuyBtnColor(); 
		if(condit.isSatisfy())
		{
			this._goods.filters = null;
			this._nameTxt.filters = null;
			this._attrTxt0.filters = null;
			this._attrTxt1.filters = null;
			this._copyTxt.text= "";
			this._numTxt.text = "" + this._cvo.price;
		}
		else
		{
			//未解锁
			this._yiyouImg.visible = false;
			this._numGroup.visible = false;
			FilterUtil.setGrayFilter(this._goods);
			FilterUtil.setGrayFilter(this._nameTxt);
			FilterUtil.setGrayFilter(this._attrTxt0);
			FilterUtil.setGrayFilter(this._attrTxt1);
			this._copyTxt.text = StringUtils.setParam(LangCVO.getContent("lifeGrid4",condit.value2));
		}
    }
	private setBuyBtnColor():void
	{
		let frag:number = this._self.attrInfo.destinyfrig;
		if(frag>=this._cvo.price)
		{
			this._buyBtn.filters = null;
		}
		else
		{
			FilterUtil.setGrayFilter(this._buyBtn);
		}
	}

    public dispose():void
    {
        super.dispose();
		this.removeEvent();
        ObjectUtil.removes(this._numGroup,this._yiyouImg,this._goods);
		ObjectUtil.disposes(this._buyBtn,this._nameTxt,this._attrTxt0,this._attrTxt1,this._numTxt,this._copyTxt);
        this._buyBtn=null;
		Manager.pool.push(this._goods);
		this._goods=null;
		this._nameTxt=null;
		this._attrTxt0=null;
		this._attrTxt1=null;
		this._numTxt=null;
		this._copyTxt=null;
		this._yiyouImg=null;
		this._numGroup=null;
		this._cvo=null;
		this._self=null;
		this._itemsModel=null;
    }
}