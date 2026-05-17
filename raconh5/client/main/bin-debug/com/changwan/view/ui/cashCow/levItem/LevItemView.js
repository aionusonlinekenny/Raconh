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
 * pzx
 * 冲级好礼
 * 2018.1.24
 */
var LevItemView = (function (_super) {
    __extends(LevItemView, _super);
    function LevItemView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("cashCow\levItem", "LevItemViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    LevItemView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._scroll.initBtnListData(LevItemChild, [], true);
        this._model = Manager.model.getcashCow().levItemModel;
        Manager.control.getcashCow().levItemQuery();
    };
    LevItemView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(CashCowEvent.LEVITEM_QUERY_EVENT, this.drawData, this);
        this._model.addEventListener(CashCowEvent.LEVITEM_UPDATE_EVENT, this.updateReward, this);
    };
    LevItemView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._model.removeEventListener(CashCowEvent.LEVITEM_QUERY_EVENT, this.drawData, this);
        this._model.removeEventListener(CashCowEvent.LEVITEM_UPDATE_EVENT, this.updateReward, this);
    };
    LevItemView.prototype.openViewHandler = function () {
        Manager.view.show(73 /* SysPrivilegePane */, 1);
    };
    LevItemView.prototype.updateReward = function (e) {
        var id = e.params;
        var cvo = LevItemCVO.getcvo(id);
        if (cvo.num >= 1) {
            //已领完的重新排序
            this.updateData();
        }
    };
    LevItemView.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    LevItemView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    LevItemView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    LevItemView.prototype.setData = function (type) {
        this.invalidate(InvalidationType.DATA);
    };
    LevItemView.prototype.drawData = function () {
        if (this._model.is_activited == 1) {
            this._yijhihuoImg.visible = true;
        }
        else {
            this._yijhihuoImg.visible = false;
        }
        this.updateData();
    };
    LevItemView.prototype.updateData = function () {
        var arr = LevItemCVO.getCvos();
        arr = ArrayUtil.sortOn(arr, ["num", "id"]);
        this._scroll.dataProvider(arr);
    };
    LevItemView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    LevItemView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    LevItemView.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.disposes(this._scroll);
            this.removeChild(this._yijhihuoImg);
        }
        this._scroll = null;
        this._model = null;
        this._yijhihuoImg = null;
    };
    LevItemView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return LevItemView;
}(UIComponent));
__reflect(LevItemView.prototype, "LevItemView");
//# sourceMappingURL=LevItemView.js.map