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
 *author Anydo
 *create 2018-1-4
 *description
*/
var ArenaRankHeadView = /** @class */ (function (_super) {
    __extends(ArenaRankHeadView, _super);
    function ArenaRankHeadView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("arena", "ArenaRankHeadViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    ArenaRankHeadView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._num = Manager.pool.create(NumImgView2);
        this._num.y = 133;
        this.addChild(this._num);
    };
    ArenaRankHeadView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._btnPK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
    };
    ArenaRankHeadView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        if (this._btnPK)
            this._btnPK.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
    };
    ArenaRankHeadView.prototype.onBtnClickHandler = function (e) {
        if (e != null && Manager.model.getGuide().curID == GuideID.CLUB_JOIN)
            return;
        Manager.model.getArena().PKHandler(this._info.rank, this._info.power, this._info.playerName);
    };
    Object.defineProperty(ArenaRankHeadView.prototype, "info", {
        set: function (value) {
            this._info = value;
            this.setSecondValue(this._info.rank);
            this._txtName.text = this._info.playerName;
            this._txtPower.text = LangCVO.getContent("arena11") + this._info.power;
            this._imageHead.load(Manager.path.getRoleHeadPath(2, this._info.career));
        },
        enumerable: true,
        configurable: true
    });
    ArenaRankHeadView.prototype.clickFun = function () {
        this.onBtnClickHandler(null);
    };
    ArenaRankHeadView.prototype.setSecondValue = function (value) {
        if (this._num == null)
            return;
        this._num.setValue(value, "nums_vip_", 25, 0);
        var tempW = String(value).length * 25;
        this._num.x = (244 - tempW) / 2;
        this._pic1.x = this._num.x - 38;
        this._pic2.x = this._num.x + tempW + 10;
    };
    ArenaRankHeadView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._loadComplete) {
            if (this._imageHead)
                this._imageHead.dispose();
            this._imageHead = null;
            if (this._txtName)
                this._txtName.dispose();
            this._txtName = null;
            if (this._txtPower)
                this._txtPower.dispose();
            this._txtPower = null;
            if (this._btnPK)
                this._btnPK.dispose();
            this._btnPK = null;
            this._pic1 = null;
            this._pic2 = null;
            if (this._num)
                Manager.pool.push(this._num);
            this._num = null;
        }
        this._info = null;
    };
    return ArenaRankHeadView;
}(UIComponent));
//# sourceMappingURL=ArenaRankHeadView.js.map