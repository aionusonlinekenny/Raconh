/**
 * 进入挑战区协议
 * luzhihong
 * create 2018.2.1
 */
class ClubBFEnterDoorCMD extends BaseCMD
{
    public isEnter:boolean;

	public constructor() 
	{
        super();
        this._protocol = Protocol.CLUB_BF_ENTER_DOOR;
	}
    
    protected processOut(pkg:TCPPacketOut):void
	{
                // array('name' => 'type', 'type' => 'int8', 'desc' => '是否进入挑战区：0否，1是'),
        pkg.writeByte(this.isEnter ? 1 : 0);
	}
	
    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'type', 'type' => 'int8', 'desc' => '是否在挑战区：0否，1是'),
        Manager.model.getClubBF().hasEnterChallengeArea = pi.readByte() != 0;
    }
}