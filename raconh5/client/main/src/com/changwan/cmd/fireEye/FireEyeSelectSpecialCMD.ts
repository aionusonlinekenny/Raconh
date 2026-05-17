/**
 * 火眼金睛选中物品
 * liangyan
 * create 2018-03-27
*/
class FireEyeSelectSpecialCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FIRE_EYE_SELECT;
    }

    public receive(pi:TCPPacketIn):void
    {
        let cvoID = pi.readShort();
        let count = pi.readShort();
        let infos = new Array<ItemsModelInfo>();
        let goodsInfo:ItemsModelInfo;
        while (count > 0)
        {
            goodsInfo = new ItemsModelInfo();
            goodsInfo.base_id = pi.readInt();
            goodsInfo.bind = pi.readByte() == 1;
            goodsInfo.quantity = pi.readInt();
            infos.push(goodsInfo);
            count--;
        }
        //哇！你发现了招财小猫咪！获得了
        let str = LangCVO.getContent("fireEye16");
        for(let i = 0; i < infos.length; i++)
        {
            goodsInfo = infos[i];
            //{0}<font color='{1}'>{2}</font>
            str += LangCVO.getContent("fireEye17", goodsInfo.cvo.name, Color.GREEN_STR_2, goodsInfo.quantity);
            if(i != infos.length - 1) str += "、";
        }
        FloatTips.addTips(str, Color.ORANGE);
    }
}