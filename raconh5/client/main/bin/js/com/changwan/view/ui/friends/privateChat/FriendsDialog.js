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
 * 好友私聊对话框
 * liangyan
 * create 2017-11-08
*/
var FriendsDialog = /** @class */ (function (_super) {
    __extends(FriendsDialog, _super);
    function FriendsDialog() {
        var _this = _super.call(this) || this;
        _this.SPACE = 5;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("friends/privateChat", "FriendsDialogSkin");
        return _this;
    }
    FriendsDialog.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._faces = [];
        this.PLACEHOLDER = String.fromCharCode(12288);
        this._txt.multiline = true;
    };
    FriendsDialog.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    FriendsDialog.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    FriendsDialog.prototype.drawData = function () {
        this._back.source = this._info.isSelf ? "friends_chat_self_png" : "friends_chat_others_png";
        this.unuseFaces();
        HtmlUtil.setTextFlow(this._txt, this._info.content);
        this.parseFace();
        if (this._txt.width > 456)
            this._txt.width = this._info.isSelf ? this.width - 40 : this.width - 20;
        this.width = this._txt.width + 40;
    };
    Object.defineProperty(FriendsDialog.prototype, "info", {
        set: function (value) {
            // if(this._info == value) return;
            this._info = value;
            if (this._info == null)
                return;
            this.invalidate(InvalidationType.DATA);
        },
        enumerable: true,
        configurable: true
    });
    FriendsDialog.prototype.parseFace = function () {
        var offsetX = this._info.isSelf ? 10 : 28;
        this._txt.x = offsetX;
        var size = this._txt.size / 2;
        var regexp = /#\d{2}/g;
        var faceIDs;
        var item;
        var len = this._txt.textFlow.length;
        var temp = new Label();
        for (var i = len - 1; i >= 0; i--) {
            item = this._txt.textFlow[i];
            faceIDs = item.text.match(regexp);
            item.text = item.text.replace(regexp, this.PLACEHOLDER);
            if (faceIDs != null) {
                var id = void 0;
                var face = void 0;
                var index = void 0;
                for (var j = 0; j < faceIDs.length; j++) {
                    index = item.text.indexOf(this.PLACEHOLDER, index);
                    temp.text = item.text.slice(0, index);
                    id = Number(faceIDs[j].replace("#", ""));
                    face = Manager.pool.create(Face, "" + id);
                    var x = temp.textWidth + 1;
                    var line = Math.ceil(x / this._txt.maxWidth);
                    face.y = 20 + ((line - 1) * 15);
                    x = x % this._txt.maxWidth;
                    x += offsetX;
                    face.x = Math.ceil(x);
                    this.addChild(face);
                    this._faces.push(face);
                    index++;
                }
            }
        }
        temp.dispose();
        temp = null;
    };
    FriendsDialog.prototype.unuseFaces = function () {
        var len = this._faces.length;
        var face;
        for (var i = 0; i < len; i++) {
            face = this._faces[i];
            Manager.pool.push(face);
            face = null;
        }
        this._faces.length = 0;
    };
    FriendsDialog.prototype.dispose = function () {
        this.removeEvent();
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._back, this._txt);
        this._back = null;
        this._txt.dispose();
        this._txt = null;
        this.unuseFaces();
        this._info = null;
    };
    return FriendsDialog;
}(UIComponent));
//# sourceMappingURL=FriendsDialog.js.map