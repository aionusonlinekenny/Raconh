/**
 *author Anydo
 *create 2017-12-1
 *description
*/
var WalkManager = /** @class */ (function () {
    function WalkManager() {
    }
    WalkManager.prototype.moveTo = function (pos, complete, completeTarget, sceneID) {
        if (complete === void 0) { complete = null; }
        if (completeTarget === void 0) { completeTarget = null; }
        if (sceneID === void 0) { sceneID = -1; }
        if (!Manager.model.self.can(CanType.CAN_WALK, false))
            return;
        if (sceneID != -1 && sceneID != Manager.model.getMap().getId()) {
            this.findInfo = Manager.pool.create(MapFindInfo, pos, null);
            Manager.control.getMap().cmdEnterMap(sceneID);
        }
        else {
            this.move(pos, 0, complete, completeTarget);
        }
    };
    WalkManager.prototype.moveToNPC = function (cvo) {
        if (!Manager.model.self.can(CanType.CAN_WALK, false))
            return;
        var info = Manager.model.getGameobject().getGameObject(cvo.id);
        var self = Manager.model.self;
        this._tempNpcId = cvo.id;
        console.log("a", this._tempNpcId);
        if (egret.Point.distance(cvo.position, new egret.Point(self.x, self.y)) <= WalkManager.NPC_TALK_MAX_DISTANCE && cvo.mapID == Manager.model.getMap().getId()) {
            this.moveToNpcComplete();
        }
        else {
            if (cvo.mapID != Manager.model.getMap().getId()) {
                this.findInfo = Manager.pool.create(MapFindInfo, null, cvo);
                Manager.control.getMap().cmdEnterMap(cvo.mapID);
            }
            else {
                this.findInfo = Manager.pool.create(MapFindInfo, null, cvo);
                this.move(cvo.position, WalkManager.NPC_TALK_MAX_DISTANCE, this.moveToNpcComplete, this);
            }
        }
        // function complete(cvo:NpcCVO):void
        // {
        //     if(Manager.walk.findInfo && (Manager.walk.findInfo.cvo instanceof NpcCVO)) Manager.walk.cancelMapFind();
        //     let dir:string = Direction.getDir(Manager.model.self.x, Manager.model.self.y, cvo.position.x, cvo.position.y);
        //     Manager.model.self.setDirection(dir);
        //     Manager.link.linkStr(cvo.link);
        // }
    };
    WalkManager.prototype.moveToNpcComplete = function () {
        if (Manager.walk.findInfo && (Manager.walk.findInfo.cvo instanceof NpcCVO))
            Manager.walk.cancelMapFind();
        console.log("b", this._tempNpcId);
        var cvo = NpcCVO.getCVO(this._tempNpcId);
        var dir = Direction.getDir(Manager.model.self.x, Manager.model.self.y, cvo.position.x, cvo.position.y);
        Manager.model.self.setDirection(dir);
        Manager.link.linkStr(cvo.link);
    };
    WalkManager.prototype.move = function (pos, processDis, complete, completeTarget) {
        if (processDis === void 0) { processDis = 0; }
        if (complete === void 0) { complete = null; }
        if (completeTarget === void 0) { completeTarget = null; }
        var self = Manager.model.self;
        if (self.x == pos.x && self.y == pos.y && complete != null)
            complete.call(completeTarget);
        else {
            var path = Manager.model.getMap().findPath.findpath(new egret.Point(self.x, self.y), pos);
            if (processDis > 0)
                path = PathUtils.processPath(path, processDis);
            if (path != null && path.length > 0) {
                self.walk(path, WalkType.WALK, complete, completeTarget);
            }
        }
    };
    /** 跳跃、跨地图后继续寻路 */
    WalkManager.prototype.gotoMapFind = function () {
        if (this.findInfo != null) {
            if (this.findInfo.cvo instanceof NpcCVO) {
                var npc = this.findInfo.cvo;
                this.cancelMapFind();
                this.moveToNPC(npc);
            }
            else if (this.findInfo.pos != null) {
                var pos = this.findInfo.pos;
                this.cancelMapFind();
                this.moveTo(pos);
            }
        }
    };
    /**
     * 取消MapFindInfo数据
     */
    WalkManager.prototype.cancelMapFind = function () {
        if (this.findInfo != null) {
            Manager.pool.push(this.findInfo);
            this.findInfo = null;
        }
    };
    /** 与NPC对话的最大距离 */
    WalkManager.NPC_TALK_MAX_DISTANCE = 150;
    return WalkManager;
}());
//# sourceMappingURL=WalkManager.js.map