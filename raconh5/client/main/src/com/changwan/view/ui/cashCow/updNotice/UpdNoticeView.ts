/**
 * pzx 
 * 游戏公告
 * 2018.３．１９
 */
class UpdNoticeView extends UIComponent{
	private _desc:egret.TextField;
	private _item0:BaseGoods;
	private _item1:BaseGoods;
	private _item2:BaseGoods;
	private _item3:BaseGoods;
	private _rewardBtn:Button;
	private _redIcon:eui.Image;
	private _cvo:UpdNoticCVO;
	private _list:BaseGoods[];
	private _ilingquImg:eui.Image;
	private _group:eui.Group;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("udpNotice", "UpdNoticeViewSkin");
		this.touchChildren = true;
    }
    protected configUI():void
    {
        super.configUI();
		this._desc.lineSpacing = 10;
		this._list = [this._item0,this._item1,this._item2,this._item3];
    }

    protected addEvent():void
    {
		this._rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRewardHandler,this);
		Manager.model.getSysnotice().addEventListener(SysnoticeEvent.UPD_NOTICE_EVENT,this.onReturnReward,this);
        super.addEvent();
    }

    protected removeEvent():void
    {
		this._rewardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRewardHandler,this);
		Manager.model.getSysnotice().removeEventListener(SysnoticeEvent.UPD_NOTICE_EVENT,this.onReturnReward,this);
        super.removeEvent();
    }

	private onRewardHandler():void
	{
		Manager.control.getSysnotice().updNotice();
	}
	private onReturnReward():void
	{
		this._cvo = UpdNoticCVO.cvo();
		this.drawRedIcon();
	}

    protected initData():void
    {
        super.initData();
		this._cvo = UpdNoticCVO.cvo();
		this.drawData();
    }

    private drawData():void{
		this._desc.text = this._cvo.content;
		this._desc.height = this._desc.textHeight;
		let arr:GainLossVO[] = GainLossVO.parse(this._cvo.rewards);
		for(let i:number = this._list.length - 1;i>-1;i--)
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
		this.drawRedIcon();
    }
	public drawRedIcon():void
	{
		this._rewardBtn.visible = this._redIcon.visible = !this._cvo.isReward;
		this._ilingquImg.visible = this._cvo.isReward;
		
	}
	

    public dispose():void
    {
        super.dispose();
		ObjectUtil.disposes(this._desc,this._item0,this._item1,this._item2,this._item3,this._rewardBtn);
		this.removeChild(this._redIcon);
		this.removeChild(this._ilingquImg);
        this._desc=null;
		this._item0=null;
		this._item1=null;
		this._item2=null;
		this._item3=null;
		this._rewardBtn=null;
		this._redIcon=null;
		this._cvo=null;
		this._list=null;
		this._ilingquImg=null;
    }
}