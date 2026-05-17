/**
 * pzx
 * 18.4.17
 * 市场商品信息记录
 */
class MarketSaleBuyNoticeInfo {
	/** 价格 */
	public price:number;
	/** 时间 */
	public sale_time:number;
    /** 交易类型：1：出售，2：购买 */
	public type:number;

	/** 物品基础id */
	public base_id:number;
    /**物品数量 */
	public count:number;
}