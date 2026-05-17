/**
 * 右边活动图标容器视图
 * luzh
 * create 2018.2.27
 * @update devil 2018-04-15
*/
class ActivityIcon extends BaseRender
{
    private _imageContainer:egret.DisplayObjectContainer;
    private _btnContainer:egret.DisplayObjectContainer;
    private _conainer1:egret.DisplayObjectContainer;
    private _imageContainer01:egret.DisplayObjectContainer;



    public static RIGHT:number = 1;
    public static TOP:number = 2;
    private _type:number;
    private _visible:boolean;
    private _icons:ActBaseIcon2[];
    private _isMoving:boolean;

    //top图标使用
    private _btn:BitmapRes;
    private _needSetRight:boolean;
    public constructor(type:number)
    {
        super();
        this._imageContainer01 = ObjectUtil.createConainer();
        this._imageContainer = ObjectUtil.createConainer();
        this._btnContainer = ObjectUtil.createConainer();
        Manager.layer.homeImageLayer.addChild(this._btnContainer);
        this._conainer1 = ObjectUtil.createConainer();
        this._type = type;
        if(this._type == ActivityIcon.TOP)
        {
            this._needSetRight = parseInt(MapCVO.getConfigData(MapCVO.CONFIG_DAILY_ICON)) == 1;
        }
        this._icons = [];
        this._visible = false;
        this.start();
    }

    public layout(gameWidth:number,gameHeight:number):void
    {
        if(this._type == ActivityIcon.RIGHT)this.move(gameWidth - 117,420);
        else if(this._type == ActivityIcon.TOP)this.move(68,135);
    }

    private move(x:number,y:number):void
    {
        this._imageContainer.x = x;
        this._imageContainer.y = y;
        this._imageContainer01.x = x;
        this._imageContainer01.y = y;
        this._conainer1.x = x;
        this._conainer1.y = y;
        this._btnContainer.x = x;
        this._btnContainer.y = y;
    }

    public switch(visible:boolean)
    {
        if(this._visible == visible)return;
        this._visible = visible;
        this._isMoving = true;
        egret.Tween.removeTweens(this._imageContainer01);
        egret.Tween.removeTweens(this._imageContainer);
        egret.Tween.removeTweens(this._conainer1);
        let layer:LayerManager = Manager.layer;
        if(this._visible)
        {
            if(this._imageContainer.parent == null)
            {
                layer.iconImageLayer.addChild(this._imageContainer01);
                layer.homeImageLayer.addChild(this._imageContainer);
                layer.homeLayer.addChild(this._conainer1);
            }
            if(this._type == ActivityIcon.RIGHT)
            {
                egret.Tween.get(this._imageContainer01).to({y:420, alpha:1}, 200).call(this.moveComplete, this);
                egret.Tween.get(this._imageContainer).to({y:420, alpha:1}, 200);
                egret.Tween.get(this._conainer1).to({y:420, alpha:1}, 200);
            }
            else if(this._type == ActivityIcon.TOP)
            {
                egret.Tween.get(this._imageContainer01).to({x:68, alpha:1}, 200).call(this.moveComplete, this);
                egret.Tween.get(this._imageContainer).to({x:68, alpha:1}, 200);
                egret.Tween.get(this._conainer1).to({x:68, alpha:1}, 200);
                if(this._needSetRight) Manager.model.getLogin().home.switch(HomeView2.RIGHT_ICON,this._visible);
                if(this._btn != null)this._btn.source = "main_minBtn_png";
            }
        }
        else
        {
            if(this._type == ActivityIcon.RIGHT)
            {
                egret.Tween.get(this._imageContainer01).to({y:420 + 472, alpha:0}, 100).call(this.moveComplete, this);
                egret.Tween.get(this._imageContainer).to({y:420 + 472, alpha:0}, 100);
                egret.Tween.get(this._conainer1).to({y:420 + 472, alpha:0}, 100);
            }
            else if(this._type == ActivityIcon.TOP)
            {
                egret.Tween.get(this._imageContainer01).to({x:-630 - 100, alpha:0}, 100).call(this.moveComplete, this);
                egret.Tween.get(this._imageContainer).to({x:-630 - 100, alpha:0}, 100);
                egret.Tween.get(this._conainer1).to({x:-630 - 100, alpha:0}, 100);
                 if(this._needSetRight)  Manager.model.getLogin().home.switch(HomeView2.RIGHT_ICON,this._visible);
                if(this._btn != null)this._btn.source = "main_maxBtn_png";
            }
        }
        
    }

	private moveComplete():void
	{
		this._isMoving = false;
        let layer:LayerManager = Manager.layer;
        if(!this._visible)
        {
            if(this._imageContainer.parent)
            {
                layer.iconImageLayer.removeChild(this._imageContainer01);
                layer.homeImageLayer.removeChild(this._imageContainer);
                layer.homeLayer.removeChild(this._conainer1);
            }
        }

	}

    private createIcon(id:number):void
    {
        let icon:ActBaseIcon2;
        if(id == ActIconID.DAILY) icon = new DailyActivityIcon2(this._imageContainer01,this._imageContainer,this._conainer1);
        else if(id == ActIconID.BOSS) icon = new BossIcon2(this._imageContainer01,this._imageContainer,this._conainer1);
        else if(id == ActIconID.TRAINING)
        {
            icon = new TrainingActivityIcon2(this._imageContainer01,this._imageContainer,this._conainer1);
            Manager.model.getTraining().addRender();
        }
        else if(id == ActIconID.CLUBLEADERWAR)
        {
            icon = new ClubLeaderWarActivityIcon2(this._imageContainer01,this._imageContainer,this._conainer1);
        }
        else if(id == ActIconID.SHOP)icon = new ShopIcon2(this._imageContainer01,this._imageContainer,this._conainer1);
        else if(id == ActIconID.MATERIAL)icon = new MaterialIcon2(this._imageContainer01,this._imageContainer,this._conainer1);
        else if(id == ActIconID.CASHCOW) icon = new CashCowIcon2(this._imageContainer01,this._imageContainer,this._conainer1);
        else if(id == ActIconID.SYSPRIVILEGE) icon = new SysPrivilegeIcon2(this._imageContainer01,this._imageContainer,this._conainer1);
        else if(id == ActIconID.ARTIFACT) icon = new ArtifactIcon2(this._imageContainer01,this._imageContainer,this._conainer1);
        else if(id == ActIconID.RANK) icon = new RankIcon2(this._imageContainer01,this._imageContainer,this._conainer1);
        else if(id == ActIconID.SHARE)
        {
            let bol1:boolean = Manager.model.getshare().canShare;
            let cvo:ShareCVO = ShareCVO.cvo();
            let bol2:boolean = !cvo.isReward;
            if(bol1 && bol2) icon = new ShareIcon2(this._imageContainer01,this._imageContainer,this._conainer1);
        }
        else if(id == ActIconID.SRV_RANK)
        {
            let i:number = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
            if(i<8)icon = new SrvRankIcon2(this._imageContainer01,this._imageContainer,this._conainer1);
            else Manager.model.getActIcon().removeID(id);
        }
        else if(id == ActIconID.RECHARGE_ACTIVITY)
        {
            let any:any[] = Manager.model.getrechargeActivity().getTitleTabList();
            if(any.length > 0)icon = new RechargeActivityIcon2(this._imageContainer01,this._imageContainer,this._conainer1);
    }
        else icon = new ActBaseIcon2(this._imageContainer01,this._imageContainer,this._conainer1);
        if(icon)
        {
            icon.setID(id);
            this._icons.push(icon);
        }
    }

    private getIconByID(id:number):ActBaseIcon2
    {
		let icon:ActBaseIcon2;
        let len:number = this._icons.length - 1;
        let icons:ActBaseIcon2[] = this._icons;
        for(let i:number=len; i >= 0; i--)
        {
            icon = icons[i];
            if(icon.getCVO().id == id) return icon;
        }
        return null;
    }

    public getGuidePos(id:number):egret.Point
    {
        let icon:ActBaseIcon2 = this.getIconByID(id);
        if(icon != null)
        {
            let display:egret.DisplayObject = icon.getIcon();
            if(display) return display.parent.localToGlobal(display.x,display.y);
        }
        return new egret.Point();
    }

	public updateIcon(cvo:DailyActivityCVO, isRemove:boolean):void
	{
        let icon:ActBaseIcon2 = this.getIconByID(cvo.id);
        let index:number;
        if(isRemove)
        {
            if(icon)
            {
                index = this._icons.indexOf(icon);
                icon.dispose();
                this._icons.splice(index,1);
            }
        }
        else
        {
            if(icon)icon.setCVO(cvo);
            else this.createIcon(cvo.id);
        }
        this.invalidate("drawSort");
	}

    protected draw():void
    {
        super.draw();
        if(this.isInvalid("drawSort"))this.drawSort();
    }

    protected drawAll():void
    {
        super.drawAll();
        if(this._icons.length > 0)this.drawSort();
    }

    private drawSort():void
    {
		let icon:ActBaseIcon2;
        let len:number = this._icons.length;
        let icons:ActBaseIcon2[] = this._icons;
        if(icons.length <= 0)return;
        this._icons.sort(this.sortByIndex);
		if(icons.length > 0)
		{
            if(this._type == ActivityIcon.RIGHT)
			{
				for(let j = 0; j < icons.length; j++)
				{
					icon = icons[j];
                    icon.move(0,472 - 118 * j)
				}
			}
            else if(this._type == ActivityIcon.TOP)
			{
				let y:number;
				for(let k = 0; k < icons.length; k++)
				{
					icon = icons[k];
					y = k > 5 ? 118 : 0;
                    icon.move(100 * (k % 6),y);
				}
			}
		}
        if(this._type == ActivityIcon.TOP)this.updateBtn();
    }

    private sortByIndex(a:ActBaseIcon2, b:ActBaseIcon2):number
    {
        return a.getCVO().sortIndex > b.getCVO().sortIndex ? 1 : -1;
    }

    private updateBtn():void
    {
        if(this._icons.length <= 3)
        {
            if(this._btn != null)
            {
                Manager.pool.push(this._btn);
                this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
                this._btn = null;
            }
        }
        else 
        {
            if(this._btn == null)
            {
                this._btn = BitmapRes.create(this._visible ? "main_minBtn_png" : "main_maxBtn_png",-68,20);
                this._btn.touchEnabled = true;
                this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
                this._btnContainer.addChild(this._btn);
            }
        }
    }

    private onClickHandler(e:egret.TouchEvent):void
    {
		if(this._isMoving) return;
		this.switch(!this._visible);
    }
}