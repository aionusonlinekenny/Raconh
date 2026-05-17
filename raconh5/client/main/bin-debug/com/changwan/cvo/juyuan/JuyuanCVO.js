var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * drq
 * 聚元 CVO
 * 2018.3.30
 */
var JuyuanCVO = (function () {
    function JuyuanCVO() {
    }
    JuyuanCVO.parse = function (bytes) {
        this._cvos = [];
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new JuyuanCVO();
            item.sort_id = bytes.readInt();
            item.id = bytes.readInt();
            item.step = bytes.readInt();
            item.star = bytes.readByte();
            item.next_id = bytes.readInt();
            item.next_step = bytes.readInt();
            item.next_star = bytes.readByte();
            item.consume = bytes.readUTF();
            item.attr = bytes.readUTF();
            item.t_attr = bytes.readUTF();
            item.cond = bytes.readUTF();
            this._cvos.push(item);
        }
        //
    };
    JuyuanCVO.getCvo = function () {
        return this._cvos;
    };
    return JuyuanCVO;
}());
__reflect(JuyuanCVO.prototype, "JuyuanCVO");
//# sourceMappingURL=JuyuanCVO.js.map