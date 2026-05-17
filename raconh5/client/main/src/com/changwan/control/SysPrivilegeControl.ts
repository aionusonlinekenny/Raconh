/**
 * pzx 
 * 18.1.11
     * Control
     */
class SysPrivilegeControl extends BaseControl
{
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
         Manager.socket.addCMD(Protocol.CMD_SYSPRIVILEGE_QUERY,SysPrivilegeQueryCMD);
         Manager.socket.addCMD(Protocol.CMD_SYSPRIVILEGE_REWARD,SysPrivilegeRewardCMD);
         Manager.socket.addCMD(Protocol.CMD_SYSPRIVILEGE_EXPERIENCE,SysPrivilegeExperienceCMD);
    }
    /**
     * 查询
     */
    public query():void
    {
        let cmd:SysPrivilegeQueryCMD = Manager.socket.getCMD(Protocol.CMD_SYSPRIVILEGE_QUERY) as SysPrivilegeQueryCMD;
        cmd.send();
    }

    public reward(type:number):void
    {
        let cmd:SysPrivilegeRewardCMD = Manager.socket.getCMD(Protocol.CMD_SYSPRIVILEGE_REWARD) as SysPrivilegeRewardCMD;
        cmd.type = type;
        cmd.send();
    }
    /**体验卡请求 */
    public experience():void
    {
        let cmd:SysPrivilegeExperienceCMD = Manager.socket.getCMD(Protocol.CMD_SYSPRIVILEGE_EXPERIENCE) as SysPrivilegeExperienceCMD;
        cmd.send();
    }
}