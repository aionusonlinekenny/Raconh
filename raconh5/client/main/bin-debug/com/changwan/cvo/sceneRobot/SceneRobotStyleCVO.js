var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2018-1-18
 *description
*/
var SceneRobotStyleCVO = (function () {
    function SceneRobotStyleCVO() {
    }
    SceneRobotStyleCVO.parse = function (bytes) {
        SceneRobotStyleCVO._cvos = {};
        var baseCount = bytes.readShort();
        var cvo;
        for (var i = 0; i < baseCount; i++) {
            cvo = new SceneRobotStyleCVO();
            cvo.id = bytes.readShort();
            cvo.playerName = bytes.readUTF();
            cvo.title = bytes.readShort();
            cvo.career = bytes.readByte();
            cvo.clothes = bytes.readShort();
            cvo.weapon = bytes.readShort();
            cvo.wing = bytes.readShort();
            SceneRobotStyleCVO._cvos[cvo.id] = cvo;
        }
    };
    SceneRobotStyleCVO.getCVO = function (id) {
        return SceneRobotStyleCVO._cvos[id];
    };
    return SceneRobotStyleCVO;
}());
__reflect(SceneRobotStyleCVO.prototype, "SceneRobotStyleCVO");
//# sourceMappingURL=SceneRobotStyleCVO.js.map