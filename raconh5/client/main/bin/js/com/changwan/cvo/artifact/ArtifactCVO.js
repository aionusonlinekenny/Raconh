/**
 * pzx
 * 寻宝首具数据
 * 18.2.7
 */
var ArtifactCVO = /** @class */ (function () {
    function ArtifactCVO() {
    }
    ArtifactCVO.parse = function (bytes) {
        this._itemCvos = [];
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new ArtifactCVO();
            item.item = bytes.readUTF();
            item.sort = bytes.readByte();
            this._itemCvos[item.sort] = item;
        }
        ArtifactIntegralCVO.parse(bytes);
        ArtifactLossCVO.parse(bytes);
    };
    ArtifactCVO.getCvos = function () {
        return this._itemCvos;
    };
    return ArtifactCVO;
}());
//# sourceMappingURL=ArtifactCVO.js.map