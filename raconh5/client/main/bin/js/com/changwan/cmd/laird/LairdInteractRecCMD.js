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
var LairdInteractRecCMD = /** @class */ (function (_super) {
    __extends(LairdInteractRecCMD, _super);
    function LairdInteractRecCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_LAIRD_INTERACT_REC;
        return _this;
    }
    LairdInteractRecCMD.prototype.processOut = function (pkg) {
        // pkg.writeByte(this.trainingType);
    };
    LairdInteractRecCMD.prototype.receive = function (pi) {
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
        Manager.model.getLaird().dispatchEvent(new LairdEvent(LairdEvent.LAIRD_INTERACTREC_LIST_UPDATE, list));
    };
    return LairdInteractRecCMD;
}(BaseCMD));
//# sourceMappingURL=LairdInteractRecCMD.js.map