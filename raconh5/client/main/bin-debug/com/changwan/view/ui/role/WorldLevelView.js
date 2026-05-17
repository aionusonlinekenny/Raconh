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
 * 世界等级
 * pzx
 * create 18.3.29
 */
var WorldLevelView = (function (_super) {
    __extends(WorldLevelView, _super);
    function WorldLevelView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("role", "WorldLevelViewSkin");
        return _this;
    }
    WorldLevelView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._popupView.titleImg.source = "role_shijiedengji_png";
        this._desc.lineSpacing = 15;
        this._desc0.lineSpacing = 15;
        Manager.control.getRole().worldLeve();
    };
    WorldLevelView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
        Manager.model.getLogin().addEventListener(WorldLeveExpEvent.UPDATE_WORLDLEVE_EVENT, this.darwData, this);
    };
    WorldLevelView.prototype.removeEvent = function () {
        this._okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
        Manager.model.getLogin().removeEventListener(WorldLeveExpEvent.UPDATE_WORLDLEVE_EVENT, this.darwData, this);
        _super.prototype.removeEvent.call(this);
    };
    WorldLevelView.prototype.onTouchCloseHandler = function (e) {
        Manager.view.hide(137 /* WorldLevelView */);
    };
    //     自身没达到120级的时候
    // 当前世界等级：（还是写实际的）
    // 当前经验加成：0%
    WorldLevelView.prototype.darwData = function (e) {
        var lv = e.params; //当前世界等级
        this._desc.text = StringUtils.setParam(LangCVO.getContent("worldLeve1"), lv);
        var exp;
        if (Manager.model.self.attrInfo.level < 120) {
            exp = "0";
        }
        else {
            var mlv = lv - Manager.model.self.attrInfo.level;
            if (mlv <= 0)
                exp = "0";
            else {
                exp = WorldLevelExpCVO.getExp(mlv); //千分比
                exp = exp.substr(0, exp.length - 1);
            }
        }
        HtmlUtil.setTextFlow(this._desc0, StringUtils.setParam(LangCVO.getContent("worldLeve2"), lv, exp));
    };
    WorldLevelView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._okBtn, this._desc, this._desc0);
        this._okBtn = null;
        this._desc = null;
        this._desc0 = null;
    };
    return WorldLevelView;
}(PopUpView));
__reflect(WorldLevelView.prototype, "WorldLevelView");
//# sourceMappingURL=WorldLevelView.js.map