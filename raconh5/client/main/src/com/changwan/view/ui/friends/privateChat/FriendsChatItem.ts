/**
 * 聊天内容子项
 * liangyan
 * create 2017-11-08
*/
class FriendsChatItem extends UIComponent
{
	private _headBack:eui.Image;
	private _head:BitmapRemote;
	private _dialog:FriendsDialog;

	private _info:FriendsChatInfo;

	public constructor()
    {
        super();
		this.visible = false;
        this.skinName = Manager.path.getSkinName("friends/privateChat", "FriendsChatItemSkin");
    }

	protected configUI():void
	{
		super.configUI();
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
		this._headBack.source = "common_itemBg_png";
		this._headBack.x = this._info.isSelf ? 540 : 5;

		this._head = Manager.pool.create(BitmapRemote, Manager.path.getRoleHeadPath(1, this._info.fromCareer));
		this._head.x = this._headBack.x + 27;
		this._head.y = this._headBack.y + 27;
		this.addChild(this._head);

        this._dialog.x = this._info.isSelf ? this.width - 149 - this._dialog.width : 149;

		let dialogH = this._dialog.y + this._dialog.height;
		this.height = dialogH + 5 > 111 ? dialogH + 5 : 111;
		this.visible = true;
	}

    private set info(info:FriendsChatInfo)
    {
		if(this._info == info) return;
		this._info = info;
        if(this._info == null) return;
		this._dialog.info = this._info;
		this.invalidate(InvalidationType.DATA);
    }

	public reuse(info:FriendsChatInfo):void
	{
		this.info = info;
		super.reuse();
	}

	public unuse():void
	{
		super.unuse();
		if(this._head)
        {
            Manager.pool.push(this._head);
            this._head = null;
        }
		this._info = null;
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._head, this._dialog);
		if(this._head)
        {
            Manager.pool.push(this._head);
            this._head = null;
        }
		this._dialog.dispose();
		this._dialog = null;

		this._info = null;
	}
}