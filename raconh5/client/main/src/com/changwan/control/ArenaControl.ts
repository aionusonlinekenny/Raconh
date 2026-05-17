/**
 *author Anydo
 *create 2017-12-27
 *description 
*/
class ArenaControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.ARENA_PK_COUNT, ArenaPKCountCMD);
        Manager.socket.addCMD(Protocol.ARENA_RANK_UPDATE, ArenaRankUpdateCMD);
        Manager.socket.addCMD(Protocol.ARENA_PK_SEND, ArenaPKSendCMD);
        Manager.socket.addCMD(Protocol.ARENA_PK_RESULT_PLAYER, ArenaPKResultPlayerCMD);
        Manager.socket.addCMD(Protocol.ARENA_PK_RESULT_ROBOT, ArenaPKResultRobotCMD);
        Manager.socket.addCMD(Protocol.ARENA_PK_LOG, ArenaPKLogCMD);
        Manager.socket.addCMD(Protocol.ARENA_MAX_RANK_AWARD, ArenaMaxRankAwardCMD);
        Manager.socket.addCMD(Protocol.ARENA_EXIT, ArenaExitCMD);
    }

    /**
     * @param flag 类型 0查询 1购买
     */
    public cmdPKCount(flag:number):void
    {
        let cmd:ArenaPKCountCMD = Manager.socket.getCMD(Protocol.ARENA_PK_COUNT) as ArenaPKCountCMD;
        cmd.flag = flag;
        cmd.send();
    }

    /**
     * @param id 类型 0查询 >0领取具体奖励
     */
    public cmdMaxRankAward(id:number):void
    {
        let cmd:ArenaMaxRankAwardCMD = Manager.socket.getCMD(Protocol.ARENA_MAX_RANK_AWARD) as ArenaMaxRankAwardCMD;
        cmd.id = id;
        cmd.send();
    }

    public cmdPKSend(rank:number):void
    {
        let cmd:ArenaPKSendCMD = Manager.socket.getCMD(Protocol.ARENA_PK_SEND) as ArenaPKSendCMD;
        cmd.rank = rank;
        cmd.send();
    }
}