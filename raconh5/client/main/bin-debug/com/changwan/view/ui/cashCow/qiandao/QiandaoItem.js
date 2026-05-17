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
 * drq
 * 签到 item
 * 2018.3.21
 */
var QiandaoItem = (function (_super) {
    __extends(QiandaoItem, _super);
    function QiandaoItem() {
        var _this = _super.call(this) || this;
        //数据
        _this.effectImg = false;
        _this.passTxt = "";
        _this.nameTxt = "";
        _this.redIcon = false;
        _this.ilingquImg = false;
        _this.buIcon = false;
        _this.gain = "";
        _this.skinName = Manager.path.getSkinName("sysnotice", "SysnoticeItemSkin");
        _this.touchChildren = false;
        _this.touchEnabled = true;
        _this._item = Manager.pool.create(BaseGoods);
        _this.addChild(_this._item);
        _this.swapChildren(_this._item, _this._ilingquImg);
        _this._item.x = 10;
        _this._item.y = 25;
        _this._nameTxt.text = _this.nameTxt;
        _this._redIcon.visible = _this.redIcon;
        _this.setProperty();
        return _this;
    }
    QiandaoItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.setProperty();
    };
    QiandaoItem.prototype.setProperty = function (effectImg, passTxt, ilingquImg, buIcon, gain) {
        if (effectImg === void 0) { effectImg = this.effectImg; }
        if (passTxt === void 0) { passTxt = this.passTxt; }
        if (ilingquImg === void 0) { ilingquImg = this.ilingquImg; }
        if (buIcon === void 0) { buIcon = this.buIcon; }
        if (gain === void 0) { gain = this.gain; }
        this._effectImg.visible = effectImg;
        if (passTxt != "") {
            this._passTxt.text = passTxt;
        }
        this._ilingquImg.visible = ilingquImg;
        this._buIcon.visible = buIcon;
        if (gain != "") {
            var loss = new GainLossVO(gain);
            this._item.setGainLossVO(loss);
        }
    };
    //注册事件
    QiandaoItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBox, this);
    };
    QiandaoItem.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBox, this);
    };
    QiandaoItem.prototype.onClickBox = function (e) {
        if (e === void 0) { e = null; }
        var day = Manager.model.getLogin().serverTimeInfo.serverOpenDays; //开服天数
        var currentDay = (day % 30) == 0 ? 30 : day % 30;
        if (this._cvo.id < currentDay) {
            //提示
            var consume = this._cvo.consume;
            consume = consume.substr(1, consume.length - 2);
            var arr = consume.split(",");
            var str = LangCVO.getContent("qiandao31");
            str = StringUtils.setParam(str, arr[arr.length - 1]);
            var ok = Manager.pool.create(CallBackInfo, Manager.control.geQiandao().sendSign, Manager.control.geQiandao(), this._id);
            Manager.view.show(22 /* TipsView */, str, ok, true);
        }
        else {
            Manager.control.geQiandao().sendSign(this._id);
        }
    };
    QiandaoItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._item, this._passTxt, this._nameTxt);
        ObjectUtil.removes(this._effectImg, this._redIcon, this._ilingquImg, this._buIcon, this._gridImg);
        this._effectImg = null;
        this._passTxt = null;
        this._nameTxt = null;
        this._redIcon = null;
        this._ilingquImg = null;
        this._buIcon = null;
        this._item = null;
        this._gridImg = null;
        this.effectImg = null;
        this.passTxt = null;
        this.nameTxt = null;
        this.redIcon = null;
        this.ilingquImg = null;
        this.buIcon = null;
        this.gain = null;
        this._cvo = null;
        this._id = null;
    };
    return QiandaoItem;
}(UIComponent));
__reflect(QiandaoItem.prototype, "QiandaoItem");
//# sourceMappingURL=QiandaoItem.js.map