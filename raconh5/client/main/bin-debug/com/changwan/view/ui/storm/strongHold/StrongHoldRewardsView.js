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
 * 江湖风云占领据点获得的奖励视图
 * luzh
 * 2018-4.20
 */
var StrongHoldRewardsView = (function (_super) {
    __extends(StrongHoldRewardsView, _super);
    function StrongHoldRewardsView() {
        return _super.call(this) || this;
    }
    StrongHoldRewardsView.prototype.start = function () {
        _super.prototype.start.call(this);
        this._back = BitmapRes.create("common_back2_png", 0, 0, 230, 90);
        this.addChild(this._back);
        this._icon = BitmapRes.create("panel_gold_54_png", 108, 45);
        this.addChild(this._icon);
        this._txt = TextField.create(220, 70, Color.DEF, 24);
        this._txt.move(4, 12);
        HtmlUtil.setTextFlow(this._txt, LangCVO.getContent("storm7"));
        this.addChild(this._txt);
    };
    StrongHoldRewardsView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.pushes(this._back, this._icon, this._txt);
        this._back = null;
        this._icon = null;
        this._txt = null;
    };
    return StrongHoldRewardsView;
}(Sprite));
__reflect(StrongHoldRewardsView.prototype, "StrongHoldRewardsView");
//# sourceMappingURL=StrongHoldRewardsView.js.map