/**
 * 数字显示类
 * author:Simon
 */
class NumImgView2 extends egret.DisplayObjectContainer implements cw.IPool
{
    private _imgList:Array<BitmapRes>;
    private _len:number=0;
    /**单一图片宽度 */
    private _imgWidth:number;
    /**间距 */
    private _gap:number=0;

    public constructor()
    {
        super();
    }

    private createBitmap(imgName:string, value:string):BitmapRes
    {
        let bitmap:BitmapRes = Manager.pool.create(BitmapRes, imgName + value + "_png");
        let len:number = this._imgList.length;
        bitmap.x = len > 0 && this._imgList[len-1] ? this._imgList[len-1].x + this._imgWidth + this._gap : 0;
        this.addChild(bitmap);
        return bitmap;
    }

    private createSctBitmap(type:number, value:string):BitmapRes
    {
        let name = SCTConst.getWord(type,value);
        let bitmap:BitmapRes = Manager.pool.create(BitmapRes,name);
        let len:number = this._imgList.length;
        bitmap.x = len > 0 && this._imgList[len-1] ? this._imgList[len-1].x + this._imgList[len-1].width + this._gap : 0;
        bitmap.y = -bitmap.height >> 1;
        this.addChild(bitmap);
        return bitmap;
    }

    private clean():void
    {
        if(this._imgList)
        {
            for(var i:number=0; i<this._imgList.length; i++)
            {
                if(this._imgList[i])
                    Manager.pool.push(this._imgList[i]);
                this._imgList[i] = null;
                delete this._imgList[i];
            }
        }
    }

    public setValue(value:any, imgName:string = "", imgWidth:number = 35, gap:number = 3, numType:number=-1, needAdd:boolean=false, wordType:number=-1, needPercent:boolean = false):void
	{
        this.clean();
        if(wordType != -1)
        {
            this._imgList.push(this.createSctBitmap(SCTConst.WORD, wordType+""));
        }
        if(imgName != "")
        {
            this._imgWidth = imgWidth;
            this._gap = gap;
            let str:string = "" + value;
            this._len = str.length;
            for(let i:number=0; i<this._len; i++)
            {
                this._imgList.push(this.createBitmap(imgName, str.substr(i,1)));
            }
        }
        if(numType != -1)
        {
            this._gap = SCTConst.getPadding(numType);
            if(needAdd)
            {
                this._imgList.push(this.createSctBitmap(numType, SCTConst.SIGN_ADD));
            }
            let str:string = "" + value;
            this._len = str.length;
            for(let i:number=0; i<this._len; i++)
            {
                this._imgList.push(this.createSctBitmap(numType, str.substr(i,1)));
            }
            if(needPercent)
            {
                this._imgList.push(this.createSctBitmap(numType, SCTConst.SIGN_PERCENT));
            }
        }
    }

    public reuse():void
    {
        this._imgList = [];
    }

    public unuse():void
    {
        this.clean();
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
    }

    public get width():number
    {
        return this._len * (this._imgWidth + this._gap) - this._gap;
    }

    public dispose():void
    {
        this.clean();

        if(this.parent)
        {
            this.parent.removeChild(this);
        }
    }
}