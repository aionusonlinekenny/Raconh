/**
 * 聊天表情视图
 * liangyan
 * create 2017-11-13
*/
class ChatFaceBox extends UIComponent
{
    private static _instance:ChatFaceBox;
    public static getInstance(fun:Function = null, target:any = null):ChatFaceBox
    {
        if(this._instance == null) this._instance = new ChatFaceBox(fun, target);
        return this._instance;
    }
    public static nullInstance():void {this._instance = null;}

    private _back:eui.Image;
    private _faces:Array<Face>;
    private _callback:Function;
    private _target:any;
    private _needHide:boolean;

    private _x:number;
    private _y:number;

    private readonly SPACE:number = 40;
	private readonly FACE_NUM:number = 24;
	private readonly ROW_COUNT:number = 6;
    private readonly OFFSETX:number = 90;
    private readonly OFFSETY:number = 5;
    private readonly SCALE:number = 2;

    public constructor(fun:Function, target:any)
    {
        super();
        this.skinName = "";

        this._callback = fun;
        this._target = target;
        this.touchChildren = true;
    }

    protected configUI():void
    {
        super.configUI();

        if(this._back == null)
        {
            this._back = new eui.Image();
            this._back.source = "main_chatBg_png";
            this._back.width = 720;
            this._back.height = 300;
            this.addChild(this._back);
        }
    }

    protected addEvent():void
    {
        super.addEvent();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.global.gameMain.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickStageHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.global.gameMain.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickStageHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
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
        if(this._faces != null) return;
		this._faces = new Array<Face>();
		for (let i = 0; i < this.FACE_NUM; i++)
		{
            let face:Face = Manager.pool.create(Face, "" + (i+1));
            let row = Math.floor(i / this.ROW_COUNT);
			let col = i % this.ROW_COUNT;
            face.scaleX = face.scaleY = this.SCALE;
            face.x = col * (Face.SIZE * face.scaleX + this.SPACE) + this.OFFSETX;
            face.y = row * (Face.SIZE * face.scaleY + this.SPACE/2) + this.OFFSETY;
			this._faces.push(face);
			this.addChild(face);
		}

        // this.x = this._x;
        this.onResizeHandler(null);
        this.y = this._y - this._back.height - 20;
		// Manager.layer.uiLayer.addChild(this);
        this._needHide = false;
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        e.stopImmediatePropagation();
		let rect = new eui.Rect(this._back.width - this.OFFSETX*2, this._back.height - this.OFFSETY*2);
		let mx = e.localX - this.OFFSETX;
		let my = e.localY - this.OFFSETY;
		if(mx > rect.width || my > rect.height || mx < 0 || my < 0) return;
		if(mx == 0) mx = 1;
		if(my == 0) my = 1;
        let tw = Math.ceil(mx / (Face.SIZE * this.SCALE + this.SPACE));
		let th = Math.floor(my / (Face.SIZE * this.SCALE + this.SPACE/2));
		let type = th * this.ROW_COUNT + tw;
        if(this._callback != null) this._callback("" + type, this._target);
    }

    private onClickStageHandler(e:egret.TouchEvent):void
    {
        if(!this._needHide) this._needHide = true;
        else this.hide();
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    }

    public static get hasInstance():boolean
    {
        return (this._instance != null && this._instance.parent != null);
    }

    public show(x:number = 0, y:number = 0):void
	{
		if(this.parent == null)
		{
            // this._x = this.x;
            this._y = y;
            this.invalidate(InvalidationType.LAYOUT);
			Manager.layer.tipsLayer.addChild(this);
		}
	}

    public hide():void
    {
        if(this.parent != null) this.dispose();
    }

    public dispose():void
	{
        ChatFaceBox.nullInstance();
		super.dispose();
        ObjectUtil.remove(this._back);
        this._back = null;

        if(this._faces != null)
        {
            let length = this._faces.length;
            let item:Face;
		    for(let i = 0; i < length; i++)
		    {
                item = this._faces[i];
                Manager.pool.push(item);
			    item = null;
		    }
		    this._faces = null;
        }
			
		this._callback = null;
	}
}