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
 * 经验副本视图
 * luzhihong
 * create 2018.1.11
 */
var CopyExpAddRateView = /** @class */ (function (_super) {
    __extends(CopyExpAddRateView, _super);
    function CopyExpAddRateView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("activity", "CopyExpAddRateViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    CopyExpAddRateView.prototype.show = function () {
        if (this.parent == null) {
            Manager.layer.tipsLayer.addChild(this);
            this.onResizeHandler(null);
        }
    };
    CopyExpAddRateView.prototype.hide = function () {
        this.dispose();
    };
    CopyExpAddRateView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._bgImg) {
            this._bgImg = Manager.pool.create(BitmapRemote);
            this._bgImg.x = 0;
            this._bgImg.y = 554;
            this._bgImg.load(PathInfo.getPath("res/common/panel_bg2.png", LoaderType.IMAGE), 720, 130);
            this.addChildAt(this._bgImg, 4);
        }
        this._model = Manager.model.getCopy().expModel;
        this._txt0.text = LangCVO.getContent("copy13"); //每次成功提升都可增加人物10%的经验收益
        this._cbCoin.label = LangCVO.getContent("copy15"); //银币提升
        this._cbGold.label = LangCVO.getContent("copy16"); //元宝提升
        this._txt4.text = LangCVO.getContent("copy17", CopyExpConfigCVO.up_coin_need.num + CopyExpConfigCVO.up_coin_need.name); //{0}/次
        this._txt5.text = LangCVO.getContent("copy17", CopyExpConfigCVO.up_gold_need.num + CopyExpConfigCVO.up_gold_need.name); //{0}/次
        this.setDef();
    };
    CopyExpAddRateView.prototype.setDef = function () {
        if (this._model.inspireRate < CopyExpConfigCVO.up_coin_rate_max)
            this._cbCoin.selected = true;
        else
            this._cbGold.selected = true;
    };
    CopyExpAddRateView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._model.addEventListener(CopyEvent.EXP_INSPIRE, this.updateExpRate, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.COIN, this.onMoneyUpdateHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.GOLD, this.onMoneyUpdateHandler, this);
        // this._cbCoin.group.addEventListener(egret.Event.CHANGE, this.onChange, this);
    };
    CopyExpAddRateView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._model.removeEventListener(CopyEvent.EXP_INSPIRE, this.updateExpRate, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.COIN, this.onMoneyUpdateHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.GOLD, this.onMoneyUpdateHandler, this);
    };
    CopyExpAddRateView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.config.gameWidth - this.width) / 2;
    };
    CopyExpAddRateView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._btn:
                var type = this._cbCoin.selected ? 0 : 1;
                if (type == 0) {
                    if (this._model.inspireRate >= CopyExpConfigCVO.up_coin_rate_max) {
                        FloatTips.addTips(LangCVO.getContent("copy20")); //银币提升已达上线，请用元宝提升
                        return;
                    }
                }
                else {
                    if (this._model.inspireRate >= CopyExpConfigCVO.up_gold_rate_max) {
                        FloatTips.addTips(LangCVO.getContent("copy21")); //收益加成已达上限
                        return;
                    }
                }
                Manager.control.getCopy().expUpRate(type);
                break;
            case this._btnClose:
                Manager.view.hide(71 /* CopyExpAddRateView */);
                break;
        }
    };
    CopyExpAddRateView.prototype.onMoneyUpdateHandler = function (e) {
        this.invalidate("drawRedIcon");
    };
    CopyExpAddRateView.prototype.updateExpRate = function (e) {
        this.invalidate("drawExpRate");
    };
    CopyExpAddRateView.prototype.drawRedIcon = function () {
        var canUp = false;
        if (this._model.inspireRate < CopyExpConfigCVO.up_coin_rate_max && CopyExpConfigCVO.up_coin_need.isEnough())
            canUp = true;
        // else if(this._model.inspireRate < CopyExpConfigCVO.up_gold_rate_max && CopyExpConfigCVO.up_gold_need.isEnough()) canUp = true;
        this._redIcon.visible = canUp;
    };
    CopyExpAddRateView.prototype.drawExpRate = function () {
        this._txt1.text = LangCVO.getContent("copy14", this._model.inspireRate / 10); //当前提升       经验+{0}%
        this.setDef();
    };
    CopyExpAddRateView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawExpRate"))
            this.drawExpRate();
        if (this.isInvalid("drawRedIcon", "drawExpRate"))
            this.drawRedIcon();
    };
    CopyExpAddRateView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawExpRate();
        this.drawRedIcon();
    };
    CopyExpAddRateView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._txt0, this._txt1, this._txt4, this._txt5, this._cbCoin, this._cbGold, this._btnClose, this._btn);
        ObjectUtil.removes(this._redIcon, this._bgImg);
        this._txt0 = null;
        this._txt1 = null;
        this._txt4 = null;
        this._txt5 = null;
        this._cbCoin = null;
        this._cbGold = null;
        this._btnClose = null;
        this._btn = null;
        this._redIcon = null;
        if (this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
    };
    return CopyExpAddRateView;
}(UIComponent));
//# sourceMappingURL=CopyExpAddRateView.js.map