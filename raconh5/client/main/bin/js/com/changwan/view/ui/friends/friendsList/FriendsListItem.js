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
 *liangyan
 *create 2017-11-02
*/
var FriendsListItem = /** @class */ (function (_super) {
    __extends(FriendsListItem, _super);
    function FriendsListItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("friends/friendsList", "FriendsListItemSkin");
        return _this;
    }
    FriendsListItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._head = Manager.pool.create(BitmapRemote);
        this._head.x = this._headBack.x + 27;
        this._head.y = this._headBack.y + 27;
        this.addChild(this._head);
    };
    FriendsListItem.prototype.dataChanged = function () {
        var info = this.data;
        if (info == null)
            return;
        this._back.source = info.isOnline ? "common_wordBg_normal_png" : "common_wordBg_disables_png";
        this._head.load(Manager.path.getRoleHeadPath(1, info.career));
        info.isOnline ? this._head.filters = null : FilterUtil.setGrayFilter(this._head);
        this._nameTxt.text = info.nickName;
        this._fightTxt.text = "总战力：" + info.fightSum;
        this._lvlTxt.text = info.level + "级";
        this._sign.source = info.isOnline ? "friends_online_png" : "friends_offline_png";
        this._statusTxt.textFlow = new egret.HtmlTextParser().parse(info.onlineStatus);
        this._nameTxt.textColor = this._fightTxt.textColor = this._lvlTxt.textColor = info.isOnline ? 0x7C6E62 : 0x5A5B59;
    };
    FriendsListItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._back, this._headBack, this._nameTxt, this._fightTxt, this._lvlTxt, this._sign, this._statusTxt, this._head);
        this._back = null;
        this._headBack = null;
        this._head.dispose();
        this._head = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._fightTxt.dispose();
        this._fightTxt = null;
        this._lvlTxt.dispose();
        this._lvlTxt = null;
        this._sign = null;
        this._statusTxt.dispose();
        this._statusTxt = null;
        if (this._head) {
            Manager.pool.push(this._head);
            this._head = null;
        }
    };
    return FriendsListItem;
}(ItemRenderer));
//# sourceMappingURL=FriendsListItem.js.map