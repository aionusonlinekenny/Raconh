/**
 * 火眼金睛完成等待视图
 * liangyan
 * create 2018-03-31
*/
class FireEyeFinishView extends UIComponent
{
    private _back:BitmapRemote;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("fireEye", "FireEyeFinishViewSkin");
        this.touchChildren = true;
    }

    protected configUI():void
    {
        super.configUI();

        let path = Manager.path.getFireEyePath("dark_back");
        this._back.load(path);
        this._back.touchEnabled = true;
    }

    public dispose():void
    {
        super.dispose();
        if(this._back != null) Manager.pool.push(this._back);
        this._back = null;
    }
}