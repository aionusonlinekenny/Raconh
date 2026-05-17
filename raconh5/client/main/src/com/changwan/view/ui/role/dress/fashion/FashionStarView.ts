/**
 * 服饰星阶视图
 * luzh
 * create 2017-12-18
*/
class FashionStarView extends Sprite
{
    private _back:BitmapRes;
    private _stars:Array<BitmapRes>;
    private _curLv:number;

    private STAR_W:number = 25;
    private STAR_H:number = 23;

    public constructor()
    {
        super();
        this.touchEnabled = this.touchChildren = false;

        this._back = BitmapRes.create("skill_back1_png", 0, 0, 30, 30);
        this._back.scale9Grid = new egret.Rectangle(8, 6, 126, 22);
        this._back.height = 30;
        this.addChild(this._back);

        this._stars = [];
        let star:BitmapRes;
        for(var i:number=0; i<FashionStarCVO.MAX_STAR; i++)
        {
            star = BitmapRes.create("common_star_grey_png", 0, 0, this.STAR_W, this.STAR_H);
            this.addChild(star);
            this._stars.push(star);
        }
    }

    public set level(value:number)
    {
        if(this._curLv == value) return;
        this._curLv = value;
        for(var i:number=0; i<FashionStarCVO.MAX_STAR; i++)
        {
            this._stars[i].source = i<this._curLv ? "common_star_bright_png" : "common_star_grey_png";
        }
    }

    public set backAlpha(value:number)
    {
        this._back.alpha = value;
    }

    public reuse(padding:number, width:number, height:number=30):void
    {
        super.reuse();
        this._back.width = width;
        this._back.height = height;
        let starCount:number = FashionStarCVO.MAX_STAR;
        let starsW:number = this.STAR_W * starCount + padding * (starCount-1);
        let startX:number = (width - starsW) / 2;
        for(var i:number=0; i<starCount; i++)
        {
            this._stars[i].x = startX + (this.STAR_W + padding) * i;
            this._stars[i].y = (height - this.STAR_H) / 2 - 1; 
        }
    }

    public unuse():void
    {
        super.unuse();
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._back);
        if(this._back)
            Manager.pool.push(this._back);
        this._back = null;
        if(this._stars)
        {
            for(let i:number=0; i<this._stars.length; i++)
            {
                Manager.pool.push(this._stars[i]);
                this._stars[i] = null;
            }
        }
        this._stars = null;
    }
}