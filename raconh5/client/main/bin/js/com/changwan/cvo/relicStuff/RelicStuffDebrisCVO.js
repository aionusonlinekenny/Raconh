/**
 * 神器碎片
 * pzx
 * 18.3.9
 */
var RelicStuffDebrisCVO = /** @class */ (function () {
    function RelicStuffDebrisCVO() {
    }
    Object.defineProperty(RelicStuffDebrisCVO.prototype, "attrVO", {
        get: function () {
            if (this._attrVO == null)
                this._attrVO = Manager.pool.create(AttrVO, this.attr);
            return this._attrVO;
        },
        enumerable: true,
        configurable: true
    });
    RelicStuffDebrisCVO.prototype.setisAct = function () {
        this._isAct = true;
    };
    /** 是否激活 */
    RelicStuffDebrisCVO.prototype.isActivity = function () {
        return this._isAct;
    };
    /**
     * 检测是否可激活
     */
    RelicStuffDebrisCVO.prototype.checkisActivity = function () {
        if (this._isAct)
            return false;
        return this.condVo.isSatisfy();
    };
    RelicStuffDebrisCVO.parse = function (bytes) {
        this._cvos = {};
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new RelicStuffDebrisCVO();
            item.des_id = bytes.readShort();
            item.name = bytes.readUTF();
            item.condVo = new ConditionVO(bytes.readUTF());
            //item.cond = bytes.readUTF();
            item.attr = bytes.readUTF();
            item.sqId = bytes.readByte();
            1;
            this._cvos[item.des_id] = item;
        }
    };
    RelicStuffDebrisCVO.cvos = function (sqId) {
        var arr = [];
        for (var key in this._cvos) {
            var cvo = this._cvos[key];
            if (cvo.sqId == sqId) {
                arr.push(cvo);
            }
        }
        return arr;
    };
    RelicStuffDebrisCVO.cvo = function (id) {
        return this._cvos[id];
    };
    /** 设置激活碎片 */
    RelicStuffDebrisCVO.setActivity = function (id) {
        var cvo = this._cvos[id];
        if (cvo) {
            cvo.setisAct();
        }
    };
    RelicStuffDebrisCVO.allcvos = function () {
        return this._cvos;
    };
    return RelicStuffDebrisCVO;
}());
//# sourceMappingURL=RelicStuffDebrisCVO.js.map