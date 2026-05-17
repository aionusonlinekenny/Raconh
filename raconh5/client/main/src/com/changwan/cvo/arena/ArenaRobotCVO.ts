/**
 *author Anydo
 *create 2018-1-3
 *description 
*/
class ArenaRobotCVO
{
    public rank:number;
    public nickname:string;
    public power:number;
    public career:number;
    public headID:number;
    public level:number;
    public hp:number;
    public clothes:number;
    public weapon:number;
    public wing:number;
    public petAni:number;


    private static _cvos:Object;

    public static parse(bytes:egret.ByteArray):void
    {
        ArenaRobotCVO._cvos = {};
        let cvoCount:number = bytes.readShort();
        for(let i:number = 0 ; i < cvoCount; i ++)
        {
            let cvo:ArenaRobotCVO = new ArenaRobotCVO();
            cvo.rank = bytes.readShort();
            cvo.nickname = bytes.readUTF();
            cvo.power = bytes.readInt();
            cvo.career = bytes.readByte();
            cvo.headID = bytes.readShort();
            cvo.level = bytes.readShort();
            cvo.hp = bytes.readInt();
            cvo.clothes = bytes.readInt();
            cvo.weapon = bytes.readInt();
            cvo.wing = bytes.readInt();
            cvo.petAni = bytes.readShort();
            ArenaRobotCVO._cvos[cvo.rank] = cvo;
        }
    }

    public static getCVOByRank(rank:number):ArenaRobotCVO
    {
        return ArenaRobotCVO._cvos[rank];
    }
}