/**
 * 玩家复活场景通知
 * liangyan
 * create 2017-12-07
*/
class ReviveNoticeCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.REVIVE_NOTICE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let id = pi.readInt64();
        let x = pi.readInt();
        let y = pi.readInt();
        let hp = pi.readInt();
        
        let obj = Manager.model.getGameobject().getGameObject(id) as PlayerGameObjectInfo;
        if(obj)
        {
            obj.updatePostion(x, y);
            obj.attrInfo.setValue(AttrDescType.HP, hp);
        }
    }
}