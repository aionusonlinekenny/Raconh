var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2018-3-1
 *description
*/
var AnimationFrameData = (function () {
    function AnimationFrameData() {
    }
    AnimationFrameData.prototype.reuse = function (offX, offY, texture) {
        this.offX = offX;
        this.offY = offY;
        this.texture = texture;
    };
    AnimationFrameData.prototype.unuse = function () {
        this.offX = 0;
        this.offY = 0;
        Manager.pool.push(this.texture);
        this.texture = null;
    };
    AnimationFrameData.prototype.dispose = function () {
        Manager.pool.push(this.texture);
        this.texture = null;
    };
    return AnimationFrameData;
}());
__reflect(AnimationFrameData.prototype, "AnimationFrameData");
//# sourceMappingURL=AnimationFrameData.js.map