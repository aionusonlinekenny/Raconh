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
 * 批量删除子项
 * liangyan
 * create 2017-11-04
*/
var FriendsDeleteItem = /** @class */ (function (_super) {
    __extends(FriendsDeleteItem, _super);
    function FriendsDeleteItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("friends/friendsList", "FriendsDeleteItemSkin");
        return _this;
    }
    FriendsDeleteItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.initEvent();
    };
    FriendsDeleteItem.prototype.dataChanged = function () {
        var info = this.data;
        if (info == null)
            return;
        this._nameTxt.text = info.nickName;
        this._lvlTxt.text = info.level + "级";
        this._offTxt.textFlow = new egret.HtmlTextParser().parse(info.onlineStatus);
        this._cb.selected = info.selected;
        this._nameTxt.textColor = this._offTxt.textColor = this._lvlTxt.textColor = info.isOnline ? 0x7C6E62 : 0x5A5B59;
    };
    Object.defineProperty(FriendsDeleteItem.prototype, "cbSelected", {
        set: function (value) {
            if (this._cb.selected == value)
                return;
            this._cb.selected = value;
        },
        enumerable: true,
        configurable: true
    });
    FriendsDeleteItem.prototype.initEvent = function () {
        this._cb.addEventListener(egret.Event.CHANGE, this.onChangeHandler, this);
    };
    FriendsDeleteItem.prototype.removeEvent = function () {
        this._cb.addEventListener(egret.Event.CHANGE, this.onChangeHandler, this);
    };
    FriendsDeleteItem.prototype.onChangeHandler = function (e) {
        this.data.selected = this._cb.selected;
    };
    FriendsDeleteItem.prototype.dispose = function () {
        this.data.selected = false;
        this.removeEvent();
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._nameTxt, this._lvlTxt, this._offTxt, this._cb);
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._lvlTxt.dispose();
        this._lvlTxt = null;
        this._offTxt.dispose();
        this._offTxt = null;
        this._cb.dispose();
        this._cb = null;
    };
    return FriendsDeleteItem;
}(ItemRenderer));
//# sourceMappingURL=FriendsDeleteItem.js.map