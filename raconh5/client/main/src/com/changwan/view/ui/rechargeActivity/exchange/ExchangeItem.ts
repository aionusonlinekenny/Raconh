/**
 * drq
 * 兑换活动 item
 * 2018.4.19
 */
class ExchangeItem extends ItemRenderer
{
	private _item1:BaseGoods;
	private _item2:BaseGoods;
	private _item3:BaseGoods;

	private _enterBtn:eui.Button;
	private _duihuanImg:eui.Image;
	private _countTxt:Label;
	private _ilingquImg:eui.Image;
	private _redIcon:eui.Image;
	private _btnGroup:eui.Group;

	private _cvo:ExchangeCVO[];
	private _bimfont:NumImgView2;
	private _model:ExchangeModel;
	private _end:number;

	public constructor() {
		super();
		this.skinName = Manager.path.getSkinName("rechargeActivity", "ExchangeItemSkin");
		this._cvo = ExchangeCVO.getCvo();
		this._model = Manager.model.getExchange();
		this._end = this._model._endTime;

	}


	protected createChildren():void
    {
        super.createChildren();
		this._duihuanImg.touchEnabled = false;
		this._ilingquImg.touchEnabled = false;
		this.addEvent();
    }

	private addEvent():void
    {
        this._enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    private removeEvent():void
    {
         this._enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

	private onClickHandler():void
	{
        let second:number = Math.round(this._end - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
		if(second<=0)
		{
			FloatTips.addTips(LangCVO.getContent("rechargeActivity10"), Color.RED);
			return;
		}
		if(this.data.id)
		{
			let any = this._model.getData(this.data);
			if(any.curVip < any.condValue)
			{
				FloatTips.addTips(LangCVO.getContent("rechargeActivity11",any.condValue), Color.RED);
			}
			else if( any.cur_num1 < any.num1 || any.cur_num2 < any.num2)
			{
				FloatTips.addTips(LangCVO.getContent("rechargeActivity9"), Color.RED);
			}else{
				Manager.control.getExchange().sendExchange(this.data.id);
			}
		}
	}

	protected dataChanged():void
    {
        super.dataChanged();
		this.createItem();
		let any = this._model.getData(this.data);
		this.updateItem(any);
	}



	private createItem():void
	{
		//消耗物品
		if(this.data.rewards)
		{
			let arr:string[] =   this.data.rewards.split("|");
			let arrLoss:GainLossVO[] = [];
			for(let i=0;i<arr.length;i++)
			{
				let loss:GainLossVO = new GainLossVO(arr[i]);
				arrLoss.push(loss);
			}
			this._item1.setGainLossVO(arrLoss[0]);
			this._item2.setGainLossVO(arrLoss[1]);
		}
		//获取物品
		if(this.data.result)
		{
			let loss:GainLossVO = new GainLossVO(this.data.result);
			this._item3.setGainLossVO(loss);
		}
	}

	private updateItem(any:any):void
	{
		this._item1.itemAmount(0, 0);
		this._item2.itemAmount(0, 0);

		let sort:number = this.data.sort;
		//复原
		if(this._bimfont)
		{
			this._duihuanImg.source = "common_dh_png";
			Manager.pool.push(this._bimfont);
			this._bimfont = null;
		}
		this._ilingquImg.visible = false;
		this._duihuanImg.visible = true;
		this._duihuanImg.x = 5;
		this._redIcon.visible = false;
		this._enterBtn.touchEnabled = true;
		this._countTxt.visible = true;
		this._enterBtn.visible = true;

		//消耗物品数量
		this._item1.itemAmount(any.cur_num1, any.num1);
		if(any.itemBaseID != 90000001)
		{
			this._item2.itemAmount(any.cur_num2, any.num2);
		}else{
			this._item2.itemAmount(0, 0);
		}
		//领取数量
		if(this.data.maxCurent)
		{
			this._countTxt.text = "（"+this.data.curCount+"/"+this.data.maxCurent+"）";
		}else{
			this._countTxt.text = "";
		}
		 let second:number = Math.round(this._end - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
		//按钮显示
		if(this.data.maxCurent && this.data.curCount >= this.data.maxCurent)//已领取
		{
			this._ilingquImg.visible = true;
			this._enterBtn.touchEnabled = false;
			this._countTxt.visible = false;
			this._duihuanImg.visible = false;
			this._enterBtn.visible = false;
		}else if(any.curVip < any.condValue)//vip
		{
			this._duihuanImg.x = -12;
			if(!this._bimfont)
			{
				this._bimfont = Manager.pool.create(NumImgView2, 25);
				this._bimfont.x = 109;
				this._bimfont.y = 28;				
				this._btnGroup.addChild(this._bimfont);
			}
			this._bimfont.setValue(any.condValue,"nums_vip_");			
			this._duihuanImg.source = "vip_title_png";
		}else if(second > 0 && (this.data.maxCurent == 0 || this.data.curCount < this.data.maxCurent) && any.cur_num1 >= any.num1 && any.cur_num2 >= any.num2 && any.curVip >= any.condValue)
		{//红点
			this._redIcon.visible = true;
		}

	}

	public dispose():void
    {
		this.removeEvent();
		super.dispose();
		if(this._bimfont)
		{
			this._bimfont.dispose();
			this._bimfont = null;
		}


		ObjectUtil.removes(this._enterBtn, this._duihuanImg, this._ilingquImg, this._redIcon, this._btnGroup);
		ObjectUtil.disposes(this._countTxt,this._model);
		this._item1 = null;
		this._item2 = null;
		this._item3 = null;

		this._enterBtn = null;
		this._duihuanImg = null;
		this._countTxt = null;
		this._ilingquImg = null;
		this._redIcon = null;
		this._btnGroup = null;

		this._cvo = null;
		this._model = null;
    }
}