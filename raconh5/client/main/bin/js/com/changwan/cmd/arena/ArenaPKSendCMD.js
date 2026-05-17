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
 *author Anydo
 *create 2018-1-2
 *description
*/
var ArenaPKSendCMD = /** @class */ (function (_super) {
    __extends(ArenaPKSendCMD, _super);
    function ArenaPKSendCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.ARENA_PK_SEND;
        return _this;
    }
    ArenaPKSendCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.rank);
    };
    ArenaPKSendCMD.prototype.receive = function (pi) {
        // Manager.layer.panelDarkLayer.visible = false;
        // Manager.layer.uiLayer.visible = false;
        // Manager.layer.effectLayer.visible = false;
        Manager.view.hide(38 /* ClubPanel */);
        ObjectUtil.remove(Manager.layer.panelDarkLayer);
        ObjectUtil.remove(Manager.layer.uiLayer);
        ObjectUtil.remove(Manager.layer.effectLayer);
    };
    return ArenaPKSendCMD;
}(BaseCMD));
//# sourceMappingURL=ArenaPKSendCMD.js.map