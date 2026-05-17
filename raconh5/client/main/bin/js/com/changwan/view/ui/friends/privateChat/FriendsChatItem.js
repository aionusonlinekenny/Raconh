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
 * 聊天内容子项
 * liangyan
 * create 2017-11-08
*/
var FriendsChatItem = /** @class */ (function (_super) {
    __extends(FriendsChatItem, _super);
    function FriendsChatItem() {
        var _this = _super.call(this) || this;
        _this.visible = false;
        _this.skinName = Manager.path.getSkinName("friends/privateChat", "FriendsChatItemSkin");
        return _this;
    }
    FriendsChatItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    FriendsChatItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    FriendsChatItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    FriendsChatItem.prototype.drawData = function () {
        this._headBack.source = "common_itemBg_png";
        this._headBack.x = this._info.isSelf ? 540 : 5;
        this._head = Manager.pool.create(BitmapRemote, Manager.path.getRoleHeadPath(1, this._info.fromCareer));
        this._head.x = this._headBack.x + 27;
        this._head.y = this._headBack.y + 27;
        this.addChild(this._head);
        this._dialog.x = this._info.isSelf ? this.width - 149 - this._dialog.width : 149;
        var dialogH = this._dialog.y + this._dialog.height;
        this.height = dialogH + 5 > 111 ? dialogH + 5 : 111;
        this.visible = true;
    };
    Object.defineProperty(FriendsChatItem.prototype, "info", {
        set: function (info) {
            if (this._info == info)
                return;
            this._info = info;
            if (this._info == null)
                return;
            this._dialog.info = this._info;
            this.invalidate(InvalidationType.DATA);
        },
        enumerable: true,
        configurable: true
    });
    FriendsChatItem.prototype.reuse = function (info) {
        this.info = info;
        _super.prototype.reuse.call(this);
    };
    FriendsChatItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        if (this._head) {
            Manager.pool.push(this._head);
            this._head = null;
        }
        this._info = null;
    };
    FriendsChatItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._head, this._dialog);
        if (this._head) {
            Manager.pool.push(this._head);
            this._head = null;
        }
        this._dialog.dispose();
        this._dialog = null;
        this._info = null;
    };
    return FriendsChatItem;
}(UIComponent));
//# sourceMappingURL=FriendsChatItem.js.map