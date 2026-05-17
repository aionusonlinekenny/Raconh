/**
 * 火眼金睛主界面
 * liangyan
 * create 2018-03-23
*/
class FireEyeView extends UIComponent
{
    private _btn:Button;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("fireEye", "FireEyeViewSkin");
    }

    protected configUI():void
    {
        super.configUI();
    }

    protected addEvent():void
    {
        super.addEvent();
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    }

    protected removeEvent():void
    {
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        super.removeEvent();
    }

    protected drawAll():void
    {
        super.drawAll();
    }

    protected draw():void
    {
        super.draw();
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        let actCvo = Manager.model.getActIcon().getIDByType(ActIconID.FIREEYE);
        if(actCvo)
        {
            if(!actCvo.isAllCondSatisfy(true)) return;
            else if(!actCvo.isInTime)
            {
                FloatTips.addTips(LangCVO.getContent("activity10"), Color.RED);//活动未开启
                return;
            }
            else if(Manager.model.self.canJoinActive(true))
            {
                if(Manager.model.self.attrInfo.bfType != BFType.FIRE_EYE) Manager.control.getFireEye().match();
                else Manager.link.link(LinkType.PANEL_FIRE_EYE, 1);
                Manager.view.hide(ViewID.FireEyePanel);
            }
        }
    }

    public dispose():void
    {
        super.dispose();
    }
}