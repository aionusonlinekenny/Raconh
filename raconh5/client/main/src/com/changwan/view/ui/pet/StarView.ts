/**
 * 星星视图
 * liangyan
 * create 2017-12-18
*/
class StarView extends UIComponent
{
    private _sum:number;
    private _gap:number;
    private _greyName:string;
    private _brightName:string;

    private _stars:BitmapRes[];

    private _num:number;

    public constructor()
    {
        super();
        this.skinName = "";
    }

    protected configUI():void
    {
        super.configUI();
    }

    protected addEvent():void
    {
        super.addEvent();
    }

    protected removeEvent():void
    {
        super.removeEvent();
    }

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
                this._stars[i].reuse(this._brightName, null, null);
            }
        }
        else
        {
            for(let i = this._sum - 1; i >= this._num; i--)
            {
                this._stars[i].reuse(this._greyName, null, null);
            }
        }
    }

    private clearStar(isRemove:boolean = false):void
    {
        if(!this._stars) return;
        this._stars.forEach((child, i) => 
        {
            if(isRemove) ObjectUtil.remove(child);
            Manager.pool.push(child);
            child = null;
        })
        this._stars.length = 0;
    }
    /**更新星星，num=0代表置灰所有 */
    public update(num:number):void
    {
        this._num = num;
        this.invalidate(InvalidationType.DATA);
    }

    public reuse(sum:number, gap:number, greyName:string = "common_star49_grey_png", brightName:string = "common_star49_bright_png"):void
    {
        this._sum = sum ? sum : 0;
        this._gap = gap ? gap : 0;
        this._greyName = greyName;
        this._brightName = brightName;
        this._stars = [];
        super.reuse();
    }

    public unuse():void
    {
        super.unuse();
        this.clearStar();
        this._sum = this._gap = this._num = 0;
        this._greyName = this._brightName = "";
    }

    public dispose():void
    {
        super.dispose();
        this.clearStar(true);
        this._sum = this._gap = this._num = 0;
        this._greyName = this._brightName = "";
    }
}