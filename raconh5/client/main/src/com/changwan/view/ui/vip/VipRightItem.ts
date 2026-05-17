/**
 * vip特权文本子项
 * liangyan
 * create 2017-12-26
*/
class VipRightItem extends ItemRenderer
{
    private _txt:Label;
    private _icon:eui.Image;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("vip", "VipRightItemSkin");
    }

    protected dataChanged():void
    {
        HtmlUtil.setTextFlow(this._txt, this.data.str);
        this._txt.width = this._txt.textWidth + 10;
        this._icon.x = this._txt.width + 50;
        this._icon.visible = this.data.isNew;
    }

    private clear(isRemove:boolean = false):void
    {
        if(isRemove) ObjectUtil.removes(this._txt, this._icon);
        this._txt.dispose();
        this._txt = null;
        this._icon.bitmapData = null;
        this._icon = null;
    }

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }
}