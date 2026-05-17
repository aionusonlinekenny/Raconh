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
 * pzx
 * 特权view
 * 2018.1.11
 */
var SysPrivilegeView = (function (_super) {
    __extends(SysPrivilegeView, _super);
    function SysPrivilegeView() {
        var _this = _super.call(this) || this;
        /** 立即领取图片 */
        _this._liquPath = "common_label_fetch_png";
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("sysprivilege", "SysPrivilegeViewSkin");
        return _this;
    }
    SysPrivilegeView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._list = [];
        for (var i = 1; i < 5; i++) {
            this["_item" + i].setId(i);
            this._list.push(this["_item" + i]);
        }
        this._activeImg.touchEnabled = false;
        if (!this._fightBit) {
            this._fightBit = Manager.pool.create(BitmapRemote);
            this._fightBit.x = 236;
            this._fightBit.y = 381;
            this.addChild(this._fightBit);
        }
        this._model = Manager.model.getSysPrivilege();
        this.playTime();
    };
    SysPrivilegeView.prototype.playTime = function () {
        if (this._model.getExpTime() > 0) {
            if (!this._model.hasEventListener(SysPrivilegeEvent.SYSPRIVILEGE_EXP_TIME_EVENT)) {
                this._model.addEventListener(SysPrivilegeEvent.SYSPRIVILEGE_EXP_TIME_EVENT, this.playTime, this);
            }
            this._timeTxt.text = cw.DateUtil.formatStr(this._model.getExpTime(), cw.DateUtil.LEFT_MM_SS);
            this._timeDescTxt.visible = true;
        }
        else {
            this._timeDescTxt.visible = false;
            this._timeTxt.text = "";
        }
    };
    SysPrivilegeView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardHandler, this);
    };
    SysPrivilegeView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._rewardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardHandler, this);
        if (this._model.hasEventListener(SysPrivilegeEvent.SYSPRIVILEGE_EXP_TIME_EVENT)) {
            this._model.removeEventListener(SysPrivilegeEvent.SYSPRIVILEGE_EXP_TIME_EVENT, this.playTime, this);
        }
    };
    SysPrivilegeView.prototype.onRewardHandler = function (e) {
        if (this._data.isActive) {
            if (this._data.isreward) {
                //已领取
                FloatTips.addTips(LangCVO.getContent("common39"), Color.RED);
            }
            else {
                Manager.control.getSysPrivilege().reward(this._data.id);
            }
        }
        else {
            var str = LangCVO.getContent("SysPrivilege1");
            var cvo = SysPrivilegeCVO.getCvo(this._data.id);
            str = StringUtils.setParam(str, cvo.price, cvo.name);
            var ok = Manager.pool.create(CallBackInfo, this.activeCallBack, this);
            Manager.tips.showTips(str, ok, true);
        }
    };
    //平台接口调用
    SysPrivilegeView.prototype.activeCallBack = function () {
        Manager.platform.pay(this._data.rmb, 2);
    };
    SysPrivilegeView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    SysPrivilegeView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    SysPrivilegeView.prototype.setData = function (data) {
        this._data = data;
        this.invalidate(InvalidationType.DATA);
    };
    SysPrivilegeView.prototype.drawData = function () {
        if (this._data == null)
            return;
        this._fightBit.load(Manager.path.getPanelSysPrivilegePath(this._data.fightImg, ".png"));
        this._kaImg.source = this._data.kaImg;
        this._type = this._data.id;
        for (var i = 0; i < 4; i++) {
            this._list[i].setData(this._data);
        }
        this._rewardBtn.visible = true;
        this._redIcon.visible = false;
        if (this._data.isActive) {
            this._ilingquImg.visible = this._data.isreward;
            if (this._data.isreward) {
                this._activeImg.source = "";
                this._rewardBtn.visible = false;
            }
            else {
                this._activeImg.source = this._liquPath;
                this._redIcon.visible = true;
            }
        }
        else {
            this._activeImg.source = this._data.activeImg;
            this._ilingquImg.visible = false;
        }
        this.showAni();
    };
    SysPrivilegeView.prototype.showAni = function () {
        if (this._data.aniPath) {
            this.clearAni();
            if (this._type == SysprivilegeType.DIAMOND_CARD) {
                this._petAni = Manager.animation.createPetAnimation(this._data.aniPath);
            }
            this.addChildAt(this._petAni, 0);
            if (this._data.id == SysprivilegeType.DIAMOND_CARD) {
                this._petAni.x = 20;
                this._petAni.y = -90;
                this._petAni.scaleX = this._petAni.scaleY = 0.6;
            }
        }
        else {
            this.clearAni();
        }
    };
    SysPrivilegeView.prototype.clearAni = function () {
        if (this._petAni) {
            Manager.pool.push(this._petAni);
            this._petAni = null;
        }
    };
    SysPrivilegeView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    SysPrivilegeView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    SysPrivilegeView.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.removes(this._kaImg, this._activeImg, this._ilingquImg);
        }
        ObjectUtil.disposes(this._item1, this._item2, this._item3, this._item4, this._rewardBtn, this._timeDescTxt, this._timeTxt);
        Manager.pool.push(this._fightBit);
        this._fightBit = null;
        this._kaImg = null;
        this._rewardBtn = null;
        this._activeImg = null;
        this._data = null;
        this._item1 = null;
        this._item2 = null;
        this._item3 = null;
        this._item4 = null;
        this._list = null;
        this._ilingquImg = null;
        this.clearAni();
        this._timeTxt = null;
        this._timeDescTxt = null;
        this._model = null;
        if (Manager.render.contains(this.playTime, this)) {
            Manager.render.remove(this.playTime, this);
        }
    };
    SysPrivilegeView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return SysPrivilegeView;
}(UIComponent));
__reflect(SysPrivilegeView.prototype, "SysPrivilegeView");
//# sourceMappingURL=SysPrivilegeView.js.map