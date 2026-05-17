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
 * 18.2.1
 * 珍希掉落查询
 *  */
var RareDropQueryCMD = /** @class */ (function (_super) {
    __extends(RareDropQueryCMD, _super);
    function RareDropQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_RAREDROP_QUERY;
        return _this;
    }
    RareDropQueryCMD.prototype.receive = function (ip) {
        var arr = [];
        var ln = ip.readShort();
        for (var i = 0; i < ln; i++) {
            var name_1 = ip.readUTF();
            var time = ip.readInt();
            var monId = ip.readInt();
            var n = ip.readShort();
            for (var a = 0; a < n; a++) {
                var info = new RareDropInfo();
                info.name = name_1;
                info.time = time;
                info.mon_id = monId;
                info.item.base_id = ip.readInt();
                var l = ip.readShort();
                for (var j = 0; j < l; j++) {
                    var exinfo = new ExattrItemsinfo;
                    exinfo.type = ip.readShort();
                    exinfo.target = ip.readInt();
                    exinfo.value = ip.readInt();
                    exinfo.desc = ip.readUTF();
                    info.item.infoList.push(exinfo);
                }
                arr.push(info);
            }
        }
        Manager.model.getBoss().rareDropModel.query(arr);
    };
    return RareDropQueryCMD;
}(BaseCMD));
//# sourceMappingURL=RareDropQueryCMD.js.map