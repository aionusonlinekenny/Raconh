/***
 * pzx 
 * 17.11.10
 * 人物资源Items
 */
class PlayerResItems extends UIComponent {

	public static ICON_30:number = 30;
	public static ICON_54:number = 54;


	private _resImg:eui.Image;
	private _countTxt:Label;
	private _count:number;
	private _type:string="";
	public sign:string = "x ";
	public color:string = "#ffffff";
	private _iconSize:number = 30;

	private _w:number;
	
	public constructor() {
		super();
		this.skinName = Manager.path.getSkinName("uiCommon", "PlayerResItemsSkin");
	}

	protected confitUI():void
	{
		super.configUI();
	}
	protected drawAll():void
	{
		super.drawAll();
		this.drawType();
		this.drawCount()
	}

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawType")) this.drawType();
		if(this.isInvalid("drawCount")) this.drawCount();
	}


	public setData(arg:GainLossVO):void
	{
		if(arg==null) return;
		if(arg.type == GainLossVO.ITEM)
		{
			return;
		}
		this.type = arg.type.split("_")[0];
		this.count = arg.num;
	}

	public set type(value:string)
	{
		if(value == this._type) return;
		this._type = value.split("_")[0];
		this.visible = false;
		this.invalidate("drawType");
	}
	private drawType():void
	{
		if(this._type)
		{
			this._resImg.source = "playRes_"+this._type+"_54_png";
			
			this._resImg.width = this._iconSize;
			this._resImg.height = this._iconSize;
			this._resImg.x = 0;
			this._resImg.y = 0;
			this.height = this._iconSize;
			this._countTxt.x = this._iconSize;
			if(this._iconSize==PlayerResItems.ICON_30)
			{
				this._countTxt.y = 3;
			}
			else if(this._iconSize==PlayerResItems.ICON_54)
			{
				this._countTxt.y = 15;
			}
			this.visible = true;
		}
	}

	public set count(value:number)
	{
		this._count = value;
		this.invalidate("drawCount");
	}
	private drawCount():void
	{
		let str:string = HtmlUtil.addColorTag(this.sign+StringUtils.getBigNum(this._count),this.color); 
		HtmlUtil.setTextFlow(this._countTxt,str)
		this._w = this._iconSize + this._countTxt.textWidth;
	}
	public set iconSize(value:number)
	{
		this._iconSize = value
	}
	
	public get width():number
	{
		return this._w;
	}

	public fontSize(value:number):void
	{
		this._countTxt.size = value;
	}

	public unuse():void
	{
		super.unuse();
		this._resImg.texture = null;
		this._countTxt.text="";
		this._type = "icon";
		this._count = 0;
		this._iconSize= PlayerResItems.ICON_30;
	}
	public reuse(id:string="coin",size:number=PlayerResItems.ICON_30):void
	{
		this._type = id;
		this._w = size + 4;
		this._iconSize = size;
	}
	public dispose():void
	{
		if(this._resImg)
		{
			this.removeChild(this._resImg);
			this._resImg=null;
		}
		if(this._countTxt)
		{
			this.removeChild(this._countTxt);
			this._countTxt=null;
		}
		super.dispose();
	} 
	
}