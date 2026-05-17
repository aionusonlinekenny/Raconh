/**
 * 火眼金睛√×
 * liangyan
 * create 2018-04-03
*/
class FireEyeStatus extends RenderSprite
{
    private _bm:BitmapRes;
    private _status:boolean;

    public constructor()
    {
        super();
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawLayout();
    }

    private drawLayout():void
    {
        if(this._bm == null)
        {
            this._bm = Manager.pool.create(BitmapRes, this._status ? "fireEye_right_png" : "fireEye_wrong_png");
            this.addChild(this._bm);
        }

        Manager.render.add(this.remove, this, this._status ? 500 : 3000, 1);
    }

    private remove():void
    {
        Manager.render.remove(this.remove, this);
        Manager.pool.push(this);
    }

    public reuse(status:boolean):void
    {
        this._status = status;
        super.reuse();
    }

    public unuse():void
    {
        Manager.render.remove(this.remove, this);
        super.unuse();
        if(this._bm) Manager.pool.push(this._bm);
        this._bm = null;
        this._status = false;
    }

    public dispose():void
    {
        Manager.render.remove(this.remove, this);
        super.dispose();
        if(this._bm) Manager.pool.push(this._bm);
        this._bm = null;
    }
}