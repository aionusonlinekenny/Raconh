/**
 * 进度条基础视图
 * liangyan
 * create 2017-11-16
 * @update devil 2018-04-19
*/
var BaseStripView2 = /** @class */ (function () {
    function BaseStripView2(uiImageLayer, uiLayer) {
        this._imageLayer = ObjectUtil.createConainer();
        uiImageLayer.addChild(this._imageLayer);
        this._layer = ObjectUtil.createConainer();
        uiLayer.addChild(this._layer);
        this._fullFirst = this._isInit = true;
        this._current = this._target = this._speed = 0;
        this.start();
    }
    BaseStripView2.prototype.move = function (x, y) {
        this._imageLayer.x = x;
        this._layer.x = x;
        this._imageLayer.y = y;
        this._layer.y = y;
    };
    BaseStripView2.prototype.start = function () {
    };
    BaseStripView2.prototype.setPer = function (per) {
        if (per < 0)
            per += 1;
        if (this._txt != null) {
            var msg = (per * 100).toFixed(2) + "% ";
            if (this._txt.text != msg)
                this._txt.text = msg;
        }
    };
    /**
     * 更新百分比
     * @param fullFirst 为true时，先进度条先升到100%再从0%升到目标值
     */
    BaseStripView2.prototype.updatePercent = function (value, fullFirst) {
        if (fullFirst === void 0) { fullFirst = false; }
        this._target = value;
        this._fullFirst = fullFirst;
        if (this._isInit || (Math.abs(this._target - this._current) < 0.02)) {
            this._current = this._target;
            this.setPer(this._current);
        }
        else {
            var dis = this._fullFirst ? (this._target + 1 - this._current) / 20 : (this._target - this._current) / 20;
            this._speed = dis / Manager.global.FRAME_TIME; //; * 1000;
            Manager.render.add(this.render, this);
        }
        this._isInit = false;
    };
    BaseStripView2.prototype.render = function (interval) {
        var value = this._speed * interval;
        if (Math.abs(this._target - this._current) <= Math.abs(value)) {
            Manager.render.remove(this.render, this);
            this._current = this._target;
        }
        else {
            this._current += value;
            if (this._fullFirst && this._current > 1)
                this._current -= 1;
        }
        this.setPer(this._current);
    };
    // public unuse():void
    // {
    // 	Manager.render.remove(this.render, this);
    //     if(this._txt)
    //     {
    // 		Manager.pool.push(this._txt);
    //         this._txt = null;
    //     }
    // }
    BaseStripView2.prototype.dispose = function () {
        Manager.render.remove(this.render, this);
        if (this._txt) {
            Manager.pool.push(this._txt);
            this._txt = null;
        }
        if (this._imageLayer.parent)
            this._imageLayer.parent.removeChild(this._imageLayer);
        this._imageLayer = null;
        if (this._layer.parent)
            this._layer.parent.removeChild(this._layer);
        this._layer = null;
    };
    return BaseStripView2;
}());
//# sourceMappingURL=BaseStripView2.js.map