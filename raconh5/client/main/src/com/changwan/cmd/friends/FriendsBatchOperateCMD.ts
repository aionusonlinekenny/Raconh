/**
 * 好友批量删除协议
 * liangyan
 * create 2017-11-06
*/
class FriendsBatchOperateCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FRIENDS_BATCH_OPERATE;
    }

    /**操作类型（0删除 1添加） */
    public operateType:number;
    /**好友类型（1好友 2黑名单） */
    public friendsType:number;
    public ids:Array<number>;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.operateType);
        pkg.writeByte(this.friendsType);
        let length = this.ids.length;
        pkg.writeShort(length);
        for(let i = 0; i < length; i++)
        {
            pkg.writeInt64(this.ids[i]);
        }
    }

    public receive(pi:TCPPacketIn):void
    {
        //操作结果（1成功 0失败） 
        let result = pi.readByte() == 1;
        if(result)
        {
            FloatTips.addTips("成功添加好友", Color.GREEN)
            Manager.control.getFriends().changeSuggest();
        }
    }

}