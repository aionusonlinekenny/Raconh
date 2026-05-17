var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * 18.2.28
 * 绝学 秘籍列表cvo
 */
var JueXueCVO = (function () {
    function JueXueCVO() {
        this._lev = 0;
    }
    Object.defineProperty(JueXueCVO.prototype, "lev", {
        get: function () {
            return this._lev;
        },
        enumerable: true,
        configurable: true
    });
    JueXueCVO.prototype.setLev = function (value) {
        this._lev = value;
    };
    Object.defineProperty(JueXueCVO.prototype, "levCvo", {
        get: function () {
            if (this._lev == 0)
                return null;
            return JueXueLeveCVO.getCvo(this.id, this._lev);
        },
        enumerable: true,
        configurable: true
    });
    /** 获取境界值 */
    JueXueCVO.prototype.getJingjie = function () {
        if (this._lev == 0)
            return 0;
        var i = 0;
        var loss = new GainLossVO(this.active_gain);
        i = loss.num;
        if (this._lev > 1) {
            var arr = JueXueLeveCVO.getList(this.id);
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var cvo = arr_1[_i];
                if (cvo.leve < this._lev) {
                    var lo = new GainLossVO(cvo.gain);
                    i += lo.num;
                }
                else {
                    break;
                }
            }
        }
        return i;
    };
    /** 获得战斗力 */
    JueXueCVO.prototype.getFight = function () {
        if (this._lev == 0)
            return 0;
        var fig = 0;
        var attrStr = "";
        var exlist = JueXueExtraAttrCVO.getCvos(this.id);
        for (var i = exlist.length - 1; i > -1; i--) {
            var exCvo = exlist[i];
            if (exCvo.leve <= this._lev) {
                attrStr = exCvo.attr + "|";
            }
        }
        var attVO;
        if (attrStr.length > 0) {
            attVO = Manager.pool.create(AttrVO, attrStr);
            fig = attVO.getFighting();
            Manager.pool.push(attVO);
        }
        var cvo = JueXueLeveCVO.getCvo(this.id, this._lev);
        attVO = Manager.pool.create(AttrVO, cvo.attr);
        fig += attVO.getFighting();
        Manager.pool.push(attVO);
        return fig;
    };
    /** 检测是否可升级 */
    JueXueCVO.prototype.checkUpgrade = function () {
        var loss;
        if (this._lev == 0) {
            loss = new GainLossVO(this.active_loss);
            return loss.isEnough();
        }
        else {
            var cvo = JueXueLeveCVO.getCvo(this.id, this._lev);
            if (cvo.loss == "")
                return false;
            loss = new GainLossVO(cvo.loss);
            return loss.isEnough();
        }
    };
    JueXueCVO.parse = function (bytes) {
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        var info;
        for (var i = 0; i < tableCount; i++) {
            info = new JueXueCVO();
            info.id = bytes.readShort();
            info.name = bytes.readUTF();
            info.type = bytes.readByte();
            info.active_loss = bytes.readUTF();
            info.active_gain = bytes.readUTF();
            info.attr = bytes.readUTF();
            this._data[info.id] = info;
        }
        JueXueLeveCVO.parse(bytes);
    };
    /**信息 */
    JueXueCVO.getCvo = function (id) {
        return this._data[id];
    };
    /**
     * 获得列表
     */
    JueXueCVO.getList = function (type) {
        var arr = [];
        for (var key in this._data) {
            var cvo = this._data[key];
            if (cvo.type == type) {
                arr.push(cvo);
            }
        }
        arr = ArrayUtil.sortOn(arr, ["id"]);
        return arr;
    };
    JueXueCVO.totalFight = function () {
        var fight = 0;
        for (var key in this._data) {
            var cvo = this._data[key];
            if (cvo._lev > 0) {
                fight += cvo.getFight();
            }
        }
        return fight;
    };
    JueXueCVO.data = function () {
        return this._data;
    };
    JueXueCVO._data = {};
    return JueXueCVO;
}());
__reflect(JueXueCVO.prototype, "JueXueCVO");
//# sourceMappingURL=JueXueCVO.js.map