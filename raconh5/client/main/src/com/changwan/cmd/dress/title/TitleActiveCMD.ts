/**
 * 激活称号
 * liangyan
 * create 2017-11-28
*/
class TitleActiveCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.TITLE_ACTIVE;
    }

    /**物品类型 */
    public type:number;
    /**物品id */
    public id:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.type);
        pkg.writeInt(this.id);
    }

    public receive(pi:TCPPacketIn):void
    {
        //操作结果(0:失败 1:成功)
        let result = pi.readByte() == 1;
        if(result)
        {
            let cvo = TitleCVO.getCVO(pi.readShort());
            cvo.isActived = true;
            Manager.model.getDress().titleModel.dispatchEvent(new TitleEvent(TitleEvent.TITLE_ACT_SUCC, cvo.templateID));
        }
    }
}