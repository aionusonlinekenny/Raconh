/**
 * 删除称号
 * liangyan
 * create 2017-11-28
*/
class TitleDeleteCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.TITLE_DELETE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let id = pi.readShort();
        let cvo = TitleCVO.getCVO(id);
        cvo.isActived = false;
        Manager.model.getDress().titleModel.dispatchEvent(new TitleEvent(TitleEvent.TITLE_DELETE, cvo.templateID));
    }
}