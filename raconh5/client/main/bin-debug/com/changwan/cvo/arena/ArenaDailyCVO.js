var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2018-1-3
 *description
*/
var ArenaDailyCVO = (function () {
    function ArenaDailyCVO() {
    }
    ArenaDailyCVO.parse = function (bytes) {
        ArenaDailyCVO.cvos = [];
        var cvoCount = bytes.readShort();
        for (var i = 0; i < cvoCount; i++) {
            var cvo = new ArenaDailyCVO();
            cvo.rank = bytes.readShort();
            cvo.des = bytes.readUTF();
            cvo.gains = GainLossVO.parse(bytes.readUTF());
            ArenaDailyCVO.cvos.push(cvo);
        }
    };
    return ArenaDailyCVO;
}());
__reflect(ArenaDailyCVO.prototype, "ArenaDailyCVO");
//# sourceMappingURL=ArenaDailyCVO.js.map