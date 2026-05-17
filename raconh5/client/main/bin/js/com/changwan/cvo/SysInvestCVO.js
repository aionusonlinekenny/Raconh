/**
 * pzx
 * 投资
 * 18.1.13
 */
var SysInvestCVO = /** @class */ (function () {
    function SysInvestCVO() {
        this._state = 0;
    }
    SysInvestCVO.prototype.setState = function (value) {
        this._state = value;
    };
    Object.defineProperty(SysInvestCVO.prototype, "state", {
        /** 是否领取 1已领 */
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    /** 是否可领 true 可领取*/
    SysInvestCVO.prototype.isReward = function () {
        var type = "" + this.price;
        if (type == SysInvestType.SYSINVEST_MONTH_TYPE) {
            var day = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
            if (day >= this.login_day) {
                return true;
            }
            return false;
        }
        else {
            var list = ConditionVO.getVOList(this.lev_earn);
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var vo = list_1[_i];
                if (!vo.isSatisfy()) {
                    return false;
                }
            }
            return true;
        }
    };
    Object.defineProperty(SysInvestCVO.prototype, "desc", {
        get: function () {
            var str;
            var type = "" + this.price;
            if (type == SysInvestType.SYSINVEST_MONTH_TYPE) {
                var day = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
                var conent = "";
                if (day < this.login_day) {
                    conent = HtmlUtil.addColorTag("(" + day + "/" + this.login_day + ")", Color.RED_STR);
                }
                else {
                    conent = HtmlUtil.addColorTag("(" + day + "/" + this.login_day + ")", Color.GREEN_STR);
                }
                str = LangCVO.getContent("SysInvest2");
                str = StringUtils.setParam(str, this.login_day, conent);
            }
            else {
                var list = ConditionVO.getVOList(this.lev_earn);
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
                str = LangCVO.getContent("SysInvest3");
                str = StringUtils.setParam(str, conent, current);
            }
            return str;
        },
        enumerable: true,
        configurable: true
    });
    SysInvestCVO.parse = function (bytes) {
        this._cvos = {};
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new SysInvestCVO();
            item.id = bytes.readByte();
            item.name = bytes.readUTF();
            item.price = bytes.readShort();
            item.reward = bytes.readUTF();
            item.login_day = bytes.readByte();
            item.lev_earn = bytes.readUTF();
            item.sort = bytes.readByte();
            this._cvos[item.id] = item;
        }
    };
    SysInvestCVO.getCvos = function (price) {
        var arr = [];
        for (var key in this._cvos) {
            if (this._cvos[key].price == price) {
                arr.push(this._cvos[key]);
            }
        }
        return arr;
    };
    SysInvestCVO.setState = function (id, state) {
        var cvo = this._cvos[id];
        cvo.setState(state);
    };
    SysInvestCVO.getName = function (price) {
        var cvo;
        if (price == SysInvestType.SYSINVEST_MONTH_TYPE) {
            //取一个卡名，所以写死1,取一个cvo
            cvo = this._cvos[1];
            return cvo.name;
        }
        else {
            //取一个卡名，所以写死20,取一个cvo
            cvo = this._cvos[20];
            return cvo.name;
        }
    };
    return SysInvestCVO;
}());
//# sourceMappingURL=SysInvestCVO.js.map