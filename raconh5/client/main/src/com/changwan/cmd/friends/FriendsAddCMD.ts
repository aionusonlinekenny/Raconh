/**
 * 好友/黑名单添加
 * liangyan
 * create 2017-11-06
*/
class FriendsAddCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FRIENDS_ADD;
    }

    public id:number;
    public friendsType:number;
    public name:string;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt64(this.id);
        pkg.writeByte(this.friendsType);
        pkg.writeUTF(this.name);
    }

    public receive(pi:TCPPacketIn):void
    {
        let id = pi.readInt64();
        
        let info = Manager.model.getFriends().getFriendsByID(id);
        if(info == null)
        {
            info = new FriendsPlayerInfo();
            info.type = this.friendsType;
            info.id = id;
            info.parse(pi);
            Manager.model.getFriends().addFriends(info);
        }
        else
        {
            let oldType = info.type;
            info.type = this.friendsType;
            info.parse(pi);
            if(oldType != info.type)
            {
                Manager.model.getFriends().dispatchEvent(new FriendsEvent(FriendsEvent.CHANGE_PLAYER_TYPE));
                FloatTips.addTips("操作成功", Color.GREEN);
            }
        }
    }
}