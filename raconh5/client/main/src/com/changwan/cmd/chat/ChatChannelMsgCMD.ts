/**
 * 频道聊天消息
 * liangyan
 * create 2017-11-14
*/
class ChatChannelMsgCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CHAT_CHANNEL_MSG;
    }

    public channel:number;
    public content:string;
    protected processOut(pkg:TCPPacketOut):void
    {
        //频道
        //聊天内容
        pkg.writeByte(this.channel);
        pkg.writeUTF(this.content);
    }

    public receive(pi:TCPPacketIn):void
    {
        // 频道
        // 角色ID
        // 发送者名称
        // 玩家类型 (0:普通玩家 1:GM 2:指导员)
        // VIP等级
        // 聊天内容
        // 头像id
        // 等级
        // 平台数据
        // 数据类型
        // 数据数值
        let type = pi.readByte();
        let info = new ChatInfo();
        info.fromID = pi.readInt64();
        info.fromName = pi.readUTF();
        info.career = pi.readByte();
        info.type = pi.readByte();
        info.type = type;
        info.vipLvl = pi.readByte();
        info.htmlText = pi.readUTF();
        info.headID = pi.readByte();
        info.level = pi.readShort();

        let arr:Array<Object> = [];
        let child:any;
        let len = pi.readShort();
        for(let i = 0; i < len; i++)
        {
            child = {};
            child.platType = pi.readByte();
            child.platData = pi.readInt();
            arr.push(child);
        }
        info.platDatas = arr;
        info.parseInfo();

        let friend = Manager.model.getFriends().getFriendsByID(info.fromID);
        if(friend && friend.type == FriendsType.BLACK) return;
        Manager.model.getChat().pushInfo(info, type);
    }
}