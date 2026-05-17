/**
 * 神器
 * pzx
 * 18.3.9
 */
var RelicStuffCVO = /** @class */ (function () {
    function RelicStuffCVO() {
    }
    RelicStuffCVO.prototype.setisAct = function () {
        this._isAct = true;
    };
    /** 是否激活 */
    RelicStuffCVO.prototype.isActivity = function () {
        return this._isAct;
    };
    /** 获取碎片列表 */
    RelicStuffCVO.prototype.getDebrisList = function () {
        if (!this.list) {
            var arr = ConditionVO.getVOList(this.cond);
            var list = [];
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var con = arr_1[_i];
                var desCvo = RelicStuffDebrisCVO.cvo(con.value);
                list.push(desCvo);
            }
            list = ArrayUtil.sortOn(list, ["des_id"]);
            this.list = list;
        }
        return this.list;
    };
    /** 检测是否可以激活 */
    RelicStuffCVO.prototype.checkIsActivity = function () {
        if (this._isAct)
            return false;
        var list = this.getDebrisList();
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var cvo = list_1[_i];
            if (!cvo.isActivity()) {
                return false;
            }
        }
        return true;
    };
    /** 获得战斗力 */
    RelicStuffCVO.prototype.getFightNum = function () {
        var fig = 0;
        var list = this.getDebrisList();
        for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
            var cvo = list_2[_i];
            if (cvo.isActivity()) {
                var vo = cvo.attrVO;
                fig += vo.getFighting();
            }
        }
        return fig;
    };
    RelicStuffCVO.parse = function (bytes) {
        this._cvos = [];
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new RelicStuffCVO();
            item.id = bytes.readByte();
            item.name = bytes.readUTF();
            item.desc = bytes.readUTF();
            item.cond = bytes.readUTF();
            item.effect = bytes.readUTF();
            item.ani_id = bytes.readUTF();
            item.point = bytes.readUTF();
            item.mainAni_id = bytes.readUTF();
            this._cvos.push(item);
        }
        RelicStuffDebrisCVO.parse(bytes);
    };
    RelicStuffCVO.cvos = function () {
        return this._cvos;
    };
    /** 设置激活神器 */
    RelicStuffCVO.setActivity = function (id) {
        for (var i = this._cvos.length - 1; i > -1; i--) {
            var cvo = this._cvos[i];
            if (cvo.id == id) {
                cvo.setisAct();
                break;
            }
        }
    };
    RelicStuffCVO.cvo = function (id) {
        for (var _i = 0, _a = this._cvos; _i < _a.length; _i++) {
            var cvo = _a[_i];
            if (cvo.id == id) {
                return cvo;
            }
        }
        return null;
    };
    return RelicStuffCVO;
}());
//# sourceMappingURL=RelicStuffCVO.js.map