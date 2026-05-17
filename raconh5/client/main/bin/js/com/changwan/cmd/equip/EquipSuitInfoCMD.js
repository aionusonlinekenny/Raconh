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
var EquipSuitInfoCMD = /** @class */ (function (_super) {
    __extends(EquipSuitInfoCMD, _super);
    function EquipSuitInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.SUIT_INFO;
        return _this;
    }
    EquipSuitInfoCMD.prototype.processOut = function (pkg) {
    };
    EquipSuitInfoCMD.prototype.receive = function (pi) {
        Manager.model.getEquip().equipSuitAttackList = [];
        Manager.model.getEquip().equipSuitDefenseList = [];
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var pos = pi.readByte();
            var level = pi.readByte();
            if (EquipModel.SUIT_ATTACK_POS.indexOf(pos) != -1) {
                var list = Manager.model.getEquip().equipSuitAttackList;
                var has = false;
                for (var j = 0; j < list.length; j++) {
                    if (list[j] && list[j].pos == pos) {
                        has = true;
                        list[j].level = level;
                    }
                }
                if (!has)
                    Manager.model.getEquip().equipSuitAttackList.push({ pos: pos, level: level });
            }
            else if (EquipModel.SUIT_DEFENSE_POS.indexOf(pos) != -1) {
                var list = Manager.model.getEquip().equipSuitDefenseList;
                var has = false;
                for (var j = 0; j < list.length; j++) {
                    if (list[j] && list[j].pos == pos) {
                        has = true;
                        list[j].level = level;
                    }
                }
                if (!has)
                    Manager.model.getEquip().equipSuitDefenseList.push({ pos: pos, level: level });
            }
        }
        var suitAllFight = pi.readInt();
        Manager.model.getEquip().suitAllFight = suitAllFight;
        Manager.model.getEquip().dispatchEvent(new EquipEvent(EquipEvent.SUIT_INFO_UPDATE));
    };
    return EquipSuitInfoCMD;
}(BaseCMD));
//# sourceMappingURL=EquipSuitInfoCMD.js.map