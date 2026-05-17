/**
 * pzx 
 * 18.2.8
 * 寻宝
 *  */
class ArtifactSendHuntingCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_ARTIFACT_HUNTING;
    }
    public type:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.type);
    }
    public receive(ip:TCPPacketIn):void
    {
    //    array('name'=>'item_list', 'type'=>'arr', 'record'=>'artifact_log_ets', 'tuple'=>'true', 'desc'=>'寻宝列表', 'vars'=>array(
    //                 array('name'=>'srv_id', 'type'=>'int16', 'desc'=>'服务器id'),
    //                 array('name'=>'name', 'type'=>'string', 'desc'=>'玩家名称'),
    //                 array('name'=>'item', 'type'=>'int32', 'desc'=>'物品id'),
    //             )),
    //             array('name'=>'point', 'type'=>'int16', 'desc'=>'积分'),
        let ln:number = ip.readShort();
        for(let i:number = 0;i<ln;i++)
        {
            let info:ArtifactLogInfo = new ArtifactLogInfo();
            info.srv_id = ip.readShort();
            info.name = ip.readUTF();
            info.base_id = ip.readInt();
            Manager.model.getArtifact().hunting(info);
        }
        let  integral:number = ip.readShort();
        let tencount:number = ip.readByte();
        Manager.model.getArtifact().setIntegral(integral,tencount);
    }
}