/**
 * pzx 
 * 17.12.27
 * 升级
 *  */
class LifeGridLvUpCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_LIFEGRID_LEV_UP;
    }
   //目标等级
    public leve:number;
    //'孔位置
    public index:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.index);
        pkg.writeInt(this.leve);
    }

    public receive(ip:TCPPacketIn):void
    {
        let lv:number = ip.readByte();
        Manager.model.getLifeGrid().returnLvUP(lv,this.index);
        this.index = -1;
    }
}