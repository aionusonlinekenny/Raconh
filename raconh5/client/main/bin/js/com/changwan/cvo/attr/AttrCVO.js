/**
 * pzx
 * 17.11.13
 * 属性表
 */
var AttrCVO = /** @class */ (function () {
    function AttrCVO() {
    }
    AttrCVO.parse = function (bytes) {
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        var info;
        for (var i = 0; i < tableCount; i++) {
            info = new AttrCVO();
            info.name = bytes.readUTF();
            info.shortName = bytes.readUTF();
            info.type = bytes.readUTF();
            info.id = bytes.readByte();
            info.format = bytes.readByte();
            info.showStar = bytes.readByte();
            this._data[info.id] = info;
        }
    };
    /**信息 */
    AttrCVO.getInfo = function (id) {
        return this._data[id];
    };
    AttrCVO._data = {};
    return AttrCVO;
}());
//# sourceMappingURL=AttrCVO.js.map