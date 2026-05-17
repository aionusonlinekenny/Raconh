var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NpcCVO = /** @class */ (function (_super) {
    __extends(NpcCVO, _super);
    function NpcCVO() {
        return _super.call(this) || this;
    }
    NpcCVO.parse = function (bytes) {
        NpcCVO._cvos = {};
        var tableCount = bytes.readByte();
        for (var i = 0; i < tableCount; i++) {
            var count = bytes.readShort();
            for (var j = 0; j < count; j++) {
                var item = new NpcCVO();
                item.id = bytes.readInt();
                item.url = bytes.readInt();
                item.name = bytes.readUTF();
                item.link = bytes.readUTF();
                item.mapID = bytes.readInt();
                item.position = new egret.Point(bytes.readShort(), bytes.readShort());
                item.flipH = (bytes.readByte() == 1);
                item.width = bytes.readShort();
                item.height = bytes.readShort();
                item.offsetX = bytes.readShort();
                item.offsetY = bytes.readShort();
                item.title = bytes.readInt();
                item.iconRes = bytes.readUTF();
                item.sound = bytes.readInt();
                NpcCVO._cvos[item.id] = item;
            }
        }
    };
    NpcCVO.getCVO = function (id) {
        if (!NpcCVO._cvos)
            return null;
        return NpcCVO._cvos[id];
    };
    NpcCVO.getCVOsAtMap = function (mapID) {
        var result = [];
        var cvo;
        for (var key in NpcCVO._cvos) {
            cvo = NpcCVO._cvos[key];
            if (cvo.mapID == mapID)
                result.push(cvo);
        }
        return result;
    };
    return NpcCVO;
}(BaseFindCVO));
//# sourceMappingURL=NpcCVO.js.map