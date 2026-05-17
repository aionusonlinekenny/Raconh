/**
 * 创角界面
 * luzhihong
 * create 2017-12-14
 */
class CreateRoleView extends UIComponent implements IViewManager
{
    private _back0:BitmapRemote;
    private _back1:BitmapRemote;
    private _role:BitmapRemote;
    private _headBack0:eui.Image;
    private _headBack1:eui.Image;
    private _name:eui.Image;
    private _txtName:Label;
    private _btnRole:eui.Image;
    private _btnCreate:eui.Image;
    private _career:number;
    
    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("createRole", "CreateRoleViewSkin");
        this.touchChildren = true;
    }

    protected configUI():void
    {
        super.configUI();
        this._back0.load(Manager.path.createRolePath("back0.jpg"));
        this._back1.load(Manager.path.createRolePath("back1.jpg"));
        // this._role.load(Manager.path.createRolePath("male.png"));
        this._txtName.type = egret.TextFieldType.INPUT;
        // this.onResizeHandler(null);
        this.x = -80;

        this.setCareer(Math.random() < 0.5 ? 1 : 2);//随机选中一个职业
    }
    
    public show():void
    {
        if(this.parent == null) Manager.layer.uiLayer.addChild(this);
    }

    public hide():void
    {
        this.dispose();
    }

    protected addEvent():void
    {
        super.addEvent();

        // GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._headBack0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._headBack1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btnRole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btnCreate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getLogin().addEventListener(LoginEvent.RANDOM_NAME, this.updateName, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();

        // GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._headBack0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._headBack1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btnRole.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btnCreate.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getLogin().removeEventListener(LoginEvent.RANDOM_NAME, this.updateName, this);
    }

    // private onResizeHandler(e:GlobalEvent):void
	// {
    //     this.x = Math.round(Manager.config.gameWidth - this.width) / 2;
	// }

    private updateName(e:LoginEvent):void
	{
        this._txtName.text = e.params as string;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
        switch(e.currentTarget)
		{
			case this._headBack0:
                this.setCareer(1);
                break;
			case this._headBack1:
                this.setCareer(2);
			    break;
			case this._btnRole:
                this.reqRandomName();
			    break;
			case this._btnCreate:
                Manager.control.getLogin().createRole(this._txtName.text, this._career);
			    break;
        }
	}

    private setCareer(career:number):void
    {
        if(this._career == career) return;
        this._career = career;

        if(this._career == 1)
        {
            this._headBack0.source = "common_roleKuang_selected_png";
            this._headBack1.source = "common_roleKuang_normal_png";
            this._name.source = "createRole_nameMale_png";
            this._role.load(Manager.path.createRolePath("male.png"));
        }
        else
        {
            this._headBack0.source = "common_roleKuang_normal_png";
            this._headBack1.source = "common_roleKuang_selected_png";
            this._name.source = "createRole_nameFemale_png";
            this._role.load(Manager.path.createRolePath("female.png"));
        }
        this.reqRandomName();
    }

    private reqRandomName():void
    {
        Manager.control.getLogin().randomName(this._career);
    }

	public dispose():void
	{
		super.dispose();
        ObjectUtil.disposes(this._back0, this._back1, this._role, this._txtName);
		ObjectUtil.removes(this._headBack0, this._headBack1, this._name, this._btnRole, this._btnCreate);
        this._back0 = null;
        this._back1 = null;
    	this._role = null;
    	this._headBack0 = null;
    	this._headBack1 = null;
    	this._name = null;
    	this._txtName = null;
        this._btnRole = null;
    	this._btnCreate = null;
	}
}