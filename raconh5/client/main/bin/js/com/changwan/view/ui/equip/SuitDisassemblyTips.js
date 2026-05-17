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
var SuitDisassemblyTips = /** @class */ (function (_super) {
    __extends(SuitDisassemblyTips, _super);
    function SuitDisassemblyTips() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("equip", "SuitDisassemblyTipsSkin");
        _this.visible = false;
        return _this;
    }
    SuitDisassemblyTips.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.visible = true;
        this._baseView.titleImg.source = "tips_title_png";
        this.onResizeHandler(null);
    };
    SuitDisassemblyTips.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._baseView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    SuitDisassemblyTips.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._baseView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    SuitDisassemblyTips.prototype.onResizeHandler = function (e) {
        this.width = Manager.global.gameMain.stage.stageWidth;
    };
    SuitDisassemblyTips.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._baseView.closeBtn:
            case this._cancelBtn:
                Manager.view.hide(79 /* SuitDisassemblyTips */);
                break;
            case this._okBtn:
                Manager.control.getEquip().suitSplit(this._pos);
                Manager.view.hide(79 /* SuitDisassemblyTips */);
                break;
        }
    };
    SuitDisassemblyTips.prototype.show = function (pos, level) {
        this._pos = pos;
        Manager.layer.tipsLayer.addChild(this);
        var num = 0;
        for (var i = level; i >= 1; i--) {
            var info = SuitCVO.getSuitUpgradeInfo(i, pos);
            if (info) {
                this._item.baseId = info.loss.baseId;
                this._item.bind = info.loss.bind;
                num += info.loss.num;
            }
        }
        this._item.count = num;
    };
    SuitDisassemblyTips.prototype.hide = function () {
        this.dispose();
    };
    SuitDisassemblyTips.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._baseView)
            this._baseView.dispose();
        this._baseView = null;
        if (this._item)
            this._item.dispose();
        this._item = null;
        if (this._okBtn)
            this._okBtn.dispose();
        this._okBtn = null;
        if (this._cancelBtn)
            this._cancelBtn.dispose();
        this._cancelBtn = null;
    };
    return SuitDisassemblyTips;
}(UIComponent));
//# sourceMappingURL=SuitDisassemblyTips.js.map