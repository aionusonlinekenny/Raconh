var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * 2017.12.25
 * 命格
 */
var LifeGridCVO = (function () {
    function LifeGridCVO() {
    }
    Object.defineProperty(LifeGridCVO.prototype, "attrVo", {
        get: function () {
            if (this._attrVo == null)
                this._attrVo = Manager.pool.create(AttrVO, this.attr);
            return this._attrVo;
        },
        enumerable: true,
        configurable: true
    });
    LifeGridCVO.prototype.attrVos = function () {
        return this.attrVo.attrInfos;
    };
    Object.defineProperty(LifeGridCVO.prototype, "fightnum", {
        /**战斗力 */
        get: function () {
            if (!this._fight) {
                this._fight = this.attrVo.getFighting();
            }
            return this._fight;
        },
        enumerable: true,
        configurable: true
    });
    LifeGridCVO.parse = function (bytes) {
        this._cvos = {};
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new LifeGridCVO();
            item.base_id = bytes.readInt();
            item.lev = bytes.readShort();
            item.lev_loss = bytes.readUTF();
            item.sep_gain = bytes.readUTF();
            item.attr = bytes.readUTF();
            var arr = void 0;
            if (this._cvos[item.base_id]) {
                arr = this._cvos[item.base_id];
            }
            else {
                arr = {};
                this._cvos[item.base_id] = arr;
            }
            arr[item.lev] = item;
        }
        this._holeCvos = [];
        tableCount = bytes.readShort();
        var hole;
        for (var j = 0; j < tableCount; j++) {
            hole = new LifeGridHoleCvoInfo;
            hole.id = bytes.readByte();
            hole.cond = bytes.readUTF();
            this._holeCvos[hole.id] = hole;
        }
        tableCount = bytes.readShort();
        for (var j = 0; j < tableCount; j++) {
            bytes.readByte();
            bytes.readInt();
        }
        this._huntCvos = {};
        tableCount = bytes.readShort();
        var hunt;
        for (var j = 0; j < tableCount; j++) {
            hunt = new LifeGridHuntCvoInfo;
            hunt.id = bytes.readByte();
            hunt.type = bytes.readByte();
            hunt.loss = bytes.readUTF();
            this._huntCvos[hunt.id] = hunt;
        }
    };
    Object.defineProperty(LifeGridCVO, "cvos", {
        get: function () {
            return this._cvos;
        },
        enumerable: true,
        configurable: true
    });
    /**解锁条件 */
    LifeGridCVO.getholeCvo = function (id) {
        return this._holeCvos[id];
    };
    /**解锁条件例表 */
    LifeGridCVO.getHoleCvos = function () {
        return this._holeCvos;
    };
    LifeGridCVO.getHuntCvo = function (id) {
        return this._huntCvos[id];
    };
    LifeGridCVO.getInfo = function (baseid, lev) {
        var arr = this._cvos[baseid];
        var cvo = null;
        if (arr)
            cvo = arr[lev];
        return cvo;
    };
    LifeGridCVO.getDataInfo = function (value) {
        var arr = this._cvos[value.base_id];
        var lv = value.infoList[0].value;
        var cvo = arr[lv];
        cvo.itemid = value.id;
        cvo.color = value.cvo.quality;
        return cvo;
    };
    LifeGridCVO.getMaxLeve = function (baseid) {
        var lv = 0;
        var arr = this._cvos[baseid];
        for (var key in arr) {
            var cvo = arr[key];
            if (cvo.lev > lv) {
                lv = cvo.lev;
            }
        }
        return lv;
    };
    return LifeGridCVO;
}());
__reflect(LifeGridCVO.prototype, "LifeGridCVO");
//# sourceMappingURL=LifeGridCVO.js.map