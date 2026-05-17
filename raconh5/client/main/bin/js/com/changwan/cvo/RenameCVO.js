/**
 * pzx
 * 17.12.14
 * 改名消耗
 */
var RenameCVO = /** @class */ (function () {
    function RenameCVO() {
    }
    RenameCVO.parse = function (bytes) {
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            this.itemlosse = bytes.readUTF();
            this.goldlosse = bytes.readUTF();
        }
    };
    return RenameCVO;
}());
//# sourceMappingURL=RenameCVO.js.map