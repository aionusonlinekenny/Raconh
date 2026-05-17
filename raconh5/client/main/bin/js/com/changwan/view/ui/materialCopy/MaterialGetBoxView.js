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
 * 缥缈录领取宝箱物品
 */
var MaterialGetBoxView = /** @class */ (function (_super) {
    __extends(MaterialGetBoxView, _super);
    function MaterialGetBoxView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("material", "MaterialGetBoxViewSkin");
        _this.visible = false;
        return _this;
    }
    MaterialGetBoxView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.visible = true;
        this._base.titleImg.source = "common_jiangli_png";
        if (!this._awardSp) {
            this._awardSp = new Sprite();
            this._group.addChild(this._awardSp);
        }
        this.onResizeHandler();
    };
    MaterialGetBoxView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this._model = Manager.model.getMaterialCopy();
        this._nextInfo = MaterialCopyDataCVO.getInfo(this._model.getAwardId + 1);
        var color;
        if (this._model.curStar >= this._nextInfo.star)
            color = Color.GREEN_STR;
        else
            color = Color.RED_STR;
        var str = LangCVO.getContent("material1", this._nextInfo.star, "<font color='" + color + "'>(" + this._model.curStar + "/" + this._nextInfo.star + ")</font>");
        HtmlUtil.setTextFlow(this._txt, str);
        this._itemList = [];
        for (var i = 0; i < this._nextInfo.showAward.length; i++) {
            var item = Manager.pool.create(BaseGoods);
            item.setGainLossVO(this._nextInfo.showAward[i]);
            item.x = i * 120;
            item.y = 480;
            this._awardSp.addChild(item);
            this._itemList.push(item);
        }
        this._awardSp.width = 120 * this._nextInfo.showAward.length;
        this._awardSp.height = 141;
        this._awardSp.x = Math.round((this._group.width - this._awardSp.width) / 2) - 10;
    };
    MaterialGetBoxView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._base.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    MaterialGetBoxView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._base.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    MaterialGetBoxView.prototype.onResizeHandler = function (e) {
        this.width = Manager.global.gameMain.stage.stageWidth;
    };
    MaterialGetBoxView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._base.closeBtn:
                Manager.view.hide(133 /* MaterialGetBoxView */);
                break;
            case this._btn:
                if (this._model.curStar >= this._nextInfo.star) {
                    Manager.control.getMaterialCopy().getAward(this._nextInfo.id);
                    Manager.view.hide(133 /* MaterialGetBoxView */);
                }
                break;
        }
    };
    MaterialGetBoxView.prototype.show = function () {
        Manager.layer.tipsLayer.addChild(this);
    };
    MaterialGetBoxView.prototype.hide = function () {
        this.dispose();
    };
    MaterialGetBoxView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._group, this._base, this._txt, this._btn, this._awardSp);
        this._group = null;
        if (this._base)
            this._base.dispose();
        this._base = null;
        if (this._txt)
            this._txt.dispose();
        this._txt = null;
        if (this._btn)
            this._btn.dispose();
        this._btn = null;
        if (this._itemList) {
            for (var i = 0; i < this._itemList.length; i++) {
                Manager.pool.push(this._itemList[i]);
                this._itemList[i] = null;
            }
            this._itemList = null;
        }
        if (this._awardSp)
            this._awardSp.dispose();
        this._awardSp = null;
        this._model = null;
        this._nextInfo = null;
    };
    return MaterialGetBoxView;
}(UIComponent));
//# sourceMappingURL=MaterialGetBoxView.js.map