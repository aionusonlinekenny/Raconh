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
 * 个人boss项
 * luzhihong
 * create 2017-12.25
 */
var BossPrivateItem = /** @class */ (function (_super) {
    __extends(BossPrivateItem, _super);
    function BossPrivateItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("boss", "BossPrivateItemSkin");
        return _this;
    }
    BossPrivateItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.addEvent();
    };
    BossPrivateItem.prototype.dataChanged = function () {
        this._cvo = this.data;
        this._back.load(Manager.path.getBossItemBackPath(this.itemIndex % 4));
        this._head.load(Manager.path.getBossHeadPath(this._cvo.boss.url));
        this._txtName.text = this._cvo.boss.name;
        var condVo = this._cvo.getCondByType(ConditionVO.REIN);
        if (condVo != null) {
            this._txtLv.text = condVo.value + LangCVO.getContent("common14"); //转
            this._txtCond.text = LangCVO.getContent("boss22", condVo.value); //22	{0}转可挑战
            this._isLvlEnough = condVo.isSatisfy();
        }
        else {
            condVo = this._cvo.getCondByType(ConditionVO.LEVEL);
            if (condVo != null) {
                this._txtLv.text = "Lv." + condVo.value;
                this._txtCond.text = LangCVO.getContent("boss23", condVo.value); //23	{0}级可挑战
                this._isLvlEnough = condVo.isSatisfy();
            }
        }
        this.pushGoods();
        this._goodItems = [];
        var item;
        for (var i = 0, len = this._cvo.show.length; i < len; i++) {
            item = Manager.pool.create(Goods);
            item.x = 160 + i * 115;
            item.y = 40;
            item.data = this._cvo.show[i].item;
            this.addChild(item);
            this._goodItems.push(item);
        }
        this.onUpdate(null);
    };
    BossPrivateItem.prototype.addEvent = function () {
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        // Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_SINGLE, this.onUpdate, this);
    };
    BossPrivateItem.prototype.removeEvent = function () {
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        // Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_SINGLE, this.onUpdate, this);
    };
    BossPrivateItem.prototype.onUpdate = function (e) {
        if (e === void 0) { e = null; }
        if (e == null || e.params.id == this._cvo.id) {
            var color = Color.GREEN_STR;
            if (!this._isLvlEnough) {
                this._label.source = null;
                this._btn.visible = false;
                this._txtCond.visible = true;
            }
            else if (this._cvo.leftNum == 0) {
                this._label.source = "common_label_killed_png";
                this._btn.visible = false;
                this._txtCond.visible = false;
                color = Color.RED_STR;
            }
            else if (this._cvo.saodangCond.isSatisfy() && this._cvo.hasPass) {
                this._label.source = "common_label_saodang_png";
                this._btn.visible = true;
                this._txtCond.visible = false;
            }
            else {
                this._label.source = "common_label_tiaozhan_png";
                this._btn.visible = true;
                this._txtCond.visible = false;
            }
            HtmlUtil.setTextFlow(this._txtLeft, LangCVO.getContent("boss3", HtmlUtil.addColorTag(this._cvo.leftNum + "", color))); //挑战次数：{0}
        }
    };
    BossPrivateItem.prototype.onClickHandler = function (e) {
        if (!this._cvo.isAllCondSatisfy(true))
            return;
        var callback = Manager.pool.create(CallBackInfo, this.enterCopy, this, this._cvo.id);
        if (Manager.model.getBag().isTooLittle(true, callback))
            return;
        this.enterCopy(this._cvo.id);
    };
    BossPrivateItem.prototype.enterCopy = function (id) {
        if (this._cvo.saodangCond.isSatisfy() && this._cvo.hasPass)
            Manager.control.getCopy().saoDang(id);
        else {
            if (!Manager.model.self.canJoinActive(true))
                return;
            Manager.control.getCopy().enter(id);
            Manager.view.hide(30 /* BossPanel */);
        }
    };
    BossPrivateItem.prototype.pushGoods = function () {
        if (this._goodItems) {
            for (var i = this._cvo.show.length - 1; i >= 0; i--) {
                Manager.pool.push(this._goodItems[i]);
            }
            this._goodItems = null;
        }
    };
    BossPrivateItem.prototype.dispose = function () {
        this.removeEvent();
        this.pushGoods();
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._back, this._head, this._txtName, this._txtLv, this._txtLeft, this._btn, this._txtCond);
        ObjectUtil.remove(this._label);
        this._cvo = null;
        this._back = null;
        this._head = null;
        this._txtName = null;
        this._txtLv = null;
        this._txtLeft = null;
        this._btn = null;
        this._label = null;
        this._txtCond = null;
    };
    return BossPrivateItem;
}(ItemRenderer));
//# sourceMappingURL=BossPrivateItem.js.map