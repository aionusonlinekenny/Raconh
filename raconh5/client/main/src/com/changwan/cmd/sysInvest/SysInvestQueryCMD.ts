/**
 * pzx 
 * 17.12.16
 * 投资查询
 *  */
class SysInvestQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_SYSINVEST_QUERY
    }
    public receive(ip:TCPPacketIn):void
    {

        Manager.model.getSysInvest().queryList(ip);
    }
}