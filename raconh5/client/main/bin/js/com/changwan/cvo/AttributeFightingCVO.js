/**
 * pzx
 * 17.11.21
 * 战斗力配置表
 */
var AttributeFightingCVO = /** @class */ (function () {
    function AttributeFightingCVO() {
    }
    AttributeFightingCVO.parse = function (bytes) {
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        var type;
        var name;
        var num;
        this._dic = new Dictionary();
        for (var i = 0; i < tableCount; i++) {
            type = bytes.readByte();
            name = bytes.readUTF();
            num = bytes.readInt() / 100;
            this._dic.add(type, num);
        }
    };
    AttributeFightingCVO.getData = function () {
        return this._dic;
    };
    return AttributeFightingCVO;
}());
//# sourceMappingURL=AttributeFightingCVO.js.map