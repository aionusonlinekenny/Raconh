var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
 * boss敌人
 * luzh
 * create 2017-12.25
*/
var BossEnemyItem = (function (_super) {
    __extends(BossEnemyItem, _super);
    function BossEnemyItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("boss", "BossEnemyItemSkin");
        _this.touchChildren = true;
        return _this;
    }
    BossEnemyItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._bar.mask = this._barMask;
    };
    Object.defineProperty(BossEnemyItem.prototype, "info", {
        set: function (value) {
            if (this._info != value) {
                this._info = value;
                this._head.load(Manager.path.getRoleHeadPath(1, this._info.career));
                // this._txtPower.text = LangCVO.getContent("boss12") + GameUtil.getNumShortStr(this._info.power);//12	战力:
                this._txtPower.text = this._info.name;
            }
            this._barMask.scaleX = this._info.curBlood / this._info.totalBlood;
        },
        enumerable: true,
        configurable: true
    });
    BossEnemyItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    BossEnemyItem.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    BossEnemyItem.prototype.onClickHandler = function (e) {
        var info = Manager.model.getGameobject().getPlayerGameObject(this._info.id);
        if (info)
            Manager.model.self.updateTarget(info);
    };
    BossEnemyItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._head, this._bar, this._barMask, this._txtPower);
        this._head = null;
        this._bar = null;
        this._barMask = null;
        this._txtPower = null;
        this._info = null;
    };
    return BossEnemyItem;
}(UIComponent));
__reflect(BossEnemyItem.prototype, "BossEnemyItem");
//# sourceMappingURL=BossEnemyItem.js.map