/**
 * 副本更新协议
 * luzhihong
 * create 2017.12.4
 */
class CopyUpdateCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_UPDATE;
	}
	
    public receive(pi:TCPPacketIn):void
    {
        // array('name' => 'id', 'type' => 'int32', 'desc' => '副本ID'),
        // array('name' => 'cell', 'type' => 'int16', 'desc' => '进入层数'),
        // array('name' => 'enter_times', 'type' => 'int8', 'desc' => '已进入次数'),
        let id:number = pi.readInt();
        let cvo:CopyCVO = CopyCVO.getCVO(id);
        if(cvo) cvo.update(pi.readShort(), pi.readByte());
    }
}