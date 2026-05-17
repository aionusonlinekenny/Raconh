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
 * 天天返利
 * pzx
 * create 18.3.14
 */
var DailyRebateView = /** @class */ (function (_super) {
    __extends(DailyRebateView, _super);
    function DailyRebateView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("dailyrebate", "DailyRebateViewSkin");
        _this.visible = false;
        return _this;
    }
    DailyRebateView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._closSp) {
            this._closSp = Manager.pool.create(egret.Sprite);
            this._closSp.graphics.beginFill(1, 0.01);
            this._closSp.graphics.drawCircle(-35, -35, 35);
            this._closSp.graphics.endFill();
            this.addChild(this._closSp);
            this._closSp.x = 692;
            this._closSp.y = 215;
            this._closSp.touchEnabled = true;
        }
        this._model = Manager.model.getdailyRebate();
        this._itemList = [this._item0, this._item1, this._item2];
        this._chongzhiImg.touchEnabled = false;
        Manager.control.getdailyRebate().query();
        this.drawTime();
        this.countdown();
        this._bitmap.load(Manager.path.getPanelUiImgPath("dailyrebate/dailyrebate_di", Extension.PNG));
    };
    DailyRebateView.prototype.addEvent = function () {
        this._closSp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        this._model.addEventListener(DailyRebateEvent.DAILYREBATE_UPDATE, this.updateQueryHandler, this);
        this._rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onsendRewardHandler, this);
        _super.prototype.addEvent.call(this);
    };
    DailyRebateView.prototype.removeEvent = function () {
        this._closSp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        this._model.removeEventListener(DailyRebateEvent.DAILYREBATE_UPDATE, this.updateQueryHandler, this);
        this._rewardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onsendRewardHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    DailyRebateView.prototype.onCloseHandler = function () {
        Manager.view.hide(130 /* DailyRebateView */);
    };
    /**
     * 查询，领奖返回
     */
    DailyRebateView.prototype.updateQueryHandler = function () {
        this.drawData();
        var second = this._endTime - Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (second <= 0) {
            this.drawTime();
        }
    };
    //请求领奖
    DailyRebateView.prototype.onsendRewardHandler = function () {
        if (this._checkRewsrd) {
            //有一个可领取
            Manager.control.getdailyRebate().reward();
        }
        else {
            Manager.view.show(77 /* SysChargePanel */);
        }
    };
    DailyRebateView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
    };
    DailyRebateView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    DailyRebateView.prototype.setData = function (data) {
        this.invalidate(InvalidationType.DATA);
    };
    DailyRebateView.prototype.drawData = function () {
        var any = this._model.getList();
        var index = 0;
        this._checkRewsrd = false;
        for (var key in any) {
            var cvo = any[key];
            if (this._itemList[index]) {
                this._itemList[index].setData(cvo);
            }
            index++;
            if (!this._checkRewsrd) {
                if (cvo.checkReward()) {
                    this._checkRewsrd = true;
                }
            }
        }
        if (this._checkRewsrd) {
            //有一个可领取
            this._chongzhiImg.source = "common_label_fetch_png";
            this._redIcon.visible = true;
        }
        else {
            this._chongzhiImg.source = "common_qianwangchongzhi_png";
            this._redIcon.visible = false;
        }
        var str = LangCVO.getContent("dailyrebate1");
        str = StringUtils.setParam(str, this._model.money);
        HtmlUtil.setTextFlow(this._rmbTxt, str);
        this.visible = true;
    };
    DailyRebateView.prototype.drawTime = function () {
        this._endTime = DateUtil.getToDayTime();
        Manager.render.add(this.countdown, this, 1000);
    };
    DailyRebateView.prototype.countdown = function () {
        var second = this._endTime - Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (second <= 0) {
            Manager.control.getdailyRebate().query();
            Manager.render.remove(this.countdown, this);
            return;
        }
        this._itemTxt.text = cw.DateUtil.formatStr(second, cw.DateUtil.LEFT_HH_MM_SS, true);
    };
    DailyRebateView.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        Manager.layer.uiLayer.addChild(this);
    };
    DailyRebateView.prototype.hide = function () {
        this.dispose();
    };
    DailyRebateView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        Manager.render.remove(this.countdown, this);
        this._itemList.forEach(function (item, i) {
            Manager.pool.push(item);
        });
        ObjectUtil.disposes(this._rmbTxt, this._itemTxt, this._rewardBtn);
        ObjectUtil.removes(this._chongzhiImg, this._redIcon);
        this._itemList = null;
        this._item0 = null;
        this._item1 = null;
        this._item2 = null;
        this._rmbTxt = null;
        this._itemTxt = null;
        this._rewardBtn = null;
        this._chongzhiImg = null;
        Manager.pool.push(this._closSp);
        this._closSp = null;
        this._model = null;
        this._redIcon = null;
        Manager.pool.push(this._bitmap);
        this._bitmap = null;
    };
    return DailyRebateView;
}(UIComponent));
//# sourceMappingURL=DailyRebateView.js.map