/**
 * 魔神降临骰子
 * liangyan
 * create 2018-04-17
*/
class DevilDiceItem extends RenderSprite
{
    private _back:BitmapRes;
    private _num:NumImgView2;

    /**骰子数字 */
    private _value:number;
    /**半径 */
    private _radius:number;
    /**x轴偏移量 */
	private _offsetX:number;
    /**y轴偏移量 */
    private _offsetY:number;
    /**x轴反转系数 */
	private _ratioX:number;
    /**y轴反转系数 */
	private _ratioY:number;
    /**初始x */
    private _initX:number;
    /**初始y */
	private _initY:number;
    /**顶部限制偏移量 */
	private readonly top:number = -180;
    /**底部限制偏移量 */
	private readonly bottom:number = 180;
    /**左边限制偏移量 */
	private readonly left:number = -180;
    /**右边限制偏移量 */
	private readonly right:number = 180;

    public constructor(value:number)
    {
        super();
        this._value = value;
        this.start();
        this.addEvent();
    }

    protected start():void
    {
        super.start();

        this._back = BitmapRes.create("devil_ball_png");
        this.addChild(this._back);

        this._num = Manager.pool.create(NumImgView2);
        this._num.setValue(this._value, "nums_devil_", 16);
        if(this._value >= 100) this._num.x = 18;
        else if(this._value >= 10) this._num.x = 28;
        else this._num.x = 38;
        this._num.y = 34;
        this.addChild(this._num);

        this._radius = 49;
        this._offsetX = this._offsetY = 0;
        this._initX = 280;
        this._initY = 230;
        this._ratioX = Math.random () * 10 + 8;
		this._ratioY = Math.random () * 10 + 8;
    }

    private moving():void 
	{
		var radius = this._radius;
		this._offsetX += this._ratioX;
		this._offsetY += this._ratioY;
			
		if (this._offsetX + radius > this.right)
		{
			this._offsetX = this.right - radius;
			this._ratioX *= -1;
		}
        else if(this._offsetX - radius < this.left)
		{
			this._offsetX = this.left + radius;
			this._ratioX *= -1;
		}
		if(this._offsetY - radius < this.top)
		{
			this._offsetY = this.top + radius;
			this._ratioY *= -1;
		}
        else if(this._offsetY + radius > this.bottom)
		{
			this._offsetY = this.bottom - radius;
			this._ratioY *= -1;
		}
			
		this.x = this._initX + this._offsetX;
		this.y = this._initY + this._offsetY;
	}

    public setMoving():void
    {
        Manager.render.add(this.moving, this);
    }

    public stop(x:number, y:number):void
    {
        Manager.render.remove(this.moving, this);
        egret.Tween.removeTweens(this);
        egret.Tween.get(this, {loop: false}).to({x:x, y:y}, 300);
    }

    protected disposeSelf():void
    {
        egret.Tween.removeTweens(this);
        Manager.render.remove(this.moving, this);
        super.disposeSelf();
        if(this._back) Manager.pool.push(this._back);
        this._back = null;
        if(this._num) Manager.pool.push(this._num);
        this._num = null;
    }
}