// 请求创建角色
class RoleCreateCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.ROLE_CREATE;
    }

    /** 名字 */
    public name:string;
    /** 职业 */
    public career:number;
    /** 服务器id */
    public serverID:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeUTF(this.name);
        pkg.writeByte(this.career);
        pkg.writeInt(this.serverID);
    }

    public receive(pi:TCPPacketIn):void
    {
        let code:number = pi.readByte();//0-成功 1-失败 2-非法字符 3-名字空 4-性别错误 5-服务器id错误
        let roleID:number = pi.readInt64();
        switch(code)
        {
            case 0:
                Manager.control.getLogin().selectRoleLogin(roleID, "");
                Manager.view.hide(ViewID.CreateRoleView);
                break;
            case 1:
                FloatTips.addTips("common19", Color.RED);//创建失败
                break;
            case 2:
                FloatTips.addTips("common20", Color.RED);//非法字符
                break;
            case 3:
                FloatTips.addTips("common21", Color.RED);//名字为空
                break;
            case 4:
                FloatTips.addTips("common22", Color.RED);//性别错误
                break;
            case 5:
                FloatTips.addTips("common23", Color.RED);//服务器id错误
                break;
            default:
                FloatTips.addTips("common19", Color.RED);//创建失败
                break;
        }
    }
}