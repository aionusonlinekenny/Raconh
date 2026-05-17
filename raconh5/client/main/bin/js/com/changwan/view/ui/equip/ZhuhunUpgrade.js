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
 * 铸魂升阶提示
 */
/**
 * 铸魂升阶提示
 * Simon 2017.11.20
 */
var ZhuhunUpgrade = /** @class */ (function (_super) {
    __extends(ZhuhunUpgrade, _super);
    function ZhuhunUpgrade() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("equip", "ZhuhunUpgradeSkin");
        return _this;
    }
    ZhuhunUpgrade.prototype.setInfo = function (career, level) {
        if (!this._num) {
            this._num = Manager.pool.create(NumImgView2);
            this._num.x = this._upgradeImg.x + 430;
            this._num.y = this._upgradeImg.y + 4;
            this.addChild(this._num);
        }
        this._num.setValue(level, "nums_fighting_", 35);
        this._ji.x = this._num.x + this._num.width + 3;
        var str = "";
        var curInfo = EquipZhuhunCVO.getInfo(career, 1, level);
        if (curInfo) {
            for (var i = 0; i < curInfo.levelAttrList.length; i++) {
                str += AttrDescType.getAttrName(curInfo.levelAttrList[i][0]) + "+" + curInfo.levelAttrList[i][1] + "   ";
            }
        }
        this._attrValue.text = str;
    };
    ZhuhunUpgrade.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._btnImg.touchEnabled = false;
        this._imageBg1.load(Manager.path.getCommonPath("diwenBack1.png"));
        this.onResizeHandler(null);
    };
    ZhuhunUpgrade.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this.baseView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ZhuhunUpgrade.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this.baseView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ZhuhunUpgrade.prototype.onResizeHandler = function (e) {
        this.x = Math.round((Manager.config.gameWidth - this.width) / 2);
    };
    ZhuhunUpgrade.prototype.onClickHandler = function (e) {
        // this.removeFromParent();
        Manager.view.hide(7 /* ZhuhunUpgrade */);
    };
    ZhuhunUpgrade.prototype.show = function (career, level) {
        Manager.layer.tipsLayer.addChild(this);
        this.setInfo(career, level);
    };
    ZhuhunUpgrade.prototype.hide = function () {
        Manager.layer.tipsLayer.removeChild(this);
    };
    ZhuhunUpgrade.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._loadComplete) {
            this._imageBg1.dispose();
            this._imageBg1 = null;
        }
        this.baseView.dispose();
        this.baseView = null;
        this._attrValue.dispose();
        this._attrValue = null;
        this.removeChild(this._btnImg);
        this._btnImg = null;
        this._btn.dispose();
        this._btn = null;
        this.removeChild(this._upgradeImg);
        this._upgradeImg = null;
        if (this._num)
            Manager.pool.push(this._num);
        this._num = null;
    };
    return ZhuhunUpgrade;
}(UIComponent));
//# sourceMappingURL=ZhuhunUpgrade.js.map