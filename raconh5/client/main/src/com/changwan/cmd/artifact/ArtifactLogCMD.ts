/**
 * pzx 
 * 18.2.8
 * 寻宝查询个人记录
 *  */
class ArtifactLogCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_ARTIFACT_LOG;
    }
    public receive(ip:TCPPacketIn):void
    {
        // array('name'=>'list', 'type'=>'arr', 'record'=>'artifact_log', 'vars'=>array(
        //             array('name'=>'type', 'type'=>'int8', 'desc'=>'寻宝类型 1-1次 2-10次'),
        //             array('name'=>'item', 'type'=>'arr', 'desc'=>'物品列表', 'vars'=>array(
        //                 array('name'=>'base_id', 'type'=>'int32', 'desc'=>'基础id'),
        //             )),
        //         )),
        let ln:number = ip.readShort();
        let arr:Array<ArtifactSelfLogInfo> = [];
        for(let i:number = 0;i<ln;i++)
        {
            let info:ArtifactSelfLogInfo = new ArtifactSelfLogInfo();
            info.type = ip.readByte();
            let j:number = ip.readShort();
            for(let n:number = 0;n<j;n++)
            {
                let id:number = ip.readInt();
                info.itemList.push(id);
            }
            arr.push(info);
        }
       
        Manager.model.getArtifact().selfLog(arr);
    }
}