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
 * 火眼金睛禁手视图
 * liangyan
 * create 2018-03-22
*/
var FireEyeBanView = /** @class */ (function (_super) {
    __extends(FireEyeBanView, _super);
    function FireEyeBanView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("fireEye", "FireEyeBanViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    FireEyeBanView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        var path = Manager.path.getFireEyePath("dark_back");
        this._back.load(path);
        this._back.touchEnabled = true;
    };
    FireEyeBanView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    FireEyeBanView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    FireEyeBanView.prototype.drawData = function () {
        this._wrong = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_WRONG_TIMES).value;
        this._life = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_BAN_HAND).value;
        var path = Manager.path.getFireEyePath("crying");
        this._bp = Manager.pool.create(BitmapRemote, path);
        this._bp.x = 171;
        this._bp.y = 480;
        this.addChild(this._bp);
        HtmlUtil.setTextFlow(this._countDown, StringUtils.setParam(LangCVO.getContent("fireEye8"), this._wrong, Color.GREEN_STR_2, this._life));
        Manager.render.add(this.countDown, this, 1000);
    };
    FireEyeBanView.prototype.countDown = function () {
        this._life--;
        //点错啦!（累积错3次会禁手{0}}秒啊）
        var str = StringUtils.setParam(LangCVO.getContent("fireEye8"), this._wrong, Color.GREEN_STR_2, this._life);
        HtmlUtil.setTextFlow(this._countDown, str);
        if (this._life == 0) {
            Manager.control.getFireEye().banView.dispose();
            Manager.control.getFireEye().banView = null;
        }
    };
    FireEyeBanView.prototype.dispose = function () {
        if (Manager.render.contains(this.countDown, this))
            Manager.render.remove(this.countDown, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._countDown, this._bp);
        if (this._back != null)
            Manager.pool.push(this._back);
        this._back = null;
        this._countDown.dispose();
        this._countDown = null;
        if (this._bp)
            Manager.pool.push(this._bp);
        this._bp = null;
    };
    return FireEyeBanView;
}(UIComponent));
//# sourceMappingURL=FireEyeBanView.js.map