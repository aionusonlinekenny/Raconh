/**
 * 好友/黑名单删除
 * liangyan
 * create 2017-11-09
*/
class FriendsDeleteCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FRIENDS_DELETE;
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
        let type = pi.readByte();
        let id = pi.readInt64();
        Manager.model.getFriends().removeFriendsByID(id);
    }
}