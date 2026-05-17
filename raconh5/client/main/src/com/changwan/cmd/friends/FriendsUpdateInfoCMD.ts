/**
 * 好友信息更新协议
 * liangyan
 * create 2017-11-06
*/
class FriendsUpdateInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FRIENDS_UPDATE_INFO;
    }

    public receive(pi:TCPPacketIn):void
    {
        let count = pi.readShort();
        while(count > 0)
        {
            let id = pi.readInt64();
            let info = Manager.model.getFriends().getFriendsByID(id);
            if(info != null)
            {
                info.isOnline = pi.readByte() == 1;
                info.level = pi.readShort();
                info.lastOnlineTime = pi.readInt64();
                info.corpsName = pi.readUTF();
                info.vip = pi.readByte();
                Manager.model.getFriends().updateFriendsInfo(info, true);
            }
            count--;
        }
    }
}