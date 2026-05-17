/**
 * pzx
 * 2018.1.28
 *
 */
var LevItemCVO = /** @class */ (function () {
    function LevItemCVO() {
        this._num = 0;
        this._totalNum = 0;
    }
    LevItemCVO.prototype.setNum = function (n) {
        this._num = n;
    };
    LevItemCVO.prototype.setTotalNum = function (n) {
        this._totalNum = n;
    };
    Object.defineProperty(LevItemCVO.prototype, "num", {
        /** 已领取次数 */
        get: function () {
            return this._num;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LevItemCVO.prototype, "totalNum", {
        /** 剩余次数 */
        get: function () {
            return this._totalNum;
        },
        enumerable: true,
        configurable: true
    });
    LevItemCVO.prototype.desc = function () {
        var str;
        var list = this.lev_cond;
        var conent = "";
        var current = "";
        var info = Manager.model.self;
        var color = Color.RED_STR;
        if (list[1]) {
            conent = list[1].value + LangCVO.getContent("common14") + list[0].value + LangCVO.getContent("common15");
            current = info.attrInfo.zhuanshu + LangCVO.getContent("common14") + info.attrInfo.level + LangCVO.getContent("common15");
            if (list[1].value <= info.attrInfo.zhuanshu && list[0].value <= info.attrInfo.level) {
                color = Color.GREEN_STR;
            }
        }
        else {
            conent = list[0].value + LangCVO.getContent("common15");
            current = info.attrInfo.level + LangCVO.getContent("common15");
            if (list[0].value <= info.attrInfo.level) {
                color = Color.GREEN_STR;
            }
        }
        current = HtmlUtil.addColorTag("(" + current + "/" + conent + ")", color);
        conent = HtmlUtil.addColorTag(conent, Color.GREEN_STR);
        str = LangCVO.getContent("SysInvest3");
        str = StringUtils.setParam(str, conent, current);
        return str;
    };
    /** 是否可领 true 可领取*/
    LevItemCVO.prototype.checkReward = function () {
        if (this._totalNum <= 0 || this._num == 1)
            return false;
        var list = this.lev_cond;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var vo = list_1[_i];
            if (!vo.isSatisfy()) {
                return false;
            }
        }
        return true;
    };
    LevItemCVO.parse = function (bytes) {
        this._cvos = [];
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new LevItemCVO();
            item.id = bytes.readByte();
            item.lev_cond = ConditionVO.getVOList(bytes.readUTF());
            item.rewards = bytes.readUTF();
            this._cvos.push(item);
        }
    };
    LevItemCVO.getCvos = function () {
        return this._cvos;
    };
    LevItemCVO.getcvo = function (id) {
        for (var _i = 0, _a = this._cvos; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.id == id) {
                return item;
            }
        }
    };
    LevItemCVO.setCount = function (id, count, num) {
        if (count === void 0) { count = 0; }
        if (num === void 0) { num = 0; }
        var cvo;
        for (var _i = 0, _a = this._cvos; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.id == id) {
                cvo = item;
                break;
            }
        }
        if (cvo) {
            cvo.setNum(count);
            if (num < 0) {
                cvo.setTotalNum(cvo.totalNum - 1);
            }
            else {
                cvo.setTotalNum(num);
            }
        }
    };
    return LevItemCVO;
}());
//# sourceMappingURL=LevItemCVO.js.map