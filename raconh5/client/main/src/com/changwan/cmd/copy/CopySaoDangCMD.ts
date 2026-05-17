/**
 * 副本扫荡协议
 * luzhihong
 * create 2017.12.26
 */
class CopySaoDangCMD extends BaseCMD
{
    public constructor() 
    {
        super();
        this._protocol = Protocol.COPY_SAO_DANG;
    }

    public id:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt(this.id);
    }

    public receive(pi:TCPPacketIn):void
    {
        let copyID = pi.readInt();
        let len = pi.readShort();
        let goodsID:number;
        let isBind:number;
        let count:number;
        let infos:ItemsModelInfo[] = [];
        let info:ItemsModelInfo;
        while(len > 0)
        {
            info = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() == 1;
            info.quantity = pi.readInt();
            infos.push(info);
            len--;
        }
        Manager.view.show(ViewID.CopyResultWin, infos, 5);
    }
}