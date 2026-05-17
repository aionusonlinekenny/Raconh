/**
 * 装备控制器
 */
class EquipControl extends BaseControl
{
    /**
     * 装备
     */
    public equipPanel:EquipPanel;
    public equipPanel2:EquipPanel2;

    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.EQUIP_STRENGTHEN_INFO, EquipStrengthenInfoCMD);
        Manager.socket.addCMD(Protocol.EQUIP_STRENGTHEN, EquipStrengthenCMD);
        Manager.socket.addCMD(Protocol.EQUIP_ZHUHUN, EquipZhuhunCMD);
        Manager.socket.addCMD(Protocol.EQUIP_GEM, EquipGemCMD);
        Manager.socket.addCMD(Protocol.EQUIP_GEM_PICKOFF, EquipGemPickOffCMD);
        Manager.socket.addCMD(Protocol.EQUIP_GEM_UPGRADE, EquipGemUpgradeCMD);
        Manager.socket.addCMD(Protocol.EQUIP_RONGLIAN, EquipRonglianCMD);
        Manager.socket.addCMD(Protocol.EQUIP_ONEKEY, EquipOneKeyCMD);
        Manager.socket.addCMD(Protocol.SUIT_INFO, EquipSuitInfoCMD);
        Manager.socket.addCMD(Protocol.SUIT_UPGRADE, EquipSuitUpgradeCMD);
        Manager.socket.addCMD(Protocol.SUIT_SPLIT, EquipSuitSplitCMD);
    }

    /**
     * 请求装备槽信息
     */
    public equipStrengthenQuery():void
    {
        let cmd:EquipStrengthenInfoCMD = Manager.socket.getCMD(Protocol.EQUIP_STRENGTHEN_INFO) as EquipStrengthenInfoCMD;
        cmd.send();
    }

    /**
     * 强化
     */
    public equipStrengthen():void
    {
        let cmd:EquipStrengthenCMD = Manager.socket.getCMD(Protocol.EQUIP_STRENGTHEN) as EquipStrengthenCMD;
        cmd.send();
    }

    /**
     * 铸魂
     */
    public equipZhuhun(pos:number):void
    {
        let cmd:EquipZhuhunCMD = Manager.socket.getCMD(Protocol.EQUIP_ZHUHUN) as EquipZhuhunCMD;
        cmd.pos = pos;
        cmd.send();
    }

    /**
     * 宝石镶嵌
     */
    public equipGem(pos:number, itemList:Array<number>):void
    {
        let cmd:EquipGemCMD = Manager.socket.getCMD(Protocol.EQUIP_GEM) as EquipGemCMD;
        cmd.pos = pos;
        cmd.itemList = itemList;
        cmd.send();
    }

    /**
     * 宝石卸下
     */
    public equipGemPickOff(pos:number, gemPos):void
    {
        let cmd:EquipGemPickOffCMD = Manager.socket.getCMD(Protocol.EQUIP_GEM_PICKOFF) as EquipGemPickOffCMD;
        cmd.pos = pos;
        cmd.gemPos = gemPos;
        cmd.send();
    }
    
    /**
     * 宝石升级
     */
    public equipGemUpgrade(pos:number, gemPos):void
    {
        let cmd:EquipGemUpgradeCMD = Manager.socket.getCMD(Protocol.EQUIP_GEM_UPGRADE) as EquipGemUpgradeCMD;
        cmd.pos = pos;
        cmd.gemPos = gemPos;
        cmd.send();
    }

    /**
     * 装备熔炼
     */
    public equipRonglian(list:Array<ItemsModelInfo>):void
    {
        let cmd:EquipRonglianCMD = Manager.socket.getCMD(Protocol.EQUIP_RONGLIAN) as EquipRonglianCMD;
        cmd.list = list;
        cmd.send();
    }

    /**
     * 一键装备
     */
    public equipOneKey(list:Array<ItemsModelInfo>):void
    {
        let cmd:EquipOneKeyCMD = Manager.socket.getCMD(Protocol.EQUIP_ONEKEY) as EquipOneKeyCMD;
        cmd.list = list;
        cmd.send();
    }

    /**
     * 套装信息
     */
    public suitInfoQuery():void
    {
        let cmd:EquipSuitInfoCMD = Manager.socket.getCMD(Protocol.SUIT_INFO) as EquipSuitInfoCMD;
        cmd.send();
    }

    /**
     * 套装升阶
     */
    public suitUpgrade(pos:number):void
    {
        let cmd:EquipSuitUpgradeCMD = Manager.socket.getCMD(Protocol.SUIT_UPGRADE) as EquipSuitUpgradeCMD;
        cmd.pos = pos;
        cmd.send();
    }

    /**
     * 套装拆解
     */
    public suitSplit(pos:number):void
    {
        let cmd:EquipSuitSplitCMD = Manager.socket.getCMD(Protocol.SUIT_SPLIT) as EquipSuitSplitCMD;
        cmd.pos = pos;
        cmd.send();
    }
}