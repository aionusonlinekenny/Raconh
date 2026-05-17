class IndexUtil
{
    /**
     * 通过任意一点坐标找到小格子的索引值. 
     * @params x  X坐标点
     * @params y  Y坐标点
     */	
    public static getIndexByXY(x:number, y:number):egret.Point
    {
        return new egret.Point(Math.ceil(y / Manager.config.gridWH), Math.ceil(x / Manager.config.gridWH));
    }
    /**
     * 通过任意一点坐标找到小格子的索引值. 
     * @params pos 指定的坐标点
     */
    public static getIndexByPos(pos:egret.Point):egret.Point
    {
        return this.getIndexByXY(pos.x, pos.y);
    }
    /**
     * 通过格子的索引值找到格子的中心坐标点.
     * @params row 表示的是格子所在行索引值
     * @params col 表示的是格子所在列索引值
     */	
    public static getCenterByIndex(row:number, col:number):egret.Point
    {
        return new egret.Point((col + 0.5) * Manager.config.gridWH, (row + 0.5) * Manager.config.gridWH);
    }
    /**
     * 通过任意一点的坐标找到小格子的中心坐标点.
     * @params x  任意X坐标点
     * @params y  任意Y坐标点
     */	
    public static getCenterByXY(x:number, y:number):egret.Point
    {
        var pos:egret.Point = this.getIndexByXY(x, y);
        return this.getCenterByIndex(pos.x, pos.y);
    }
    /**
     * 通过任意一点的坐标找到小格子的中心坐标点.
     */	
    public static getCenterByPoint(pos:egret.Point):egret.Point
    {
        return this.getCenterByXY(pos.x, pos.y);
    }
    /**
     * 通过任意一点坐标找到九宫格的索引值. 
     * @params x  X坐标点
     * @params y  Y坐标点
     */	
    public static getIndex9ByXY(x:number, y:number):egret.Point
    {
        return new egret.Point(Math.ceil(y / Manager.config.scale9H), Math.ceil(x / Manager.config.scale9W));
    }
    /**
     * 通过任意一点坐标找到九宫格的索引值. 
     * @params pos 指定的坐标点
     */	
    public static getIndex9ByPos(pos:egret.Point):egret.Point
    {
        return this.getIndex9ByXY(pos.x, pos.y);
    }
    /**
     * 根据宽度获得小格子的列数
     * @params width 总宽度
     */	
    public static getGroundCol(width:number):number
    {
        return width / Manager.config.gridWH;
    }
    /**
     * 根据高度获得小格子的列数
     * @params height 总高度
     */	
    public static getGroundRol(height:number):number
    {
        return height / Manager.config.gridWH;
    }
}