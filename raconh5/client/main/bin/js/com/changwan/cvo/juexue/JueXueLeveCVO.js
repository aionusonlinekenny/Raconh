/**
 * pzx
 * 18.2.28
 * 绝学 秘籍等级列表cvo
 */
var JueXueLeveCVO = /** @class */ (function () {
    function JueXueLeveCVO() {
    }
    JueXueLeveCVO.parse = function (bytes) {
        var tableCount = bytes.readShort();
        var info;
        var arr;
        for (var i = 0; i < tableCount; i++) {
            info = new JueXueLeveCVO();
            info.id = bytes.readShort();
            info.leve = bytes.readShort();
            info.loss = bytes.readUTF();
            info.gain = bytes.readUTF();
            info.attr = bytes.readUTF();
            if (!this._data[info.id]) {
                this._data[info.id] = new Array();
            }
            arr = this._data[info.id];
            arr.push(info);
        }
        JueXueExtraAttrCVO.parse(bytes);
    };
    /**
     * 获得列表
     */
    JueXueLeveCVO.getList = function (id) {
        return this._data[id];
    };
    JueXueLeveCVO.getCvo = function (id, leve) {
        var arr = this._data[id];
        for (var i = arr.length - 1; i > -1; i--) {
            if (arr[i].leve == leve) {
                return arr[i];
            }
        }
        return null;
    };
    JueXueLeveCVO._data = {};
    return JueXueLeveCVO;
}());
//# sourceMappingURL=JueXueLeveCVO.js.map