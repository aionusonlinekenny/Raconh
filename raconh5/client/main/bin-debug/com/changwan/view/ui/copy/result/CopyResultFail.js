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
 * 失败弹出框
 * luzhihong
 * create 2017-12-1
 */
var CopyResultFail = (function (_super) {
    __extends(CopyResultFail, _super);
    function CopyResultFail() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("copy", "CopyResultFailSkin");
        _this.touchChildren = true;
        return _this;
    }
    CopyResultFail.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        var cell = CopyCVO.getCVO(CopyConst.ID_MAIN).cell;
        if (cell < 20) {
            this._gBtns0.visible = false;
            this._btnShenQi.visible = true;
        }
        else {
            this._gBtns0.visible = true;
            this._btnShenQi.visible = false;
        }
        this.onResizeHandler(null);
    };
    /**
     * @param textContent 倒计时时间（秒）
     * @param okCallback 回调函数
    */
    CopyResultFail.prototype.show = function (countDownTime, callback) {
        if (countDownTime === void 0) { countDownTime = 3; }
        if (callback === void 0) { callback = null; }
        this._endTime = egret.getTimer() + countDownTime * 1000;
        this._callback = callback;
        if (this.parent == null) {
            this.x = (Manager.config.gameWidth - this.width) >> 1;
            this.y = 213;
            Manager.layer.tipsLayer.addChild(this);
        }
        this.invalidate(InvalidationType.DATA);
    };
    CopyResultFail.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    CopyResultFail.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    CopyResultFail.prototype.drawData = function () {
        Manager.render.add(this.countDown, this, 1000);
        this.countDown();
    };
    CopyResultFail.prototype.countDown = function () {
        var left = this.leftTime;
        if (left == 0) {
            Manager.view.hide(25 /* CopyResultFail */);
            return;
        }
        this._txt.text = LangCVO.getContent("activity2", left);
    };
    Object.defineProperty(CopyResultFail.prototype, "leftTime", {
        get: function () {
            var left = Math.floor((this._endTime - egret.getTimer()) / 1000);
            return left > 0 ? left : 0;
        },
        enumerable: true,
        configurable: true
    });
    CopyResultFail.prototype.hide = function () {
        this.dispose();
    };
    CopyResultFail.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnEquip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnPet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnSkill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnJieXue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnShenQi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    CopyResultFail.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnEquip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnPet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnSkill.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnJieXue.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnShenQi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    CopyResultFail.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    CopyResultFail.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._btnEquip:
                if (OpenCVO.isOpen(OpenConst.ID_STRENGTHEN, true))
                    Manager.view.show(12 /* EquipPanel */);
                break;
            case this._btnPet:
                Manager.view.show(17 /* RolePanel */, 1);
                break;
            case this._btnSkill:
                Manager.view.show(19 /* SkillPanel */);
                break;
            case this._btnJieXue:
                Manager.view.show(19 /* SkillPanel */, 1);
                break;
            case this._btnShenQi:
                Manager.view.show(37 /* ReinPanel */);
                break;
        }
        // if(this._callback && e.currentTarget != this._btnClose) this._callback();
        this.hideView();
    };
    CopyResultFail.prototype.hideView = function () {
        Manager.view.hide(25 /* CopyResultFail */);
    };
    CopyResultFail.prototype.dispose = function () {
        if (this._callback)
            this._callback();
        Manager.render.remove(this.countDown, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._btnClose, this._btnEquip, this._btnPet, this._btnSkill, this._btnJieXue, this._btnShenQi);
        ObjectUtil.disposes(this._btn, this._txt);
        this._btn = null;
        this._btnClose = null;
        this._btnEquip = null;
        this._btnPet = null;
        this._btnSkill = null;
        this._btnJieXue = null;
        this._btnShenQi = null;
        this._txt = null;
        this._callback = null;
    };
    return CopyResultFail;
}(UIComponent));
__reflect(CopyResultFail.prototype, "CopyResultFail", ["IViewManager"]);
//# sourceMappingURL=CopyResultFail.js.map