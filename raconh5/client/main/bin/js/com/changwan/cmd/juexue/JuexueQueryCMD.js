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
 * 18.3.1
 * 绝学
 *  */
var JuexueQueryCMD = /** @class */ (function (_super) {
    __extends(JuexueQueryCMD, _super);
    function JuexueQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_JUEXUE_QUERY;
        return _this;
    }
    JuexueQueryCMD.prototype.receive = function (ip) {
        // 'content' => array(
        //         array('name' => 'jx_lists', 'type' => 'arr',  'record'=>'juexue_info', 'desc' => '绝学数据', 'vars' => array(
        //             array('name' => 'id', 'type' => 'int16', 'desc' => '绝学id'),
        //             array('name' => 'lev', 'type' => 'int16', 'desc' => '绝学等级'),
        //         )),
        //         array('name' => 'ambit_lev', 'type' => 'int32', 'desc' => '境界等级'),
        //     ),
        var ln = ip.readShort();
        for (var i = 0; i < ln; i++) {
            var Id = ip.readShort();
            var lev = ip.readShort();
            var cvo = JueXueCVO.getCvo(Id);
            cvo.setLev(lev);
        }
        var ambitLev = ip.readInt();
        Manager.model.getjuexue().query(ambitLev);
    };
    return JuexueQueryCMD;
}(BaseCMD));
//# sourceMappingURL=JuexueQueryCMD.js.map