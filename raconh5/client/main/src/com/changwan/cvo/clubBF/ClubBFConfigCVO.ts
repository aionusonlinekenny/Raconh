/**
 * 盟会战配置
 * luzh
 * create 2018.1.30
 */
 class ClubBFConfigCVO
{
    private static atkDoorPos:egret.Point;
    private static atkDoorRadiu:number;
    private static defDoorPos:egret.Point;
    private static defDoorRadiu:number;

    public static isInDoorArea(isDef:boolean = false):boolean
    {
        let pos:egret.Point = isDef ? this.defDoorPos : this.atkDoorPos;
        let radiu:number = isDef ? this.defDoorRadiu : this.atkDoorRadiu;
        let selfPos:egret.Point = new egret.Point(Manager.model.self.x, Manager.model.self.y);
        let dis:number = egret.Point.distance(pos, selfPos);
        return egret.Point.distance(pos, selfPos) < radiu;
    }
    public static doorNearPos(isDef:boolean = false):egret.Point
    {
        let pos:egret.Point = isDef ? this.defDoorPos : this.atkDoorPos;
        let radiu:number = isDef ? this.defDoorRadiu : this.atkDoorRadiu;
        let v:Vector2D = new Vector2D(Math.random() * radiu * 0.8, 0);
        v.angle = Math.PI * 2 * Math.random();
        return new egret.Point(pos.x + v.x, pos.y + v.y);
    }




    /*解析表*/
    public static parseCVOs(bytes:egret.ByteArray):void
    {
        let tabCount:number = bytes.readByte();
        ClubBFRankRewardsCVO.parse(bytes);
        ClubBFScoreRewardsCVO.parse(bytes);
        ClubBFConfigCVO.parseOthers(bytes);
        ClubBFConfigCVO.parsePos(bytes);
        ClubBFConfigCVO.parseCost(bytes);
    }
    
    public static parseOthers(bytes:egret.ByteArray):void
    {
        let rowCount:number = bytes.readShort();
        for (let j = 0; j < rowCount; j++)
        {
            let id:number = bytes.readByte();
            let value:string = bytes.readUTF();

            if(id == 15) this.startTimeStr = value;
        }
    }

    /*解析表*/
    public static parsePos(bytes:egret.ByteArray):void
    {
        let rowCount:number = bytes.readShort();
        for (let j = 0; j < rowCount; j++)
        {
            let id:number = bytes.readByte();
            let x:number = bytes.readInt();
            let y:number = bytes.readInt();
            let radiu:number = bytes.readInt();

            if(id == 3) 
            {
                this.atkDoorPos = new egret.Point(x, y);
                this.atkDoorRadiu = radiu;
            }
            else if(id == 4) 
            {
                this.defDoorPos = new egret.Point(x, y);
                this.defDoorRadiu = radiu;
            }
        }
    }

    /*清除挑战cd消耗*/
    public static clear_cd_cost:GainLossVO;
    /*盟会buff加成消耗*/
    public static club_buff_cost:GainLossVO;
    /*解析表*/
    public static parseCost(bytes:egret.ByteArray):void
    {
        let rowCount:number = bytes.readShort();
        for (let j = 0; j < rowCount; j++)
        {
            let id:number = bytes.readByte();
            let vo:GainLossVO = new GainLossVO(bytes.readUTF());

            if(id == 1) this.clear_cd_cost = vo;
            else if(id == 2) this.club_buff_cost = vo;
        }
    }

    
    private static startTimeStr:string;//2&3|6&72000(开服第几天&周几|周几&当天开启时间,单位秒)
    public static get nextStartTime():Date
    {
        let arr:Array<string> = this.startTimeStr.split("&");
        let openDays:number = parseInt(arr[0]);
        let seconds:number = parseInt(arr[2]);

        let curDate:Date = new Date(Manager.model.getLogin().serverTimeInfo.serverTime);
        let svrOpenDate:Date = new Date(Manager.model.getLogin().serverTimeInfo.svrOpenTime * 1000);

        let startDate:Date = new Date(svrOpenDate.getFullYear(), svrOpenDate.getMonth(), svrOpenDate.getDate() + 1, 0, 0, seconds);//开服第2天20：30
        if(startDate.getTime() > curDate.getTime()) return startDate;

        let weekDays:Array<number> = ArrayUtil.parseStringToArray(arr[1], "|");
        startDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), 0, 0, seconds);
        let curWeekDay = curDate.getDay();
        for(let i:number=0; i<weekDays.length; i++)
        {
            if(curWeekDay < weekDays[i])
            {
                startDate.setDate(startDate.getDate() + weekDays[i] - curWeekDay);
                return startDate;
            }
            else if(curWeekDay == weekDays[i] && startDate.getTime() > curDate.getTime()) return startDate;
        }

        startDate.setDate(startDate.getDate() + weekDays[0] + 7 - curWeekDay);
        return startDate;
    }
}
