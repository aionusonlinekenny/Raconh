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
 * 绝学圈轴item
 * pzx
 * create 18.3.1
 */
var JuexueJuanzouChileItem = /** @class */ (function (_super) {
    __extends(JuexueJuanzouChileItem, _super);
    function JuexueJuanzouChileItem() {
        var _this = _super.call(this) || this;
        _this._scele = 0.7;
        _this.isScaleBoo = true;
        _this.skinName = Manager.path.getSkinName("juexue", "JuexueJuanzouChileItemSkin");
        _this.touchEnabled = true;
        _this.touchChildren = false;
        return _this;
    }
    JuexueJuanzouChileItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (this.isScaleBoo) {
            this.setScale(this.x);
            this.scaleX = this.scaleY = this._scele;
            this.y = 5 + 260 * (1 - this._scele);
        }
        this._model = Manager.model.getjuexue();
        this._starX = this.x;
    };
    JuexueJuanzouChileItem.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    JuexueJuanzouChileItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAttrItem, this);
        this._model.addEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT, this.onUpgradeLvHandler, this);
    };
    JuexueJuanzouChileItem.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openAttrItem, this);
        this._model.removeEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT, this.onUpgradeLvHandler, this);
    };
    JuexueJuanzouChileItem.prototype.onUpgradeLvHandler = function (e) {
        var cvo = e.params;
        if (cvo.id == this._cvo.id) {
            this._cvo = cvo;
            this._levTxt.text = "" + this._cvo.lev;
        }
        this.showRedIcon();
    };
    JuexueJuanzouChileItem.prototype.openAttrItem = function (e) {
        if (this.x == JuexueJuanzouChileItem.list[2]) {
            JuexueView.instance.playAttrItem(this._cvo);
        }
    };
    JuexueJuanzouChileItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
    };
    JuexueJuanzouChileItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    JuexueJuanzouChileItem.prototype.setData = function (data) {
        this._cvo = data;
        this.invalidate(InvalidationType.DATA);
    };
    JuexueJuanzouChileItem.prototype.drawData = function () {
        this._nameImg.source = "juexue_name_" + this._cvo.id + "_png";
        var loss = new GainLossVO(this._cvo.active_loss);
        var itemCvo = ItemsCVO.getCvo(loss.baseId);
        this._bgImg.source = "juexue_juanzou" + itemCvo.quality + "_png";
        this.showRedIcon();
        if (this._cvo.lev == 0) {
            this._levTxt.visible = false;
            this._jeTxt.visible = false;
            this._actImg.visible = true;
            FilterUtil.setGrayFilter(this._lvGroup);
        }
        else {
            this._levTxt.text = "" + this._cvo.lev;
            this._levTxt.visible = true;
            this._jeTxt.visible = true;
            this._actImg.visible = false;
            this._lvGroup.filters = null;
        }
    };
    JuexueJuanzouChileItem.prototype.showRedIcon = function () {
        this._redIcon.visible = this._cvo.checkUpgrade();
    };
    //=================================================================
    /**
     * dic 方向*陪数
     * autoPlay 是否自动打开卷轴
     */
    JuexueJuanzouChileItem.prototype.onTouchMove = function (dic, autoPlay) {
        if (autoPlay === void 0) { autoPlay = false; }
        var s = dic * JuexueJuanzouChileItem.apg + this.x;
        this.setScale(s);
        egret.Tween.get(this, { loop: false }).to({ x: s, y: 5 + 260 * (1 - this._scele), scaleX: this._scele, scaleY: this._scele, alpha: 1 }, 500).call(this.touchCallback, this, [autoPlay]);
    };
    JuexueJuanzouChileItem.prototype.touchCallback = function (autoPlay) {
        this.dispatchEvent(new egret.Event(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent));
        if (autoPlay && this.x == JuexueJuanzouChileItem.list[2]) {
            JuexueView.instance.playAttrItem(this._cvo);
        }
    };
    //还原初始位置
    JuexueJuanzouChileItem.prototype.initPointX = function () {
        if (this._starX == this.x) {
            return;
        }
        this.x = this._starX;
        this.setScale(this._starX);
        this.scaleX = this.scaleY = this._scele;
        this.y = 5 + 260 * (1 - this._scele);
    };
    JuexueJuanzouChileItem.prototype.setScale = function (value) {
        switch (value) {
            case JuexueJuanzouChileItem.list[2]:
                this._scele = 1;
                break;
            case JuexueJuanzouChileItem.list[1]:
            case JuexueJuanzouChileItem.list[3]:
                this._scele = 0.84;
                break;
            case JuexueJuanzouChileItem.list[0]:
            case JuexueJuanzouChileItem.list[4]:
                this._scele = 0.7;
                break;
        }
    };
    JuexueJuanzouChileItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    JuexueJuanzouChileItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    JuexueJuanzouChileItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        egret.Tween.removeTweens(this);
        ObjectUtil.removes(this._bgImg, this._nameImg, this._redIcon, this._lvGroup, this._actImg);
        this._bgImg = null;
        this._nameImg = null;
        this._levTxt.dispose();
        this._levTxt = null;
        this._redIcon = null;
        this._cvo = null;
        this._model = null;
        this._lvGroup = null;
        this._jeTxt.dispose();
        this._jeTxt = null;
        this._actImg = null;
    };
    /** 最左边 */
    JuexueJuanzouChileItem.maxLife = 7;
    /** 最右边 */
    JuexueJuanzouChileItem.maxRight = 515;
    JuexueJuanzouChileItem.list = [70, 197, 324, 451, 578];
    JuexueJuanzouChileItem.apg = 127;
    JuexueJuanzouChileItem.JuanzouTweenComtleteEvent = "JuanzouTweenComtleteEvent";
    return JuexueJuanzouChileItem;
}(UIComponent));
//# sourceMappingURL=JuexueJuanzouChileItem.js.map