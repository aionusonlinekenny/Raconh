/**
 * 缥缈录关卡
 * Simon
 * 2018.3.14
 */
class MaterialCheckPointItem extends UIComponent
{
	public btn:eui.Image;
	private _starList:Array<eui.Image>;
	private _tuijian:eui.Image;
	private _name:Label;
	private _redIcon:eui.Image;

	private _star:number = 0;

	public constructor()
	{
		super();
		this.touchEnabled = true;
		this.skinName = Manager.path.getSkinName("material", "MaterialCheckPointItemSkin");
	}

	protected configUI():void
	{
		super.configUI();

		this._starList = [];
		for(let i:number=0; i<5; i++)
		{
			this._starList.push(this["_star" + (i + 1)]);
			this._starList[i].visible = i + 1 <= this._star;
		}
	}

	protected addEvent():void
	{
		super.addEvent();
	}

	protected removeEvent():void
	{
		super.removeEvent();
	}
	
	public set name(value:string)
	{
		this._name.text = value;
	}

	public set showTuijian(value:boolean)
	{
		this._tuijian.visible = value;
	}

	public get redIcon():eui.Image
	{
		return this._redIcon;
	}

	public set star(value:number)
	{
		this._star = value;

		if(this._starList)
		{
			for(let i:number=0; i<this._starList.length; i++)
			{
				this._starList[i].visible = i + 1 <= this._star;
			}
		}
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this.btn, this._tuijian, this._name);
		this.btn = null;
		if(this._starList)
		{
			for(let i:number=0; i<this._starList.length; i++)
			{
				if(this._starList[i] && this._starList[i].parent)
					this._starList[i].parent.removeChild(this._starList[i]);
				this._starList[i] = null;
			}
			this._starList = null;
		}
		this._tuijian = null;
		if(this._name)
			this._name.dispose();
		this._name = null;
	}
}