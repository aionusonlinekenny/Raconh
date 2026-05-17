var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ScriptBaseCVO = (function () {
    function ScriptBaseCVO(script) {
        this._configs = (script == null || script == "") ? [] : script.split("|");
    }
    ScriptBaseCVO.prototype.getTypeValue = function (type) {
        var b;
        for (var _i = 0, _a = this._configs; _i < _a.length; _i++) {
            var one = _a[_i];
            b = one.split(",");
            if (parseInt(b[0]) == type)
                return parseInt(b[1]);
        }
        return -1;
    };
    ScriptBaseCVO.prototype.getTypeHasValue = function (type) {
        var b;
        for (var _i = 0, _a = this._configs; _i < _a.length; _i++) {
            var one = _a[_i];
            b = one.split(",");
            if (parseInt(b[0]) == type)
                return (b[1] != "-1");
        }
        return false;
    };
    return ScriptBaseCVO;
}());
__reflect(ScriptBaseCVO.prototype, "ScriptBaseCVO");
//# sourceMappingURL=ScriptBaseCVO.js.map