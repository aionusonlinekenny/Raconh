/**
 * 主线副本单个排名信息
 * luzhihong
 * create 2017.12.2
 */
class CopyRankItem extends ItemRenderer
{
    private _txtRank:Label;
    private _txtName:Label;
    private _txtPower:Label;
    private _txtValue:Label;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("copy", "CopyRankItemSkin");
    }

    protected dataChanged():void
    {
        let info:CopyRankInfo = this.data as CopyRankInfo;
        this._txtRank.text = "" + info.rank;
        this._txtName.text = info.name;
        this._txtPower.text = "" + info.power;
        this._txtValue.text = "" + info.value;
    }

    public dispose():void
    {
		super.dispose();
        this._txtRank.dispose();
        this._txtRank = null;
        this._txtName.dispose();
        this._txtName = null;
        this._txtPower.dispose();
        this._txtPower = null;
        this._txtValue.dispose();
        this._txtValue = null;
	}
}