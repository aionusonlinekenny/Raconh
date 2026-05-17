/**
 *author Anydo
 *create 2018-3-13
 *description
*/
var AnimationJsonData = /** @class */ (function () {
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
//# sourceMappingURL=AnimationJsonData.js.map