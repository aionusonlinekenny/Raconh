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
/**
 * SCT视图
 * luzhihong
 * create 2017-11-08
 */
var SCTView = (function (_super) {
    __extends(SCTView, _super);
    function SCTView() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        return _this;
    }
    /**
     * @param type 类型（SCTConst.TYPE_XXX）
     * @param value 数值
     * @param pos 位置
     * @param direction 方向(角度0-360)
     */
    SCTView.prototype.reuse = function (type, value, pos, direction) {
        if (direction === void 0) { direction = 0; }
        Manager.layer.sctLayer.addChild(this);
        switch (type) {
            case SCTConst.TYPE_SKILL:
                this.addPic(pos, value, SCTConst.NUM_YELLOW);
                this.moveToDic(800, direction, 1);
                break;
            case SCTConst.TYPE_SKILL_CRIT:
                this.addPic(pos, value, SCTConst.NUM_ORANGE);
                this.moveToDic(1000, direction, 1, 2);
                break;
            case SCTConst.TYPE_PET:
                this.addPic(pos, value, SCTConst.NUM_BLUE);
                this.moveToDic(800, direction, 0.7);
                break;
            case SCTConst.TYPE_PET_CRIT:
                this.addPic(pos, value, SCTConst.NUM_BLUE);
                this.moveToDic(1000, direction, 1, 2);
                break;
            case SCTConst.TYPE_MISS:
                this.addPic(pos, value, -1, false, SCTConst.WORD_MISS);
                this.MoveOver(800);
                break;
            case SCTConst.TYPE_HURT:
                this.addPic(pos, value, SCTConst.NUM_RED);
                this.moveToDic(800, direction, 0.7);
                break;
            case SCTConst.TYPE_HURT_CRIT:
                this.addPic(pos, value, SCTConst.NUM_RED);
                this.moveToDic(1000, direction, 1, 2);
                break;
            case SCTConst.TYPE_DODGE:
                this.addPic(pos, value, -1, false, SCTConst.WORD_DODGE);
                this.MoveOver(800);
                break;
            case SCTConst.TYPE_BLOOD:
                this.addPic(pos, value, SCTConst.NUM_GREEN, true);
                this.MoveOver(1000);
                break;
            case SCTConst.TYPE_EXP:
                if (Manager.model.getCopy().expModel.inspireRate > 0) {
                    this._subView = Manager.pool.create(SCTPercentView, SCTConst.NUM_GREEN, Manager.model.getCopy().expModel.inspireRate / 10);
                }
                this.addPic(pos, value, SCTConst.NUM_GREEN, true, SCTConst.WORD_EXP, false);
                // this.MoveOver(1000);
                this.moveToDic(1500, 270, 1, 2);
                break;
            case SCTConst.TYPE_SILVER:
                if (Manager.model.getCopy().silverModel.rate > 0) {
                    this._subView = Manager.pool.create(SCTPercentView, SCTConst.NUM_SILVER, Manager.model.getCopy().silverModel.rate);
                }
                this.addPic(pos, value, SCTConst.NUM_SILVER, true, SCTConst.WORD_SILVER, false);
                this.MoveOver(1000);
                break;
            case SCTConst.TYPE_SILVER_RATE:
                this.addPic(pos, value, SCTConst.NUM_SILVER, true, SCTConst.WORD_SILVER_ADD, true);
                // this.MoveOver(1000);
                this.moveToDic(1500, 270, 1, 2);
                break;
        }
    };
    /**
     * 添加图片
     */
    SCTView.prototype.addPic = function (pos, value, numType, needAdd, wordType, needPercent) {
        if (numType === void 0) { numType = -1; }
        if (needAdd === void 0) { needAdd = false; }
        if (wordType === void 0) { wordType = -1; }
        if (needPercent === void 0) { needPercent = false; }
        // let pic:NumPic = Manager.pool.create(NumPic, value, numType, needAdd, wordType);
        // this.bitmapData = pic.renderTexture.bitmapData;
        // Manager.pool.push(pic);
        // this._num = Manager.pool.create(NumPic, value, numType, needAdd, wordType, needPercent);
        this._num = Manager.pool.create(NumImgView2);
        this._num.setValue(value, "", 0, 0, numType, needAdd, wordType, needPercent);
        this.addChild(this._num);
        if (this._subView) {
            this._subView.x = this.width;
            this.addChild(this._subView);
        }
        this.x = pos.x - (this.width >> 1);
        this.y = pos.y - (this.height >> 1);
    };
    Object.defineProperty(SCTView.prototype, "factor", {
        //贝塞尔
        get: function () { return 0; },
        set: function (value) {
            this.x = (1 - value) * (1 - value) * this._pos0.x + 2 * value * (1 - value) * this._pos1.x + value * value * this._pos2.x;
            this.y = (1 - value) * (1 - value) * this._pos0.y + 2 * value * (1 - value) * this._pos1.y + value * value * this._pos2.y;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 向上移动
     */
    SCTView.prototype.MoveOver = function (duration) {
        this.alpha = 0;
        egret.Tween.get(this).to({ y: this.y - 120 }, duration, egret.Ease.circOut).call(this.onComplete, this);
        egret.Tween.get(this).to({ alpha: 1 }, duration * 0.6, egret.Ease.circOut)
            .to({ alpha: 0 }, duration * 0.4, egret.Ease.circIn);
    };
    /**
     * 按方向移动
     * @param duration 缓动时长
     * @param direction 移动方向
     * @param scale 初始大小
     * @param addScale 中途放大倍数
     */
    SCTView.prototype.moveToDic = function (duration, direction, scale, addScale) {
        if (scale === void 0) { scale = 1; }
        if (addScale === void 0) { addScale = 1; }
        this.scaleX = this.scaleY = scale;
        //贝塞尔三点
        this._pos0 = new Vector2D(this.x, this.y);
        var vDic = new Vector2D(150);
        vDic.angle = direction / 180 * Math.PI;
        this._pos1 = this._pos0.add(vDic);
        this._pos2 = new Vector2D(this._pos1.x, this._pos1.y + 50);
        egret.Tween.get(this).to({ factor: 1 }, duration, egret.Ease.circOut).call(this.onComplete, this);
        egret.Tween.get(this).to({ scaleX: scale * addScale, scaleY: scale * addScale }, duration * 0.2, egret.Ease.circOut)
            .to({ scaleX: scale, scaleY: scale }, duration * 0.2, egret.Ease.circIn)
            .to({ alpha: 0 }, duration * 0.6);
    };
    SCTView.prototype.onComplete = function () {
        Manager.pool.push(this);
    };
    SCTView.prototype.unuse = function () {
        if (this.parent != null)
            this.parent.removeChild(this);
        this.x = 0;
        this.y = 0;
        this.alpha = 1;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
        this.visible = true;
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 0;
        Manager.pool.push(this._num);
        this._num = null;
        if (this._subView) {
            Manager.pool.push(this._subView);
            this._subView = null;
        }
        egret.Tween.removeTweens(this);
    };
    SCTView.prototype.dispose = function () {
        if (this.parent != null)
            this.parent.removeChild(this);
        this._pos0 = null;
        this._pos1 = null;
        this._pos2 = null;
        egret.Tween.removeTweens(this);
        Manager.pool.push(this._num);
        this._num = null;
        if (this._subView) {
            Manager.pool.push(this._subView);
            this._subView = null;
        }
    };
    return SCTView;
}(egret.DisplayObjectContainer));
__reflect(SCTView.prototype, "SCTView", ["cw.IPool", "cw.IDispose"]);
//# sourceMappingURL=SCTView.js.map