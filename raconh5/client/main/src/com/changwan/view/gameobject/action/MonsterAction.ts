/**
 *author Anydo
 *create 2017-12-8
 *description 
*/
class MonsterAction extends Action
{
    private _beatBackTargetPos:egret.Point;

    public unuse():void
    {
		super.unuse();
        this._beatBackTargetPos = null;
    }


    //==============================↓↓↓↓↓↓↓↓技能击退↓↓↓↓↓↓↓↓==================================
    public beatBack(targetX:number, targetY:number):void
    {
		this._beatBackTargetPos = new egret.Point(targetX, targetY);
        
        var currentPoint:egret.Point = new egret.Point(this._info.x, this._info.y);//受击点
        var angle:number = Math.atan2((this._beatBackTargetPos.y - currentPoint.y), (this._beatBackTargetPos.x - currentPoint.x));
        var rota:number = ((angle + Math.PI) * 180) / Math.PI;//面朝反方向
        var dire:string = Direction.getDirByAngle(rota);
        this._info.setActionStr(FigureAction.HITED);
        this._info.setDirection(dire);

        this.killViewTween();
        egret.Tween.get(this._info.view).to({x:this._beatBackTargetPos.x, y:this._beatBackTargetPos.y}, 280).call(this.beatBackComplete, this);
    }

    private beatBackComplete():void
    {
        if(this._info == null) return;
        if(this._info.getAliveFlag())
        {
            this._info.updatePostion(this._beatBackTargetPos.x, this._beatBackTargetPos.y);
        }
        this.killViewTween();
        if(this._info.getActionStr() != FigureAction.HITED) return;
        let figure:string = this._info.getAliveFlag() ? FigureAction.STAND : FigureAction.DEAD;
        this._info.setActionStr(figure);
    }
    //==============================↑↑↑↑↑↑↑↑技能击退↑↑↑↑↑↑↑↑==================================

    //==============================↓↓↓↓↓↓↓↓死亡击飞↓↓↓↓↓↓↓↓==================================
    private DIE_REPEL_DIS1:number = 250;
    private DIE_REPEL_DIS2:number = 150;
    private DIE_REPEL_DIS3:number = 100;
    private DIE_REPEL_HEIGHT1:number = 120;
    private DIE_REPEL_HEIGHT2:number = 60;

    public dieRepel(attackPos:egret.Point, onlyJumpOnce:boolean):void
    {
        this.newDieRepelInitialize(attackPos, onlyJumpOnce);
    }

    public newDieRepelInitialize(attackPos:egret.Point, onlyJumpOnce:boolean):void
    {
        var currentPoint:egret.Point = new egret.Point(this._info.x, this._info.y);//受击点
        var angle:number = Math.atan2((currentPoint.y-attackPos.y), (currentPoint.x-attackPos.x));
        var rota:number = ((angle + Math.PI) * 180) / Math.PI;//面朝反方向
        var dire:string = Direction.getDirByAngle(rota);
        
        this._info.setActionStr(FigureAction.DEAD);
        this._info.setDirection(dire);
        let animation:MonsterAnimation = (this._info.view as MonsterGameObject).getMonsterAnimation();
        if(animation != null)
        {
            animation.figureDirection = dire;
            animation.figureAction = FigureAction.DEAD;
        }
        
        var specialH:boolean = (((angle > 1.3) && (angle < 1.84)) || ((angle < -1.3) && (angle > -1.84)));//垂直角度的贝塞尔点特殊处理
        var dis1:number = onlyJumpOnce ? 400 : this.DIE_REPEL_DIS1;//死亡击飞只击飞一次的，把击飞距离拉长点，加强表现
        var vt2:Vector2D = new Vector2D(1,0);
        vt2.angle = angle;
        vt2.length = dis1;
        var point1:egret.Point = new egret.Point(currentPoint.x + vt2.x, currentPoint.y + vt2.y);
        vt2.length = dis1 + this.DIE_REPEL_DIS2;
        var point2:egret.Point = new egret.Point(currentPoint.x + vt2.x, currentPoint.y + vt2.y);
        vt2.length = dis1 + this.DIE_REPEL_DIS2 + this.DIE_REPEL_DIS3;
        var point3:egret.Point = new egret.Point(currentPoint.x + vt2.x, currentPoint.y + vt2.y);
        var tt1:number = Math.PI / 2;
        var tt2:number;
		var heightP1:egret.Point;
		var heightP2:egret.Point;
        if(specialH)
        {
            heightP1 = point2.clone();
            heightP2 = point3.clone();
        }
        else
        {
            vt2 = new Vector2D(1,0);
            vt2.angle = angle;
            vt2.length = dis1 * 2 / 3;
            var tempPoint1:egret.Point = new egret.Point(currentPoint.x + vt2.x, currentPoint.y + vt2.y);
            vt2.length = this.DIE_REPEL_DIS2 * 2 / 3;
            var tempPoint2:egret.Point = new egret.Point(point1.x + vt2.x, point1.y + vt2.y);
            vt2 = new Vector2D(1,0);
            tt2 = ((angle > -tt1) && (angle < tt1)) ? -tt1 : tt1;//区分左右
            vt2.angle = angle + tt2;
            vt2.length = this.DIE_REPEL_HEIGHT1;
            heightP1 = new egret.Point(tempPoint1.x + vt2.x, tempPoint1.y + vt2.y);
            vt2.length = this.DIE_REPEL_HEIGHT2;
            heightP2 = new egret.Point(tempPoint2.x + vt2.x, tempPoint2.y + vt2.y);
        }
        
        if(onlyJumpOnce)
        {
            (this._info.view as MonsterGameObject).dieRepelBezier1(currentPoint, heightP1, point1);
        }
        else
        {
            (this._info.view as MonsterGameObject).dieRepelBezier2(currentPoint, heightP1, point1, heightP2, point2, point3);
        }
    }
    //==============================↑↑↑↑↑↑↑↑死亡击飞↑↑↑↑↑↑↑↑==================================
		
    private killViewTween():void
    {
        if(this._info && this._info.view)
        {
            egret.Tween.removeTweens(this._info.view);
        }
    }

    public dispose():void
    {
        this.killViewTween();
        super.dispose();
        this._beatBackTargetPos = null;
    }
}