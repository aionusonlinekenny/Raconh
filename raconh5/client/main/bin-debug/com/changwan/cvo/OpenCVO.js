var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 功能开放表
 * liangyan
 * create 2017-12-25
*/
var OpenCVO = (function () {
    function OpenCVO() {
    }
    OpenCVO.prototype.parseOne = function (data) {
        this.id = data.readShort();
        this.name = data.readUTF();
        this.triggerType = data.readByte();
        this.triggerValue = data.readShort();
        this.openEff = data.readByte() == 1;
        this.position = data.readByte();
        this.tips = data.readUTF();
    };
    OpenCVO.parse = function (bytes) {
        OpenCVO._cvos = {};
        var tableCount = bytes.readByte();
        var baseCount = bytes.readShort();
        var cvo;
        for (var i = 0; i < baseCount; i++) {
            cvo = new OpenCVO();
            cvo.parseOne(bytes);
            OpenCVO._cvos[cvo.id] = cvo;
        }
    };
    OpenCVO.getCVO = function (id) {
        return OpenCVO._cvos[id];
    };
    /**
     * 功能是否开放
     * @param id
     * @param needTips 是否需要提示
     */
    OpenCVO.isOpen = function (id, needTips) {
        if (needTips === void 0) { needTips = false; }
        var cvo = OpenCVO._cvos[id];
        if (!cvo)
            return true;
        if (!cvo.isSatisfy) {
            if (needTips)
                FloatTips.addTips(cvo.tips, Color.RED);
            return false;
        }
        return true;
    };
    Object.defineProperty(OpenCVO.prototype, "isSatisfy", {
        get: function () {
            var result = false;
            switch (this.triggerType) {
                case OpenConst.TRIGGER_LVL:
                    var level = Manager.model.self.attrInfo.level;
                    result = level >= this.triggerValue;
                    break;
                case OpenConst.TRIGGER_TASK:
                    result = Manager.model.getTask().getTaskIdComplete(this.triggerValue);
                    break;
                case OpenConst.TRIGGER_CLIENT:
                    break;
                case OpenConst.TRIGGER_REIN:
                    var num = Manager.model.self.attrInfo.zhuanshu;
                    result = num >= this.triggerValue;
                    break;
                case OpenConst.TRIGGRE_RELICSTUFF:
                    var cvo = RelicStuffCVO.cvo(this.triggerValue);
                    result = cvo.isActivity();
                    break;
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    return OpenCVO;
}());
__reflect(OpenCVO.prototype, "OpenCVO");
//# sourceMappingURL=OpenCVO.js.map