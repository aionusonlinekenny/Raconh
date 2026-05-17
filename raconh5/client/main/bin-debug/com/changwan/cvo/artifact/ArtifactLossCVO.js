var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * 寻宝消耗
 * 18.2.7
 */
var ArtifactLossCVO = (function () {
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
__reflect(ArtifactLossCVO.prototype, "ArtifactLossCVO");
//# sourceMappingURL=ArtifactLossCVO.js.map