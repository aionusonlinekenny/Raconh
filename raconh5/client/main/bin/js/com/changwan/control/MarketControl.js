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
 *
 * pzx
 * create 2018-4-17
 * 市场Control
 *
*/
var MarketControl = /** @class */ (function (_super) {
    __extends(MarketControl, _super);
    function MarketControl() {
        return _super.call(this) || this;
    }
    MarketControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_ALL_MARKET, MarketQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_REQ_MARKET, MarketPlayerInfoCMD);
        Manager.socket.addCMD(Protocol.CMD_STUFF_AUCTION, MarketSaleCMD);
        Manager.socket.addCMD(Protocol.CMD_CANCEL_AUCTION, MarketNoSaleCMD);
        Manager.socket.addCMD(Protocol.CMD_REQ_LOG, MarketSalyBuyNoticeCMD);
        Manager.socket.addCMD(Protocol.CMD_BUY_AUCTION, MarketBuyCMD);
    };
    MarketControl.prototype.query = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_ALL_MARKET);
        cmd.send();
    };
    MarketControl.prototype.playerInfo = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_REQ_MARKET);
        cmd.id = id;
        cmd.send();
    };
    //上架
    MarketControl.prototype.sale = function (itemId, count, price) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_STUFF_AUCTION);
        cmd.itemId = itemId;
        cmd.count = count;
        cmd.price = price;
        cmd.send();
    };
    MarketControl.prototype.onsale = function (pos) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_CANCEL_AUCTION);
        cmd.pos = pos;
        cmd.send();
    };
    MarketControl.prototype.buy = function (palyId, pos, count) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_BUY_AUCTION);
        cmd.paly_id = palyId;
        cmd.pos = pos;
        cmd.count = count;
        cmd.send();
    };
    MarketControl.prototype.noticeList = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_REQ_LOG);
        cmd.send();
    };
    return MarketControl;
}(BaseControl));
//# sourceMappingURL=MarketControl.js.map