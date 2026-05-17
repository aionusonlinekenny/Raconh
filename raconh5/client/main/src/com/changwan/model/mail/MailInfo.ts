// 邮件信息
class MailInfo
{
    /**邮件唯一ID */
    public uniqueID:number;
    /**邮件数据ID */
    public mailID:number;
    /**邮件日期 */
    public date:number;
    /**收件人角色ID */
    public receiverID:number;
    /**收件人名称 */
    public receiverName:string;
    /**邮件标题 */
    public title:string;
    /**邮件内容 */
    public content:string;

    /**是否已读 */
    private _hasRead:boolean;
    public get hasRead():boolean
    {
        return this._hasRead;
    }
    public set hasRead(value:boolean)
    {
        if(this._hasRead == value) return;
        this._hasRead = value;
    }

    /**银币 */
    private _silver:number;
    public get silver():number
    {
        return this._silver;
    }

    /**金币 */
    private _gold:number;
    public get gold():number
    {
        return this._gold;
    }

    /**钻石 */
    private _diamond:number;
    public get diamond():number
    {
        return this._diamond;
    }

    /**附带物品 */
    private _goodsArr:Array<ItemsModelInfo>;
    public get goodsArr():Array<ItemsModelInfo>
    {
        let result:Array<ItemsModelInfo> = [];
        if(this._goodsArr)
        {
            let len = this._goodsArr.length;
            let child:ItemsModelInfo;
            for(let i = 0; i < len; i++)
            {
                child = new ItemsModelInfo();
                child.base_id = this._goodsArr[i].base_id;
                child.bind = this._goodsArr[i].bind;
                child.quantity = this._goodsArr[i].quantity;
                //特殊信息
                let infoLen = this._goodsArr[i].infoList.length;
                for(let j = 0; j < infoLen; j++)
                {
                    let exarr:ExattrItemsinfo = new ExattrItemsinfo();
                    exarr.type = this._goodsArr[i].infoList[j].type;
                    exarr.target = this._goodsArr[i].infoList[j].target;
                    exarr.value = this._goodsArr[i].infoList[j].value;
                    exarr.desc = this._goodsArr[i].infoList[j].desc;
                    child.infoList.push(exarr);
                }
                result.push(child);
            }
        }
        return result;
    }

    /**
     * 附件状态
     * 0:无附件
     * 1:未领取
     * 2:已领取
     * */
    public attachStatus:number;

    public parseData(pi:TCPPacketIn)
    {
        this.uniqueID = pi.readInt64();
        this.mailID = pi.readInt();
        this.date = pi.readInt();
        this.receiverID = pi.readInt64();
        this.receiverName = pi.readUTF();
        this._hasRead = pi.readByte() == 1;
        //标题参数列表
        let length = pi.readShort();
        let mailCvo:MailContentCVO = MailContentCVO.getCVO(this.mailID);
        this.title = mailCvo.title;
        this.content = mailCvo.content;
        let i:number;
        let paramType:number;
        let paramArgs:Array<string> = [];
        for(i = 0; i < length; i++)
        {
            paramType = pi.readByte();
            paramArgs.push(pi.readUTF());
        }
        this.title = cw.StringUtil.format(mailCvo.title, paramArgs);
        //正文参数列表
        length = pi.readShort();
        paramArgs = [];
        for(i = 0; i < length; i++)
        {
            paramType = pi.readByte();
            paramArgs.push(pi.readUTF());
        }
        this.content = cw.StringUtil.format(mailCvo.content, paramArgs);
        //物品列表
        length = pi.readShort();
        let goodsInfo:ItemsModelInfo;
        this._goodsArr = [];
        for(i = 0; i < length; i++)
        {
            goodsInfo = new ItemsModelInfo();
            goodsInfo.base_id = pi.readInt();
            goodsInfo.bind = pi.readByte() == 1;
            goodsInfo.quantity = pi.readInt();
            //特殊信息
            let len = pi.readShort();
            for(let j = 0; j < len; j++)
            {
                let exarr:ExattrItemsinfo = new ExattrItemsinfo();
                exarr.type = pi.readShort();
                exarr.target = pi.readInt();
                exarr.value = pi.readInt();
                exarr.desc = pi.readUTF();
                goodsInfo.infoList.push(exarr);
            }
            this._goodsArr.push(goodsInfo);
        }
        //附件状态0:无附件 1:未领取 2:已领取
        this.attachStatus = pi.readByte();
    }
}