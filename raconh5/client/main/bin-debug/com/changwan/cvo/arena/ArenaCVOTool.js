var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2017-12-28
 *description
*/
var ArenaCVOTool = (function () {
    function ArenaCVOTool() {
    }
    ArenaCVOTool.parse = function (bytes) {
        var tableCount = bytes.readByte();
        for (var i = 0; i < tableCount; i++) {
            if (i == 0)
                ArenaRobotCVO.parse(bytes);
            else if (i == 1)
                ArenaDailyCVO.parse(bytes);
            else if (i == 2)
                ArenaMaxRankCVO.parse(bytes);
            else if (i == 3)
                ArenaVipCountCVO.parse(bytes);
            else if (i == 4)
                ArenaOtherCVO.parse(bytes);
            else if (i == 5)
                ArenaBattleCVO.parse(bytes);
        }
    };
    return ArenaCVOTool;
}());
__reflect(ArenaCVOTool.prototype, "ArenaCVOTool");
//# sourceMappingURL=ArenaCVOTool.js.map