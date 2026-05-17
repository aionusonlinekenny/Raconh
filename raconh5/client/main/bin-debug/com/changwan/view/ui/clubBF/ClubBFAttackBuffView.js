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
 * 盟会战攻击BUFF属性界面（战意）
 * luzh
 * 2018.1.29
 */
var ClubBFAttackBuffView = (function (_super) {
    __extends(ClubBFAttackBuffView, _super);
    function ClubBFAttackBuffView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("clubBF", "ClubBFAttackBuffSkin");
        _this.touchChildren = true;
        return _this;
    }
    ClubBFAttackBuffView.prototype.show = function () {
        if (this.parent == null)
            Manager.layer.tipsLayer.addChildAt(this, 0);
    };
    ClubBFAttackBuffView.prototype.hide = function () {
        this.dispose();
    };
    ClubBFAttackBuffView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getClubBF();
        this._icon.load(Manager.path.getClubBFPath("zhanyi.png"));
        HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("clubBF7", this._model.winCount)); //防守方连胜{0}次，攻方获得以下战意属性
        this.updateClubBuff(null);
        this.onResizeHandler(null);
    };
    ClubBFAttackBuffView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        // this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._model.addEventListener(ClubBFEvent.ATTACK_BUFF_UPDATE, this.updateClubBuff, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    ClubBFAttackBuffView.prototype.removeEvent = function () {
        // this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._model.removeEventListener(ClubBFEvent.ATTACK_BUFF_UPDATE, this.updateClubBuff, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ClubBFAttackBuffView.prototype.updateClubBuff = function (e) {
        if (this._model.atkBuffCVO == null)
            return;
        var infos = this._model.atkBuffCVO.attrVo.attrInfos;
        var str1 = "";
        var str2 = "";
        for (var i = 0, len = infos.length; i < len; i++) {
            if (i % 2 == 0)
                str1 += infos[i].desc(true, Color.GREEN_STR) + "\n";
            else
                str2 += infos[i].desc(true, Color.GREEN_STR) + "\n";
        }
        HtmlUtil.setTextFlow(this._txt1, str1);
        HtmlUtil.setTextFlow(this._txt2, str2);
    };
    ClubBFAttackBuffView.prototype.onResizeHandler = function (e) {
        this.x = Math.round((Manager.config.gameWidth - this.width) >> 1);
        this.y = 351;
    };
    ClubBFAttackBuffView.prototype.onTouchHandler = function (e) {
        Manager.view.hide(97 /* ClubBFAttackBuffView */);
    };
    ClubBFAttackBuffView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._icon, this._txt0, this._txt1, this._txt2);
        ObjectUtil.remove(this._btnClose);
        this._icon = null;
        this._txt0 = null;
        this._txt1 = null;
        this._txt2 = null;
        this._btnClose = null;
        this._model = null;
    };
    return ClubBFAttackBuffView;
}(UIComponent));
__reflect(ClubBFAttackBuffView.prototype, "ClubBFAttackBuffView", ["IViewManager"]);
//# sourceMappingURL=ClubBFAttackBuffView.js.map