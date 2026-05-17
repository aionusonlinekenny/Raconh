/**
 * 聊天信息
 * liangyan
 * create 2017-11-13
*/
var ChatInfo = /** @class */ (function () {
    function ChatInfo() {
        this._head = "";
        this._content = "";
        this._htmlText = "";
        this._text = "";
        this._props = [];
    }
    Object.defineProperty(ChatInfo.prototype, "head", {
        get: function () { return this._head; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatInfo.prototype, "content", {
        get: function () { return this._content; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatInfo.prototype, "career", {
        get: function () { return this._career; },
        set: function (value) { this._career = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatInfo.prototype, "type", {
        get: function () { return this._type; },
        set: function (value) { this._type = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatInfo.prototype, "fromID", {
        get: function () { return this._fromID; },
        set: function (value) { this._fromID = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatInfo.prototype, "fromName", {
        get: function () { return this._fromName; },
        set: function (value) { this._fromName = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatInfo.prototype, "systemType", {
        get: function () { return this._systemType; },
        set: function (value) { this._systemType = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatInfo.prototype, "vipLvl", {
        get: function () { return this._vipLvl; },
        set: function (value) { this._vipLvl = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatInfo.prototype, "htmlText", {
        get: function () { return this._htmlText; },
        set: function (value) { this._htmlText = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatInfo.prototype, "text", {
        get: function () { return this._text; },
        set: function (value) { this._text = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatInfo.prototype, "props", {
        get: function () { return this._props; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatInfo.prototype, "level", {
        get: function () { return this._level; },
        set: function (value) { this._level = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatInfo.prototype, "headID", {
        get: function () { return this._headID; },
        set: function (value) { this._headID = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatInfo.prototype, "platDatas", {
        get: function () { return this._platDatas; },
        set: function (value) { this._platDatas = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatInfo.prototype, "hasDraw", {
        get: function () { return this._hasDraw; },
        set: function (value) { this._hasDraw = value; },
        enumerable: true,
        configurable: true
    });
    ChatInfo.prototype.getTxtByHtml = function (html) {
        return this.removeHtml(html);
    };
    Object.defineProperty(ChatInfo.prototype, "getHeadLen", {
        get: function () {
            return this.getTextByHtmlText(this._head).length;
        },
        enumerable: true,
        configurable: true
    });
    ChatInfo.prototype.parseInfo = function () {
        this._hasDraw = false;
        this.parseHead();
        this._content += this._head; //"<font letterspacing ='" + 1 + "'>" + this._head + "</font>";
        var ht = "";
        if (this._htmlText != "")
            ht = this.pingContentII(this._htmlText);
        if (this._text)
            ht = this.pingContent(this._text);
        ht = Manager.model.getChat().checkPropInfo(ht, this.getTextByHtmlText(ht), this._props);
        ht = ht.replace(new RegExp("#[0-9a-f]{6}", "i"), this.getChannelColor(this._type));
        this._content += ht;
    };
    ChatInfo.prototype.getTextByHtmlText = function (html) {
        var tf = new eui.Label();
        tf.textFlow = (new egret.HtmlTextParser).parser(html);
        return tf.text;
    };
    /**
     * @param noticeType 世界公告的类型(SystemMsgCMD调用)
     */
    ChatInfo.prototype.parseHead = function () {
        switch (this._type) {
            case ChatChannelType.CORPS:
                this._head = this.addColor(this.getChannelColor(this._type), "盟会", 3);
                this.addVipFace("" + this._vipLvl);
                this._head += this.getHumanStr(this._fromName, this._fromID, this._fromName) + this.addColor(this.getChannelColor(this._type), "：", 1);
                break;
            case ChatChannelType.WORLD:
                this._head = this.addColor(this.getChannelColor(this._type), "世界", 3);
                this.addVipFace("" + this._vipLvl);
                this._head += this.getHumanStr(this._fromName, this._fromID, this._fromName) + this.addColor(this.getChannelColor(this._type), "：", 1);
                break;
            case ChatChannelType.SYSTEM:
                this._head = this.getSystemHeadStr() + " ";
                break;
        }
    };
    ChatInfo.prototype.addVipFace = function (vipLevel) {
        var lvl = Number(vipLevel);
        if (lvl > 0)
            this._head += "   ";
    };
    ChatInfo.prototype.pingContent = function (text) {
        return "<p><FONT SIZE='12' COLOR='" + Color.WHITE_STR + "' LETTERSPACING='" + 1 + "' LEADING='" + 7 + "'>" + this.removeHtml(text) + "</FONT></p>";
    };
    ChatInfo.prototype.pingContentII = function (text) {
        return "<FONT SIZE='12' COLOR='" + Color.WHITE_STR + "'>" + text + "</FONT>";
    };
    ChatInfo.prototype.addColor = function (color, text, addFlag) {
        if (text == "")
            return "";
        switch (addFlag) {
            case 1:
                return this.getHtmlStr(text, color);
            case 2:
                return this.getHtmlStr(" " + text + " ", color);
            case 3:
                return this.getHtmlStr("[" + text + "]", color);
        }
        return "";
    };
    ChatInfo.prototype.getHumanStr = function (name, id, text) {
        var color = Color.GREEN_STR;
        ; //this.getChannelColor(this._type);
        return "<u><font color='" + color + "'>" + text + "</font></u>"; //<a href='event:" + "human|"+name+"|"+id + "'>" + text + "</a></font></u>";
    };
    ChatInfo.prototype.getHtmlStr = function (msg, color) {
        if (msg == "")
            return "";
        return "<font color ='" + color + "'>" + msg + "</font>";
    };
    ChatInfo.prototype.getSystemHeadStr = function () {
        var head;
        var color;
        switch (this._systemType) {
            default:
                head = "[系统]";
                color = Color.RED_STR;
                break;
        }
        return this.addColor(color, head, 1);
    };
    ChatInfo.prototype.getChannelColor = function (type) {
        switch (type) {
            case ChatChannelType.CORPS:
                return Color.BLUE_STR;
            case ChatChannelType.SYSTEM:
                return Color.RED_STR;
            case ChatChannelType.WORLD:
                return Color.ORANGE_STR;
        }
        return Color.DEF_STR;
    };
    ChatInfo.prototype.removeWhiteSpace = function (str) {
        return str = str.replace(/[ | ]/g, "");
    };
    ChatInfo.prototype.removeHtml = function (html) {
        return html.replace(/<[^>]*>/g, "");
    };
    return ChatInfo;
}());
//# sourceMappingURL=ChatInfo.js.map