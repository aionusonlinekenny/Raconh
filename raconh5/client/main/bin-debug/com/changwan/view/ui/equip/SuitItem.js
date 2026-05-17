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
var SuitItem = (function (_super) {
    __extends(SuitItem, _super);
    function SuitItem() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.skinName = Manager.path.getSkinName("equip", "SuitItemSkin");
        return _this;
    }
    SuitItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.touchEnabled = true;
        this._item.isSuitItem = true;
        this._item.jia = 0;
    };
    Object.defineProperty(SuitItem.prototype, "item", {
        get: function () {
            return this._item;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuitItem.prototype, "kuang", {
        get: function () {
            return this._kuang;
        },
        enumerable: true,
        configurable: true
    });
    SuitItem.prototype.tao = function (type) {
        if (type == 1)
            return this._tao1;
        else
            return this._tao2;
    };
    Object.defineProperty(SuitItem.prototype, "equipImg", {
        get: function () {
            return this._equipItemIcon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuitItem.prototype, "redIcon", {
        get: function () {
            return this._redIcon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuitItem.prototype, "jie", {
        set: function (value) {
            this._jieImg.visible = value > 0;
            this._jiaLabel.visible = this._jieImg.visible;
            if (value > 0)
                this._jieTxt.text = LangCVO.getContent("equip" + (40 + value));
            else
                this._jieTxt.text = "";
        },
        enumerable: true,
        configurable: true
    });
    SuitItem.prototype.clear = function () {
        this._item.clear();
        this._kuang.visible = false;
        this._equipItemIcon.visible = true;
        this._tao1.visible = false;
        this._tao2.visible = false;
        this._redIcon.visible = false;
        this._jieImg.visible = false;
        this._jieTxt.text = "";
        this._jiaLabel.visible = false;
    };
    SuitItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._item)
            this._item.dispose();
        this._item = null;
        this._kuang = null;
        this._equipItemIcon = null;
        this._tao1 = null;
        this._tao2 = null;
        this._redIcon = null;
        this._jieImg = null;
        this._jieTxt = null;
        this._jiaLabel = null;
    };
    return SuitItem;
}(UIComponent));
__reflect(SuitItem.prototype, "SuitItem");
//# sourceMappingURL=SuitItem.js.map