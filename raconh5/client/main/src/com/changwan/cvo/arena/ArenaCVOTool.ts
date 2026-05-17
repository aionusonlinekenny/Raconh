/**
 *author Anydo
 *create 2017-12-28
 *description 
*/
class ArenaCVOTool
{
    public static parse(bytes:egret.ByteArray):void
    {
        let tableCount:number = bytes.readByte();
        for(let i:number = 0 ; i < tableCount; i ++)
        {
            if(i == 0) ArenaRobotCVO.parse(bytes);
            else if(i == 1) ArenaDailyCVO.parse(bytes);
            else if(i == 2) ArenaMaxRankCVO.parse(bytes);
            else if(i == 3) ArenaVipCountCVO.parse(bytes);
            else if(i == 4) ArenaOtherCVO.parse(bytes);
            else if(i == 5) ArenaBattleCVO.parse(bytes);
        }
    }
}