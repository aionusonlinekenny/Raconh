/**
 *author Anydo
 *create 2018-1-3
 *description
*/
var ArenaDailyCVO = /** @class */ (function () {
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
//# sourceMappingURL=ArenaDailyCVO.js.map