/**
 * 分享
 * pzx
 * create 2018-3-１６
*/
class SharePanel extends PopUpView{
	private _shareBtn:Button;
	private _shareImg:eui.Image;
	private _bitimg:BitmapRemote;
	private _list:BaseGoods[];
	private _redIcon:eui.Image;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("share", "SharePanelSkin");
    }
    protected configUI():void
    {
        super.configUI();
        this._popupView.titleImg.source = "share_fenxiangyouxi_png";
		if(this._bitimg == null)
		{
			this._bitimg = Manager.pool.create(BitmapRemote);
			this._bitimg.y = 316;
			this._bitimg.x = 0;
			this._popupView.addChildAt(this._bitimg,1);
			this._bitimg.load(Manager.path.getPanelUiImgPath("share/share_tupian"));
		}
		this._shareImg.touchEnabled = false;
		this._popupView.bgHeight = 580;
		this._popupView.viewY = 320;
		Manager.control.getshare().query();
    }

    protected addEvent():void
    {
		this._shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRewardHandler,this);
		Manager.model.getshare().addEventListener(ShareEvent.SHARE_UPDATE,this.updateStatus,this);
        super.addEvent();
    }

    protected removeEvent():void
    {
		this._shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRewardHandler,this);
		Manager.model.getshare().removeEventListener(ShareEvent.SHARE_UPDATE,this.updateStatus,this);
        super.removeEvent();
    }

	private onRewardHandler():void
	{
		let cvo:ShareCVO = ShareCVO.cvo();
		if(cvo.status)
	   {
		   Manager.control.getshare().reward();
	   }
	   else
	   {
		　　//分享调用
		//    Manager.control.getshare().shareInfo();
			Manager.platform.share();
	   }
	}

	protected onTouchCloseHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.SharePanel);
    }
    protected initData():void
    {
        super.initData();
        this.darwData();
    }
    
    private darwData():void{
       let cvo:ShareCVO = ShareCVO.cvo();
	   let arr:GainLossVO[] = GainLossVO.parse(cvo.rewards);
	   this._list = [];
	   for(let i:number = arr.length -1;i>-1;i--)
	   {
		   let item:BaseGoods = Manager.pool.create(BaseGoods);
		   item.x = 145 + (i%3) * 141;
		   item.y = 500 + Math.floor(i/3) * 141;
		   this.addChild(item);
		   this._list.push(item);
		   item.setGainLossVO(arr[i]);
	   }
	   
	   this.updateStatus();
    }
	private updateStatus():void
	{
		let cvo:ShareCVO = ShareCVO.cvo();
		if(cvo.isReward())
		{
			this.onTouchCloseHandler(null);
			return;
		}
	   if(cvo.status)
	   {
		   this._shareImg.source = "common_label_fetch_png";
	   }
	   else
	   {
		   this._shareImg.source = "share_fenxiangyouxi_png";
	   }
	   this._redIcon.visible = cvo.status;
	}
    
    public show():void
    {
        super.show();
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._shareImg);
		ObjectUtil.disposes(this._shareBtn);
	    if(this._bitimg)
		{
			Manager.pool.push(this._bitimg)
			this._bitimg = null;
		}
		this._list.forEach((item,i)=>{
			Manager.pool.push(item);
		})
		this._shareBtn= null;
		this._shareImg= null;
		this._list= null;
        
    }
}