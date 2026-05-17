/**
 * pzx 
 * 2017.11.21
 * 免伤属性
 */
class JingmaiCondView extends PopUpView {
	private _backBtn:Button;
	private _nameTxt1:Label;
	private _valueTxt1:Label;
	private _nameTxt2:Label;
	private _valueTxt2:Label;

	private _self:SelfGameObjectInfo;
	private _module:JingMaiModel;

	private _arrowImg:eui.Image;


	public constructor() 
	{
		super();
		this.skinName = Manager.path.getSkinName("jingmai", "JingmaiCondViewSkin");
	}
	protected configUI():void
	{
		super.configUI();
		this._module = Manager.model.getJingMai();
		this._self = Manager.model.self;
		this._popupView.bgHeight = 306;
	}
	protected addEvent():void
	{
		super.addEvent();
		this._backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchCloseHandler,this);
	}
	protected removeEvent():void
	{
		this._backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchCloseHandler,this);
		super.removeEvent();
	}
	protected onTouchCloseHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.JingmaiCondView);
    }
	protected drawAll():void
	{
		super.drawAll();
		this.drawData();
	}
	protected drawData():void
	{
		let info:SelfGameObjectInfo = this._self;
		if(info)
		{
			let level:number = this._module.getId(info.id);
			if(level === undefined)
			{
				//空的时候默认读0
				level = 0;
			}
			
			let cvo:JingMaiCvoInfo = JingMaiCVO.getInfo(level);
			let needcond:number;
			if(cvo.cond>=JingMaiCVO.maxCond)
			{
				//最高层
				needcond = cvo.cond
			}
			else
			{
				needcond = cvo.cond+1;
			}
			let jingmaiList:Array<JingMaiCvoInfo> = JingMaiCVO.getCondList(needcond,cvo.jingmaiType);
			let cvo2:JingMaiCvoInfo = jingmaiList[0];
			let str:string = "经脉"+ (cvo.cond - 1)+ "层<font color='#37B700'>（达成）</font>";
			this._nameTxt1.textFlow = new egret.HtmlTextParser().parse(str);
			let attr:AttrVO = Manager.pool.create(AttrVO, cvo.attr);
			this._valueTxt1.text = "免伤"+ (attr.getNum(AttrVO.DMG_REDUCE)/1000*100).toFixed(1) + "%";
			Manager.pool.push(attr);

			if(level >= JingMaiCVO.maxLevel)
			{
				//最大级
				this._arrowImg.visible = false;
				this._valueTxt2.visible = false;
				this._nameTxt2.visible = false;
				let str:string = "经脉"+ (cvo.cond - 1)+ "层<font color='#37B700'>（满级）</font>";
				this._nameTxt1.textFlow = new egret.HtmlTextParser().parse(str);
				this._nameTxt1.x = 118;
				this._valueTxt1.x = 131;
				return;
			}

			str = "经脉"+ cvo.cond+ "层<font color='#ff0000'>（"+(cvo.jingmaiType-1)+"/8）</font>";
			this._nameTxt2.textFlow = new egret.HtmlTextParser().parse(str);
			if(cvo2)
			{
				let attr2:AttrVO = Manager.pool.create(AttrVO, cvo2.attr);
				this._valueTxt2.text = "免伤"+ (attr2.getNum(AttrVO.DMG_REDUCE)/1000*100).toFixed(1) + "%";
				Manager.pool.push(attr2);
			}
		}
	}

	public dispose():void
	{
		super.dispose();
		if(this._loadComplete)
		{
			this._backBtn.dispose();
			this._backBtn= null;
			this._nameTxt1.dispose();
			this._nameTxt1= null;
			this._valueTxt1.dispose();
			this._valueTxt1= null;
			this._nameTxt2.dispose();
			this._nameTxt2= null;
			this._valueTxt2.dispose();
			this._valueTxt2= null;
			this._self = null;
			this._module = null;

			this._arrowImg.parent.removeChild(this._arrowImg);
			this._arrowImg= null;
			
		}
	}


}