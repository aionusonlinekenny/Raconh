/**
 * luzhihong
 * create 2017-11-01
 */
class WorldMapItem extends ItemRenderer
{
    private _cvo:MapCVO;
    private _back:eui.Image;
    private _icon:eui.Image;
    private _labelHook:eui.Image;
    private _txtName:Label;
    private _txtOpen:Label;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("worldMap", "WorldMapItemSkin");
    }

    protected createChildren():void
    {
        super.createChildren();
        this.addEvent();
    }

    protected dataChanged():void
    {
        this._cvo = this.data as MapCVO;
        if(this._cvo == null) return;
        this._txtName.text = this._cvo.name;
        //var verseInfo:TaskSectionCvoInfo = TaskCVO.getVerselInfo(this._cvo.chapter);
        this._txtOpen.text = LangCVO.getContent("worldMap2", this._cvo.chapter);
        this.onEnterMap();
    }

    private addEvent():void
    {
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        // GameDispatcher.getInstance().addEventListener(GlobalEvent.ENTER_SCENE, this.onEnterMap, this);
    }

    private removeEvent():void
    {
        // this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        // GameDispatcher.getInstance().addEventListener(GlobalEvent.ENTER_SCENE, this.onEnterMap, this);
    }

    // private onClickHandler(e:egret.TouchEvent):void
    // {
    //     if(this._cvo.id == Manager.model.getMap().getId()) return;
    //     Manager.control.getMap().cmdEnterMap(this._cvo.id);
    //     Manager.view.hide(ViewID.MapPanel);
    // }

    private onEnterMap(e:GlobalEvent = null):void
    {
        let curVerseMapID:number = Manager.model.getTask().curVerseMapID;
        if(this._cvo.id == curVerseMapID)
        {
            this._labelHook.visible = true;
            this._icon.source = "world_icon_boss_png";
            this._back.source = "common_wordBg_selected_png";
            this._txtName.textColor = this._txtOpen.textColor = 0x7C6E62;
        }
        else if(this._cvo.id < curVerseMapID)
        {
            this._labelHook.visible = false;
            this._icon.source = "world_icon_boss_png";
            this._back.source = "common_wordBg_normal_png";
            this._txtName.textColor = this._txtOpen.textColor = 0x7C6E62;
        }
        else
        {
            this._labelHook.visible = false;
            this._icon.source = "world_icon_lock_png";
            this._back.source = "common_wordBg_disables_png";
            this._txtName.textColor = this._txtOpen.textColor = 0x666666;
        }
    }

    public dispose():void
    {
        this.removeEvent();
		super.dispose();
        this._cvo = null;
        this._back.parent.removeChild(this._back);
        this._back = null;
        this._icon.parent.removeChild(this._icon);
        this._icon = null;
        this._labelHook.parent.removeChild(this._labelHook);
        this._labelHook = null;
        this._txtName.dispose();
        this._txtName = null;
        this._txtOpen.dispose();
        this._txtOpen = null;
	}
}