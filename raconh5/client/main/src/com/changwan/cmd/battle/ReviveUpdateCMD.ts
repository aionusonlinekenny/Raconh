/**
 * 复活更新数据协议
 * liangyan
 * create 2017-12-07
*/
class ReviveUpdateCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.REVIVE_UPDATE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let x = pi.readInt();
        let y = pi.readInt();
        let hp = pi.readInt();
        Manager.model.self.updatePostion(x, y);
        Manager.model.self.attrInfo.setValue(AttrDescType.HP, hp);
    }
}