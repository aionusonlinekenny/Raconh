var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AnimationType = (function () {
    function AnimationType() {
    }
    AnimationType.EMPTY = 0;
    AnimationType.MONSTER = 1;
    AnimationType.PLAYER = 2;
    AnimationType.LAYER = 3;
    AnimationType.PLAYER_SHOW = 4;
    AnimationType.PET = 5;
    return AnimationType;
}());
__reflect(AnimationType.prototype, "AnimationType");
//# sourceMappingURL=AnimationType.js.map