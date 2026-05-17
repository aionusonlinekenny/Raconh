/**
 *author Anydo
 *create 2017-11-24
 *description
*/
var BuffCVO = /** @class */ (function () {
    function BuffCVO() {
    }
    Object.defineProperty(BuffCVO.prototype, "attrVo", {
        get: function () {
            if (this._attrVo == null)
                this._attrVo = Manager.pool.create(AttrVO, this._attrStr);
            return this._attrVo;
        },
        enumerable: true,
        configurable: true
    });
    BuffCVO.prototype.parseOne = function (data) {
        this.groupID = data.readShort();
        this.name = data.readUTF();
        this.level = data.readByte();
        this.statusType = data.readByte();
        this.color = data.readByte();
        this.colorPriority = data.readByte();
        this.aniId = data.readShort();
        this.aniPriority = data.readByte();
        this.placeFlag = data.readByte();
        this._attrStr = data.readUTF();
        // this.attrVo = Manager.pool.create(AttrVO, data.readUTF());
        this.cvoscript = data.readUTF();
    };
    BuffCVO.prototype.analyzeScript = function () {
        if (this._scriptDone)
            return;
        this._scriptDone = true;
        var script = new ScriptBaseCVO(this.cvoscript);
        this._changeStyleId = script.getTypeValue(BuffCVO.BUFF_CHANGE_STYLE);
    };
    Object.defineProperty(BuffCVO.prototype, "changeStyleId", {
        get: function () {
            if (!this._scriptDone)
                this.analyzeScript();
            return this._changeStyleId;
        },
        enumerable: true,
        configurable: true
    });
    BuffCVO.parse = function (bytes) {
        BuffCVO._cvos = {};
        var tableCount = bytes.readByte();
        var baseCount = bytes.readShort();
        var cvo;
        for (var i = 0; i < baseCount; i++) {
            cvo = new BuffCVO();
            cvo.parseOne(bytes);
            if (!BuffCVO._cvos[cvo.groupID])
                BuffCVO._cvos[cvo.groupID] = [];
            BuffCVO._cvos[cvo.groupID].push(cvo);
        }
    };
    BuffCVO.getCVO = function (groupID, level) {
        var arr = this._cvos[groupID];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].level == level)
                return arr[i];
        }
        return null;
    };
    BuffCVO.BUFF_CHANGE_STYLE = 1; //buff变身
    return BuffCVO;
}());
//# sourceMappingURL=BuffCVO.js.map