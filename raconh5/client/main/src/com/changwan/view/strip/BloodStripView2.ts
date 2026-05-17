/**
 * 血条
 * liangyan
 * create 2017-11-16
 * @update  devil 2018-04-21
*/
class BloodStripView2 extends BaseStripView2
{
    
    private _back:BitmapRes;
    private _blood:BitmapRes;
	private _currBlood:number;
	private _totalBlood:number;
    private _drawBlood:boolean;
    private _info:AliveGameObjectInfo;

    public constructor(imageLayer:egret.DisplayObjectContainer,layer:egret.DisplayObjectContainer,info:AliveGameObjectInfo)
    {
        super(imageLayer,layer);
		this.reuse(info);
    }

    private dispatchRender():void
    {
        Manager.render.add(this.repaint,this,0,1);
    }

    private repaint():void
    {
        if(this._drawBlood)this.drawBlood();
        this._drawBlood = false;
    }

	protected start():void
	{
		super.start();
		this._back = Manager.pool.create(BitmapRes, "common_hp_bg_png");
		this._imageLayer.addChild(this._back);
        this._blood = Manager.pool.create(BitmapRes);
		this._blood.x = 2.5;
		this._blood.y = 2.5;
		this._imageLayer.addChild(this._blood);
	}

	// public setVisible(visible:boolean):void
	// {
	// 	if(visible)
	// 	{
	// 		if(!this._imageLayer.parent)this._imageLayer.parent.addChild(this._imageLayer);
	// 		if(!this._layer.parent)this._layer.parent.addChild(this._layer);
	// 	}
	// 	else
	// 	{
	// 		if(this._imageLayer.parent)this._imageLayer.parent.removeChild(this._imageLayer);
	// 		if(this._layer.parent)this._layer.parent.removeChild(this._layer);
	// 	}
	// }

	/**
	 * 更新
	 */		
	public updateBlood():void
	{
        this._drawBlood = true;
        this.dispatchRender();
	}

    private drawBlood():void
    {
		this._currBlood = this._info.attrInfo.hp;
		this._totalBlood = this._info.attrInfo.hpMax;
		if(this._totalBlood == 0)
		{
			Trace.error("总血量不能为0！");
			return;
		}
		if(this._currBlood > this._totalBlood) this._currBlood = this._totalBlood;
		this.updatePercent(this._currBlood / this._totalBlood);
    }

	protected setPer(per:number):void
	{
		super.setPer(per);
		this._blood.width = Math.round(74 * per);
	}

    // public unuse():void
    // {
	// 	Manager.pool.push(this._back);
    //     Manager.pool.push(this._blood);
	// 	this._back = null;
    //     this._blood = null;
    //     this._info = null;
    //     super.unuse();
    // }

	private reuse(info:AliveGameObjectInfo):void
	{
        this._info = info;
		this._blood.source = (this._info instanceof SelfGameObjectInfo) ? "common_hp_self_png" : "common_hp_other_png";
		// super.reuse();
        this._drawBlood = true;
        this.dispatchRender();
	}

	public dispose():void
	{
		super.dispose();
        Manager.render.remove(this.repaint,this);
		Manager.pool.push(this._back);
        Manager.pool.push(this._blood);
		this._back = null;
        this._blood = null;
        this._info = null;
	}
}