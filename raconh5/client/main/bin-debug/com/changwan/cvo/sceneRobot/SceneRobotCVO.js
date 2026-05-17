var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2018-1-18
 *description
*/
var SceneRobotCVO = (function () {
    function SceneRobotCVO() {
    }
    SceneRobotCVO.parse = function (bytes) {
        SceneRobotCVO._cvos = {};
        var baseCount = bytes.readShort();
        var cvo;
        for (var i = 0; i < baseCount; i++) {
            cvo = new SceneRobotCVO();
            cvo.id = bytes.readShort();
            cvo.mapResID = bytes.readShort();
            cvo.posx = bytes.readShort();
            cvo.posy = bytes.readShort();
            cvo.posxMon = bytes.readShort();
            cvo.posyMon = bytes.readShort();
            cvo.monsterId = bytes.readShort();
            cvo.playerStyId = bytes.readShort();
            SceneRobotCVO._cvos[cvo.id] = cvo;
        }
    };
    SceneRobotCVO.getCVOsByMapID = function (mapResID) {
        var result = [];
        var cvo;
        for (var key in SceneRobotCVO._cvos) {
            cvo = SceneRobotCVO._cvos[key];
            if (cvo.mapResID == mapResID)
                result.push(cvo);
        }
        return result;
    };
    SceneRobotCVO.parseCVOs = function (bytes) {
        var tableCount = bytes.readByte();
        for (var i = 0; i < tableCount; i++) {
            if (i == 0)
                SceneRobotCVO.parse(bytes);
            else if (i == 1)
                SceneRobotStyleCVO.parse(bytes);
            else if (i == 2)
                SceneRobotNameCVO.parse(bytes);
        }
    };
    return SceneRobotCVO;
}());
__reflect(SceneRobotCVO.prototype, "SceneRobotCVO");
//# sourceMappingURL=SceneRobotCVO.js.map