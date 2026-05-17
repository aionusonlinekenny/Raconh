/**
 * 投资item
 * pzx
 * create 18.1.13
 */
class SysInvestItem extends ItemRenderer{
    private _descTxt:Label;
    private _rewardBtn:Button;
    private _item0:BaseGoods;
    private _item1:BaseGoods;
    private _item2:BaseGoods;
    private _item3:BaseGoods;
    private _ilingquImg:eui.Image;
    private _list:BaseGoods[];
    private _redIcon:eui.Image;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("sysInvest", "SysInvestItemSkin");
        this.addEvent();
    }
    private addEvent():void
    {
        this._rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchRewardHandler,this);
    }
    private removeEvent():void
    {
        this._rewardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchRewardHandler,this);
    }
    private onTouchRewardHandler(e:egret.TouchEvent):void
    {
        if(SysInvestView.instince.getisActive())
        {
            Manager.control.getSysInvest().reward(this.data.id);
        }
    }
    protected createChildren():void
    {
        super.createChildren();
        if(this._list ==null)
        {
            this._list=[];
            for(let i:number = 0;i<4;i++)
            {
                this._list[i] = this["_item"+i];
            }
        }
    }

  
	protected dataChanged():void
    {
        let cvo:SysInvestCVO = this.data;
        HtmlUtil.setTextFlow(this._descTxt,cvo.desc);
        let arr:GainLossVO[]= GainLossVO.parse(cvo.reward);
        for(let i:number = 0;i<4;i++)
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
        this._rewardBtn.visible = cvo.state != 1;
        this._ilingquImg.visible= !this._rewardBtn.visible;

        this._redIcon.visible = false;
        if(Manager.model.getSysInvest().isActive("" + cvo.price))
        {
            if(cvo.state != 1 && cvo.isReward())
            {
                this._redIcon.visible = true;
            }
        }
    }

    public reuse():void
    {
    }

    public unuse():void
    {
		this.clear();
    }
	
	private clear(isRemove:boolean=false):void
	{
		if(isRemove)
		{
			ObjectUtil.disposes(this._descTxt,this._rewardBtn,this._item0,this._item1,this._item2,this._item3);
            ObjectUtil.removes(this._ilingquImg,this._redIcon);
		}
        this._descTxt=null;
        this._rewardBtn=null;
        this._item0=null;
        this._item1=null;
        this._item2=null;
        this._item3=null;
        this._ilingquImg=null;
        this._list=null;
        this._redIcon=null;
	}

    public dispose():void
    {
        super.dispose();
        this.removeEvent();
        this.clear(true);
    }
}