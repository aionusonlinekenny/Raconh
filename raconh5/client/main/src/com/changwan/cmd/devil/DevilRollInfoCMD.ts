/**
 * 魔神降临摇奖数据
 * liangyan
 * create 2018-04-10
*/
class DevilRollInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.DEVIL_ROLL_INFO;
    }

    public receive(pi:TCPPacketIn):void
    {
        let maxName = pi.readUTF();
        let maxValue = pi.readShort();
        let view = Manager.view.getView(ViewID.DevilRollDiceView) as DevilRollDiceView;
        if(view) view.updateMax(maxName, maxValue);
    }
}