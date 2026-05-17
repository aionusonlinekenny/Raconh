/**
 * 宗主数据更新
 */
class ClubJoinCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CLUB_JOIN;
    }

    public clubId:number;
    public isRecomment:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt64(this.clubId);
        pkg.writeByte(this.isRecomment);
    }

    public receive(pi:TCPPacketIn):void
    {
        let list:Array<ItemsModelInfo> = [];
        let len:number = pi.readShort();
        for(let i:number=0; i<len; i++)
        {
            let info:ItemsModelInfo = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() == 1 ? true : false;
            info.quantity = pi.readInt();
            list.push(info);
        }
        Manager.control.getDrop().showAlert(list);
        Manager.view.hide(ViewID.ClubPanel);
        Manager.link.link(LinkType.PANEL_CLUB, 0);
    }
}