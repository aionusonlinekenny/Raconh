/**
 * 火眼金睛关卡目标子项
 * liangyan
 * create 2018-03-28
*/
class FireEyeLevelItem extends UIComponent
{
    private _txt:Label;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("fireEye", "FireEyeLevelItemSkin");
    }

    protected configUI():void
    {
        super.configUI();
    }

    public reuse(str:string):void
    {
        super.reuse();
        HtmlUtil.setTextFlow(this._txt, str);
        // this._txt.width = this._txt.textWidth + 10;
    }

    public unuse():void
    {
        super.unuse();
        this._txt.text = "";
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.remove(this._txt);
        this._txt.dispose();
        this._txt = null;
    }
}