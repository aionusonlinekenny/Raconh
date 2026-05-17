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
 * pzx
 * 2017.12.14
 * 改名
 */
var RenameView = /** @class */ (function (_super) {
    __extends(RenameView, _super);
    function RenameView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("rename", "RenameViewSkin");
        return _this;
    }
    RenameView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._inputTxt.maxChars = 5;
        this._inputTxt.prompt = LangCVO.getContent("rename5");
        this._inputTxt.textDisplay.textAlign = "center";
        this._loginTxt.visible = false;
        this._self = Manager.model.self;
        this._success = false;
        this._res.visible = false;
    };
    RenameView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._popupView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBtnHandler, this);
        this._okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRenameHandler, this);
        this._self.addEventListener(RenameEvent.UPDATE_RENAME_EVENT, this.onRenameSuccessHandler, this);
        this._itemTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTipsHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    RenameView.prototype.removeEvent = function () {
        this._popupView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBtnHandler, this);
        this._okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRenameHandler, this);
        this._self.removeEventListener(RenameEvent.UPDATE_RENAME_EVENT, this.onRenameSuccessHandler, this);
        this._itemTxt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTipsHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    RenameView.prototype.onRenameSuccessHandler = function () {
        this._success = true;
        this._inputTxt.visible = false;
        this._txt.visible = false;
        this._loginTxt.visible = true;
        this._loginTxt.text = LangCVO.getContent("rename4");
        this._res.visible = false;
        this._itemTxt.visible = false;
    };
    RenameView.prototype.onRenameHandler = function (e) {
        if (this._success) {
            Manager.view.hide(41 /* RenameView */);
            return;
        }
        var name = this._inputTxt.text;
        if (name.length == 0) {
            Manager.tips.showTips(LangCVO.getContent("rename1"), null, false);
            return;
        }
        if (!this._itemLoss.isEnough()) {
            this.onItemTipsHandler();
            return;
        }
        Manager.control.getRename().rename(name);
    };
    RenameView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.updateView();
    };
    RenameView.prototype.updateView = function () {
        this._itemLoss = new GainLossVO(RenameCVO.itemlosse);
        this._itemCvo = ItemsCVO.getCvo(this._itemLoss.baseId);
        var str = HtmlUtil.addUTag(HtmlUtil.addColorTag(this._itemCvo.name, this._itemCvo.colorStr));
        var n = Manager.model.getItems().getCountItemById(this._itemLoss.baseId);
        var par = "(" + n + "/" + this._itemLoss.num + ")";
        if (this._itemLoss.isEnough()) {
            par = HtmlUtil.addColorTag(par, Color.GREEN_STR);
        }
        else {
            par = HtmlUtil.addColorTag(par, Color.RED_STR);
        }
        str = str + par;
        HtmlUtil.setTextFlow(this._itemTxt, str);
        // let gold:GainLossVO = new GainLossVO(RenameCVO.goldlosse);
        // this._res.iconSize = PlayerResItems.ICON_54;
        // this._res.setData(gold);
    };
    RenameView.prototype.onClickBtnHandler = function (e) {
        Manager.view.hide(41 /* RenameView */);
    };
    RenameView.prototype.onItemTipsHandler = function (e) {
        if (e === void 0) { e = null; }
        if (this._itemCvo) {
            Manager.view.show(9 /* ItemsTips */, this._itemCvo);
        }
    };
    RenameView.prototype.show = function () {
        if (this.parent == null) {
            this.onResizeHandler(null);
            Manager.layer.tipsLayer.addChild(this);
        }
    };
    RenameView.prototype.hide = function () {
        this.dispose();
    };
    RenameView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    RenameView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._loadComplete) {
            this._popupView.dispose();
            this._popupView = null;
            this._okBtn.dispose();
            this._okBtn = null;
            this._txt.dispose();
            this._txt = null;
            this._inputTxt.dispose();
            this._inputTxt = null;
            this._loginTxt.dispose();
            this._loginTxt = null;
            this._itemTxt.dispose();
            this._res.dispose();
            this._res = null;
            this._self = null;
            this._itemLoss = null;
            this._itemCvo = null;
        }
    };
    return RenameView;
}(UIComponent));
//# sourceMappingURL=RenameView.js.map