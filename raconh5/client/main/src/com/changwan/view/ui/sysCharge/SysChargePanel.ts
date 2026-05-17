/**
 * pzx 
 * 充值
 * 2018.1.3
 */
class SysChargePanel extends Panel implements IViewManager
{
	private _vipBtn:Button;
	private _tequanBtn:Button;
	private _vipTxt:Label;
	private _vipNum:NumImgView2;
	private _strip2:StripView2;
	private _curCvo:VipLevelCVO;
	private _nextTxt:Label;
	private _yuanImg:eui.Image;
	private _moneyNum:NumImgView2;
	private _maxVipTxt:Label;
	private _vScroller:egret.ScrollView;
	private _currentView:egret.DisplayObjectContainer;
	private _itemArr:Array<SysChargeItem>;

	private _curItem:SysChargeItem;
	private _chargecvo:SysChargeCVO;
	private _model:SysChargeModel;
	private _bitimg:BitmapRemote;

	public constructor() 
	{
		super();
		this.skinName = Manager.path.getSkinName("syscharge", "SysChargePanelSkin");
	}
	protected configUI():void
	{
		super.configUI();
		this.basePanel.downFrameImg.visible  = false;
		this.basePanel.backBtn.visible = false;
		this.basePanel.scrollerList.visible = false;
		this.basePanel.showBottomBack = false;
		this.basePanel.title = "common_chongzhi_png";

		if(this._bitimg == null)
		{
			this._bitimg = Manager.pool.create(BitmapRemote);
			this._bitimg.x = 5;
			this._bitimg.y = 116;
			this.basePanel.addChildAt(this._bitimg,3);
			this._bitimg.load(Manager.path.getPanelSysChargePath("sysCharge_tupian"));
		}

		if(!this._vipNum)
		{
			this._vipNum = Manager.pool.create(NumImgView2);
			this._vipNum.x = this._vipBtn.x + 52;
			this._vipNum.y = this._vipBtn.y + 44;
			this.addChild(this._vipNum);
			this._vipNum.setValue(Manager.model.self.attrInfo.vipLevel, "nums_sysnontic_", 14);
			this._vipNum.scaleX = this._vipNum.scaleY = 0.6;
		}

		if(!this._strip2)
        {
            // this._strip = Manager.pool.create(StripView, null, "strip_back2_png", "strip_blue2_png", 353, 53, 314, 32, 19, 10, true);
			this._strip2 = StripView2.create(this,this,"strip_back2_png", "strip_blue2_png", 353, 53, 314, 32, 19, 10, true,true,24);
			this._strip2.move(140,268);
            // this._strip.x = 140;
            // this._strip.y = 268;
            // this._strip.label.size = 24;
            // this._strip.isBackFront = true;
            // this.addChild(this._strip);
        }
		if(!this._moneyNum)
		{
			this._moneyNum = Manager.pool.create(NumImgView2);
			this._moneyNum.y = this._yuanImg.y;
			this.addChild(this._moneyNum);
			
		}

		this._itemArr = [];
		this._currentView = Manager.pool.create(egret.DisplayObjectContainer);

		this._vScroller = new egret.ScrollView();
		this._vScroller.x = 8;
		this._vScroller.y =376;
		this._vScroller.width = 710;
		this._vScroller.height = 895;
		this._vScroller.horizontalScrollPolicy = "off"
		this._vScroller.setContent(this._currentView);
		this.addChild(this._vScroller);
		this._vScroller.scrollSpeed = 0.01;

		this._model = Manager.model.getSysCharge();
		Manager.control.getSysCharge().query();
	}
	private onVipUpdateHandler(e:GameObjectAttrEvent):void
	{
		this._vipNum.setValue(Manager.model.self.attrInfo.vipLevel, "nums_sysnontic_", 14);
	}
	protected initData():void
    {
        super.initData();
		
    }
	private updateView():void
	{
		this._curCvo = VipLevelCVO.getCVO(Manager.model.self.attrInfo.vipLevel);
		this.drawStrip();
		this.drawCost();
		this.drawView();
	}
	protected addEvent():void
	{
		super.addEvent();
		Manager.model.self.addEventListener(GameObjectAttrEvent.VIP_LEVEL, this.onVipUpdateHandler, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
		this._tequanBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenVipHandler,this);
		this._model.addEventListener(SysChargeEvent.SYSCHARGE_QUERY_EVENT,this.updateView,this);
		Manager.model.getVip().addEventListener(VipEvent.EXP_UPDATE,this.drawStrip,this);
	}
	protected removeEvent():void
	{
		super.removeEvent();
		Manager.model.self.removeEventListener(GameObjectAttrEvent.VIP_LEVEL, this.onVipUpdateHandler, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
		this._tequanBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenVipHandler,this);
		this._model.removeEventListener(SysChargeEvent.SYSCHARGE_QUERY_EVENT,this.updateView,this);
		Manager.model.getVip().removeEventListener(VipEvent.EXP_UPDATE,this.drawStrip,this);
	}
	private onTouchHandler(e:egret.TouchEvent):void
	{
		let item = e.target;
		if(item instanceof SysChargeItem)
		{
			if(this._curItem)
			{
				if(item == this._curItem) return;
				this._curItem.setkuangBgImg(false);
			}
			this._curItem = item;
			this._curItem.setkuangBgImg(true);
			this._chargecvo = this._curItem.data;
		}
	}
	private onOpenVipHandler(e:egret.TouchEvent):void
	{
		let lev:number = this._curCvo.level + 1;
		let vip:VipPanel = Manager.view.show(ViewID.VipPanel);
		vip.setVipPage(lev);
	}

	/**进度条 */
    private drawStrip():void
    {
        if(!this._curCvo) return;
        let cur = Manager.model.getVip().exp;
        this._strip2.update(cur, this._curCvo.nextLimit);
    }

	 /**充值数值 */
    private drawCost():void
    {
        if(!this._curCvo) return;
		if(this._curCvo.isMax)
		{
			//最大级
        	let str:string;
			str = LangCVO.getContent("vip2");//已达VIP最高级
       		HtmlUtil.setTextFlow(this._maxVipTxt, str);
			this._vipTxt.text="";
			this._nextTxt.text = "";
			this._moneyNum.visible = false;
			this._yuanImg.visible = false;
			return;
		}
        let cvo = VipLevelCVO.getCVO(this._curCvo.level+1);
        if(!cvo) return;
        let cur = Manager.model.getVip().exp;

		let moneyNum:number = Math.round((this._curCvo.nextLimit - cur)/10);
		this._moneyNum.setValue(moneyNum, "nums_count_", 15);
		this._moneyNum.x = this._yuanImg.x - this._moneyNum.width-15;
		this._vipTxt.text = StringUtils.setParam(LangCVO.getContent("vip3"),cvo.level);
		this._nextTxt.x = this._moneyNum.x-53;
    }

	private drawView():void
	{
		let arr:Array<SysChargeCVO>=this._model.covs;
		let ln :number = arr.length;
		for(let i:number = 0;i<ln;i++)
		{
			let item:SysChargeItem;
			if(this._itemArr[i]===undefined)
			{
				item = Manager.pool.create(SysChargeItem);
				item.x = i%2 * 352;
				item.y = Math.floor(i/2) * 276;
				this._currentView.addChild(item);
				this._itemArr.push(item);
			}
			else
			{
				item = this._itemArr[i];
			}
			let vo:SysChargeCVO = arr[i];
			item.setData(vo);
		}
	}
	
	protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.SysChargePanel);
				break;
		}
	}
	public dispose()
	{
		super.dispose();
		ObjectUtil.disposes(this._vipBtn,this._tequanBtn,this._vipTxt,this._vipNum,this._nextTxt,this._moneyNum);
		ObjectUtil.removes(this._yuanImg,this._vScroller)
		this._curItem=null;
		this._vipBtn=null;
		this._tequanBtn=null;
		this._vipTxt=null;
		Manager.pool.push(this._vipNum);
		this._vipNum=null;
		// Manager.pool.push(this._strip);
		// this._strip=null;
		if(this._strip2)
		{
			this._strip2.dispose();
			this._strip2 = null;
		}
		this._curCvo=null;
		this._nextTxt=null;
		this._yuanImg=null;
		Manager.pool.push(this._moneyNum);
		this._moneyNum=null;
		this._maxVipTxt=null;
		this._vScroller.removeContent();
		this._vScroller=null;
		for(let item of this._itemArr)
		{
			item.dispose();
		}
		this._itemArr=null;
		Manager.pool.push(this._currentView);
		this._currentView=null;
		this._chargecvo=null;
		this._model=null;
		if(this._bitimg)
		{
			this._bitimg.x = 0;
			this._bitimg.y = 0;
		    Manager.pool.push(this._bitimg);
			this._bitimg=null;
		}
	}
}