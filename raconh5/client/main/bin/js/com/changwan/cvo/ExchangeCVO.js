/**
 * drq
 * 兑换活动 CVO
 * 2018.4.19
 */
var ExchangeCVO = /** @class */ (function () {
    function ExchangeCVO() {
    }
    ExchangeCVO.parse = function (bytes) {
        this._cvos = [];
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new ExchangeCVO();
            item.id = bytes.readShort();
            item.type = bytes.readByte();
            item.startTime = bytes.readUTF();
            item.serverOpenDay = bytes.readShort();
            item.limit = bytes.readUTF();
            item.rewards = bytes.readUTF();
            item.result = bytes.readUTF();
            item.maxCurent = bytes.readShort();
            item.sort = bytes.readByte();
            item.curCount = 0;
            this._cvos.push(item);
        }
    };
    ExchangeCVO.getCvo = function () {
        return this._cvos;
    };
    ExchangeCVO.getServerDay = function () {
        return this._cvos[0].serverOpenDay;
    };
    return ExchangeCVO;
}());
//# sourceMappingURL=ExchangeCVO.js.map