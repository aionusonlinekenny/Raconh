// 游客/机器人登录请求
class GuestLoginRequestCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.GUEST_LOGIN_REQUEST;
    }

    /**登录方式: 0-游客，8-机器人 */
    public type:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.type);
    }
}