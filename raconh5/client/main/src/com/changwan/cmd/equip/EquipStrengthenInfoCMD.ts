class EquipStrengthenInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.EQUIP_STRENGTHEN_INFO;
    }

    public receive(pi:TCPPacketIn):void
    {
        let type:number = pi.readByte();
        let dataList = [];
        let len:number = pi.readShort();
        for(let i:number=0; i<len; i++)
        {
            let pos:number = pi.readByte();
            let level:number = pi.readShort();
            let fighting:number = pi.readInt();
            let zhuhunLevel:number = pi.readShort();
            let zhuhunFight:number = pi.readInt();
            let len2:number = pi.readShort();
            let gemList:Array<{}> = [];
            for(let j:number=0; j<len2; j++)
            {
                let gemPos:number = pi.readByte();
                let gemId:number = pi.readInt();
                gemList.push({gemPos:gemPos, gemId:gemId});
            }
            let gemFight:number = pi.readInt();
            dataList.push([pos, level, fighting, zhuhunLevel, zhuhunFight, gemList, gemFight]);
        }

        dataList.sort(this.sortData);

        let zhuhunOtherFight:number = pi.readInt();
        let gemOtherFight:number = pi.readInt();
        Manager.model.getEquip().zhuhuanOtherFight = zhuhunOtherFight;
        Manager.model.getEquip().gemOtherFight = gemOtherFight;
        Manager.model.getItems().updateEquipStrengthen(dataList);
    }

    private sortData(value1:any, value2:any):number
    {
        if(Number(value1[0]) > Number(value2[0]))
            return 1;
        else if(value1.pos < value2.pos)
            return -1;
        else
            return 0;
    }
}