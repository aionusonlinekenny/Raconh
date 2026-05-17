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
 *create 2017-11-30
 *description
*/
var BuffControl = /** @class */ (function (_super) {
    __extends(BuffControl, _super);
    function BuffControl() {
        return _super.call(this) || this;
    }
    BuffControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.BUFF_SELF_LIST, BuffSelfListCMD);
        Manager.socket.addCMD(Protocol.BUFF_SELF_ADD, BuffSelfAddCMD);
        Manager.socket.addCMD(Protocol.BUFF_SELF_REMOVE, BuffSelfRemoveCMD);
        Manager.socket.addCMD(Protocol.BUFF_MAP_ADD, BuffMapAddCMD);
        Manager.socket.addCMD(Protocol.BUFF_MAP_REMOVE, BuffMapRemoveCMD);
    };
    return BuffControl;
}(BaseControl));
//# sourceMappingURL=BuffControl.js.map