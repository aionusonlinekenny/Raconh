/**
 * pzx 
 * 17.12.14
 * 改名消耗
 */
class RenameCVO
{

    public static itemlosse:string;
    public static goldlosse:string;

    public constructor()
    {}

    public static parse(bytes:egret.ByteArray):void
    {
        let pageCount:number = bytes.readByte();
        var tableCount:number = bytes.readShort();
        for (var i = 0; i < tableCount; i++)
        {
            this.itemlosse = bytes.readUTF();
            this.goldlosse = bytes.readUTF();
        }
    }

    
}