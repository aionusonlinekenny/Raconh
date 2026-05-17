class LairdNoteUpdateStatusCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_LAIRD_UPDATE_NOTE_STATUS;
    }

    public noteId:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt(this.noteId);
    }

    public receive(pi:TCPPacketIn):void
    {
        let list:Array<any> = [];
        let len:number = pi.readShort();
        for(let i:number=0; i<len; i++)
        {
            let timeStamp:number = pi.readInt();
            let noticeId:number = pi.readShort();
            let len2:number = pi.readShort();
            let arr:Array<any> = [];
            let child:any;
            for(let j:number = 0; j<len2; j++)
            {
                child = {};
                child.type = pi.readByte();
                child.content  = pi.readUTF();
                arr.push(child);
            }
            let noteId:number = pi.readInt();
            let textCvo = TextDataCVO.getCVO(noticeId);
            if(textCvo)
            {
                let content:string = Manager.model.getChat().parseLink(textCvo.content, arr);
                list.push({time:timeStamp, content:content});
                if(noteId != 0)
                {
                    Manager.control.getLaird().lairdUpdateNoteStatus(noteId);
                    Manager.tips.showTips(content, null, false);
                }
            }
        }
    }
}