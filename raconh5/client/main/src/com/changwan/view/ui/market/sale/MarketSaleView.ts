/**
 * 市场上架
 * pzx
 * create 2018-4-12
 */
class MarketSaleView extends UIComponent{
    private _jiluImg:eui.Image;
    private _curTxt:Label;
    private _vscroll:BaseVScrollerList;

    private _item0:MarketSaleItem;
    private _item1:MarketSaleItem;
    private _item2:MarketSaleItem;
    private _item3:MarketSaleItem;
    private _item4:MarketSaleItem;
    private _item5:MarketSaleItem;
    private _item6:MarketSaleItem;
    private _item7:MarketSaleItem;

    private _bagModel:ItemsModel;
    private _model:MarketModel;
    private _curPlayInfo:MarketPlayerInfo;
    private _itemList:MarketSaleItem[];

   


	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("market", "MarketSaleViewSkin");
        this.touchChildren = true;
    }
    protected configUI():void
    {
        super.configUI();
        this._bagModel = Manager.model.getItems();
        this._model = Manager.model.getmarketModel();
        this._bagModel.sortBagList();
        this._vscroll.initBtnListData(MarketSaleBagItem,[],true);
        if(!this._itemList)
        {
            this._itemList = [this._item0,this._item1,this._item2,this._item3,this._item4,this._item5,this._item6,this._item7];
        }
       
        Manager.control.getmarket().playerInfo(Manager.model.self.id);
        
    }

    protected addEvent():void
    {
        this._bagModel.addEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.drawBagData,this);
        this._jiluImg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
        this._model.addEventListener(MarketEvent.MARKET_PLAYER_INFO_EVENT,this.drawPalyerInfoHandler,this);
        super.addEvent();
    }

    protected removeEvent():void
    {
        this._bagModel.removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.drawBagData,this);
        this._jiluImg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
        this._model.removeEventListener(MarketEvent.MARKET_PLAYER_INFO_EVENT,this.drawPalyerInfoHandler,this);
        super.removeEvent();
    }
    private onTouchHandler(e:egret.TouchEvent):void
    {
        if(e.target == this._jiluImg)
        {
            Manager.view.show(ViewID.MarketSaleNotesView);
        }
    }

     //玩家摊位信息返回
    private drawPalyerInfoHandler():void
    {
        this._curPlayInfo = this._model.getSelfMarketInfo();
        if(this._curPlayInfo.play_id == Manager.model.self.id)
        {

            let arr:Array<MarketItemInfo> = this._curPlayInfo.itemList;
            for(let i:number = this._itemList.length - 1;i>-1;i--)
            {
                if(arr[i])
                {
                    this._itemList[i].setData(arr[i]);
                }
                else
                {
                    this._itemList[i].clear();
                }
            }
            this._curTxt.text = arr.length+"/"+ 8;
        }
    }

    protected drawAll():void
	{
		super.drawAll();
        this.drawBagData(null);
	}

    private drawBagData(e:ItemsEvent):void{
		if(e==null || e.params == ItemsType.BAG)
		{
            let arr:Array<ItemsModelInfo> = this._bagModel.bagList;
			let infoList:Array<Array<ItemsModelInfo>> = [];
            let ln:number = arr.length;
            let list:Array<ItemsModelInfo> = [];
            for(let i:number = 0;i<ln;i++)
            {
                if(list.length>4)
                {
                    infoList.push(list);
                    list = [];
                }
                if(arr[i].cvo.market>0 && !arr[i].bind)
                {
                    list.push(arr[i]);
                }
            }
            if(list.length != 0 && list.length<=4)
            {
                infoList.push(list);
            }
            while(infoList.length<3)
            {
                infoList.push([]);
            }
            this._vscroll.dataProvider(infoList);

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
		if(isRemove)
		{
			ObjectUtil.removes(this._jiluImg);
            ObjectUtil.disposes(this._curTxt,this._vscroll);
            this._itemList.forEach((item,i)=>
            {
                item.dispose();
            })
            
		}
        this._jiluImg=null;
        this._curTxt=null;
        this._vscroll=null;

        this._item0=null;
        this._item1=null;
        this._item2=null;
        this._item3=null;
        this._item4=null;
        this._item5=null;
        this._item6=null;
        this._item7=null;

        this._bagModel=null;
        this._model=null;
        this._curPlayInfo=null;
        this._itemList=null;
		
	}

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }
}