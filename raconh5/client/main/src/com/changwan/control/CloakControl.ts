/**
 * pzx 
 * 17.12.1
     * 披风Control
     */
class CloakControl extends BaseControl
{
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
         Manager.socket.addCMD(Protocol.CMD_CLOAK_QUEYT,CloakQueryCMD);
         Manager.socket.addCMD(Protocol.CMD_CLOAK_ACTIVATE,CloakActivateCMD);
         Manager.socket.addCMD(Protocol.CMD_CLOAK_WARE,CloakWareCMD);
         Manager.socket.addCMD(Protocol.CMD_CLOAK_STAR,CloakUpgradeStarCMD);
    }
    /**
     * 查询
     */
    public query():void
    {
        let cmd:CloakQueryCMD = Manager.socket.getCMD(Protocol.CMD_CLOAK_QUEYT) as CloakQueryCMD;
        cmd.send();
    }

    public activate(id:number):void
    {
        let cmd:CloakActivateCMD = Manager.socket.getCMD(Protocol.CMD_CLOAK_ACTIVATE) as CloakActivateCMD;
        cmd.id = id;
        cmd.send();
    }
     public rawe(id:number):void
    {
        let cmd:CloakWareCMD = Manager.socket.getCMD(Protocol.CMD_CLOAK_WARE) as CloakWareCMD;
        cmd.id = id;
        cmd.send();
    }
    public upgradeStar(id:number):void
    {
        let cmd:CloakUpgradeStarCMD = Manager.socket.getCMD(Protocol.CMD_CLOAK_STAR) as CloakUpgradeStarCMD;
        cmd.id = id;
        cmd.send();
    }
}