/**
 * 聊天私聊信息
 * liangyan
 * create 2017-11-14
*/
class ChatPrivateMsgCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CHAT_PRIVATE_MSG;
    }

    public id:number;
    public name:string;
    public msg:string;
    public isAuto:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt64(this.id);;
        pkg.writeUTF(this.name);
        pkg.writeUTF(this.msg);
        pkg.writeByte(this.isAuto);
    }

    public receive(pi:TCPPacketIn):void
    {
        let info = new FriendsChatInfo();
        info.targetID = pi.readInt64();
        info.targetName = pi.readUTF();
        info.targetCareer = pi.readByte();
        info.targetVip = pi.readByte();
        info.fromID = pi.readInt64();
        info.fromName = pi.readUTF();
        info.fromCareer = pi.readByte();
        info.type = pi.readByte();
        info.fromVip = pi.readByte();
        info.content = pi.readUTF();
        info.zhuansheng = pi.readByte();
        info.level = pi.readShort();
        info.headID = pi.readByte();
        info.corpsName = pi.readUTF();
        info.isAuto = pi.readByte() == 1;

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
        info.time = Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        Manager.model.getFriends().pushChatData(info, info.isSelf ? info.targetID : info.fromID);
    }
}