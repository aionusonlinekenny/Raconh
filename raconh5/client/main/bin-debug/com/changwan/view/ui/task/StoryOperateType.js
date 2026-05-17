var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 剧情操作类型
 * liangyan
 * create 2018-03-14
*/
var StoryOperateType = (function () {
    function StoryOperateType() {
    }
    /**寻路 */
    StoryOperateType.FIND_PATH = 1;
    /**杀怪 */
    StoryOperateType.KILL_MON = 2;
    /**采集 */
    StoryOperateType.COLLECT = 3;
    /**播放场景特效 */
    StoryOperateType.PLAY_EFFECT = 4;
    return StoryOperateType;
}());
__reflect(StoryOperateType.prototype, "StoryOperateType");
//# sourceMappingURL=StoryOperateType.js.map