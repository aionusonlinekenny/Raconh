var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var IndexUtil = (function () {
    function IndexUtil() {
    }
    /**
     * 通过任意一点坐标找到小格子的索引值.
     * @params x  X坐标点
     * @params y  Y坐标点
     */
    IndexUtil.getIndexByXY = function (x, y) {
        return new egret.Point(Math.ceil(y / Manager.config.gridWH), Math.ceil(x / Manager.config.gridWH));
    };
    /**
     * 通过任意一点坐标找到小格子的索引值.
     * @params pos 指定的坐标点
     */
    IndexUtil.getIndexByPos = function (pos) {
        return this.getIndexByXY(pos.x, pos.y);
    };
    /**
     * 通过格子的索引值找到格子的中心坐标点.
     * @params row 表示的是格子所在行索引值
     * @params col 表示的是格子所在列索引值
     */
    IndexUtil.getCenterByIndex = function (row, col) {
        return new egret.Point((col + 0.5) * Manager.config.gridWH, (row + 0.5) * Manager.config.gridWH);
    };
    /**
     * 通过任意一点的坐标找到小格子的中心坐标点.
     * @params x  任意X坐标点
     * @params y  任意Y坐标点
     */
    IndexUtil.getCenterByXY = function (x, y) {
        var pos = this.getIndexByXY(x, y);
        return this.getCenterByIndex(pos.x, pos.y);
    };
    /**
     * 通过任意一点的坐标找到小格子的中心坐标点.
     */
    IndexUtil.getCenterByPoint = function (pos) {
        return this.getCenterByXY(pos.x, pos.y);
    };
    /**
     * 通过任意一点坐标找到九宫格的索引值.
     * @params x  X坐标点
     * @params y  Y坐标点
     */
    IndexUtil.getIndex9ByXY = function (x, y) {
        return new egret.Point(Math.ceil(y / Manager.config.scale9H), Math.ceil(x / Manager.config.scale9W));
    };
    /**
     * 通过任意一点坐标找到九宫格的索引值.
     * @params pos 指定的坐标点
     */
    IndexUtil.getIndex9ByPos = function (pos) {
        return this.getIndex9ByXY(pos.x, pos.y);
    };
    /**
     * 根据宽度获得小格子的列数
     * @params width 总宽度
     */
    IndexUtil.getGroundCol = function (width) {
        return width / Manager.config.gridWH;
    };
    /**
     * 根据高度获得小格子的列数
     * @params height 总高度
     */
    IndexUtil.getGroundRol = function (height) {
        return height / Manager.config.gridWH;
    };
    return IndexUtil;
}());
__reflect(IndexUtil.prototype, "IndexUtil");
//# sourceMappingURL=IndexUtil.js.map