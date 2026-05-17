/**
 * pzx
 * 2017.12.16
 */
var SysNoteiceCVO = /** @class */ (function () {
    function SysNoteiceCVO() {
        this._state = 0;
    }
    SysNoteiceCVO.prototype.setState = function (value) {
        this._state = value;
    };
    Object.defineProperty(SysNoteiceCVO.prototype, "state", {
        /**领取奖励,0:否,1:是' */
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    SysNoteiceCVO.parse = function (bytes) {
        this._cvos = [];
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new SysNoteiceCVO();
            item.id = bytes.readShort();
            item.name = bytes.readUTF();
            item.taskId = bytes.readInt();
            item.icon = bytes.readUTF();
            item.offsetX = bytes.readShort();
            item.offsetY = bytes.readShort();
            item.pass = bytes.readShort();
            item.open_task_id = bytes.readInt();
            item.reward = bytes.readUTF();
            item.pointId = bytes.readByte();
            var show = bytes.readByte();
            item.panelId = bytes.readUTF();
            if (show == 1)
                this._cvos.push(item);
        }
    };
    SysNoteiceCVO.getCvos = function () {
        return this._cvos;
    };
    SysNoteiceCVO.getCvo = function (id) {
        for (var i = this._cvos.length - 1; i >= 0; i--) {
            if (this._cvos[i].id == id)
                return this._cvos[i];
        }
        return null;
    };
    return SysNoteiceCVO;
}());
//# sourceMappingURL=SysNoteiceCVO.js.map