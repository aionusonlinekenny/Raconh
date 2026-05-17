class MailModel extends egret.EventDispatcher
{
    public constructor()
    {
        super();
        this.mailInfos = [];
    }

    public mailInfos:Array<MailInfo>;

    public parseList(pi:TCPPacketIn)
    {
        let length = pi.readShort();
        let info:MailInfo;
        for(let i = 0; i < length; i++)
        {
            info = new MailInfo();
            info.parseData(pi);
            this.mailInfos.push(info);
        }
        this.mailInfos.sort(this.sortMails);
        this.checkNeedNotice();
        this.dispatchEvent(new MailEvent(MailEvent.UPDATE_LIST));
    }

    public parseReceive(pi:TCPPacketIn)
    {
        if(this.mailInfos == null) this.mailInfos = [];
        let info:MailInfo;
        let length = pi.readShort();
        for(let i = 0; i < length; i++)
        {
            info = new MailInfo();
            info.parseData(pi);
            this.mailInfos.push(info);
        }
        this.mailInfos.sort(this.sortMails);
        this.checkNeedNotice();
        this.dispatchEvent(new MailEvent(MailEvent.MAIL_RECEIVE));
    }

    public parseDelete(pi:TCPPacketIn)
    {
        let length = pi.readShort();
        let id:number;
        let info:MailInfo;
        let infoLength = this.mailInfos.length;
        for(let i = 0; i < length; i++)
        {
            id = pi.readInt64();
            for(let j = 0; j < infoLength; j++)
            {
                info = this.mailInfos[j];
                if(info.uniqueID == id)
                {
                    let index = this.mailInfos.indexOf(info);
                    this.mailInfos.splice(index);
                    break;
                }
            }
        }
        this.mailInfos.sort(this.sortMails);
        this.dispatchEvent(new MailEvent(MailEvent.MAIL_DELETE));
    }

    public parseRead(pi:TCPPacketIn)
    {
        let id = pi.readInt64();
        let length = this.mailInfos.length;
        let info:MailInfo;
        for(let i = 0; i < length; i++)
        {
            info = this.mailInfos[i];
            if(info.uniqueID == id)
            {
                info.hasRead = true;
                break;
            }
        }
        this.mailInfos.sort(this.sortMails);
        this.checkNeedNotice();
        this.dispatchEvent(new MailEvent(MailEvent.HAS_READ_MAIL, id));
    }

    public parseFetch(pi:TCPPacketIn)
    {
        let length = pi.readShort();
        let id:number;
        let infoLength = this.mailInfos.length;
        let info:MailInfo;
        let ids:Array<number> = [];
        for(let i = 0; i < length; i++)
        {
            id = pi.readInt64();
            for(let j = 0; j < infoLength; j++)
            {
                info = this.mailInfos[j];
                if(info.uniqueID == id)
                {
                    info.hasRead = true;
                    info.attachStatus = MailConst.HAS_FETCH;
                    ids.push(id);
                    break;
                }
            }
        }
        this.mailInfos.sort(this.sortMails);
        this.checkNeedNotice();
        this.dispatchEvent(new MailEvent(MailEvent.FETCH_ATTACH, ids));
    }

	private sortMails(a:MailInfo, b:MailInfo):number
	{
        if(!a.hasRead && !b.hasRead)
        {
            if(a.attachStatus == MailConst.UN_FETCH && b.attachStatus != MailConst.UN_FETCH) return -1;
            else if(a.attachStatus != MailConst.UN_FETCH && b.attachStatus == MailConst.UN_FETCH) return 1;
        }
		else if(!a.hasRead && b.hasRead) return -1;
		else if(a.hasRead && !b.hasRead) return 1;
        else
        {
            if(a.attachStatus == MailConst.UN_FETCH && b.attachStatus != MailConst.UN_FETCH) return -1;
            else if(a.attachStatus != MailConst.UN_FETCH && b.attachStatus == MailConst.UN_FETCH) return 1;
        }
			
		if(a.date > b.date) return -1;
		else if(a.date < b.date) return 1;
		return 0;
	}

    private checkNeedNotice():void
    {
        let len = this.mailInfos.length;
        let result = false;
        for(let i = 0; i < len; i++)
        {
            if(!this.mailInfos[i].hasRead || this.mailInfos[i].attachStatus == MailConst.UN_FETCH)
            {
                result = true;
                break;
            }
        }
        this.dispatchEvent(new MailEvent(MailEvent.HIDE_SHOW_NOTICE, result));
    }
}