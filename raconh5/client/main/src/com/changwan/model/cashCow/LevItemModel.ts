/**
 * pzx
 * 18.1.25
 * 冲级好礼model
 */
class LevItemModel extends egret.EventDispatcher
{
   private _is_activited:number=0;

   public query(act:number):void
   {
       this._is_activited = act;
       this.dispatchEvent(new CashCowEvent(CashCowEvent.LEVITEM_QUERY_EVENT));
   }
   public reward(id:number):void
   {
       this.dispatchEvent(new CashCowEvent(CashCowEvent.LEVITEM_UPDATE_EVENT,id));
   }
/** 是否激活钻石特权 */
   public get is_activited():number
   {
       return this._is_activited;
   }

   public checkReward():boolean
   {
       let arr:LevItemCVO[] = LevItemCVO.getCvos();
       for(let item of arr)
       {
         
           if(item.checkReward())
            {
               return true;
            }
       }
       return false;
   }
/** 检测是否已全部领完奖励 领完或者已经没有次数,则图标消失*/
   public checkTotalRaward():boolean
   {
       let arr:LevItemCVO[] = LevItemCVO.getCvos();
       for(let cvo of arr)
       {
          if(cvo.totalNum>0 && cvo.num<1)
          {
                return false;
          }
       }
       return true;
   }
  
}