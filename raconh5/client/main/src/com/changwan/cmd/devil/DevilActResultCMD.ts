/**
 * 魔神降临活动结算数据
 * liangyan
 * create 2018-04-10
*/
class DevilActResultCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.DEVIL_ACT_RESULT;
    }

    public receive(pi:TCPPacketIn):void
    {
        let resultInfo = new DevilResultInfo();
        resultInfo.kingInfo = new DevilKingInfo();
        resultInfo.kingInfo.id = pi.readInt64();
        resultInfo.kingInfo.name = pi.readUTF();
        resultInfo.kingInfo.career = pi.readByte();
        resultInfo.kingInfo.fight = pi.readInt();
        resultInfo.kingInfo.clubType = pi.readByte();
        resultInfo.kingInfo.clothes = pi.readShort();
        resultInfo.kingInfo.weapon = pi.readShort();
        resultInfo.kingInfo.wing = pi.readShort();

        resultInfo.myScore = pi.readInt();
        resultInfo.myRank = pi.readInt();

        let count = pi.readShort();
        let goodsInfo:ItemsModelInfo;
        resultInfo.rewards = [];
        while (count > 0)
        {
            goodsInfo = new ItemsModelInfo();
            goodsInfo.id = count;
            goodsInfo.base_id = pi.readInt();
            goodsInfo.bind = pi.readByte() == 1;
            goodsInfo.quantity = pi.readInt();

            let extraCount = pi.readShort();
            let extraInfo:ExattrItemsinfo;
            for(let i = 0; i < extraCount; i++)
            {
                extraInfo = new ExattrItemsinfo();
                extraInfo.type = pi.readShort();
                extraInfo.target = pi.readInt();
                extraInfo.value = pi.readInt();
                extraInfo.desc = pi.readUTF();
                goodsInfo.infoList.push(extraInfo);
            }
            resultInfo.rewards.push(goodsInfo);
            count--;    
        }
        Manager.model.getDevil().resultInfo = resultInfo;
        Manager.view.show(ViewID.DevilResultView);
    }
}