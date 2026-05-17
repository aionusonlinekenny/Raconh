/**
 * 阶数视图
 * liangyan
 * create 2018-02-27
*/
class JieNumView2 extends RenderSprite
{
    private _left:BitmapRes;
    private _right:BitmapRes;
    private _jie:BitmapRes;
    private _num:NumImgView2;
    private _curNum:number;

    public constructor()
    {
        super();
        this.touchEnabled = false;
        this.touchChildren = false;
        this.start();
        this.addEvent();
    }

    protected start():void
    {
        super.start();
        this._left = BitmapRes.create("common_bracket_png",-8,4);
        this.addChild(this._left);
        this._right = BitmapRes.create("common_bracket_png",82,4);
        this._right.scaleX = -1;
        this.addChild(this._right);
        this._jie = BitmapRes.create("common_label_jie_png",32,3);
        this.addChild(this._jie);

        this._num = Manager.pool.create(NumImgView2);
        this._num.x = this._left.x + 16;
        this._num.y = this._left.y;
        this.addChild(this._num);
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
    private drawData():void
    {
        if(!this._curNum) return;
        this._num.setValue(this._curNum, "nums_jie_", 12);
        if(this._curNum >= 10)
        {
            this._jie.x = 44;
            this._right.x = 94;
        }
        else
        {
            this._jie.x = 32;
            this._right.x = 82;
        }
    }

    public set jie(value:number)
    {
        if(this._curNum == value) return;
        this._curNum = value;
        this.invalidate(InvalidationType.DATA);
    }

    protected disposeSelf():void
    {
        super.disposeSelf();
        if(this._left)
        {
            Manager.pool.push(this._left);
            this._left = null;
        }
        if(this._right)
        {
            Manager.pool.push(this._right);
            this._right = null;
        }
        if(this._jie)
        {
            Manager.pool.push(this._jie);
            this._jie = null;
        }
        if(this._num)
        {
            Manager.pool.push(this._num);
            this._num = null;
        }
    }
}