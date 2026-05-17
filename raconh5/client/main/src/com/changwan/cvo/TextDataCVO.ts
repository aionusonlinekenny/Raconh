class TextDataCVO
{
    public static cvos;

    public id:number;
    /**文本内容 */
    public content:string;
    /**显示等级 */
    public showLvl:number;
    /**显示位置 */
    public position:number;

    public static parse(bytes:egret.ByteArray)
    {
        TextDataCVO.cvos = {};
        MailContentCVO.cvos = {};
        let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        let cvo:TextDataCVO;
        for (var i = 0; i < tableCount; i++)
        {
            cvo = new TextDataCVO();
            cvo.parseOne(bytes);
            TextDataCVO.cvos[cvo.id] = cvo;
        }
        var mailCount = bytes.readShort();
        let mailCvo:MailContentCVO;
        for (var j = 0; j < mailCount; j++)
        {
            mailCvo = new MailContentCVO();
            mailCvo.parse(bytes);
            MailContentCVO.cvos[mailCvo.id] = mailCvo;
        }
    }

    public parseOne(datas:egret.ByteArray):void
    {
        this.id = datas.readShort();
        this.content = datas.readUTF();
        this.showLvl = datas.readShort();
        this.position = datas.readByte();
    }

    public static getCVO(id:number):TextDataCVO
    {
        if(TextDataCVO.cvos == null) return null;
        return TextDataCVO.cvos[id];
    }
}