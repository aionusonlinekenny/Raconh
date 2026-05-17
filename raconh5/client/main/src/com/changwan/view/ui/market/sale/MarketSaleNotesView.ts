/**
 *　销售记录
 * pzx
 * 2018.4.16
 */
class MarketSaleNotesView extends PopUpView{
    private _scroller:BaseVScrollerList;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("market", "MarketSaleNotesViewSkin");
    }
    protected configUI():void
    {
        super.configUI();
        this._popupView.titleImg.source = "market_jiaoyijilutb_png";
        this._popupView.viewY = 250;
        this._popupView.bgHeight = 730;
        this._popupView.diImgVisible = false;
        this._scroller.initBtnListData(MarketSaleNotesItem,[],true);
        Manager.control.getmarket().noticeList();
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getmarketModel().addEventListener(MarketEvent.MARKET_QUERY_NOTICE_EVENT,this.darwData,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        Manager.model.getmarketModel().removeEventListener(MarketEvent.MARKET_QUERY_NOTICE_EVENT,this.darwData,this);
    }
   

	protected onTouchCloseHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.MarketSaleNotesView);
    }

    
    private darwData():void{
        this._scroller.dataProvider(Manager.model.getmarketModel().getnoticeList());
    }
    
    public show(value:number):void
    {
        super.show();
    }


    public dispose():void
    {
        super.dispose();
        this._scroller.dispose();
        this._scroller=null;
        
    }
}