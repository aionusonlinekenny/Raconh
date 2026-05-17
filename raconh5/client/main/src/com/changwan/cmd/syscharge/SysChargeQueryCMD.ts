/**
 * pzx 
 * 17.12.16
 * 充值查询
 *  */
class SysChargeQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_SYSCHARGE_QUERY;
    }

    public receive(ip:TCPPacketIn):void
    {
        let ln:number = ip.readShort();
        let arr:Array<number>=[];
        for(let i:number=0;i<ln;i++)
        {
            let n:number = ip.readByte();
            arr.push(n);
        }
        Manager.model.getSysCharge().returnQuery(arr);
    }
}