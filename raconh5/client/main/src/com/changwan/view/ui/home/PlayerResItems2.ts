/***
 * pzx 
 * 17.11.10
 * 人物资源Items
 * @update 2018-04-17
 */
class PlayerResItems2 implements cw.IDispose
{
    private _homeImageLayer:egret.DisplayObjectContainer;
    private _homeLayer:egret.DisplayObjectContainer;

    private _resImg:BitmapRes;
    private _countTxt:TextField;

    private _type:string = "icon";
    private _count:number;
    private _drawType:boolean;
    private _drawCount:boolean;
    private _iconSize:number;
	public sign:string = "x ";
	public color:string = "#ffffff";
    private _w:number;
	public static ICON_SIZE_30:number = 30;
	public static ICON_SIZE_54:number = 54;

    public constructor(homeImageLayer:egret.DisplayObjectContainer,homeLayer:egret.DisplayObjectContainer,size:number=PlayerResItems2.ICON_SIZE_54)
    {
        this._homeImageLayer = ObjectUtil.createConainer();
        homeImageLayer.addChild(this._homeImageLayer);
        this._homeLayer = ObjectUtil.createConainer();
        homeLayer.addChild(this._homeLayer);

        this._resImg = BitmapRes.create("",0,0,size,size);
        this._iconSize = size;
        this._homeImageLayer.addChild(this._resImg);

        this._countTxt = TextField.create(122,32,0xffffff,20);
        this._countTxt.move(30,15);
        this._homeLayer.addChild(this._countTxt);

        this._drawType = false;
        this._drawCount = false;
    }

    public move(x:number,y:number):void
    {
        this._homeLayer.x = x;
        this._homeLayer.y = y;
        this._homeImageLayer.x = x;
        this._homeImageLayer.y = y;
    }

	public setData(arg:GainLossVO):void
	{
		if(arg==null) return;
		if(arg.type == GainLossVO.ITEM)return;
        this.setType(arg.type.split("_")[0]);
        this.setCount(arg.num);
	}

	private setType(value:string)
	{
		if(value == this._type) return;
		this._type = value;
        this._drawType = true;
        this.dispatchRender();
	}

	private setCount(value:number)
	{
        if(this._count == value)return;
		this._count = value;
        this._drawCount = true;
        this.dispatchRender();
	}

    private dispatchRender():void
    {
        Manager.render.add(this.draw,this,0,1);
    }

    private draw():void
    {
        if(this._drawType)this.drawType();
        if(this._drawCount)this.drawCount();
        this._drawType = false;
        this._drawCount = false;
    }

    public dispose():void
    {
        if(this._resImg)
        {
            Manager.pool.push(this._resImg);
            this._resImg = null;
        }
        Manager.pool.push(this._countTxt);
        this._countTxt = null;
        this._homeLayer.parent.removeChild(this._homeLayer);
        this._homeLayer = null;
        this._homeImageLayer.parent.removeChild(this._homeImageLayer);
        this._homeImageLayer = null;
        Manager.render.remove(this.draw,this);
    }

	private drawType():void
	{
		this._resImg.source = "playRes_"+this._type+"_54_png";
		this._resImg.x = 0;
		this._resImg.y = 0;
		this._countTxt.x = this._iconSize;
		if(this._iconSize==PlayerResItems.ICON_30)this._countTxt.y = 3;
		else if(this._iconSize==PlayerResItems.ICON_54)this._countTxt.y = 15;
	}

	private drawCount():void
	{
		let str:string = HtmlUtil.addColorTag(this.sign+StringUtils.getBigNum(this._count),this.color); 
		HtmlUtil.setTextFlow(this._countTxt,str)
		this._w = this._iconSize + this._countTxt.textWidth;
	}

	public getWidth():number
	{
		return this._w;
	}
    public getHeight():number
    {
        return this._iconSize;
    }

	public setFontSize(value:number):void
	{
		this._countTxt.size = value;
	}
}