/**
 * 火眼金睛物品数据
 * liangyan
 * create 2018-03-26
*/
class FireEyeGoodsDataCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FIRE_EYE_GOODS_DATA;
    }

    public receive(pi:TCPPacketIn):void
    {
        let count = pi.readShort();
        Manager.model.getFireEye().curGoodsDatas = new Array<FireEyeGoodsData>();
        let data:FireEyeGoodsData;
        while (count > 0)
        {
            data = new FireEyeGoodsData();
            data.uniqueID = pi.readShort();
            data.cvoID = pi.readShort();
            data.x = pi.readInt();
            data.y = pi.readInt();
            data.scale = pi.readInt();
            data.rotation = pi.readInt();
            data.selected = pi.readByte() == 1;
            Manager.model.getFireEye().curGoodsDatas.push(data);
            count--;
        }
    }
}