var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 斗地主
 */
var LairdControl = /** @class */ (function (_super) {
    __extends(LairdControl, _super);
    function LairdControl() {
        return _super.call(this) || this;
    }
    LairdControl.prototype.addCMD = function () {
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
    };
    /**主动请求19300,19301 */
    LairdControl.prototype.lairdUpdate = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_LAIRD_UPDATE);
        cmd.send();
    };
    /**抓捕数据 */
    LairdControl.prototype.lairdCatch = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_LAIRD_CATCH);
        cmd.send();
    };
    /**盟会信息 */
    LairdControl.prototype.lairdGuildInfo = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_LAIRD_GUILD);
        cmd.send();
    };
    /**互动 */
    LairdControl.prototype.lairdInteract = function (type, targetId) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_LAIRD_INTERACT);
        cmd.type = type;
        cmd.targetId = targetId;
        cmd.send();
    };
    /**求救 */
    LairdControl.prototype.lairdSeekHelp = function (targetId) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_LAIRD_SEEK_HELP);
        cmd.targetId = targetId;
        cmd.send();
    };
    /**
     * 斗地主战斗
     */
    LairdControl.prototype.lairdFight = function (type, targetId) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_LAIRD_FIGHT);
        cmd.type = type;
        cmd.targetId = targetId;
        cmd.send();
    };
    /**提取经验 */
    LairdControl.prototype.lairPickExp = function (type, targetId) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_LAIRD_PICK_EXP);
        cmd.type = type;
        cmd.targetId = targetId;
        cmd.send();
    };
    /**请求记录数据 */
    LairdControl.prototype.lairdInteractRec = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_LAIRD_INTERACT_REC);
        cmd.send();
    };
    /**退出竞技场 */
    LairdControl.prototype.lairdQuit = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_LAIRD_QUIT);
        cmd.send();
    };
    /**释放苦工 */
    LairdControl.prototype.lairdFree = function (playerId) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_LAIRD_FREE_PLAYER);
        cmd.playerId = playerId;
        cmd.send();
    };
    /**更新记录状态 */
    LairdControl.prototype.lairdUpdateNoteStatus = function (noteId) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_LAIRD_UPDATE_NOTE_STATUS);
        cmd.noteId = noteId;
        cmd.send();
    };
    return LairdControl;
}(BaseControl));
//# sourceMappingURL=LairdControl.js.map