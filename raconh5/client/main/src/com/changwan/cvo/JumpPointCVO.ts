/**
 *author Anydo
 *create 2017-12-6
 *description 
*/
class JumpPointCVO
{
    public static idDic:Object = {};
    public static mapDic:Object = {};

    public id:number;
    public mapResID:number;//对应地图资源ID
    public posX:number;
    public posY:number;
	public targets:egret.Point[];
    public actionType:number;//1跳跃 2疾跑
    public triggerRadius:number;//触发半径，像素
	public resID:number;//资源ID
    public script:string;//前端脚本
    public scriptType:number;//前端脚本类型
    public name:string;

    public get hasShow():boolean{ return (this.resID != 0); }

    public canTrigger(mapResID:number, xx:number, yy:number):boolean
    {
        if(mapResID != this.mapResID) return false;
        let xdiff:number = this.posX - xx;            // 计算两个点的横坐标之差
        let ydiff:number = this.posY - yy;            // 计算两个点的纵坐标之差
        let dis:number = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
        return (dis <= this.triggerRadius);
    }
    
    public parseOne(data:egret.ByteArray):void
    {
        this.id = data.readShort();
        this.mapResID = data.readShort();
        this.posX = data.readShort();
        this.posY = data.readShort();
        let targetStr:string = data.readUTF();
        this.parseTargets(targetStr);
        this.actionType = data.readByte();
        this.triggerRadius = data.readShort();
        this.resID = data.readShort();
        this.parseScript(data.readUTF());
        this.name = data.readUTF();
    }

    private parseTargets(str:string):void
    {
        this.targets = [];
        if(str == "") return;
        let arr:string[] = str.split("|");
        let brr:string[];
        for(let i:number = 0; i < arr.length; i++)
        {
            brr = arr[i].split(",");
            this.targets.push(new egret.Point(parseInt(brr[0]), parseInt(brr[1])));
        }
    }

    private parseScript(str:string):void
    {
        this.script = "";
        this.scriptType = 0;
        if(cw.StringUtil.isEmptyStr(str)) return;
        let arr = str.split("#");
        if(!arr || arr.length <= 0) return;
        this.scriptType = Number(arr[0]);
        switch(this.scriptType)
        {
            case RookieConst.SLIDE:
            case RookieConst.KITE:
            case RookieConst.WATER:
                this.script = arr[1];
                break;
            default:
                break;
        }
    }

    public static getCVOsByMapID(mapID:number):JumpPointCVO[]
    {
        return this.mapDic[mapID];
    }

    public static getCVO(id:number):JumpPointCVO
    {
        return this.idDic[id];
    }
}