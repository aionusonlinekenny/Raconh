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
 * 全民boss界面
 * luzh
 * create 2017-12.25
*/
var BossPublicView = (function (_super) {
    __extends(BossPublicView, _super);
    function BossPublicView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("boss", "BossPublicViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    BossPublicView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getBoss();
        this._txtTips.text = LangCVO.getContent("boss1"); //伤害第一的玩家可获得击杀大奖，其他玩家可获得参与奖励
        this._list.initBtnListData(BossPublicItem, null, true);
        this._list.itemList.layout.gap = 13;
        this._cvos = BossCVO.getCVOs();
    };
    BossPublicView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(BossEvent.KILLED_OR_REVIVE, this.onBossUpdate, this);
        this._model.addEventListener(BossEvent.CHALLENGE_TIMES, this.onTimes, this);
        Manager.control.getBoss().openOrClosePanel(true);
    };
    BossPublicView.prototype.removeEvent = function () {
        this._model.removeEventListener(BossEvent.KILLED_OR_REVIVE, this.onBossUpdate, this);
        this._model.removeEventListener(BossEvent.CHALLENGE_TIMES, this.onTimes, this);
        _super.prototype.removeEvent.call(this);
        Manager.control.getBoss().openOrClosePanel(false);
    };
    BossPublicView.prototype.onTimes = function (e) {
        this.invalidate("drawTimes");
    };
    BossPublicView.prototype.drawTimes = function () {
        this._txtCount.text = LangCVO.getContent("boss10", this._model.challengeNum, BossModel.CHALLENGE_MAX); //挑战次数：{0}/{1}
        if (this._model.challengeNum >= BossModel.CHALLENGE_MAX) {
            this._txtTime.text = LangCVO.getContent("boss21"); //21	每1小时恢复1次挑战次数
            Manager.render.remove(this.countdown, this);
        }
        else {
            Manager.render.add(this.countdown, this, 1000);
            this.countdown();
        }
    };
    BossPublicView.prototype.countdown = function () {
        var left = Math.floor(this._model.recoverTime - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        this._txtTime.text = LangCVO.getContent("boss11") + cw.DateUtil.formatStr(left, cw.DateUtil.LEFT_HH_MM_SS, true); //恢复倒计时：
        if (left <= 0)
            Manager.render.remove(this.countdown, this);
    };
    BossPublicView.prototype.onBossUpdate = function (e) {
        this.invalidate("drawList");
    };
    BossPublicView.prototype.drawList = function () {
        this._cvos.sort(function (a, b) {
            // if(!a.isKilled && b.isKilled) return -1;
            // if(a.isKilled && !b.isKilled) return 1;
            // if(a.leftTime < b.leftTime) return -1;
            // if(a.leftTime > b.leftTime) return 1;
            // return (a.id > b.id ? 1 : -1); 
            var isOpen1 = a.condVo.isSatisfy();
            var isOpen2 = b.condVo.isSatisfy();
            if (isOpen1 && !isOpen2)
                return -1;
            if (!isOpen1 && isOpen2)
                return 1;
            if (isOpen1)
                return (a.id < b.id ? 1 : -1);
            else
                return (a.id < b.id ? -1 : 1);
        });
        this._list.dataProvider(this._cvos);
    };
    BossPublicView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawTimes"))
            this.drawTimes();
        if (this.isInvalid("drawList"))
            this.drawList();
    };
    BossPublicView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawTimes();
        this.drawList();
    };
    BossPublicView.prototype.dispose = function () {
        Manager.render.remove(this.countdown, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._txtCount, this._txtTime, this._txtTips, this._list);
        this._model = null;
        this._cvos = null;
        this._txtCount = null;
        this._txtTime = null;
        this._txtTips = null;
        this._list = null;
    };
    return BossPublicView;
}(UIComponent));
__reflect(BossPublicView.prototype, "BossPublicView");
//# sourceMappingURL=BossPublicView.js.map