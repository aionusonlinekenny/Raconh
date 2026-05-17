var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * 17.12.14
 * 改名消耗
 */
var RenameCVO = (function () {
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
__reflect(RenameCVO.prototype, "RenameCVO");
//# sourceMappingURL=RenameCVO.js.map