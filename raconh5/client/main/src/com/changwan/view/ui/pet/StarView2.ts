/**
 * 星星视图
 * liangyan
 * create 2017-12-18
*/
class StarView2 extends RenderSprite
{
    private _sum:number;
    private _gap:number;
    private _greyName:string;
    private _brightName:string;
    private _stars:BitmapRes[];
    private _num:number;

    public constructor(sum:number, gap:number, greyName:string = "common_star49_grey_png", brightName:string = "common_star49_bright_png")
    {
        super();
        this._sum = sum ? sum : 0;
        this._gap = gap ? gap : 0;
        this._greyName = greyName;
        this._brightName = brightName;
        this._stars = [];
        this.start();
        this.addEvent();
    }

    // public reuse(sum:number, gap:number, greyName:string = "common_star49_grey_png", brightName:string = "common_star49_bright_png"):void
    // {
    //     this._sum = sum ? sum : 0;
    //     this._gap = gap ? gap : 0;
    //     this._greyName = greyName;
    //     this._brightName = brightName;
    //     this._stars = [];
    //     super.reuse();
    // }

    // public unuse():void
    // {
    //     super.unuse();
    //     this.clearStar();
    //     this._sum = this._gap = this._num = 0;
    //     this._greyName = this._brightName = "";
    // }

    protected drawAll():void
    {
        super.drawAll();
        this.drawLayout();
        this.drawData();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.LAYOUT)) this.drawLayout();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
    }

    private drawLayout():void
    {
        let star:BitmapRes;
        for(let i = 0; i < this._sum; i++)
        {
            star = Manager.pool.create(BitmapRes, this._greyName);
            star.x = this._gap * i;
            this.addChild(star);
            this._stars.push(star);
        }
    }

    private drawData():void
    {
        if(this._sum < this._num) this._num = this._sum;
        if(this._num > 0)
        {
            for(let i = 0; i < this._num; i++)
            {
                this._stars[i].source = (this._brightName);
            }
        }
        else
        {
            for(let i = this._sum - 1; i >= this._num; i--)
            {
                this._stars[i].source = (this._greyName);
            }
        }
    }

    private clearStar():void
    {
        if(!this._stars) return;
        let len = this._stars.length;
        for(let i:number = 0; i < len; i ++)
        {
            Manager.pool.push(this._stars[i]);
        }
        this._stars.length = 0;
    }
    /**更新星星，num=0代表置灰所有 */
    public update(num:number):void
    {
        this._num = num;
        this.invalidate(InvalidationType.DATA);
    }

    public dispose():void
    {
        super.dispose();
        this.clearStar();
        this._sum = this._gap = this._num = 0;
        this._greyName = this._brightName = "";
        this._stars = null;
    }
}