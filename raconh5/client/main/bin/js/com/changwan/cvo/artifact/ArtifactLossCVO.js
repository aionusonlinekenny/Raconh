/**
 * pzx
 * 寻宝消耗
 * 18.2.7
 */
var ArtifactLossCVO = /** @class */ (function () {
    function ArtifactLossCVO() {
    }
    ArtifactLossCVO.parse = function (bytes) {
        this._cvos = {};
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new ArtifactLossCVO();
            item.type = bytes.readByte();
            item.loss = bytes.readUTF();
            this._cvos[item.type] = item;
        }
    };
    ArtifactLossCVO.getCvo = function (type) {
        return this._cvos[type];
    };
    return ArtifactLossCVO;
}());
//# sourceMappingURL=ArtifactLossCVO.js.map