/**
 * 邮件内容模板表
 * liangyan
 * create 2017-11-24
*/
class MailContentCVO
{
    public static cvos;

    public id:number;
    /**邮件标题 */
    public title:string;
    /**邮件内容 */
    public content:string;

    public parse(bytes:egret.ByteArray):void
    {
        this.id = bytes.readInt();
        this.title = bytes.readUTF();
        this.content = bytes.readUTF();
    }

    public static getCVO(id:number):MailContentCVO
    {
        if(MailContentCVO.cvos == null) return null;
        return MailContentCVO.cvos[id];
    }
}