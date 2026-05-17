var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FindPath = (function () {
    function FindPath() {
    }
    FindPath.prototype.isEmpty = function (row, col) {
        if (row < 0 || row >= this._data.length || col >= this._data[0].length || col < 0)
            return false;
        return this._data[row][col] == MapDataType.UN_WALK;
    };
    FindPath.prototype.init = function () {
        this._openList = [];
        this._mapStatus = [];
    };
    FindPath.prototype.getInfo = function (row, col) {
        return this._mapStatus[row][col];
    };
    /**
     * 当放入openlist中时就进行排序(二分法)
     */
    FindPath.prototype.sortOpenList = function (index) {
        var middle;
        var firstP;
        var middleP;
        var firstInfo;
        var middleInfo;
        while (index > 1) {
            middle = Math.floor(index * 0.5);
            firstP = this._openList[index - 1];
            middleP = this._openList[middle - 1];
            firstInfo = this.getInfo(firstP.y, firstP.x);
            middleInfo = this.getInfo(middleP.y, middleP.x);
            if (firstInfo.f < middleInfo.f) {
                //开放列表交换位置
                this._openList[index - 1] = middleP;
                this._openList[middle - 1] = firstP;
                middleInfo.openIndex = index - 1;
                firstInfo.openIndex = middle - 1;
                index = middle;
            }
            else {
                break;
            }
        }
    };
    FindPath.prototype.setSource = function (data) {
        this._data = data;
        this._rlen = data.length;
        this._clen = data[0].length;
    };
    FindPath.prototype.isOpen = function (row, col) {
        var t = this._mapStatus[row];
        if (t != null) {
            var info = t[col];
            return (info != null && info.openIndex != -1);
        }
        return false;
    };
    FindPath.prototype.isClose = function (row, col) {
        var t = this._mapStatus[row];
        if (t != null) {
            var info = t[col];
            return (info != null && info.openIndex == -1);
        }
        return false;
    };
    /**
     * 二叉树排序
     */
    FindPath.prototype.shiftOpenList = function () {
        if (this._openList.length == 1) {
            this._openList.length = 0;
            return;
        }
        this._openList[0] = this._openList.pop();
        this._mapStatus[this._openList[0].y][this._openList[0].x].openIndex = 0;
        var first = 1;
        var tFirst;
        var middle;
        while (true) {
            tFirst = first;
            middle = first * 2;
            if (middle <= this._openList.length) {
                if (this._mapStatus[this._openList[first - 1].y][this._openList[first - 1].x].f > this._mapStatus[this._openList[middle - 1].y][this._openList[middle - 1].x].f)
                    first = middle;
                if (middle + 1 <= this._openList.length && this._mapStatus[this._openList[first - 1].y][this._openList[first - 1].x].f > this._mapStatus[this._openList[middle].y][this._openList[middle].x].f)
                    first = middle + 1;
            }
            ;
            if (tFirst == first)
                break;
            var t = this._openList[tFirst - 1];
            this._openList[tFirst - 1] = this._openList[first - 1];
            this._openList[first - 1] = t;
            this._mapStatus[this._openList[tFirst - 1].y][this._openList[tFirst - 1].x].openIndex = tFirst - 1;
            this._mapStatus[this._openList[first - 1].y][this._openList[first - 1].x].openIndex = first - 1;
        }
    };
    FindPath.prototype.t = function (t) {
        for (var _i = 0, t_1 = t; _i < t_1.length; _i++) {
            var a = t_1[_i];
            a.x = Manager.config.gridWH * (a.x + 0.5);
            a.y = Manager.config.gridWH * (a.y + 0.5);
        }
    };
    FindPath.prototype.posToIndex = function (pos) {
        pos.x = Math.floor(pos.x / Manager.config.gridWH);
        pos.y = Math.floor(pos.y / Manager.config.gridWH);
        return pos;
    };
    FindPath.prototype.indexToPos = function (index) {
        index.x = (index.x + 0.5) * Manager.config.gridWH;
        index.y = (index.y + 0.5) * Manager.config.gridWH;
        return index;
    };
    /**
     * start:起点
     * end:终点
     * stopAtDispatch:至终点的距离
     * maxCount:路径点最大数量
     */
    FindPath.prototype.findpath = function (start, end, stopAtDispatch, maxCount) {
        if (stopAtDispatch === void 0) { stopAtDispatch = 0; }
        if (maxCount === void 0) { maxCount = 8000; }
        if (stopAtDispatch > 0) {
            if (egret.Point.distance(start, end) <= stopAtDispatch)
                return [start];
        }
        this._startPos = start.clone();
        this._endPos = end.clone();
        start = start.clone();
        end = end.clone();
        start = this.posToIndex(start);
        this.endIndex = this.posToIndex(end);
        if (this.isEmpty(this.endIndex.y, this.endIndex.x)) {
            this.endIndex = this.getAroundIndex();
            this._endPos = this.indexToPos(this.endIndex.clone());
        }
        this.init();
        var row;
        var col;
        var tg;
        var th;
        this._openList.push(start);
        this._mapStatus[start.y] = [];
        this._mapStatus[start.y][start.x] = new Info(null, 0, 0, 0, 0);
        this._checkCount = 1;
        var current;
        var minRow;
        var maxRow;
        var minCol;
        var maxCol;
        while (this._openList.length > 0 && !(this.isClose(this.endIndex.y, this.endIndex.x))) {
            current = this._openList[0];
            this._mapStatus[current.y][current.x].openIndex = -1;
            this.shiftOpenList();
            minRow = Math.max(0, current.y - 1);
            maxRow = Math.min(current.y + 1, this._rlen - 1);
            row = minRow;
            minCol = Math.max(0, current.x - 1);
            maxCol = Math.min(current.x + 1, this._clen - 1);
            row = minRow;
            while (row <= maxRow) {
                col = minCol;
                while (col <= maxCol) {
                    if (!((row == current.y) && (col == current.x)) && (row == current.y || col == current.x || !(this.isEmpty(row, current.x)) && (!this.isEmpty(current.y, col)))) {
                        if (!this.isEmpty(row, col)) {
                            if (!this.isClose(row, col)) {
                                tg = this._mapStatus[current.y][current.x].g + FindPath.G_COST;
                                if (this.isOpen(row, col)) {
                                    if (tg < this._mapStatus[row][col].g) {
                                        this._mapStatus[row][col].parent = current;
                                        this._mapStatus[row][col].f = (tg + this._mapStatus[row][col].h);
                                        this.sortOpenList((this._mapStatus[row][col].openIndex + 1));
                                    }
                                }
                                else {
                                    th = ((Math.abs((row - this.endIndex.y)) + Math.abs((col - this.endIndex.x))) * FindPath.H_COST);
                                    this._openList.push(new egret.Point(col, row));
                                    if (!this._mapStatus[row]) {
                                        this._mapStatus[row] = [];
                                    }
                                    ;
                                    this._mapStatus[row][col] = new Info(current, tg, th, tg + th, this._openList.length - 1);
                                    this.sortOpenList(this._openList.length);
                                }
                            }
                        }
                    }
                    col++;
                }
                row++;
            }
            this._checkCount++;
            if (this._checkCount > maxCount) {
                break;
            }
        }
        if (this.isClose(this.endIndex.y, this.endIndex.x)) {
            var result = [];
            var tp = void 0;
            tp = this.endIndex;
            while (!(tp.y == start.y) || !(tp.x == start.x)) {
                result.push(tp);
                tp = this._mapStatus[tp.y][tp.x].parent;
            }
            ;
            tp.x = start.x;
            tp.y = start.y;
            result.push(tp);
            result.reverse();
            result = this.optimizePath(result);
            for (var index = result.length - 1; index > 0; index--) {
                if (result[index] == result[index - 1])
                    result.splice(index, 1);
            }
            this.t(result);
            result[0] = this._startPos;
            //如果停止距离大于0，那么最后一点和结束点的距离如果小于停止距离，就直接忽略结束点，否则添加结束点再切线
            return PathUtils.cutPathEnd(result, stopAtDispatch, this._endPos);
        }
        ;
        return null;
    };
    /**
     *递归找到非可行点的最近的可行点
    * @param i 目标点的前后i个网格范围
    * @return 最近的点
    *
    */
    FindPath.prototype.getAroundIndex = function (i) {
        if (i === void 0) { i = 1; }
        var startRow = Math.max(this.endIndex.y - i, 0);
        var endRow = Math.min(this.endIndex.y + i, this._rlen - 1);
        var startCol = Math.max(this.endIndex.x - i, 0);
        var endCol = Math.min(this.endIndex.x + i, this._clen - 1);
        var result;
        var j;
        for (j = startCol; j <= endCol; j++) {
            if (!this.isEmpty(startRow, j)) {
                return result = new egret.Point(j, startRow);
            }
        }
        for (j = startCol; j <= endCol; j++) {
            if (!this.isEmpty(endRow, j)) {
                return result = new egret.Point(j, endRow);
            }
        }
        for (j = startRow; j <= endRow; j++) {
            if (!this.isEmpty(j, startCol)) {
                return result = new egret.Point(startCol, j);
            }
        }
        for (j = startRow; j <= endRow; j++) {
            if (!this.isEmpty(j, endCol)) {
                return result = new egret.Point(endCol, j);
            }
        }
        if (result == null)
            return this.getAroundIndex(i + 1);
        return result;
    };
    /**
     *优化路径
    * @return
    *
    */
    FindPath.prototype.optimizePath = function (path) {
        if (path.length == 0) {
            return [];
        }
        var __len = path.length;
        var __path = [];
        var _diagonal = [];
        var __dLen;
        var __cross = true;
        var __currentNode = path[0];
        __path.push(path[0]);
        for (var i = 1; i < __len; i++) {
            _diagonal = Diagonal.find(__currentNode, path[i]);
            __dLen = _diagonal.length;
            __cross = true;
            for (var j = 0; j < __dLen; j++) {
                if (this._data[_diagonal[j].y][_diagonal[j].x] == MapDataType.UN_WALK) {
                    __cross = false;
                    break;
                }
            }
            if (!__cross) {
                if (i > 1) {
                    __currentNode = path[(i - 1)];
                    __path.push(path[(i - 1)]);
                }
            }
        }
        __path.push(path[(__len - 1)]);
        path = __path;
        return path;
    };
    FindPath.MAX_COUNT = 50000;
    FindPath.G_COST = 10;
    FindPath.H_COST = 10;
    return FindPath;
}());
__reflect(FindPath.prototype, "FindPath");
var Info = (function () {
    function Info(parent, g, h, f, openIndex) {
        this.parent = parent;
        this.g = g;
        this.h = h;
        this.f = f;
        this.openIndex = openIndex;
    }
    return Info;
}());
__reflect(Info.prototype, "Info");
//# sourceMappingURL=FindPath.js.map