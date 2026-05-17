/**
 * 排行榜第2、3名单个信息视图
 * luzhihong
 * create 2017-11-02
 */
class RankItem1 extends ItemRenderer
{
	private _info:RankInfo;
	private _back:eui.Image;
	private _headBackImg:eui.Image;
	private _iconRank:eui.Image;
	private _txtName:Label;
	private _txtValue:Label;
	private _imageHead:BitmapRemote;
	
	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("rank", "RankItemSkin1");
	}

    protected dataChanged():void
	{
        let info:RankInfo = this.data as RankInfo;
		if(this._info == info) return;
		this._info = info;

		if(this._info != null)
		{
			this.visible = true;
			this._iconRank.source = "rank_" + this._info.rank + "_png";
			this._txtName.text = this._info.name;
			this._txtValue.text = this.getValueLabel(this._info);
		}
		else
		{
			this.visible = false;
		}

		if(!this._imageHead)
			this._imageHead = Manager.pool.create(BitmapRemote);
		this._imageHead.load(Manager.path.getRoleHeadPath(2, this._info.career), 74, 74);
		this._imageHead.x = this._headBackImg.x + 13;
		this._imageHead.y = this._headBackImg.y + 13;
		this.addChildAt(this._imageHead, this.getChildIndex(this._headBackImg) + 1);
	}

	private getValueLabel(info:RankInfo):string
	{
		switch(info.type)
		{
			case RankConst.TYPE_POWER:
			case RankConst.TYPE_PET:
			case RankConst.TYPE_MING_GE:
				return LangCVO.getContent("rank1") + info.value;//1	战力：
			case RankConst.TYPE_LEVEL:
				// let str:string = info.value + LangCVO.getContent("common15");//15	级
				// if(info.zhuanshu > 0) str = info.zhuanshu + LangCVO.getContent("common14") + str;//14	转
				// return str;
				return LangCVO.getContent("rank11") + info.value;//11	等级：
			case RankConst.TYPE_JIE_XUE:
				return LangCVO.getContent("rank10") + info.value;//10	境界：
			case RankConst.TYPE_GEM:
			case RankConst.TYPE_SOUL:
				return LangCVO.getContent("rank2") + info.value;//2	总等级：
		}
		return ""
	}
	
    public dispose():void
    {
        super.dispose();
		this._info = null;
		this._back.parent.removeChild(this._back);
		this._back = null;
		this._headBackImg.parent.removeChild(this._headBackImg);
		this._headBackImg = null;
		this._iconRank.parent.removeChild(this._iconRank);
		this._iconRank = null;
		this._txtName.dispose();
		this._txtName = null;
		this._txtValue.dispose();
		this._txtValue = null;
		if(this._imageHead)
			Manager.pool.push(this._imageHead);
		this._imageHead = null;
    }
}