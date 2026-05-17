/**
 * 经验副本鼓舞购买协议
 * luzhihong
 * create 2018.1.12
 */
class CopyExpInspireCMD extends BaseCMD
{
    public type:number;//鼓舞类型(0铜币鼓舞，1元宝鼓舞)

	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_EXP_INSPIRE;
	}

    protected processOut(pkg:TCPPacketOut):void
	{
                // array('name' => 'type', 'type' => 'int8', 'desc' => '鼓舞类型(0铜币鼓舞，1元宝鼓舞)'),
        pkg.writeByte(this.type);
	}
	
    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'inspire', 'type' => 'int16', 'desc' => '鼓舞加成'),
        Manager.model.getCopy().expModel.inspireRate = pi.readShort();
    }
}