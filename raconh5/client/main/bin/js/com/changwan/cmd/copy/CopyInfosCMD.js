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
 * 副本信息协议
 * luzhihong
 * create 2017.12.4
 */
var CopyInfosCMD = /** @class */ (function (_super) {
    __extends(CopyInfosCMD, _super);
    function CopyInfosCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_INFOS;
        return _this;
    }
    CopyInfosCMD.prototype.receive = function (pi) {
        // array('name'=>'list', 'type'=>'arr', 'tuple'=>'true', 'desc'=>'副本列表(已通关)', 'vars' => array(
        //     array('name' => 'id', 'type' => 'int32', 'desc' => '副本ID'),
        //     array('name' => 'cell', 'type' => 'int16', 'desc' => '进入层数'),
        //     array('name' => 'enter_times', 'type' => 'int8', 'desc' => '进入次数'),
        // )),
        var id;
        var cvo;
        var len = pi.readShort();
        while (len--) {
            id = pi.readInt();
            cvo = CopyCVO.getCVO(id);
            if (cvo)
                cvo.update(pi.readShort(), pi.readByte());
            else {
                pi.readShort();
                pi.readByte();
            }
        }
        var len2 = pi.readShort();
        for (var i = 0; i < len2; i++) {
            var id_1 = pi.readInt();
            var len3 = pi.readShort();
            var list = [];
            for (var j = 0; j < len3; j++) {
                var cell = pi.readShort();
                list.push(cell);
            }
            if (id_1 == CopyConst.ID_MATERIAL)
                Manager.model.getMaterialCopy().updatePassList(list);
            var enterTime = pi.readByte();
        }
    };
    return CopyInfosCMD;
}(BaseCMD));
//# sourceMappingURL=CopyInfosCMD.js.map