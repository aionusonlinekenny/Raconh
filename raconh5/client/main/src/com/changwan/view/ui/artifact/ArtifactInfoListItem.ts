/**
 * pzx 
 * 个人寻宝信息
 * create 18.2.8
 */
class ArtifactInfoListItem extends  ItemRenderer{
	private _label:Label;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("artifact", "ArtifactInfoListItemSkin");
    }
    protected createChildren():void
    {
        super.createChildren();
        this._label.lineSpacing = 5;
    }

  
	protected dataChanged():void
    {
        super.dataChanged();
		let info:ArtifactSelfLogInfo = this.data;
		HtmlUtil.setTextFlow(this._label,info.desc());
        this.height = this._label.height+10;
    }

    public dispose():void
    {
		super.dispose();
		this._label.dispose();
		this._label = null;
    }
}