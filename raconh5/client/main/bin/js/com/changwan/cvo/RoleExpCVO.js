var RoleExpCVO = /** @class */ (function () {
    function RoleExpCVO() {
    }
    RoleExpCVO.parse = function (bytes) {
        RoleExpCVO._cvos = {};
        var tableCount = bytes.readByte();
        for (var i = 0; i < tableCount; i++) {
            var count = bytes.readShort();
            for (var j = 0; j < count; j++) {
                var item = new RoleExpCVO();
                item.level = bytes.readShort();
                item.exp = (bytes.readUnsignedInt() << 32) | bytes.readUnsignedInt();
                item.totalExp = (bytes.readUnsignedInt() << 32) | bytes.readUnsignedInt();
                RoleExpCVO._cvos[item.level] = item;
            }
        }
    };
    RoleExpCVO.getCVO = function (level) {
        if (!RoleExpCVO._cvos)
            return null;
        return RoleExpCVO._cvos[level];
    };
    return RoleExpCVO;
}());
//# sourceMappingURL=RoleExpCVO.js.map