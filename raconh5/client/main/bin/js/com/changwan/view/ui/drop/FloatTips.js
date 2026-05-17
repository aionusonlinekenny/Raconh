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
 * 浮动文本提示
 * luzhihong
 * create 2017-11-20
 */
var FloatTips = /** @class */ (function () {
    function FloatTips() {
    }
    FloatTips.canAdd = function (value) {
        this._canAdd = true;
        if (this._infoList.length > 0)
            this.addTipsItem();
    };
    FloatTips.addTips = function (str, color) {
        if (color === void 0) { color = Color.WHITE; }
        this._infoList.push(new FloatTipsInfo(str, color));
        if (this._canAdd)
            this.addTipsItem();
    };
    FloatTips.addTipsItem = function () {
        this._canAdd = false;
        var item = Manager.pool.create(FloatTipsItem, this._infoList.shift());
        this._itemList.push(item);
        for (var i = 0, len = this._itemList.length; i < len - 1; i++) {
            this._itemList[i].index = len - i - 1;
        }
    };
    FloatTips.removeTipsItem = function (item) {
        if (item != null) {
            Manager.pool.push(item);
            var index = this._itemList.indexOf(item);
            if (index != -1)
                this._itemList.splice(index, 1);
        }
    };
    FloatTips._canAdd = true;
    FloatTips._infoList = [];
    FloatTips._itemList = [];
    return FloatTips;
}());
var FloatTipsItem = /** @class */ (function (_super) {
    __extends(FloatTipsItem, _super);
    function FloatTipsItem() {
        var _this = _super.call(this) || this;
        _this.START_Y = 460;
        _this.skinName = Manager.path.getSkinName("drop", "DropTipsItemSkin");
        _this.touchEnabled = false;
        return _this;
    }
    Object.defineProperty(FloatTipsItem.prototype, "index", {
        set: function (value) {
            egret.Tween.get(this).to({ y: this.START_Y - (this.height + 2) * value }, 250, egret.Ease.circOut);
        },
        enumerable: true,
        configurable: true
    });
    FloatTipsItem.prototype.tweenComplete = function () {
        FloatTips.canAdd(true);
    };
    FloatTipsItem.prototype.remove = function () {
        FloatTips.removeTipsItem(this);
    };
    FloatTipsItem.prototype.reuse = function (info) {
        this.touchEnabled = this.touchChildren = false;
        this._name.textColor = info.color;
        HtmlUtil.setTextFlow(this._name, info.str);
        this.x = (Manager.config.gameWidth - this.width) >> 1;
        this.y = this.START_Y;
        this.alpha = 0;
        Manager.layer.tipsLayer.addChild(this);
        egret.Tween.get(this).to({ alpha: 1 }, 300).call(this.tweenComplete, this);
        Manager.render.add(this.remove, this, 1800, 1);
    };
    FloatTipsItem.prototype.unuse = function () {
        egret.Tween.removeTweens(this);
        Manager.render.remove(this.remove, this);
        _super.prototype.unuse.call(this);
    };
    FloatTipsItem.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
        Manager.render.remove(this.remove, this);
        _super.prototype.dispose.call(this);
    };
    return FloatTipsItem;
}(UIComponent));
var FloatTipsInfo = /** @class */ (function () {
    function FloatTipsInfo(str, color) {
        if (color === void 0) { color = Color.DEF; }
        this.str = str;
        this.color = color;
    }
    return FloatTipsInfo;
}());
//# sourceMappingURL=FloatTips.js.map