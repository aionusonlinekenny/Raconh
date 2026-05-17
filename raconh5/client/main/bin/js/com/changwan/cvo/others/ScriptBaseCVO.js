var ScriptBaseCVO = /** @class */ (function () {
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
//# sourceMappingURL=ScriptBaseCVO.js.map