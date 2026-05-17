/**
 * 火眼金睛model
 * liangyan
 * create 2018-03-26
*/
class FireEyeModel extends egret.EventDispatcher
{
    public constructor()
    {
        super();
        GameDispatcher.getInstance().addEventListener(GlobalEvent.CROSS_DAY_EVENT, this.onCrossDayHandler, this);
        this.onCrossDayHandler(null);
        this.fetchedRewards = [];
        this._wrongTimes = 0;
    }

    /**今日是否已参加 */
    public hasJoin:boolean;

    private onCrossDayHandler(e:GlobalEvent):void
    {
        this.hasJoin = false;
    }

    /**已经领取的奖励id */
    public fetchedRewards:Array<number>;

    /**下一关数据 */
    public nextInfo:FireEyeNextLevelInfo;
    /**我的数据 */
    public myInfo:FireEyeEnemyInfo;
    /**对手数据 */
    public enemyInfo:FireEyeEnemyInfo;
    /**当前游戏数据(我) */
    public myGameInfo:FireEyePlayerData;
    /**当前游戏数据(对手) */
    public enemyGameInfo:FireEyePlayerData;
    /**当前关卡物品数据 */
    public curGoodsDatas:Array<FireEyeGoodsData>;
    private _wrongTimes:number;
    /**当前错误次数 */
    public get wrongTimes():number {return this._wrongTimes;}
    public set wrongTimes(value:number)
    {
        if(this._wrongTimes == value) return;
        let isAdd = this._wrongTimes < value;
        this._wrongTimes = value;
        let maxTimes = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_WRONG_TIMES).value;
        if(isAdd)
        {
            let banTime = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_BAN_HAND).value;
            let str = LangCVO.getContent("fireEye12", this._wrongTimes, maxTimes, Color.GREEN_STR_2, banTime);
            FloatTips.addTips(str, Color.RED);
        }
        if(this._wrongTimes == maxTimes)
        {
            if(Manager.control.getFireEye().banView != null)
            {
                Manager.control.getFireEye().banView.dispose();
                Manager.control.getFireEye().banView = null;
            }
            Manager.control.getFireEye().banView = new FireEyeBanView();
            (Manager.view.getView(ViewID.FireEyePanel) as FireEyePanel).addChild(Manager.control.getFireEye().banView);
        }
    }
    /**活动结算数据 */
    public actResultData:FireEyeResultInfo;
}