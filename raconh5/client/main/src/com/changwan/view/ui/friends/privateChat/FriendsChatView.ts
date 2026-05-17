/**
 * 好友私聊弹窗
 * liangyan
 * create 2017-11-08
*/
class FriendsChatView extends UIComponent implements IViewManager
{
    private _closeBtn:Button;
    private _nameTxt:Label;
    private _scroll:Scroller;
    private _group:eui.Group;
    private _backBtn:Button;
    private _input:TextInput;
    private _faceBtn:Button;
    private _sendBtn:Button;

    private _id:number;
    private _name:string;
    private _oldY:number;
    private _model:FriendsModel;
    private _isInit:boolean;
    private _bgImg:BitmapRemote;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("friends/privateChat", "FriendsChatViewSkin");
    }

    protected configUI():void
    {
        super.configUI();
        this._model = Manager.model.getFriends();

        if(!this._bgImg)
		{
			this._bgImg = Manager.pool.create(BitmapRemote);
			this._bgImg.x = 0;
			this._bgImg.y = 1015;
			this._bgImg.load(PathInfo.getPath("res/common/panel_bg2.png", LoaderType.IMAGE), 720, 110);
			this.addChildAt(this._bgImg, 2);
		}

        this._isInit = true;
    }

    protected addEvent():void
    {
        super.addEvent();

        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._faceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);

        this._model.addEventListener(ChatEvent.ADD_PRIVATE_MSG, this.onMsgUpdateHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
        this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._faceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._sendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);

        this._model.removeEventListener(ChatEvent.ADD_PRIVATE_MSG, this.onMsgUpdateHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);

        super.removeEvent();
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
        //清除消息
        // let isInit = e == null;
        if(this._isInit)
        {
            this.clearGroup();
            this._oldY = 0;
        }
        //添加消息
        let infos = Manager.model.getFriends().getChatData(this._id);
        if(infos == null) return;
        let len = infos.length;
        let info:FriendsChatInfo;
        let item:FriendsChatItem;
        let i = infos.length - ChatModel.MAX_MSG >= 0 ? infos.length - ChatModel.MAX_MSG : 0;
        for(i; i < len; i++)
        {
            info = infos[i];
            if(!this._isInit && info.hasDraw) continue;

            if(i != 0 && info.time - infos[i-1].time >= 3)
            {
                let split = Manager.pool.create(FriendsChatSplitLine, infos[i].time);
                split.y = this._oldY;
                split.time = info.time;
                this._group.addChild(split);
                this._oldY = split.y + split.height + 5;
            }
            
            item = Manager.pool.create(FriendsChatItem, info);
            item.y = this._oldY;
            this._group.addChild(item);

            this._oldY = item.y + item.height + 5;
            info.hasDraw = true;
        }

        this._scroll.validateNow();
        let differ = this._scroll.viewport.contentHeight - this._scroll.viewport.height;
        if(differ > 0) this._scroll.viewport.scrollV = differ;
        if(this._isInit) this._isInit = false;
    }

    public show(id:number, name:string):void
    {
       if(this.parent == null)
       {
           this.reuse();
           this.onResizeHandler(null);
           this._id = id;
           this._name = name;
           this._nameTxt.text = "与" + this._name + "私聊中";
           this._nameTxt.stroke = 2;
		   this._nameTxt.strokeColor = 0x7C6E62;
           Manager.layer.tipsLayer.addChild(this);
           this.invalidate(InvalidationType.DATA);
       }
    }

    public hide():void
    {
        if(this.parent != null) this.dispose();
    }

    private faceSelect(type:string, target:any):void
	{
		let face = Manager.pool.create(Face, type);
        target._input.textDisplay.text += face.faceName;
		if(ChatFaceBox.hasInstance) ChatFaceBox.getInstance().hide();
        target._input.textDisplay.setFocus();
        Manager.pool.push(face);
	}

    private onClickHandler(e:egret.TouchEvent):void
    {
        switch(e.currentTarget)
        {
            case this._closeBtn:
            case this._backBtn:
                if(ChatFaceBox.hasInstance) ChatFaceBox.getInstance().hide();
                Manager.view.hide(ViewID.FriendsChatView);
                break;
            case this._faceBtn:
                if(ChatFaceBox.hasInstance) ChatFaceBox.getInstance().hide();
                else ChatFaceBox.getInstance(this.faceSelect, this).show(0, e.stageY);
                break;
            case this._sendBtn:
                if(this._input.text == "") return;
                Manager.control.getChat().privateChat(this._id, this._name, this._input.text, 0);
                this._input.text = "";
                break;
        }
    }

    private onMsgUpdateHandler(e:ChatEvent):void
    {
        this.invalidate(InvalidationType.DATA);
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    }

    private clearGroup():void
    {
        let num = this._group.numChildren;
        for(let i = 0; i < num; i++)
        {
            let child = this._group.getChildAt(0) as FriendsChatItem | FriendsChatSplitLine;
            if(child)
            {
                this._group.removeChild(child);
                Manager.pool.push(child);
            }
        }
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._closeBtn, this._nameTxt, this._scroll, this._group, this._backBtn, this._input, this._faceBtn, this._sendBtn, this._bgImg);
        // this._closeBtn.dispose();
        this._closeBtn = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._scroll.dispose();
        this._scroll = null;
        this.clearGroup();
        this._group = null;
        this._backBtn.dispose();
        this._backBtn = null;
        this._input.dispose();
        this._input = null;
        this._faceBtn.dispose();
        this._faceBtn = null;
        this._sendBtn.dispose();
        this._sendBtn = null;
        if(this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
        
        this._model = null;
        this._isInit = false;
    }
}