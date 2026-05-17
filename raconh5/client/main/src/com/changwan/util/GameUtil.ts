/**
 *author Anydo
 *create 2017-11-2
 *description 
*/
class GameUtil
{
    public static getSexByCareer(career:number):boolean
    {
        return (career == 2) ? false : true;
    }

    public static sortDistance(e1:GameObjectInfo, e2:GameObjectInfo):number
    {
        if(e1.farToSelf < e2.farToSelf) return -1;
        else if(e1.farToSelf > e2.farToSelf) return 1;
        else return 0;
    }

    public static sortDistance2(e1:GameObjectInfo, e2:GameObjectInfo):number
    {
        if((e1 as MonsterGameObjectInfo).cvo.firstPosition < (e2 as MonsterGameObjectInfo).cvo.firstPosition) return -1;
        else if((e1 as MonsterGameObjectInfo).cvo.firstPosition > (e2 as MonsterGameObjectInfo).cvo.firstPosition) return 1;
        else
        {
            if(e1.farToSelf < e2.farToSelf) return -1;
            else if(e1.farToSelf > e2.farToSelf) return 1;
            else return 0;
        }
    }

    /**
     * 在地图上pos点附近随机寻找一个可行走的点
     * @param mapID 原始点地图ID
     * @param pos 原始点
     * @param dis 离pos点距离
     * @param disAdd 在dis的基础上多加【0~disAdd】的距离
     * @param tryCount 尝试次数，如果超过这个次数还是不可走，直接返回pos
     */		
    public static getNearCanWalkRandomPos(posX:number, posY:number, dis:number = 100, disAdd:number = 0, tryCount:number = 5):egret.Point
    {
        var count:number = tryCount;
        var pp:egret.Point;
        while(count)
        {
            pp = this.randomPos(posX, posY, dis, disAdd);
            if(Manager.model.getMap().isWalkPoint(pp.x, pp.y)) return pp;
            count--;
        }
        return new egret.Point(posX, posY);
    }
    
    public static randomPos(posX:number, posY:number, dis:number = 100, disAdd:number = 0):egret.Point
    {
        var vd:Vector2D = new Vector2D(1,0);
        vd.angle = (Math.random() * 360) * Math.PI / 180;
        vd.length = dis + Math.random() * disAdd;
        return new egret.Point(posX + vd.x, posY + vd.y);
    }
    
    /**
     * 将详细角度转换为八方向角度
     */		
    public static getRotationDirectionByRotation(ro:number):number
    {
        while(ro < 0){ro += 360;}
        ro = ro % 360;
        var dir:string = Direction.getDirByAngle(ro);
        return Direction.getAngleByDir(dir);
    }
    
    /**
     * 取缩略数字串（>=10000显万，>=100000000显亿，保留一位小数）
     */	
    public static getNumShortStr(num:number):string
    {
        if(num >= 100000000) return Math.floor(num/10000000)/10 + "亿";//(num/100000000).toFixed(1) + "亿";
        if(num >= 10000) return Math.floor(num/1000)/10 + "万";//(num/10000).toFixed(1) + "万";
        return num+"";
    }
    
    /**
     * 取缩略数字串（>=10000显万，>=100000000显亿，保留一位小数）
     */	
    public static getWeekDayStr(weekDay:number):string
    {
//     49	周日 50	周一 51	周二 52	周三 53	周四 54	周五 55	周六
        return LangCVO.getContent("common"+(49+weekDay));
    }

    public static getDis(x1:number,y1:number,x2:number,y2:number):number
    {
        return Math.sqrt(Math.pow((y2-y1), 2) + Math.pow((x2-x1), 2));
    }
}