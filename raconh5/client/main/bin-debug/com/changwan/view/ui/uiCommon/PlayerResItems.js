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
/***
 * pzx
 * 17.11.10
 * 人物资源Items
 */
var PlayerResItems = (function (_super) {
    __extends(PlayerResItems, _super);
    function PlayerResItems() {
        var _this = _super.call(this) || this;
        _this._type = "";
        _this.sign = "x ";
        _this.color = "#ffffff";
        _this._iconSize = 30;
        _this.skinName = Manager.path.getSkinName("uiCommon", "PlayerResItemsSkin");
        return _this;
    }
    PlayerResItems.prototype.confitUI = function () {
        _super.prototype.configUI.call(this);
    };
    PlayerResItems.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawType();
        this.drawCount();
    };
    PlayerResItems.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawType"))
            this.drawType();
        if (this.isInvalid("drawCount"))
            this.drawCount();
    };
    PlayerResItems.prototype.setData = function (arg) {
        if (arg == null)
            return;
        if (arg.type == GainLossVO.ITEM) {
            return;
        }
        this.type = arg.type.split("_")[0];
        this.count = arg.num;
    };
    Object.defineProperty(PlayerResItems.prototype, "type", {
        set: function (value) {
            if (value == this._type)
                return;
            this._type = value.split("_")[0];
            this.visible = false;
            this.invalidate("drawType");
        },
        enumerable: true,
        configurable: true
    });
    PlayerResItems.prototype.drawType = function () {
        if (this._type) {
            this._resImg.source = "playRes_" + this._type + "_54_png";
            this._resImg.width = this._iconSize;
            this._resImg.height = this._iconSize;
            this._resImg.x = 0;
            this._resImg.y = 0;
            this.height = this._iconSize;
            this._countTxt.x = this._iconSize;
            if (this._iconSize == PlayerResItems.ICON_30) {
                this._countTxt.y = 3;
            }
            else if (this._iconSize == PlayerResItems.ICON_54) {
                this._countTxt.y = 15;
            }
            this.visible = true;
        }
    };
    Object.defineProperty(PlayerResItems.prototype, "count", {
        set: function (value) {
            this._count = value;
            this.invalidate("drawCount");
        },
        enumerable: true,
        configurable: true
    });
    PlayerResItems.prototype.drawCount = function () {
        var str = HtmlUtil.addColorTag(this.sign + StringUtils.getBigNum(this._count), this.color);
        HtmlUtil.setTextFlow(this._countTxt, str);
        this._w = this._iconSize + this._countTxt.textWidth;
    };
    Object.defineProperty(PlayerResItems.prototype, "iconSize", {
        set: function (value) {
            this._iconSize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerResItems.prototype, "width", {
        get: function () {
            return this._w;
        },
        enumerable: true,
        configurable: true
    });
    PlayerResItems.prototype.fontSize = function (value) {
        this._countTxt.size = value;
    };
    PlayerResItems.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._resImg.texture = null;
        this._countTxt.text = "";
        this._type = "icon";
        this._count = 0;
        this._iconSize = PlayerResItems.ICON_30;
    };
    PlayerResItems.prototype.reuse = function (id, size) {
        if (id === void 0) { id = "coin"; }
        if (size === void 0) { size = PlayerResItems.ICON_30; }
        this._type = id;
        this._w = size + 4;
        this._iconSize = size;
    };
    PlayerResItems.prototype.dispose = function () {
        if (this._resImg) {
            this.removeChild(this._resImg);
            this._resImg = null;
        }
        if (this._countTxt) {
            this.removeChild(this._countTxt);
            this._countTxt = null;
        }
        _super.prototype.dispose.call(this);
    };
    PlayerResItems.ICON_30 = 30;
    PlayerResItems.ICON_54 = 54;
    return PlayerResItems;
}(UIComponent));
__reflect(PlayerResItems.prototype, "PlayerResItems");
//# sourceMappingURL=PlayerResItems.js.map