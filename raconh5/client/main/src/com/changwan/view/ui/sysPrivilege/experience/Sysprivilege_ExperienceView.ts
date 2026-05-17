/**
 * 特权卡体验
 * pzx
 * 
 */
class Sysprivilege_ExperienceView extends Sprite{

    private _okBtn:Button;
    private _okImg:BitmapRes;

    private _img1:BitmapRes;
    private _img2:BitmapRes;
    private _img3:BitmapRes;
    private _img4:BitmapRes;
    private _img5:BitmapRes;
    private _img6:BitmapRes;
    private _img7:BitmapRes;

    private _txt1:TextField;
    private _txt2:TextField;
    private _txt3:TextField;
    private _txt4:TextField;
    private _txt5:TextField;

    private _bgBit:BitmapRemote;
    private _bg2Bit:BitmapRemote;

    private _timeCD:number;

    private _type:number = 1;

	public constructor() {
        super();
        this.touchChildren = true;
		this.start();
		this.addEvent();
        this.onResizeHandler(null);
	}

    protected start():void
    {
        super.start();
        this._timeCD = 60;
		this.width = 720;
		this.height = 1280;

        this._bgBit = Manager.pool.create(BitmapRemote)
        this._bgBit.y = 240;
        this.addChild(this._bgBit);
        this._bgBit.load(Manager.path.getPanelSysPrivilegePath("sysprivilege_tequanka",".png"));

        this._bg2Bit = Manager.pool.create(BitmapRemote)
        this._bg2Bit.y = 140;
        this.addChild(this._bg2Bit);
        this._bg2Bit.load(Manager.path.getPanelSysPrivilegePath("sysprivilege_nv",".png"));

        this._okBtn = new Button();
		this._okBtn.skinName = "Button2Skin";
		this._okBtn.x = 383;
		this._okBtn.y = 693;
		this.addChild(this._okBtn);
		this._okImg = BitmapRes.create("sysprivilege_lijitiyan_png", 418, 717, 181, 52);
		this.addChild(this._okImg);


        this._img1 = BitmapRes.create("sysprivilege_chengwei_png",243,381,440,39);
        this.addChild(this._img1);

        this._img2 = BitmapRes.create("common_point_png",272,436,22,22);
        this.addChild(this._img2);
        this._img3 = BitmapRes.create("common_point_png",272,475,22,22);
        this.addChild(this._img3);
        this._img4 = BitmapRes.create("common_point_png",272,514,22,22);
        this.addChild(this._img4);
        this._img5 = BitmapRes.create("common_point_png",272,553,22,22);
        this.addChild(this._img5);
        this._img6 = BitmapRes.create("common_point_png",272,592,22,22);
        this.addChild(this._img6);
        this._img7 = BitmapRes.create("sysprivilege_gengduotequan_png",248,629);
        this.addChild(this._img7);


        this._txt1 = TextField.create(369, 30);
        this._txt1.move(295,432);
        this._txt1.fontFamily = "Microsoft YaHei";
        this.addChild(this._txt1);

        this._txt2 = TextField.create(369, 30);
        this._txt2.move(295,471);
        this._txt2.fontFamily = "Microsoft YaHei";
        this.addChild(this._txt2);

        this._txt3 = TextField.create(369, 30);
        this._txt3.move(295,510);
        this._txt3.fontFamily = "Microsoft YaHei";
        this.addChild(this._txt3);

        this._txt4 = TextField.create(369, 30);
        this._txt4.move(295,549);
        this._txt4.fontFamily = "Microsoft YaHei";
        this.addChild(this._txt4);

        this._txt5 = TextField.create(369, 30);
        this._txt5.move(295,588);
        this._txt5.fontFamily = "Microsoft YaHei";
        this.addChild(this._txt5);

        this.setDesc(1);

        Manager.render.add(this.activityHandler,this,1000);
    }

    private activityHandler():void
    {
        this._timeCD--;
        if(this._timeCD<0)
        {
            Manager.render.remove(this.activityHandler,this);
            this.onTouchCloseHandler()
        }
    }

    private setDesc(value:number):void
    {
        for(let i:number = 1;i<6;i++)
        {
            this["_txt"+i].text = LangCVO.getContent("SysPrivilege"+value+i);
        }
    }

	protected addEvent():void
    {
		 this._okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
         GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        super.addEvent();
    }

    protected removeEvent():void
    {
		 this._okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
         GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        super.removeEvent();
    }
	private onTouchCloseHandler():void
    {
        if(this._type == 1)
        {
            Manager.control.getSysPrivilege().experience();
        }
        else
        {
            Manager.view.show(ViewID.SysPrivilegePane);
        }
        Manager.view.hide(ViewID.Sysprivilege_ExperienceView);
    }
    private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        if(!this.visible)
        this.visible = true;
	}

    public show(value:number):void
    {
        this._type = value;
        Manager.layer.tipsLayer.addChild(this);
    }

    public hide():void
    {
        this.dispose();
    }


    public dispose():void
    {
        super.dispose();
        ObjectUtil.disposes(this._okBtn);
        Manager.pool.push(this._okImg);
        Manager.pool.push(this._bgBit);
        Manager.pool.push(this._bg2Bit);

        for(let i:number = 1;i<8;i++)
        {
            Manager.pool.push(this["_img"+i]);
            if(i<6)
            {
                this["_txt"+i].dispose();
            }
        }

        this._okBtn=null;
        this. _okImg=null;

        this. _img1=null;
        this. _img2=null;
        this. _img3=null;
        this. _img4=null;
        this. _img5=null;
        this. _img6=null;
        this. _img7=null;

        this. _txt1=null;
        this. _txt2=null;
        this. _txt3=null;
        this. _txt4=null;
        this. _txt5=null;

        this. _bgBit=null;
        this. _bg2Bit=null;

    }
}