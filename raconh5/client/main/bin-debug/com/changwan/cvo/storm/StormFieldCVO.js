var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author luzh
 *create 2018.4.21
 *description 江湖风云区域cvo
*/
var StormFieldCVO = (function () {
    function StormFieldCVO() {
    }
    StormFieldCVO.parse = function (bytes) {
        this._cvos = {};
        var baseCount = bytes.readShort();
        var cvo;
        for (var i = 0; i < baseCount; i++) {
            cvo = new StormFieldCVO();
            cvo.id = bytes.readByte();
            cvo.name = bytes.readUTF();
            cvo.pos = PointUtil.getPoint2(bytes.readUTF());
            this._cvos[cvo.id] = cvo;
        }
    };
    StormFieldCVO.getCVOs = function () {
        return this._cvos;
    };
    //--------------------------------------------------------------------------------------
    StormFieldCVO.parseCVOs = function (bytes) {
        var tableCount = bytes.readByte();
        StormFieldCVO.parse(bytes);
        StormStrongHoldCVO.parse(bytes);
    };
    return StormFieldCVO;
}());
__reflect(StormFieldCVO.prototype, "StormFieldCVO");
//# sourceMappingURL=StormFieldCVO.js.map