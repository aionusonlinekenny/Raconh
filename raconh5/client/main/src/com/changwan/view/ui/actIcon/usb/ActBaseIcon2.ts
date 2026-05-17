/**
 * 活动基础图标
 * liangyan
 * create 2017-12-23
 * @update devil 2018-04-15
*/
class ActBaseIcon2 extends BaseRender implements cw.IDispose
{
    private _imageContainer:egret.DisplayObjectContainer;
    private _conainer1:egret.DisplayObjectContainer;
    private _imageContainer01:egret.DisplayObjectContainer;

    protected _icon:BitmapRes;
    private _txt:TextField;
    private _redIcon:BitmapRes;
    private _inTime:BitmapRes;

    protected _cvo:DailyActivityCVO;

    private readonly TEXT = "drawText";
    private readonly ICON = "drawIcon";
    private readonly RED_ICON = "drawRedIcon"

    public constructor(imageContainer01:egret.DisplayObjectContainer,imageContainer:egret.DisplayObjectContainer,container1:egret.DisplayObjectContainer)
    {
        super();
        this._imageContainer01 = ObjectUtil.createConainer();
        imageContainer01.addChild(this._imageContainer01);
        this._imageContainer = ObjectUtil.createConainer();
        imageContainer.addChild(this._imageContainer);
        this._conainer1 = ObjectUtil.createConainer();
        container1.addChild(this._conainer1);
        this.start();
    }

    public getIcon():egret.DisplayObject
    {
        return this._icon;
    }

    protected dispatchRender():void
    {
        if(this._cvo)super.dispatchRender();
    }

    public move(x:number,y:number):void
    {
        this._imageContainer01.x = x;
        this._imageContainer01.y = y;
        this._imageContainer.x = x;
        this._imageContainer.y = y;
        this._conainer1.x = x;
        this._conainer1.y = y;
    }

    public setIsInTime(value:boolean):void
    {
		if(value)
		{
			if(this._inTime == null) 
            {
                this._inTime = BitmapRes.create("common_jinxingzhong_png");
                this._imageContainer.addChild(this._inTime);
            }
		}
		else 
        {
            if(this._inTime != null)
            {
                Manager.pool.push(this._inTime);
                this._inTime = null;
            }
        }
    }

    private get txt():TextField
    {
        if(this._txt == null)
        {
            this._txt = TextField.create(118,22,0xffffff,19,"center");
            this._txt.y = 106;
            this._txt.fontFamily = Manager.config.defaultFont;
            this._txt.stroke = 2;
            this._txt.strokeColor = 0;
            this._conainer1.addChild(this._txt);
        }
        return this._txt;
    }

    private update(interval:number):void
    {
        let left:number = this._cvo.time - Manager.model.getLogin().serverTimeInfo.serverTime/1000;
        if(left <= 0)
        {
            Manager.render.remove(this.update,this);
            Manager.model.getActIcon().removeID(this._cvo.id);
        }
        else
        {
            let str = cw.DateUtil.formatStr(left, cw.DateUtil.LEFT_HH_MM_SS, true);
            str = HtmlUtil.addColorTag(str, Color.GREEN_STR);
            HtmlUtil.setTextFlow(this.txt, HtmlUtil.addBTag(str));
        }
    }

    private drawText():void
    {
        if(!this._cvo) return;
        Manager.render.remove(this.update,this);
        if(this._cvo.type != DailyActivityCVO.SHOW_TYPE_ALWAYS)
        {
            if(this._cvo.status == DailyActivityCVO.STATE_IN)Manager.render.add(this.update,this,1000);
            else if(this._cvo.iconLabel != "")HtmlUtil.setTextFlow(this.txt, HtmlUtil.addBTag(this._cvo.iconLabel));
        }
    }

    private drawIcon():void
    {
        if(!this._cvo) return;
        if(this._icon != null)
        {
            this.removeEvent();
            Manager.pool.push(this._icon);
            this._icon = null;
        }
        this._icon = BitmapRes.create("actIcon" + this._cvo.resID.toString() + "_png");
        this._icon.touchEnabled = true;
        this.addEvent();
        this._imageContainer01.addChild(this._icon);
    }

    protected drawAll():void
    {
        super.drawAll();
        if(this._cvo)
        {
            this.drawText();
            this.drawIcon();
            this.drawRedIcon();
        }
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(this.TEXT)) this.drawText();
        if(this.isInvalid(this.ICON)) this.drawIcon();
        if(this.isInvalid(this.RED_ICON))this.drawRedIcon();
    }

    private drawRedIcon():void
    {
        if(this.hasRedIcon())
		{
			if(this._redIcon == null) 
            {
                this._redIcon = BitmapRes.create("main_red_icon_png",70,10);
                this._imageContainer.addChild(this._redIcon);
            }
			
		}
		else
        {
            if(this._redIcon != null)
            {
                Manager.pool.push(this._redIcon);
                this._redIcon = null;
            }
        }
    }

    protected hasRedIcon():boolean
    {
        return false;
    }


    public setCVO(value:DailyActivityCVO):void
    {
        if(this._cvo == value) return;
        this._cvo = value;
        this.invalidate(InvalidationType.ALL);
    }

    public setID(id:number):void
    {
        if(this._cvo && this._cvo.id == id) return;
        this.setCVO(DailyActivityCVO.getCVO(id));
    }

    public getCVO():DailyActivityCVO
    {
        return this._cvo;
    }

    protected __drawRed(e:BaseEvent):void
    {
        this.invalidate(this.RED_ICON);
    }

    private onTouchBeginHandler(e:egret.TouchEvent):void
    {
        this._icon.filters = [FilterUtil.getBrightFilter(50)];
    }

    private onTouchEndHandler(e:egret.TouchEvent):void
    {
        this._icon.filters = null;
    }

    protected onTouchHandler(e:egret.TouchEvent):void
    {
        if(!this._cvo || !this._cvo.isAllCondSatisfy(true)) return;
        let arr = this._cvo.viewStr.split("|");
        if(!arr || arr.length <= 0) return;
        let linkID = Number(arr[0]);
        switch(linkID)
        {
            case LinkType.PANEL_SHOP:
                if(!OpenCVO.isOpen(OpenConst.ID_STORE, true)) return;
                break;
            case LinkType.PANEL_ARTIFACT:
                if(!OpenCVO.isOpen(OpenConst.ID_LING_YAN_GE, true)) return;
                break;
            case LinkType.PANEL_CASHCOW:
                if(!OpenCVO.isOpen(OpenConst.ID_CASHCOW, true)) return;
                break;
            case LinkType.PANEL_SYSPRIVILEGE:
                if(!OpenCVO.isOpen(OpenConst.ID_PRIVILEGE_CARD, true) || !OpenCVO.isOpen(OpenConst.ID_INVEST, true)) return;
                break;
            case LinkType.PANEL_ACTIVITY:
                if(!OpenCVO.isOpen(OpenConst.ID_DAILY_TASK, true)) return;
                break;
            case LinkType.PANEL_BOSS:
                if(!OpenCVO.isOpen(OpenConst.ID_PRIVATE_BOSS, true)) return;
                break;
            case LinkType.PANEL_RECHARGE:
                if(!OpenCVO.isOpen(OpenConst.ID_RECHARGE_ACTIVITY, true)) return;
                break;
            case LinkType.PANEL_RANK:
                if(!OpenCVO.isOpen(OpenConst.ID_RANK, true)) return;
                break;
            case LinkType.PANEL_INVEST:
                if(!OpenCVO.isOpen(OpenConst.ID_INVEST, true)) return;
                break;
            case LinkType.PANEL_MATERIAL:
                if(!OpenCVO.isOpen(OpenConst.ID_MATERIAL, true)) return;
                break;
        }

        if(linkID == LinkType.PANEL_SHOP || linkID == LinkType.PANEL_SHOP_MULTE)
        {
            if(!Manager.view.isOpening(ViewID.ShopPanel) && !Manager.view.isOpening(ViewID.ShopPanelMulte))
            {
                Manager.link.linkStr(this._cvo.viewStr);
            }
        }
        else if(linkID == LinkType.PANEL_BOSS)
        {
            if(!Manager.model.getBoss().privateChallenge && Manager.model.getBoss().publicChallenge) Manager.link.link(LinkType.PANEL_BOSS, 1);
            else Manager.link.link(LinkType.PANEL_BOSS, 0);
        }
        else Manager.link.linkStr(this._cvo.viewStr);
    }

    protected addEvent():void
    {
        this._icon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginHandler, this);
        this._icon.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndHandler, this);
        this._icon.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEndHandler, this);
        this._icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getActIcon().addEventListener(ActIconEvent.SINGLE_UPDATE, this.updateText, this);
        Manager.model.getActIcon().addEventListener(ActIconEvent.LIST_UPDATE, this.updateText, this);
    }

    protected removeEvent():void
    {
        this._icon.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginHandler, this);
        this._icon.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndHandler, this);
        this._icon.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEndHandler, this);
        this._icon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getActIcon().removeEventListener(ActIconEvent.SINGLE_UPDATE, this.updateText, this);
        Manager.model.getActIcon().removeEventListener(ActIconEvent.LIST_UPDATE, this.updateText, this);
    }

    private updateText(e:ActIconEvent):void
    {
        if(e.type == ActIconEvent.SINGLE_UPDATE && e.params != this._cvo.id) return;
        this.invalidate(this.TEXT);
    }

    public dispose():void
    {
        super.dispose();
        Manager.render.remove(this.update,this);
        if(this._icon != null)
        {
            Manager.pool.push(this._icon);
            this.removeEvent();
            this._icon = null;
        }
        if(this._txt != null)
        {
            Manager.pool.push(this._txt);
            this._txt = null;
        }
        if(this._inTime != null)
        {
            Manager.pool.push(this._inTime);
            this._inTime = null;
        }
        if(this._redIcon != null)
        {
            Manager.pool.push(this._redIcon);
            this._redIcon = null;
        }
        this._cvo = null;
        this._imageContainer.parent.removeChild(this._imageContainer);
        this._imageContainer = null;
        this._conainer1.parent.removeChild(this._conainer1);
        this._conainer1 = null;
        this._imageContainer01.parent.removeChild(this._imageContainer01);
        this._imageContainer01 = null;
    }
}