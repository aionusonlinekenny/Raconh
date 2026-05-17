/**
 * 魔神降临抢夺列表
 * liangyan
 * create 2018-04-10
*/
class DevilGrabListView extends UIComponent implements IViewManager
{
    private _grabBtn:Button;
    private _cdTxt:Label;
    private _items:DevilGrabItem[];

    private _cd:number;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("devil", "DevilGrabListViewSkin");
    }

    protected configUI():void
    {
        super.configUI();
        this._items = [];
    }

    protected addEvent():void
    {
        super.addEvent();
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._grabBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getDevil().addEventListener(DevilEvent.DEVIL_GRAB_LIST_UPDATE, this.onUpdateHandler, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._grabBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getDevil().removeEventListener(DevilEvent.DEVIL_GRAB_LIST_UPDATE, this.onUpdateHandler, this);
    }

    protected initData():void
    {
        super.initData();
        this.onResizeHandler(null);
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
        let infos = Manager.model.getDevil().grabInfos;
        let infoLen = infos != null ? infos.length : 0;
        if(infoLen > 5) infoLen = 5;
        let item:DevilGrabItem;
        let offsetX = 0;
        let offsetY = 102;
        this.clearItem();
        for(let i = 0; i < infoLen; i++)
        {
            item = Manager.pool.create(DevilGrabItem);
            item.info = infos[i];
            item.x = offsetX;
            item.y = offsetY + i * 150;
            this.addChild(item);
            this._items.push(item);
        }
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        this.x = Manager.global.gameMain.stage.stageWidth - 150;
        // this.x = 0;
        this.y = 220;
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        Manager.render.add(this.askGrabInfo, this, 500, 1, null, true);
    }

    private onUpdateHandler(e:DevilEvent):void
    {
        let now = Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        this._cd = Math.round(Manager.model.getDevil().canGrabTime - now);
        if(this._cd > 0) Manager.render.add(this.countDown, this, 1000, 0, null, true);
        else
        {
            this._cdTxt.text = LangCVO.getContent("devil12");//可抢夺
            this._cdTxt.textColor = Color.GREEN2;
        }
        this.invalidate(InvalidationType.DATA);
    }

    private countDown():void
    {
        this._cd--;
        if(this._cd <= 0)
        {
            Manager.render.remove(this.countDown, this);
            this._cdTxt.text = LangCVO.getContent("devil12");//可抢夺
            this._cdTxt.textColor = Color.GREEN2;
            this.onTouchHandler(null);
        }
        else
        {
            this._cdTxt.text = LangCVO.getContent("devil13", this._cd);//冷却:{0}秒
            this._cdTxt.textColor = Color.RED;
        }
    }

    private askGrabInfo():void
    {
        Manager.control.getDevil().askGrabList();
    }

    private clearItem():void
    {
        let len = this._items != null ? this._items.length : 0;
        for(let i = 0; i < len; i++)
        {
            Manager.pool.push(this._items[i]);
            this._items[i] = null;
        }
        this._items = [];
    }

    public show():void
    {
        if(this.parent == null) Manager.layer.tipsLayer.addChildAt(this, 0);
    }

    public hide():void
    {
        if(this.parent != null) this.dispose();
    }

    public dispose():void
    {
        Manager.render.remove(this.askGrabInfo, this);
        Manager.render.remove(this.countDown, this);
        super.dispose();
        ObjectUtil.removes(this._grabBtn, this._cdTxt);
        this._grabBtn.dispose();
        this._grabBtn = null;
        this._cdTxt.dispose();
        this._cdTxt = null;

        this.clearItem();
    }
}