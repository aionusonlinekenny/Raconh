/**
 * 冲榜竞技Item
 * pzx
 * 2018-3-20
 */
class SrvRankItem extends  ItemRenderer{
	private _rankImg:eui.Image;
	private _item0:BaseGoods;
	private _item1:BaseGoods;
	private _item2:BaseGoods;
	private _btn:Button;
	private _statuTxt:Label;
	private _nameTxt:Label;
	private _cvo:SrvRankCVO;
	private _ilingquImg:eui.Image;

	private _numImg:NumImgView2;
	private _list:BaseGoods[];
	private _redIcon:eui.Image;

	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("srvRank", "SrvRankItemSkin");
    }
    protected createChildren():void
    {
        super.createChildren();
		this._list = [this._item0,this._item1,this._item2];
		this.addEvent();
    }

	private addEvent():void
	{
		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchRewardHandler,this);
	}
	private removeEvent():void
	{
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchRewardHandler,this)
	}
	private touchRewardHandler():void
	{
		if(this._cvo.rank>3)
		{
			if(this._cvo.checkReward())
			{
				Manager.control.getsrvRank().reward(this._cvo.rank);
			}
			else
			{
				FloatTips.addTips(LangCVO.getContent("srv_rank2"),Color.RED);
			}
		}
	}
	protected dataChanged():void
    {
        super.dataChanged();
		this._cvo = this.data;
		this._nameTxt.text = "";
		this._rankImg.y = 0;
		this.drawDate();
		this.drawItem();
    }
	private drawItem():void
	{
		let arr:GainLossVO[] = GainLossVO.parse(this._cvo.losse);
		for(let i:number = this._list.length-1;i>-1;i--)
		{
			if(arr[i])
			{
				this._list[i].setGainLossVO(arr[i]);
			}
			else
			{
				this._list[i].clear();
			}
		}
	}

	private drawDate():void
	{
		this._ilingquImg.visible = false;
		this._redIcon.visible = false;
		if(this._cvo.rank < 4)
		{
			this._rankImg.source = "srvRank_rank"+this._cvo.rank+"_png";
			this._btn.visible = false;
			this._statuTxt.text = LangCVO.getContent("srv_rank1");//邮件发放
			if(this._numImg)
			{
				this._numImg.visible = false;
			}
			if(this._cvo.rank == 1)
			{
				this._nameTxt.text = Manager.model.getsrvRank().rank1Name;
			}
			else
			{
				this._rankImg.y = 20;
			}
		}
		else
		{
			this._rankImg.source = this._cvo.di_img;
			
			if(!this._numImg)
			{
				this._numImg = Manager.pool.create(NumImgView2);
				this._numImg.y = 70;
				this.addChild(this._numImg);
			}
			this._numImg.setValue(this._cvo.condStr(), "nums_srvRank_", 17);
			this._numImg.x = Math.round((145 - this._numImg.width)/2);
			this._numImg.visible = true;
			if(this._cvo.isReward())
			{
				this._btn.visible = false;
				this._statuTxt.text = "";
				this._ilingquImg.visible = true;
			}
			else if(this._cvo.checkReward())
			{
				this._btn.visible = true;
				this._statuTxt.text = "";
				this._redIcon.visible = true;
			}
			else
			{
				this._btn.visible = false;
				this._statuTxt.text = LangCVO.getContent("srv_rank2");//未达标
			}
		}
	}

   
	
	private clear(isRemove:boolean=false):void
	{
		if(isRemove)
		{
			ObjectUtil.removes(this._rankImg,this._ilingquImg,this._redIcon);
			ObjectUtil.disposes(this._btn,this._statuTxt,this._nameTxt);
		}

		this._rankImg=null;
		this._item0=null;
		this._item1=null;
		this._item2=null;
		this._btn=null;
		this._statuTxt=null;
		this._nameTxt=null;
		this._cvo=null;
		this._ilingquImg=null;
		if(this._numImg) Manager.pool.push(this._numImg);
		this._numImg=null;
		this._list.forEach((item,i)=>{
			Manager.pool.push(item);
		})
		this._list=null;
		this._redIcon=null;
        
	}

    public dispose():void
    {
		this.removeEvent();
        this.clear(true);
		super.dispose();
    }
}