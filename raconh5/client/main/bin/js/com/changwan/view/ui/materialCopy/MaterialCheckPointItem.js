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
 * 缥缈录关卡
 * Simon
 * 2018.3.14
 */
var MaterialCheckPointItem = /** @class */ (function (_super) {
    __extends(MaterialCheckPointItem, _super);
    function MaterialCheckPointItem() {
        var _this = _super.call(this) || this;
        _this._star = 0;
        _this.touchEnabled = true;
        _this.skinName = Manager.path.getSkinName("material", "MaterialCheckPointItemSkin");
        return _this;
    }
    MaterialCheckPointItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._starList = [];
        for (var i = 0; i < 5; i++) {
            this._starList.push(this["_star" + (i + 1)]);
            this._starList[i].visible = i + 1 <= this._star;
        }
    };
    MaterialCheckPointItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    MaterialCheckPointItem.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
    };
    Object.defineProperty(MaterialCheckPointItem.prototype, "name", {
        set: function (value) {
            this._name.text = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialCheckPointItem.prototype, "showTuijian", {
        set: function (value) {
            this._tuijian.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialCheckPointItem.prototype, "redIcon", {
        get: function () {
            return this._redIcon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialCheckPointItem.prototype, "star", {
        set: function (value) {
            this._star = value;
            if (this._starList) {
                for (var i = 0; i < this._starList.length; i++) {
                    this._starList[i].visible = i + 1 <= this._star;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    MaterialCheckPointItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this.btn, this._tuijian, this._name);
        this.btn = null;
        if (this._starList) {
            for (var i = 0; i < this._starList.length; i++) {
                if (this._starList[i] && this._starList[i].parent)
                    this._starList[i].parent.removeChild(this._starList[i]);
                this._starList[i] = null;
            }
            this._starList = null;
        }
        this._tuijian = null;
        if (this._name)
            this._name.dispose();
        this._name = null;
    };
    return MaterialCheckPointItem;
}(UIComponent));
//# sourceMappingURL=MaterialCheckPointItem.js.map