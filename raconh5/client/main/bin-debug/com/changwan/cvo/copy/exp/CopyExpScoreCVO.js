var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 经验副本评分表
 * luzhihong
 * create 2018.1.10
 */
var CopyExpScoreCVO = (function () {
    function CopyExpScoreCVO() {
    }
    /*解析表*/
    CopyExpScoreCVO.parseCVOs = function (bytes) {
        var pageCount = bytes.readByte();
        CopyExpScoreCVO.parse(bytes);
        CopyExpConfigCVO.parseDifficult(bytes);
        CopyExpConfigCVO.parseCost(bytes);
        CopyExpConfigCVO.parseOthers(bytes);
        WorldLevelExpCVO.parse(bytes);
    };
    /*解析表*/
    CopyExpScoreCVO.parse = function (bytes) {
        CopyExpScoreCVO._cvos = [];
        var cvo;
        var rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            cvo = new CopyExpScoreCVO();
            cvo.id = bytes.readByte();
            cvo.score = bytes.readUTF();
            cvo.kill_num = bytes.readShort();
            CopyExpScoreCVO._cvos.push(cvo);
        }
    };
    CopyExpScoreCVO.getCVO = function (id) {
        for (var i = this._cvos.length - 1; i >= 0; i--) {
            if (this._cvos[i].id == id)
                return this._cvos[i];
        }
        return null;
    };
    CopyExpScoreCVO.getCVOByKillNum = function (num) {
        for (var i = this._cvos.length - 1; i >= 0; i--) {
            if (this._cvos[i].kill_num <= num)
                return this._cvos[i];
        }
        return null;
    };
    return CopyExpScoreCVO;
}());
__reflect(CopyExpScoreCVO.prototype, "CopyExpScoreCVO");
//# sourceMappingURL=CopyExpScoreCVO.js.map