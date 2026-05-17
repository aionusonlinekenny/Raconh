/**
 * pzx 
 * 17.11.23
 * 商城
 */
class ShopPanel extends Panel implements IViewManager
{
	private _view:UIComponent;
	private _shopView:ShopView;
	public static shopbuyView:ShopBuyView;
	private _menuBtnContent:Array<any>;
	private _bitimg:BitmapRemote;
	private _curView:egret.DisplayObjectContainer;
	public constructor() 
	{
		super(false);
	}
	
	protected configUI():void
	{
		super.configUI();
		let boo:boolean = Manager.model.getShop().treasureGarretModel.checkfreeTime();
		let boo2:boolean = Manager.model.self.attrInfo.honor>=500;
		this._menuBtnContent = [
				{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "shop_daoju1_png", imgClick: "shop_daoju1_png",tapType:ShopType.GOLD_TYPE },
				//{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "shop_shenmi1_png", imgClick: "shop_shenmi2_png",tapType:2},
				{ showRedIcon:boo2,bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "shop_rongyu1_png", imgClick: "shop_rongyu1_png" ,tapType:ShopType.RONGYU_TYPE},
				{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "vip_btn_png", imgClick: "vip_btn_png",tapType:ShopType.VIP_TYPE }
		];
		if(OpenCVO.isOpen(OpenConst.ID_TREASURE_GARRET))
		{
			this._menuBtnContent.unshift({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rein_zhenbaoge1_png", imgClick: "rein_zhenbaoge1_png",showRedIcon:boo,tapType:ShopType.TREASUREGARRET_TYPE});
		}
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
	}
	private setPromptSign(index:number):BaseFuncBtn
	{
		if(this.basePanel)
		{
			let dis:egret.DisplayObject = this.basePanel.scrollerList.itemList.getElementAt(index);
			return (<BaseFuncBtn>dis);
		}
		return null;
	}

	private onIconShowHandler(e:BaseEvent):void
	{
		let btn:BaseFuncBtn;
		if(e.type == ShopEvent.TREASUREGARRET_UPDATE_EVENT)
		{
			btn = this.setPromptSign(0);
            let boo:boolean = Manager.model.getShop().treasureGarretModel.checkfreeTime();
			if(btn) btn.setIconShow(boo);
		}
		if(e.type == GameObjectAttrEvent.HONOR )
		{
			if(Manager.model.self.attrInfo.honor>=500)
			{
				for(let i:number =this._menuBtnContent.length -1;i>-1;i--)
				{
					if(this._menuBtnContent[i].tapType == ShopType.RONGYU_TYPE)
					{
						btn = this.setPromptSign(i);
						break;
					}
				}
				if(btn) btn.setIconShow(true);
			}
		}
	}

	protected addEvent():void
	{
		super.addEvent();
		Manager.model.getShop().treasureGarretModel.addEventListener(ShopEvent.TREASUREGARRET_UPDATE_EVENT,this.onIconShowHandler,this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.HONOR,this.onIconShowHandler,this);
	}

	protected removeEvent():void
	{
		super.removeEvent();
		Manager.model.getShop().treasureGarretModel.removeEventListener(ShopEvent.TREASUREGARRET_UPDATE_EVENT,this.onIconShowHandler,this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.HONOR,this.onIconShowHandler,this);
	}

	protected onClickHandler(e:egret.TouchEvent):void
	{
		if(Manager.view.isOpening(ViewID.ShopPanel)) Manager.view.hide(ViewID.ShopPanel);
		else if(Manager.view.isOpening(ViewID.ShopPanelMulte)) Manager.view.hide(ViewID.ShopPanelMulte);
	}
	protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		super.onFuncBtnChangeHandler(e);
		var i:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(i == -1) return;
		let any:any = this._menuBtnContent[i];
		let index:number = any.tapType;
		if(this._curView)
		{
			this._curView.visible = false;
		}
		switch(index)
		{
            case ShopType.TREASUREGARRET_TYPE:
                if(this._bitimg == null)
		        {
                    this._bitimg = Manager.pool.create(BitmapRemote);
                    this._bitimg.x = 0;
                    this._bitimg.y = 113;
                    this.basePanel.addChildAt(this._bitimg,3);
		        }
                this._bitimg.load(Manager.path.getReinPath("rein_treasure_zhuangshi", Extension.PNG));
                this._bitimg.visible = true;
                this.basePanel.backImg.source = "common_panelBg_png";
				this.basePanel.title = "shop_title0_png";
				// this.basePanel.bottomBackImg.source = "panel_bg2_png";
				this.basePanel.showBottomBack = true;
				if(!this._view)
				{
					this._view = Manager.pool.create(TreasureGarretView);
					this.addChild(this._view);
				}
				this._curView = this._view;
				if(this._shopView && this._shopView.visible) this._shopView.visible = false;
                break;
			default:
				this.basePanel.title= "shop_shangcheng_png";
				// this.basePanel.bottomBackImg.source = "";
				this.basePanel.showBottomBack = false;
				if(index == ShopType.RONGYU_TYPE)
					this.setTopGameMoney(GainLossVO.HONOR);
				else
					this.setTopGameMoney(GainLossVO.COIN);
				if(this._bitimg) this._bitimg.visible = false;
				if(!this._shopView)
				{
					this._shopView = new ShopView;
					this.addChild(this._shopView);
				}
				this._shopView.onFuncBtnChangeHandler(index);
				if(this._shopView && this._shopView.visible) this._shopView.visible = false;
				this._curView = this._shopView;
				break;
		}
		this._curView.visible = true;
		if(index == ShopType.RONGYU_TYPE)
		{
			this.setTopGameMoney(GainLossVO.HONOR);
		}
		else if(index == ShopType.VIP_TYPE)
		{
			this.setTopGameMoney(GainLossVO.YUPEIXIAO_ITEM);
		}
		else
		{
			this.setTopGameMoney(GainLossVO.COIN);
		}
	}
	
	public dispose()
	{
		super.dispose();
		if(this.basePanel)
		{
			this.basePanel.dispose();
			this.basePanel = null;
		}
		
		if(ShopPanel.shopbuyView)
		{
			ShopPanel.shopbuyView.dispose();
			ShopPanel.shopbuyView = null;
		}
		if(this._bitimg)
		{
			Manager.pool.push(this._bitimg);
			this._bitimg = null;
		}
		if(this._view)
		{
			this._view.dispose();
			this._view = null;
		}
		if(this._shopView)
		{
			this._shopView.dispose();
			this._shopView = null;
		}
		this._curView = null;
		this._menuBtnContent =null;
	}
}