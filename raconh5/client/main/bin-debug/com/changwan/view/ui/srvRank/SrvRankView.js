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
 * 冲榜竞技view
 * pzx
 * 2018-3-20
 */
var SrvRankView = (function (_super) {
    __extends(SrvRankView, _super);
    function SrvRankView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("srvRank", "SrvRankViewSkin");
        return _this;
    }
    SrvRankView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._vscroll.initBtnListData(SrvRankItem, [], true);
        this._model = Manager.model.getsrvRank();
    };
    SrvRankView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(SrvRankEvent.SRVRANK_UPDATE_LIST, this.drawData, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openViewRankHandler, this);
    };
    SrvRankView.prototype.removeEvent = function () {
        this._model.removeEventListener(SrvRankEvent.SRVRANK_UPDATE_LIST, this.drawData, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openViewRankHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    SrvRankView.prototype.openViewRankHandler = function () {
        var i = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
        if (i < 8) {
            Manager.view.show(16 /* RankPanel */, SrvRankCVO.rankPanelTap(i));
        }
    };
    SrvRankView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        Manager.control.getsrvRank().query();
        this.drawTime();
        this.countdown();
    };
    SrvRankView.prototype.drawData = function () {
        var day = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
        if (day < 8) {
            var arr = ArrayUtil.sortOn(SrvRankCVO.cvos(day), ["isSortNum"]);
            this._titleBit.load(Manager.path.getPanelSrvRankPath("title/srvRank_title_" + day));
            this._vscroll.dataProvider(arr);
            if (this._model.mainRank == 0) {
                this._rankTxt.text = LangCVO.getContent("srv_rank3") + LangCVO.getContent("srv_rank4");
            }
            else {
                this._rankTxt.text = LangCVO.getContent("srv_rank3") + this._model.mainRank; //我的排名：
            }
            this.clearAni();
            this._ani = Manager.animation.createPanelGlobalAnimation("srvRank/srvRank_ani/" + SrvRankView.aniPathList[day - 1], SrvRankView.aniPathList[day - 1]);
            this._ani.x = 362;
            this._ani.y = 270;
            this.addChild(this._ani);
        }
        else {
            Manager.view.hide(134 /* SrvRankPanel */);
        }
    };
    SrvRankView.prototype.clearAni = function () {
        if (this._ani) {
            Manager.pool.push(this._ani);
            this._ani = null;
        }
    };
    SrvRankView.prototype.drawTime = function () {
        this._endTime = DateUtil.getToDayTime();
        Manager.render.add(this.countdown, this, 1000);
    };
    SrvRankView.prototype.countdown = function () {
        var second = this._endTime - Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (second <= 0) {
            //Manager.control.getsrvRank().query();
            Manager.render.remove(this.countdown, this);
            this.drawTime();
            return;
        }
        this._timeTxt.text = cw.DateUtil.formatStr(second, cw.DateUtil.LEFT_HH_MM_SS, true);
    };
    SrvRankView.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.disposes(this._rankTxt, this._timeTxt, this._btn);
        }
        Manager.render.remove(this.countdown, this);
        Manager.pool.push(this._titleBit);
        this._titleBit = null;
        this._vscroll.dispose();
        this._vscroll = null;
        this._rankTxt = null;
        this._timeTxt = null;
        this._btn = null;
        this._model = null;
        this.clearAni();
    };
    SrvRankView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    SrvRankView.aniPathList = ["title3011", "title3012", "title3013", "title3014", "title3015", "title3016", "title3017"]; //特效名，固定的//按这个顺序和天数
    return SrvRankView;
}(UIComponent));
__reflect(SrvRankView.prototype, "SrvRankView");
//# sourceMappingURL=SrvRankView.js.map