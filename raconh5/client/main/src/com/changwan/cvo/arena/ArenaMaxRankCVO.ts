/**
 *author Anydo
 *create 2018-1-3
 *description 
*/
class ArenaMaxRankCVO
{
    public id:number;
    public rankTarget:number;
    public rankStart:number;
    public gains:GainLossVO[];


    public static cvos:ArenaMaxRankCVO[];

    public static parse(bytes:egret.ByteArray):void
    {
        this.cvos = [];
        let cvoCount:number = bytes.readShort();
        for(let i:number = 0 ; i < cvoCount; i ++)
        {
            let cvo:ArenaMaxRankCVO = new ArenaMaxRankCVO();
            cvo.id = bytes.readByte();
            cvo.rankTarget = bytes.readShort();
            cvo.rankStart = bytes.readShort();
            cvo.gains = GainLossVO.parse(bytes.readUTF());
            this.cvos.push(cvo);
        }
        this.cvos.sort(this.sortFun);
    }

    private static sortFun(e1:ArenaMaxRankCVO, e2:ArenaMaxRankCVO):number
    {
        if(e1.rankTarget < e2.rankTarget) return 1;
        else if(e1.rankTarget > e2.rankTarget) return -1;
        return 0;
    }

    public static getCVO(id:number):ArenaMaxRankCVO
    {
        for(let i:number = 0; i < this.cvos.length; i++)
        {
            if(this.cvos[i].id == id) return this.cvos[i];
        }
        return null;
    }
}