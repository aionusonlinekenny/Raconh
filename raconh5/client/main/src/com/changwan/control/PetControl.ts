/**
 * 宠物control
 * liangyan
 * create 2017-12-16
*/
class PetControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD()
    {
        Manager.socket.addCMD(Protocol.PET_ALL_INFO, PetAllInfoCMD);
        Manager.socket.addCMD(Protocol.PET_UPGRADE, PetUpgradeCMD);
        Manager.socket.addCMD(Protocol.PET_ZZD_USE, PetZZDUseCMD);
        Manager.socket.addCMD(Protocol.PET_WXD_USE, PetWXDUseCMD);
        Manager.socket.addCMD(Protocol.PET_HUANHUA, PetHuanhuaCMD);
        Manager.socket.addCMD(Protocol.PET_SKILL_UPGRADE, PetSkillUpgradeCMD);
        Manager.socket.addCMD(Protocol.PET_ITEM_STYLE_LIST, PetItemStyleListCMD);
    }

    public upgradePet():void
    {
        let cmd = Manager.socket.getCMD(Protocol.PET_UPGRADE) as PetUpgradeCMD;
        cmd.send();
    }

    public upgradePetSkill(groupId:number):void
    {
        let cmd:PetSkillUpgradeCMD = Manager.socket.getCMD(Protocol.PET_SKILL_UPGRADE) as PetSkillUpgradeCMD;
        cmd.groupId = groupId;
        cmd.send();
    }

    public usePetZZD():void
    {
        let cmd = Manager.socket.getCMD(Protocol.PET_ZZD_USE) as PetZZDUseCMD;
        cmd.send();
    }

    public usePetWXD():void
    {
        let cmd = Manager.socket.getCMD(Protocol.PET_WXD_USE) as PetWXDUseCMD;
        cmd.send();
    }

    public huanhuaPet(id:number):void
    {
        let cmd = Manager.socket.getCMD(Protocol.PET_HUANHUA) as PetHuanhuaCMD;
        cmd.id = id;
        cmd.send();
    }
}