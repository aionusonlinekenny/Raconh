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
 * 装备熔炼
 * Simon 2017.12.1
 */
var RonglianView = (function (_super) {
    __extends(RonglianView, _super);
    function RonglianView() {
        var _this = _super.call(this) || this;
        _this._openMouth = 244;
        _this._closeMouth = 218;
        _this._changeState = false;
        _this._isShowEffect = false;
        _this._thisTime = 0;
        _this.skinName = Manager.path.getSkinName("bag", "RonglianViewSkin");
        return _this;
    }
    RonglianView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._fuGroup.alpha = 0;
        this._diImg = Manager.pool.create(BitmapRemote);
        this._diImg.x = 0;
        this._diImg.y = 0;
        this._diGroup.addChild(this._diImg);
        this._diImg.load(Manager.path.getRonglianPath("ronglian_di", "png"), 714, 756);
        this._imageBg1.load(Manager.path.getCommonPath("diwenBack1.png"));
        this._itemList = [];
        //Manager.control.getItems().itemsQuery(ItemsType.EQUIE);
        // this.onUpdateItemInfoHandler();
        this.initPoint();
        //引导
        if (Manager.model.getGuide().curID == GuideID.RONG_LIAN) {
            var pos = this._btn.parent.localToGlobal(this._btn.x, this._btn.y);
            Manager.control.getTask().showGuide(pos, this._btn.width >> 1, this._btn.height >> 1, this.guideCB, this, false);
        }
    };
    RonglianView.prototype.hidePnl = function () {
        Manager.view.hide(11 /* BagPanel */);
    };
    RonglianView.prototype.initPoint = function () {
        this._pointList1 = [];
        this._pointList2 = [];
        for (var i = 0; i < 360; i += 72) {
            var radian1 = i * Math.PI / 180;
            var tmpX1 = 65 + Math.cos(radian1) * 1;
            var tmpY1 = 184 + Math.sin(radian1) * 1;
            this._pointList1.push(new egret.Point(tmpX1, tmpY1));
            var radian2 = (i - 180) * Math.PI / 180;
            var tmpX2 = 65 + Math.cos(radian2) * 1;
            var tmpY2 = 184 + Math.sin(radian2) * 1;
            this._pointList2.push(new egret.Point(tmpX2, tmpY2));
        }
    };
    RonglianView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.onUpdateItemInfo();
    };
    RonglianView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("onUpdateItemInfo"))
            this.onUpdateItemInfo();
    };
    RonglianView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateItemInfoHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_UPDATE_EVENT, this.onUpdateItemInfoHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_RONGLIAN_UPDATE_EVENT, this.onRonglianInfoUpdateHandler, this);
    };
    RonglianView.prototype.removeEvent = function () {
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateItemInfoHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_UPDATE_EVENT, this.onUpdateItemInfoHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_RONGLIAN_UPDATE_EVENT, this.onRonglianInfoUpdateHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    RonglianView.prototype.onUpdateItemInfoHandler = function (e) {
        this.invalidate("onUpdateItemInfo");
    };
    RonglianView.prototype.onUpdateItemInfo = function () {
        this.updateData();
        if (this._isAutoRonglian) {
            this._isAutoRonglian = false;
            this.onClickHandler(null);
        }
    };
    RonglianView.prototype.updateData = function () {
        this._itemList = Manager.model.getEquip().getCanRonglianItems(50);
        this._curItemCount = this._itemList.length;
        if (this._itemList.length < 10) {
            for (var i = 0; i < 10 - this._curItemCount; i++) {
                var info = new ItemsModelInfo();
                info.base_id = 0;
                info.quantity = 0;
                this._itemList.push(info);
            }
        }
        this._scrollerList.initBtnListData(RongLianItem, this._itemList, true);
        this._scrollerList.itemList.layout.gap = -8;
    };
    RonglianView.prototype.onRonglianInfoUpdateHandler = function (e) {
        Manager.control.getDrop().showAlert(e.data);
    };
    RonglianView.prototype.onClickHandler = function (e) {
        if (e != null && Manager.model.getGuide().curID == GuideID.RONG_LIAN)
            return;
        if (this._isShowEffect == false && this._itemList.length > 0 && this._curItemCount > 0)
            this.startEffect();
    };
    RonglianView.prototype.startEffect = function () {
        this._isShowEffect = true;
        this._thisPanel.cantClick = this._isShowEffect;
        this._changeState = false;
        this._pointLocal = 0;
        this.showItemEffect();
    };
    RonglianView.prototype.clearItemEffect = function () {
        if (this._itemEffectList1) {
            for (var i = 0; i < this._itemEffectList1.length; i++) {
                if (this._itemEffectList1[i]) {
                    Manager.pool.push(this._itemEffectList1[i]);
                    this._itemEffectList1[i] = null;
                }
            }
        }
    };
    RonglianView.prototype.showItemEffect = function () {
        this.clearItemEffect();
        this._itemEffectList1 = [];
        var addEvent = false;
        for (var i = 0; i < this._itemList.length; i++) {
            if (this._itemList[i].base_id == 0)
                continue;
            var item = this._scrollerList.itemList.getElementAt(i);
            if (item) {
                var itemEffect = Manager.animation.createEffectAnimation("ronglian_kuang");
                itemEffect.x = item.x - 138 - this._scrollerList.scroller.viewport.scrollH;
                itemEffect.y = item.y - 165;
                this._scrollerList.addChild(itemEffect);
                if (itemEffect.x >= -138 && itemEffect.x <= -138 + 110 * 5)
                    itemEffect.visible = true;
                else
                    itemEffect.visible = false;
                this._itemEffectList1.push(itemEffect);
            }
        }
        egret.Tween.get(this._mouth, { loop: false }).wait(200).call(this.onItemEffectCompleteHandler, this);
    };
    RonglianView.prototype.clearItemLzEffect = function () {
        if (this._itemEffectList2) {
            for (var i = 0; i < this._itemEffectList2.length; i++) {
                if (this._itemEffectList2[i]) {
                    Manager.pool.push(this._itemEffectList2[i]);
                    this._itemEffectList2[i] = null;
                }
            }
        }
    };
    RonglianView.prototype.onItemEffectCompleteHandler = function (e) {
        this.clearItemLzEffect();
        this._itemEffectList2 = [];
        var centerPoint = new egret.Point(300, 505);
        for (var i = 0; i < this._itemList.length; i++) {
            if (this._itemList[i].base_id == 0)
                continue;
            var item = this._scrollerList.itemList.getElementAt(i);
            if (item) {
                var itemEffect = Manager.animation.createEffectAnimation("ronglian_lz");
                itemEffect.x = this._scrollerList.x + item.x + 80 - this._scrollerList.scroller.viewport.scrollH - i * 20;
                itemEffect.y = this._scrollerList.y + item.y - 40;
                itemEffect.anchorOffsetX = 50;
                itemEffect.anchorOffsetY = 0;
                this.addChild(itemEffect);
                egret.Tween.get(itemEffect).to({ x: 360, y: 480 }, 500);
                if (itemEffect.x >= this._scrollerList.x + 80 && itemEffect.x <= this._scrollerList.x + 80 + 110 * 5)
                    itemEffect.visible = true;
                else
                    itemEffect.visible = false;
                this._itemEffectList2.push(itemEffect);
                var angle = Math.atan2(itemEffect.y - centerPoint.y, itemEffect.x - centerPoint.x) * (180 / Math.PI) - 90;
                itemEffect.rotation = angle;
            }
        }
        egret.Tween.get(this._mouth, { loop: false }).wait(550).call(this.onItemLzEffectCompleteHandler, this);
    };
    RonglianView.prototype.onItemLzEffectCompleteHandler = function () {
        this.clearItemEffect();
        this.clearItemLzEffect();
        this.showBlastEffect();
    };
    RonglianView.prototype.showBlastEffect = function () {
        this.poolPushBlastAni();
        this._blast = Manager.animation.createEffectAnimation("ronglian_blast");
        this._blast.addEventListener(GlobalEvent.ANIMATION_LOAD_ERROR, this.poolPushBlastAni, this);
        this._blast.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.poolPushBlastAni, this);
        this._blast.x = 0;
        this._blast.y = 130;
        this.addChild(this._blast);
        egret.Tween.get(this._blast, { loop: false }).wait(550).call(this.closeMouth, this);
    };
    RonglianView.prototype.poolPushBlastAni = function (e) {
        if (this._blast == null)
            return;
        this._blast.removeEventListener(GlobalEvent.ANIMATION_LOAD_ERROR, this.poolPushBlastAni, this);
        this._blast.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.poolPushBlastAni, this);
        Manager.pool.push(this._blast);
        this._blast = null;
    };
    RonglianView.prototype.closeMouth = function () {
        egret.Tween.get(this._mouth, { loop: false }).to({ y: this._closeMouth }, 10).call(this.showFlash, this);
    };
    RonglianView.prototype.openMouth = function () {
        egret.Tween.get(this._mouth, { loop: false }).to({ y: this._openMouth }, 10).call(this.effectComplete, this);
    };
    RonglianView.prototype.showFlash = function () {
        egret.Tween.get(this._fuGroup, { loop: false }).to({ alpha: 1 }, 100);
        this.showShakeEffect();
    };
    RonglianView.prototype.showShakeEffect = function () {
        if (this._pointLocal < this._pointList1.length) {
            var point = (this._changeState == false ? this._pointList1[this._pointLocal] : this._pointList2[this._pointLocal]);
            egret.Tween.get(this._monsterImgs, { loop: false }).to({ x: point.x, y: point.y }, 50).call(this.showShakeEffect, this);
            if (this._changeState)
                this._pointLocal += 1;
            this._changeState = !this._changeState;
        }
        else {
            egret.Tween.get(this._monsterImgs).wait(500).call(this.shakeEffectComplete, this);
        }
    };
    RonglianView.prototype.shakeEffectComplete = function () {
        this.openMouth();
    };
    RonglianView.prototype.effectComplete = function () {
        egret.Tween.get(this._fuGroup, { loop: false }).to({ alpha: 0 }, 100);
        this._isShowEffect = false;
        this._thisPanel.cantClick = this._isShowEffect;
        var list = [];
        for (var i = 0; i < this._itemList.length; i++) {
            if (this._itemList[i] && this._itemList[i].base_id != 0) {
                list.push(this._itemList[i]);
            }
        }
        if (list.length > 0)
            Manager.control.getEquip().equipRonglian(list);
    };
    RonglianView.prototype.guideCB = function () {
        this.onClickHandler(null);
        Manager.control.getTask().hideGuide();
        Manager.render.add(this.hidePnl, this, 3000, 1, null, true);
    };
    RonglianView.prototype.reuse = function (value, isAutoRonglian) {
        _super.prototype.reuse.call(this, value);
        this.touchChildren = true;
        this._thisPanel = value;
        this._isAutoRonglian = isAutoRonglian;
    };
    RonglianView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        if (Manager.model.getGuide().curID == GuideID.RONG_LIAN)
            Manager.control.getTask().hideGuide();
        if (Manager.render.contains(this.hidePnl, this))
            Manager.render.remove(this.hidePnl, this);
    };
    RonglianView.prototype.dispose = function () {
        if (Manager.model.getGuide().curID == GuideID.RONG_LIAN)
            Manager.control.getTask().hideGuide();
        if (Manager.render.contains(this.hidePnl, this))
            Manager.render.remove(this.hidePnl, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this, this._monsterImgs, this._mouth, this._fuGroup, this._eye1, this._eye2);
        if (this._diImg)
            this._diImg.dispose();
        this._diImg = null;
        if (this._imageBg1) {
            this._imageBg1.dispose();
            this._imageBg1 = null;
        }
        if (this._scrollerList)
            this._scrollerList.dispose();
        this._scrollerList = null;
        if (this._btn)
            this._btn.dispose();
        this._btn = null;
        this._pointList1 = null;
        this._pointList2 = null;
        this._itemList = null;
        this.poolPushBlastAni();
        this.clearItemEffect();
        this.clearItemLzEffect();
        this._itemEffectList1 = null;
        this._itemEffectList2 = null;
        this._isShowEffect = false;
        this._thisPanel.cantClick = this._isShowEffect;
    };
    return RonglianView;
}(UIComponent));
__reflect(RonglianView.prototype, "RonglianView");
//# sourceMappingURL=RonglianView.js.map