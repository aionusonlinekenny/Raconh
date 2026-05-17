/**
 * pzx 
 * 18.3.1
 * 绝学升级
 *  */
class JuexueUpgradeCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_JUEXUE_UPGRADE;
    }
    public id:number;
    public lev:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.id);
        pkg.writeShort(this.lev);
    }


    public receive(ip:TCPPacketIn):void
    {
        // array('name' => 'id', 'type' => 'int16', 'desc' => '绝学id'),
        //         array('name' => 'lev', 'type' => 'int16', 'desc' => '目标等级(1级为激活，其他为升级)'),
     
        let id:number = ip.readShort();
        let lev:number = ip.readShort();
        let cvo:JueXueCVO = JueXueCVO.getCvo(id);
        cvo.setLev(lev);
        Manager.model.getjuexue().returnUpgrade(cvo);
    }
}