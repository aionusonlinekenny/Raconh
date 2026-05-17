/**
 * 阶数视图
 * liangyan
 * create 2018-02-27
*/
class JieNumView extends UIComponent
{
    private _left:eui.Image;
    private _right:eui.Image;
    private _jie:eui.Image;

    private _num:NumImgView2;
    private _curNum:number;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("uiCommon", "JieNumViewSkin");
    }

    protected configUI():void
    {
        super.configUI();

        if(!this._num)
        {
            this._num = Manager.pool.create(NumImgView2);
			this._num.x = this._left.x + 16;
			this._num.y = this._left.y;
			this.addChild(this._num);
        }
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

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._left, this._right, this._jie, this._num);

        this._left.bitmapData = null;
        this._left = null;
        this._right.bitmapData = null;
        this._right = null;
        this._jie.bitmapData = null;
        this._jie = null;
        Manager.pool.push(this._num);
        this._num = null;
    }
}