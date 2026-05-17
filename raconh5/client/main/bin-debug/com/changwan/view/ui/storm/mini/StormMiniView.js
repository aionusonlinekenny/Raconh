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
 * 江湖风云信息小界面信息
 * luzh
 * 2018-4.20
 */
var StormMiniView = (function (_super) {
    __extends(StormMiniView, _super);
    function StormMiniView() {
        var _this = _super.call(this) || this;
        _this.x = 27;
        _this.y = 1028;
        return _this;
    }
    StormMiniView.prototype.start = function () {
        _super.prototype.start.call(this);
        this._back0 = BitmapRes.create("copy_exp_back_1_png", 0, 0);
        this.addChild(this._back0);
        this._back1 = BitmapRes.create("copy_exp_back_0_png", 441, 3);
        this.addChild(this._back1);
        this._box = BitmapRes.create("storm_baoxiang_png", 5, 5);
        this.addChild(this._box);
        this._txtCount = TextField.create(80, 30, Color.GREEN);
        this._txtCount.move(20, 50);
        this.addChild(this._txtCount);
        this._txtOwner = TextField.create(180, 30, Color.DEF2);
        this._txtOwner.move(117, 17);
        this.addChild(this._txtOwner);
        this._txtCD = TextField.create(180, 30, Color.GREEN);
        this._txtCD.move(117, 47);
        this.addChild(this._txtCD);
        this._txtGoto = TextField.create(60, 30, Color.GREEN);
        this._txtGoto.move(300, 47);
        this.addChild(this._txtGoto);
        this._txtSW = TextField.create(240, 30, Color.DEF2);
        this._txtSW.move(460, 17);
        this.addChild(this._txtSW);
        this._txtStage = TextField.create(240, 30, Color.DEF2);
        this._txtStage.move(460, 47);
        this.addChild(this._txtStage);
    };
    StormMiniView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
        this.touchChildren = true;
    };
    StormMiniView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.pushes(this._back0, this._back1, this._box, this._txtCount, this._txtOwner, this._txtCD, this._txtGoto, this._txtSW, this._txtStage);
        this._back0 = null;
        this._back1 = null;
        this._box = null;
        this._txtCount = null;
        this._txtOwner = null;
        this._txtCD = null;
        this._txtGoto = null;
        this._txtSW = null;
        this._txtStage = null;
    };
    return StormMiniView;
}(RenderSprite));
__reflect(StormMiniView.prototype, "StormMiniView");
//# sourceMappingURL=StormMiniView.js.map