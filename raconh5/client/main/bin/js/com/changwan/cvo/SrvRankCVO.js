/**
 * pzx
 * create 2018-3-15
 * 冲榜竞技CVO
*/
var SrvRankCVO = /** @class */ (function () {
    function SrvRankCVO() {
    }
    SrvRankCVO.prototype.setReward = function () {
        this._isReward = true;
    };
    /** 是否已领奖 */
    SrvRankCVO.prototype.isReward = function () {
        return this._isReward;
    };
    Object.defineProperty(SrvRankCVO.prototype, "isSortNum", {
        /** 已领奖的排序沉底 */
        get: function () {
            if (this._isReward) {
                return 1;
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    /** 检测是否可领奖 */
    SrvRankCVO.prototype.checkReward = function () {
        if (this._isReward || this.conList.length == 0)
            return false;
        for (var _i = 0, _a = this.conList; _i < _a.length; _i++) {
            var cvo = _a[_i];
            if (!cvo.isSatisfy()) {
                return false;
            }
        }
        return true;
    };
    SrvRankCVO.prototype.condStr = function () {
        var str = "";
        if (this.type == SrvRankType.LEVE_TYPE) {
            if (this.conList[1]) {
                str = this.conList[1].value + "z";
            }
            str += this.conList[0].value + "j";
        }
        else {
            str = "" + this.conList[0].value;
        }
        return str;
    };
    SrvRankCVO.parse = function (bytes) {
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        var info;
        for (var i = 0; i < tableCount; i++) {
            info = new SrvRankCVO();
            info.id = bytes.readShort();
            info.sort = bytes.readShort();
            info.type = bytes.readByte();
            info.rank = bytes.readByte();
            info.conList = ConditionVO.getVOList(bytes.readUTF());
            info.losse = bytes.readUTF();
            info.di_img = bytes.readUTF();
            var view_tap = bytes.readByte();
            if (!this._openViewTaps[info.type]) {
                this._openViewTaps[info.type] = view_tap;
            }
            this._data[info.id] = info;
        }
    };
    /**信息 */
    SrvRankCVO.cvo = function (id) {
        return this._data[id];
    };
    SrvRankCVO.cvos = function (type) {
        var arr = [];
        for (var key in this._data) {
            var cvo = this._data[key];
            if (cvo.type == type) {
                arr.push(cvo);
            }
        }
        return arr;
    };
    SrvRankCVO.setstatus = function (type, rank, statu) {
        for (var key in this._data) {
            var cvo = this._data[key];
            if (cvo.type == type && cvo.rank == rank) {
                if (statu == 1) {
                    cvo.setReward();
                }
            }
        }
    };
    /** 排行榜界面标签 */
    SrvRankCVO.rankPanelTap = function (type) {
        var i = this._openViewTaps[type];
        return i;
    };
    SrvRankCVO._data = {};
    SrvRankCVO._openViewTaps = {};
    return SrvRankCVO;
}());
//# sourceMappingURL=SrvRankCVO.js.map