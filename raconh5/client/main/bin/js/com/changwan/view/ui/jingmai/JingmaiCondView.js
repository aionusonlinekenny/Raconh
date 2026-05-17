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
 * 2017.11.21
 * 免伤属性
 */
var JingmaiCondView = /** @class */ (function (_super) {
    __extends(JingmaiCondView, _super);
    function JingmaiCondView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("jingmai", "JingmaiCondViewSkin");
        return _this;
    }
    JingmaiCondView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._module = Manager.model.getJingMai();
        this._self = Manager.model.self;
        this._popupView.bgHeight = 306;
    };
    JingmaiCondView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
    };
    JingmaiCondView.prototype.removeEvent = function () {
        this._backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    JingmaiCondView.prototype.onTouchCloseHandler = function (e) {
        Manager.view.hide(42 /* JingmaiCondView */);
    };
    JingmaiCondView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    JingmaiCondView.prototype.drawData = function () {
        var info = this._self;
        if (info) {
            var level = this._module.getId(info.id);
            if (level === undefined) {
                //空的时候默认读0
                level = 0;
            }
            var cvo = JingMaiCVO.getInfo(level);
            var needcond = void 0;
            if (cvo.cond >= JingMaiCVO.maxCond) {
                //最高层
                needcond = cvo.cond;
            }
            else {
                needcond = cvo.cond + 1;
            }
            var jingmaiList = JingMaiCVO.getCondList(needcond, cvo.jingmaiType);
            var cvo2 = jingmaiList[0];
            var str = "经脉" + (cvo.cond - 1) + "层<font color='#37B700'>（达成）</font>";
            this._nameTxt1.textFlow = new egret.HtmlTextParser().parse(str);
            var attr = Manager.pool.create(AttrVO, cvo.attr);
            this._valueTxt1.text = "免伤" + (attr.getNum(AttrVO.DMG_REDUCE) / 1000 * 100).toFixed(1) + "%";
            Manager.pool.push(attr);
            if (level >= JingMaiCVO.maxLevel) {
                //最大级
                this._arrowImg.visible = false;
                this._valueTxt2.visible = false;
                this._nameTxt2.visible = false;
                var str_1 = "经脉" + (cvo.cond - 1) + "层<font color='#37B700'>（满级）</font>";
                this._nameTxt1.textFlow = new egret.HtmlTextParser().parse(str_1);
                this._nameTxt1.x = 118;
                this._valueTxt1.x = 131;
                return;
            }
            str = "经脉" + cvo.cond + "层<font color='#ff0000'>（" + (cvo.jingmaiType - 1) + "/8）</font>";
            this._nameTxt2.textFlow = new egret.HtmlTextParser().parse(str);
            if (cvo2) {
                var attr2 = Manager.pool.create(AttrVO, cvo2.attr);
                this._valueTxt2.text = "免伤" + (attr2.getNum(AttrVO.DMG_REDUCE) / 1000 * 100).toFixed(1) + "%";
                Manager.pool.push(attr2);
            }
        }
    };
    JingmaiCondView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._loadComplete) {
            this._backBtn.dispose();
            this._backBtn = null;
            this._nameTxt1.dispose();
            this._nameTxt1 = null;
            this._valueTxt1.dispose();
            this._valueTxt1 = null;
            this._nameTxt2.dispose();
            this._nameTxt2 = null;
            this._valueTxt2.dispose();
            this._valueTxt2 = null;
            this._self = null;
            this._module = null;
            this._arrowImg.parent.removeChild(this._arrowImg);
            this._arrowImg = null;
        }
    };
    return JingmaiCondView;
}(PopUpView));
//# sourceMappingURL=JingmaiCondView.js.map