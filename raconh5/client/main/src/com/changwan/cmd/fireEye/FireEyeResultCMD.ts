/**
 * 火眼金睛活动结算数据
 * liangyan
 * create 2018-03-27
*/
class FireEyeResultCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FIRE_EYE_ACT_DATA;
    }

    public receive(pi:TCPPacketIn):void
    {
        let info = new FireEyeResultInfo();
        let count = pi.readShort();
        let id:number;
        let name:string;
        while (count > 0)
        {
            id = pi.readInt64();
            name = pi.readUTF();
            if(id == Manager.model.self.id)
            {
                info.selfScore = pi.readInt();
                info.selfTime = pi.readShort();
            }
            else
            {
                info.enemyName = name;
                info.enemyScore = pi.readInt();
                info.enemyTime = pi.readShort();
            }
            count--;
        }

        count = pi.readShort();
        info.gainGoods = [];
        let goodsInfo:ItemsModelInfo;
        while (count > 0)
        {
            goodsInfo = new ItemsModelInfo();
            goodsInfo.id = count;
            goodsInfo.base_id = pi.readInt();
            goodsInfo.bind = pi.readByte() == 1;
            goodsInfo.quantity = pi.readInt();
            info.gainGoods.push(goodsInfo);
            count--;
        }

        Manager.model.getFireEye().actResultData = info;
        if(Manager.control.getFireEye().banView != null)
        {
            Manager.control.getFireEye().banView.dispose();
            Manager.control.getFireEye().banView = null;
        }
        if(Manager.control.getFireEye().finishView != null)
        {
            Manager.control.getFireEye().finishView.dispose();
            Manager.control.getFireEye().finishView = null;
        }
        Manager.link.link(LinkType.PANEL_FIRE_EYE, 3);
    }
}