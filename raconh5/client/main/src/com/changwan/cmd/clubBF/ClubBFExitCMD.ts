/**
 * 退出地图（挑战玩家/挑战boss/退出战场）协议
 * luzhihong
 * create 2018.2.1
 */
class ClubBFExitCMD extends BaseCMD
{
    public id:number;

	public constructor() 
	{
        super();
        this._protocol = Protocol.CLUB_BF_EXIT;
	}
}