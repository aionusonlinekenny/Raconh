/**
 * 宗门修改公告
 */
class ClubAlterCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CLUB_ALTER;
    }

    public desc:string;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeUTF(this.desc);
    }

    public receive(pi:TCPPacketIn):void
    {
        let desc:string = pi.readUTF();
        Manager.model.getClub().clubInfo.desc = desc;
        Manager.model.getClub().dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_NOTICE));
    }
}