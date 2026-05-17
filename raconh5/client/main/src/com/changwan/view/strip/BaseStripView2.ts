/**
 * 进度条基础视图
 * liangyan
 * create 2017-11-16
 * @update devil 2018-04-19
*/
class BaseStripView2
{
    protected _imageLayer:egret.DisplayObjectContainer;
    protected _layer:egret.DisplayObjectContainer;

    protected _txt:TextField;

    protected _isInit:boolean;
    private _current:number;//当前百分比
    private _fullFirst:boolean;
    private _target:number;//目标百分比
    private _speed:number;

    public constructor(uiImageLayer:egret.DisplayObjectContainer,uiLayer:egret.DisplayObjectContainer)
    {
        this._imageLayer = ObjectUtil.createConainer();
        uiImageLayer.addChild(this._imageLayer);
        this._layer = ObjectUtil.createConainer();
        uiLayer.addChild(this._layer);
		this._fullFirst = this._isInit = true;
		this._current = this._target = this._speed = 0;
		this.start();
    }

	public move(x:number,y:number):void
	{
		this._imageLayer.x = x;
		this._layer.x = x;
		this._imageLayer.y = y;
		this._layer.y = y;
	}

    protected start():void
    {

    }

	protected setPer(per:number):void
	{
		if(per < 0) per += 1;
		if(this._txt != null)
		{
			let msg = (per * 100).toFixed(2) + "% ";
			if(this._txt.text != msg) this._txt.text = msg;
		}
	}

	/**
	 * 更新百分比
	 * @param fullFirst 为true时，先进度条先升到100%再从0%升到目标值
	 */		
	public updatePercent(value:number,fullFirst:boolean=false):void
	{
		this._target = value;
		this._fullFirst = fullFirst;
		if(this._isInit || (Math.abs(this._target - this._current) < 0.02))
		{
			this._current = this._target;
			this.setPer(this._current);
		} 
		else
		{
            let dis:number = this._fullFirst ? (this._target + 1 - this._current) / 20 : (this._target - this._current) / 20;
            this._speed = dis / Manager.global.FRAME_TIME//; * 1000;
			Manager.render.add(this.render, this);
		}
		this._isInit = false;
	}

    private render(interval:number):void
	{
        let value:number = this._speed * interval;
        if(Math.abs(this._target - this._current) <= Math.abs(value))
		{
			Manager.render.remove(this.render, this);
			this._current = this._target;
		}
		else 
		{
			this._current += value;
			if(this._fullFirst && this._current > 1) this._current -= 1;
		}
			
		this.setPer(this._current);
	}

    // public unuse():void
    // {
	// 	Manager.render.remove(this.render, this);
    //     if(this._txt)
    //     {
	// 		Manager.pool.push(this._txt);
    //         this._txt = null;
    //     }
    // }

	public dispose():void
	{
		Manager.render.remove(this.render, this);
		if(this._txt)
		{
            Manager.pool.push(this._txt);
        	this._txt = null;
		}
		if(this._imageLayer.parent)this._imageLayer.parent.removeChild(this._imageLayer);
        this._imageLayer = null;
		if(this._layer.parent)this._layer.parent.removeChild(this._layer);
        this._layer = null;
	}
}