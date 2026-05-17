// 请求角色列表
class RoleListRequestCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.ROLE_LIST_REQUEST;
    }

    public serverID:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt(this.serverID);
    }
    
    public receive(pi:TCPPacketIn):void
    {
        let length = pi.readShort();
        if(length > 0)
        {
            let info:RoleInfo;
            let list:RoleInfo[] = [];
            for(let i = 0; i < length; i++)
            {
                info = new RoleInfo();
                info.id = pi.readInt64();
                let nickName:string = pi.readUTF();
                let career:number = pi.readByte();
                let level:number = pi.readInt();
                list.push(info);
            }
            Manager.model.getLogin().roleInfos = list;
            Manager.control.getLogin().selectRoleLogin(info.id, "");
        }
        else
        {
            Manager.view.show(ViewID.CreateRoleView);
        }
        Manager.view.hide(ViewID.LoginView);
    }
}