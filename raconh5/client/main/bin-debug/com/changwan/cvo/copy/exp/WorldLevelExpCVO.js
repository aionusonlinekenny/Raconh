var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 世界等级经验加成
 * pzx
 * create 2018.1.10
 */
var WorldLevelExpCVO = (function () {
    function WorldLevelExpCVO() {
    }
    /*解析表*/
    WorldLevelExpCVO.parse = function (bytes) {
        this._cvos = [];
        var cvo;
        var rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            cvo = new WorldLevelExpCVO();
            cvo.bottom = bytes.readShort();
            cvo.top = bytes.readShort();
            cvo.exp_ratio = bytes.readUTF();
            this._cvos.push(cvo);
        }
    };
    WorldLevelExpCVO.getExp = function (lv) {
        var ln = this._cvos.length;
        for (var i = 0; i < ln; i++) {
            var cvo = this._cvos[i];
            if (cvo.bottom < lv && cvo.top >= lv) {
                return cvo.exp_ratio;
            }
        }
        return this._cvos[ln - 1].exp_ratio;
    };
    return WorldLevelExpCVO;
}());
__reflect(WorldLevelExpCVO.prototype, "WorldLevelExpCVO");
//# sourceMappingURL=WorldLevelExpCVO.js.map