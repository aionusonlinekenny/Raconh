/**
 * 新手剧情滚动字幕
 * liangyan
 * create 2018-03-12
*/
class RollingWordsView extends egret.DisplayObjectContainer implements IViewManager
{
    private _words:Label;
    private _msgs:string[];

    public constructor()
    {
        super();
    }

    public show():void
    {
        if(!this.parent)
        {
            this._msgs = LangCVO.getContent("copy27").split("");

            this._words = new Label();
            this._words.width = 700;
            this._words.textAlign = "left";
            this._words.lineSpacing = 10;
            this._words.fontFamily = Manager.config.defaultFont;
            this._words.size = 30;
            this.onResizeHandler(null);
            this.addChild(this._words);

            Manager.render.add(this.render, this, 90);

            Manager.view.setModalAlpha(1);
            Manager.layer.tipsLayer.addChild(this);
            GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        }
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        if(this._words)
        {
            this._words.x = Math.round(Manager.global.gameMain.stage.stageWidth - this._words.width) / 2;
            this._words.y = Math.round(Manager.global.gameMain.stage.stageHeight - this._words.height) / 2;
        }
    }

    private render(interval:number):void
	{
        if(this._words == null) return;
        this._words.appendText(this._msgs.shift());
        if(this._msgs.length <= 0)
        {
            Manager.render.remove(this.render, this);
            Manager.render.add(this.render2, this, 2000, 1);
        }
	}
    
    private render2(interval:number):void
	{
        Manager.render.remove(this.render2, this);
        Manager.view.hide(ViewID.RollingWordsView);
    }
    
    public hide():void
    {
        Manager.control.getMap().cmdEnterMap(6001);
        Manager.view.setModalAlpha(0.8);
        if(this.parent) this.dispose();
    }

    public dispose():void
    {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        Manager.render.remove(this.render, this);
        Manager.render.remove(this.render2, this);
        this._words.dispose();
        this._words = null;
        this._msgs = null;
    }
}