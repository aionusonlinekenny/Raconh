/**
 * 天天返利item
 * pzx 
 * create 18.3.14
 */
class DailyRebateItem extends UIComponent{
    private _rmbTxt:Label;
    private _item0:BaseGoods;
    private _item1:BaseGoods;
    private _item2:BaseGoods;
    private _item3:BaseGoods;
    private _ilingquImg:eui.Image;
    private _cvo:DailyRebateCVO;
    private _list:BaseGoods[];

	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("dailyrebate", "DailyRebateItemSkin");
    }
    protected configUI():void
    {
        super.configUI();
        this._list = [this._item0,this._item1,this._item2,this._item3];
    }

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    public setData(data):void
    {
        this._cvo = data;
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{
        if(!this._cvo) return;
        this._rmbTxt.text = this._cvo.amount + LangCVO.getContent("common37");//元
        this._ilingquImg.visible = this._cvo.isReward;
        let arr:GainLossVO[] = GainLossVO.parse(this._cvo.loss);
        for(let i:number = arr.length-1;i>-1;i--)
        {
            if(this._list[i])
            {
                this._list[i].setGainLossVO(arr[i]);
            }
        }
    }

    public reuse():void
    {
        super.reuse();
       
    }

    public unuse():void
    {
        super.unuse();
		this.clear();
    }
	
	private clear(isRemove:boolean=false):void
	{
        this._list.forEach((item,i)=>{
            Manager.pool.push(item);
        })
        this._list=null;
        this._rmbTxt.dispose();
        this._rmbTxt=null;
        this._item0=null;
        this._item1=null;
        this._item2=null;
        this._item3=null;
        this.removeChild(this._ilingquImg);
        this._ilingquImg=null;
        this._cvo=null;
	}

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }
}