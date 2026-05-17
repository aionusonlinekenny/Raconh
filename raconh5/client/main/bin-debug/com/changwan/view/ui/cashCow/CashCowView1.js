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
 * 金蟾聚宝
 * pzx
 * create 18.1.18
 */
var CashCowView1 = (function (_super) {
    __extends(CashCowView1, _super);
    function CashCowView1() {
        var _this = _super.call(this) || this;
        _this._homeImageLayer = ObjectUtil.createConainer();
        _this.addChild(_this._homeImageLayer);
        _this._homeLayer = ObjectUtil.createConainer();
        _this.addChild(_this._homeLayer);
        return _this;
    }
    CashCowView1.prototype.switch = function (visible) {
        if (this._visible == visible)
            return;
        this._visible = visible;
        if (this._visible) {
            this._bakc = BitmapRes.create("ashCow_zi_png", 115, 727, 590, 179);
            this._homeImageLayer.addChild(this._bakc);
            this._bakc1 = BitmapRes.create("common_back5_png", 148, 882, 424, 45);
            this._homeImageLayer.addChild(this._bakc1);
            this._rewardBtn = new Button;
            this._rewardBtn.skinName = "Button2SKin";
            this._rewardBtn.x = 241;
            this._rewardBtn.y = 1026;
            this._homeImageLayer.addChild(this._rewardBtn);
        }
        else {
        }
    };
    CashCowView1.prototype.configUI = function () {
        this._model = Manager.model.getcashCow();
        var loss = new GainLossVO(this._model.cvo.gold_need);
        this._res.setData(loss);
        this._freeImg.touchEnabled = false;
        this._resGroup.touchEnabled = false;
        this._resGroup.touchChildren = false;
        Manager.control.getcashCow().query();
        HtmlUtil.setTextFlow(this._vipTxt, LangCVO.getContent("cashCow4"));
    };
    CashCowView1.prototype.addEvent = function () {
        this._vipTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenVipViewHandler, this);
        this._rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onrewardHandler, this);
        this._model.addEventListener(CashCowEvent.CASHCOW_UPDATE_EVENT, this.drawData, this);
        _super.prototype.addEvent.call(this);
    };
    CashCowView1.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._vipTxt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenVipViewHandler, this);
        this._rewardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onrewardHandler, this);
        this._model.removeEventListener(CashCowEvent.CASHCOW_UPDATE_EVENT, this.drawData, this);
    };
    CashCowView1.prototype.onOpenVipViewHandler = function (e) {
        var _curCvo = VipLevelCVO.getCVO(Manager.model.self.attrInfo.vipLevel);
        var lev = _curCvo.level + 1;
        var vip = Manager.view.show(51 /* VipPanel */);
        vip.setVipPage(lev);
    };
    CashCowView1.prototype.onrewardHandler = function (e) {
        Manager.control.getcashCow().reward();
    };
    CashCowView1.prototype.initData = function () {
        this.drawData();
    };
    CashCowView1.prototype.drawTime = function () {
        //let second:number = Math.round(this._model.lasTime - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        var second = Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000 - this._model.lasTime);
        if (second < this._model.TIME_CD) {
            this.countdown();
            Manager.render.add(this.countdown, this, 1000);
            this._resGroup.visible = true;
            this._freeImg.visible = false;
            this._redIcon.visible = false;
        }
        else {
            this.setIsFree();
            return;
        }
    };
    CashCowView1.prototype.countdown = function () {
        //let second:number = Math.round(this._model.lasTime - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        var second = Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000 - this._model.lasTime);
        if (second >= this._model.TIME_CD) {
            this.setIsFree();
            Manager.render.remove(this.countdown, this);
            return;
        }
        var str = LangCVO.getContent("cashCow1");
        this._timeTxt.text = StringUtils.setParam(str, cw.DateUtil.formatStr(this._model.TIME_CD - second, cw.DateUtil.LEFT_HH_MM_SS, true));
    };
    CashCowView1.prototype.setIsFree = function () {
        this._timeTxt.text = ""; //本次免费
        this._resGroup.visible = false;
        this._freeImg.visible = true;
        this._redIcon.visible = true;
    };
    CashCowView1.prototype.drawData = function () {
        this.drawTime();
        var cvo = this._model.cvo;
        var str = LangCVO.getContent("cashCow2"); //今日可聚宝次数<font color='#00ff00'>（{0}）</font>
        str = StringUtils.setParam(str, cvo.crunt + "/" + cvo.truesureNum);
        HtmlUtil.setTextFlow(this._vipNumTxt, str);
        var i = this._model.rewardnum + cvo.truesureNum - cvo.crunt;
        var addition = 0;
        if (this._model.isActive) {
            addition = 0.1;
        }
        //最终所得=（首次银币额+额外增加银币额）*（100%+特权卡加成10%) 
        var coin = (cvo.coin + i * cvo.coin_up) * (1 + addition);
        var coinstr = StringUtils.getBigNum(coin, 1);
        str = LangCVO.getContent("cashCow3"); //本次可获得<font color='#00ff00'>{0}万（{1}%）</font>银币
        str = StringUtils.setParam(str, coinstr, "+" + (addition * 100));
        HtmlUtil.setTextFlow(this._conentTxt, str);
    };
    CashCowView1.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    CashCowView1.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    CashCowView1.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (Manager.render.contains(this.countdown, this))
            Manager.render.remove(this.countdown, this);
        if (isRemove) {
            ObjectUtil.disposes(this._rewardBtn, this._conentTxt, this._vipTxt, this._vipNumTxt, this._res, this._timeTxt);
            ObjectUtil.removes(this._freeImg, this._resGroup, this._redIcon);
        }
        this._rewardBtn = null;
        this._conentTxt = null;
        this._vipNumTxt = null;
        this._timeTxt = null;
        this._freeImg = null;
        this._resGroup = null;
        this._res = null;
        this._model = null;
        this._vipTxt = null;
        this._redIcon = null;
    };
    CashCowView1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return CashCowView1;
}(Sprite));
__reflect(CashCowView1.prototype, "CashCowView1");
//# sourceMappingURL=CashCowView1.js.map