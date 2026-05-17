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
 * 经验副本视图
 * luzhihong
 * create 2018.1.11
 */
var CopyExpView = (function (_super) {
    __extends(CopyExpView, _super);
    function CopyExpView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("activity", "CopyExpViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    CopyExpView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getCopy().expModel;
        this._cvo = CopyCVO.getCVO(CopyConst.ID_EXP);
        this._back.load(Manager.path.getActivityPath("exp/back0.jpg"));
        HtmlUtil.setTextFlow(this._txtTips, LangCVO.getContent("copy32"));
        this._items = [];
        var item;
        var len = this._cvo.loss.length;
        for (var i = 0; i < len; i++) {
            item = Manager.pool.create(Goods);
            item.x = 140 + i * 128;
            item.y = 845;
            item.data = this._cvo.loss[i].item;
            this.addChild(item);
            this._items.push(item);
        }
    };
    CopyExpView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.addEventListener(CopyEvent.EXP_INFO_UPDATE, this.updateInfo, this);
        Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_BUY_COUNT, this.updateCount, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.updateItem, this);
    };
    CopyExpView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnAdd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.removeEventListener(CopyEvent.EXP_INFO_UPDATE, this.updateInfo, this);
        Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_BUY_COUNT, this.updateCount, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.updateItem, this);
    };
    CopyExpView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._btnEnter:
                if (!this._cvo.isAllCondSatisfy(true))
                    return;
                //是否还有次数
                if (this._model.leftCount == 0) {
                    FloatTips.addTips(LangCVO.getContent("copy5")); //进入次数已满
                    return;
                }
                if (!this._cvo.isLossEnough(true, false)) {
                    var arr = this._cvo.loss;
                    var shopCvo = void 0;
                    for (var i = arr.length - 1; i > -1; i--) {
                        shopCvo = ShopCVO.getbaseIdCvo(arr[i].baseId);
                        if (shopCvo) {
                            Manager.view.show(33 /* ShopBuyView */, shopCvo);
                            break;
                        }
                    }
                    return; //材料是否足够
                }
                if (this._model.nextLeftTime > 0) {
                    FloatTips.addTips(LangCVO.getContent("copy18")); //冷却中
                    return;
                }
                if (!Manager.model.self.canJoinActive(true))
                    return;
                Manager.control.getCopy().enter(this._cvo.id);
                Manager.view.hide(123 /* CopyExpPanel */);
                break;
            case this._btnAdd:
                if (Manager.model.self.attrInfo.vipLevel > 0) {
                    if (!CopyExpConfigCVO.add_cound_need.isEnough(true))
                        return;
                    // 19	是否花费{0}购买1次挑战激活
                    var ok = Manager.pool.create(CallBackInfo, Manager.control.getCopy().buyCount, Manager.control.getCopy(), CopyConst.TYPE_EXP);
                    Manager.tips.showTips(LangCVO.getContent("copy19", CopyExpConfigCVO.add_cound_need.num), ok, true);
                }
                else {
                    // 8	购买次数已达上限，开通vip可获得更多购买次数，是否前往开通？
                    var ok = Manager.pool.create(CallBackInfo, Manager.view.show, Manager.view, 51 /* VipPanel */);
                    Manager.tips.showTips(LangCVO.getContent("copy8"), ok, true);
                }
                break;
        }
    };
    CopyExpView.prototype.updateInfo = function (e) {
        this.invalidate("drawInfo");
    };
    CopyExpView.prototype.updateCount = function (e) {
        this.invalidate("drawCount");
    };
    CopyExpView.prototype.updateItem = function (e) {
        this.invalidate("drawItem");
    };
    CopyExpView.prototype.drawItem = function () {
        for (var i = this._items.length - 1; i >= 0; i--) {
            this._items[i].itemAmount(Manager.model.getItems().getCountItemById(this._cvo.loss[i].baseId), this._cvo.loss[i].num);
        }
    };
    CopyExpView.prototype.drawInfo = function () {
        // 29	下一难度：盟会职位达到<font color='#38b800'>{0}</font>、当前难度<font color='#38b800'>sss</font>通关
        if (this._model.hardLvl < 10)
            HtmlUtil.setTextFlow(this._txtDesc, LangCVO.getContent("copy29", CopyExpConfigCVO.hardDesc[this._model.hardLvl]));
        else
            this._txtDesc.text = "";
        this._imgHardLvl.source = "copy_exp_lv_" + this._model.hardLvl + "_png";
        egret.Tween.removeTweens(this._imgHardLvl);
        this._imgHardLvl.scaleX = this._imgHardLvl.scaleY = 3;
        egret.Tween.get(this._imgHardLvl).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.circIn);
        var cvo = CopyExpScoreCVO.getCVO(this._model.scoreID);
        this._imgScore.source = cvo ? "copy_exp_score_" + cvo.score + "_png" : null;
        if (this._model.nextLeftTime > 0) {
            Manager.render.add(this.countdown, this, 1000);
            this.countdown();
        }
        else {
            Manager.render.remove(this.countdown, this);
            this._txtCooling.text = "";
        }
        this.drawCount();
    };
    CopyExpView.prototype.drawCount = function () {
        var leftCount = this._model.leftCount;
        var str = leftCount + "/" + this._model.totalCount;
        str = HtmlUtil.addColorTag(str, leftCount > 0 ? Color.GREEN_STR : Color.RED_STR);
        str = LangCVO.getContent("copy6") + str; // 6	剩余次数：
        HtmlUtil.setTextFlow(this._txtCount, str);
    };
    CopyExpView.prototype.countdown = function () {
        var left = this._model.nextLeftTime;
        if (left > 0) {
            var str = cw.DateUtil.formatStr(left, cw.DateUtil.LEFT_HH_MM_SS, true);
            str = LangCVO.getContent("copy7") + HtmlUtil.addColorTag(str, Color.GREEN_STR); // 7	冷却时间：
            HtmlUtil.setTextFlow(this._txtCooling, str);
        }
        else {
            Manager.render.remove(this.countdown, this);
            this._txtCooling.text = "";
        }
    };
    CopyExpView.prototype.drawRedIcon = function () {
        this._redIcon.visible = this._model.leftCount > 0 && this._cvo.isLossEnough() && this._cvo.isAllCondSatisfy();
    };
    CopyExpView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawInfo"))
            this.drawInfo();
        if (this.isInvalid("drawCount"))
            this.drawCount();
        if (this.isInvalid("drawItem"))
            this.drawItem();
        if (this.isInvalid("drawInfo", "drawCount", "drawItem"))
            this.drawRedIcon();
    };
    CopyExpView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawInfo();
        this.drawItem();
        this.drawRedIcon();
    };
    CopyExpView.prototype.dispose = function () {
        egret.Tween.removeTweens(this._imgHardLvl);
        Manager.render.remove(this.countdown, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._back, this._txtCount, this._txtTips, this._txtCooling, this._txtDesc, this._btnEnter);
        ObjectUtil.removes(this._btnAdd, this._redIcon, this._imgHardLvl, this._imgScore);
        for (var i = this._items.length - 1; i >= 0; i--) {
            this._items[i].dispose();
        }
        this._back = null;
        this._txtCount = null;
        this._txtTips = null;
        this._txtCooling = null;
        this._txtDesc = null;
        this._btnEnter = null;
        this._btnAdd = null;
        this._redIcon = null;
        this._imgHardLvl = null;
        this._imgScore = null;
        this._items = null;
        this._model = null;
        this._cvo = null;
    };
    return CopyExpView;
}(UIComponent));
__reflect(CopyExpView.prototype, "CopyExpView");
//# sourceMappingURL=CopyExpView.js.map