/**
 *liangyan
 *create 2017-11-02
*/
class FriendsPlayerInfo extends RoleInfo
{
    /**类型——FriendsType */
    public type:number;
    /**是否在线 */
    public isOnline:boolean;
    /**上次登录时间 */
    public lastOnlineTime:number;
    /**总战力 */
    public fightSum:number = 0;
    /**帮派名字 */
    public corpsName:string;
    /** 等级 */
    public level:number;
    /**vip等级 */
    public vip:number;
    /**被勾选 */
    public selected:boolean;
	//玩家名称
	public nickName:string;
	//玩家职业
	public career:number;

    public constructor()
    {
        super();
    }

    public parse(pi:TCPPacketIn):void
    {
        this.serverID = pi.readInt();
        this.fightSum = pi.readInt();
        // this.type = pi.readByte();
        this.nickName = pi.readUTF();
        this.level = pi.readShort();
        this.isOnline = pi.readByte() == 1;
        // let a = pi.readByte();//性别
        this.lastOnlineTime = pi.readInt64();
        this.corpsName = pi.readUTF();
        this.career = pi.readByte();
        this.vip = pi.readByte();
    }

    public get onlineStatus():string
    {
        if(this.isOnline) return "<font color='#38B800'>在线</font>";
		let offTime = Manager.model.getLogin().serverTimeInfo.serverTime / 1000 - this.lastOnlineTime;
		//离线显示规则，60分钟以内显示离线XX分钟，离线1-23小时则显示离线XX小时，离线1-7天则显示离线X天，7天以上显示离线7天以上
        let min = offTime / 60;
        if(min <= 60) return "<font color='#5A5B59'>离线" + Math.floor(min) + "分钟</font>";
        
        let hour = offTime / 3600;
        if(hour < 24) return "<font color='#5A5B59'>离线" + Math.floor(hour) + "小时</font>";
        
        let day = offTime / 86400;
		if(day <= 7) return "<font color='#5A5B59'>离线" + Math.floor(day) + "天</font>";
		
        return "<font color='#5A5B59'>离线7天以上</font>";
    }
}