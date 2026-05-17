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
var EquipStrengthenInfoCMD = /** @class */ (function (_super) {
    __extends(EquipStrengthenInfoCMD, _super);
    function EquipStrengthenInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.EQUIP_STRENGTHEN_INFO;
        return _this;
    }
    EquipStrengthenInfoCMD.prototype.receive = function (pi) {
        var type = pi.readByte();
        var dataList = [];
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var pos = pi.readByte();
            var level = pi.readShort();
            var fighting = pi.readInt();
            var zhuhunLevel = pi.readShort();
            var zhuhunFight = pi.readInt();
            var len2 = pi.readShort();
            var gemList = [];
            for (var j = 0; j < len2; j++) {
                var gemPos = pi.readByte();
                var gemId = pi.readInt();
                gemList.push({ gemPos: gemPos, gemId: gemId });
            }
            var gemFight = pi.readInt();
            dataList.push([pos, level, fighting, zhuhunLevel, zhuhunFight, gemList, gemFight]);
        }
        dataList.sort(this.sortData);
        var zhuhunOtherFight = pi.readInt();
        var gemOtherFight = pi.readInt();
        Manager.model.getEquip().zhuhuanOtherFight = zhuhunOtherFight;
        Manager.model.getEquip().gemOtherFight = gemOtherFight;
        Manager.model.getItems().updateEquipStrengthen(dataList);
    };
    EquipStrengthenInfoCMD.prototype.sortData = function (value1, value2) {
        if (Number(value1[0]) > Number(value2[0]))
            return 1;
        else if (value1.pos < value2.pos)
            return -1;
        else
            return 0;
    };
    return EquipStrengthenInfoCMD;
}(BaseCMD));
//# sourceMappingURL=EquipStrengthenInfoCMD.js.map