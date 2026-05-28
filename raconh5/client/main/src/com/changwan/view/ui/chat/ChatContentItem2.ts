/**
 * 聊天内容子项
 * liangyan
 * create 2017-11-14
 * @update devil 2018-04-15
*/
class ChatContentItem2 implements cw.IDispose
{
    private _imageContainer:egret.DisplayObjectContainer;
    private _conainer1:egret.DisplayObjectContainer;
    private _width:number;

   private _txt:Label;
   private PLACEHOLDER:string;
   private _vipIcon:BitmapRes;
   private _info:ChatInfo;
   private _faces:Array<Face>;

   public constructor(imageContainer:egret.DisplayObjectContainer,container1:egret.DisplayObjectContainer, width:number)
   {
        this._imageContainer = ObjectUtil.createConainer();
        imageContainer.addChild(this._imageContainer);
        this._conainer1 = ObjectUtil.createConainer();
        container1.addChild(this._conainer1);
        this._width = width;
        this.PLACEHOLDER = String.fromCharCode(12288);
        this._faces = [];
        this.start();
   }

   public move(x:number,y:number):void
   {
       this._conainer1.x = x;
       this._conainer1.y = y;
       this._imageContainer.x = x;
       this._imageContainer.y = y;
   }

   protected start():void
   {
    //    this._txt = TextField.create(this._width,27,0xfff7e6,22);
       this._txt = new Label();
       this._txt.width = this._width;
       this._txt.textColor = 0xfff7e6;
       this._txt.size = 22;
       this._txt.multiline = true;
       this._txt.lineSpacing = 12;
       this._txt.touchEnabled = false;
       this._conainer1.addChild(this._txt);
   }

    public set info(value:ChatInfo)
    {
        if(this._info == value) return;
        this._info = value;
        this.unuseFaces();
        this._faces = [];
        this.drawData();
    }

    private unuseFaces():void
    {
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

    private drawData():void
    {
        if(!this._info) return;
        HtmlUtil.setTextFlow(this._txt, this._info.head);
        this.parseFace();
        // if(this.maxHeight > 0 && this._txt.textHeight > this.maxHeight) this.height = this._txt.height = this.maxHeight;
        // else this.height = this._txt.height = this._txt.textHeight;
        if(this._txt.height > 27)
        {
            this._imageContainer.y = 44;
            this._conainer1.y = 44;
        }
    }

    private parseFace():void
    {
        let channelVipX = 59;
        if(this._info.vipLvl > 0 && this._info.head)
        {
            let m = this._info.head.match(/<font[^>]+>\[[^\]]+\]<\/font>/i);
            if(m)
            {
                HtmlUtil.setTextFlow(this._txt, m[0]);
                channelVipX = Math.ceil(this._txt.textWidth);
                HtmlUtil.setTextFlow(this._txt, this._info.head);
            }
        }
        let offsetX = Math.ceil(this._txt.textWidth);
        HtmlUtil.setTextFlow(this._txt, this._info.content);
        if(this._info.vipLvl > 0)
        {
            if(!this._vipIcon)
            {
                this._vipIcon =  BitmapRes.create("chat_vip_png");
                this._vipIcon.source = "chat_vip_png";
                this._imageContainer.addChild(this._vipIcon);
            }
            this._vipIcon.x = channelVipX;
            this._vipIcon.y = 2;
        }
        else
        {
            if(this._vipIcon)
            {
                Manager.pool.push(this._vipIcon);
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
                    this._conainer1.addChild(face);
                    this._faces.push(face);
                    index++;
                }
            }
        }
    }

    public set lineSpace(value:number)
    {
        this._txt.lineSpacing = value;
    }

    public dispose():void
    {
        if(this._txt)
        {
            this._txt.dispose();
            this._txt = null;
        }
        if(this._vipIcon != null)
        {
            Manager.pool.push(this._vipIcon);
            this._vipIcon = null;
        }
        this.unuseFaces();
        this._faces = null;
        this._info = null;

        this._imageContainer.parent.removeChild(this._imageContainer);
        this._imageContainer = null;
        this._conainer1.parent.removeChild(this._conainer1);
        this._conainer1 = null;
    }
}