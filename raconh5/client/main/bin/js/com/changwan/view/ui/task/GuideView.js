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
 * 引导界面
 * luzh
 * 2018.2.26
 */
var GuideView = /** @class */ (function (_super) {
    __extends(GuideView, _super);
    // private _targetX:number;
    // private _targetY:number;
    function GuideView() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.touchChildren = false;
        _this.start();
        _this.addEvent();
        return _this;
    }
    GuideView.prototype.start = function () {
        _super.prototype.start.call(this);
        this._sign = Manager.animation.createEffectAnimation("szdj");
        this.addChild(this._sign);
        this._hand = new HandAni(0, 0);
        this.addChild(this._hand);
    };
    GuideView.prototype.setData2 = function (globalPos, disX, disY, callBack, thisObj, modal) {
        this._globalPos = globalPos;
        this._globalPos.x += disX;
        this._globalPos.y += disY;
        this._sign.play();
        this._hand.play();
        this._callBack = Manager.pool.create(CallBackInfo, callBack, thisObj);
        disX = Math.round(disX);
        disY = Math.round(disY);
        this._time = 10;
        Manager.render.add(this.countDown, this, 1000);
        this._modal = modal;
        if (this._modal) {
            if (this._back == null)
                this._back = Manager.pool.create(GuildViewBack);
            this.addChildAt(this._back, 0);
        }
        else
            this.hideMode();
        // this._target = target;
        // this._targetX = this._target.x;
        // this._targetY = this._target.y;
        // this._disX = disX;
        // this._disY = disY;
        this.drawPos();
    };
    // public setData(target:egret.DisplayObject, disX:number, disY:number, callBack:Function, thisObj:any, modal:boolean):void
    // {
    //     this._sign.play();
    //     this._hand.play();
    //     this._callBack = Manager.pool.create(CallBackInfo, callBack, thisObj);
    //     disX = Math.round(disX);
    //     disY = Math.round(disY);
    //     this._time = 10;
    // 	Manager.render.add(this.countDown, this, 1000);
    //     this._modal = modal;
    //     if(this._modal)
    //     {
    //         if(this._back == null) this._back = Manager.pool.create(GuildViewBack);
    //         this.addChildAt(this._back, 0);
    //     }
    //     else  this.hideMode();
    //     this._target = target;
    //     this._targetX = this._target.x;
    //     this._targetY = this._target.y;
    //     this._disX = disX;
    //     this._disY = disY;
    //     this.drawPos();
    //         // this.invalidate("drawPos");
    // }
    GuideView.prototype.hideMode = function () {
        if (this._back != null)
            ObjectUtil.remove(this._back);
    };
    GuideView.prototype.drawPos = function () {
        // if(this._target == null) return;
        var pos = this._globalPos;
        // if(this._target.parent) pos = this._target.parent.localToGlobal(this._targetX + this._disX, this._targetY + this._disY);
        // else pos = new egret.Point(this._targetX + this._disX, this._targetY + this._disY);
        this._sign.x = pos.x - 98;
        this._sign.y = pos.y - 240;
        this._hand.x = pos.x - 13;
        this._hand.y = pos.y - 6;
        if (this._modal) {
            this._back.setPos(pos.x, pos.y);
        }
        this.onResizeHandler(null);
    };
    GuideView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawPos"))
            this.drawPos();
    };
    GuideView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawPos();
    };
    GuideView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    GuideView.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    GuideView.prototype.onResizeHandler = function (e) {
        this.invalidate("drawPos");
    };
    GuideView.prototype.onClickHandler = function (e) {
        // if(this._modal && !this._circle.hitTestPoint(e.stageX, e.stageY)) return;
        this._callBack.callBack.call(this._callBack.target);
    };
    GuideView.prototype.countDown = function () {
        this._time--;
        if (this._time <= 0)
            this._callBack.callBack.call(this._callBack.target);
    };
    GuideView.prototype.hide = function () {
        this._hand.pause();
        this._sign.stop();
        if (this._callBack != null)
            Manager.pool.push(this._callBack);
        this._callBack = null;
        // this._target = null;
        Manager.render.remove(this.countDown, this);
        ObjectUtil.remove(this);
        this.hideMode();
    };
    GuideView.prototype.dispose = function () {
        Manager.render.remove(this.countDown, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._back, this._sign);
        ObjectUtil.dispose(this._hand);
        this._hand = null;
        if (this._callBack != null)
            Manager.pool.push(this._callBack);
        this._callBack = null;
        // this._target = null;
        if (this._back != null) {
            this._back.dispose();
            this._back = null;
        }
        if (this._sign)
            Manager.pool.push(this._sign);
        this._sign = null;
    };
    return GuideView;
}(RenderSprite));
//# sourceMappingURL=GuideView.js.map