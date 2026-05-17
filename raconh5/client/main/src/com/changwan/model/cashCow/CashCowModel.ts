/**
 * pzx
 * 18.1.18
 * 金蟾model
 */
class CashCowModel extends egret.EventDispatcher
{
    /** 上次聚宝时间 时间戳 秒 */
   private _lasTime:number;
/**是否激活白金卡 */
   private _isActive:number=0;
//实际领免费的次数
   private _rewardnum:number=0;

   private _cvo:CashCowCVO;
   /** 领奖cd间隔 */
   public readonly TIME_CD:number=25200;

   public levItemModel:LevItemModel = new LevItemModel();

   public sevenDaysModel:SevenDaysModel = new SevenDaysModel();

   /** time 上次聚宝时间， draw 可聚宝总次数，，current已聚宝次数 ,isActive是否激活白金卡*/
   public returnCashCowInfo(time:number,draw:number,current:number,isActive:number,num:number):void
   {
       if(this._cvo==null)
       {
           this._cvo = CashCowCVO.getCvo();
       }
       this._lasTime = time;
       this._isActive = isActive;
       this._rewardnum = num;
       this._cvo.setTreasure(draw);
       this._cvo.setCrunt(current);
       this.dispatchEvent(new CashCowEvent(CashCowEvent.CASHCOW_UPDATE_EVENT));
   }
   /** 领奖返回 time 上次聚宝时间,为0时是用元宝领取，大于0是免费时间刷新*/
   public rewardUpdateInfo(time:number,draw:number,current:number,num:number)
   {
       if(time != 0)
       {
            this._lasTime = time;
       }
        this._rewardnum = num;
       this._cvo.setTreasure(draw);
       this._cvo.setCrunt(current);
        this.dispatchEvent(new CashCowEvent(CashCowEvent.CASHCOW_UPDATE_EVENT));
   }
   public get cvo():CashCowCVO
   {
       if(this._cvo==null)
       {
           this._cvo = CashCowCVO.getCvo();
       }
       return this._cvo;
   }
   /** 上次聚宝时间 时间戳 秒 */
   public get lasTime():number
   {
       return this._lasTime;
   }
   /**是否激活白金卡 */
   public get isActive():boolean
   {
       return this._isActive == 1;
   }
   /** 实际领免费的次数 */
   public get rewardnum():number
   {
       return this._rewardnum;
   }
   /** 检测是否已到领奖cd */
   public checkRewardCd():boolean
   {
        let second:number = Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000-this._lasTime);
        if(second >= this.TIME_CD)
        {
            return true;
        }
   }
  
}