/**
 * 掉落珍稀物品弹出框
 * luzhihong
 * create 2017-11-20
 */
 class DropAlert extends UIComponent
{
    private _back:eui.Image;
    private _title:eui.Image;
    private _goodItems:Array<Goods>;
    
    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("drop", "DropAlertSkin");
        this.touchEnabled = this.touchChildren = false;
    }
    
    protected configUI():void
    {
        super.configUI();
        this.initGoodsItem();
    }

    protected addEvent():void
    {
        super.addEvent();
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        super.removeEvent();
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = (Manager.config.gameWidth - 480) >> 1;
        this.y = 830;
	}

    private initGoodsItem():void
    {
        if(!this._goodItems)
        {
            this._goodItems = [];
            var item:Goods;
            for(var i:number=0; i<3; i++)
            {
                item = Manager.pool.create(Goods); 
                item.y = 59;
                this.addChild(item);
                this._goodItems.push(item);
            }
        }
    }

    public reuse(infos:Array<ItemsModelInfo>):void
	{
        this.initGoodsItem();
        this.unuse();
        super.reuse();

        Manager.layer.tipsLayer.addChild(this);
        this._back.width = 100;
        this._title.alpha = 0;
        //停留时间
        let stayTime:number = 1000;

        let count:number = infos.length;
        let posArr:Array<number>
        if(count == 1) posArr = [168];
        else if(count == 2) posArr = [89, 246];
        else posArr = [42, 168, 295];
        for(var i:number=0; i<3; i++)
        {
            if(i<count)
            {
                this._goodItems[i].visible = true;
                this._goodItems[i].data = infos[i];
                this._goodItems[i].x = posArr[i];
                egret.Tween.get(this._goodItems[i]).wait(400 + 100 * i).to({alpha:1}, 200)
                                                   .wait(stayTime - 200 * i).to({alpha:0}, 200);
            } 
            else this._goodItems[i].visible = false;
        }

        egret.Tween.get(this._back).to({width:480}, 200)
                                   .wait(stayTime + 700).to({width:100}, 200)
                                   .call(this.callback, this);


        egret.Tween.get(this._title).wait(200).to({alpha:1}, 150)
                                    .wait(stayTime + 400).to({alpha:0}, 150);

        this.onResizeHandler(null);
    }

    private callback():void
    {
        Manager.control.getDrop().hideAlert();
    }

    public unuse():void
    {
        super.unuse();
        egret.Tween.removeTweens(this._back);
        egret.Tween.removeTweens(this._title);
        for(var i:number=0; i<3; i++)
        {
            this._goodItems[i].alpha = 0;
            egret.Tween.removeTweens(this._goodItems[i]);
        }
    }

    public dispose():void
    {
        egret.Tween.removeTweens(this._back);
        egret.Tween.removeTweens(this._title);
        for(var i:number=0; i<3; i++)
        {
            egret.Tween.removeTweens(this._goodItems[i]);
            Manager.pool.push(this._goodItems[i]); 
        }
        super.dispose();
        this._back = null;
        this._title = null;
        this._goodItems = null;
    }

}