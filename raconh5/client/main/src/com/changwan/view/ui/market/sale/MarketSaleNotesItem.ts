/**
 * 市场记录item
 * pzx
 * create 2018-4-13
 */
class MarketSaleNotesItem extends  ItemRenderer{
	private _txt0:Label;
	private _txt1:Label;
	private _txt2:Label;
	private _txt3:Label;

	public constructor()
    {
        super();
		this.skinName = Manager.path.getSkinName("market", "MarketSaleNotesItemSkin");
    }
    protected createChildren():void
    {
        super.createChildren();

    }
  
	protected dataChanged():void
    {
        super.dataChanged();
        let data:MarketSaleBuyNoticeInfo = this.data;
        let i:number = 1;
        if(data.type == 1)
        {
            this._txt0.text = LangCVO.getContent("market5");
        }
        else
        {
            this._txt0.text = LangCVO.getContent("market6");
            i = -1;
        }
        let cvo:ItemsCVO = ItemsCVO.getCvo(data.base_id);
        this._txt1.text = cvo.name;
        this._txt2.text = i * data.price+"";
        this._txt3.text = cw.DateUtil.formatStr(data.sale_time, cw.DateUtil.YYYY_MM_DD_HH_MM_SS)
    }

    public dispose():void
    {
        ObjectUtil.disposes(this._txt0,this._txt1,this._txt2,this._txt3);
        this._txt0=null;
        this._txt1=null;
        this._txt2=null;
        this._txt3=null;

    }
}