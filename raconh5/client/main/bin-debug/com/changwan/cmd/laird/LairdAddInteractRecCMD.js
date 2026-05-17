var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
var LairdAddInteractRecCMD = (function (_super) {
    __extends(LairdAddInteractRecCMD, _super);
    function LairdAddInteractRecCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_LAIRD_ADD_INTERACT_REC;
        return _this;
    }
    LairdAddInteractRecCMD.prototype.processOut = function (pkg) {
        // pkg.writeByte(this.trainingType);
    };
    LairdAddInteractRecCMD.prototype.receive = function (pi) {
        var list = [];
        var timeStamp = pi.readInt();
        var noticeId = pi.readShort();
        var len = pi.readShort();
        var child = {};
        for (var i = 0; i < len; i++) {
            child.type = pi.readByte();
            child.content = pi.readUTF();
        }
        var noteId = pi.readInt();
        var textCvo = TextDataCVO.getCVO(noticeId);
        if (textCvo) {
            var content = Manager.model.getChat().parseLink(textCvo.content, [child]);
            list.push({ time: timeStamp, content: content });
            if (noteId != 0) {
                Manager.control.getLaird().lairdUpdateNoteStatus(noteId);
                Manager.tips.showTips(content, null, false);
            }
        }
        Manager.model.getLaird().dispatchEvent(new LairdEvent(LairdEvent.LAIRD_INTERACTREC_LIST_UPDATE, list));
    };
    return LairdAddInteractRecCMD;
}(BaseCMD));
__reflect(LairdAddInteractRecCMD.prototype, "LairdAddInteractRecCMD");
//# sourceMappingURL=LairdAddInteractRecCMD.js.map