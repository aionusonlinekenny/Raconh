/**
 * 
 * pzx
 * create 2018-3-15
 * 冲榜竞技
 * 
*/
class SrvRankModel extends egret.EventDispatcher
{
    private _mainRank:number=0;
    private _rank1Name:string="";

    public constructor()
    {
        super();
    }
    public returnQuery(rank:number,name:string):void
    {
        this._mainRank = rank;
        this._rank1Name = name;
        this.reward();
    }
    public reward()
    {
        this.dispatchEvent(new SrvRankEvent(SrvRankEvent.SRVRANK_UPDATE_LIST));
    }
    /**
     * 第一名玩家名字
     */
    public get rank1Name():string
    {
        return this._rank1Name;
    }
    /** 自己的排名 */
    public get mainRank():number
    {
        return this._mainRank;
    }
    
   
    
}