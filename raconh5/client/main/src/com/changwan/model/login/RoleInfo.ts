class RoleInfo implements cw.IPool
{
	//服务器ID
	public serverID:number;
	//用户名称
	public userName:string;
	//玩家ID
	public id:number;

	public reuse(...args:any[]):void
	{
    }

    public unuse():void
    {
		this.serverID = 0;
		this.userName = "";
		this.id = 0;
    }

    public dispose():void
    {
    }
}