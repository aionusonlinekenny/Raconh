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
 * 技能主界面选中技能格子
 * liangyan
 * create 2017-11-24
*/
var SkillSelectedGrid = (function (_super) {
    __extends(SkillSelectedGrid, _super);
    function SkillSelectedGrid() {
        var _this = _super.call(this) || this;
        _this.start();
        return _this;
    }
    SkillSelectedGrid.prototype.start = function () {
        _super.prototype.start.call(this);
        this.width = 140;
        this.height = 147;
        this._grid = new SkillGrid();
        this._grid.x = 15;
        this.addChild(this._grid);
        this._nameBack = new eui.Image();
        this._nameBack.source = "common_back2_png";
        this._nameBack.y = 105;
        this.addChild(this._nameBack);
        this._nameTxt = new Label();
        this._nameTxt.size = 20;
        this._nameTxt.textColor = Color.WHITE;
        this._nameTxt.fontFamily = Manager.config.defaultFont;
        this._nameTxt.y = 115;
        this._nameTxt.width = this.width;
        this._nameTxt.height = 24;
        this._nameTxt.textAlign = "center";
        this.addChild(this._nameTxt);
    };
    Object.defineProperty(SkillSelectedGrid.prototype, "cvo", {
        set: function (value) {
            if (this._cvo == value)
                return;
            this._cvo = value;
            this._grid.cvo = this._cvo;
            this._nameTxt.text = this._cvo.name;
        },
        enumerable: true,
        configurable: true
    });
    SkillSelectedGrid.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._grid, this._nameBack, this._nameTxt);
        this._grid.dispose();
        this._grid = null;
        this._nameBack = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._cvo = null;
    };
    return SkillSelectedGrid;
}(Sprite));
__reflect(SkillSelectedGrid.prototype, "SkillSelectedGrid");
//# sourceMappingURL=SkillSelectedGrid.js.map