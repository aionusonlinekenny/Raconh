var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 魔神降临配置表
 * liangyan
 * create 2018-04-19
*/
var DevilConfigCVO = (function () {
    function DevilConfigCVO() {
    }
    DevilConfigCVO.parse = function (bytes) {
        DevilConfigCVO._cvos = {};
        var tableCount = bytes.readByte();
        var baseCount = bytes.readShort();
        var cvo;
        for (var i = 0; i < baseCount; i++) {
            cvo = new DevilConfigCVO();
            cvo.parseOne(bytes);
            DevilConfigCVO._cvos[cvo.id] = cvo;
        }
    };
    DevilConfigCVO.prototype.parseOne = function (data) {
        this.id = data.readShort();
        this.value = data.readUTF();
    };
    DevilConfigCVO.getCVO = function (id) {
        return DevilConfigCVO._cvos[id];
    };
    /**1V1对手起始点 */
    DevilConfigCVO.ID_ENEMY_BIRTH_POS = 11;
    /**1V1对手目标点 */
    DevilConfigCVO.ID_ENEMY_TARGET_POS = 12;
    /**1V1对手宠物起始点 */
    DevilConfigCVO.ID_ENEMY_PET_BIRTH_POS = 13;
    /**1V1对手宠物目标点 */
    DevilConfigCVO.ID_ENEMY_PET_TARGET_POS = 14;
    /**1V1地图id */
    DevilConfigCVO.ID_GRAB_MAP = 15;
    /**1V1自己目标点 */
    DevilConfigCVO.ID_SELF_TARGET_POS = 16;
    /**1V1自己宠物目标点 */
    DevilConfigCVO.ID_SELF_PET_TARGET_POS = 17;
    return DevilConfigCVO;
}());
__reflect(DevilConfigCVO.prototype, "DevilConfigCVO");
//# sourceMappingURL=DevilConfigCVO.js.map