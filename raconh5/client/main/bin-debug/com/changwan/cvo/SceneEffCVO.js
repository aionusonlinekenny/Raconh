var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 场景特效表
 * liangyan
 * create 2018-01-02
*/
var SceneEffCVO = (function () {
    function SceneEffCVO() {
        /**触发半径 */
        this.triggerRadius = 80;
    }
    SceneEffCVO.prototype.parseOne = function (data) {
        this.id = data.readInt();
        this.resID = data.readInt();
        this.name = data.readUTF();
        this.type = data.readByte();
        this.mapResID = data.readInt();
        this.position = new egret.Point(data.readShort(), data.readShort());
        this.flipH = data.readByte() == 1;
        this.width = data.readShort();
        this.height = data.readShort();
        this.offsetX = data.readShort();
        this.offsetY = data.readShort();
        this.scale = data.readByte();
        this.script = data.readUTF();
    };
    Object.defineProperty(SceneEffCVO.prototype, "isTrainingEff", {
        get: function () { return this.type == 2; },
        enumerable: true,
        configurable: true
    });
    SceneEffCVO.parse = function (bytes) {
        SceneEffCVO._cvos = {};
        var tableCount = bytes.readByte();
        var count = bytes.readShort();
        var cvo;
        for (var i = 0; i < count; i++) {
            cvo = new SceneEffCVO();
            cvo.parseOne(bytes);
            SceneEffCVO._cvos[cvo.id] = cvo;
        }
    };
    SceneEffCVO.getCVO = function (id) {
        return SceneEffCVO._cvos[id];
    };
    SceneEffCVO.getCVOsByMapID = function (mapResID) {
        var result = [];
        var cvo;
        for (var key in SceneEffCVO._cvos) {
            cvo = SceneEffCVO._cvos[key];
            if (cvo.mapResID == mapResID)
                result.push(cvo);
        }
        return result;
    };
    SceneEffCVO.TYPE_COMMON = 0;
    SceneEffCVO.TYPE_TOWER = 1;
    SceneEffCVO.TYPE_CHUAN_GONG = 2;
    SceneEffCVO.TYPE_EXP_STATUE = 3;
    SceneEffCVO.TYPE_BRIDGE = 4;
    SceneEffCVO.TYPE_DRAGON = 5;
    return SceneEffCVO;
}());
__reflect(SceneEffCVO.prototype, "SceneEffCVO");
//# sourceMappingURL=SceneEffCVO.js.map