class PointUtil
{
    public static getAngle(x1:number,y1:number,x2:number,y2:number):number
    {
        return this.getRadian(x1,y1,x2,y2) / Math.PI * 180;
    }

    public static getRadian(x1:number,y1:number,x2:number,y2:number):number
    {
        return Math.atan2(y2 - y1, x2 - x1);
    }

    public static getNextPoint(p:egret.Point, angle:number, disance:number):egret.Point
	{
        return new egret.Point(p.x + Math.cos(angle) * disance, p.y + Math.sin(angle) * disance);
    }

    /** 判断p是否在p1和p2所组成的矩形中 */
    public static inRect(p1:egret.Point,p2:egret.Point,p:egret.Point):boolean
    {
        var disX:number = Math.abs(p1.x - p2.x);
        var disY:number = Math.abs(p1.y - p2.y);
        var disX1:number = Math.abs(p.x - p1.x);
        var disX2:number = Math.abs(p.x - p2.x);
        var disY1:number = Math.abs(p.y - p1.y);
        var disY2:number = Math.abs(p.y - p2.y);
        return (disX == disX1 + disX2) && (disY == disY1 + disY2);
    }

        /** 判断p是否在p1和p2所组成的矩形中 */
    public static inRect2(p1:egret.Point,p2:egret.Point,x:number,y:number):boolean
    {
        var disX:number = Math.abs(p1.x - p2.x);
        var disY:number = Math.abs(p1.y - p2.y);
        var disX1:number = Math.abs(x - p1.x);
        var disX2:number = Math.abs(x - p2.x);
        var disY1:number = Math.abs(y - p1.y);
        var disY2:number = Math.abs(y - p2.y);
        return (disX == disX1 + disX2) && (disY == disY1 + disY2);
    }

    public static getPoint(src:string[]):egret.Point
    {
        return new egret.Point(parseInt(src[0]), parseInt(src[1]));
    }

    public static getPoint2(src:string,splitStr:string=","):egret.Point
    {
        let arr:string[] = src.split(splitStr);
        return new egret.Point(parseInt(arr[0]), parseInt(arr[1]));
    }

    public static getPoint3(src:string,splitStr1:string="|",splitStr2:string=","):egret.Point[]
    {
        let result:egret.Point[] = [];
        let arr:string[] = src.split(splitStr1);
        for(let i:number = 0; i < arr.length; i++)
        {
            result.push(this.getPoint2(arr[i]));
        }
        return result;
    }
}