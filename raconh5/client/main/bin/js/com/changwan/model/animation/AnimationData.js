/**
 *author Anydo
 *create 2018-3-1
 *description
*/
var AnimationData = /** @class */ (function () {
    function AnimationData() {
    }
    AnimationData.prototype.reuse = function (jsonData, bitData) {
        this._frameJsons = [];
        this._frames = {};
        this._sourceBitData = bitData;
        this.parseJson(jsonData);
    };
    AnimationData.prototype.unuse = function () {
        for (var i = 0; i < this._frameJsons.length; i++) {
            Manager.pool.push(this._frameJsons[i]);
        }
        this._frameJsons = null;
        for (var frame in this._frames) {
            Manager.pool.push(this._frames[frame]);
            delete this._frames[frame];
        }
        this._frames = null;
        this.totalFrames = 0;
        if (this._sourceBitData)
            this._sourceBitData = null;
    };
    AnimationData.prototype.parseJson = function (jsonData) {
        var key;
        for (key in jsonData.mc)
            break;
        var offsetArr = jsonData.mc[key].frames;
        this.totalFrames = offsetArr.length;
        var frameName;
        var offX;
        var offY;
        var rectObj;
        var oneJson;
        for (var i = 0; i < offsetArr.length; i++) {
            frameName = offsetArr[i].res;
            offX = offsetArr[i].x;
            offY = offsetArr[i].y;
            rectObj = jsonData.res[frameName];
            oneJson = Manager.pool.create(AnimationJsonData, frameName, offX, offY, jsonData.res[frameName]);
            this._frameJsons.push(oneJson);
        }
    };
    AnimationData.prototype.getKeyFrameData = function (frame) {
        if (this._frames[frame] == null) {
            this.createFrameData(frame);
        }
        return this._frames[frame];
    };
    AnimationData.prototype.createFrameData = function (frame) {
        var frameJson = this._frameJsons[frame - 1];
        var rectObj = frameJson.rectObj;
        var texture = Manager.pool.create(egret.Texture);
        texture._bitmapData = this._sourceBitData;
        texture.$initData(rectObj.x, rectObj.y, rectObj.w, rectObj.h, 0, 0, rectObj.w, rectObj.h, this._sourceBitData.width, this._sourceBitData.height);
        var frameData = Manager.pool.create(AnimationFrameData, frameJson.offX, frameJson.offY, texture);
        this._frames[frame] = frameData;
    };
    AnimationData.prototype.dispose = function () {
        for (var frame in this._frames) {
            Manager.pool.push(this._frames[frame]);
            delete this._frames[frame];
        }
        this._frames = null;
        if (this._sourceBitData)
            this._sourceBitData = null;
    };
    return AnimationData;
}());
//# sourceMappingURL=AnimationData.js.map