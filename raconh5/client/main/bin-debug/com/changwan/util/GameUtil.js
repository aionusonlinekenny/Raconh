var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2017-11-2
 *description
*/
var GameUtil = (function () {
    function GameUtil() {
    }
    GameUtil.getSexByCareer = function (career) {
        return (career == 2) ? false : true;
    };
    GameUtil.sortDistance = function (e1, e2) {
        if (e1.farToSelf < e2.farToSelf)
            return -1;
        else if (e1.farToSelf > e2.farToSelf)
            return 1;
        else
            return 0;
    };
    GameUtil.sortDistance2 = function (e1, e2) {
        if (e1.cvo.firstPosition < e2.cvo.firstPosition)
            return -1;
        else if (e1.cvo.firstPosition > e2.cvo.firstPosition)
            return 1;
        else {
            if (e1.farToSelf < e2.farToSelf)
                return -1;
            else if (e1.farToSelf > e2.farToSelf)
                return 1;
            else
                return 0;
        }
    };
    /**
     * 在地图上pos点附近随机寻找一个可行走的点
     * @param mapID 原始点地图ID
     * @param pos 原始点
     * @param dis 离pos点距离
     * @param disAdd 在dis的基础上多加【0~disAdd】的距离
     * @param tryCount 尝试次数，如果超过这个次数还是不可走，直接返回pos
     */
    GameUtil.getNearCanWalkRandomPos = function (posX, posY, dis, disAdd, tryCount) {
        if (dis === void 0) { dis = 100; }
        if (disAdd === void 0) { disAdd = 0; }
        if (tryCount === void 0) { tryCount = 5; }
        var count = tryCount;
        var pp;
        while (count) {
            pp = this.randomPos(posX, posY, dis, disAdd);
            if (Manager.model.getMap().isWalkPoint(pp.x, pp.y))
                return pp;
            count--;
        }
        return new egret.Point(posX, posY);
    };
    GameUtil.randomPos = function (posX, posY, dis, disAdd) {
        if (dis === void 0) { dis = 100; }
        if (disAdd === void 0) { disAdd = 0; }
        var vd = new Vector2D(1, 0);
        vd.angle = (Math.random() * 360) * Math.PI / 180;
        vd.length = dis + Math.random() * disAdd;
        return new egret.Point(posX + vd.x, posY + vd.y);
    };
    /**
     * 将详细角度转换为八方向角度
     */
    GameUtil.getRotationDirectionByRotation = function (ro) {
        while (ro < 0) {
            ro += 360;
        }
        ro = ro % 360;
        var dir = Direction.getDirByAngle(ro);
        return Direction.getAngleByDir(dir);
    };
    /**
     * 取缩略数字串（>=10000显万，>=100000000显亿，保留一位小数）
     */
    GameUtil.getNumShortStr = function (num) {
        if (num >= 100000000)
            return Math.floor(num / 10000000) / 10 + "亿"; //(num/100000000).toFixed(1) + "亿";
        if (num >= 10000)
            return Math.floor(num / 1000) / 10 + "万"; //(num/10000).toFixed(1) + "万";
        return num + "";
    };
    /**
     * 取缩略数字串（>=10000显万，>=100000000显亿，保留一位小数）
     */
    GameUtil.getWeekDayStr = function (weekDay) {
        //     49	周日 50	周一 51	周二 52	周三 53	周四 54	周五 55	周六
        return LangCVO.getContent("common" + (49 + weekDay));
    };
    GameUtil.getDis = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow((y2 - y1), 2) + Math.pow((x2 - x1), 2));
    };
    return GameUtil;
}());
__reflect(GameUtil.prototype, "GameUtil");
//# sourceMappingURL=GameUtil.js.map