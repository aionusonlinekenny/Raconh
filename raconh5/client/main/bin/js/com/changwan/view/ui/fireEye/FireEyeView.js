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
 * 火眼金睛主界面
 * liangyan
 * create 2018-03-23
*/
var FireEyeView = /** @class */ (function (_super) {
    __extends(FireEyeView, _super);
    function FireEyeView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("fireEye", "FireEyeViewSkin");
        return _this;
    }
    FireEyeView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    FireEyeView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    FireEyeView.prototype.removeEvent = function () {
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    FireEyeView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
    };
    FireEyeView.prototype.draw = function () {
        _super.prototype.draw.call(this);
    };
    FireEyeView.prototype.onTouchHandler = function (e) {
        var actCvo = Manager.model.getActIcon().getIDByType(ActIconID.FIREEYE);
        if (actCvo) {
            if (!actCvo.isAllCondSatisfy(true))
                return;
            else if (!actCvo.isInTime) {
                FloatTips.addTips(LangCVO.getContent("activity10"), Color.RED); //活动未开启
                return;
            }
            else if (Manager.model.self.canJoinActive(true)) {
                if (Manager.model.self.attrInfo.bfType != BFType.FIRE_EYE)
                    Manager.control.getFireEye().match();
                else
                    Manager.link.link(LinkType.PANEL_FIRE_EYE, 1);
                Manager.view.hide(136 /* FireEyePanel */);
            }
        }
    };
    FireEyeView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return FireEyeView;
}(UIComponent));
//# sourceMappingURL=FireEyeView.js.map