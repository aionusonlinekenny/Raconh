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
 * 主界面右上角小地图视图
 * luzh
 * create 2018.2.27
 * @update devil 2018-04-15
*/
var OnekeyRongLian2 = /** @class */ (function (_super) {
    __extends(OnekeyRongLian2, _super);
    function OnekeyRongLian2(imageContainer) {
        var _this = _super.call(this) || this;
        _this._visible = false;
        _this._contentWidth = 720;
        _this._contentHeight = 258;
        _this._imageContainer = ObjectUtil.createConainer();
        imageContainer.addChild(_this._imageContainer);
        _this.start();
        _this.addEvent();
        return _this;
    }
    OnekeyRongLian2.prototype.start = function () {
        this._visible = false;
        this._contentWidth = 720;
        this._contentHeight = 258;
        _super.prototype.start.call(this);
    };
    OnekeyRongLian2.prototype.onClickHandler = function (e) {
        if (Manager.model.getMap().mapCVO.type == MapConst.TYPE_COPY || Manager.model.getMap().mapCVO.type == MapConst.TYPE_BOSS)
            Manager.model.getBag().quickRonglian();
        else
            Manager.view.show(11 /* BagPanel */, 2);
    };
    OnekeyRongLian2.prototype.switch = function (visible) {
        if (this._visible == visible)
            return;
        this._visible = visible;
        if (visible) {
            this._back1 = BitmapRes.create("common_rect_1_png", 436, 33, 182, 83);
            this._back1.scale9Grid = new egret.Rectangle(6, 6, 38, 38);
            this._imageContainer.addChild(this._back1);
            this._btn = ButtonImage.create(this._imageContainer, "common_btn1_2_png", "", "main_onkeyRonglian_png", this.onClickHandler, this, 182, 83, 436, 33);
            this._back2 = BitmapRes.create("main_rl_jiantou_png", 476, 105, 112, 33);
            this._imageContainer.addChild(this._back2);
        }
        else {
            Manager.pool.push(this._back1);
            this._back1 = null;
            Manager.pool.push(this._back2);
            this._back2 = null;
            Manager.pool.push(this._btn);
            this._btn = null;
        }
    };
    OnekeyRongLian2.prototype.layout = function (gameWidth, gameHeight) {
        this._imageContainer.x = (gameWidth - this._contentWidth) >> 1;
        this._imageContainer.y = gameHeight - this._contentHeight;
    };
    return OnekeyRongLian2;
}(BaseRender));
//# sourceMappingURL=OnekeyRongLian2.js.map