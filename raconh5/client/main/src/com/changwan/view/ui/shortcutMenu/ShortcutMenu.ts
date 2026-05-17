/**
 * 快捷菜单
 * liangyan
 * create 2017-11-06
*/
class ShortcutMenu extends UIComponent
{
    private static _instance:ShortcutMenu;
    public static get hasInstance():boolean {return this._instance != null;}
    public static get instance():ShortcutMenu
    {
        if(this._instance == null)this._instance = new ShortcutMenu();
        return this._instance;
    }
    public static nullInstance():void {this._instance = null;}

    private _back:egret.Shape;
    private _buttons:Array<ShortcutMenuBtn>;
    private _labels:Array<number>;
    private _notHide:boolean;
    private _id:number;
	private _name:string;
	private _width:number;
	private _currentType:number;
    private _x:number;
    private _y:number;

    private readonly COMMON_HIEGHT:number = 74;

    public constructor()
    {
        super();
        this.touchEnabled = true;
        this.touchChildren = true;
        this.skinName = "";
    }

    protected configUI():void
    {
        super.configUI();
        this._buttons = [];
        this._labels = [];
    }

    protected addEvent():void
    {
        super.addEvent();

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.global.gameMain.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickStageHandler, this);
    }

    protected removeEvent():void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.global.gameMain.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickStageHandler, this);

        super.removeEvent();
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawLayout();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.LAYOUT)) this.drawLayout();
    }

    private drawLayout():void
    {
        this.updateLabels();
		this.updateButtons();
		this.updateSize();
		this.setPosition(this._x, this._y);
    }

    public showTip(x:number,y:number,id:number,name:string,tipType:number,width:number = 197):void
	{
        this._x = x;
        this._y = y;
		this._id = id;
		this._currentType = tipType;
		this._name = name;
		this._width = width;
        this._notHide = true;
        if(this.parent == null) Manager.layer.uiLayer.addChild(this);
        this.invalidate(InvalidationType.LAYOUT);
	}

    public hide():void
    {
        if(this.parent != null) this.dispose()
    }

    public move(x:number, y:number):void
    {
        this._notHide = true;
        this.setPosition(x, y);
    }

    private onClickHandler(e:egret.TouchEvent):void
    {
        e.stopImmediatePropagation();
        let btn = e.target as ShortcutMenuBtn;
        if(btn == null) return;
        switch(btn.type)
        {
            case ShortcutMenuFunType.PRIVATE_CHAT:
                this.chat();
                break;
            case ShortcutMenuFunType.OBSERVE_EQUIPT:
                this.observePlayer();
                break;
            case ShortcutMenuFunType.DELETE:
                this.deleteFriends();
                break;
            case ShortcutMenuFunType.BLACK_LIST:
                this.addBlack();
                break;
            case ShortcutMenuFunType.ADD_FRIENDS:
                this.addFriends();
                break;
        }

        this.hide();
    }

    private onClickStageHandler(e:egret.TouchEvent):void
    {
        if(this._notHide) this._notHide = false;	
        else this.hide();
    }

    private updateLabels():void
    {
        this._labels = ShortcutMenuFunType.getLabelsByType(this._currentType);

        let friend = Manager.model.getFriends().getFriendsByID(this._id);
        let online:boolean = friend != null && friend.isOnline;
        let length = this._labels.length;
        for(let i = length; i >= 0; i--)
        {
            switch(this._labels[i])
            {
                case ShortcutMenuFunType.PRIVATE_CHAT:
                    break;
                case ShortcutMenuFunType.OBSERVE_EQUIPT:
                    // if(!online) this._labels.splice(i, 1);
                    break;
                case ShortcutMenuFunType.DELETE:
                    if(!Manager.model.getFriends().checkFriendsBeingByID(this._id, FriendsType.BLACK) 
                    && !Manager.model.getFriends().checkFriendsBeingByID(this._id, FriendsType.FRIEND))
                    {
                        this._labels.splice(i, 1);
                    }
                    break;
                case ShortcutMenuFunType.BLACK_LIST:
                    // if(!online) this._labels.splice(i, 1);
                    break;
                case ShortcutMenuFunType.ADD_FRIENDS:
                    // if(!online) this._labels.splice(i, 1);
                    break;
            }
        }
    }

    private updateButtons():void
	{
		this.clearButtons();
		let btn:ShortcutMenuBtn;
        let length = this._labels.length;
		for(let i = 0; i < length; i++)
		{
            btn = new ShortcutMenuBtn(this._labels[i]);
			this._buttons.push(btn);
			btn.y = i * this.COMMON_HIEGHT;
			this.addChild(btn);
		}
	}

    private updateSize():void
	{
        if(this._back == null) this._back = Manager.pool.create(egret.Shape);
        this._back.graphics.beginFill(0, 1);
        this._back.graphics.drawRect(0, 0, this._width, this._labels.length * (this.COMMON_HIEGHT) + + 20);
        this._back.graphics.endFill();
        this._back.touchEnabled = true;
        this._back.alpha = 0.2;
        this._back.touchEnabled = false;
        this.addChildAt(this._back, 0);
	}

    private setPosition(x:number,y:number):void
	{
        if(x + this._back.width > Manager.global.gameMain.stage.stageWidth) x = Manager.global.gameMain.stage.stageWidth - this._back.width;
		if(y + this._back.height > Manager.global.gameMain.stage.stageWidth) y = Manager.global.gameMain.stage.stageWidth - this._back.height;
        this.x = x;
		this.y = y;
        Manager.layer.uiLayer.setChildIndex(this, Manager.layer.uiLayer.numChildren - 1);
	}

    private clearButtons():void
	{
        if(this._buttons == null || this._buttons.length == 0) return;
		while(this._buttons.length > 0)
		{
			if(this._buttons[0].parent != null)
                this._buttons[0].parent.removeChild(this._buttons[0]);
			this._buttons.shift();
		}
        this._buttons = [];
	}

    private chat():void
	{
        if(!OpenCVO.isOpen(OpenConst.ID_PRIVATE_CHAT, true)) return;
		if(this._id == Manager.model.self.id || this._name == Manager.model.self.getName()) return;
        let player = Manager.model.getFriends().getFriendsByID(this._id);
		if((player != null) && (!player.isOnline))
		{
			FloatTips.addTips("对方不在线，不能进行窗口聊天", Color.RED);
			return;
		}
        if(Manager.model.getFriends().checkFriendsBeingByID(this._id, FriendsType.BLACK))
        {
            FloatTips.addTips("对方在你的黑名单，不能进行窗口聊天");
			return;
        }
        // FriendsChatView.instance.show(this._id, this._name);
        Manager.view.show(ViewID.FriendsChatView,this._id, this._name);
	}

    private observePlayer():void
    {}

    private deleteFriends():void
    {
        let info = Manager.model.getFriends().getFriendsByID(this._id);
        if(info == null) return;
        Manager.control.getFriends().deleteFriends(this._id, info.type);
    }

    private addBlack():void
    {
        if(Manager.model.getFriends().checkFriendsBeingByID(this._id, FriendsType.BLACK))
        {
            FloatTips.addTips("对方已在你的黑名单", Color.RED);
			return;
        }
        Manager.control.getFriends().addFriends(this._id, FriendsType.BLACK);
    }

    private addFriends():void
	{
        if(Manager.model.getFriends().checkFriendsBeingByID(this._id, FriendsType.FRIEND))
        {
            FloatTips.addTips("对方已是你的好友", Color.RED);
			return;
        }
        Manager.control.getFriends().addFriends(this._id, FriendsType.FRIEND);
	}

    public dispose():void
    {
        ShortcutMenu.nullInstance();
        super.dispose();
        Manager.pool.push(this._back);
        this._back = null;
        this._notHide = false;

        if(this._buttons)
        {
            let length = this._buttons.length;
            let item:ShortcutMenuBtn;
            for(let i = 0; i < length; i++)
            {
                item = this._buttons[i];
                item.dispose();
                item = null;
            }
            this._buttons.length = 0;
        }
        this._labels.length = 0;
    }
}