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
 * 江湖风云占领与奖励信息
 * luzh
 * 2018-4.20
 */
var StormInfoView = /** @class */ (function (_super) {
    __extends(StormInfoView, _super);
    function StormInfoView() {
        var _this = _super.call(this) || this;
        _this.x = 27;
        _this.y = 1028;
        return _this;
    }
    StormInfoView.prototype.start = function () {
        _super.prototype.start.call(this);
        this._back = BitmapRes.create("common_back2_png", 52, 9, 534, 88);
        this.addChild(this._back);
        this._icon0 = BitmapRes.create("panel_gold_54_png", 409, 20);
        this.addChild(this._icon0);
        this._icon1 = BitmapRes.create("panel_gold_54_png", 409, 53);
        this.addChild(this._icon1);
        this._cooling = new CoolingImage(50);
        this._cooling.x = this._cooling.y = 55;
        this.addChild(this._cooling);
        this._boxIcon = BitmapRes.create("storm_shengwang_png");
        this.addChild(this._boxIcon);
        this._txtFields = TextField.create(300, 40, Color.DEF);
        this._txtFields.move(110, 22);
        this.addChild(this._txtFields);
        this._txtStrongHolds = TextField.create(300, 40, Color.DEF);
        this._txtStrongHolds.move(110, 54);
        this.addChild(this._txtStrongHolds);
        this._txtRewards = TextField.create(300, 40, Color.DEF);
        this._txtRewards.move(290, 22);
        this.addChild(this._txtRewards);
        this._txtPro = TextField.create(300, 40, Color.DEF);
        this._txtPro.move(290, 54);
        this.addChild(this._txtPro);
        this._txtGet = TextField.create(300, 40, Color.DEF);
        this._txtGet.move(510, 54);
        HtmlUtil.setTextFlow(this._txtGet, HtmlUtil.addUTag(LangCVO.getContent("storm6"))); //提取
        this.addChild(this._txtGet);
    };
    StormInfoView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
        this.touchChildren = true;
    };
    StormInfoView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.pushes(this._back, this._icon0, this._icon1, this._cooling, this._boxIcon, this._txtFields, this._txtStrongHolds, this._txtRewards, this._txtPro, this._txtGet);
        this._back = null;
        this._icon0 = null;
        this._icon1 = null;
        this._cooling = null;
        this._boxIcon = null;
        this._txtFields = null;
        this._txtStrongHolds = null;
        this._txtRewards = null;
        this._txtPro = null;
        this._txtGet = null;
    };
    return StormInfoView;
}(RenderSprite));
//# sourceMappingURL=StormInfoView.js.map