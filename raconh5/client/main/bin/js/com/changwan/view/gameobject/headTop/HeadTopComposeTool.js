/**
 * 头顶信息排版工具
 * liangyan
 * create 2017-11-17
*/
var HeadTopComposeTool = /** @class */ (function () {
    function HeadTopComposeTool() {
        this._x0 = 0;
        this._y0 = 0;
        this._height = 0;
        this._wight = 0;
    }
    Object.defineProperty(HeadTopComposeTool.prototype, "height", {
        get: function () { return this._height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeadTopComposeTool.prototype, "width", {
        get: function () { return this._wight; },
        enumerable: true,
        configurable: true
    });
    HeadTopComposeTool.prototype.reuse = function () {
        this._paddingH = 2;
        this._paddingV = 2;
        this._dic = new Dictionary();
        this._rowVector = [];
    };
    HeadTopComposeTool.prototype.unuse = function () {
        this.clear();
        this.clearFlag();
    };
    HeadTopComposeTool.prototype.clear = function () {
        var tmpList;
        for (var r in this._rowVector) {
            tmpList = this._dic[r];
            if (tmpList != null) {
                for (var i = tmpList.length - 1; i >= 0; i--) {
                    if (tmpList[i] != null) {
                        tmpList[i].dispose();
                    }
                }
                delete this._dic[r];
            }
        }
        this._rowVector.length = 0;
    };
    HeadTopComposeTool.prototype.removeImage = function (image) {
        if (image == null)
            return;
        for (var key in this._dic) {
            this.removeAtRow(image, Number(key));
        }
    };
    HeadTopComposeTool.prototype.removeAtRow = function (image, row) {
        if (image == null)
            return;
        if (this._dic[row] == null || this._dic[row] == undefined)
            return;
        var index = this.getIndexByObj(image, row);
        var tmpData;
        if (index != -1) {
            this._compsed = false;
            tmpData = (this._dic[row].splice(index, 1));
            if (tmpData && tmpData.length > 0) {
                tmpData.forEach(function (child, i) {
                    child.dispose();
                    child = null;
                });
            }
            if (this._dic[row].length == 0) {
                delete this._dic[row];
            }
        }
    };
    HeadTopComposeTool.prototype.getIndexByObj = function (obj, row) {
        var vec = this._dic[row];
        if (vec == null)
            return -1;
        for (var i = vec.length - 1; i >= 0; i--) {
            if (vec[i].obj == obj)
                return i;
        }
        return -1;
    };
    HeadTopComposeTool.prototype.addImage = function (image, row, index, offsetY, offsetX) {
        if (index === void 0) { index = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        if (offsetX === void 0) { offsetX = 0; }
        if (this._dic[row] == null)
            this._dic[row] = new Array();
        if (this.getIndexByObj(image, row) == -1) {
            this._dic[row].push(new ComposeData(image, index, offsetY, offsetX));
            this._compsed = false;
        }
        if (this._rowVector.indexOf(row) < 0) {
            this._rowVecChange = true;
            this._rowVector.push(row);
        }
    };
    HeadTopComposeTool.prototype.clearFlag = function () {
        this._compsed = false;
    };
    /**
     * 开始排版
     */
    HeadTopComposeTool.prototype.compose = function () {
        if (this._compsed || this._dic == null || this._rowVector == null)
            return;
        this._compsed = true;
        this._height = 0;
        this._wight = 0;
        if (this._rowVecChange) {
            this._rowVecChange = false;
            this._rowVector.sort(function (a, b) { return (a > b ? 1 : -1); });
        }
        var currY = this._y0;
        var tmpW;
        var tmpH;
        var isFirstRow = true;
        var tmpImageArr;
        var tmpRowHight;
        for (var r in this._rowVector) {
            tmpImageArr = this._dic[this._rowVector[r]];
            if (tmpImageArr == null || tmpImageArr.length == 0)
                continue;
            tmpRowHight = this.getRowHeight(tmpImageArr);
            tmpW = this.composeRow(tmpImageArr, currY, tmpRowHight);
            this._wight = tmpW > this._wight ? tmpW : this._wight;
            currY -= tmpRowHight + this._paddingV;
            if (!isFirstRow)
                this._height += this._paddingV;
            this._height += tmpRowHight;
        }
    };
    HeadTopComposeTool.prototype.getRowHeight = function (datas) {
        var rtn = 0;
        var data;
        for (var i = 0; i < datas.length; i++) {
            data = datas[i];
            if (data == null)
                continue;
            var tempH = this.getImageHeight(data.obj) + data.offsetY;
            if (tempH > rtn)
                rtn = tempH;
        }
        return rtn;
    };
    HeadTopComposeTool.prototype.getImageHeight = function (displayObject) {
        if (displayObject == null)
            return 0;
        if (displayObject instanceof BitmapRemote)
            return displayObject.getHeight();
        return displayObject.height;
    };
    HeadTopComposeTool.prototype.getImageWidth = function (displayObject) {
        if (displayObject == null)
            return 0;
        if (displayObject instanceof BitmapRemote)
            return displayObject.getWidth();
        return displayObject.width;
    };
    HeadTopComposeTool.prototype.composeRow = function (datas, y, h) {
        datas.sort(function (a, b) { return (a.index < b.index ? -1 : 1); });
        var w = 0;
        var len = datas.length;
        for (var i = 0; i < len; i++) {
            if (datas[i] == null)
                continue;
            if (i != 0)
                w += this._paddingH;
            w += this.getImageWidth(datas[i].obj);
        }
        var currX = this._x0 - w * 0.5;
        var image;
        for (var j = 0; j < len; j++) {
            if (datas[j] == null)
                continue;
            image = datas[j].obj;
            image.x = currX + datas[j].offsetX;
            currX += this._paddingH + this.getImageWidth(image);
            image.y = y - h + ((h - this.getImageHeight(image)) / 2);
            if (image instanceof BitmapRes) {
                if (image.getName() == "chat_vip_png")
                    image.y -= 2;
            }
        }
        return w;
    };
    HeadTopComposeTool.prototype.dispose = function () {
        this.clear();
        this._dic = null;
        this._rowVector = null;
    };
    return HeadTopComposeTool;
}());
var ComposeData = /** @class */ (function () {
    function ComposeData(obj, index, offsetY, offsetX) {
        if (offsetY === void 0) { offsetY = 0; }
        if (offsetX === void 0) { offsetX = 0; }
        this.obj = obj;
        this.index = index;
        this.offsetY = offsetY;
        this.offsetX = offsetX;
    }
    ComposeData.prototype.dispose = function () {
        ObjectUtil.remove(this.obj);
        this.obj = null;
    };
    return ComposeData;
}());
//# sourceMappingURL=HeadTopComposeTool.js.map