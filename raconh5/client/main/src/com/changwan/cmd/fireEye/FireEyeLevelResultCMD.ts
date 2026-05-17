/**
 * 火眼金睛关结算数据
 * liangyan
 * create 2018-03-26
*/
class FireEyeLevelResultCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FIRE_EYE_LEVEL_RESULT;
    }

    public receive(pi:TCPPacketIn):void
    {
        let info = new FireEyeLevelResultInfo();
        //自己的数据
        let selfID = pi.readInt64();
        let selfName = pi.readUTF();
        info.findCount = pi.readByte();
        info.findScore = pi.readInt();
        info.leftTime = pi.readInt();
        info.timeScore = pi.readInt();
        info.selfScore = pi.readInt();
        info.selfTime = pi.readShort();

        let count = pi.readShort();
        let goodsInfo:ItemsModelInfo;
        info.gainGoods = [];
        while (count > 0)
        {
            goodsInfo = new ItemsModelInfo();
            goodsInfo.base_id = pi.readInt();
            goodsInfo.bind = pi.readByte() == 1;
            goodsInfo.quantity = pi.readInt();
            info.gainGoods.push(goodsInfo);
            count--;
        }
        //对手的数据
        let enemyID = pi.readInt64();
        info.enemyName = pi.readUTF();
        info.enemyScore = pi.readInt();
        info.enemyTime = pi.readShort();

        info.selfWin = pi.readByte() == 1;

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
        Manager.view.show(ViewID.FireEyeLevelResultView, info);
    }
}