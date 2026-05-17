var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 地图模板表
 */
var MapCVO = (function () {
    function MapCVO() {
    }
    MapCVO.prototype.parseOne = function (data) {
        this.id = data.readShort();
        this.name = data.readUTF();
        this.type = data.readByte();
        this.res = data.readInt();
        this.music = data.readInt();
        this.introID = data.readInt();
        this.reliveType = data.readByte();
        this.reliveTime = data.readShort();
        this.hideViews = data.readUTF();
        this.warmTips = data.readInt();
        this.expPerHour = data.readInt();
        this.silverPerhour = data.readInt();
        this.canClick = data.readBoolean();
        this.showPlayerNum = data.readByte();
        this.firstTarget = data.readByte();
        this.chapter = data.readShort();
        this.width = data.readInt();
        this.height = data.readInt();
        this.maxRow = Math.ceil(this.height / Manager.config.scale9H);
        this.maxCol = Math.ceil(this.width / Manager.config.scale9W);
    };
    Object.defineProperty(MapCVO.prototype, "hasIntro", {
        get: function () { return (this.introID > 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapCVO.prototype, "isMainMap", {
        get: function () { return (this.type == MapConst.TYPE_MAIN); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapCVO.prototype, "isFieldMap", {
        get: function () { return (this.type == MapConst.TYPE_FIELD); },
        enumerable: true,
        configurable: true
    });
    MapCVO.parse = function (bytes) {
        MapCVO._cvos = {};
        var tabCount = bytes.readByte();
        //地图场景
        var rowCount = bytes.readShort();
        for (var i = 0; i < rowCount; i++) {
            var item = new MapCVO();
            item.parseOne(bytes);
            MapCVO._cvos[item.id] = item;
        }
        //跳跃点
        rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            var jump = new JumpPointCVO();
            jump.parseOne(bytes);
            JumpPointCVO.idDic[jump.id] = jump;
            if (JumpPointCVO.mapDic[jump.mapResID] == null)
                JumpPointCVO.mapDic[jump.mapResID] = [];
            JumpPointCVO.mapDic[jump.mapResID].push(jump);
        }
        //复活
        this._configs = {};
        rowCount = bytes.readShort();
        for (var k = 0; k < rowCount; k++) {
            var type = bytes.readUTF();
            var value = bytes.readUTF();
            this._configs[type] = value;
        }
    };
    MapCVO.getCVO = function (id) {
        if (!MapCVO._cvos)
            return null;
        return MapCVO._cvos[id];
    };
    MapCVO.getCVOsByType = function (type) {
        var cvos = [];
        var cvo;
        for (var key in MapCVO._cvos) {
            cvo = MapCVO._cvos[key];
            if (cvo.type == type)
                cvos.push(cvo);
        }
        return cvos;
    };
    MapCVO.getConfigData = function (type) {
        return this._configs[type];
    };
    MapCVO.CONFIG_REVIVE_COST = "relive_cost";
    MapCVO.CONFIG_RANDOM_HOOK_POS = "random_hook_pos";
    MapCVO.CONFIG_DAILY_ICON = "daily_icon";
    return MapCVO;
}());
__reflect(MapCVO.prototype, "MapCVO");
//# sourceMappingURL=MapCVO.js.map