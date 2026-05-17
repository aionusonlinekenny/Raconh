/**
 * 火眼金睛选中物品
 * liangyan
 * create 2018-03-27
*/
class FireEyeSelectItemCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FIRE_EYE_SELECT;
    }

    /**物品唯一id */
    public id:number;
    /**物品表格id */
    public cvoID:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.id);
        pkg.writeShort(this.cvoID);
    }

    public receive(pi:TCPPacketIn):void
    {
        let newData = new FireEyeGoodsData();
        newData.uniqueID = pi.readShort();
        newData.cvoID = pi.readShort();
        newData.x = pi.readInt();
        newData.y = pi.readInt();
        newData.scale = pi.readInt();
        newData.rotation = pi.readInt();
        newData.selected = pi.readByte() == 1;
        Manager.model.getFireEye().wrongTimes = pi.readByte();
        let stamp = pi.readInt();
        let isRight = Manager.model.getFireEye().wrongTimes == 0;
        if(!isRight) (Manager.view.getView(ViewID.FireEyePanel) as FireEyePanel).drawStatus(this.id, null);
        else (Manager.view.getView(ViewID.FireEyePanel) as FireEyePanel).drawStatus(this.id, newData);
    }
}