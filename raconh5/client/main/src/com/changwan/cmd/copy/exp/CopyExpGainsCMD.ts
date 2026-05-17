/**
 * 经验副本经验更新协议
 * luzhihong
 * create 2018.1.12
 */
class CopyExpGainsCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_EXP_GAINS;
	}
	
    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'exp', 'type' => 'int32', 'desc' => '已获得的经验数'),
        Manager.model.getCopy().expModel.exp = pi.readInt();
    }
}