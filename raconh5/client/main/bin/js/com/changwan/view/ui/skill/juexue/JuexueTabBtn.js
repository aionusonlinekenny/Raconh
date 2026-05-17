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
 * 绝学秘籍按钮
 * pzx
 * create 18.2.26
 */
var JuexueTabBtn = /** @class */ (function (_super) {
    __extends(JuexueTabBtn, _super);
    function JuexueTabBtn() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("juexue", "JuexueTabBtnSkin");
        return _this;
    }
    JuexueTabBtn.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._model = Manager.model.getjuexue();
        this.addEvent();
    };
    JuexueTabBtn.prototype.addEvent = function () {
        this._model.addEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT, this.showRedIcon, this);
    };
    JuexueTabBtn.prototype.removeEvent = function () {
        this._model.removeEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT, this.showRedIcon, this);
    };
    JuexueTabBtn.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this._nameImg.source = "juexue_esoterica" + this.data.type + "_png";
        if (this.data.isSelected) {
            this._touch = this.data.isSelected;
            this.setImg();
            delete this.data.isSelected;
        }
        this.showRedIcon();
    };
    JuexueTabBtn.prototype.showRedIcon = function () {
        this._redIcon.visible = this._model.checkUpgrade(this.data.type);
    };
    JuexueTabBtn.prototype.isSelected = function (touch) {
        this._touch = touch;
        if (this._loadCompltet) {
            this.setImg();
        }
    };
    JuexueTabBtn.prototype.setImg = function () {
        if (this._touch) {
            this._bgImg.source = "juexue_xuanzhong_png";
        }
        else {
            this._bgImg.source = "juexue_weixuanzhong_png";
        }
    };
    JuexueTabBtn.prototype.dispose = function () {
        this.removeEvent();
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._bgImg, this._nameImg, this._redIcon);
        this._bgImg = null;
        this._nameImg = null;
        this._redIcon = null;
        this._model = null;
    };
    return JuexueTabBtn;
}(ItemRenderer));
//# sourceMappingURL=JuexueTabBtn.js.map