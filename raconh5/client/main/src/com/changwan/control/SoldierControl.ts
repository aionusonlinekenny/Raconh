/**
 * 兵魂
 * Simon
 * 2017.12.21
 */
class SoldierControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.SHENBING_INFO, SoldierInfoCMD);
        Manager.socket.addCMD(Protocol.SHENBING_ACTIVATE, SoldierActivateCMD);
        Manager.socket.addCMD(Protocol.SHENBING_PUTON, SoldierPutonCMD);
        Manager.socket.addCMD(Protocol.SHENBING_UPGRADE_START, SoldierUpgradeStarCMD);
    }

    public query():void
    {
        let cmd:SoldierInfoCMD = Manager.socket.getCMD(Protocol.SHENBING_INFO) as SoldierInfoCMD;
        cmd.send();
    }

    public activate(id:number):void
    {
        let cmd:SoldierActivateCMD = Manager.socket.getCMD(Protocol.SHENBING_ACTIVATE) as SoldierActivateCMD;
        cmd.id = id;
        cmd.send();
    }

    public puton(id:number):void
    {
        let cmd:SoldierPutonCMD = Manager.socket.getCMD(Protocol.SHENBING_PUTON) as SoldierPutonCMD;
        cmd.id = id;
        cmd.send();
    }

    public upgradeStar(id:number):void
    {
        let cmd:SoldierUpgradeStarCMD = Manager.socket.getCMD(Protocol.SHENBING_UPGRADE_START) as SoldierUpgradeStarCMD;
        cmd.id = id;
        cmd.send();
    }
}