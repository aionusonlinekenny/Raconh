/**
 *
 * liangyan
 * create 2018-03-27
*/
var FireEyeCVOTool = /** @class */ (function () {
    function FireEyeCVOTool() {
    }
    FireEyeCVOTool.parse = function (bytes) {
        var tableCount = bytes.readByte();
        for (var i = 0; i < tableCount; i++) {
            if (i == 0)
                FireEyeLevelCVO.parse(bytes);
            else if (i == 1)
                FireEyeItemCVO.parse(bytes);
            else if (i == 2)
                FireEyeConfigCVO.parse(bytes);
        }
    };
    return FireEyeCVOTool;
}());
//# sourceMappingURL=FireEyeCVOTool.js.map