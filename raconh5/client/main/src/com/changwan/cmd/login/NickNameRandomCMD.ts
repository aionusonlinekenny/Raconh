// 随机名字
class NickNameRandomCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.NICKNAME_RONDOM;
    }

    /**职业 */
    public career:number;
    /**服务器id */
    public serverID:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.career);
        pkg.writeInt(this.serverID);
    }

    public receive(pi:TCPPacketIn):void
    {
        //错误码:0-成功，-1-失败，-2名字用完了
        let code:number = pi.readByte();
        let name:string = pi.readUTF();
        switch(code)
        {
            case 0:
                Manager.model.getLogin().dispatchEvent(new LoginEvent(LoginEvent.RANDOM_NAME, name));
                break;
            case -1:
                alert("失败");
                FloatTips.addTips("失败");
                break;
            case -2:
                alert("名字用完了");
                break;
            default:
                break;
        }
    }
}