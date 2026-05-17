/**
 * boss单层血条
 * liangyan
 * create 2017-12-13
 * @update devil 2018-04-20
*/
class BaseBossBloodStrip2 extends BaseStripView2
{
    private _bloodTween:BitmapRes;
    private _blood:BitmapRes;

    private _sourceArr:Array<string>;
    public static WIDTH = 406;
    private _curIndex:number;

    public constructor(uiImageLayer:egret.DisplayObjectContainer,uiLayer:egret.DisplayObjectContainer)
    {
        super(uiImageLayer,uiLayer);
        this._curIndex = -1;
        this._sourceArr = ["strip_red_png", "strip_orange_png", "strip_purple_png", "strip_blue_png", "strip_green_png"];
    }

    protected start():void
    {
        super.start();
        this._bloodTween = BitmapRes.create("strip_alpha50_png", 0,1,BaseBossBloodStrip2.WIDTH,24);
        this._imageLayer.addChild(this._bloodTween);
        this._blood = BitmapRes.create("",0,0,BaseBossBloodStrip2.WIDTH, 26);
        this._imageLayer.addChild(this._blood);
    }

    public set index(value:number)
    {
        if(this._curIndex == value) return;
        this._curIndex = value;
        this._isInit = true;
        this._blood.source = this._sourceArr[this._curIndex % 5];
        this.updatePercent(1);
        this._bloodTween.scaleX = 1;
    }

    protected setPer(per:number):void
    {
        super.setPer(per);
        this._blood.width = BaseBossBloodStrip2.WIDTH * per;
    }

    public updatePercent(value:number):void
    {
        if(this._bloodTween.scaleX < value) this._bloodTween.scaleX = 1;
        super.updatePercent(value,false);
        egret.Tween.removeTweens(this._bloodTween);
        egret.Tween.get(this._bloodTween, {loop: false}).to({scaleX:value}, 1500);
    }

	public dispose():void
	{
		super.dispose();
        egret.Tween.removeTweens(this._bloodTween);
        this._blood.pool();
        this._blood = null;
        this._bloodTween.pool();
        this._bloodTween = null;
        this._sourceArr = null;
	}
}