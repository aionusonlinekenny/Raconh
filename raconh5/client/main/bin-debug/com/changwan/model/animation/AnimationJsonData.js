var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2018-3-13
 *description
*/
var AnimationJsonData = (function () {
    function AnimationJsonData() {
    }
    AnimationJsonData.prototype.reuse = function (frameName, offX, offY, rectObj) {
        this.frameName = frameName;
        this.offX = offX;
        this.offY = offY;
        this.rectObj = rectObj;
    };
    AnimationJsonData.prototype.unuse = function () {
        this.offX = 0;
        this.offY = 0;
        this.frameName = "";
        this.rectObj = null;
    };
    AnimationJsonData.prototype.dispose = function () {
        this.rectObj = null;
    };
    return AnimationJsonData;
}());
__reflect(AnimationJsonData.prototype, "AnimationJsonData");
//# sourceMappingURL=AnimationJsonData.js.map