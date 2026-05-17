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
 * 聊天频道按钮
 * liangyan
 * create 2017-11-13
*/
var ChatChannelBtn = /** @class */ (function (_super) {
    __extends(ChatChannelBtn, _super);
    function ChatChannelBtn() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("chat", "ChatChannelBtnSkin");
        return _this;
    }
    Object.defineProperty(ChatChannelBtn.prototype, "selected", {
        set: function (value) {
            if (this.btn.selected == value)
                return;
            this.btn.selected = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatChannelBtn.prototype, "channel", {
        get: function () {
            return this.data.channel;
        },
        enumerable: true,
        configurable: true
    });
    ChatChannelBtn.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.btn.dispose();
        this.btn = null;
    };
    return ChatChannelBtn;
}(ItemRenderer));
//# sourceMappingURL=ChatChannelBtn.js.map