/**
 * boss双血条元素
 * liangyan
 * create 2017-12-07
 * @update devil 2018-04-20
*/
class BaseBossBlood2 implements cw.IDispose
{
    private _imageLayer:egret.DisplayObjectContainer;
    private _layer:egret.DisplayObjectContainer;

    private _bloodStrip1:BaseBossBloodStrip2;
    private _bloodStrip2:BaseBossBloodStrip2;
    private _curTxt:TextField;
    private _multiply:BitmapRes;
    private _curStrip:NumImgView2;

    private _info:MonsterGameObjectInfo;
    private _curIndex:number;
	private _currBlood:number;
    private _totalBlood:number;
    private _stripCount:number;
    private _hpSingleStrip:number;

    public constructor(uiImageLayer:egret.DisplayObjectContainer,uiLayer:egret.DisplayObjectContainer,info:MonsterGameObjectInfo)
    {
        this._imageLayer = ObjectUtil.createConainer();
        uiImageLayer.addChild(this._imageLayer);
        // this._imageLayer.y = -3;
        this._layer = ObjectUtil.createConainer();
        // this._layer.y = -3;
        uiLayer.addChild(this._layer);

        this._info = info;
        this._totalBlood = this._info.attrInfo.hpMax;
        this._stripCount = this._info.cvo.hpSection;
        this._hpSingleStrip = this._totalBlood / this._stripCount;
        this._curIndex = Math.ceil(this._info.attrInfo.hp / this._totalBlood * this._stripCount) - 1;
        this.start();
        this.updateBlood();
    }

    public move(x:number,y:number):void
    {
        this._imageLayer.x = x;
        this._imageLayer.y = y;
        this._layer.x = x;
        this._layer.y = y;
    }

    private start():void
    {
        this._bloodStrip1 = new BaseBossBloodStrip2(this._imageLayer,this._layer);
        this._bloodStrip1.index = this._curIndex - 1;
        this._bloodStrip2 = new BaseBossBloodStrip2(this._imageLayer,this._layer);
        this._bloodStrip2.index = this._curIndex;
        this._bloodStrip1.move(0,1);
        this._bloodStrip2.move(0,1);

        this._curTxt = TextField.create(BaseBossBloodStrip2.WIDTH,23,Color.WHITE,20,"center");
        this._curTxt.y = 3;
        this._layer.addChild(this._curTxt);

        this._multiply = Manager.pool.create(BitmapRes, "nums_count_X_png");
        this._multiply.x = 328;
        this._multiply.y = -2;
        this._layer.addChild(this._multiply);

        this._curStrip = Manager.pool.create(NumImgView2);
        this._curStrip.x = 347;
        this._curStrip.y = -2
        this._curStrip.setValue(this._curIndex + 1, "nums_count_", 27);
        this._layer.addChild(this._curStrip);
    }

	/**更新血量 */
	public updateBlood():void
	{
		this._currBlood = this._info.attrInfo.hp;
        if(this._currBlood < (this._curIndex * this._hpSingleStrip))
        {
            this._curIndex = Math.ceil(this._info.attrInfo.hp / this._totalBlood * this._stripCount) - 1;
            if(this._curIndex < 1)
            {
                if(this._bloodStrip1)
                {
                    this._bloodStrip1.dispose();
                    this._bloodStrip1 = null;
                }
            }
            else this._bloodStrip1.index = this._curIndex - 1;
            this._bloodStrip2.index = this._curIndex;
            this._curStrip.setValue(this._curIndex + 1, "nums_count_", 27);
        }

        this._curTxt.text = this._currBlood + "/" + this._totalBlood;
		let per:number;
        if(this._currBlood == this._info.attrInfo.hpMax) per = 1;
        else per = this._currBlood % this._hpSingleStrip / this._hpSingleStrip;
        this._bloodStrip2.updatePercent(per);  
	}

	public dispose():void
	{
        if(this._bloodStrip1)
        {
            this._bloodStrip1.dispose();
            this._bloodStrip1 = null;
        }
        this._bloodStrip2.dispose();
        this._bloodStrip2 = null;
        this._curTxt.pool();
        this._curTxt = null;
        this._multiply.pool();
        this._multiply = null;
        this._curStrip.dispose();
        this._curStrip = null;
        this._info = null;
        this._imageLayer.parent.removeChild(this._imageLayer);
        this._imageLayer = null;
        this._layer.parent.removeChild(this._layer);
        this._layer = null;
	}
}