/**
 * pzx 
 * 17.11.18
 * 经脉升级
 *  */
class JingMaiLvUpCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_JINGMAI_LV_UP;
    }
    //经脉等级
    public leve:number;
    //角色id
    public playid:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt64(this.playid);
        pkg.writeShort(this.leve);
    }


    public receive(ip:TCPPacketIn):void
    {
         let payId:number = ip.readInt64();
        let id:number = ip.readShort();
        Manager.model.getJingMai().lvUpJianmai(payId,id);
    }
}