/**
 * 请求称号信息
 * liangyan
 * create 2017-11-28
*/
class TitleListCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.TITLE_REQUEST;
    }

    public receive(pi:TCPPacketIn):void
    {
        let useLen = pi.readShort();
        let cvo:TitleCVO;
        while(useLen > 0)
        {
            cvo = TitleCVO.getCVO(pi.readShort());
            cvo.isActived = true;
            useLen--;
        }
        let limitLen = pi.readShort();
        while(limitLen > 0)
        {
            cvo = TitleCVO.getCVO(pi.readShort());
            cvo.isActived = true;
            cvo.time = pi.readInt();
            limitLen--;
        }
        Manager.model.getDress().titleModel.dispatchEvent(new TitleEvent(TitleEvent.TITLE_LIST));
    }
}