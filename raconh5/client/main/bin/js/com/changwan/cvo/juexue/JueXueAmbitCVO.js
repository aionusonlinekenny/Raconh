/**
 * pzx
 * 18.2.28
 * 绝学 境界列表cvo
 */
var JueXueAmbitCVO = /** @class */ (function () {
    function JueXueAmbitCVO() {
    }
    JueXueAmbitCVO.parse = function (bytes) {
        var tableCount = bytes.readShort();
        var info;
        for (var i = 0; i < tableCount; i++) {
            info = new JueXueAmbitCVO();
            info.id = bytes.readByte();
            info.name = bytes.readUTF();
            info.loss = bytes.readUTF();
            info.attr = bytes.readUTF();
            this._data[info.id] = info;
        }
    };
    /**信息 */
    JueXueAmbitCVO.getInfo = function (id) {
        return this._data[id];
    };
    JueXueAmbitCVO._data = {};
    return JueXueAmbitCVO;
}());
//# sourceMappingURL=JueXueAmbitCVO.js.map