/**
 * 火眼金睛control
 * liangyan
 * create 2018-03-27
*/
class FireEyeControl extends BaseControl
{
    /**禁手视图 */
    public banView:FireEyeBanView;
    /**已完成视图 */
    public finishView:FireEyeFinishView;

    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.FIRE_EYE_HAS_JOIN, FireEyeHasJoinCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_MATCH_SUCC, FireEyeMatchSuccCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_NEXT, FireEyeNextLevelCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_GOODS_DATA, FireEyeGoodsDataCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_PLAYER_DATA, FireEyePlayerDataCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_LEVEL_RESULT, FireEyeLevelResultCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_ACT_DATA, FireEyeResultCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_HAS_FETCH, FireEyeHasFetchCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_MATCH, FireEyeMatchCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_ENEMY_DATA, FireEyeAskDataCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_FETCH, FireEyeFetchRewardsCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_SELECT, FireEyeSelectItemCMD);
        Manager.socket.addCMD(Protocol.FIRE_EYE_SELECT_SPECIAL, FireEyeSelectSpecialCMD);
    }
    /**参与活动（进入匹配队列） */
    public match():void
    {
        let cmd = Manager.socket.getCMD(Protocol.FIRE_EYE_MATCH) as FireEyeMatchCMD;
        cmd.send();
    }
    /**请求对手数据 */
    public askEnemyData():void
    {
        let cmd = Manager.socket.getCMD(Protocol.FIRE_EYE_ENEMY_DATA) as FireEyeAskDataCMD;
        cmd.send();
    }
    /**领取奖励 */
    public fetchByID(id:number):void
    {
        let cmd = Manager.socket.getCMD(Protocol.FIRE_EYE_FETCH) as FireEyeFetchRewardsCMD;
        cmd.id = id;
        cmd.send();
    }
    /**选中物品 */
    public selectByID(id:number, cvoID:number):void
    {
        let cmd = Manager.socket.getCMD(Protocol.FIRE_EYE_SELECT) as FireEyeSelectItemCMD;
        cmd.id = id;
        cmd.cvoID = cvoID;
        cmd.send();
    }
}