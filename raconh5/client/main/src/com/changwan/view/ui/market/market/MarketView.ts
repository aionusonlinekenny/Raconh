/**
 * 市场吊牌
 * pzx
 * create 2018-4-11
 */
class MarketView extends UIComponent{
	private _friendsImg:eui.Image;
	private _hScroll:BaseHScrollerList;
    private _model:MarketModel;
    private _selectedItem:MarketPlayerNameItem;
    private _selectIndex:number;

    private _item0:MarketGoodsItem;
    private _item1:MarketGoodsItem;
    private _item2:MarketGoodsItem;
    private _item3:MarketGoodsItem;
    private _item4:MarketGoodsItem;
    private _item5:MarketGoodsItem;
    private _item6:MarketGoodsItem;
    private _item7:MarketGoodsItem;
    private _itemList:MarketGoodsItem[];
/**当前选中的摊位信息*/
    private _curPlayInfo:MarketPlayerInfo;

    private _bimCareer:BitmapRemote;

    private _npcTxt:Label
    private _kuanImg:eui.Image;

	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("market", "MarketViewSkin");
    }
    protected configUI():void
    {
        super.configUI();
        this.touchChildren = true;
        this._hScroll.initBtnListData(MarketPlayerNameItem,[],true);
        this._model = Manager.model.getmarketModel();
        Manager.control.getmarket().query();
        if(!this._itemList)
        {
            this._itemList = [this._item0,this._item1,this._item2,this._item3,this._item4,this._item5,this._item6,this._item7];
        }
        if(!this._bimCareer)
        {
            this._bimCareer = Manager.pool.create(BitmapRemote);
            this._bimCareer.x = 25;
            this._bimCareer.y = 398;
            this.addChildAt(this._bimCareer,0);
            this._bimCareer.load(Manager.path.getPanelUiImgPath("market/market_career_1","png"))
        }
    }

    protected addEvent():void
    {
        this._model.addEventListener(MarketEvent.MARKET_LIST_INFO_EVENT,this.drawListHanler,this);
        this._model.addEventListener(MarketEvent.MARKET_PLAYER_INFO_EVENT,this.drawPalyerInfoHandler,this);
        this._hScroll.itemList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);
        this._model.addEventListener(MarketEvent.MARKET_UPD_LIST_EVENT,this.drawList,this);
        this._friendsImg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.addFriendHandler,this);
        this._model.addEventListener(MarketEvent.MARKET_BUY_EVENT,this.onBuyHandler,this);
        super.addEvent();
    }

    protected removeEvent():void
    {
        this._model.removeEventListener(MarketEvent.MARKET_LIST_INFO_EVENT,this.drawListHanler,this);
        this._model.removeEventListener(MarketEvent.MARKET_PLAYER_INFO_EVENT,this.drawPalyerInfoHandler,this);
        this._hScroll.itemList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);
        this._model.removeEventListener(MarketEvent.MARKET_UPD_LIST_EVENT,this.drawList,this);
        this._friendsImg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.addFriendHandler,this);
        this._model.removeEventListener(MarketEvent.MARKET_BUY_EVENT,this.onBuyHandler,this);
        super.removeEvent();
    }
    /** 购买返回 */
    private onBuyHandler():void
    {
        let index:number = Math.round(Math.random() * 4)
        this._npcTxt.text = LangCVO.getContent("market2"+index);
        this.drawPalyerInfoHandler();
    }
    //加好友
    private addFriendHandler():void
    {
        if(this._model.getPlayerMarketInfo())
        Manager.control.getFriends().addFriends(this._model.getPlayerMarketInfo().play_id,1);
    }
    /**列表返回 */
    private drawListHanler():void
    {
        if(this._model.list[0])
        {
            this._model.list[0].isClick = true;
            Manager.control.getmarket().playerInfo(this._model.list[0].play_Id);
            this._selectIndex = 0;
        }
        this.drawList();
    }
    private drawList():void
    {
        this._hScroll.dataProvider(this._model.list);
    }
    //玩家摊位信息返回
    private drawPalyerInfoHandler():void
    {
        this._curPlayInfo = this._model.getPlayerMarketInfo();
        let index:number = Math.round(Math.random() * 4);
        this._npcTxt.text = LangCVO.getContent("market1"+index);
        if(this._curPlayInfo)
        {
            //this._bimCareer.load(Manager.path.getPanelUiImgPath("market/market_career_"+this._curPlayInfo.career,"png"))
            let arr:Array<MarketItemInfo> = this._curPlayInfo.itemList;
            for(let i:number = this._itemList.length - 1;i>-1;i--)
            {
                if(arr[i])
                {
                    this._itemList[i].setData(arr[i]);
                    this._itemList[i].visible = true;
                }
                else
                {
                    this._itemList[i].visible = false;
                }
            }
            if(!this._kuanImg.visible) this._kuanImg.visible = true;
        }
        
    }
//点击玩家名，请求摊位信息
    private onShortcutHandler(e:egret.TouchEvent):void
    {
        if(e.target instanceof List) return;
        let index = this._hScroll.itemList.selectedIndex;
        if(index < 0) return;
        if(index == this._selectIndex)
        {
            return;
        }
        let item = this._hScroll.itemList.getChildAt(index) as MarketPlayerNameItem;
        if(!this._selectedItem) 
        {
            this._selectedItem = this._hScroll.itemList.getChildAt(0) as MarketPlayerNameItem;
        }
        this._selectedItem.setSelect(false);
        this._selectedItem = item;
        let info = this._selectedItem.data;
        Manager.control.getmarket().playerInfo(info.play_Id);
        this._selectedItem.setSelect(true);
        this._selectIndex = index;
    }

    protected initData():void
    {
        super.initData();
    }

    protected drawAll():void
	{
		super.drawAll();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    public setData(data):void
    {
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{

    }

    public reuse():void
    {
        super.reuse();
       
    }

    public unuse():void
    {
        super.unuse();
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._friendsImg,this._kuanImg);

        ObjectUtil.disposes(this._hScroll,this._npcTxt);

        this. _friendsImg=null;
        this. _hScroll=null;
        this. _model=null;
        this. _selectedItem=null;

        this. _item0=null;
        this. _item1=null;
        this. _item2=null;
        this. _item3=null;
        this. _item4=null;
        this. _item5=null;
        this. _item6=null;
        this. _item7=null;
        this._itemList.forEach((item,i)=>{
            item.dispose();
        })
        this. _itemList=null;;
        this. _curPlayInfo=null;
        Manager.pool.push(this._bimCareer);
        this. _bimCareer=null;
        this. _npcTxt=null;
        this. _kuanImg=null;
    }
}