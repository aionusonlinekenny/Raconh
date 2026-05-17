var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *author Anydo
 *create 2017-12-8
 *description
*/
var MonsterAction = /** @class */ (function (_super) {
    __extends(MonsterAction, _super);
    function MonsterAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //==============================↑↑↑↑↑↑↑↑技能击退↑↑↑↑↑↑↑↑==================================
        //==============================↓↓↓↓↓↓↓↓死亡击飞↓↓↓↓↓↓↓↓==================================
        _this.DIE_REPEL_DIS1 = 250;
        _this.DIE_REPEL_DIS2 = 150;
        _this.DIE_REPEL_DIS3 = 100;
        _this.DIE_REPEL_HEIGHT1 = 120;
        _this.DIE_REPEL_HEIGHT2 = 60;
        return _this;
    }
    MonsterAction.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._beatBackTargetPos = null;
    };
    //==============================↓↓↓↓↓↓↓↓技能击退↓↓↓↓↓↓↓↓==================================
    MonsterAction.prototype.beatBack = function (targetX, targetY) {
        this._beatBackTargetPos = new egret.Point(targetX, targetY);
        var currentPoint = new egret.Point(this._info.x, this._info.y); //受击点
        var angle = Math.atan2((this._beatBackTargetPos.y - currentPoint.y), (this._beatBackTargetPos.x - currentPoint.x));
        var rota = ((angle + Math.PI) * 180) / Math.PI; //面朝反方向
        var dire = Direction.getDirByAngle(rota);
        this._info.setActionStr(FigureAction.HITED);
        this._info.setDirection(dire);
        this.killViewTween();
        egret.Tween.get(this._info.view).to({ x: this._beatBackTargetPos.x, y: this._beatBackTargetPos.y }, 280).call(this.beatBackComplete, this);
    };
    MonsterAction.prototype.beatBackComplete = function () {
        if (this._info == null)
            return;
        if (this._info.getAliveFlag()) {
            this._info.updatePostion(this._beatBackTargetPos.x, this._beatBackTargetPos.y);
        }
        this.killViewTween();
        if (this._info.getActionStr() != FigureAction.HITED)
            return;
        var figure = this._info.getAliveFlag() ? FigureAction.STAND : FigureAction.DEAD;
        this._info.setActionStr(figure);
    };
    MonsterAction.prototype.dieRepel = function (attackPos, onlyJumpOnce) {
        this.newDieRepelInitialize(attackPos, onlyJumpOnce);
    };
    MonsterAction.prototype.newDieRepelInitialize = function (attackPos, onlyJumpOnce) {
        var currentPoint = new egret.Point(this._info.x, this._info.y); //受击点
        var angle = Math.atan2((currentPoint.y - attackPos.y), (currentPoint.x - attackPos.x));
        var rota = ((angle + Math.PI) * 180) / Math.PI; //面朝反方向
        var dire = Direction.getDirByAngle(rota);
        this._info.setActionStr(FigureAction.DEAD);
        this._info.setDirection(dire);
        var animation = this._info.view.getMonsterAnimation();
        if (animation != null) {
            animation.figureDirection = dire;
            animation.figureAction = FigureAction.DEAD;
        }
        var specialH = (((angle > 1.3) && (angle < 1.84)) || ((angle < -1.3) && (angle > -1.84))); //垂直角度的贝塞尔点特殊处理
        var dis1 = onlyJumpOnce ? 400 : this.DIE_REPEL_DIS1; //死亡击飞只击飞一次的，把击飞距离拉长点，加强表现
        var vt2 = new Vector2D(1, 0);
        vt2.angle = angle;
        vt2.length = dis1;
        var point1 = new egret.Point(currentPoint.x + vt2.x, currentPoint.y + vt2.y);
        vt2.length = dis1 + this.DIE_REPEL_DIS2;
        var point2 = new egret.Point(currentPoint.x + vt2.x, currentPoint.y + vt2.y);
        vt2.length = dis1 + this.DIE_REPEL_DIS2 + this.DIE_REPEL_DIS3;
        var point3 = new egret.Point(currentPoint.x + vt2.x, currentPoint.y + vt2.y);
        var tt1 = Math.PI / 2;
        var tt2;
        var heightP1;
        var heightP2;
        if (specialH) {
            heightP1 = point2.clone();
            heightP2 = point3.clone();
        }
        else {
            vt2 = new Vector2D(1, 0);
            vt2.angle = angle;
            vt2.length = dis1 * 2 / 3;
            var tempPoint1 = new egret.Point(currentPoint.x + vt2.x, currentPoint.y + vt2.y);
            vt2.length = this.DIE_REPEL_DIS2 * 2 / 3;
            var tempPoint2 = new egret.Point(point1.x + vt2.x, point1.y + vt2.y);
            vt2 = new Vector2D(1, 0);
            tt2 = ((angle > -tt1) && (angle < tt1)) ? -tt1 : tt1; //区分左右
            vt2.angle = angle + tt2;
            vt2.length = this.DIE_REPEL_HEIGHT1;
            heightP1 = new egret.Point(tempPoint1.x + vt2.x, tempPoint1.y + vt2.y);
            vt2.length = this.DIE_REPEL_HEIGHT2;
            heightP2 = new egret.Point(tempPoint2.x + vt2.x, tempPoint2.y + vt2.y);
        }
        if (onlyJumpOnce) {
            this._info.view.dieRepelBezier1(currentPoint, heightP1, point1);
        }
        else {
            this._info.view.dieRepelBezier2(currentPoint, heightP1, point1, heightP2, point2, point3);
        }
    };
    //==============================↑↑↑↑↑↑↑↑死亡击飞↑↑↑↑↑↑↑↑==================================
    MonsterAction.prototype.killViewTween = function () {
        if (this._info && this._info.view) {
            egret.Tween.removeTweens(this._info.view);
        }
    };
    MonsterAction.prototype.dispose = function () {
        this.killViewTween();
        _super.prototype.dispose.call(this);
        this._beatBackTargetPos = null;
    };
    return MonsterAction;
}(Action));
//# sourceMappingURL=MonsterAction.js.map