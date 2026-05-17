class LangCVO
{
    private static _cvos = {};

    /**
     * 解析语言包
     */
    public static parse(bytes:egret.ByteArray):void
    {
        let tableCount:number = bytes.readByte();
        let tableName:string;
        let cvoCount:number = 0;
        for(let i:number = 0 ; i < tableCount; i ++)
        {
            tableName = bytes.readUTF();
            cvoCount = bytes.readShort();
            for(let j:number = 0 ; j < cvoCount; j ++)
            {
                this._cvos[tableName + bytes.readShort()] = bytes.readUTF();
            }
        }
    }
    /**
    * 语言ID，系统与ID组成的字符串，例如:bag1
    */
    public static getContent(id:string,...args:any[]):string
    {
        let content:string = this._cvos[id];
        if(content == null)return "{-" + id +"-}";
        if(args.length == 0) return content;
        content = cw.StringUtil.format(content,args);
        return content;
    }
}