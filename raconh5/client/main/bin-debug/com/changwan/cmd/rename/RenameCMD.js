var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
 * pzx
 * 17.12.14
 * 改名
 *  */
var RenameCMD = (function (_super) {
    __extends(RenameCMD, _super);
    function RenameCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_ROLE_RENAME;
        return _this;
    }
    RenameCMD.prototype.processOut = function (pkg) {
        pkg.writeUTF(this.rename);
    };
    RenameCMD.prototype.receive = function (ip) {
        // 'desc' => '改名结果',
        //     'content' => array(
        //         array('name' => 'result', 'type' => 'int8', 'desc' => '1成功0失败'),
        var result = ip.readByte();
        if (result == 1) {
            var self_1 = Manager.model.self;
            // self.attrUpdateNickname();
            self_1.dispatchEvent(new RenameEvent(RenameEvent.UPDATE_RENAME_EVENT));
        }
    };
    return RenameCMD;
}(BaseCMD));
__reflect(RenameCMD.prototype, "RenameCMD");
//# sourceMappingURL=RenameCMD.js.map