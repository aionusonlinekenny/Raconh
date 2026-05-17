/**
 * 滚动提示框
 * pzx 
 * create 18-3-7
 */
class RollTips extends UIComponent implements IViewManager
{
	private _bgImg:eui.Image;
	private _descTxt:Label;
	
	private _starY:number;
	private _endY:number;
	//最强群攻文字长度：最强群攻 全屏大招  第15关任务开启
	//凌烟阁文字：天下绝学 世出凌烟  第10关任务开启
	public static verseList:number[]=[16,10];
	public static openPanel5:boolean;
	public static openPanel10:boolean;

	private _vers:number;
	// private _disPlay:egret.DisplayObjectContainer;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("tips", "RollTipSkin");
		this.visible = false;
		this.touchEnabled = this.touchChildren= false;
    }

    protected drawAll():void
	{
		super.drawAll();
		this.drawData();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    public setData(data):void
    {
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{
		if(this._vers == RollTips.verseList[0])
		{
			this._descTxt.text = LangCVO.getContent("task5");//最强群攻 全屏大招
		}
		else if(this._vers == RollTips.verseList[1])
		{
			this._descTxt.text = LangCVO.getContent("task6");//天下绝学 世出凌烟
		}
		this.visible = true;
    }
    public show(target:egret.DisplayObjectContainer,n:number):void
    {
		if(!target || !target.parent) return;
		// this._disPlay = target;
		this._vers = n;
		if(this._vers == RollTips.verseList[0])
		{
			RollTips.openPanel5 = true;
			this.x = 111;
			this.y = 193;
		}
		else if(this._vers == RollTips.verseList[1])
		{
			RollTips.openPanel10 = true;
			this.x = 23;
			this.y = 80;
		}
		target.addChild(this);
		this.starToweenPaly();
        //Manager.layer.tipsLayer.addChild(this);
    }

	
	private starToweenPaly():void
	{
		egret.Tween.removeTweens(this);
		this._starY = this.y;
		this._endY = this.y + 23;
		this.starTween();
	}
	private starTween():void
	{
		egret.Tween.get(this,{loop:false}).to({y:this._endY},600).call(this.star2Tween,this);
	}
	private star2Tween():void
	{
		egret.Tween.get(this,{loop:false}).to({y:this._starY},600).call(this.starTween,this);
	}
    public hide():void
    {
        this.dispose();
    }


    public dispose():void
    {
        super.dispose();
		egret.Tween.removeTweens(this);
		this.removeChild(this._bgImg);
		this._bgImg=null;
		this._descTxt.dispose();
		this._descTxt=null;
    }
}