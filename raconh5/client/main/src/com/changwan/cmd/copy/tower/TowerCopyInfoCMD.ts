/**
 * 爬塔副本信息
 * liangyan
 * create 2017-12-28
*/
class TowerCopyInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.TOWER_COPY_INFO;
    }

    public receive(pi:TCPPacketIn):void
    {
        let model = Manager.model.getCopy().towerModel;
        model.curLvl = pi.readShort();
        model.history = pi.readShort();
        model.dispatchEvent(new CopyEvent(CopyEvent.UPDATE_TOWER_INFO));
    }
}