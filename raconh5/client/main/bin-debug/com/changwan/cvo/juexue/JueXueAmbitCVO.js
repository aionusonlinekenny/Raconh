var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * 18.2.28
 * 绝学 境界列表cvo
 */
var JueXueAmbitCVO = (function () {
    function JueXueAmbitCVO() {
    }
    JueXueAmbitCVO.parse = function (bytes) {
        var tableCount = bytes.readShort();
        var info;
        for (var i = 0; i < tableCount; i++) {
            info = new JueXueAmbitCVO();
            info.id = bytes.readByte();
            info.name = bytes.readUTF();
            info.loss = bytes.readUTF();
            info.attr = bytes.readUTF();
            this._data[info.id] = info;
        }
    };
    /**信息 */
    JueXueAmbitCVO.getInfo = function (id) {
        return this._data[id];
    };
    JueXueAmbitCVO._data = {};
    return JueXueAmbitCVO;
}());
__reflect(JueXueAmbitCVO.prototype, "JueXueAmbitCVO");
//# sourceMappingURL=JueXueAmbitCVO.js.map