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
 * 血条
 * liangyan
 * create 2017-11-16
 * @update  devil 2018-04-21
*/
var BloodStripView2 = /** @class */ (function (_super) {
    __extends(BloodStripView2, _super);
    function BloodStripView2(imageLayer, layer, info) {
        var _this = _super.call(this, imageLayer, layer) || this;
        _this.reuse(info);
        return _this;
    }
    BloodStripView2.prototype.dispatchRender = function () {
        Manager.render.add(this.repaint, this, 0, 1);
    };
    BloodStripView2.prototype.repaint = function () {
        if (this._drawBlood)
            this.drawBlood();
        this._drawBlood = false;
    };
    BloodStripView2.prototype.start = function () {
        _super.prototype.start.call(this);
        this._back = Manager.pool.create(BitmapRes, "common_hp_bg_png");
        this._imageLayer.addChild(this._back);
        this._blood = Manager.pool.create(BitmapRes);
        this._blood.x = 2.5;
        this._blood.y = 2.5;
        this._imageLayer.addChild(this._blood);
    };
    // public setVisible(visible:boolean):void
    // {
    // 	if(visible)
    // 	{
    // 		if(!this._imageLayer.parent)this._imageLayer.parent.addChild(this._imageLayer);
    // 		if(!this._layer.parent)this._layer.parent.addChild(this._layer);
    // 	}
    // 	else
    // 	{
    // 		if(this._imageLayer.parent)this._imageLayer.parent.removeChild(this._imageLayer);
    // 		if(this._layer.parent)this._layer.parent.removeChild(this._layer);
    // 	}
    // }
    /**
     * 更新
     */
    BloodStripView2.prototype.updateBlood = function () {
        this._drawBlood = true;
        this.dispatchRender();
    };
    BloodStripView2.prototype.drawBlood = function () {
        this._currBlood = this._info.attrInfo.hp;
        this._totalBlood = this._info.attrInfo.hpMax;
        if (this._totalBlood == 0) {
            Trace.error("总血量不能为0！");
            return;
        }
        if (this._currBlood > this._totalBlood)
            this._currBlood = this._totalBlood;
        this.updatePercent(this._currBlood / this._totalBlood);
    };
    BloodStripView2.prototype.setPer = function (per) {
        _super.prototype.setPer.call(this, per);
        this._blood.width = Math.round(74 * per);
    };
    // public unuse():void
    // {
    // 	Manager.pool.push(this._back);
    //     Manager.pool.push(this._blood);
    // 	this._back = null;
    //     this._blood = null;
    //     this._info = null;
    //     super.unuse();
    // }
    BloodStripView2.prototype.reuse = function (info) {
        this._info = info;
        this._blood.source = (this._info instanceof SelfGameObjectInfo) ? "common_hp_self_png" : "common_hp_other_png";
        // super.reuse();
        this._drawBlood = true;
        this.dispatchRender();
    };
    BloodStripView2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        Manager.render.remove(this.repaint, this);
        Manager.pool.push(this._back);
        Manager.pool.push(this._blood);
        this._back = null;
        this._blood = null;
        this._info = null;
    };
    return BloodStripView2;
}(BaseStripView2));
//# sourceMappingURL=BloodStripView2.js.map