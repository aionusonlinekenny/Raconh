/**
 * luzh
 * 2018.2.11
 * 对话表
 */
class DialogCVO
{
    /*唯一id*/
    public id:number;
    /*剧情头像*/
    public head:number;
    /*头像方向*/
    public dic:number;
    /*人物名称资源*/
    public nameRes:string;
    /*剧情对白*/
    public description:string;
    /*播放顺序*/
    public sort:number;
    /*延迟时间(s)*/
    public time:number;

    private static _cvos:Object = {};

    public static parse(bytes:egret.ByteArray):void
    {
        let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        let cvo:DialogCVO;
        for(let i:number = 0; i < tableCount; i++)
        {
            cvo = new DialogCVO();
            cvo.id =bytes.readInt();
            cvo.head = bytes.readInt();
            cvo.dic = bytes.readByte();
            cvo.nameRes = bytes.readUTF();
            cvo.description = bytes.readUTF();
            cvo.sort = bytes.readByte();
            cvo.time = bytes.readInt();
            if(this._cvos[cvo.id] == null) this._cvos[cvo.id] = new Array<DialogCVO>();
            this._cvos[cvo.id].push(cvo);
        }
    }

    public static getCVOs(id:number):Array<DialogCVO>
    {
        return this._cvos[id] as Array<DialogCVO>;
    }
}
