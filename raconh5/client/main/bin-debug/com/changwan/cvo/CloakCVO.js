var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * 17.12.1
 * 披风cvo
 */
var CloakCVO = (function () {
    function CloakCVO() {
        //已激活的星星数 0代表未激活。
        this._num = 0;
    }
    CloakCVO.prototype.setStarNum = function (value) {
        this._num = value;
    };
    Object.defineProperty(CloakCVO.prototype, "num", {
        /** 已激活的星星数 0代表未激活。服务端的数据 */
        get: function () {
            return this._num;
        },
        enumerable: true,
        configurable: true
    });
    CloakCVO.prototype.getattrVO = function () {
        var i = (this._num == 0) ? 1 : this._num; //未激活取第1星的属性
        var starCvo = this.starArr[i];
        return starCvo.attrVo;
    };
    CloakCVO.parse = function (bytes) {
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        var info;
        for (var i = 0; i < tableCount; i++) {
            info = new CloakCVO();
            info.id = bytes.readInt();
            info.res_id = bytes.readInt();
            info.res_posetion = bytes.readUTF();
            info.name = bytes.readUTF();
            info.quality = bytes.readByte();
            info.losse = new GainLossVO(bytes.readUTF());
            info.act_cond = ConditionVO.getVOList(bytes.readUTF());
            info.sort = bytes.readShort();
            info.starArr = [];
            this._data[info.id] = info;
        }
        tableCount = bytes.readShort();
        var item;
        for (var j = 0; j < tableCount; j++) {
            item = new CloakStarCvoInfo;
            var id = bytes.readInt();
            item.star = bytes.readByte();
            item.loss = bytes.readUTF();
            item.attr = bytes.readUTF();
            var vo = this._data[id];
            vo.starArr[item.star] = item;
        }
    };
    /**信息 */
    CloakCVO.getInfo = function (id) {
        return this._data[id];
    };
    /**
     * 获得列表
     */
    CloakCVO.getList = function () {
        var arr = [];
        for (var key in this._data) {
            var info = this._data[key];
            var conList = info.act_cond;
            for (var _i = 0, conList_1 = conList; _i < conList_1.length; _i++) {
                var con = conList_1[_i];
                if (con.type == ConditionVO.CAREER && con.isSatisfy()) {
                    arr.push(info);
                    break;
                }
            }
        }
        return arr;
    };
    CloakCVO._data = {};
    return CloakCVO;
}());
__reflect(CloakCVO.prototype, "CloakCVO");
var CloakStarCvoInfo = (function () {
    function CloakStarCvoInfo() {
    }
    Object.defineProperty(CloakStarCvoInfo.prototype, "attrVo", {
        get: function () {
            if (this._attrVo == null)
                this._attrVo = Manager.pool.create(AttrVO, this.attr);
            return this._attrVo;
        },
        enumerable: true,
        configurable: true
    });
    return CloakStarCvoInfo;
}());
__reflect(CloakStarCvoInfo.prototype, "CloakStarCvoInfo");
//# sourceMappingURL=CloakCVO.js.map