var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * 特权卡
 * 18.1.11
 */
var SysPrivilegeCVO = (function () {
    function SysPrivilegeCVO() {
    }
    SysPrivilegeCVO.parse = function (bytes) {
        this._cvos = [];
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new SysPrivilegeCVO();
            item.id = bytes.readByte();
            item.price = bytes.readShort();
            item.name = bytes.readUTF();
            this._cvos.push(item);
        }
    };
    SysPrivilegeCVO.getCvo = function (id) {
        for (var i = this._cvos.length - 1; i >= 0; i--) {
            if (this._cvos[i].id == id)
                return this._cvos[i];
        }
        return null;
    };
    return SysPrivilegeCVO;
}());
__reflect(SysPrivilegeCVO.prototype, "SysPrivilegeCVO");
//# sourceMappingURL=SysPrivilegeCVO.js.map