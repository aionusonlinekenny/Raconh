/**
 * 掉落Model
 * luzhihong
 * create 2017-11-17
 */
class DropModel
{
    public constructor()
    {
        
    }

    // private _canAdd:boolean = true;
    // private _infoList:Array<ItemsCVO> = [];
    // private _itemList:Array<DropTipsItem> = [];

    // public canAdd(value:boolean):void
    // {
    //     this._canAdd = true;
    //     if(this._infoList.length > 0) this.addTipsItem();
    // }

    // public addDropTips(info:ItemsCVO)
    // {
    //     this._infoList.push(info);
    //     if(this._canAdd) this.addTipsItem()
    // }

    // private addTipsItem():void
    // {
    //     this._canAdd = false;
    //     let item:DropTipsItem = Manager.pool.create(DropTipsItem, this._infoList.shift());
    //     this._itemList.push(item);
    //     for(var i:number=0, len=this._itemList.length; i<len-1; i++)
    //     {
    //         this._itemList[i].index = len-i-1;
    //     }
    // }

    // public removeTipsItem(item:DropTipsItem):void
    // {
    //     if(item != null)
    //     {
    //         Manager.pool.push(item);
    //         let index:number = this._itemList.indexOf(item);
    //         if(index != -1) this._itemList.splice(index,1);
    //     }
    // }
}