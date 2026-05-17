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
 * 好友私聊分割线
 * liangyan
 * create 2017-11-08
*/
var FriendsChatSplitLine = /** @class */ (function (_super) {
    __extends(FriendsChatSplitLine, _super);
    function FriendsChatSplitLine() {
        return _super.call(this) || this;
    }
    FriendsChatSplitLine.prototype.start = function () {
        _super.prototype.start.call(this);
        this._line = new eui.Image();
        this._line.source = "split_line_png";
        this._line.x = 4;
        this.addChild(this._line);
        this._timeTxt = Manager.pool.create(Label);
        this._timeTxt.textColor = Color.DEF;
        this._timeTxt.y = 7;
        this._timeTxt.width = 666;
        this._timeTxt.height = 33;
        this.addChild(this._timeTxt);
        this._timeTxt.textAlign = "center";
        this.width = 666;
        this.height = 33;
    };
    Object.defineProperty(FriendsChatSplitLine.prototype, "time", {
        set: function (second) {
            this._timeTxt.text = cw.DateUtil.formatStr(second, cw.DateUtil.HH_MM);
        },
        enumerable: true,
        configurable: true
    });
    FriendsChatSplitLine.prototype.reuse = function (time) {
        _super.prototype.reuse.call(this);
        this.time = time;
    };
    FriendsChatSplitLine.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        if (this._timeTxt) {
            Manager.pool.push(this._timeTxt);
            this._timeTxt = null;
        }
    };
    FriendsChatSplitLine.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._line, this._timeTxt);
        this._line = null;
        this._timeTxt.dispose();
        this._timeTxt = null;
    };
    return FriendsChatSplitLine;
}(Sprite));
//# sourceMappingURL=FriendsChatSplitLine.js.map