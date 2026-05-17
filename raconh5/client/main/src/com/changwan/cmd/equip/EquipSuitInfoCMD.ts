class EquipSuitInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.SUIT_INFO;
    }

    protected processOut(pkg:TCPPacketOut):void
    {
        
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getEquip().equipSuitAttackList = [];
        Manager.model.getEquip().equipSuitDefenseList = [];
        let len:number = pi.readShort();
        for(let i:number=0; i<len; i++)
        {
            let pos:number = pi.readByte();
            let level:number = pi.readByte();
            if(EquipModel.SUIT_ATTACK_POS.indexOf(pos) != -1)
            {
                let list:Array<any> = Manager.model.getEquip().equipSuitAttackList;
                let has:boolean = false;
                for(let j:number=0; j<list.length; j++)
                {
                    if(list[j] && list[j].pos == pos)
                    {
                        has = true;
                        list[j].level = level;
                    }
                }
                if(!has) Manager.model.getEquip().equipSuitAttackList.push({pos:pos, level:level});
            }
            else if(EquipModel.SUIT_DEFENSE_POS.indexOf(pos) != -1)
            {
                let list:Array<any> = Manager.model.getEquip().equipSuitDefenseList;
                let has:boolean = false;
                for(let j:number=0; j<list.length; j++)
                {
                    if(list[j] && list[j].pos == pos)
                    {
                        has = true;
                        list[j].level = level;
                    }
                }
                if(!has) Manager.model.getEquip().equipSuitDefenseList.push({pos:pos, level:level});
            }
        }
        let suitAllFight:number = pi.readInt();
        Manager.model.getEquip().suitAllFight = suitAllFight;
        Manager.model.getEquip().dispatchEvent(new EquipEvent(EquipEvent.SUIT_INFO_UPDATE));
    }
}