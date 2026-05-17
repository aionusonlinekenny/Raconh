/**
 * 滚动提示框
 * pzx 
 * create 18-3-7
 * @update devil 2018-04-16
 */
class RollTips2 implements IViewManager
{
    private _homeImageLayer:egret.DisplayObjectContainer;
    private _tipImageLayer:egret.DisplayObjectContainer;
    private _tipLayer:egret.DisplayObjectContainer;

	private _bgImg:BitmapRes;
    private _tips:BitmapRes;
	private _descTxt:TextField;
    private _vers:number;
	private _starY:number;
	private _endY:number;
	public static openPanel5:boolean;
	public static openPanel10:boolean;
	//最强群攻文字长度：最强群攻 全屏大招  第16关任务开启
	//凌烟阁文字：天下绝学 世出凌烟  第10关任务开启
	public static verseList:number[]=[16,11];


    protected start(pos:egret.Point):void
    {
        let layer:LayerManager = Manager.layer;
        this._homeImageLayer = ObjectUtil.createConainer();
        this._homeImageLayer.touchChildren = false;
        layer.homeImageLayer.addChild(this._homeImageLayer);
        this._tipImageLayer = ObjectUtil.createConainer();
        this._tipImageLayer.touchChildren = false;
        layer.tipImageLayer.addChild(this._tipImageLayer);
        this._tipLayer = ObjectUtil.createConainer();
        this._tipLayer.touchChildren = false;
        layer.tipLayer.addChild(this._tipLayer);

        this._bgImg = BitmapRes.create("common_rect_1_png",2,75,202,63);
        this._bgImg.scale9Grid = new egret.Rectangle(6,6,38,38);
        this._homeImageLayer.addChild(this._bgImg);

        this._tips = BitmapRes.create("common_jiantou_png",3,77);
        this._tips.scaleY = -1;
        this._tipImageLayer.addChild(this._tips);

        this._descTxt = TextField.create(198,31,0xffba00,22);
        this._descTxt.move(12,95);
        this._tipLayer.addChild(this._descTxt);
        pos = layer.tipImageLayer.globalToLocal(pos.x,pos.y);
        this.layout(pos);
    }

    private layout(pos:egret.Point):void
    {
        let x:number = pos.x;
        let y:number = pos.y;
        if(this._vers == RollTips2.verseList[0])
		{
            x = x + 111;
            y = y + 193
        }
        else if(this._vers == RollTips2.verseList[1])
        {
            x = x + 23;
            y = y + 80
        }
        this._homeImageLayer.x = x;
        this._homeImageLayer.y = y;
        this._tipImageLayer.x = x;
        this._tipImageLayer.y = y;
        this._tipLayer.x = x;
        this._tipLayer.y = y;
        this._starY = this._homeImageLayer.y;
		this._endY = this._homeImageLayer.y + 23;
    }


    public show(n:number,pos:egret.Point):void
    {
		this._vers = n;
        this.start(pos);
		if(this._vers == RollTips2.verseList[0])
		{
			RollTips2.openPanel5 = true;
            this._descTxt.text = LangCVO.getContent("task5");//最强群攻 全屏大招
		}
		else if(this._vers == RollTips2.verseList[1])
		{
			RollTips2.openPanel10 = true;
            this._descTxt.text = LangCVO.getContent("task6");//天下绝学 世出凌烟
		}
        // this._descTxt.cacheAsBitmap = true;
		this.starToweenPaly();
    }

	private starToweenPaly():void
	{
		egret.Tween.removeTweens(this._homeImageLayer);
        egret.Tween.removeTweens(this._tipImageLayer);
        egret.Tween.removeTweens(this._tipLayer);
        egret.Tween.get(this._homeImageLayer,{loop:true}).to({y:this._endY},600).to({y:this._starY},600);
        egret.Tween.get(this._tipImageLayer,{loop:true}).to({y:this._endY},600).to({y:this._starY},600);
        egret.Tween.get(this._tipLayer,{loop:true}).to({y:this._endY},600).to({y:this._starY},600);
	}
    public hide():void
    {
        this.dispose();
    }
    public dispose():void
    {
		egret.Tween.removeTweens(this._homeImageLayer);
        egret.Tween.removeTweens(this._tipImageLayer);
        egret.Tween.removeTweens(this._tipLayer);
        if(this._bgImg)
        {
            Manager.pool.push(this._bgImg);
            this._bgImg = null;
        }
        if(this._tips)
        {
            Manager.pool.push(this._tips);
            this._tips = null;
        }
        if(this._descTxt)
        {
            Manager.pool.push(this._descTxt);
            this._descTxt = null;
        }
        this._homeImageLayer.parent.removeChild(this._homeImageLayer);
        this._homeImageLayer = null;
        this._tipImageLayer.parent.removeChild(this._tipImageLayer);
        this._tipImageLayer = null;
        this._tipLayer.parent.removeChild(this._tipLayer);
        this._tipLayer = null;
    }
}