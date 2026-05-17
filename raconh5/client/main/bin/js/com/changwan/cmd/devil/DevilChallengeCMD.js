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
 * 魔神降临挑战玩家
 * liangyan
 * create 2018-04-10
*/
var DevilChallengeCMD = /** @class */ (function (_super) {
    __extends(DevilChallengeCMD, _super);
    function DevilChallengeCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.DEVIL_CHALLENGE;
        return _this;
    }
    DevilChallengeCMD.prototype.processOut = function (pkg) {
        pkg.writeInt64(this.id);
    };
    DevilChallengeCMD.prototype.receive = function (pi) {
        Manager.view.hide(143 /* DevilGrabListView */);
        ObjectUtil.remove(Manager.layer.panelDarkLayer);
        ObjectUtil.remove(Manager.layer.uiLayer);
        ObjectUtil.remove(Manager.layer.effectLayer);
        Manager.model.getDevil().updatePKData(pi);
        Manager.view.show(155 /* DevilGrabEff */);
    };
    return DevilChallengeCMD;
}(BaseCMD));
//# sourceMappingURL=DevilChallengeCMD.js.map