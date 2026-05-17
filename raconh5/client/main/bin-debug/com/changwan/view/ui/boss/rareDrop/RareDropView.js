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
 * 珍希掉落容器
 * pzx
 * create 18.2.1
 */
var RareDropView = (function (_super) {
    __extends(RareDropView, _super);
    function RareDropView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("boss/rareDrop", "RareDropViewSkin");
        return _this;
    }
    RareDropView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getBoss().rareDropModel;
        this._scroll.initBtnListData(RareDropItem, [], true);
        Manager.control.getBoss().rareDropQuery();
        this.touchChildren = true;
        this._scroll.touchChildren = true;
    };
    RareDropView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(BossEvent.RAREDROP_QUIER_EVENT, this.drawData, this);
    };
    RareDropView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._model.removeEventListener(BossEvent.RAREDROP_QUIER_EVENT, this.drawData, this);
    };
    RareDropView.prototype.drawData = function () {
        this._scroll.dataProvider(this._model.list);
    };
    RareDropView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._model = null;
        this._scroll.dispose();
    };
    return RareDropView;
}(UIComponent));
__reflect(RareDropView.prototype, "RareDropView");
//# sourceMappingURL=RareDropView.js.map