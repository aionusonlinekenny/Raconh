/**
 * 邮件、聊天视图
 * luzh
 * create 2018.2.27
 * @update devil 2018-04-15
*/
class MailAndChatAndFriend extends BaseRender
{
	private _imageContainer:egret.DisplayObjectContainer;
	private _conainer1:egret.DisplayObjectContainer;
	private _mailBtn:BitmapRes;
	private _friendsBtn:BitmapRes;
	private _back:BitmapRes;
	private _mailRedIcon:BitmapRes;
	private _friendsRedIcon:BitmapRes;
    private _chatTxt:ChatContentItem2;
    private _visible:boolean;
    private _info:ChatInfo;

    public constructor(imageContainer:egret.DisplayObjectContainer,container1:egret.DisplayObjectContainer)
    {
        super();
        this._contentWidth = 720;
        this._contentHeight = 258;
        this._visible = false;
        this._imageContainer = ObjectUtil.createConainer();
        imageContainer.addChild(this._imageContainer);
        this._conainer1 = ObjectUtil.createConainer();
        container1.addChild(this._conainer1);
    }


    protected addEvent():void
    {
		this._mailBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._friendsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getChat().addEventListener(ChatEvent.ADD_CHANNEL_MSG, this.onMsgUpdateHandler, this);
		Manager.model.getMail().addEventListener(MailEvent.HIDE_SHOW_NOTICE, this.onMailUpdateHandler, this);
		Manager.model.getFriends().addEventListener(FriendsEvent.SHOW_HIDE_TIPS, this.onFriendsUpdateHandler, this);
    }

    protected removeEvent():void
    {
		this._mailBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._friendsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getChat().removeEventListener(ChatEvent.ADD_CHANNEL_MSG, this.onMsgUpdateHandler, this);
		Manager.model.getMail().removeEventListener(MailEvent.HIDE_SHOW_NOTICE, this.onMailUpdateHandler, this);
		Manager.model.getFriends().removeEventListener(FriendsEvent.SHOW_HIDE_TIPS, this.onFriendsUpdateHandler, this);
    }

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._mailBtn:
				Manager.view.show(ViewID.MailPanel);
			break;
			case this._friendsBtn:
				if(OpenCVO.isOpen(OpenConst.ID_FRIENDS, true))
					Manager.view.show(ViewID.FriendPanel);
			break;
			case this._back:
				Manager.control.getChat().showChatView(true);
			break;
		}
	}

	private onMsgUpdateHandler(e:ChatEvent):void
    {
		let infos = Manager.model.getChat().getInfos(e.params);
		let len = infos.length;
		this._info = infos[len - 1];
        this.invalidate("drawMsg");
    }

    protected drawAll():void
    {
        if(this._info)this.drawMsg();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid("drawMsg"))this.drawMsg();
    }

    private drawMsg():void
    {
		this._chatTxt.info = this._info;
        this._info = null;
    }

	private onMailUpdateHandler(e:MailEvent):void
	{
		let isShow:boolean = e.params;
		if(isShow)
		{
			if(this._mailRedIcon == null)
			{
				this._mailRedIcon = Manager.pool.create(BitmapRes, "main_red_icon_png");
				this._mailRedIcon.x = this._mailBtn.x + 38;
				this._mailRedIcon.y = this._mailBtn.y;
			    this._imageContainer.addChild(this._mailRedIcon);
			}
		}
		else
        {
            if(this._mailRedIcon != null)
            {
                Manager.pool.push(this._mailRedIcon);
                this._mailRedIcon = null;
            }
        }
	}

	private onFriendsUpdateHandler(e:FriendsEvent):void
	{
		if(Manager.model.getFriends().hasUnReadMsg)
		{
			if(this._friendsRedIcon == null)
			{
				this._friendsRedIcon = Manager.pool.create(BitmapRes, "main_red_icon_png");
				this._friendsRedIcon.x = this._friendsBtn.x + 38;
				this._friendsRedIcon.y = this._friendsBtn.y;
                this._imageContainer.addChild(this._friendsRedIcon);
			}
		}
		else
        {
            if(this._friendsRedIcon != null)
            {
                Manager.pool.push(this._friendsRedIcon);
                this._friendsRedIcon = null;
            }
        }
	}

    public layout(gameWidth:number,gameHeight:number):void
    {
        this._conainer1.y = gameHeight - this._contentHeight;
        this._imageContainer.y = this._conainer1.y;
        this._conainer1.x = (gameWidth - this._contentWidth) >> 1;
        this._imageContainer.x = this._conainer1.x;
    }

	public switch(visible:boolean):void
	{
        if(this._visible == visible)return;
        this._visible = visible;
		if(visible)
		{
            this._mailBtn = BitmapRes.create("main_mail_png",15,36);
            this._mailBtn.touchEnabled = true;
            this._imageContainer.addChild(this._mailBtn); 
            this._friendsBtn = BitmapRes.create("main_chat_png",638,36);
            this._friendsBtn.touchEnabled = true;
            this._imageContainer.addChild(this._friendsBtn); 
            this._back = BitmapRes.create("main_chatBg_png",90,42,548,59);
            this._back.scale9Grid = new egret.Rectangle(7,7,45,45);
            this._back.touchEnabled = true;
            this._imageContainer.addChild(this._back);
            this._chatTxt = new ChatContentItem2(this._imageContainer,this._conainer1, 540);
            this._chatTxt.move(94,58);
            this.start();
            this.addEvent();
        }
        else
        {
            this.removeEvent();
            if(this._mailBtn != null)
            {
                Manager.pool.push(this._mailBtn);
                this._mailBtn = null;
            }
            if(this._friendsBtn != null)
            {
                Manager.pool.push(this._friendsBtn);
                this._friendsBtn = null;
            }
            if(this._back != null)
            {
                Manager.pool.push(this._back);
                this._back = null;
            }
            if(this._chatTxt != null)
            {
                this._chatTxt.dispose();
                this._chatTxt = null;
            }
            this._mailBtn = null;
            this._friendsBtn = null;
            this._chatTxt = null;
            this._back = null;
            if(this._mailRedIcon)
            {
                Manager.pool.push(this._mailRedIcon);
                this._mailRedIcon = null;
            }
            if(this._friendsRedIcon)
            {
                Manager.pool.push(this._friendsRedIcon);
                this._friendsRedIcon = null;
            }
            this.stop();
	}
}
}