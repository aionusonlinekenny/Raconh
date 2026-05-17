/**
 *author Anydo
 *create 2018-1-3
 *description 
*/
class ArenaDailyCVO
{
    public rank:number;
    public des:string;
    public gains:GainLossVO[];


    public static cvos:ArenaDailyCVO[];

    public static parse(bytes:egret.ByteArray):void
    {
        ArenaDailyCVO.cvos = [];
        let cvoCount:number = bytes.readShort();
        for(let i:number = 0 ; i < cvoCount; i ++)
        {
            let cvo:ArenaDailyCVO = new ArenaDailyCVO();
            cvo.rank = bytes.readShort();
            cvo.des = bytes.readUTF();
            cvo.gains = GainLossVO.parse(bytes.readUTF());
            ArenaDailyCVO.cvos.push(cvo);
        }
    }
}