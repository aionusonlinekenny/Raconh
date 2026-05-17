/**
 * boss敌人
 * luzh
 * create 2017-12.25
*/
class BossEnemyItem extends UIComponent
{
    private _head:BitmapRemote;
    private _bar:eui.Image;
    private _barMask:eui.Image;
    private _txtPower:Label;
    private _info:BossPlayerInfo;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("boss", "BossEnemyItemSkin");
        this.touchChildren = true;
    }

    protected configUI():void
    {
        super.configUI();
        this._bar.mask = this._barMask;
    }

    public set info(value:BossPlayerInfo)
    {
        if(this._info != value)
        {
            this._info = value;
            this._head.load(Manager.path.getRoleHeadPath(1, this._info.career));
            // this._txtPower.text = LangCVO.getContent("boss12") + GameUtil.getNumShortStr(this._info.power);//12	战力:
            this._txtPower.text = this._info.name;
        } 
        this._barMask.scaleX = this._info.curBlood/this._info.totalBlood;
    }

    protected addEvent():void
    {
        super.addEvent();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }
    protected removeEvent():void
    {
        super.removeEvent();
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    private onClickHandler(e:egret.TouchEvent)
    {
        let info:PlayerGameObjectInfo = Manager.model.getGameobject().getPlayerGameObject(this._info.id);
        if(info) Manager.model.self.updateTarget(info);
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.disposes(this._head, this._bar, this._barMask, this._txtPower);
        this._head = null;
        this._bar = null;
        this._barMask = null;
        this._txtPower = null;
        this._info = null;
    }
}