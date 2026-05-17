/**
 * 盟会战列表玩家信息
 * luzhihong
 * create 2018.2.1
 */
class ClubBFPlayerInfo 
{
    public isDef:boolean;//是否为防守方
    public id:number;//角色id
    public name:string;//角色名
    public career:number;//职业
    public power:number;//战力
    public winCount:number;//连胜次数

    public tempID:number;//机器人模板id
    public isRobot:boolean;//是否为机器人

    public constructor(isDef:boolean)
    {
        this.isDef = isDef;
    }

    public parsePlayer(pi:TCPPacketIn)
    {
        this.id = pi.readInt64();
        this.name = pi.readUTF();
        this.career = pi.readByte();
        this.power = pi.readInt();
        this.winCount = pi.readShort();
    }

    public parseRobot(pi:TCPPacketIn)
    {
        this.id = pi.readInt();
        this.tempID = pi.readInt();
        this.power = pi.readInt();
        this.isRobot = true;
    }
}