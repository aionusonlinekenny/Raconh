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
 *author Anydo
 *create 2018-1-4
 *description
*/
var ArenaView = (function (_super) {
    __extends(ArenaView, _super);
    function ArenaView() {
        var _this = _super.call(this) || this;
        _this.COUNT = 3;
        _this.skinName = Manager.path.getSkinName("arena", "ArenaViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    ArenaView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._imageBg.load(Manager.path.getArenaPath("arenaRankBack.jpg"));
        this._imageHead.load(Manager.path.getRoleHeadPath(1, Manager.model.self.attrInfo.career));
        this._txtName.text = LangCVO.getContent("arena10") + Manager.model.self.attrInfo.nickName;
        var vipLevel = Manager.model.self.attrInfo.vipLevel;
        var vipCount = (vipLevel == 0) ? 0 : ArenaVipCountCVO.getCanBuyCount(vipLevel);
        this._txtVip.text = LangCVO.getContent("arena22", vipCount);
        this.updateMaxAwardData();
    };
    ArenaView.prototype.initData = function () {
        Manager.control.getArena().cmdPKCount(0);
        Manager.model.getArena().renewRankHandler(false);
        //引导
        if (Manager.model.getGuide().curID == GuideID.CLUB_JOIN) {
            if (this._item3)
                this._guideTarget = this._item3;
            else if (this._item2)
                this._guideTarget = this._item2;
            else
                this._guideTarget = this._item1;
            if (this._guideTarget == null) {
                Manager.control.getTask().hideGuide();
                return;
            }
            var pos = this._guideTarget.parent.localToGlobal(this._guideTarget.x, this._guideTarget.y);
            Manager.control.getTask().showGuide(pos, this._guideTarget.width >> 1, (this._guideTarget.height >> 1) + 110, this.guideCB, this, false);
        }
    };
    ArenaView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this._btnShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this._btnLog.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this._btnRenew.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this._btnAward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_RANK, this.updateRankData, this);
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_PK_COUNT, this.updateCountData, this);
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.updateMaxAwardData, this);
    };
    ArenaView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this._btnShop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this._btnLog.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this._btnRenew.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this._btnAward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_RANK, this.updateRankData, this);
        Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_PK_COUNT, this.updateCountData, this);
        Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.updateMaxAwardData, this);
    };
    ArenaView.prototype.onBtnClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._btnBuy:
                Manager.model.getArena().buyPKCountHandler();
                break;
            case this._btnShop:
                Manager.view.show(18 /* ShopPanel */, 2);
                break;
            case this._btnLog:
                Manager.view.show(57 /* ArenaLogView */);
                break;
            case this._btnRenew:
                Manager.model.getArena().renewRankHandler(true);
                break;
            case this._btnAward:
                Manager.model.getArena().closeOpenBfPanel = true;
                Manager.view.hide(10 /* ActivityPanel */);
                Manager.view.show(58 /* ArenaAwardView */);
                break;
        }
    };
    ArenaView.prototype.updateMaxAwardData = function (e) {
        if (e === void 0) { e = null; }
        var hasMaxAwardCanGet = Manager.model.getArena().hasMaxAwardCanGet;
        if (hasMaxAwardCanGet && this._redIconMax.parent == null) {
            this.addChild(this._redIconMax);
        }
        else if (!hasMaxAwardCanGet && this._redIconMax.parent != null) {
            this.removeChild(this._redIconMax);
        }
    };
    ArenaView.prototype.updateCountData = function (e) {
        this._txtCount.text = LangCVO.getContent("arena21", Manager.model.getArena().countLeft, Number(ArenaOtherCVO.getCVO("daily_count").value));
        if (Manager.model.getArena().countCDTime > 0) {
            this.countDownHandler();
            Manager.render.add(this.countDownHandler, this, 1000, 0, null, true);
        }
        else {
            this._txtTime.text = "";
            Manager.render.remove(this.countDownHandler, this);
        }
    };
    ArenaView.prototype.countDownHandler = function () {
        var left = Manager.model.getArena().countCDTime - (Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (left <= 0) {
            this._txtTime.text = "";
            Manager.render.remove(this.countDownHandler, this);
        }
        else {
            this._txtTime.text = cw.DateUtil.formatStr(left, cw.DateUtil.LEFT_HH_MM_SS, true) + LangCVO.getContent("arena23");
        }
    };
    ArenaView.prototype.updateRankData = function (e) {
        var ranks = e.params;
        for (var i = 1; i <= this.COUNT; i++) {
            this["_item" + i].info = ranks[i - 1];
        }
        this._txtRank.text = LangCVO.getContent("arena12") + Manager.model.getArena().myRank;
        this._txtPower.text = LangCVO.getContent("arena11") + Manager.model.self.attrInfo.fight;
    };
    ArenaView.prototype.guideCB = function () {
        if (this._guideTarget)
            this._guideTarget.clickFun();
        Manager.control.getTask().hideGuide();
    };
    ArenaView.prototype.dispose = function () {
        Manager.render.remove(this.countDownHandler, this);
        if (Manager.model.getGuide().curID == GuideID.CLUB_JOIN)
            Manager.control.getTask().hideGuide();
        _super.prototype.dispose.call(this);
        if (this._loadComplete) {
            this._imageBg.dispose();
            this._imageBg = null;
            this._imageHead.dispose();
            this._imageHead = null;
            this._txtCount.dispose();
            this._txtCount = null;
            this._txtTime.dispose();
            this._txtTime = null;
            this._txtRank.dispose();
            this._txtRank = null;
            this._txtName.dispose();
            this._txtName = null;
            this._txtPower.dispose();
            this._txtPower = null;
            this._txtRenew.dispose();
            this._txtRenew = null;
            this._btnBuy.dispose();
            this._btnBuy = null;
            this._btnShop.dispose();
            this._btnShop = null;
            this._btnLog.dispose();
            this._btnLog = null;
            this._btnRenew.dispose();
            this._btnRenew = null;
            this._btnAward.dispose();
            this._btnAward = null;
            this._item1.dispose();
            this._item1 = null;
            this._item2.dispose();
            this._item2 = null;
            this._item3.dispose();
            this._item3 = null;
            this._redIconMax = null;
            if (this._guideTarget)
                this._guideTarget.dispose();
            this._guideTarget = null;
        }
    };
    return ArenaView;
}(UIComponent));
__reflect(ArenaView.prototype, "ArenaView");
//# sourceMappingURL=ArenaView.js.map