/**
 * 获得称号
 * liangyan
 * create 2017-11-28
*/
class TitleGainCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.TITLE_GAIN;
    }

    public receive(pi:TCPPacketIn):void
    {
        let id = pi.readShort();
        let cvo = TitleCVO.getCVO(id);
        cvo.isActived = true;
        Manager.model.getDress().titleModel.dispatchEvent(new TitleEvent(TitleEvent.TITLE_GAIN, cvo.templateID));
    }
}