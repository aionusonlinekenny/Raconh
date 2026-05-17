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
var RoleAttrView = /** @class */ (function (_super) {
    __extends(RoleAttrView, _super);
    function RoleAttrView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("role", "RoleAttrViewSkin");
        _this.visible = false;
        return _this;
    }
    RoleAttrView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.visible = true;
        this.onResizeHandler(null);
        this._baseView.diImgVisible = false;
        this._baseView.titleBg.visible = false;
        var attrList = [13, 11, 15, 14, 16, 17, 18, 19];
        var addAttrList = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
        for (var i = 1; i <= 10; i++) {
            if (i <= 8) {
                this["_attrName" + i].text = AttrDescType.getAttrName(attrList[i - 1]);
                this["_attrValue" + i].text = Manager.model.self.attrInfo.getValue(attrList[i - 1]);
            }
            this["_attrAddName" + i].text = AttrDescType.getAttrName(addAttrList[i - 1]);
            this["_attrAddValue" + i].text = (Manager.model.self.attrInfo.getValue(addAttrList[i - 1]) / 10) + "%";
        }
    };
    RoleAttrView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._baseView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    RoleAttrView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._baseView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    RoleAttrView.prototype.onResizeHandler = function (e) {
        this.width = Manager.global.gameMain.stage.stageWidth;
    };
    RoleAttrView.prototype.onClickHandler = function (e) {
        Manager.view.hide(21 /* RoleAttrView */);
    };
    RoleAttrView.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        Manager.layer.tipsLayer.addChild(this);
    };
    RoleAttrView.prototype.hide = function () {
        this.dispose();
    };
    RoleAttrView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        for (var i = 1; i <= 10; i++) {
            if (i <= 8) {
                if (this["_attrName" + i])
                    this["_attrName" + i].dispose();
                if (this["_attrValue" + i])
                    this["_attrValue" + i].dispose();
            }
            if (this["_attrAddName" + i])
                this["_attrAddName" + i].dispose();
            if (this["_attrAddValue" + i])
                this["_attrAddValue" + i].dispose();
        }
        if (this._baseView)
            this._baseView.dispose();
        this._baseView = null;
    };
    return RoleAttrView;
}(UIComponent));
//# sourceMappingURL=RoleAttrView.js.map