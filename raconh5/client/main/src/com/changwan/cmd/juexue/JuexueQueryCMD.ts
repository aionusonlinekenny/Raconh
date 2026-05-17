/**
 * pzx 
 * 18.3.1
 * 绝学
 *  */
class JuexueQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_JUEXUE_QUERY;
    }
  
    public receive(ip:TCPPacketIn):void
    {
        // 'content' => array(
        //         array('name' => 'jx_lists', 'type' => 'arr',  'record'=>'juexue_info', 'desc' => '绝学数据', 'vars' => array(
        //             array('name' => 'id', 'type' => 'int16', 'desc' => '绝学id'),
        //             array('name' => 'lev', 'type' => 'int16', 'desc' => '绝学等级'),
        //         )),
        //         array('name' => 'ambit_lev', 'type' => 'int32', 'desc' => '境界等级'),
        //     ),
        let ln:number = ip.readShort();
        for(let i:number = 0;i<ln;i++)
        {
            let Id:number = ip.readShort();
            let lev:number = ip.readShort();
            let cvo:JueXueCVO = JueXueCVO.getCvo(Id);
            cvo.setLev(lev);
        }
        let ambitLev:number = ip.readInt();
        Manager.model.getjuexue().query(ambitLev);
    }
}