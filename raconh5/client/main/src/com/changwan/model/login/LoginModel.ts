class LoginModel extends egret.EventDispatcher
{
	//服务器ID
	public serverId:number;
	/** 服务器地址 */
	public serverIP:string;
	/** 服务器端口 */
	public serverPort:number;
	/** 服务器https端口 */
	public ssl_Port:number;
	/** 账号 */
	public clientName:string;
	/** 登陆时间戳 */
	public logintTime:number;
	/** 登陆加密串 */
	public loginBunch:string="";
	/** 渠道编号 */
	public channel:string;
    /** 登陆其他数据 */
    public loginOtherData:string="";

    /** 服务器时间信息 */
    public serverTimeInfo:ServerTimeInfo;

    /** 当前选中进行游戏的RoleInfo的ID */
    public curRoleInfoId:number;
    /** 账号包含的所有RoleInfo列表 */
    public roleInfos:RoleInfo[];
    /** 本次登录是否断线重连 */
    public isSocketReConnect:boolean;



    public constructor()
    {
        super();
        this.roleInfos = [];
        this.isSocketReConnect = false;
        this.serverTimeInfo = new ServerTimeInfo();
    }

    // public homeView:HomeView;
    public home:HomeView2;
    public showHomeView():void
    {
        if(this.home) return;
        this.home = new HomeView2();
    }

    public getRoleInfoByID(roleId:number):RoleInfo
    {
        let roleInfo:RoleInfo;
        for (let i:number = 0; i < this.roleInfos.length; i++)
        {
            roleInfo = this.roleInfos[i];
            if(roleInfo != null && roleInfo.id == roleId) return roleInfo;
        }
        return null;
    }

    /**
     * pi:后端数据
     * dataType:1--int32, 2--string, 3--int64
     */
    public updateRoleInfoPartAttr(pi:TCPPacketIn, dataType:number):void
    {
        let type:number;
        let value:any;
        let selfInfo:SelfGameObjectInfo = Manager.model.self;
        let len:number = pi.readShort();
        for(let j:number = 0; j < len; j++)
        {
            type = pi.readByte();
            if(dataType == 1)
                value = pi.readInt();
            else if(dataType == 2)
                value = pi.readUTF();
            else if(dataType == 3)
                value = pi.readInt64();

            if(selfInfo.attrInfo.getValue(type) != -1)
            {
                selfInfo.attrInfo.setValue(type, value);
            }
        }
    }
}