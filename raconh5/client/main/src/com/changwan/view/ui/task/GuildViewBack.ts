/**
 * 引导界面
 * luzh 
 * 2018.2.26
 */
class GuildViewBack extends Sprite
{
    private _centerRect:eui.Image;
    private _leftRect:eui.Image;
    private _topRect:eui.Image;
    private _rightRect:eui.Image;
    private _bottomRect:eui.Image;

    public constructor()
    {
        super();
    }
    

    protected start():void
    {
        super.start();
        this._centerRect = Manager.pool.create(eui.Image);
        // this._centerRect.source = "task_guild_circle_png";
        this.addChild(this._centerRect);

        this._leftRect = Manager.pool.create(eui.Image);
        // this._leftRect.source = "task_guild_rect_png";
        this.addChild(this._leftRect);

        this._topRect = Manager.pool.create(eui.Image);
        // this._topRect.source = "task_guild_rect_png";
        this.addChild(this._topRect);

        this._rightRect = Manager.pool.create(eui.Image);
        // this._rightRect.source = "task_guild_rect_png";
        this.addChild(this._rightRect);

        this._bottomRect = Manager.pool.create(eui.Image);
        // this._bottomRect.source = "task_guild_rect_png";
        this.addChild(this._bottomRect);

        this.drawRect();
        
        this.touchEnabled = true;
    }

    private drawRect():void
    {
        let container:egret.DisplayObjectContainer = Manager.pool.create(egret.DisplayObjectContainer);
        let rect:egret.Shape = Manager.pool.create(egret.Shape);
        rect.graphics.beginFill(0, 0.5);
        rect.graphics.drawRect(-100,-100,200,200);
        rect.graphics.endFill();
        container.addChild(rect);
        
        let circle:egret.Shape = Manager.pool.create(egret.Shape);
        circle.graphics.beginFill(0, 1);
        circle.graphics.drawCircle(-0,-0,45);
        circle.graphics.endFill();
        circle.blendMode = egret.BlendMode.ERASE;
        container.addChild(circle);

        let rt:RenderTexture = new RenderTexture();
        rt.drawToTexture(container, new egret.Rectangle(-50, -50, 100, 100));
        this._centerRect.texture = rt;

        rt = new RenderTexture();
        rt.drawToTexture(container, new egret.Rectangle(-100, -100, 50, 50));
        this._leftRect.texture = rt;
        this._topRect.texture = rt;
        this._rightRect.texture = rt;
        this._bottomRect.texture = rt;
    }

    public setPos(tempX:number, tempY:number):void
    {
        tempX = Math.floor(tempX);
        tempY = Math.floor(tempY);
        let halfW:number = this._centerRect.width / 2;
        let left:number = tempX - halfW;
        let right:number = tempX + halfW;
        let top:number = tempY - halfW;
        let bottom:number = tempY + halfW;

        this._centerRect.x = left;
        this._centerRect.y = top;

        this._leftRect.x = 0;
        this._leftRect.y = top;
        this._leftRect.width = left;
        this._leftRect.height = bottom - top;

        this._topRect.x = 0;
        this._topRect.y = 0;
        this._topRect.width = Manager.config.gameWidth;
        this._topRect.height = top;

        this._rightRect.x = right;
        this._rightRect.y = top;
        this._rightRect.width = Manager.config.gameWidth - right;
        this._rightRect.height = bottom - top;
        
        this._bottomRect.x = 0;
        this._bottomRect.y = bottom;
        this._bottomRect.width =  Manager.config.gameWidth;
        this._bottomRect.height = Manager.config.gameHeight - bottom;
    }
    
    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._centerRect, this._leftRect, this._topRect, this._rightRect, this._bottomRect);
        this._centerRect = null;
        this._leftRect = null;
        this._topRect = null;
        this._rightRect = null;
        this._bottomRect = null;
    }
}