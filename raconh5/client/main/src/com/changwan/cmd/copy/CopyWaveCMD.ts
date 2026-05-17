/**
 * 副本波数协议
 * luzhihong
 * create 2018.1.12
 */
class CopyWaveCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_WAVE;
	}
	
    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'wheel', 'type' => 'int8', 'desc' => '当前波数'),
        let wave:number = pi.readByte();
        Manager.model.getCopy().expModel.wave = wave;
        Manager.view.show(ViewID.CopyWaveView, wave);
    }
}