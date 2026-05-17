var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 新手剧情表
 * liangyan
 * create 2018-03-14
*/
var StoryCVO = (function () {
    function StoryCVO() {
    }
    StoryCVO.parse = function (bytes) {
        StoryCVO._cvos = {};
        var baseCount = bytes.readShort();
        var cvo;
        for (var i = 0; i < baseCount; i++) {
            cvo = new StoryCVO();
            cvo.parseOne(bytes);
            StoryCVO._cvos[cvo.id] = cvo;
        }
    };
    StoryCVO.prototype.parseOne = function (data) {
        this.id = data.readShort();
        this.type = data.readByte();
        this.script = data.readUTF();
    };
    StoryCVO.getCVO = function (id) {
        return this._cvos[id];
    };
    return StoryCVO;
}());
__reflect(StoryCVO.prototype, "StoryCVO");
//# sourceMappingURL=StoryCVO.js.map