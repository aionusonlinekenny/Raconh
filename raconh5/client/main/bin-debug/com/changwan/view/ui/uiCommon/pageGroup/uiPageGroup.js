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
var UiPageGroup = (function (_super) {
    __extends(UiPageGroup, _super);
    /**value:翻页的数量，call：回调方法，dx:组件间距 */
    function UiPageGroup(value, call, dx) {
        if (call === void 0) { call = null; }
        if (dx === void 0) { dx = 40; }
        var _this = _super.call(this) || this;
        _this._page = 0;
        _this._totalpage = value;
        _this._spaceX = dx;
        _this._callBack = call;
        _this.initView();
        _this.addEvent();
        return _this;
    }
    UiPageGroup.prototype.addEvent = function () {
        this._radioGroup.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
    };
    UiPageGroup.prototype.removeEvent = function () {
        this._radioGroup.removeEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
    };
    UiPageGroup.prototype.initView = function () {
        this._radioGroup = new eui.RadioButtonGroup();
        this._list = [];
        for (var i = 0; i < this._totalpage; i++) {
            var rdb = new UiRadioButton();
            rdb.group = this._radioGroup;
            rdb.page = i;
            rdb.x = this._spaceX * i;
            this.addChild(rdb);
            this._list.push(rdb);
        }
        if (this._list[0]) {
            this._list[0].$selected = true;
        }
    };
    Object.defineProperty(UiPageGroup.prototype, "totalpage", {
        /**总页数 */
        get: function () {
            return this._totalpage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiPageGroup.prototype, "page", {
        /**当前的页 */
        get: function () {
            return this._page;
        },
        enumerable: true,
        configurable: true
    });
    UiPageGroup.prototype.onSelection = function (value) {
        if (value === void 0) { value = 0; }
        if (value >= 0 && value < this._totalpage) {
            var btn = this._list[value];
            btn.selected = true;
            this._page = value;
            this.callBack(value);
        }
    };
    UiPageGroup.prototype.radioChangeHandler = function (evt) {
        var btn = this._radioGroup.selection;
        var index = btn.page;
        this._page = index;
        this.callBack(index);
    };
    UiPageGroup.prototype.callBack = function (index) {
        if (this._callBack != null) {
            this._callBack.call(this._callBack, index);
        }
    };
    UiPageGroup.prototype.dispose = function () {
        this.removeEvent();
        for (var i = 0; i < this._list.length; i++) {
            var rdb = this._list[i];
            rdb.group = null;
            rdb.dispose();
        }
        this._list = null;
        this._radioGroup = null;
        this._callBack = null;
    };
    return UiPageGroup;
}(egret.DisplayObjectContainer));
__reflect(UiPageGroup.prototype, "UiPageGroup");
//# sourceMappingURL=uiPageGroup.js.map