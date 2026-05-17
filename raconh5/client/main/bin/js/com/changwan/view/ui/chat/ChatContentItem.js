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
 * create 2017-11-14
*/
var ChatContentItem = /** @class */ (function (_super) {
    __extends(ChatContentItem, _super);
    function ChatContentItem() {
        var _this = _super.call(this) || this;
        _this.PLACEHOLDER = String.fromCharCode(12288);
        _this.skinName = Manager.path.getSkinName("chat", "ChatContentItemSkin");
        return _this;
    }
    ChatContentItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        console.log(this.maxWidth, this.maxHeight);
    };
    ChatContentItem.prototype.parseFace = function () {
        var offsetX = Math.ceil(this._txt.textWidth);
        HtmlUtil.setTextFlow(this._txt, this._info.content);
        if (this._info.vipLvl > 0) {
            if (!this._vipIcon) {
                this._vipIcon = new eui.Image();
                this._vipIcon.source = "chat_vip_png";
                this.addChild(this._vipIcon);
            }
            this._vipIcon.x = 59;
            this._vipIcon.y = 2;
        }
        else {
            if (this._vipIcon) {
                this._vipIcon.bitmapData = null;
                this._vipIcon = null;
            }
        }
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
                    // let len = cw.StringUtil.getStringLen(item.text.slice(0, index));
                    id = Number(faceIDs[j].replace("#", ""));
                    face = Manager.pool.create(Face, "" + id);
                    var x = temp.textWidth + offsetX;
                    var tempOffsetX = this._txt.width - x;
                    if (tempOffsetX > 0 && tempOffsetX < Face.SIZE)
                        x += tempOffsetX;
                    x += 1;
                    var line = Math.ceil(x / this._txt.width);
                    face.y = (line - 1) * 34;
                    x = x % this._txt.width;
                    face.x = x;
                    this.addChild(face);
                    this._faces.push(face);
                    index++;
                }
            }
        }
    };
    ChatContentItem.prototype.unuseFaces = function () {
        if (!this._faces)
            return;
        var len = this._faces.length;
        var face;
        for (var i = 0; i < len; i++) {
            face = this._faces[i];
            Manager.pool.push(face);
            face = null;
        }
        this._faces.length = 0;
    };
    ChatContentItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        // this.drawData();
    };
    ChatContentItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        // if(this.isInvalid(InvalidationType.DATA)) this.drawData();
    };
    ChatContentItem.prototype.drawData = function () {
        if (!this._info)
            return;
        HtmlUtil.setTextFlow(this._txt, this._info.head);
        this.parseFace();
        if (this.maxHeight > 0 && this._txt.textHeight > this.maxHeight)
            this.height = this._txt.height = this.maxHeight;
        else
            this.height = this._txt.height = this._txt.textHeight;
    };
    Object.defineProperty(ChatContentItem.prototype, "lineSpace", {
        set: function (value) {
            this._txt.lineSpacing = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatContentItem.prototype, "info", {
        set: function (value) {
            if (this._info == value)
                return;
            this._info = value;
            this.unuseFaces();
            this._faces = [];
            // this.invalidate(InvalidationType.DATA);
            this.drawData();
        },
        enumerable: true,
        configurable: true
    });
    ChatContentItem.prototype.reuse = function (info) {
        this._faces = [];
        _super.prototype.reuse.call(this);
        this._txt.width = this.width;
        this.info = info;
    };
    ChatContentItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.unuseFaces();
        if (this._vipIcon) {
            this._vipIcon.bitmapData = null;
            this._vipIcon = null;
        }
        this._info = null;
    };
    ChatContentItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._txt, this._vipIcon);
        this._txt.dispose();
        this._txt = null;
        this.unuseFaces();
        this._faces = null;
        if (this._vipIcon) {
            this._vipIcon.bitmapData = null;
            this._vipIcon = null;
        }
        this._info = null;
    };
    return ChatContentItem;
}(UIComponent));
//# sourceMappingURL=ChatContentItem.js.map