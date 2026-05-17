var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * 寻宝首具数据
 * 18.2.7
 */
var ArtifactCVO = (function () {
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
__reflect(ArtifactCVO.prototype, "ArtifactCVO");
//# sourceMappingURL=ArtifactCVO.js.map