/**
 * 副本信息协议
 * luzhihong
 * create 2017.12.4
 */
class CopyInfosCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_INFOS;
	}
	
    public receive(pi:TCPPacketIn):void
    {
        // array('name'=>'list', 'type'=>'arr', 'tuple'=>'true', 'desc'=>'副本列表(已通关)', 'vars' => array(
        //     array('name' => 'id', 'type' => 'int32', 'desc' => '副本ID'),
        //     array('name' => 'cell', 'type' => 'int16', 'desc' => '进入层数'),
        //     array('name' => 'enter_times', 'type' => 'int8', 'desc' => '进入次数'),
        // )),
        let id:number;
        let cvo:CopyCVO;
        let len:number = pi.readShort();
        while(len--)
        {
            id = pi.readInt();
            cvo = CopyCVO.getCVO(id);
            if(cvo)
                cvo.update(pi.readShort(), pi.readByte());
            else
            {
                pi.readShort();
                pi.readByte();
            }
        }

        let len2:number = pi.readShort();
        for(let i:number=0; i<len2; i++)
        {
            let id:number = pi.readInt();
            let len3:number = pi.readShort();
            let list:Array<number> = [];
            for(let j:number=0; j<len3; j++)
            {
                let cell:number = pi.readShort();
                list.push(cell);
            }
            if(id == CopyConst.ID_MATERIAL) Manager.model.getMaterialCopy().updatePassList(list);
            let enterTime:number = pi.readByte();
        }
    }
}