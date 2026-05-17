/**
 * 佩戴称号
 * liangyan
 * create 2017-11-28
*/
class TitleWearCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.TITLE_WEAR;
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
            let cvos = TitleCVO.getCvosByType(1);
            let cvo = TitleCVO.getCVO(this.id);
            Manager.model.getDress().titleModel.dispatchEvent(new TitleEvent(TitleEvent.TITLE_WEAR, cvo.templateID));
        }
    }
}