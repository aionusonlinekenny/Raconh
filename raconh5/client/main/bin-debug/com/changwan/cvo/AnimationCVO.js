var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AnimationCVO = (function () {
    function AnimationCVO() {
    }
    AnimationCVO.parse = function (bytes) {
        AnimationCVO._cvos = {};
        var tableCount = bytes.readByte();
        for (var i = 0; i < tableCount; i++) {
            var count = bytes.readShort();
            for (var j = 0; j < count; j++) {
                var item = new AnimationCVO();
                item.id = bytes.readUTF();
                item.frames = ArrayUtil.parseStringToArray(bytes.readUTF());
                item.totalFrame = bytes.readShort();
                item.wrapMode = bytes.readByte();
                item.offsetX = bytes.readShort();
                item.offsetY = bytes.readShort();
                item.scale = bytes.readShort() / 100;
                item.isInFeet = bytes.readBoolean();
                item.stayMemory = bytes.readByte();
                AnimationCVO._cvos[item.id] = item;
            }
        }
    };
    AnimationCVO.getCVO = function (id) {
        if (AnimationCVO._cvos[id] == null) {
            FloatTips.addTips("重要报错：特效表没有 " + id + " 的对应数据！", Color.RED);
            var one = new AnimationCVO();
            one.id = id;
            one.frames = [];
            one.totalFrame = 0;
            one.wrapMode = 1;
            one.offsetX = 0;
            one.offsetY = 0;
            one.scale = 1;
            one.isInFeet = false;
            one.stayMemory = 0;
            return one;
        }
        return AnimationCVO._cvos[id];
    };
    return AnimationCVO;
}());
__reflect(AnimationCVO.prototype, "AnimationCVO");
//# sourceMappingURL=AnimationCVO.js.map