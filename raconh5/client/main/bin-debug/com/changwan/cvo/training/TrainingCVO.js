var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TrainingCVO = (function () {
    function TrainingCVO() {
    }
    TrainingCVO.parse = function (bytes) {
        var tableCount = bytes.readByte();
        for (var i = 0; i < tableCount; i++) {
            var count = bytes.readShort();
            if (i == 0) {
                for (var j = 0; j < count; j++) {
                    var info = new TrainingCVO();
                    info.id = bytes.readByte();
                    info.name = bytes.readUTF();
                    info.loss = new GainLossVO(bytes.readUTF());
                    info.gain = new GainLossVO(bytes.readUTF());
                    info.item = new GainLossVO(bytes.readUTF());
                    info.expRatio = bytes.readShort();
                    info.fixPos = bytes.readByte();
                    this._cvos[info.id] = info;
                }
            }
            if (i == 1) {
                for (var j = 0; j < count; j++) {
                    var info = new TrainingPosCVO();
                    info.id = bytes.readShort();
                    info.type = bytes.readByte();
                    var s = bytes.readUTF();
                    s = s.replace("{", "").replace("}", "");
                    var arr = s.split(",");
                    info.pos = new egret.Point(Number(arr[0]), Number(arr[1]));
                    info.direction = bytes.readUTF();
                    this._posCvos[info.id] = info;
                }
            }
            if (i == 2) {
                for (var j = 0; j < count; j++) {
                    var info = new TrainingExpCVO();
                    info.id = bytes.readByte();
                    info.minLevel = bytes.readShort();
                    info.maxLevel = bytes.readShort();
                    info.exp = bytes.readInt();
                    this._expCvos[info.id] = info;
                }
            }
            if (i == 3) {
                var id = bytes.readByte();
                var str = bytes.readUTF();
                str = str.replace("{", "").replace("}", "");
                var arr = str.split(",");
                this.regionInfo = new TrainingInfo();
                this.regionInfo.trainingPoint = new egret.Point(Number(arr[0]), Number(arr[1]));
                this.regionInfo.trainingRadius = Number(arr[2]);
            }
        }
    };
    TrainingCVO.getInfo = function (id) {
        return this._cvos[id];
    };
    TrainingCVO.getPosInfo = function (id) {
        return this._posCvos[id];
    };
    TrainingCVO.getExpInfo = function (level) {
        for (var info in this._expCvos) {
            if (this._expCvos[info]) {
                if (level >= this._expCvos[info].minLevel && level < this._expCvos[info].maxLevel) {
                    return this._expCvos[info];
                }
            }
        }
        return null;
    };
    TrainingCVO._cvos = {};
    TrainingCVO._posCvos = {};
    TrainingCVO._expCvos = {};
    return TrainingCVO;
}());
__reflect(TrainingCVO.prototype, "TrainingCVO");
var TrainingPosCVO = (function () {
    function TrainingPosCVO() {
    }
    return TrainingPosCVO;
}());
__reflect(TrainingPosCVO.prototype, "TrainingPosCVO");
var TrainingExpCVO = (function () {
    function TrainingExpCVO() {
    }
    return TrainingExpCVO;
}());
__reflect(TrainingExpCVO.prototype, "TrainingExpCVO");
var TrainingInfo = (function () {
    function TrainingInfo() {
    }
    return TrainingInfo;
}());
__reflect(TrainingInfo.prototype, "TrainingInfo");
//# sourceMappingURL=TrainingCVO.js.map