class PathUtils
{
    /**
     * 截掉路径最后一段距离
     * @param path
     * @param distance
     */
    public static cutPathEnd(paths:Array<egret.Point>, distance:number, target:egret.Point):Array<egret.Point>
	{
        var path: Array<egret.Point> = paths.slice(0);
        var len: number = paths.length;
        if (distance > 0 && len >= 2)
        {
            if (egret.Point.distance(path[len - 2], target) > distance)
            {
                var angle: number = PointUtil.getRadian(path[len - 2].x,path[len - 2].y, path[len - 1].x,path[len - 1].y);
                var dx: number = Math.cos(angle) * distance;
                var dy: number = Math.sin(angle) * distance;
                var target:egret.Point = (path[len - 1] as egret.Point).clone();
                target.x -= dx;
                target.y -= dy;
                path[len - 1] = target;
            }
            else {
                path = path.slice(0, len - 1);
            }
        }
        return path;
    }

    public static updatePath(path:Array<egret.Point>, currentX:number, currentY:number, index:number):Array<egret.Point>
    {
        path.splice(0, index);
        path.unshift(new egret.Point(currentX, currentY));
        return path;
    }

    private static _processPathCount:number;
    public static processPath(path:egret.Point[], distance:number):egret.Point[]
    {
        if(path == null || path.length == 0) return path;
        path = path.concat();
        if(path.length == 2)
        {
            //如果路径是两个点（一条直线），则可以直接算出截取点，不必递归去算
            let startPos:egret.Point = path[0];
		    let targetPos:egret.Point = path[1];
            if(egret.Point.distance(startPos, targetPos) <= distance) return [startPos];
            let pos:egret.Point = targetPos.subtract(startPos);
            let vd:Vector2D = new Vector2D(pos.x, pos.y);
            vd.length = egret.Point.distance(startPos, targetPos) - distance;
            if(vd.length < 1) return [startPos];
            let target2Pos:egret.Point = startPos.add(new egret.Point(vd.x, vd.y));
            return [startPos, target2Pos];
        }
        distance -= 2;
        if(distance < 3) return path;
        let targetP:egret.Point = (path[path.length - 1]).clone();
        for(let i:number = path.length - 1; i >= 1; i--)
        {
            if(targetP.subtract(path[i - 1]).length <= distance) path.pop();
        }
        
        if(path.length < 2) return path;
        let pIn:egret.Point = path[path.length - 1];
        if(distance - targetP.subtract(pIn).length < 2)return path;
        let pOut:egret.Point = path[path.length - 2];
        
        this._processPathCount = 0;
        path[path.length - 1] = findInterPoint(pIn.clone(),pOut.clone(),2 * distance,targetP,distance);
        return path;
        
        function findInterPoint(pIn:egret.Point, pOut:egret.Point, step:number, p0:egret.Point, dis:number):egret.Point
        {
            if(this._processPathCount ++ > 30)return pIn;
            let vec:egret.Point = pOut.subtract(pIn);
            if(vec.length < 2)return pIn;
            vec.normalize(step)
            let tmpP:egret.Point = pIn.add(vec);
            let tmpLen:number = p0.subtract(tmpP).length;
            if(tmpLen > dis)
            {
                return findInterPoint(pIn,pOut,step/2,p0,dis);
            }
            else
            {
                if(dis - tmpLen < 2 || step < 1)return tmpP;
                else return findInterPoint(tmpP,pOut,step,p0,dis);
            }
        }
    }
}