/**
 * 聊天频道按钮
 * liangyan
 * create 2017-11-13
*/
class ChatChannelBtn extends ItemRenderer
{
    public btn:ToggleButton;
    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("chat", "ChatChannelBtnSkin");
    }

    public set selected(value:boolean)
    {
        if(this.btn.selected == value) return;
        this.btn.selected = value;
    }

    public get channel():number
    {
        return this.data.channel;
    }

    public dispose():void
    {
        super.dispose();
        this.btn.dispose();
        this.btn = null;
    }
}