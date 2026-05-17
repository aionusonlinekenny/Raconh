/**
 * 爬塔副本杀死怪物的时候通知取消挂机
 *author Anydo
 *create 2018-1-30
 *description 
*/
class TowerCopyKillEndCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.TOWER_COPY_KILL_END;
    }

    public receive(pi:TCPPacketIn):void
    {
        if(Manager.model.self.attrInfo.bfType != BFType.COPY) return;
        if(Manager.model.getCopy().curID != CopyConst.ID_TOWER && Manager.model.getCopy().curID != CopyConst.ID_MAIN) return;
        Manager.model.getAuto().autoHook = false;
    }
}