/**
 *author Anydo
 *create 2018-1-18
 *description
*/
var SceneRobotNameCVO = /** @class */ (function () {
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
//# sourceMappingURL=SceneRobotNameCVO.js.map