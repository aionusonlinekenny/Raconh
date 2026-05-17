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
 * 游戏杆
 */
var CtrlView = /** @class */ (function (_super) {
    __extends(CtrlView, _super);
    function CtrlView() {
        var _this = _super.call(this) || this;
        _this.bigCircleX = 0;
        _this.bigCircleY = 0;
        _this.smallCircleX = 0;
        _this.smallCircleY = 0;
        _this.initView();
        return _this;
    }
    CtrlView.prototype.initView = function () {
        this.bgCircle = Manager.pool.create(egret.Sprite);
        this.bgCircle.graphics.beginFill(0x333333, 0.2);
        this.bgCircle.graphics.drawCircle(0, 0, CtrlView.OFFSET);
        this.bgCircle.graphics.endFill();
        this.bgCircle.x = CtrlView.OFFSET;
        this.bgCircle.y = CtrlView.OFFSET;
        this.addChild(this.bgCircle);
        this.bigCircle = Manager.pool.create(egret.Sprite);
        this.bigCircle.graphics.beginFill(0x333333, 0);
        this.bigCircle.graphics.drawCircle(0, 0, CtrlView.bigCircleR);
        this.bigCircle.graphics.endFill();
        this.bigCircle.x = this.bigCircleX = CtrlView.OFFSET;
        this.bigCircle.y = this.bigCircleY = CtrlView.OFFSET;
        this.addChild(this.bigCircle);
        this.smallCircle = Manager.pool.create(egret.Sprite);
        this.smallCircle.graphics.beginFill(0xcccccc, 0.2);
        this.smallCircle.graphics.drawCircle(0, 0, CtrlView.smallCircleR);
        this.smallCircle.graphics.endFill();
        this.smallCircle.x = this.smallCircleX = CtrlView.OFFSET;
        this.smallCircle.y = this.smallCircleY = CtrlView.OFFSET;
        this.addChild(this.smallCircle);
    };
    CtrlView.prototype.onTouch = function (e) {
        var flagR = true;
        var pointX = e.stageX - this.x;
        var pointY = e.stageY - this.y;
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
            case egret.TouchEvent.TOUCH_MOVE:
                if (Math.sqrt(Math.pow((this.bigCircleX - pointX), 2) + Math.pow((this.bigCircleY - pointY), 2)) <= CtrlView.bigCircleR) {
                    flagR = false;
                    this.setSmallCircleXY(pointX, pointY, CtrlView.smallCircleR, this.getRad(this.bigCircleX, this.bigCircleY, pointX, pointY), flagR);
                }
                else {
                    flagR = true;
                    this.setSmallCircleXY(this.bigCircleX, this.bigCircleY, CtrlView.bigCircleR, this.getRad(this.bigCircleX, this.bigCircleY, pointX, pointY), flagR);
                }
                var ang = Math.atan2(this.bigCircle.y - this.smallCircle.y, this.bigCircle.x - this.smallCircle.x);
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
    };
    CtrlView.prototype.setSmallCircleXY = function (centerX, centerY, r, rad, flag) {
        if (flag) {
            this.smallCircle.x = this.smallCircleX = r * Math.cos(rad) + centerX;
            this.smallCircle.y = this.smallCircleY = r * Math.sin(rad) + centerY;
        }
        else {
            this.smallCircle.x = centerX;
            this.smallCircle.y = centerY;
        }
    };
    CtrlView.prototype.getRad = function (px1, py1, px2, py2) {
        var x = px2 - px1;
        var y = py2 - py1;
        var hyx = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        var cosAngle = x / hyx;
        var rad = Math.acos(cosAngle);
        if (py2 < py1) {
            rad = -rad;
        }
        return rad;
    };
    CtrlView.prototype.createMovePoint = function (x, y, newPoint, angle, bevel) {
        if (bevel === void 0) { bevel = 300; }
        var radian = angle * Math.PI / 180;
        var xMargin = Math.cos(radian) * bevel;
        var yMargin = Math.sin(radian) * bevel;
        newPoint.x = x + xMargin;
        newPoint.y = y + yMargin;
    };
    CtrlView.prototype.movePointHandler = function (ang) {
        var self = Manager.model.self;
        var newPoint = new egret.Point();
        // this.createMovePoint(self.getPosition(), newPoint, ang*(180/Math.PI) - 180);
        this.createMovePoint(self.x, self.y, newPoint, ang * (180 / Math.PI) - 180);
        Manager.walk.moveTo(newPoint);
    };
    CtrlView.prototype.resetLocal = function () {
        this.smallCircle.x = this.bigCircle.x;
        this.smallCircle.y = this.bigCircle.y;
    };
    CtrlView.prototype.reuse = function () { };
    CtrlView.prototype.unuse = function () {
        if (this.parent)
            this.parent.removeChild(this);
    };
    CtrlView.prototype.dispose = function () {
        if (this.bgCircle) {
            Manager.pool.push(this.bgCircle);
            this.bgCircle = null;
        }
        if (this.bigCircle) {
            Manager.pool.push(this.bigCircle);
            this.bigCircle = null;
        }
        if (this.smallCircle) {
            Manager.pool.push(this.smallCircle);
            this.smallCircle = null;
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    CtrlView.OFFSET = 100;
    CtrlView.bigCircleR = 50;
    CtrlView.smallCircleR = 40;
    return CtrlView;
}(egret.DisplayObjectContainer));
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
//# sourceMappingURL=CtrlView.js.map