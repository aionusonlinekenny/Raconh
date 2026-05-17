var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * create 18.2.8
 * 寻宝type
 *  */
var ArtifactType = (function () {
    function ArtifactType() {
    }
    /** 寻宝1 次 消耗元宝*/
    ArtifactType.SENDS_ONE_TYPE = 1;
    /** 寻宝10 次 */
    ArtifactType.SENDS_TEN_TYPE = 2;
    /** 寻宝1 次 消耗物品 */
    ArtifactType.SENDS_ITEM_TYPE = 0;
    //=======================
    /** 首次额外奖励 */
    ArtifactType.is_First_type = 2;
    /** 积分 */
    ArtifactType.integral_type = 1;
    //=============10次寻宝参数---------------
    ArtifactType.FIRST_TYPE_ONE = 1;
    ArtifactType.FIRST_TYPE_FIRE = 5;
    return ArtifactType;
}());
__reflect(ArtifactType.prototype, "ArtifactType");
//# sourceMappingURL=ArtifactType.js.map