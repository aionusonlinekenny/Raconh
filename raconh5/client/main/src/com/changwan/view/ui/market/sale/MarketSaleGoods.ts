/**
 * 市场背包格子
 * pzx
 * create 2018-4-16
 */
class MarketSaleGoods extends Goods{
	
	protected clickFun(e:egret.TouchEvent):void
	{
		if(this._data)
		{
			Manager.view.show(ViewID.MarketSaleTipsView,this._data);
		}
	}
}