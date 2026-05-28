/**
 * 聊天内容子项
 * liangyan
 * create 2017-11-14
*/
class ChatContentItem extends UIComponent
{
    private _txt:Label;
    private _info:ChatInfo;
    private _faces:Array<Face>;
    private _vipIcon:eui.Image;

    private PLACEHOLDER:string;

    public constructor()
    {
        super();
        this.PLACEHOLDER = String.fromCharCode(12288);
        this.skinName = Manager.path.getSkinName("chat", "ChatContentItemSkin");
    }
    
    protected configUI():void
    {
        super.configUI();
                console.log(this.maxWidth,this.maxHeight);
    }

    private parseFace():void
    {
        // Measure channel label width dynamically so VIP badge sits after ']'
        // regardless of what language the channel name is in.
        let channelVipX = 59;
        if(this._info.vipLvl > 0 && this._info.head)
        {
            let m = this._info.head.match(/<font[^>]+>\[[^\]]+\]<\/font>/i);
            if(m)
            {
                HtmlUtil.setTextFlow(this._txt, m[0]);
                channelVipX = Math.ceil(this._txt.textWidth);
                HtmlUtil.setTextFlow(this._txt, this._info.head); // restore
            }
        }
        let offsetX = Math.ceil(this._txt.textWidth);
        HtmlUtil.setTextFlow(this._txt, this._info.content);
        if(this._info.vipLvl > 0)
        {
            if(!this._vipIcon)
            {
                this._vipIcon = new eui.Image();
                this._vipIcon.source = "chat_vip_png";
                this.addChild(this._vipIcon);
            }
            this._vipIcon.x = channelVipX;
            this._vipIcon.y = 2;
        }
        else
        {
            if(this._vipIcon)
            {
                this._vipIcon.bitmapData = null;
                this._vipIcon = null;
            }
        }

        let size = this._txt.size / 2;
        let regexp = /#\d{2}/g;
        let faceIDs:RegExpMatchArray; 
        let item:egret.ITextElement;
        let len = this._txt.textFlow.length;
        let temp = new Label();
        for(let i = len - 1; i >= 0; i--)
        {
            item = this._txt.textFlow[i];
            faceIDs = item.text.match(regexp);
            item.text = item.text.replace(regexp, this.PLACEHOLDER);

            if(faceIDs != null)
            {
                let id:number;
                let face:Face;
                let index:number;
                for(let j = 0; j < faceIDs.length; j++)
                {
                    index = item.text.indexOf(this.PLACEHOLDER, index);
                    temp.text = item.text.slice(0, index);
                    // let len = cw.StringUtil.getStringLen(item.text.slice(0, index));
                    id = Number((faceIDs[j] as string).replace("#", ""));
                    face = Manager.pool.create(Face, "" + id);
                    let x = temp.textWidth + offsetX;
                    let tempOffsetX = this._txt.width - x;
                    if(tempOffsetX > 0 && tempOffsetX < Face.SIZE) x += tempOffsetX;
                    x += 1;
                    let line = Math.ceil(x / this._txt.width);
                    face.y = (line - 1) * 34;
                    x = x % this._txt.width;
                    face.x = x;
                    this.addChild(face);
                    this._faces.push(face);
                    index++;
                }
            }
        }
    }

    private unuseFaces():void
    {
        if(!this._faces) return;
        let len = this._faces.length;
        let face:Face;
        for(let i = 0; i < len; i++)
        {
            face = this._faces[i];
            Manager.pool.push(face);
            face = null;
        }
        this._faces.length = 0;
    }

    protected drawAll():void
    {
        super.drawAll();
        // this.drawData();
    }

    protected draw():void
    {
        super.draw();
        // if(this.isInvalid(InvalidationType.DATA)) this.drawData();
    }

    private drawData():void
    {
        if(!this._info) return;
        HtmlUtil.setTextFlow(this._txt, this._info.head);
        this.parseFace();
        if(this.maxHeight > 0 && this._txt.textHeight > this.maxHeight) this.height = this._txt.height = this.maxHeight;
        else this.height = this._txt.height = this._txt.textHeight;
    }

    public set lineSpace(value:number)
    {
        this._txt.lineSpacing = value;
    }

    public set info(value:ChatInfo)
    {
        if(this._info == value) return;
        this._info = value;
        this.unuseFaces();
        this._faces = [];
        // this.invalidate(InvalidationType.DATA);
        this.drawData();
    }

    public reuse(info:ChatInfo):void
    {
        this._faces = [];
        super.reuse();
        this._txt.width = this.width;
        this.info = info;
    }

    public unuse():void
    {
        super.unuse();
        this.unuseFaces();
        if(this._vipIcon)
        {
            this._vipIcon.bitmapData = null;
            this._vipIcon = null;
        }
        this._info = null;
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._txt, this._vipIcon);
        this._txt.dispose();
        this._txt = null;
        this.unuseFaces();
        this._faces = null;
        if(this._vipIcon)
        {
            this._vipIcon.bitmapData = null;
            this._vipIcon = null;
        }
        this._info = null;
    }
}
