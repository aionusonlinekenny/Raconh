/**
 * 复活类型
 * liangyan
 * create 2017-12-06
*/
var ReviveType = /** @class */ (function () {
    function ReviveType() {
    }
    ReviveType.checkType = function (mapID, type) {
        if (mapID <= 0)
            return false;
        var map = MapCVO.getCVO(mapID);
        if (!map)
            return false;
        return (map.reliveType & type) == type;
    };
    ReviveType.FREE_CD = 1;
    ReviveType.FREE_ALERT = 2;
    ReviveType.PAY_ALERT = 4;
    return ReviveType;
}());
//# sourceMappingURL=ReviveType.js.map