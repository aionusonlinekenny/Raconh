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
var BossEnemyView = (function (_super) {
    __extends(BossEnemyView, _super);
    function BossEnemyView() {
        var _this = _super.call(this) || this;
        _this._isShow = true;
        _this.ITEM_HEIGHT = 132;
        _this.skinName = Manager.path.getSkinName("boss", "BossEnemyViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    BossEnemyView.prototype.show = function () {
        if (this.parent == null) {
            this.y = 250;
            Manager.layer.tipsLayer.addChild(this);
        }
    };
    BossEnemyView.prototype.hide = function () {
        this.dispose();
    };
    BossEnemyView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._items = [];
    };
    BossEnemyView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getBoss().addEventListener(BossEvent.ENEMY_LIST, this.updateList, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    BossEnemyView.prototype.removeEvent = function () {
        Manager.model.getBoss().removeEventListener(BossEvent.ENEMY_LIST, this.updateList, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    BossEnemyView.prototype.onTouchHandler = function (e) {
        this._isShow = !this._isShow;
        this.invalidate("drawShowList");
    };
    BossEnemyView.prototype.updateList = function (e) {
        this.invalidate("drawList");
    };
    BossEnemyView.prototype.drawList = function () {
        this._list = Manager.model.getBoss().enemyList;
        var len = this._list.length;
        var max = len >= this._items.length ? len : this._items.length;
        for (var i = 0; i < max; i++) {
            if (i < len) {
                if (i < this._items.length) {
                    this._items[i].info = this._list[i];
                }
                else {
                    var item = new BossEnemyItem();
                    item.y = this.ITEM_HEIGHT * i;
                    item.info = this._list[i];
                    this._items.push(item);
                }
                ObjectUtil.addOrRemove(this._items[i], this._group, true);
            }
            else {
                ObjectUtil.addOrRemove(this._items[i], this._group, false);
            }
        }
        if (this._isShow)
            this.drawShowList();
    };
    BossEnemyView.prototype.drawShowList = function () {
        if (this._isShow) {
            this._arrow.scaleY = 1;
            this.addChild(this._group);
        }
        else {
            this._arrow.scaleY = -1;
            ObjectUtil.remove(this._group);
        }
    };
    BossEnemyView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawList"))
            this.drawList();
        if (this.isInvalid("drawShowList"))
            this.drawShowList();
    };
    BossEnemyView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawList();
        this.drawShowList();
    };
    BossEnemyView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._btn, this._arrow, this._group);
        for (var i = this._items.length - 1; i >= 0; i--) {
            this._items[i].dispose();
        }
        this._btn = null;
        this._arrow = null;
        this._group = null;
        this._items = null;
        this._list = null;
    };
    return BossEnemyView;
}(UIComponent));
__reflect(BossEnemyView.prototype, "BossEnemyView", ["IViewManager"]);
//# sourceMappingURL=BossEnemyView.js.map