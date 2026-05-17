/**
 * drq 
 * 签到 item
 * 2018.3.21
 */
class QiandaoItem extends UIComponent
{
	//组件
	private _effectImg:eui.Image;
	private _passTxt:Label;
	private _nameTxt:Label;
	private _redIcon:eui.Image;
	private _ilingquImg:eui.Image
	private _buIcon:eui.Group;
	private _item:BaseGoods;
	private _gridImg:eui.Image;
	
	//数据
	private effectImg:boolean = false;
	private passTxt:string = "";
	private nameTxt:string = "";
	private redIcon:boolean = false;
	private ilingquImg:boolean = false;
	private buIcon:boolean = false;
	private gain:string = "";
	private _cvo:QiandaoCVO;
	private _id:number;
	
	public constructor() {
		super();
		this.skinName  = Manager.path.getSkinName("sysnotice","SysnoticeItemSkin");
		this.touchChildren = false;
		this.touchEnabled = true;
		this._item = Manager.pool.create(BaseGoods);
		this.addChild(this._item);
		this.swapChildren(this._item,this._ilingquImg);
		this._item.x = 10;
		this._item.y = 25;
		this._nameTxt.text = this.nameTxt;
		this._redIcon.visible = this.redIcon;
		this.setProperty();
	}

	public unuse():void
	{
		super.unuse();
		this.setProperty();
	}

	public setProperty(effectImg:boolean=this.effectImg,passTxt:string=this.passTxt,ilingquImg:boolean=this.ilingquImg,buIcon:boolean=this.buIcon,gain:string=this.gain):void
	{
		this._effectImg.visible = effectImg;
		if(passTxt != "")
		{
			this._passTxt.text = passTxt;
		}
		this._ilingquImg.visible = ilingquImg;
		this._buIcon.visible = buIcon;
		if(gain != "")
		{
			let loss:GainLossVO = new GainLossVO(gain);
			this._item.setGainLossVO(loss);
		}
	}

	//注册事件
	protected addEvent():void
    {
		super.addEvent();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickBox,this);
    }

    protected removeEvent():void
    {
		super.removeEvent();
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickBox,this);
    }
	private onClickBox(e:egret.TouchEvent = null):void
    {
		let day:number = Manager.model.getLogin().serverTimeInfo.serverOpenDays;//开服天数
		let currentDay = (day%30)==0?30:day%30;
		if(this._cvo.id < currentDay)//补签
		{
			//提示
			let consume = this._cvo.consume;
			consume = consume.substr(1,consume.length - 2);
			let arr = consume.split(",");
			let str = LangCVO.getContent("qiandao31");
			str = StringUtils.setParam(str,arr[arr.length-1]);
			let ok:CallBackInfo = Manager.pool.create(CallBackInfo,Manager.control.geQiandao().sendSign,Manager.control.geQiandao(),this._id);
			Manager.view.show(ViewID.TipsView,str,ok,true);
		}else
		{
			Manager.control.geQiandao().sendSign(this._id);
		}		
    }

	public dispose():void
	{
		super.dispose();
		ObjectUtil.disposes(this._item,this._passTxt,this._nameTxt);
		ObjectUtil.removes(this._effectImg,this._redIcon,this._ilingquImg,this._buIcon,this._gridImg);
		
		this._effectImg = null;
		this._passTxt = null;
		this._nameTxt = null;
		this._redIcon = null;
		this._ilingquImg = null;
		this._buIcon = null;
		this._item = null;
		this._gridImg = null;
		
		this.effectImg = null;
		this.passTxt = null;
		this.nameTxt = null;
		this.redIcon = null;
		this.ilingquImg = null;
		this.buIcon = null;
		this.gain = null;
		this._cvo = null;
		this._id = null;
	}
}