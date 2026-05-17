/**
 * pzx 
 * 17.12.14
     * 改名
     */
class RenameControl extends BaseControl
{
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
         Manager.socket.addCMD(Protocol.CMD_ROLE_RENAME,RenameCMD);
    }
  
    public rename(name:string):void
    {
        let cmd:RenameCMD = Manager.socket.getCMD(Protocol.CMD_ROLE_RENAME) as RenameCMD;
        cmd.rename = name;
        cmd.send();
    }
}