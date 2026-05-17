/**
 * 魔神降临摇奖奖励
 * liangyan
 * create 2018-04-21
*/
class DevilRollRewardsCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.DEVIL_ROLL_REWARDS;
    }

    public receive(pi:TCPPacketIn):void
    {
        let count = pi.readShort();
        let infos = new Array<ItemsModelInfo>();
        let info:ItemsModelInfo;
        while(count > 0)
        {
            info = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() == 1;
            info.quantity = pi.readInt();

            let extraCount = pi.readShort();
            let extraInfo:ExattrItemsinfo;
            for(let i = 0; i < extraCount; i++)
            {
                extraInfo = new ExattrItemsinfo();
                extraInfo.type = pi.readShort();
                extraInfo.target = pi.readInt();
                extraInfo.value = pi.readInt();
                extraInfo.desc = pi.readUTF();
                info.infoList.push(extraInfo);
            }
            infos.push(info);
            count--;    
        }
        Manager.control.getDrop().showAlert(infos);
    }
}