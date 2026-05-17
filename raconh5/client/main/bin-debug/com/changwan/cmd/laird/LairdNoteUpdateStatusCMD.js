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
var LairdNoteUpdateStatusCMD = (function (_super) {
    __extends(LairdNoteUpdateStatusCMD, _super);
    function LairdNoteUpdateStatusCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_LAIRD_UPDATE_NOTE_STATUS;
        return _this;
    }
    LairdNoteUpdateStatusCMD.prototype.processOut = function (pkg) {
        pkg.writeInt(this.noteId);
    };
    LairdNoteUpdateStatusCMD.prototype.receive = function (pi) {
        var list = [];
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var timeStamp = pi.readInt();
            var noticeId = pi.readShort();
            var len2 = pi.readShort();
            var arr = [];
            var child = void 0;
            for (var j = 0; j < len2; j++) {
                child = {};
                child.type = pi.readByte();
                child.content = pi.readUTF();
                arr.push(child);
            }
            var noteId = pi.readInt();
            var textCvo = TextDataCVO.getCVO(noticeId);
            if (textCvo) {
                var content = Manager.model.getChat().parseLink(textCvo.content, arr);
                list.push({ time: timeStamp, content: content });
                if (noteId != 0) {
                    Manager.control.getLaird().lairdUpdateNoteStatus(noteId);
                    Manager.tips.showTips(content, null, false);
                }
            }
        }
    };
    return LairdNoteUpdateStatusCMD;
}(BaseCMD));
__reflect(LairdNoteUpdateStatusCMD.prototype, "LairdNoteUpdateStatusCMD");
//# sourceMappingURL=LairdNoteUpdateStatusCMD.js.map