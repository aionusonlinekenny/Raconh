/**
 * drop对象信息类
 * luzh
 * update 2017-11-17
*/
class DropGameObject extends GameObject
{
    private _dropInfo:DropGameObjectInfo;
    private _pic:BitmapRemote;
     
    public constructor()
    {
        super();
    }

    public reuse(info:GameObjectInfo):void
	{
        this._dropInfo = info as DropGameObjectInfo;
        super.reuse(info);
    }

    public unuse():void
    {
        super.unuse();
        egret.Tween.removeTweens(this);
        if(this._pic)
        {
            Manager.pool.push(this._pic);
            this._pic = null;
        }
    }

	protected drawAll():void
	{
        // if(this._shadow)this.removeChild(this._shadow);
		this.move(this._info.x,this._info.y);
        //显示物品
        let path:PathInfo = Manager.path.getIconPath(this._dropInfo.item.imgId, ItemsConst.IMG_SIZE_BIG);
        this._pic = Manager.pool.create(BitmapRemote, path);
        this._pic.scaleX = this._pic.scaleY = 0.7;
        this.addChild(this._pic);

        // var angle = Math.random() * Math.PI;
        // this._pos0 = new Vector2D(this.x, this.y);
        // // let vDic:Vector2D = new Vector2D(50 + 100 * Math.random() - 100 * Math.sin(angle));//方向大小，最小50，随机0-100，上下大小
        // // vDic.angle = angle;
        // // this._pos1 = this._pos0.add(vDic);
        // // this._pos2 = new Vector2D(this._pos1.x, this._pos1.y + 100);

        // this._pos1 = new Vector2D(this._pos0.x, this._pos0.y - 200);
        // let vDic:Vector2D = new Vector2D(150 + 50 * Math.random() - 50 * Math.sin(angle));//方向大小，最小50，随机0-100，上下大小
        // vDic.angle = angle;
        // this._pos2 = this._pos0.add(vDic);
        let temX:number = this._info.x;
        let temY:number = this._info.y;
        let distance:number = 250 ;//* Math.random() + 50; 
        let radius:number = 180;
        let angle = Math.random() * Math.PI * 2;

        if(this._dropInfo.isGet)
        {
            egret.Tween.get(this).to({x: temX + radius * Math.sin(angle) * Math.random()}, 600)
            egret.Tween.get(this).to({y: temY - distance}, 300, egret.Ease.circOut)
                                 .to({y: temY + radius * Math.cos(angle) * Math.random()}, 300, egret.Ease.bounceOut).wait(1000)
                                 .call( this.showFloatTips, this);
        }
        else 
        {
            egret.Tween.get(this).to({x: temX + radius * Math.sin(angle) * Math.random()}, 600)
            egret.Tween.get(this).to({y: temY - distance}, 300, egret.Ease.circOut)
                                 .to({y: temY + radius * Math.cos(angle) * Math.random()}, 300, egret.Ease.bounceOut)
                                 .to({alpha: 0}, 5000).call(this.onComplete, this);
        }
	}

    private showFloatTips():void
    {
        FloatTips.addTips(LangCVO.getContent("item1") + HtmlUtil.addColorTag(this._dropInfo.item.name+" x "+this._dropInfo.count, Color.toColorStr(this._dropInfo.item.color)));
        egret.Tween.get(this).to({x: Manager.model.self.x, y:Manager.model.self.y-60}, 250).call(this.onComplete, this)
    }

    private onComplete():void
    {  
　　     Manager.model.getGameobject().removeGameObject(this.info);
    }
    
	protected disposeSelf():void
	{
		super.disposeSelf();
        egret.Tween.removeTweens(this);
        if(this._pic)
        {
            Manager.pool.push(this._pic);
            this._pic = null;
        }
        this._dropInfo = null;
	}
}
