/**
 *author Anydo
 *create 2018-1-3
 *description 
*/
class ArenaOtherCVO
{
    public key:string;
    public value:string;


    private static _cvos:Object;

    public static parse(bytes:egret.ByteArray):void
    {
        ArenaOtherCVO._cvos = {};
        let cvoCount:number = bytes.readShort();
        for(let i:number = 0 ; i < cvoCount; i ++)
        {
            let cvo:ArenaOtherCVO = new ArenaOtherCVO();
            cvo.key = bytes.readUTF();
            cvo.value = bytes.readUTF();
            ArenaOtherCVO._cvos[cvo.key] = cvo;
        }
    }

    public static getCVO(key:string):ArenaOtherCVO
    {
        return ArenaOtherCVO._cvos[key];
    }
}