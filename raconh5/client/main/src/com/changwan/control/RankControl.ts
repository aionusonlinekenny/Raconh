/**
 * 排行榜控制器
 * luzhihong
 * create 2017-11-03
 */
class RankControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.RANK_WORSHIP_LIST, RankWorshipListCMD);
        Manager.socket.addCMD(Protocol.RANK_WORSHIP, RankWorshipCMD);
        Manager.socket.addCMD(Protocol.RANK_LIST, RankListCMD);
    }

    /**
     * 膜拜
	 * @param type:排行榜类型
	 * @param id:第一名玩家
     * */
    public worship(type:number, id:number)
    {
        let cmd:RankWorshipCMD = Manager.socket.getCMD(Protocol.RANK_WORSHIP) as RankWorshipCMD;
        cmd.type = type;
        cmd.id = id;
        cmd.send();
    }
    /**
     * 请求排行榜数据
	 * @param type:排行榜类型
     * */
    public reqRankData(type:number)
    {
        let cmd:RankListCMD = Manager.socket.getCMD(Protocol.RANK_LIST) as RankListCMD;
        cmd.type = type;
        cmd.send();
    }
}