/**
 * pzx 
 * 18.1.20
 * 充值活动查询
 *  */
class RechargeActivityQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_RECHARGEACTIVITY_QUERY;
    }
    public type:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.type);
    }

    public receive(ip:TCPPacketIn):void
    {
        let type:number = ip.readByte();//活动标识
        let time:number = ip.readInt();
        let ln:number = ip.readShort();
        let moneyArr:number[] = [];
        for(let i:number = 0;i<ln;i++)
        {
            let m:number = ip.readInt();
            moneyArr.push(m);
        }
        ln = ip.readShort();
        let any:any={};
        for(let i:number = 0;i<ln;i++)
        {
            let id:number = ip.readByte();//id
            let count:number =ip.readByte();//已领取次数
            any[id] = count;
        }
        Manager.model.getrechargeActivity().queryList(type,time,moneyArr,any);
    }
}