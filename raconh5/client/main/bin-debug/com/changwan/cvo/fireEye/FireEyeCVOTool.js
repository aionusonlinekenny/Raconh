var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * liangyan
 * create 2018-03-27
*/
var FireEyeCVOTool = (function () {
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
__reflect(FireEyeCVOTool.prototype, "FireEyeCVOTool");
//# sourceMappingURL=FireEyeCVOTool.js.map