/**
 * 铸魂升阶提示
 */
/**
 * 铸魂升阶提示
 * Simon 2017.11.20
 */
class ZhuhunUpgrade extends UIComponent implements IViewManager
{
	private baseView:BasePopUpView;
	private _attrValue:Label;
	private _btnImg:eui.Image;
	private _btn:Button;
	private _upgradeImg:eui.Image;
	private _ji:eui.Image;
	private _imageBg1:BitmapRemote;

	private _num:NumImgView2;

	public constructor()
	{
		super();
		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("equip", "ZhuhunUpgradeSkin");
	}

	public setInfo(career:number, level:number):void
	{
		if(!this._num)
		{
			this._num = Manager.pool.create(NumImgView2);
			this._num.x = this._upgradeImg.x + 430;
			this._num.y = this._upgradeImg.y + 4;
			this.addChild(this._num);
		}
		this._num.setValue(level, "nums_fighting_", 35);
		this._ji.x = this._num.x + this._num.width + 3;

		let str:string = "";
		let curInfo:EquipZhuhunCVO = EquipZhuhunCVO.getInfo(career, 1, level);
		if(curInfo)
		{
			for(let i:number=0; i<curInfo.levelAttrList.length; i++)
			{
				str += AttrDescTypeEx.getAttrName(curInfo.levelAttrList[i][0]) + "+" + curInfo.levelAttrList[i][1] + "   ";
			}
		}
		this._attrValue.text = str;
	}

	protected configUI():void
	{
		super.configUI();

		this._btnImg.touchEnabled = false;
		this._imageBg1.load(Manager.path.getCommonPath("diwenBack1.png"));

		this.onResizeHandler(null);
	}

	protected addEvent():void
	{
		super.addEvent();

		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this.baseView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}

	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this.baseView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);

		super.removeEvent();
	}

	private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round((Manager.config.gameWidth - this.width) / 2);
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		// this.removeFromParent();
		Manager.view.hide(ViewID.ZhuhunUpgrade)
	}

	public show(career:number, level:number):void
	{
		Manager.layer.tipsLayer.addChild(this);
		this.setInfo(career, level);
	}

	public hide():void
	{
		Manager.layer.tipsLayer.removeChild(this);
	}

	public dispose():void
	{
		super.dispose();
		if(this._loadComplete)
		{
			this._imageBg1.dispose();
			this._imageBg1 = null;
		}
		this.baseView.dispose();
		this.baseView = null;
		this._attrValue.dispose();
		this._attrValue = null;
		this.removeChild(this._btnImg);
		this._btnImg = null;
		this._btn.dispose();
		this._btn = null;
		this.removeChild(this._upgradeImg);
		this._upgradeImg = null;
		if(this._num)
			Manager.pool.push(this._num);
		this._num = null;
	}
}