var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author luzh
 *create 2018.4.21
 *description 江湖风云据点cvo
*/
var StormStrongHoldCVO = (function () {
    function StormStrongHoldCVO() {
    }
    StormStrongHoldCVO.parse = function (bytes) {
        this._cvos = {};
        var baseCount = bytes.readShort();
        var cvo;
        for (var i = 0; i < baseCount; i++) {
            cvo = new StormStrongHoldCVO();
            cvo.id = bytes.readShort();
            cvo.fieldID = bytes.readByte();
            cvo.name = bytes.readUTF();
            cvo.step = bytes.readByte();
            cvo.next_id = bytes.readUTF();
            cvo.last_id = bytes.readUTF();
            cvo.map_id = bytes.readShort();
            cvo.pos = PointUtil.getPoint2(bytes.readUTF());
            this._cvos[cvo.id] = cvo;
        }
    };
    StormStrongHoldCVO.getCVO = function (id) {
        return this._cvos[id];
    };
    StormStrongHoldCVO.getCVOsByFieldID = function (fieldID) {
        var result = [];
        var cvo;
        for (var key in this._cvos) {
            cvo = this._cvos[key];
            if (cvo.fieldID == fieldID)
                result.push(cvo);
        }
        return result;
    };
    return StormStrongHoldCVO;
}());
__reflect(StormStrongHoldCVO.prototype, "StormStrongHoldCVO");
//# sourceMappingURL=StormStrongHoldCVO.js.map