/**
 * 斗地主
 */
class LairdControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD()
    {
        Manager.socket.addCMD(Protocol.CMD_LAIRD_UPDATE, LairdUpdateCMD);
        Manager.socket.addCMD(Protocol.CMD_LAIRD_INFO, LairdInfoCMD);
        Manager.socket.addCMD(Protocol.CMD_LAIRD_COOLY, LairdCoolyCMD);
        Manager.socket.addCMD(Protocol.CMD_LAIRD_ADD_INTERACT_REC, LairdAddInteractRecCMD);
        Manager.socket.addCMD(Protocol.CMD_LAIRD_CATCH, LairdCatchCMD);
        Manager.socket.addCMD(Protocol.CMD_LAIRD_GUILD, LairdGuildCMD);
        Manager.socket.addCMD(Protocol.CMD_LAIRD_INTERACT, LairdInteractCMD);
        Manager.socket.addCMD(Protocol.CMD_LAIRD_SEEK_HELP, LairdSeekHelpCMD);
        Manager.socket.addCMD(Protocol.CMD_LAIRD_FIGHT, LairdFightCMD);
        Manager.socket.addCMD(Protocol.CMD_LAIRD_PICK_EXP, LairdPickExpCMD);
        Manager.socket.addCMD(Protocol.CMD_LAIRD_INTERACT_REC, LairdInteractRecCMD);
        Manager.socket.addCMD(Protocol.CMD_LAIRD_QUIT, LairdQuitCMD);
        Manager.socket.addCMD(Protocol.CMD_LAIRD_FREE_PLAYER, LairdFreePlayerCMD);
        Manager.socket.addCMD(Protocol.CMD_LAIRD_UPDATE_NOTE_STATUS, LairdNoteUpdateStatusCMD);
    }

    /**主动请求19300,19301 */
    public lairdUpdate():void
    {
        let cmd:LairdUpdateCMD = Manager.socket.getCMD(Protocol.CMD_LAIRD_UPDATE) as LairdUpdateCMD;
        cmd.send();
    }

    /**抓捕数据 */
    public lairdCatch():void
    {
        let cmd:LairdCatchCMD = Manager.socket.getCMD(Protocol.CMD_LAIRD_CATCH) as LairdCatchCMD;
        cmd.send();
    }

    /**盟会信息 */
    public lairdGuildInfo():void
    {
        let cmd:LairdGuildCMD = Manager.socket.getCMD(Protocol.CMD_LAIRD_GUILD) as LairdGuildCMD;
        cmd.send();
    }

    /**互动 */
    public lairdInteract(type:number, targetId:number):void
    {
        let cmd:LairdInteractCMD = Manager.socket.getCMD(Protocol.CMD_LAIRD_INTERACT) as LairdInteractCMD;
        cmd.type = type;
        cmd.targetId = targetId;
        cmd.send();
    }

    /**求救 */
    public lairdSeekHelp(targetId:number):void
    {
        let cmd:LairdSeekHelpCMD = Manager.socket.getCMD(Protocol.CMD_LAIRD_SEEK_HELP) as LairdSeekHelpCMD;
        cmd.targetId = targetId;
        cmd.send();
    }

    /**
     * 斗地主战斗
     */
    public lairdFight(type:number, targetId:number):void
    {
        let cmd:LairdFightCMD = Manager.socket.getCMD(Protocol.CMD_LAIRD_FIGHT) as LairdFightCMD;
        cmd.type = type;
        cmd.targetId = targetId;
        cmd.send();
    }

    /**提取经验 */
    public lairPickExp(type:number, targetId:number):void
    {
        let cmd:LairdPickExpCMD = Manager.socket.getCMD(Protocol.CMD_LAIRD_PICK_EXP) as LairdPickExpCMD;
        cmd.type = type;
        cmd.targetId = targetId;
        cmd.send();
    }

    /**请求记录数据 */
    public lairdInteractRec():void
    {
        let cmd:LairdInteractRecCMD = Manager.socket.getCMD(Protocol.CMD_LAIRD_INTERACT_REC) as LairdInteractRecCMD;
        cmd.send();
    }

    /**退出竞技场 */
    public lairdQuit():void
    {
        let cmd:LairdQuitCMD = Manager.socket.getCMD(Protocol.CMD_LAIRD_QUIT) as LairdQuitCMD;
        cmd.send();
    }

    /**释放苦工 */
    public lairdFree(playerId:number):void
    {
        let cmd:LairdFreePlayerCMD = Manager.socket.getCMD(Protocol.CMD_LAIRD_FREE_PLAYER) as LairdFreePlayerCMD;
        cmd.playerId = playerId;
        cmd.send();
    }

    /**更新记录状态 */
    public lairdUpdateNoteStatus(noteId:number):void
    {
        let cmd:LairdNoteUpdateStatusCMD = Manager.socket.getCMD(Protocol.CMD_LAIRD_UPDATE_NOTE_STATUS) as LairdNoteUpdateStatusCMD;
        cmd.noteId = noteId;
        cmd.send();
    }
}