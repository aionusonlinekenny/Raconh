/**
 * 装备强化表
 * Simon
 */
var EquipStrengthenCVO = /** @class */ (function () {
    function EquipStrengthenCVO() {
    }
    EquipStrengthenCVO.parse = function (bytes) {
        this._bytes = new egret.ByteArray();
        this._bytes.writeBytes(bytes);
        this._bytes.position = 0;
        Manager.render.add(EquipStrengthenCVO.render, EquipStrengthenCVO);
        this._tableCount = this._bytes.readByte();
        this._count = this._bytes.readShort();
    };
    EquipStrengthenCVO.render = function (interval) {
        if (this._step == 0) {
            var i = this._count;
            this._count = this._count - 200 < 0 ? 0 : this._count - 200;
            var info = void 0;
            var attr = void 0;
            var arr1 = void 0;
            var arr2 = void 0;
            var list = void 0;
            var attrList = void 0;
            while (i > this._count) {
                info = new EquipStrengthenCVO();
                info.id = this._bytes.readShort();
                info.equipPos = this._bytes.readShort();
                info.level = this._bytes.readShort();
                info.itemGainLossInfo = new GainLossVO(this._bytes.readUTF());
                if (info.itemGainLossInfo) {
                    info.itemId = info.itemGainLossInfo.baseId;
                    info.isBind = info.itemGainLossInfo.bind;
                    info.amount = info.itemGainLossInfo.num;
                }
                attr = this._bytes.readUTF();
                attrList = [];
                if (attr.length != 0) {
                    arr1 = attr.split("|");
                    for (var k = 0; k < arr1.length; k++) {
                        arr2 = arr1[k].split(",");
                        list = [];
                        list.push(Number(arr2[0]));
                        list.push(Number(arr2[1]));
                        attrList.push(list);
                    }
                }
                info.attr = attrList;
                this._cvos[info.equipPos + "_" + info.level] = info;
                i -= 1;
            }
            if (this._count == 0) {
                Manager.render.remove(this.render, this);
                Manager.cvo.complete();
                this._bytes.clear();
                this._bytes = null;
            }
        }
    };
    EquipStrengthenCVO.getInfo = function (equipPos, curLevel) {
        if (!curLevel)
            curLevel = 0;
        return this._cvos[equipPos + "_" + curLevel];
    };
    /**满足所有进入消耗 */
    EquipStrengthenCVO.prototype.isLossEnough = function (showTips, showItemTips) {
        if (showTips === void 0) { showTips = false; }
        if (showItemTips === void 0) { showItemTips = false; }
        if (!this.itemGainLossInfo.isEnough(showTips, showItemTips))
            return false;
        else
            return true;
    };
    EquipStrengthenCVO._cvos = {};
    EquipStrengthenCVO._count = 0;
    EquipStrengthenCVO._step = 0;
    return EquipStrengthenCVO;
}());
//# sourceMappingURL=EquipStrengthenCVO.js.map