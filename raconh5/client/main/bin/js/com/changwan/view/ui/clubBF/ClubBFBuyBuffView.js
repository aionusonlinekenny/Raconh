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
 * 盟会战购买鼓舞BUFF界面
 * luzh
 * 2018.1.29
 */
var ClubBFBuyBuffView = /** @class */ (function (_super) {
    __extends(ClubBFBuyBuffView, _super);
    function ClubBFBuyBuffView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("clubBF", "ClubBFBuyBuffSkin");
        _this.touchChildren = true;
        return _this;
    }
    ClubBFBuyBuffView.prototype.show = function () {
        if (this.parent == null)
            Manager.layer.tipsLayer.addChildAt(this, 0);
    };
    ClubBFBuyBuffView.prototype.hide = function () {
        this.dispose();
    };
    ClubBFBuyBuffView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._icon.load(Manager.path.getClubBFPath("guwu.png"));
        this.onGoldUpdateHandler(null);
        this.onResizeHandler(null);
    };
    ClubBFBuyBuffView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.GOLD, this.onGoldUpdateHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    ClubBFBuyBuffView.prototype.removeEvent = function () {
        this._btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnCancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.GOLD, this.onGoldUpdateHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ClubBFBuyBuffView.prototype.onGoldUpdateHandler = function (e) {
        var color = ClubBFConfigCVO.club_buff_cost.isEnough() ? Color.GREEN_STR : Color.RED_STR;
        HtmlUtil.setTextFlow(this._txt, LangCVO.getContent("clubBF8", HtmlUtil.addColorTag(ClubBFConfigCVO.club_buff_cost.num + "", color))); //花费      {0}鼓舞，全盟成员攻击+10%
    };
    ClubBFBuyBuffView.prototype.onResizeHandler = function (e) {
        this.x = Math.round((Manager.config.gameWidth - this.width) >> 1);
        this.y = 351;
    };
    ClubBFBuyBuffView.prototype.onTouchHandler = function (e) {
        switch (e.currentTarget) {
            case this._btnConfirm:
                if (Manager.model.getClubBF().clubBFHasBuy)
                    break;
                if (!ClubBFConfigCVO.club_buff_cost.isEnough(true))
                    break;
                Manager.control.getClubBF().buyClubBuff();
                break;
        }
        Manager.view.hide(96 /* ClubBFBuyBuffView */);
    };
    ClubBFBuyBuffView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._icon, this._txt, this._btnConfirm, this._btnCancel);
        ObjectUtil.remove(this._btnClose);
        this._icon = null;
        this._txt = null;
        this._btnConfirm = null;
        this._btnCancel = null;
        this._btnClose = null;
    };
    return ClubBFBuyBuffView;
}(UIComponent));
//# sourceMappingURL=ClubBFBuyBuffView.js.map