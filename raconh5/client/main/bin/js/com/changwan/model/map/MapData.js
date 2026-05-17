/**
 * 地图数据
 */
var MapData = /** @class */ (function () {
    function MapData() {
        this.source = [];
    }
    MapData.prototype.reuse = function (bytes) {
        this.parse(bytes);
    };
    MapData.prototype.unuse = function () {
        this.source = [];
    };
    MapData.prototype.parse = function (data) {
        // var data:egret.ByteArray = new egret.ByteArray(bytes, bytes.byteLength);
        var version = data.readShort();
        var row = data.readShort();
        var col = data.readShort();
        for (var i = 0; i < row; i++) {
            var values = [];
            this.source.push(values);
            for (var j = 0; j < col; j++) {
                values.push(data.readByte());
            }
        }
    };
    MapData.prototype.isEmpty = function (row, col) {
        if (row < 0 || row >= this.source.length || col >= this.source[0].length || col < 0)
            return false;
        return this.source[row][col] == MapDataType.UN_WALK;
    };
    MapData.prototype.dispose = function () {
        this.source = null;
    };
    return MapData;
}());
//# sourceMappingURL=MapData.js.map