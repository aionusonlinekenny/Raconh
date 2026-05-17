/**
 * 换一批推荐好友
 * liangyan
 * create 2017-11-07
*/
class FriendsSuggestChangeCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FRIENDS_SUGGEST_CHANGE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let count = pi.readShort();
        // 唯一id
        // 玩家名字
        // 玩家等级
        // 玩家是否在线（1是 0否）
        // 帮会名字（预留，暂写死“假数据”）
        // 玩家职业（预留，暂写死0）
        // 玩家vip等级（预留，暂写死0）
        Manager.model.getFriends().searchInfos = [];
        let info:FriendsPlayerInfo;
        while(count > 0)
        {
            info = new FriendsPlayerInfo();
            info.id = pi.readInt64();
            info.nickName = pi.readUTF();
            info.level = pi.readShort();
            info.isOnline = pi.readByte() == 1;
            info.corpsName = pi.readUTF();
            info.career = pi.readByte();
            info.vip = pi.readByte();
            info.type = FriendsType.SEARCH;
            info.fightSum = pi.readInt();
            Manager.model.getFriends().addSearchInfo(info);
            count--;
        }
        Manager.model.getFriends().dispatchEvent(new FriendsEvent(FriendsEvent.CHANGE_SUGGEST));
    }
}