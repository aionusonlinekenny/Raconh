/**
 * pzx 
 * 18.2.8
 * 寻宝查询
 *  */
class ArtifactQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_ARTIFACT_QUERY;
    }
    public receive(ip:TCPPacketIn):void
    {
        //  array('name'=>'item_list', 'type'=>'arr', 'record'=>'artifact_log_ets', 'tuple'=>'true', 'desc'=>'寻宝列表', 'vars'=>array(
        //             array('name'=>'srv_id', 'type'=>'int16', 'desc'=>'服务器id'),
        //             array('name'=>'name', 'type'=>'string', 'desc'=>'玩家名称'),
        //             array('name'=>'item', 'type'=>'int32', 'desc'=>'物品id'),
        //         )),
        //         array('name'=>'point', 'type'=>'int16', 'desc'=>'积分'),
        //         array('name'=>'is_first_extra', 'type'=>'int8', 'desc'=>'是否首次十次 0-否 1-10次'),
        //         array('name'=>'state', 'type'=>'arr', 'tuple'=>'true', 'desc'=>array(
        //             array('name'=>'point', 'type'=>'int16', 'desc'=>'积分'),
        //             array('name'=>'is_rewarded', 'type'=>'int8', 'desc'=>'是否已领奖 0-否 1-是'),
        //         ))
        let ln:number = ip.readShort();
        let arr:Array<ArtifactLogInfo> = [];
        for(let i:number = 0;i<ln;i++)
        {
            let info:ArtifactLogInfo = new ArtifactLogInfo();
            info.srv_id = ip.readShort();
            info.name = ip.readUTF();
            info.base_id = ip.readInt();
            arr.push(info);
        }
        let  integral:number = ip.readShort();
        let isFirst:number = ip.readByte();
        ln = ip.readShort();
        for(let i:number = 0;i<ln;i++)
        {
            let point:number = ip.readShort();
            let reward:number = ip.readByte();
            ArtifactIntegralCVO.setisReward(ArtifactType.integral_type,point,reward);
        }
        Manager.model.getArtifact().query(arr,integral,isFirst);
    }
}