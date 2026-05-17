/**
 * 火眼金睛配置表
 * liangyan
 * create 2018-03-28
*/
var FireEyeConfigCVO = /** @class */ (function () {
    function FireEyeConfigCVO() {
    }
    FireEyeConfigCVO.parse = function (bytes) {
        FireEyeConfigCVO._cvos = {};
        var cvoCount = bytes.readShort();
        var cvo;
        for (var i = 0; i < cvoCount; i++) {
            cvo = new FireEyeConfigCVO();
            cvo.id = bytes.readByte();
            cvo.value = bytes.readShort();
            FireEyeConfigCVO._cvos[cvo.id] = cvo;
        }
    };
    FireEyeConfigCVO.getCVOByID = function (id) {
        return FireEyeConfigCVO._cvos[id];
    };
    /**每关结算倒计时 */
    FireEyeConfigCVO.ID_LEVEL_COUNTDOWN = 3;
    /**获得连胜奖励1的连胜数 */
    FireEyeConfigCVO.ID_WIN_TIMES = 4;
    /**画布宽 */
    FireEyeConfigCVO.ID_CANVAS_WIDTH = 5;
    /**画布高 */
    FireEyeConfigCVO.ID_CANVAS_HEIGHT = 6;
    /**连续错选次数上限 */
    FireEyeConfigCVO.ID_WRONG_TIMES = 7;
    /**错选限制时长（秒） */
    FireEyeConfigCVO.ID_BAN_HAND = 8;
    /**画布单屏高度（前端用） */
    FireEyeConfigCVO.ID_SEE_HEIGHT = 14;
    return FireEyeConfigCVO;
}());
//# sourceMappingURL=FireEyeConfigCVO.js.map