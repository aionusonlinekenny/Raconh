/**
 * 好友私聊子项
 * liangyan
 * create 2017-11-03
*/
class FriendsPrivateItem extends ItemRenderer
{
    private _headBack:eui.Image;
    private _bubble:BubbleView;
    private _nameTxt:Label;
    private _lvlTxt:Label;
    private _msgTxt:Label;
    private _timeTxt:Label;

    private _head:BitmapRemote;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("friends/privateChat", "FriendsPrivateItemSkin");
    }

    protected createChildren():void
    {
        super.createChildren();
        this._head = Manager.pool.create(BitmapRemote);
        this._head.x = this._headBack.x + 27;
        this._head.y = this._headBack.y + 27;
        this.addChild(this._head);
    }

    protected dataChanged():void
    {
        let info = this.data as FriendsChatInfo;
        if(info == null) return;
        this._head.load(Manager.path.getRoleHeadPath(1, info.isSelf ? info.targetCareer : info.fromCareer));
        let records = Manager.model.getFriends().getChatData(info.isSelf ? info.targetID : info.fromID);
        let count:number = 0;
        let len = records.length;
        for(let i = 0; i < len; i++)
        {
            if(!records[i].hasDraw) count++;
        }
        this._bubble.update(count);
        this._nameTxt.text = info.isSelf ? info.targetName : info.fromName;
        if(info.zhuansheng>0)
        {
            this._lvlTxt.text =info.zhuansheng+LangCVO.getContent("common14")+ info.level + LangCVO.getContent("common15");
        }
        else
        {
            this._lvlTxt.text = info.level + LangCVO.getContent("common15");
        }
        this._msgTxt.text = info.content.slice(0, 12);
        this._timeTxt.text = cw.DateUtil.formatStr(info.time, cw.DateUtil.MM_DD_HH_MM);
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._headBack, this._bubble, this._nameTxt, this._lvlTxt, this._msgTxt, this._timeTxt, this._head);
        this._headBack.bitmapData = null;
        this._headBack = null;
        this._bubble.dispose();
        this._bubble = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._lvlTxt.dispose();
        this._lvlTxt = null;
        this._msgTxt.dispose();
        this._msgTxt = null;
        this._timeTxt.dispose();
        this._timeTxt = null;
        Manager.pool.push(this._head);
        this._head = null;
    }

    public updatebubble(value:number):void
    {
        this._bubble.update(value);
    }
}