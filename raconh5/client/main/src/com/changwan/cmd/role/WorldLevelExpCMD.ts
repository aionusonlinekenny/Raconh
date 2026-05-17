/**
 * 世界等级cmd
 * pzx
 * 18.4.3
 */
class WorldLevelExpCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_WORLD_LEVE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let lv:number = pi.readShort();
        Manager.model.getLogin().dispatchEvent(new WorldLeveExpEvent(WorldLeveExpEvent.UPDATE_WORLDLEVE_EVENT,lv));
    }
}