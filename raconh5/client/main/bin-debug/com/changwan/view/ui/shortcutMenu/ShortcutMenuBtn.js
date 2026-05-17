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
 * 快捷菜单按钮
 * liangyan
 * create 2017-11-07
*/
var ShortcutMenuBtn = (function (_super) {
    __extends(ShortcutMenuBtn, _super);
    function ShortcutMenuBtn(type) {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("shortcut", "ShortcutButtonSkin");
        _this.icon = ShortcutMenuFunType.getIconName(type);
        _this.type = type;
        return _this;
    }
    ShortcutMenuBtn.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ShortcutMenuBtn;
}(Button));
__reflect(ShortcutMenuBtn.prototype, "ShortcutMenuBtn");
//# sourceMappingURL=ShortcutMenuBtn.js.map