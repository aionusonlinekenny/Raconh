/**
 * pzx
 * 18.4.17
 * 市场model
 */
class MarketModel extends egret.EventDispatcher
{
    /**
     * 玩家例表 
    */
    private _list:MarketPlayNameInfo[];

    private _curPlayInfo:MarketPlayerInfo;
    /** 当前正在上架的物品，上架成功后删除 */
    public curSaleItem:ItemsModelInfo;
/**自己的摊位信息 */
    private _selfPalyerInfo:MarketPlayerInfo;

    private _noticeList:MarketSaleBuyNoticeInfo[];


    public queryList(arr:MarketPlayNameInfo[]):void
    {
        this._list = arr;
        this.dispatchEvent(new MarketEvent(MarketEvent.MARKET_LIST_INFO_EVENT));
    }

    public updDateList(type:number,id:number,name:string):void
    {
        if(!this._list) return;
        if(type == 1)
        {
            let info:MarketPlayNameInfo = new MarketPlayNameInfo;
            info.play_Id = id;
            info.name = name;
            this._list.push(info);
        }
        else if(type == 2)
        {
            for(let i:number = this._list.length -1;i>-1;i--)
            {
                if(this._list[i].play_Id == id)
                {
                    this._list.splice(i,1);
                }
            }
        }
        this.dispatchEvent(new MarketEvent(MarketEvent.MARKET_LIST_INFO_EVENT));
    }
    //当前选中玩家的摊位信息，包括自己的摊位
    public setMarketInfo(info:MarketPlayerInfo):void
    {
        if(info.play_id == Manager.model.self.id)
        {
            this._selfPalyerInfo = info;
        }
        else
        {
            this._curPlayInfo = info;
        }
        this.dispatchEvent(new MarketEvent(MarketEvent.MARKET_PLAYER_INFO_EVENT));
    }

//上架成功返回
    public setSaleItem(ip:TCPPacketIn):void
    {
        let id:number = ip.readInt();
		if(this.curSaleItem && this.curSaleItem.id == id)
		{
            let info:MarketItemInfo = new MarketItemInfo;
            info.base_id = this.curSaleItem.base_id;
			info.pos = ip.readInt();
			info.quantity = ip.readShort();
			info.price = ip.readInt();
			info.sale_time = ip.readInt();
            //info.infoList = this.curSaleItem.infoList;
            if(this._selfPalyerInfo)
            {
                this._selfPalyerInfo.itemList.push(info);
            }
            this.curSaleItem = null;
		}
        this.dispatchEvent(new MarketEvent(MarketEvent.MARKET_PLAYER_INFO_EVENT));
    }
//下架返回
    public noSaleItem(pos:number):void
    {
        
        let arr:MarketItemInfo[] = this._selfPalyerInfo.itemList;
        for(let i:number=arr.length-1;i>-1;i--)
        {
            let item:MarketItemInfo = arr[i];
            if(item.pos == pos)
            {
                arr.splice(i,1);
                this.dispatchEvent(new MarketEvent(MarketEvent.MARKET_PLAYER_INFO_EVENT));
                break;
            }
        }
    }

    public buyInfo(palyId:number,pos:number,count:number)
    {
        if(this._curPlayInfo.play_id == palyId)
        {
            let arr:MarketItemInfo[] = this._curPlayInfo.itemList;
            for(let i:number=arr.length-1;i>-1;i--)
            {
                let item:MarketItemInfo = arr[i];
                if(item.pos == pos)
                {
                    if(count == 0)
                    {
                        arr.splice(i,1);
                        this.dispatchEvent(new MarketEvent(MarketEvent.MARKET_BUY_EVENT));
                        // if(arr.length== 0)
                        // {
                        //     for(let j:number= this._list.length -1;j>-1;j--)
                        //     {
                        //         if(palyId == this._list[j].play_Id)
                        //         {
                        //             this._list.splice(j,1);
                        //             this.dispatchEvent(new MarketEvent(MarketEvent.MARKET_UPD_LIST_EVENT));
                        //         }
                        //     }
                        // }
                    }
                    else
                    {
                        item.quantity = count;
                    }
                    break;
                }
            }
        }
    }

    public noticeList(arr:MarketSaleBuyNoticeInfo[]):void
    {
        this._noticeList = ArrayUtil.sortOn(arr,["sale_time"],[1]);
        this.dispatchEvent(new MarketEvent(MarketEvent.MARKET_QUERY_NOTICE_EVENT));
    }

    //获得列表
    public get list():MarketPlayNameInfo[]
    {
        return this._list;
    }
    public getPlayerMarketInfo():MarketPlayerInfo
    {
        return  this._curPlayInfo;
    }
    /** 自己的摊位信息 */
    public getSelfMarketInfo():MarketPlayerInfo
    {
        return this._selfPalyerInfo;
    }
    /** 交易记录列表 */
    public getnoticeList():MarketSaleBuyNoticeInfo[]
    {
        return this._noticeList;
    }

    
  
}