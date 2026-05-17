var Dictionary = /** @class */ (function () {
    function Dictionary() {
        this._keys = [];
        this._values = [];
        this._map = {};
    }
    Dictionary.prototype.get = function (key) {
        return this._map[key];
    };
    Dictionary.prototype.add = function (key, value) {
        this._map[key] = value;
        this._keys.push(key);
        this._values.push(value);
    };
    Dictionary.prototype.remove = function (key) {
        var index = this._keys.indexOf(key, 0);
        var value = this._values[index];
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
        delete this._map[key];
        return value;
    };
    Dictionary.prototype.keys = function () {
        return this._keys;
    };
    Dictionary.prototype.values = function () {
        return this._values;
    };
    Dictionary.prototype.containsKey = function (key) {
        return !!this._map[key];
    };
    return Dictionary;
}());
//# sourceMappingURL=Dictionary.js.map