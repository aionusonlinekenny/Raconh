/**
 * 卸下称号
 * liangyan
 * create 2017-11-28
*/
class TitleTakeOffCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.TITLE_TAKE_OFF;
    }

    /**称号id */
    public id:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.id);
    }

    public receive(pi:TCPPacketIn):void
    {
        //操作结果(0:失败 1:成功)
        let result = pi.readByte() == 1;
        if(result)
        {
            let cvo = TitleCVO.getCVO(this.id);
            Manager.model.getDress().titleModel.dispatchEvent(new TitleEvent(TitleEvent.TITLE_TAKE_OFF, cvo.templateID));
        }
    }
}