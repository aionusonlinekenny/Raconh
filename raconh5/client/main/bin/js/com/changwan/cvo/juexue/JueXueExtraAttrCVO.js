/**
 * pzx
 * 18.2.28
 * 绝学 额外属性列表cvo
 */
var JueXueExtraAttrCVO = /** @class */ (function () {
    function JueXueExtraAttrCVO() {
    }
    Object.defineProperty(JueXueExtraAttrCVO.prototype, "attrVo", {
        get: function () {
            if (this._attrVo == null)
                this._attrVo = Manager.pool.create(AttrVO, this.attr);
            return this._attrVo;
        },
        enumerable: true,
        configurable: true
    });
    JueXueExtraAttrCVO.prototype.getAttrVOinfo = function () {
        return this.attrVo.attrInfos[0];
    };
    JueXueExtraAttrCVO.parse = function (bytes) {
        var tableCount = bytes.readShort();
        var info;
        for (var i = 0; i < tableCount; i++) {
            info = new JueXueExtraAttrCVO();
            info.id = bytes.readShort();
            info.leve = bytes.readShort();
            info.attr = bytes.readUTF();
            this._data[info.id + "_" + info.leve] = info;
        }
        JueXueAmbitCVO.parse(bytes);
    };
    /**list信息 */
    JueXueExtraAttrCVO.getCvos = function (id) {
        var arr = [];
        for (var key in this._data) {
            var cvo = this._data[key];
            if (cvo.id == id) {
                arr.push(cvo);
            }
        }
        arr = ArrayUtil.sortOn(arr, ["leve"]);
        return arr;
    };
    JueXueExtraAttrCVO._data = {};
    return JueXueExtraAttrCVO;
}());
//# sourceMappingURL=JueXueExtraAttrCVO.js.map