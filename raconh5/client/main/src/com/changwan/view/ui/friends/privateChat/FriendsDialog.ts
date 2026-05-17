/**
 * 好友私聊对话框
 * liangyan
 * create 2017-11-08
*/
class FriendsDialog extends UIComponent
{
    private _back:eui.Image;
    private _txt:Label;

    private _info:FriendsChatInfo;
    private _faces:Array<Face>;

    private readonly SPACE:number = 5;
    private PLACEHOLDER:string;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("friends/privateChat", "FriendsDialogSkin");
    }

    protected configUI():void
    {
        super.configUI();
        this._faces = [];
        this.PLACEHOLDER = String.fromCharCode(12288);
        this._txt.multiline = true;
       
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawData();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
    }

    private drawData():void
    {
        this._back.source = this._info.isSelf ? "friends_chat_self_png" : "friends_chat_others_png";

        this.unuseFaces();
        HtmlUtil.setTextFlow(this._txt, this._info.content);
        this.parseFace();
        if(this._txt.width > 456) this._txt.width = this._info.isSelf ? this.width - 40 : this.width - 20;
        this.width = this._txt.width + 40;
    }

    public set info(value:FriendsChatInfo)
    {
        // if(this._info == value) return;
        this._info = value;
        if(this._info == null) return;
        this.invalidate(InvalidationType.DATA);
    }

    private parseFace():void
    {
        let offsetX = this._info.isSelf ? 10 : 28;
        this._txt.x = offsetX;

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
                    id = Number((faceIDs[j] as string).replace("#", ""));
                    face = Manager.pool.create(Face, "" + id);
                    let x = temp.textWidth + 1;
                    let line = Math.ceil(x / this._txt.maxWidth);
                    face.y = 20 + ((line - 1) * 15);
                    x = x % this._txt.maxWidth;
                    x += offsetX;
                    face.x = Math.ceil(x);
                    this.addChild(face);
                    this._faces.push(face);
                    index++;
                }
            }
        }
        temp.dispose();
        temp = null;
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

    public dispose():void
    {
        this.removeEvent();
        super.dispose();
        ObjectUtil.removes(this._back, this._txt);
        this._back = null;
        this._txt.dispose();
        this._txt = null;

        this.unuseFaces();
        this._info = null;
    }
}