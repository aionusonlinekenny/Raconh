var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2017-12-6
 *description
*/
var JumpPointCVO = (function () {
    function JumpPointCVO() {
    }
    Object.defineProperty(JumpPointCVO.prototype, "hasShow", {
        get: function () { return (this.resID != 0); },
        enumerable: true,
        configurable: true
    });
    JumpPointCVO.prototype.canTrigger = function (mapResID, xx, yy) {
        if (mapResID != this.mapResID)
            return false;
        var xdiff = this.posX - xx; // 计算两个点的横坐标之差
        var ydiff = this.posY - yy; // 计算两个点的纵坐标之差
        var dis = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
        return (dis <= this.triggerRadius);
    };
    JumpPointCVO.prototype.parseOne = function (data) {
        this.id = data.readShort();
        this.mapResID = data.readShort();
        this.posX = data.readShort();
        this.posY = data.readShort();
        var targetStr = data.readUTF();
        this.parseTargets(targetStr);
        this.actionType = data.readByte();
        this.triggerRadius = data.readShort();
        this.resID = data.readShort();
        this.parseScript(data.readUTF());
        this.name = data.readUTF();
    };
    JumpPointCVO.prototype.parseTargets = function (str) {
        this.targets = [];
        if (str == "")
            return;
        var arr = str.split("|");
        var brr;
        for (var i = 0; i < arr.length; i++) {
            brr = arr[i].split(",");
            this.targets.push(new egret.Point(parseInt(brr[0]), parseInt(brr[1])));
        }
    };
    JumpPointCVO.prototype.parseScript = function (str) {
        this.script = "";
        this.scriptType = 0;
        if (cw.StringUtil.isEmptyStr(str))
            return;
        var arr = str.split("#");
        if (!arr || arr.length <= 0)
            return;
        this.scriptType = Number(arr[0]);
        switch (this.scriptType) {
            case RookieConst.SLIDE:
            case RookieConst.KITE:
            case RookieConst.WATER:
                this.script = arr[1];
                break;
            default:
                break;
        }
    };
    JumpPointCVO.getCVOsByMapID = function (mapID) {
        return this.mapDic[mapID];
    };
    JumpPointCVO.getCVO = function (id) {
        return this.idDic[id];
    };
    JumpPointCVO.idDic = {};
    JumpPointCVO.mapDic = {};
    return JumpPointCVO;
}());
__reflect(JumpPointCVO.prototype, "JumpPointCVO");
//# sourceMappingURL=JumpPointCVO.js.map