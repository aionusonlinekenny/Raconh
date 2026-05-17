/**
 *author Anydo
 *create 2018-3-1
 *description
*/
var AnimationFrameData = /** @class */ (function () {
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
//# sourceMappingURL=AnimationFrameData.js.map