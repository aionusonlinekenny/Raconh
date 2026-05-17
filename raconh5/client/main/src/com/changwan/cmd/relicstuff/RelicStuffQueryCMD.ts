/**
 * pzx 
 * 18.3.9
 *神器查询
 *  */
class RelicStuffQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_RELICSTUFF_QUERY;
    }
   

    public receive(ip:TCPPacketIn):void
    {
        //  array('name'=>'relic_list', 'type'=>'arr', 'desc'=>'神器列表', 'vars'=>array(
        //             array('name'=>'id', 'type'=>'int8', 'desc'=>'神器id'),
        //         )),
        //         array('name'=>'piece_list', 'type'=>'arr', 'desc'=>'碎片列表', 'vars'=>array(
        //             array('name'=>'id', 'type'=>'int8', 'desc'=>'碎片id'),
        //         )),
        let ln:number = ip.readShort();
        for(let i:number = 0;i<ln;i++)
        {
            let id:number = ip.readByte();
            RelicStuffCVO.setActivity(id);
        }
        ln= ip.readShort();
        for(let i:number = 0;i<ln;i++)
        {
            let id:number = ip.readByte();
            RelicStuffDebrisCVO.setActivity(id);
        }
        Manager.model.getrelicstuff().query();
    }
}