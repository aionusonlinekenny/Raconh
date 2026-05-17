var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RenderTimerInfo = (function () {
    function RenderTimerInfo() {
        this.alive = false;
        this.deley = 0;
        this.repeat = 0;
        this.interval = 0;
    }
    RenderTimerInfo.prototype.dispose = function () {
        this.render = null;
        this.endUpdate = null;
        this.target = null;
        this.args.length = 0;
        this.args = null;
    };
    ;
    RenderTimerInfo.prototype.reuse = function (render, target, deley, repeat, endUpdate, args) {
        this.render = render;
        this.endUpdate = endUpdate;
        this.target = target;
        this.deley = deley;
        this.repeat = repeat;
        this.alive = true;
        this.args = args;
    };
    RenderTimerInfo.prototype.unuse = function () {
        this.render = null;
        this.endUpdate = null;
        this.target = null;
        this.alive = false;
        this.deley = 0;
        this.repeat = 0;
        this.interval = 0;
        this.args.length = 0;
        this.args = null;
    };
    return RenderTimerInfo;
}());
__reflect(RenderTimerInfo.prototype, "RenderTimerInfo", ["cw.IPool", "cw.IDispose"]);
//# sourceMappingURL=RenderTimerInfo.js.map