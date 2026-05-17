/**
 * 魔神降临controller
 * liangyan
 * create 2018-04-10
*/
class DevilControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.DEVIL_NOTICE_ROLL, DevilNoticeRollCMD);
        Manager.socket.addCMD(Protocol.DEVIL_ROLL_INFO, DevilRollInfoCMD);
        Manager.socket.addCMD(Protocol.DEVIL_ACT_RESULT, DevilActResultCMD);
        Manager.socket.addCMD(Protocol.DEVIL_ROLL_REWARDS, DevilRollRewardsCMD);
        Manager.socket.addCMD(Protocol.DEVIL_INFO, DevilInfoCMD);
        Manager.socket.addCMD(Protocol.DEVIL_ENTER, DevilEnterCMD);
        Manager.socket.addCMD(Protocol.DEVIL_EXIT, DevilExitCMD);
        Manager.socket.addCMD(Protocol.DEVIL_GRAB_LIST, DevilGrabListCMD);
        Manager.socket.addCMD(Protocol.DEVIL_CHALLENGE, DevilChallengeCMD);
        Manager.socket.addCMD(Protocol.DEVIL_ROLL_DICE, DevilRollDiceCMD);
        Manager.socket.addCMD(Protocol.DEVIL_RANK_LIST, DevilRankListCMD);
        Manager.socket.addCMD(Protocol.DEVIL_EXIT_GRAB, DevilExitGrabCMD);
    }

    /**请求魔神降临数据 */
    public askInfo():void
    {
        let cmd = Manager.socket.getCMD(Protocol.DEVIL_INFO) as DevilInfoCMD;
        cmd.send();
    }
    /**进入魔神降临地图 */
    public enterDevil():void
    {
        let cmd = Manager.socket.getCMD(Protocol.DEVIL_ENTER) as DevilEnterCMD;
        cmd.send();
    }
    /**退出魔神降临地图 */
    public exitDevil():void
    {
        let cmd = Manager.socket.getCMD(Protocol.DEVIL_EXIT) as DevilExitCMD;
        cmd.send();
    }
    /**请求抢夺列表 */
    public askGrabList():void
    {
        let cmd = Manager.socket.getCMD(Protocol.DEVIL_GRAB_LIST) as DevilGrabListCMD;
        cmd.send();
    }
    /**挑战玩家 */
    public challenge(id:number):void
    {
        let cmd = Manager.socket.getCMD(Protocol.DEVIL_CHALLENGE) as DevilChallengeCMD;
        cmd.id = id;
        cmd.send();
    }
    /**摇奖 */
    public rollDice():void
    {
        let cmd = Manager.socket.getCMD(Protocol.DEVIL_ROLL_DICE) as DevilRollDiceCMD;
        cmd.send();
    }
    /**请求排名列表 */
    public askRankList():void
    {
        let cmd = Manager.socket.getCMD(Protocol.DEVIL_RANK_LIST) as DevilRankListCMD;
        cmd.send();
    }
    /**退出1V1 */
    public exitGrab():void
    {
        let cmd = Manager.socket.getCMD(Protocol.DEVIL_EXIT_GRAB) as DevilExitGrabCMD;
        cmd.send();
    }
}