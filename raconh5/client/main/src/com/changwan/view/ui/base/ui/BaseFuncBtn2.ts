/**
 * 
 */
class BaseFuncBtn2 extends egret.DisplayObjectContainer
{
    private _bgImg:BitmapRes;
    private _img:BitmapRes;
    private _redIcon:BitmapRes;
    private _changeEffect:Animation;

    private _menuBtnContent:any;
    private _imageContainer:egret.DisplayObjectContainer;

    public constructor(menuBtnContent:any, imageContainer:egret.DisplayObjectContainer)
    {
        super();
        this._menuBtnContent = menuBtnContent;
        this._imageContainer = imageContainer;
        this.start();
        this.addEvent();
    }

    protected start():void
    {
        this._bgImg = BitmapRes.create(this._menuBtnContent.bgImgNormal, 15, 27, 85, 85);
        this._imageContainer.addChild(this._bgImg);

		if(!this._changeEffect)
		{
			this._changeEffect = Manager.animation.createEffectAnimation("funcChange");
			this._changeEffect.width = 258;
			this._changeEffect.height = 258;
			this._changeEffect.x = -76;
			this._changeEffect.y = -60;
		}
        // if(!this._changeEffect.parent)
		// 	this._effect.addChild(this._changeEffect);
    }

    protected addEvent():void
    {}

    public dispose():void
    {
        
    }
}