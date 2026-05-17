/**
 * 好友搜索协议
 * liangyan
 * create 2017-11-06
*/
class FriendsSearchCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FRIENDS_SEARCH;
    }

    public name:string;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeUTF(this.name);
        pkg.writeInt(Manager.model.getLogin().serverId);
    }

    public receive(pi:TCPPacketIn):void
    {
        let id = pi.readInt64();
        if(id > 0)
        {
            // 唯一id
            // 玩家名字
            // 玩家等级
            // 玩家是否在线（1是 0否）
            // 帮会名字（预留，暂写死“假数据”）
            // 玩家职业（预留，暂写死0）
            // 玩家vip等级（预留，暂写死0）
            let info = new FriendsPlayerInfo();
            info.id = id;
            info.nickName = pi.readUTF();
            info.level = pi.readShort();
            info.isOnline = pi.readByte() == 1;
            info.corpsName = pi.readUTF();
            info.career = pi.readByte();
            info.vip = pi.readByte();
            info.fightSum = pi.readInt();
            info.type = FriendsType.SEARCH;

            let model = Manager.model.getFriends();
            model.searchInfos = [];
            model.addSearchInfo(info);
            model.dispatchEvent(new FriendsEvent(FriendsEvent.SEARCH_SUCC));
        }
        else FloatTips.addTips(LangCVO.getContent("friends2"), Color.RED);//该角色不在线，无法添加好友
    }
}