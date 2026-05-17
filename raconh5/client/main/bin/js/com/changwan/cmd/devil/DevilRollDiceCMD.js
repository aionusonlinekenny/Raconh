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
 * 魔神降临摇奖
 * liangyan
 * create 2018-04-10
*/
var DevilRollDiceCMD = /** @class */ (function (_super) {
    __extends(DevilRollDiceCMD, _super);
    function DevilRollDiceCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.DEVIL_ROLL_DICE;
        return _this;
    }
    DevilRollDiceCMD.prototype.receive = function (pi) {
        var point = pi.readByte();
        var view = Manager.view.getView(153 /* DevilRollDiceView */);
        if (view)
            view.updateMyDice(point);
    };
    return DevilRollDiceCMD;
}(BaseCMD));
//# sourceMappingURL=DevilRollDiceCMD.js.map