var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LangCVO = (function () {
    function LangCVO() {
    }
    /**
     * 解析语言包
     */
    LangCVO.parse = function (bytes) {
        var tableCount = bytes.readByte();
        var tableName;
        var cvoCount = 0;
        for (var i = 0; i < tableCount; i++) {
            tableName = bytes.readUTF();
            cvoCount = bytes.readShort();
            for (var j = 0; j < cvoCount; j++) {
                this._cvos[tableName + bytes.readShort()] = bytes.readUTF();
            }
        }
    };
    /**
    * 语言ID，系统与ID组成的字符串，例如:bag1
    */
    LangCVO.getContent = function (id) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var content = this._cvos[id];
        if (content == null)
            return "{-" + id + "-}";
        if (args.length == 0)
            return content;
        content = cw.StringUtil.format(content, args);
        return content;
    };
    LangCVO._cvos = {};
    return LangCVO;
}());
__reflect(LangCVO.prototype, "LangCVO");
//# sourceMappingURL=LangCVO.js.map