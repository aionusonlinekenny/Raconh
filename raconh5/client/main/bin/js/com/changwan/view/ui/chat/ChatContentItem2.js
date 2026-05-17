/**
 * 聊天内容子项
 * liangyan
 * create 2017-11-14
 * @update devil 2018-04-15
*/
var ChatContentItem2 = /** @class */ (function () {
    function ChatContentItem2(imageContainer, container1, width) {
        this._imageContainer = ObjectUtil.createConainer();
        imageContainer.addChild(this._imageContainer);
        this._conainer1 = ObjectUtil.createConainer();
        container1.addChild(this._conainer1);
        this._width = width;
        this.PLACEHOLDER = String.fromCharCode(12288);
        this._faces = [];
        this.start();
    }
    ChatContentItem2.prototype.move = function (x, y) {
        this._conainer1.x = x;
        this._conainer1.y = y;
        this._imageContainer.x = x;
        this._imageContainer.y = y;
    };
    ChatContentItem2.prototype.start = function () {
        //    this._txt = TextField.create(this._width,27,0xfff7e6,22);
        this._txt = new Label();
        this._txt.width = this._width;
        this._txt.textColor = 0xfff7e6;
        this._txt.size = 22;
        this._txt.multiline = true;
        this._txt.lineSpacing = 12;
        this._txt.touchEnabled = false;
        this._conainer1.addChild(this._txt);
    };
    Object.defineProperty(ChatContentItem2.prototype, "info", {
        set: function (value) {
            if (this._info == value)
                return;
            this._info = value;
            this.unuseFaces();
            this._faces = [];
            this.drawData();
        },
        enumerable: true,
        configurable: true
    });
    ChatContentItem2.prototype.unuseFaces = function () {
        var len = this._faces.length;
        var face;
        for (var i = 0; i < len; i++) {
            face = this._faces[i];
            Manager.pool.push(face);
            face = null;
        }
        this._faces.length = 0;
    };
    ChatContentItem2.prototype.drawData = function () {
        if (!this._info)
            return;
        HtmlUtil.setTextFlow(this._txt, this._info.head);
        this.parseFace();
        // if(this.maxHeight > 0 && this._txt.textHeight > this.maxHeight) this.height = this._txt.height = this.maxHeight;
        // else this.height = this._txt.height = this._txt.textHeight;
        if (this._txt.height > 27) {
            this._imageContainer.y = 44;
            this._conainer1.y = 44;
        }
    };
    ChatContentItem2.prototype.parseFace = function () {
        var offsetX = Math.ceil(this._txt.textWidth);
        HtmlUtil.setTextFlow(this._txt, this._info.content);
        if (this._info.vipLvl > 0) {
            if (!this._vipIcon) {
                this._vipIcon = BitmapRes.create("chat_vip_png");
                this._vipIcon.source = "chat_vip_png";
                this._imageContainer.addChild(this._vipIcon);
            }
            this._vipIcon.x = 59;
            this._vipIcon.y = 2;
        }
        else {
            if (this._vipIcon) {
                Manager.pool.push(this._vipIcon);
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
                    this._conainer1.addChild(face);
                    this._faces.push(face);
                    index++;
                }
            }
        }
    };
    Object.defineProperty(ChatContentItem2.prototype, "lineSpace", {
        set: function (value) {
            this._txt.lineSpacing = value;
        },
        enumerable: true,
        configurable: true
    });
    ChatContentItem2.prototype.dispose = function () {
        if (this._txt) {
            this._txt.dispose();
            this._txt = null;
        }
        if (this._vipIcon != null) {
            Manager.pool.push(this._vipIcon);
            this._vipIcon = null;
        }
        this.unuseFaces();
        this._faces = null;
        this._info = null;
        this._imageContainer.parent.removeChild(this._imageContainer);
        this._imageContainer = null;
        this._conainer1.parent.removeChild(this._conainer1);
        this._conainer1 = null;
    };
    return ChatContentItem2;
}());
//# sourceMappingURL=ChatContentItem2.js.map