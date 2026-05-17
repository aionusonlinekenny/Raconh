class LairdAddInteractRecCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_LAIRD_ADD_INTERACT_REC;
    }

    protected processOut(pkg:TCPPacketOut):void
    {
        // pkg.writeByte(this.trainingType);
    }

    public receive(pi:TCPPacketIn):void
    {
        let list:Array<any> = [];
        let timeStamp:number = pi.readInt();
        let noticeId:number = pi.readShort();
        let len:number = pi.readShort();
        let child:any = {};
        for(let i:number=0; i<len; i++)
        {
            child.type = pi.readByte();
            child.content  = pi.readUTF();
        }
        let noteId:number = pi.readInt();
        let textCvo = TextDataCVO.getCVO(noticeId);
        if(textCvo)
        {
            let content:string = Manager.model.getChat().parseLink(textCvo.content, [child]);
            list.push({time:timeStamp, content:content});
            if(noteId != 0)
            {
                Manager.control.getLaird().lairdUpdateNoteStatus(noteId);
                Manager.tips.showTips(content, null, false);
            }
        }
        Manager.model.getLaird().dispatchEvent(new LairdEvent(LairdEvent.LAIRD_INTERACTREC_LIST_UPDATE, list));
    }
}