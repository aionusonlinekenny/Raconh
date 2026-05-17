/**
 *author Anydo
 *create 2018-1-3
 *description 
*/
class ArenaVipCountCVO
{
    public vipLevel:number;
    public canBuyCount:number;


    private static _cvos:ArenaVipCountCVO[];

    public static parse(bytes:egret.ByteArray):void
    {
        ArenaVipCountCVO._cvos = [];
        let cvoCount:number = bytes.readShort();
        for(let i:number = 0 ; i < cvoCount; i ++)
        {
            let cvo:ArenaVipCountCVO = new ArenaVipCountCVO();
            cvo.vipLevel = bytes.readByte();
            cvo.canBuyCount = bytes.readByte();
            ArenaVipCountCVO._cvos.push(cvo);
        }
        ArenaVipCountCVO._cvos.sort(this.sortFun);
    }

    private static sortFun(e1:ArenaVipCountCVO,e2:ArenaVipCountCVO):number
    {
        if(e1.vipLevel > e2.vipLevel) return 1;
        else if(e1.vipLevel < e2.vipLevel) return -1;
        return 0;
    }

    public static getCanBuyCount(vipLevel:number):number
    {
        let result:ArenaVipCountCVO;
        for(let i:number = 0; i < ArenaVipCountCVO._cvos.length; i++)
        {
            if(ArenaVipCountCVO._cvos[i].vipLevel <= vipLevel) result = ArenaVipCountCVO._cvos[i];
            else break;
        }
        return result ? result.canBuyCount : 0;
    }
}