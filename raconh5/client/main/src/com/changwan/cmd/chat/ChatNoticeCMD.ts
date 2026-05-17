/**
 * 公告
 * liangyan
 * create 2017-11-14
*/
class ChatNoticeCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CHAT_NOTICE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let id = pi.readShort();
        let len = pi.readShort();

        let arr:Array<any> = [];
        let child:any;
        for(let i = 0; i < len; i++)
        {
            child = {};
            child.type = pi.readByte();
            child.content = pi.readUTF();
            arr.push(child);
        }
        
        let textCvo = TextDataCVO.getCVO(id);
        if(textCvo)
        {
            let content = textCvo.content;
            content = Manager.model.getChat().parseLink(content, arr);
            switch(textCvo.position)
            {
                case 54:
                case 55:
                    this.showFloatTips(content);
                break;
                case 0:
                case 6:
                case 7:
                    this.showChannelMsg(content);
                break;
                case 51:
                    this.showSysNotice(content);
                break;
                case 52:
                    this.showChannelMsg(content);
                    this.showSysNotice(content);
                break;
                case 82:
                    this.showBackNotice(content);
                break;
            }
        }
    }

    private showFloatTips(str:string):void
    {
        FloatTips.addTips(str, Color.RED);
    }

    private showChannelMsg(str:string):void
    {
        let chatInfo = new ChatInfo();
        chatInfo.type = ChatChannelType.SYSTEM;
        chatInfo.htmlText = str;
        chatInfo.parseInfo();
        Manager.model.getChat().pushInfo(chatInfo, chatInfo.type);
    }

    private showSysNotice(str:string):void
    {
        SystemNoticeView.instance.show(str);
    }

    private showBackNotice(str:string):void
    {
        Manager.view.show(ViewID.BackgroundNoticeView, str);
    }
}