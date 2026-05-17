/**
 * pzx
 * 命格融合 与 兑换 view
 * 17-12-28
 */
class LifeGridFuseView extends PopUpView{
   
    private _attrTxt0:Label;
	private _attrTxt1:Label;
	private _attrTxt2:Label;
	private _attrTxt3:Label;

	private _goods1:BaseGoods;
	private _goods2:BaseGoods;
	private _nameTxt1:Label;
	private _nameTxt2:Label;
	/**融合 */
	private _rhBtn:Button;

	private _cvo1:LifeGridCVO;
	private _cvo2:LifeGridCVO;
	private _pos:number;
	private _itemId:number;

	private _lifeGroup:eui.Group;
	private _rightGroup:eui.Group;
	private _group1:eui.Group;
	private _shopCvo:ShopCVO;
	private _losseTxt:Label;
	private _buyBtn:Button;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("lifeGrid/lifegridview", "LifeGridFuseViewSkin");
    }
	protected addEvent():void
    {
         this._rhBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclickHandler,this);
		 this._buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBuyLifeGridHandler,this);
        super.addEvent();
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._rhBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclickHandler,this);
		this._buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBuyLifeGridHandler,this);
    }
	private onBuyLifeGridHandler(e:egret.TouchEvent):void
	{
		Manager.control.getShop().buy(this._shopCvo.id,this._shopCvo.shop_type,1);
		Manager.view.hide(ViewID.LifeGridFuseView);
	}
    private onclickHandler(e:egret.TouchEvent):void
    {
		Manager.control.getLifeGrid().ware(this._itemId,this._pos);
        Manager.view.hide(ViewID.LifeGridFuseView);
    }
	protected onTouchCloseHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.LifeGridFuseView);
    }
	protected drawAll():void
	{
		super.drawAll();
        this.darwData();
		this.drawBuyData();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid("darwData")) this.darwData();
		if(this.isInvalid("drawShopbuy")) this.drawBuyData();
	}
/**
 * 融合数据
 * pos孔位置
    id'命格唯一id
 */
    public setData(data:LifeGridCVO,data2:LifeGridCVO,pos:number,id:number):void
    {
		this._shopCvo = null;
		this._cvo1 = data;
		this._cvo2 = data2;
		this._pos = pos;
		this._itemId = id;
        this.invalidate("darwData");
    }

    private darwData():void{
		if(this._cvo1 == null) return;
		this._lifeGroup.x = 112;
		this._lifeGroup.y = 373;
		this._rightGroup.visible = true;
		this._group1.visible = false;
		this._popupView.titleImg.source = "lifeGrid_minggerh_png";
		this._goods1.baseId = this._cvo1.base_id;
		this._goods2.baseId = this._cvo2.base_id;
		let itemCvo1:ItemsCVO = ItemsCVO.getCvo(this._cvo1.base_id);
		let itemCvo2:ItemsCVO = ItemsCVO.getCvo(this._cvo2.base_id);
		this._nameTxt1.text = itemCvo1.name + "Lv."+this._cvo1.lev;
		this._nameTxt2.text = itemCvo2.name + "Lv."+this._cvo2.lev;
		let attvos:AttrVoInfo[] = this._cvo1.attrVos();
		this._attrTxt0.text = attvos[0].desc();
		if(attvos[1]) {
			this._attrTxt1.text = attvos[1].desc();
		}
		else
		{
			this._attrTxt1.text = "";
		}
		attvos = this._cvo2.attrVos();
		this._attrTxt2.text = attvos[0].desc();
		if(attvos[1]) 
		{
			this._attrTxt3.text = attvos[1].desc();
		}
		else
		{
			this._attrTxt3.text = "";
		}

    }
	/**
	 * 兑换数据
	 */
	public setbuyData(shopcvo:ShopCVO):void
	{
		this._shopCvo = shopcvo;
		this._cvo1 = null;
		this.invalidate("drawShopbuy");
	}
	private drawBuyData():void
	{
		if(this._shopCvo==null) return;
		this._lifeGroup.x = 282;
		this._lifeGroup.y = 383;
		this._rightGroup.visible = false;
		this._group1.visible = true;
		let cvo:LifeGridCVO = LifeGridCVO.getInfo(this._shopCvo.base_id,1);
		this._goods1.baseId = cvo.base_id;
		let attvos:AttrVoInfo[] = cvo.attrVos();
		let itemCvo1:ItemsCVO = ItemsCVO.getCvo(cvo.base_id);
		this._nameTxt1.text = itemCvo1.name + "Lv.1";
		if(attvos[1]) {
			this._attrTxt1.text = attvos[1].desc();
		}
		else
		{
			this._attrTxt1.text = "";
		}
		if(attvos[0]) 
		{
			this._attrTxt0.text = attvos[0].desc();
		}
		else
		{
			this._attrTxt0.text = "";
		}
		let str:string = StringUtils.setParam(LangCVO.getContent("lifeGrid5"),this._shopCvo.price);
		HtmlUtil.setTextFlow(this._losseTxt,str);
		this._popupView.titleImg.source = "common_dh_png";
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
        ObjectUtil.disposes(this._attrTxt0,this._attrTxt1,this._attrTxt2,this._attrTxt3,this._goods1,this._goods2,this._nameTxt1,this._nameTxt2,
		this._rhBtn,this._losseTxt,this._buyBtn);
		ObjectUtil.removes(this._lifeGroup,this._rightGroup,this._group1)

	    this._attrTxt0=null;
		this._attrTxt1=null;
		this._attrTxt2=null;
		this._attrTxt3=null;

		this._goods1=null;
		this._goods2=null;
		this._nameTxt1=null;
		this._nameTxt2=null;
		this._rhBtn=null;

		this._cvo1=null;
		this._cvo2=null;

		this._lifeGroup=null;
		this._rightGroup=null;
		this._group1=null;
		this._shopCvo=null;
		this._losseTxt=null;
		this._buyBtn=null;
        
    }
}