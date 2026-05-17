var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2018-1-18
 *description
*/
var SceneRobotNameCVO = (function () {
    function SceneRobotNameCVO() {
    }
    SceneRobotNameCVO.parse = function (bytes) {
        SceneRobotNameCVO._cvos = [];
        var baseCount = bytes.readShort();
        var cvo;
        for (var i = 0; i < baseCount; i++) {
            cvo = new SceneRobotNameCVO();
            cvo.id = bytes.readShort();
            cvo.playerName = bytes.readUTF();
            SceneRobotNameCVO._cvos.push(cvo);
        }
    };
    SceneRobotNameCVO.getRandomName = function () {
        var index = Math.floor(Math.random() * SceneRobotNameCVO._cvos.length);
        return SceneRobotNameCVO._cvos[index].playerName;
    };
    return SceneRobotNameCVO;
}());
__reflect(SceneRobotNameCVO.prototype, "SceneRobotNameCVO");
//# sourceMappingURL=SceneRobotNameCVO.js.map