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
 * 全民boss项
 * luzhihong
 * create 2017-12.25
 */
var BossPublicItem = (function (_super) {
    __extends(BossPublicItem, _super);
    function BossPublicItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("boss", "BossPublicItemSkin");
        return _this;
    }
    BossPublicItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._model = Manager.model.getBoss();
        this._bar.labelFunction = function (value, maximum) { return Math.floor(value / maximum * 100) + "%"; };
        this.addEvent();
    };
    BossPublicItem.prototype.dataChanged = function () {
        this._cvo = this.data;
        this._back.load(Manager.path.getBossItemBackPath(this.itemIndex % 4));
        this._head.load(Manager.path.getBossHeadPath(this._cvo.boss.url));
        this._pkIcon.visible = this._cvo.pkMode > 0;
        this._txtName.text = this._cvo.boss.name;
        // this._txtLv.text = "Lv."+this._cvo.boss.level;
        if (this._cvo.condVo != null) {
            if (this._cvo.condVo.type == ConditionVO.REIN) {
                this._txtLv.text = this._cvo.condVo.value + LangCVO.getContent("common14"); //转
                this._txtCond.text = LangCVO.getContent("boss22", this._cvo.condVo.value); //22	{0}转可挑战
            }
            else {
                this._txtLv.text = "Lv." + this._cvo.condVo.value;
                this._txtCond.text = LangCVO.getContent("boss23", this._cvo.condVo.value); //23	{0}级可挑战
            }
        }
        this.pushGoods();
        this._goodItems = [];
        var item;
        for (var i = 0, len = this._cvo.show.length; i < len; i++) {
            item = Manager.pool.create(Goods);
            item.x = 160 + i * 114;
            item.y = 40;
            item.data = this._cvo.show[i].item;
            this.addChild(item);
            this._goodItems.push(item);
        }
        this.onBossUpdate(null);
        this.onAttentionUpdate(null);
    };
    BossPublicItem.prototype.addEvent = function () {
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._checkBox.addEventListener(egret.Event.CHANGE, this.onCheckBoxChange, this);
        this._model.addEventListener(BossEvent.BLOOD_INFO, this.onBossUpdate, this);
        this._model.addEventListener(BossEvent.ATTENTION, this.onAttentionUpdate, this);
    };
    BossPublicItem.prototype.removeEvent = function () {
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._checkBox.removeEventListener(egret.Event.CHANGE, this.onCheckBoxChange, this);
        this._model.removeEventListener(BossEvent.BLOOD_INFO, this.onBossUpdate, this);
        this._model.removeEventListener(BossEvent.ATTENTION, this.onAttentionUpdate, this);
    };
    BossPublicItem.prototype.onBossUpdate = function (e) {
        if (e === void 0) { e = null; }
        if (!this._cvo.condVo.isSatisfy()) {
            this._txt0.text = LangCVO.getContent("boss8"); //血量：
            this._bar.maximum = 1;
            this._bar.value = 1;
            this._txtCond.visible = true;
            this._checkBox.visible = false;
            this._btn.visible = false;
            this._label.source = null;
        }
        else {
            this._txtCond.visible = false;
            this._checkBox.visible = true;
            if (this._cvo.isKilled) {
                Manager.render.add(this.countdown, this, 1000);
                this.countdown();
                this._bar.visible = false;
                this._btn.visible = false;
                this._label.source = "common_label_killed_png";
            }
            else {
                Manager.render.remove(this.countdown, this);
                this._txt0.text = LangCVO.getContent("boss8"); //血量：
                this._bar.maximum = this._cvo.totalBlood;
                this._bar.value = this._cvo.curBlood;
                this._bar.visible = true;
                this._btn.visible = true;
                this._label.source = "common_label_tiaozhan_png";
            }
        }
    };
    BossPublicItem.prototype.countdown = function () {
        var left = this._cvo.leftTime;
        this._txt0.text = cw.DateUtil.formatStr(left, cw.DateUtil.LEFT_HH_MM_SS, true) + LangCVO.getContent("boss9"); //后重生
        if (left <= 0)
            Manager.render.remove(this.countdown, this);
    };
    BossPublicItem.prototype.onAttentionUpdate = function (e) {
        if (e === void 0) { e = null; }
        this._checkBox.selected = this._cvo.isAttention;
    };
    BossPublicItem.prototype.onCheckBoxChange = function (e) {
        Manager.control.getBoss().attention(this._cvo.id, this._checkBox.selected);
    };
    BossPublicItem.prototype.onClickHandler = function (e) {
        if (this._model.challengeNum <= 0) {
            FloatTips.addTips(LangCVO.getContent("boss15")); //
            return;
        }
        if (!this._cvo.condVo.isSatisfy(null, true))
            return;
        if (!Manager.model.self.canJoinActive(true))
            return;
        var callBack = Manager.pool.create(CallBackInfo, this.enterBoss, this, this._cvo.id);
        if (Manager.model.getBag().isTooLittle(true, callBack))
            return;
        this.enterBoss(this._cvo.id);
    };
    BossPublicItem.prototype.enterBoss = function (id) {
        Manager.control.getBoss().enter(id);
        Manager.view.hide(30 /* BossPanel */);
    };
    BossPublicItem.prototype.pushGoods = function () {
        if (this._goodItems) {
            for (var i = this._cvo.show.length - 1; i >= 0; i--) {
                Manager.pool.push(this._goodItems[i]);
            }
            this._goodItems = null;
        }
    };
    BossPublicItem.prototype.dispose = function () {
        Manager.render.remove(this.countdown, this);
        this.removeEvent();
        this.pushGoods();
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._back, this._head, this._txtName, this._txtLv, this._txt0, this._txtCond, this._btn, this._bar, this._checkBox);
        ObjectUtil.removes(this._label, this._pkIcon);
        this._model = null;
        this._cvo = null;
        this._back = null;
        this._head = null;
        this._txtName = null;
        this._txtLv = null;
        this._txt0 = null;
        this._txtCond = null;
        this._btn = null;
        this._label = null;
        this._bar = null;
        this._checkBox = null;
        this._pkIcon = null;
    };
    return BossPublicItem;
}(ItemRenderer));
__reflect(BossPublicItem.prototype, "BossPublicItem");
//# sourceMappingURL=BossPublicItem.js.map