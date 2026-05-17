/**
 * 游戏杆
 */
class CtrlView extends egret.DisplayObjectContainer implements cw.IPool
{
    public static OFFSET:number = 100;
    public static bigCircleR:number = 50;
    public static smallCircleR:number = 40;

    private bgCircle:egret.Sprite;

    private bigCircle:egret.Sprite;
    private bigCircleX:number = 0;
    private bigCircleY:number = 0;

    private smallCircle:egret.Sprite;
    private smallCircleX:number = 0;
    private smallCircleY:number = 0;

    public constructor()
    {
        super();

        this.initView();
    }

    private initView():void
    {
        this.bgCircle = Manager.pool.create(egret.Sprite);
        this.bgCircle.graphics.beginFill(0x333333, 0.2);
        this.bgCircle.graphics.drawCircle(0,0,CtrlView.OFFSET);
        this.bgCircle.graphics.endFill();
        this.bgCircle.x = CtrlView.OFFSET;
        this.bgCircle.y = CtrlView.OFFSET;
        this.addChild(this.bgCircle);

        this.bigCircle = Manager.pool.create(egret.Sprite);
        this.bigCircle.graphics.beginFill(0x333333, 0);
        this.bigCircle.graphics.drawCircle(0,0,CtrlView.bigCircleR);
        this.bigCircle.graphics.endFill();
        this.bigCircle.x = this.bigCircleX = CtrlView.OFFSET;
        this.bigCircle.y = this.bigCircleY = CtrlView.OFFSET;
        this.addChild(this.bigCircle);

        this.smallCircle = Manager.pool.create(egret.Sprite);
        this.smallCircle.graphics.beginFill(0xcccccc, 0.2);
        this.smallCircle.graphics.drawCircle(0,0,CtrlView.smallCircleR);
        this.smallCircle.graphics.endFill();
        this.smallCircle.x = this.smallCircleX = CtrlView.OFFSET;
        this.smallCircle.y = this.smallCircleY = CtrlView.OFFSET;
        this.addChild(this.smallCircle);
    }

    public onTouch(e:egret.TouchEvent):void
    {
        let flagR:boolean = true;
        let pointX:number = e.stageX - this.x;
        let pointY:number = e.stageY - this.y;

        switch(e.type)
        {
            case egret.TouchEvent.TOUCH_BEGIN:
            case egret.TouchEvent.TOUCH_MOVE:
                if (Math.sqrt(Math.pow((this.bigCircleX - pointX),2) + Math.pow((this.bigCircleY - pointY),2)) <= CtrlView.bigCircleR)
                {
                    flagR = false;
                    this.setSmallCircleXY(pointX,pointY,CtrlView.smallCircleR,this.getRad(this.bigCircleX,this.bigCircleY,pointX,pointY),flagR);
                }
                else
                {
                    flagR = true;
                    this.setSmallCircleXY(this.bigCircleX,this.bigCircleY,CtrlView.bigCircleR,this.getRad(this.bigCircleX,this.bigCircleY,pointX,pointY),flagR);
                }
                let ang:number = Math.atan2(this.bigCircle.y - this.smallCircle.y, this.bigCircle.x - this.smallCircle.x);
                this.movePointHandler(ang);
                break;
            case egret.TouchEvent.TOUCH_END:
                flagR = true;
                this.smallCircle.x = this.bigCircle.x;
                this.smallCircle.y = this.bigCircle.y;
                break;
            case egret.TouchEvent.TOUCH_TAP:
                break;
        }
    }

    public setSmallCircleXY(centerX:number,centerY:number,r:number,rad:number,flag:boolean):void
    {
        if(flag)
        {
            this.smallCircle.x = this.smallCircleX = r * Math.cos(rad) + centerX;
            this.smallCircle.y = this.smallCircleY = r * Math.sin(rad) + centerY;
        }
        else
        {
            this.smallCircle.x = centerX;
            this.smallCircle.y = centerY;
        }
    }

   public getRad(px1:number,py1:number,px2:number,py2:number):number
    {
        let x:number = px2 - px1;
        let y:number = py2 - py1;
        let hyx:number = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
        let cosAngle:number = x / hyx;
        
        let rad:number = Math.acos(cosAngle);
        
        if (py2 < py1)
        {
            rad = -rad;
        }
        return rad;
    }

    private createMovePoint(x:number,y:number, newPoint:egret.Point, angle:number, bevel:number = 300):void
    {
        let radian:number = angle * Math.PI / 180;
        let xMargin:number = Math.cos(radian) * bevel;
        let yMargin:number = Math.sin(radian) * bevel;

        newPoint.x = x + xMargin;
        newPoint.y = y + yMargin;
    }

    private movePointHandler(ang:number):void
    {
        let self:SelfGameObjectInfo = Manager.model.self;
        let newPoint:egret.Point = new egret.Point();
        // this.createMovePoint(self.getPosition(), newPoint, ang*(180/Math.PI) - 180);
        this.createMovePoint(self.x,self.y,newPoint, ang*(180/Math.PI) - 180);
        Manager.walk.moveTo(newPoint);
    }

    public resetLocal():void
    {
        this.smallCircle.x = this.bigCircle.x;
        this.smallCircle.y = this.bigCircle.y;
    }

    public reuse():void
    {}

    public unuse():void
    {
        if(this.parent)
            this.parent.removeChild(this);
    }

    public dispose():void
    {
        if(this.bgCircle)
        {
            Manager.pool.push(this.bgCircle);
            this.bgCircle = null;
        }

        if(this.bigCircle)
        {
            Manager.pool.push(this.bigCircle);
            this.bigCircle = null;
        }

        if(this.smallCircle)
        {
            Manager.pool.push(this.smallCircle);
            this.smallCircle = null;
        }

        if(this.parent)
        {
            this.parent.removeChild(this);
        }
    }
}


//使用示例：

// this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
// this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchHandler, this);
// this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndHandler, this);

// public onTouchHandler(e:egret.TouchEvent):void
// {
//     if(!this._ctrlView)
//         this._ctrlView = new CtrlView();

//     if(this._ctrlView)
//     {
//         if(this._ctrlView.parent == null)
//             Manager.layer.tipsLayer.addChild(this._ctrlView);
//         if(e.type == egret.TouchEvent.TOUCH_BEGIN)
//         {
//             this._ctrlView.x = e.stageX - Math.ceil(this._ctrlView.width / 2);
//             this._ctrlView.y = e.stageY - Math.ceil(this._ctrlView.height / 2);
//         }
//         this._ctrlView.onTouch(e);
//     }
// }

// public onTouchEndHandler(e:egret.TouchEvent):void
// {
//     if(this._ctrlView)
//     {
//         this._ctrlView.resetLocal();
//         if(this._ctrlView.parent)
//             this._ctrlView.parent.removeChild(this._ctrlView);
//     }
// }