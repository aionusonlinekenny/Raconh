/**
 * pzx 
 * 17.11.10
 * 任务进度条
 * @devil 2018-04-17
 */
class TaskProgress2 implements cw.IDispose
{
    private _homeImageLayer:egret.DisplayObjectContainer;
    private _homeLayer:egret.DisplayObjectContainer;

    private _back:BitmapRes;
    private _barImg:BitmapRes;
    private _proTxt:TextField;

    private _barW:number;
	private _totlaPro:number;
	private _pro:number;


    public constructor(homeImageLayer:egret.DisplayObjectContainer,homeLayer:egret.DisplayObjectContainer)
    {
        this._homeImageLayer = ObjectUtil.createConainer();
        homeImageLayer.addChild(this._homeImageLayer);
        this._homeLayer = ObjectUtil.createConainer();
        homeLayer.addChild(this._homeLayer);

        this._back = BitmapRes.create("task_jinduBg_png",1,1);
        this._homeImageLayer.addChild(this._back);
        this._barImg = BitmapRes.create("task_jindu_png",5,4);
        this._barImg.height = 14;
        this._barImg.scale9Grid = new egret.Rectangle(13,1,82,11);
        this._homeImageLayer.addChild(this._barImg);
        this._proTxt = TextField.create(70,19,0xfff7e7,20,"center");
        this._proTxt.move(24,1);
        this._homeLayer.addChild(this._proTxt);

        this._barW = 108;
    }

    public move(x:number,y:number):void
    {
        this._homeImageLayer.x = x;
        this._homeImageLayer.y = y;
        this._homeLayer.x = x;
        this._homeLayer.y = y;
    }

	/**
	 *  value 当前进度
	 *  totalPro 总进度
	 */
	public setData(value:number,totolPro:number):void
    {
        if(this._pro == value && this._totlaPro == totolPro)return;
		this._pro = value;
		this._totlaPro = totolPro;
        Manager.render.add(this.drawView,this,0,1);
    }

	private drawView():void
	{
		if(this._pro >this._totlaPro)
		{
			this._pro = this._totlaPro;
		}
		this._proTxt.text = this._pro + "/" + this._totlaPro;
		let c:number = this._pro / this._totlaPro;
        this._barImg.setWidth(this._barW * c);
	}

    public dispose():void
    {
        Manager.pool.push(this._back);
        this._back = null;
        Manager.pool.push(this._barImg);
        this._barImg = null;
        Manager.pool.push(this._proTxt);
        this._proTxt = null;
        this._homeLayer.parent.removeChild(this._homeLayer);
        this._homeLayer = null;
        this._homeImageLayer.parent.removeChild(this._homeImageLayer);
        this._homeImageLayer = null;
        Manager.render.remove(this.drawView,this);
    }
}