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
 * 挑战玩家、boss结算界面
 * luzhihong
 * create 2017-12-1
 */
var ClubBF1v1Result = (function (_super) {
    __extends(ClubBF1v1Result, _super);
    function ClubBF1v1Result() {
        var _this = _super.call(this) || this;
        _this._goodItems = [];
        _this.skinName = Manager.path.getSkinName("clubBF", "ClubBF1v1ResultSkin");
        GameDispatcher.getInstance().addEventListener(GlobalEvent.ENTER_SCENE, _this.enterScene, _this); //有时ui还没加载完，就切了地图，要关掉界面，在开始就注册事件
        _this.touchChildren = true;
        return _this;
    }
    /**
     * @param isBoss 是否为boss结算
     * @param data 数据
    */
    ClubBF1v1Result.prototype.show = function (isBoss, data) {
        this._isBoss = isBoss;
        this._data = data;
        this._leftTime = 10;
        if (this.parent == null) {
            this.y = 213;
            Manager.layer.tipsLayer.addChild(this);
        }
    };
    ClubBF1v1Result.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        // data["isWin"] = pi.readByte() != 0; 
        // data["infos"] = infos;
        this._title.source = this._data["isWin"] ? "result_title_win_png" : "result_title_fail_png";
        var infos = this._data["infos"];
        var item;
        for (var i = 0, len = infos.length; i < len; i++) {
            item = Manager.pool.create(Goods);
            item.x = i * 128;
            item.data = infos[i];
            this._gItems.addChild(item);
            this._goodItems.push(item);
        }
        if (this._isBoss) {
            // data["hurt"] = pi.readInt();
            // data["boss_hp"] = pi.readInt();
            // data["boss_max_hp"] = pi.readInt();
            var hurt = (this._data["hurt"] / this._data["boss_max_hp"] * 100).toFixed(2);
            var left = (this._data["boss_hp"] / this._data["boss_max_hp"] * 100).toFixed(2);
            HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("clubBF12", HtmlUtil.addColorTag(hurt + "%", Color.RED_STR))); //你对守城BOSS造成{0}伤害
            HtmlUtil.setTextFlow(this._txt1, LangCVO.getContent("clubBF13", HtmlUtil.addColorTag(left + "%", Color.RED_STR))); //守城BOSS剩余血量：{0}
            this._gPower.visible = false;
        }
        else {
            // data["myPower"] = pi.readInt();
            // data["enemyPower"] = pi.readInt();
            // data["enemyName"] = pi.readUTF();
            if (this._data["isWin"]) {
                HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("clubBF9")); //恭喜你挑战胜利！
                HtmlUtil.setTextFlow(this._txt1, LangCVO.getContent("clubBF10", HtmlUtil.addColorTag(this._data["enemyName"], Color.ORANGE_STR))); //击败对方{0}
                this._gPower.visible = false;
            }
            else {
                HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("clubBF11", HtmlUtil.addColorTag(this._data["enemyName"], Color.ORANGE_STR))); //你被{0}击败
                this._txt1.text = "";
                var dis = this._data["enemyPower"] - this._data["myPower"];
                if (dis > 0) {
                    this._gPower.visible = true;
                    if (this._powerView == null) {
                        this._powerView = Manager.pool.create(NumImgView2);
                        this._powerView.x = 200;
                        this._powerView.y = 5;
                        this._gPower.addChild(this._powerView);
                    }
                    this._powerView.setValue(dis, "nums_fighting2_", 25);
                }
                else
                    this._gPower.visible = false;
            }
        }
        Manager.render.add(this.countDown, this, 1000);
        this.countDown();
        this.onResizeHandler(null);
    };
    ClubBF1v1Result.prototype.countDown = function () {
        if (this._leftTime <= 0) {
            Manager.view.hide(98 /* ClubBF1v1Result */);
            return;
        }
        this._txtTime.text = LangCVO.getContent("activity2", this._leftTime);
        this._leftTime--;
    };
    ClubBF1v1Result.prototype.hide = function () {
        this.dispose();
    };
    ClubBF1v1Result.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ClubBF1v1Result.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ClubBF1v1Result.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    ClubBF1v1Result.prototype.enterScene = function (e) {
        if (Manager.model.getMap().mapCVO.id != MapConst.ID_CLUB_BF_1V1 || Manager.model.getMap().mapCVO.id != MapConst.ID_CLUB_BF_BOSS) {
            Manager.view.hide(98 /* ClubBF1v1Result */);
        }
    };
    ClubBF1v1Result.prototype.onClickHandler = function (e) {
        // if(this._callback && e.currentTarget != this._btnClose) this._callback();
        Manager.view.hide(98 /* ClubBF1v1Result */);
    };
    ClubBF1v1Result.prototype.dispose = function () {
        Manager.control.getClubBF().exit();
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.ENTER_SCENE, this.enterScene, this);
        Manager.render.remove(this.countDown, this);
        _super.prototype.dispose.call(this);
        for (var i = this._goodItems.length - 1; i >= 0; i--) {
            Manager.pool.push(this._goodItems[i]);
        }
        ObjectUtil.disposes(this._txtTime, this._btn, this._txt0, this._txt1, this._powerView);
        ObjectUtil.removes(this._title, this._btnClose, this._gPower, this._gItems);
        this._title = null;
        this._txtTime = null;
        this._btn = null;
        this._btnClose = null;
        this._txt0 = null;
        this._txt1 = null;
        this._gPower = null;
        this._gItems = null;
        this._powerView = null;
        this._goodItems = null;
        this._data = null;
    };
    return ClubBF1v1Result;
}(UIComponent));
__reflect(ClubBF1v1Result.prototype, "ClubBF1v1Result", ["IViewManager"]);
//# sourceMappingURL=ClubBF1v1Result.js.map