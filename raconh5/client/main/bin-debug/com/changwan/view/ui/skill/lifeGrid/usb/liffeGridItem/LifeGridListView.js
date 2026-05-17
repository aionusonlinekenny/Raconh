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
 * 命格总览
 * pzx
 * 2017.12.26
 */
var LifeGridListView = (function (_super) {
    __extends(LifeGridListView, _super);
    function LifeGridListView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("lifeGrid/lifegridview", "LifeGridListViewSkin");
        return _this;
    }
    LifeGridListView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._popupView.titleImg.source = "lifeGrid_minggeyl_png";
        this._popupView.diImgVisible = false;
    };
    LifeGridListView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    LifeGridListView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
    };
    LifeGridListView.prototype.onTouchCloseHandler = function (e) {
        Manager.view.hide(56 /* LifeGridListView */);
    };
    LifeGridListView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.darwData();
    };
    LifeGridListView.prototype.darwData = function () {
        var list = ItemsCVO.cvos();
        var arr = {};
        for (var key in list) {
            var info = list[key];
            if (info.group == 4) {
                if (info.condition == "") {
                    continue;
                }
                //只取命格类
                var cvos = void 0;
                if (arr[info.condition]) {
                    cvos = arr[info.condition];
                }
                else {
                    cvos = [];
                    arr[info.condition] = cvos;
                }
                cvos.push(info);
            }
        }
        var arrlist = {};
        for (var key in arr) {
            //排序
            var con = new ConditionVO(key);
            arrlist[con.value2] = arr[key];
        }
        var data = [];
        for (var key in arrlist) {
            data.push(ArrayUtil.sortOn(arrlist[key], ["id"]));
        }
        this._scroller.initBtnListData(LifeGridListItem, data, true);
    };
    LifeGridListView.prototype.show = function () {
        _super.prototype.show.call(this);
    };
    LifeGridListView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    LifeGridListView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    LifeGridListView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        // ObjectUtil.remove();
        this._scroller.dispose();
        this._scroller = null;
    };
    return LifeGridListView;
}(PopUpView));
__reflect(LifeGridListView.prototype, "LifeGridListView");
//# sourceMappingURL=LifeGridListView.js.map