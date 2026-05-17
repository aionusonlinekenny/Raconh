/**
 * Simon
 * 2017.12.21
 * 兵魂升星
 * */
class SoldierUpgradeStarCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.SHENBING_UPGRADE_START;
    }

    public id:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.id);
    }

    public receive(ip:TCPPacketIn):void
    {
        let id:number = ip.readShort();
        let star:number = ip.readByte();
        Manager.model.getSoldier().upgradeStar(id, star);
    }
}