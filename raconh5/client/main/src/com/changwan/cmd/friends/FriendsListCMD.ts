/**
 * 好友列表返回协议
 * liangyan
 * create 2017-11-06
*/
class FriendsListCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FRIENDS_LIST;
    }

    public receive(pi:TCPPacketIn):void
    {
        // 数组长度 8位
        // {
        //     唯一id
        //     服务器id
        //     总战力
        //     类型（1好友  2黑名单）
        //     玩家名字
        //     玩家等级
        //     是否在线（1是 0否）
        //     玩家性别（1男 0女）
        //     玩家上次离线时间戳
        //     帮会名字（预留，暂写死“假数据”）字符串
        //     玩家职业（预留，暂写死0）
        //     玩家vip等级（预留，暂写死0）
        // }
        Manager.model.getFriends().infos = [];
        let count = pi.readShort();
        // if(count == 0)
        // {
        //     Manager.model.getFriends().dispatchEvent(new FriendsEvent(FriendsEvent.CLEAR_LIST));
        //     return;
        // }
        /**好友 */
        let friend:FriendsPlayerInfo;
        while(count > 0)
        {
            friend = new FriendsPlayerInfo();
            friend.type = FriendsType.FRIEND;
            friend.id = pi.readInt64();
            friend.parse(pi);
            Manager.model.getFriends().addFriends(friend, false);
            count--;
        }

        count = pi.readShort();
        /**黑名单 */
        let black:FriendsPlayerInfo;
        while(count > 0)
        {
            black = new FriendsPlayerInfo();
            black.type = FriendsType.BLACK;
            black.id = pi.readInt64();
            black.parse(pi);
            Manager.model.getFriends().addFriends(black, false);
            count--;
        }
    }
}