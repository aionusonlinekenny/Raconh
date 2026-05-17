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
/**
 * 地图控制器
 */
var MapControl = /** @class */ (function (_super) {
    __extends(MapControl, _super);
    function MapControl() {
        var _this = _super.call(this) || this;
        _this._isShowCtrl = false;
        _this._elementLayer = Manager.layer.elementLayer;
        _this._layer = Manager.layer.mapLayer;
        _this._layer.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.__mapClick, _this);
        _this._model = Manager.model.getMap();
        _this._view = new MapView(_this, _this._model);
        _this._objects = {};
        var types = GameObjectType.types;
        var len = types.length;
        var i = 0;
        while (i < len) {
            _this._objects[types[i]] = [];
            i++;
        }
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, _this.handleResize, _this);
        return _this;
    }
    Object.defineProperty(MapControl.prototype, "view", {
        get: function () {
            return this._view;
        },
        enumerable: true,
        configurable: true
    });
    MapControl.prototype.handleResize = function (e) {
        if (Manager.model.self)
            this._view.setCenter(Manager.model.self.x, Manager.model.self.y);
    };
    /**
     * 初始化地图相关协议
     */
    MapControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.MAP_ENTER, MapEnterCMD);
        Manager.socket.addCMD(Protocol.MAP_LOAD_COMPLETE, MapLoadCompleteCMD);
        Manager.socket.addCMD(Protocol.MAP_PLAYER_ADD, MapPlayerAddCMD);
        Manager.socket.addCMD(Protocol.MAP_PLAYER_REMOVE, MapPlayerRemoveCMD);
        Manager.socket.addCMD(Protocol.MAP_PLAYER_WALK, MapPlayerWalkCMD);
        Manager.socket.addCMD(Protocol.MAP_MONSTER_ADD, MapMonsterAddCMD);
        Manager.socket.addCMD(Protocol.MAP_MONSTER_REMOVE, MapMonsterRemoveCMD);
        Manager.socket.addCMD(Protocol.MAP_MONSTER_DEAD, MapMonsterDeadCMD);
        Manager.socket.addCMD(Protocol.MAP_MONSTER_WALK, MapMonsterWalkCMD);
        Manager.socket.addCMD(Protocol.MAP_ELEMENT_ATTR_UPDATE_32, MapElementUpdateInt32CMD);
        Manager.socket.addCMD(Protocol.MAP_ELEMENT_ATTR_UPDATE_64, MapElementUpdateInt64CMD);
        Manager.socket.addCMD(Protocol.MAP_ELEMENT_ATTR_UPDATE_STR, MapElementUpdateStrCMD);
        Manager.socket.addCMD(Protocol.MAP_SELF_WALK_SYNC_POS, MapSelfWalkSyncPosCMD);
        Manager.socket.addCMD(Protocol.MAP_UPDATE_PLAYER_POS, MapUpdatePlayerPosCMD);
        Manager.socket.addCMD(Protocol.MAP_STATUS_INFO, MapStatusInfoCMD);
    };
    MapControl.prototype.cmdEnterMap = function (mapID) {
        var self = Manager.model.self;
        if (mapID != -1 && !self.can(CanType.CAN_CHANGE_MAP, true))
            return;
        if (self.attrInfo.isTraining)
            return;
        if (self.isingState(BodyStateManger.ISING_JUMP) || self.isingState(BodyStateManger.ISING_SPRINT)) {
            //如果正在跳跃或者冲刺，则WalkManager.mapFindInfo肯定是无用的，提前删除，避免切换场景后去寻路到WalkManager.mapFindInfo
            Manager.walk.cancelMapFind();
        }
        this.clearSelfTarget();
        var cmd = Manager.socket.getCMD(Protocol.MAP_ENTER);
        cmd.mapID = mapID;
        cmd.send();
    };
    MapControl.prototype.cmdPlayerWalk = function (path, walkType) {
        if (!Manager.model.getMap().mapDataLoadComplete)
            return;
        if (Manager.model.getMap().mapCVO.isFieldMap)
            return; //野外地图(单人)不广播路径，节省通讯流量
        var cmd = Manager.socket.getCMD(Protocol.MAP_PLAYER_WALK);
        cmd.path = path;
        cmd.walkType = walkType;
        cmd.send();
    };
    MapControl.prototype.cmdSelfWalkPosSync = function (x, y) {
        if (!Manager.model.getMap().mapDataLoadComplete)
            return;
        var cmd = Manager.socket.getCMD(Protocol.MAP_SELF_WALK_SYNC_POS);
        cmd.posX = x;
        cmd.posY = y;
        cmd.send();
    };
    /**
     * 进入地图数据处理
     */
    MapControl.prototype.mapEnterReceive = function (mapId, mapLongId, curIsReConnect) {
        if (curIsReConnect === void 0) { curIsReConnect = false; }
        if (curIsReConnect || (this._model.getId() != mapId) || (this._model.mapLongId != mapLongId)) {
            Manager.model.getGameobject().removeGameObjects();
            this.removeMonsterGameObjects();
            this._model.mapDataLoadComplete = false;
            Manager.model.self.enterMap();
            this._model.setId(mapId, mapLongId);
            var currentDataPath = Manager.path.getMapPath2(this._model.mapCVO.res, "path.txt", LoaderType.MAP_DATA);
            if (this._oldDataPath == null) {
                Manager.loader.load(currentDataPath, this.loadMapDataComplete, this, ResourceGCType.COMMON, ResPriorityType.LOAD_LEVEL6);
                this._oldDataPath = currentDataPath;
            }
            else {
                if (currentDataPath == this._oldDataPath) {
                    this.loadMapDataComplete(null);
                }
                else {
                    Manager.loader.remove(this._oldDataPath, this.loadMapDataComplete, this);
                    Manager.loader.load(currentDataPath, this.loadMapDataComplete, this, ResourceGCType.COMMON, ResPriorityType.LOAD_LEVEL6);
                    this._oldDataPath = currentDataPath;
                }
            }
        }
        Manager.sound.playBGM(Manager.path.getSoundPath(this._model.mapCVO.music));
        Manager.layer.mapLayer.touchEnabled = this._model.mapCVO.canClick;
        Manager.camera.updateMapSeeRect(this._model.mapCVO.width, this._model.mapCVO.height);
        Manager.control.getMap().view.setCenter(Manager.model.self.x, Manager.model.self.y);
        this.clearSelfTarget();
        if (this._model.mapCVO.introID == 1)
            Manager.view.show(68 /* SwitchSceneAni */); //mark
        if (mapId == MapConst.ID_ROOKIE_STORY)
            Manager.view.show(120 /* MapNameEffect */);
    };
    MapControl.prototype.loadMapDataComplete = function (loader) {
        this._model.mapDataLoadComplete = true;
        if (loader != null)
            this._model.setMapData(loader.data.mapData);
        if (Manager.model.self.selfPet != null) {
            var pos = GameUtil.getNearCanWalkRandomPos(this._model.enterMapX, this._model.enterMapY, 150, 0, 5);
            Manager.model.self.selfPet.updatePostion(pos.x, pos.y);
        }
        if (loader != null)
            this._view.reset(loader.data.bitmapData);
        Manager.model.self.updatePostion(this._model.enterMapX, this._model.enterMapY, true);
        Manager.model.getGameobject().createElement();
        Manager.model.getArena().checkByMapLoaded();
        Manager.model.getDevil().checkByMapLoaded();
        Manager.render.add(this.changeAutoHookByMap, this, 1500, 1, null, true); //500
        Manager.render.add(Manager.walk.gotoMapFind, Manager.walk, 2000, 1, null, true); //1000
        Manager.socket.sendOnlyProtocol(Protocol.MAP_LOAD_COMPLETE);
    };
    MapControl.prototype.changeAutoHookByMap = function () {
        if (this._model.mapCVO.type == MapConst.TYPE_CLUB_BF)
            return; //盟会战不需要延时设置自动挂机，延时设置自动挂机会中断那边自动寻路到准备区
        var isMainMap = this._model.mapCVO.isMainMap;
        if (isMainMap && Manager.model.getAuto().autoHook) {
            Manager.model.getAuto().autoHook = false;
        }
        else if (!isMainMap && !Manager.model.getAuto().autoHook && !this._model.isInRookieMap()) // && !this._model.mapCVO.hasIntro )
         {
            Manager.model.getAuto().autoHook = true;
        }
    };
    MapControl.prototype.testLayer = function () {
        if (this._model.mapData) {
            for (var row = 0; row < this._model.mapData.source.length; row++) {
                for (var col = 0; col < this._model.mapData.source[row].length; col++) {
                    if (this._model.mapData.source[row][col] == MapDataType.WALK) {
                        var sp = Manager.pool.create(egret.Shape);
                        sp.graphics.beginFill(0xff0000, 0.5);
                        sp.graphics.drawRect(0, 0, Manager.config.gridWH, Manager.config.gridWH);
                        sp.graphics.endFill();
                        sp.x = col * Manager.config.gridWH;
                        sp.y = row * Manager.config.gridWH;
                        Manager.layer.elementLayer.addChild(sp);
                    }
                }
            }
        }
    };
    MapControl.prototype.addGameObject = function (gameObject) {
        if (gameObject != null) {
            var gameObjectType = gameObject.info.getType();
            if (this._objects[gameObjectType].indexOf(gameObject) == -1) {
                this._objects[gameObjectType].push(gameObject);
                if (gameObjectType == GameObjectType.SCENE_EFF || gameObjectType == GameObjectType.JUMP_POINT || gameObjectType == GameObjectType.COLLECT) {
                    Manager.layer.elementLayer2.addChildAt(gameObject, 0);
                }
                else if (gameObjectType == GameObjectType.DROP) {
                    Manager.layer.elementLayer2.addChild(gameObject);
                }
                else {
                    Manager.layer.elementLayer.addChild(gameObject);
                }
            }
        }
    };
    MapControl.prototype.removeGameObject = function (gameObject) {
        if (gameObject != null) {
            var gameObjects = this._objects[gameObject.info.getType()];
            var index = gameObjects.indexOf(gameObject);
            if (index != -1) {
                gameObjects.splice(index, 1);
            }
            else {
                Trace.error(index, "视图移除找不到，需调试");
            }
            Manager.pool.push(gameObject);
        }
    };
    /**
     * 切地图清空地图上有延时动画的怪物
     */
    MapControl.prototype.removeMonsterGameObjects = function () {
        var types = GameObjectType.monsterTypes;
        var len = types.length;
        for (var m = 0; m < len; m++) {
            var objects = this._objects[types[m]];
            var len1 = objects.length - 1;
            for (var i = len1; i >= 0; i--) {
                Manager.pool.push(objects[i]);
                objects.splice(i, 1);
            }
        }
    };
    /**
     * 对地图上的元素排序
     */
    MapControl.prototype.startSort = function (gameObject) {
        if (!(gameObject).parent)
            return;
        if (!this._sortFlag) {
            this._sortFlag = true;
            egret.setTimeout(this.sortGameObject, this, 3000);
        }
    };
    MapControl.prototype.sortGameObject = function () {
        var that = this;
        that._sortFlag = false;
        var types = GameObjectType.needSortTypes;
        var sorts = [];
        var index = 0;
        var len = types.length;
        for (var m = 0; m < len; m++) {
            var objects = that._objects[types[m]];
            var len1 = objects.length;
            for (var i = 0; i < len1; i++) {
                sorts[index++] = objects[i];
            }
        }
        sorts.sort(that.sortFunction);
        len = sorts.length;
        var gameObject;
        for (var j = 0; j < len; j++) {
            gameObject = sorts[j];
            if (that._elementLayer.getChildIndex(gameObject) != -1 && j < that._elementLayer.numChildren)
                if (gameObject != that._elementLayer.getChildAt(j))
                    that._elementLayer.setChildIndex(gameObject, j);
        }
        sorts.length = 0;
    };
    MapControl.prototype.sortFunction = function (e1, e2) {
        if (e1.y > e2.y)
            return 1;
        else if (e1.y < e2.y)
            return -1;
        return 0;
    };
    MapControl.prototype.__mapClick = function (e) {
        if (!this._model.mapCVO.canClick)
            return;
        if (!this.checkCanClick())
            return;
        if (this._isShowCtrl) {
            this._isShowCtrl = false;
            return;
        }
        var mapClickAni = Manager.animation.createEffectAnimation("yl");
        mapClickAni.x = e.stageX - this._layer.x;
        mapClickAni.y = e.stageY - this._layer.y;
        Manager.layer.addChildToNodeByType(mapClickAni, mapClickAni.url, 2);
        Manager.walk.moveTo(new egret.Point(e.stageX - this._layer.x, e.stageY - this._layer.y));
        GameDispatcher.getInstance().dispatchEvent(new GlobalEvent(GlobalEvent.SCENE_CLICK));
    };
    MapControl.prototype.checkCanClick = function () {
        var ret = true;
        var info = DailyActivityCVO.getCVO(ActIconID.TRAINING);
        if (info && info.status == DailyActivityCVO.STATE_IN && (Manager.model.getTraining().trainingType != 0 || Manager.model.getTraining().isToTraining)) {
            FloatTips.addTips(LangCVO.getContent("training7"), Color.RED);
            ret = false;
        }
        if (Manager.model.getClubBF().cd > 0) {
            FloatTips.addTips(LangCVO.getContent("clubBF43"), Color.RED); //挑战cd中，不能走动！
            ret = false;
        }
        if (Manager.model.self.isingState(BodyStateManger.ISING_COLLECT))
            ret = false;
        return ret;
    };
    MapControl.prototype.getAroundIndex = function (point, rlen, clen, i) {
        if (i === void 0) { i = 1; }
        var startRow = Math.max(point.y - i, 0);
        var endRow = Math.min(point.y + i, rlen - 1);
        var startCol = Math.max(point.x - i, 0);
        var endCol = Math.min(point.x + i, clen - 1);
        var result;
        var j;
        for (j = startCol; j <= endCol; j++) {
            if (!this._model.mapData.isEmpty(startRow, j)) {
                return result = new egret.Point(j, startRow);
            }
        }
        for (j = startCol; j <= endCol; j++) {
            if (!this._model.mapData.isEmpty(endRow, j)) {
                return result = new egret.Point(j, endRow);
            }
        }
        for (j = startRow; j <= endRow; j++) {
            if (!this._model.mapData.isEmpty(j, startCol)) {
                return result = new egret.Point(startCol, j);
            }
        }
        for (j = startRow; j <= endRow; j++) {
            if (!this._model.mapData.isEmpty(j, endCol)) {
                return result = new egret.Point(endCol, j);
            }
        }
        if (result == null)
            return this.getAroundIndex(point, rlen, clen, i + 1);
        return result;
    };
    MapControl.prototype.posToIndex = function (pos) {
        pos.x = Math.floor(pos.x / Manager.config.gridWH);
        pos.y = Math.floor(pos.y / Manager.config.gridWH);
        return pos;
    };
    MapControl.prototype.__mapTouchBegin = function (e) {
        this._beginClickPoint = new egret.Point(e.stageX, e.stageY);
        if (!this._ctrlView)
            this._ctrlView = Manager.pool.create(CtrlView);
        this._ctrlView.x = e.stageX - Math.ceil(this._ctrlView.width / 2);
        this._ctrlView.y = e.stageY - Math.ceil(this._ctrlView.height / 2);
        this._layer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.__mapTouchMove, this);
    };
    MapControl.prototype.__mapTouchMove = function (e) {
        if (Math.sqrt(Math.pow((this._beginClickPoint.x - e.stageX), 2) + Math.pow((this._beginClickPoint.y - e.stageY), 2)) < 10)
            return;
        if (this._ctrlView) {
            this._isShowCtrl = true;
            if (this._ctrlView.parent == null)
                Manager.layer.tipsLayer.addChild(this._ctrlView);
            this._ctrlView.onTouch(e);
        }
    };
    MapControl.prototype.__mapTouchEnd = function (e) {
        Manager.model.self.stopWalk();
        this._layer.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.__mapTouchMove, this);
        if (this._ctrlView) {
            this._ctrlView.resetLocal();
            Manager.pool.push(this._ctrlView);
            this._ctrlView = null;
        }
    };
    MapControl.prototype.clearSelfTarget = function () {
        Manager.model.getAuto().hookPos = null;
        var self = Manager.model.self;
        if (self != null) {
            self.updateTarget(null);
            if (self.selfPet != null) {
                self.selfPet.updateTarget(null);
            }
        }
    };
    return MapControl;
}(BaseControl));
//# sourceMappingURL=MapControl.js.map