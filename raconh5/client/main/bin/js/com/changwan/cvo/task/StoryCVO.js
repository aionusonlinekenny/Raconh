/**
 * 新手剧情表
 * liangyan
 * create 2018-03-14
*/
var StoryCVO = /** @class */ (function () {
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
//# sourceMappingURL=StoryCVO.js.map