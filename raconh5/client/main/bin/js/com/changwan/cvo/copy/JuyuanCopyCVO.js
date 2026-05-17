/**
 * 聚元 copyCVO
 * drq
 * create 2018-4-4
 */
var JuyuanCopyCVO = /** @class */ (function () {
    function JuyuanCopyCVO() {
    }
    JuyuanCopyCVO.parse = function (bytes) {
        this._cvo = [];
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new JuyuanCopyCVO();
            item.cell = bytes.readShort();
            item.name = bytes.readUTF();
            item.mon = bytes.readUTF();
            item.sysID = bytes.readShort();
            item.conds = bytes.readUTF();
            this._cvo.push(item);
        }
    };
    JuyuanCopyCVO.getCvos = function () {
        return this._cvo;
    };
    return JuyuanCopyCVO;
}());
//# sourceMappingURL=JuyuanCopyCVO.js.map