/**
 * pzx
 * create 18.1.29
 * 七天登陆model
 */
class SevenDaysModel extends egret.EventDispatcher
{
   private _day:number=1;

   public query(act:number):void
   {
       if(act == 0) act = 1;
       this._day = act;
       this.dispatchEvent(new CashCowEvent(CashCowEvent.SEVENDAYS_QUERY_EVENT));
   }
   /** @param reward 1为领成功，，，@param day 领取的天数 */
   public reward(reward:number,day:number):void
   {
       if(reward== 1)
       {
            SevenDaysCVO.setState(day,1);
            this.dispatchEvent(new CashCowEvent(CashCowEvent.SEVENDAYS_REWARD_EVENT,day));
       }
   }
/** 已登陆的天数 */
   public get login_day():number
   {
       return this._day;
   }
/** 检测是否有奖可领 */
   public checkSeverDaysReward():boolean
   {
       let arr:SevenDaysCVO[] = SevenDaysCVO.getCvos();
       for(let cvo of arr)
       {
           if(cvo.state == 0)
           {
               if(cvo.isReward())
               {
                   return true;
               }
           }
       }
       return false;
   }
/** 7天奖励是否已领完 */
   public checkSevenDaysHide():boolean
   {
       let arr:SevenDaysCVO[] = SevenDaysCVO.getCvos();
       for(let cvo of arr)
       {
           if(cvo.state == 0)
           {
               return false;
           }
       }
       return true;
   }
  
}