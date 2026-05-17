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
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextField.create = function (width, height, textColor, size, textAlign, verticalAlign) {
        if (textColor === void 0) { textColor = 0xffffff; }
        if (size === void 0) { size = 24; }
        if (textAlign === void 0) { textAlign = "left"; }
        if (verticalAlign === void 0) { verticalAlign = "top"; }
        var result = Manager.pool.create(TextField);
        result.fontFamily = "Microsoft YaHei";
        result.size = size;
        result.width = width;
        result.height = height;
        result.textColor = textColor;
        result.textAlign = textAlign;
        result.verticalAlign = verticalAlign;
        return result;
    };
    TextField.prototype.reuse = function () {
    };
    TextField.prototype.move = function (x, y) {
        this.x = x;
        this.y = y;
    };
    TextField.prototype.pool = function () {
        Manager.pool.push(this);
    };
    TextField.prototype.unuse = function () {
        if (this.parent != null)
            this.parent.removeChild(this);
        this.cacheAsBitmap = false;
        this.touchEnabled = false;
        this.x = 0;
        this.y = 0;
        this.alpha = 1;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
        this.visible = true;
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 0;
        this.text = "";
        this.$TextField =
            {
                0: egret.TextField.default_size,
                1: 0,
                2: egret.TextField.default_textColor,
                3: NaN,
                4: NaN,
                5: 0,
                6: 0,
                7: 0,
                8: egret.TextField.default_fontFamily,
                9: "left",
                10: "top",
                11: "#ffffff",
                12: "",
                13: "",
                14: [],
                15: false,
                16: false,
                17: true,
                18: false,
                19: false,
                20: false,
                21: 0,
                22: 0,
                23: 0,
                24: egret.TextFieldType.DYNAMIC,
                25: 0x000000,
                26: "#000000",
                27: 0,
                28: -1,
                29: 0,
                30: false,
                31: false,
                32: 0x000000,
                33: false,
                34: 0xffffff,
                35: null,
                36: null,
                37: egret.TextFieldInputType.TEXT //inputType
            };
    };
    TextField.prototype.dispose = function () {
        if (this.parent != null)
            this.parent.removeChild(this);
    };
    return TextField;
}(egret.TextField));
__reflect(TextField.prototype, "TextField", ["cw.IPool", "cw.IDispose"]);
//# sourceMappingURL=TextField.js.map