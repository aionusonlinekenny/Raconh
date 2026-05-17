var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 主线副本表
 * luzhihong
 * create 2017-12-2
 */
var MainCopyCVO = (function () {
    function MainCopyCVO() {
    }
    Object.defineProperty(MainCopyCVO.prototype, "monCVO", {
        get: function () {
            return MonsterCVO.getCVO(this.monID);
        },
        enumerable: true,
        configurable: true
    });
    /*解析表*/
    MainCopyCVO.parse = function (bytes) {
        MainCopyCVO._cvos = [];
        var cvo;
        var rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            cvo = new MainCopyCVO();
            cvo.cell = bytes.readShort();
            cvo.name = bytes.readUTF();
            var monStr = bytes.readUTF();
            cvo.sysID = bytes.readShort();
            var taskStr = bytes.readUTF();
            var reg = /{|}| /g;
            monStr = monStr.replace(reg, "");
            var arr = monStr.split(",");
            cvo.monID = parseInt(arr[0]);
            taskStr = taskStr.replace(reg, "");
            arr = taskStr.split(",");
            if (arr.length > 2)
                cvo.taskID = parseInt(arr[2]);
            MainCopyCVO._cvos[cvo.cell] = cvo;
        }
    };
    MainCopyCVO.getCVO = function (cell) {
        return MainCopyCVO._cvos[cell];
    };
    return MainCopyCVO;
}());
__reflect(MainCopyCVO.prototype, "MainCopyCVO");
//# sourceMappingURL=MainCopyCVO.js.map