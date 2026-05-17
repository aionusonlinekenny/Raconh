/**
 * 副本通知后端刷怪，账号第一次进入副本特殊处理
 * liangyan
 * create 2018.04.10
 */
class CopyAskMonsterCMD extends BaseCMD
{
    public constructor() 
    {
        super();
        this._protocol = Protocol.COPY_ASK_MONSTER;
    }
    
    public copyID:number;
    protected processOut(pkg:TCPPacketOut):void
    {
	    pkg.writeInt(this.copyID);
    }
}