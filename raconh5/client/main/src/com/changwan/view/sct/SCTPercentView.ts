/**
 * SCT视图
 * luzhihong
 * create 2017-11-08
 */
class SCTPercentView extends egret.DisplayObjectContainer implements cw.IPool
{
    private _khLeft:BitmapRes;
    private _khRight:BitmapRes;
    private _num:NumImgView2;

	public constructor()
	{
		super();
	}
    /**
     */
    public reuse(numType:number, value:number):void
    {
        let padding:number = SCTConst.getPadding(numType);
        this._khLeft = this.createBitmap(numType, SCTConst.SIGN_KH_LEFT);
        this.addChild(this._khLeft);

        // this._num = Manager.pool.create(NumPic, value, numType, true, -1, true);
        this._num = Manager.pool.create(NumImgView2);
        this._num.setValue(value, "", 0, 0, numType, true, -1, true);
        this._num.x = this.width + padding;
        this.addChild(this._num);

        this._khRight = this.createBitmap(numType, SCTConst.SIGN_KH_RIGHT);
        this._khRight.x = this.width + padding;
        this.addChild(this._khRight);
        
    }

    private createBitmap(numType:number, value:string):BitmapRes
    {
        let name = SCTConst.getWord(numType,value);
        let bitmap:BitmapRes = Manager.pool.create(BitmapRes,name);
        bitmap.y = -bitmap.height >> 1;
        this.addChild(bitmap);
        return bitmap;
    }

	public unuse():void
	{
		if(this.parent != null)this.parent.removeChild(this);
		this.x = 0;
		this.y = 0;
		this.alpha = 1;
		this.scaleX = 1;
		this.scaleY = 1;
		this.rotation = 0;
		this.visible = true;
		this.anchorOffsetX = 0;
		this.anchorOffsetY = 0;
        Manager.pool.push(this._khLeft);
        this._khLeft = null;
        Manager.pool.push(this._khRight);
        this._khRight = null;
        Manager.pool.push(this._num);
        this._num = null;
	}

	public dispose():void
	{
		if(this.parent != null)this.parent.removeChild(this);
        Manager.pool.push(this._khLeft);
        this._khLeft = null;
        Manager.pool.push(this._khRight);
        this._khRight = null;
        Manager.pool.push(this._num);
        this._num = null;
	}
}