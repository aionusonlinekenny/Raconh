/**
 * 聊天controller
 * liangyan
 * create 2017-11-13
*/
class ChatControl extends BaseControl
{
    private _chatView:ChatView;

    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.CHAT_CHANNEL_MSG, ChatChannelMsgCMD);
        Manager.socket.addCMD(Protocol.CHAT_PRIVATE_MSG, ChatPrivateMsgCMD);
        Manager.socket.addCMD(Protocol.CHAT_NOTICE, ChatNoticeCMD);
        Manager.socket.addCMD(Protocol.EXP_ADD, ExpAddCMD);
        Manager.socket.addCMD(Protocol.KILL_RECORD, KillRecordCMD);
    }

    /**频道聊天 */
    public channelChat(channel:number, content:string):void
    {
        let cmd = Manager.socket.getCMD(Protocol.CHAT_CHANNEL_MSG) as ChatChannelMsgCMD;
        cmd.channel = channel;
        cmd.content = content;
        cmd.send();
    }

    /**私聊 */
    public privateChat(id:number, name:string, msg:string, isAuto:number):void
    {
        let cmd = Manager.socket.getCMD(Protocol.CHAT_PRIVATE_MSG) as ChatPrivateMsgCMD;
        cmd.id = id;
        cmd.name = name;
        cmd.msg = msg;
        cmd.isAuto = isAuto;
        cmd.send();
    }

    public showChatView(isShow:boolean):void
    {
        if(isShow)
        {
            if(!this._chatView) 
            {
                this._chatView = new ChatView();
                this._chatView.reuse();
            }
            Manager.layer.uiLayer.addChild(this._chatView);
        }
        else ObjectUtil.remove(this._chatView);
    }
}