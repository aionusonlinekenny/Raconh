// TypeScript file
class ChatMonitorLoginCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CHAT_MONITOR_LOGIN;
    }

    /**时间戳 */
    public time:number;
    /**账号 */
    public account:string;
    /**签名 */
    public sign:string;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt(this.time);
        pkg.writeUTF(this.account);
        pkg.writeUTF(this.sign);
    }
}