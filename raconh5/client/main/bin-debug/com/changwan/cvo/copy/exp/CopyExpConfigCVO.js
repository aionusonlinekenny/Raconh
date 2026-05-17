var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 经验副本配置表
 * luzhihong
 * create 2018.1.10
 */
var CopyExpConfigCVO = (function () {
    function CopyExpConfigCVO() {
    }
    /*解析经验副本难度表*/
    CopyExpConfigCVO.parseDifficult = function (bytes) {
        this.hardDesc = new Object();
        var rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            this.hardDesc[bytes.readByte()] = bytes.readUTF();
        }
    };
    /*解析消耗数据表*/
    CopyExpConfigCVO.parseCost = function (bytes) {
        var rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            var id = bytes.readByte();
            var vo = new GainLossVO(bytes.readUTF());
            if (id == 1)
                this.up_coin_need = vo;
            else if (id == 2)
                this.up_gold_need = vo;
            else if (id == 3)
                this.add_cound_need = vo;
            else if (id == 4)
                this.add_silver_cound_need = vo;
        }
    };
    /*解析其他数据表*/
    CopyExpConfigCVO.parseOthers = function (bytes) {
        var rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            var id = bytes.readByte();
            var value = bytes.readInt();
            if (id == 1)
                this.free_count = value;
            else if (id == 2)
                this.up_per_rate = value;
            else if (id == 3)
                this.up_gold_rate_max = value;
            else if (id == 5)
                this.up_coin_rate_max = value;
            else if (id == 9)
                this.silver_free_count = value;
        }
    };
    return CopyExpConfigCVO;
}());
__reflect(CopyExpConfigCVO.prototype, "CopyExpConfigCVO");
//# sourceMappingURL=CopyExpConfigCVO.js.map