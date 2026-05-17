/**
 * 银币副本难度表
 * luzhihong
 * create 2018.3.9
 */
var CopySilverHardCVO = /** @class */ (function () {
    function CopySilverHardCVO() {
    }
    /*解析表*/
    CopySilverHardCVO.parse = function (bytes) {
        CopySilverHardCVO._cvos = [];
        var cvo;
        var rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            cvo = new CopySilverHardCVO();
            cvo.id = bytes.readByte();
            cvo.level = bytes.readShort();
            cvo.name = bytes.readUTF();
            CopySilverHardCVO._cvos.push(cvo);
        }
    };
    CopySilverHardCVO.getCVO = function (id) {
        for (var i = this._cvos.length - 1; i >= 0; i--) {
            if (this._cvos[i].id == id)
                return this._cvos[i];
        }
        return null;
    };
    CopySilverHardCVO.getCurCVO = function () {
        var curLv = Manager.model.self.attrInfo.level;
        var len = this._cvos.length;
        for (var i = 0; i < len; i++) {
            if (this._cvos[i].level > curLv)
                return this._cvos[i];
        }
        return this._cvos[len - 1];
    };
    return CopySilverHardCVO;
}());
//# sourceMappingURL=CopySilverHardCVO.js.map