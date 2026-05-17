var PathUtils = /** @class */ (function () {
    function PathUtils() {
    }
    /**
     * 截掉路径最后一段距离
     * @param path
     * @param distance
     */
    PathUtils.cutPathEnd = function (paths, distance, target) {
        var path = paths.slice(0);
        var len = paths.length;
        if (distance > 0 && len >= 2) {
            if (egret.Point.distance(path[len - 2], target) > distance) {
                var angle = PointUtil.getRadian(path[len - 2].x, path[len - 2].y, path[len - 1].x, path[len - 1].y);
                var dx = Math.cos(angle) * distance;
                var dy = Math.sin(angle) * distance;
                var target = path[len - 1].clone();
                target.x -= dx;
                target.y -= dy;
                path[len - 1] = target;
            }
            else {
                path = path.slice(0, len - 1);
            }
        }
        return path;
    };
    PathUtils.updatePath = function (path, currentX, currentY, index) {
        path.splice(0, index);
        path.unshift(new egret.Point(currentX, currentY));
        return path;
    };
    PathUtils.processPath = function (path, distance) {
        if (path == null || path.length == 0)
            return path;
        path = path.concat();
        if (path.length == 2) {
            //如果路径是两个点（一条直线），则可以直接算出截取点，不必递归去算
            var startPos = path[0];
            var targetPos = path[1];
            if (egret.Point.distance(startPos, targetPos) <= distance)
                return [startPos];
            var pos = targetPos.subtract(startPos);
            var vd = new Vector2D(pos.x, pos.y);
            vd.length = egret.Point.distance(startPos, targetPos) - distance;
            if (vd.length < 1)
                return [startPos];
            var target2Pos = startPos.add(new egret.Point(vd.x, vd.y));
            return [startPos, target2Pos];
        }
        distance -= 2;
        if (distance < 3)
            return path;
        var targetP = (path[path.length - 1]).clone();
        for (var i = path.length - 1; i >= 1; i--) {
            if (targetP.subtract(path[i - 1]).length <= distance)
                path.pop();
        }
        if (path.length < 2)
            return path;
        var pIn = path[path.length - 1];
        if (distance - targetP.subtract(pIn).length < 2)
            return path;
        var pOut = path[path.length - 2];
        this._processPathCount = 0;
        path[path.length - 1] = findInterPoint(pIn.clone(), pOut.clone(), 2 * distance, targetP, distance);
        return path;
        function findInterPoint(pIn, pOut, step, p0, dis) {
            if (this._processPathCount++ > 30)
                return pIn;
            var vec = pOut.subtract(pIn);
            if (vec.length < 2)
                return pIn;
            vec.normalize(step);
            var tmpP = pIn.add(vec);
            var tmpLen = p0.subtract(tmpP).length;
            if (tmpLen > dis) {
                return findInterPoint(pIn, pOut, step / 2, p0, dis);
            }
            else {
                if (dis - tmpLen < 2 || step < 1)
                    return tmpP;
                else
                    return findInterPoint(tmpP, pOut, step, p0, dis);
            }
        }
    };
    return PathUtils;
}());
//# sourceMappingURL=PathUtils.js.map