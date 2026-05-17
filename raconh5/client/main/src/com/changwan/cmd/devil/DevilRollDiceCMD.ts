/**
 * 魔神降临摇奖
 * liangyan
 * create 2018-04-10
*/
class DevilRollDiceCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.DEVIL_ROLL_DICE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let point = pi.readByte();
        let view = Manager.view.getView(ViewID.DevilRollDiceView) as DevilRollDiceView;
        if(view) view.updateMyDice(point);
    }
}