/**
 * 珍稀掉落列表信息
 * luzhihong
 * create 2017-11-20
 */
class DropRareListCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.DROP_RARE_LIST;
	}
	
    public receive(pi:TCPPacketIn):void
    {               
                // array('name'=>'items', 'type'=>'arr', 'desc'=>'掉落物品', 'vars'=>array(
                //     array('name'=>'id', 'type'=>'int32', 'desc'=>'物品base_id'),
                //     array('name' => 'bind', 'type' => 'int8', 'desc' => '是否绑定'),
                //     array('name' => 'quantity', 'type' => 'int16', 'desc' => '数量'),
                //     array('name' => 'exattr', 'type' => 'arr', 'record' => 'exattr', 'desc' => '特殊信息','vars'=> array(
                //         array('name' => 'type', 'type' => 'int16', 'desc' => '信息类型'),
                //         array('name' => 'target', 'type' => 'int32', 'desc' => '信息目标'),
                //         array('name' => 'value', 'type' => 'int32', 'desc' => '信息数字值'),
                //         array('name' => 'desc', 'type' => 'string', 'desc' => '信息字符值(如装备刻字, 物品署名字)'),)),
        let infos:Array<ItemsModelInfo> = [];
        let len0:number = pi.readShort();
        let info:ItemsModelInfo;
        while(len0--)
        {
            info = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() != 1;
            info.quantity = pi.readInt();
            let len1:number = pi.readShort();
            let exarr:ExattrItemsinfo
            while(len1--)
            {
                exarr = new ExattrItemsinfo();
                exarr.type = pi.readShort();
                exarr.target = pi.readInt();
                exarr.value = pi.readInt();
                exarr.desc = pi.readUTF();
                info.infoList.push(exarr);
            }
            infos.push(info);
        }

        Manager.control.getDrop().showAlert(infos);
    }
}