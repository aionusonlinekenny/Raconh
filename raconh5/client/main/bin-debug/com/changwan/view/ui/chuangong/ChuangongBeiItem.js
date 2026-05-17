var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
var ChuangongBeiItem = (function (_super) {
    __extends(ChuangongBeiItem, _super);
    function ChuangongBeiItem() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.start();
        return _this;
    }
    ChuangongBeiItem.prototype.start = function () {
        _super.prototype.start.call(this);
        this._coolingImg = new CoolingImage(50);
        this._coolingImg.x = 55;
        this._coolingImg.y = 55;
        this.addChild(this._coolingImg);
        this.beiImg = BitmapRes.create("cg_beiImg1_png", 0, 0, 110, 116);
        this.addChild(this.beiImg);
        this._angle = 0;
        this._step = 360 / TrainingModel.TRAINING_TIME;
        // this.drawSector(this._sp, 56, 56, 50, this._angle, -90);
    };
    ChuangongBeiItem.prototype.startCountdown = function (time) {
        if (time != -1)
            this._angle = 360 - time;
        Manager.model.getTraining().dispatchEvent(new TrainingEvent(TrainingEvent.EXP_UPDATE, this._angle));
        Manager.render.add(this.onTimeoutHandler, this, 1000);
    };
    ChuangongBeiItem.prototype.resetCountdown = function () {
        Manager.render.remove(this.onTimeoutHandler, this);
        this._angle = 0;
        this._coolingImg.setSchedule(0, 360);
    };
    ChuangongBeiItem.prototype.onTimeoutHandler = function () {
        this._angle += this._step;
        Manager.model.getTraining().dispatchEvent(new TrainingEvent(TrainingEvent.EXP_UPDATE, this._angle));
        if (this._angle < 360)
            this._coolingImg.setSchedule(this._angle, 360);
        else
            Manager.render.remove(this.onTimeoutHandler, this);
    };
    // private drawSector(mc:any, x:number, y:number, r:number, angle:number, startFrom:number):void
    // {
    // 	mc.graphics.clear();
    // 	mc.graphics.beginFill(0, 1);
    // 	mc.graphics.lineStyle(0,0xff0000);
    // 	mc.graphics.moveTo(x,y);
    // 	angle = (Math.abs(angle)>360)?360:angle;
    // 	var n:number = Math.ceil(Math.abs(angle)/45);
    // 	var angleA:number = angle/n;
    // 	angleA = angleA*Math.PI/180;
    // 	startFrom = startFrom*Math.PI/180;
    // 	mc.graphics.lineTo(x+r*Math.cos(startFrom),y+r*Math.sin(startFrom));
    // 	for (var i=1; i<=n; i++)
    // 	{
    // 		startFrom+=angleA;
    // 		var angleMid=startFrom-angleA/2;
    // 		var bx=x+r/Math.cos(angleA/2)*Math.cos(angleMid);
    // 		var by=y+r/Math.cos(angleA/2)*Math.sin(angleMid);
    // 		var cx=x+r*Math.cos(startFrom);
    // 		var cy=y+r*Math.sin(startFrom);
    // 		mc.graphics.curveTo(bx,by,cx,cy);
    // 	}
    // 	if(angle!=360)
    // 	{
    // 		mc.graphics.lineTo(x,y);
    // 	}
    // 	mc.graphics.endFill();
    // }
    ChuangongBeiItem.prototype.dispose = function () {
        Manager.render.remove(this.onTimeoutHandler, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.dispose(this._coolingImg);
        this._coolingImg = null;
        ObjectUtil.remove(this.beiImg);
        if (this.beiImg)
            Manager.pool.push(this.beiImg);
        this.beiImg = null;
    };
    return ChuangongBeiItem;
}(Sprite));
__reflect(ChuangongBeiItem.prototype, "ChuangongBeiItem");
//# sourceMappingURL=ChuangongBeiItem.js.map