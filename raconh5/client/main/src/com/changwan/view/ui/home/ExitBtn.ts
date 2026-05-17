class ExitBtn
{
    private _btnExit:BitmapRes;
    private _imageContainer:egret.DisplayObjectContainer;

    public constructor(imageContainer:egret.DisplayObjectContainer)
    {
        this._imageContainer = imageContainer;
    }

    private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._btnExit:
				this.exitHandle();
				break;
        }
    }

	private exitHandle():void
	{
		let str:string;
		let bfType:number = Manager.model.self.attrInfo.bfType;
		if(bfType == BFType.BOSS_PUBLIC) str = LangCVO.getContent("boss16");
		else if(bfType == BFType.CLUB_BF) str = LangCVO.getContent("clubBF27");//您确定要退出战场？\n（30秒后可重回战场）
		else if(bfType == BFType.DEVIL) str = LangCVO.getContent("devil6");
		else  str = LangCVO.getContent("activity3");
		let cbi:CallBackInfo = Manager.pool.create(CallBackInfo, this.doExit, this);
		Manager.tips.showTips(str, cbi, true);
	}

	private doExit():void
	{
		let bfType:number = Manager.model.self.attrInfo.bfType;
		if(bfType == BFType.BOSS_PUBLIC) Manager.control.getBoss().exit();
		else if(bfType == BFType.CLUB_BF) Manager.control.getClubBF().exit();
		else if(bfType == BFType.DEVIL) Manager.control.getDevil().exitDevil();
		else Manager.control.getCopy().exit();
	}

	public switch(visible:boolean):void
	{
		if(visible)
		{
            if(this._btnExit == null)
            {
                this._btnExit = BitmapRes.create("main_btn_exit_png");
                this._btnExit.touchEnabled = true;
                this._btnExit.y = 960;
                this._btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
                this._imageContainer.addChild(this._btnExit);
            }
        }
        else
        {
            if(this._btnExit)
            {
                Manager.pool.push(this._btnExit);
                this._btnExit.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
                this._btnExit = null;
            }
        }
	}
}