/**
 * 魔神降临通知摇奖
 * liangyan
 * create 2018-04-10
*/
class DevilNoticeRollCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.DEVIL_NOTICE_ROLL;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.view.show(ViewID.DevilRollDiceView, true);
        let endTime = pi.readInt();
        let now = Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        let delay = Math.round(endTime - now);
        if(delay > 0) Manager.model.getDevil().dispatchEvent(new DevilEvent(DevilEvent.DEVIL_ROLL_MAX_UPDATE, delay));
        else Manager.view.hide(ViewID.DevilRollDiceView);
    }
}