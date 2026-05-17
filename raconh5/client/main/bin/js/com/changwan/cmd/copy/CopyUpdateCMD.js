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
 * 副本更新协议
 * luzhihong
 * create 2017.12.4
 */
var CopyUpdateCMD = /** @class */ (function (_super) {
    __extends(CopyUpdateCMD, _super);
    function CopyUpdateCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_UPDATE;
        return _this;
    }
    CopyUpdateCMD.prototype.receive = function (pi) {
        // array('name' => 'id', 'type' => 'int32', 'desc' => '副本ID'),
        // array('name' => 'cell', 'type' => 'int16', 'desc' => '进入层数'),
        // array('name' => 'enter_times', 'type' => 'int8', 'desc' => '已进入次数'),
        var id = pi.readInt();
        var cvo = CopyCVO.getCVO(id);
        if (cvo)
            cvo.update(pi.readShort(), pi.readByte());
    };
    return CopyUpdateCMD;
}(BaseCMD));
//# sourceMappingURL=CopyUpdateCMD.js.map