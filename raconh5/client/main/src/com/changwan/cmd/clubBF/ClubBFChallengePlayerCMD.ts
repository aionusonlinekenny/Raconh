/**
 * 挑战玩家协议
 * luzhihong
 * create 2018.2.1
 */
class ClubBFChallengePlayerCMD extends BaseCMD
{
    public isRobot:boolean;
    public id:number;

    public constructor()
    {
        super();
        this._protocol = Protocol.CLUB_BF_CHALLENGE_PLAYER;
    }

    protected processOut(pkg:TCPPacketOut):void
	{
                // array('name' => 'type', 'type' => 'int8', 'desc' => '类型：0玩家，1机器人'),
                // array('name' => 'tar_id', 'type' => 'int64', 'desc' => '目标角色id'),
        pkg.writeByte(this.isRobot ? 1 : 0);
        pkg.writeInt64(this.id);
	}

    public receive(pi:TCPPacketIn):void
    {
        let isRobot:boolean = pi.readByte() != 0;
        let id:number = pi.readInt64();

        Manager.control.getClubBF().showPKHead(id);
    }
}