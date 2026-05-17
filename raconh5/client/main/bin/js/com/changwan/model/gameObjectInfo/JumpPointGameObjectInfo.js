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
 *author Anydo
 *create 2017-12-6
 *description
*/
var JumpPointGameObjectInfo = /** @class */ (function (_super) {
    __extends(JumpPointGameObjectInfo, _super);
    function JumpPointGameObjectInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(JumpPointGameObjectInfo.prototype, "cvo", {
        get: function () { return this._cvo; },
        enumerable: true,
        configurable: true
    });
    JumpPointGameObjectInfo.prototype.reuse = function (cvoID, cvo) {
        this._cvo = cvo;
        _super.prototype.reuse.call(this, cvoID);
    };
    JumpPointGameObjectInfo.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._cvo = null;
    };
    // protected addEvent():void
    // {
    //     if(this._cvo.mapResID != Manager.model.getMap().mapCVO.res) return;
    //     Manager.model.self.addEventListener(GameObjectEvent.GO_POSITION, this.__updateLocation, this);
    // }
    // protected removeEvent():void
    // {
    //     Manager.model.self.removeEventListener(GameObjectEvent.GO_POSITION, this.__updateLocation, this);
    // }
    // private __updateLocation(e:GameObjectEvent):void
    // {
    //     let self:SelfGameObjectInfo = Manager.model.self;
    //     if(self.isingState(BodyStateManger.ISING_JUMP)) return;
    //     if(self.isingState(BodyStateManger.ISING_SPRINT)) return;
    //     if(self.isingState(BodyStateManger.ISING_FLY)) return;
    //     if(self.isingState(BodyStateManger.ISING_SLIDE)) return;
    //     if(self.isingState(BodyStateManger.ISING_KITE)) return;
    //     if(self.isingState(BodyStateManger.ISING_WATER)) return;
    //     if(this._cvo.canTrigger(Manager.model.getMap().mapCVO.res, self.x, self.y))
    //     {
    //         if(!Manager.model.getAuto().autoHook && Manager.walk.findInfo == null && self && self.view)
    //         {
    //             let targetPos:egret.Point = (self.view as SelfGameObject).getWalkTarget();
    //             if(targetPos) Manager.walk.findInfo = Manager.pool.create(MapFindInfo, targetPos, null);
    //         }
    //         if(this._cvo.scriptType > 0) Manager.jump.curInfo = this;
    //         else Manager.jump.curInfo = null;
    //         Manager.jump.jump(this._cvo.targets);
    //     }
    // }
    JumpPointGameObjectInfo.prototype.playRookieAction = function (type) {
        if (!this._cvo || this._cvo.scriptType == 0)
            return;
        if (this._cvo.scriptType == RookieConst.APPLY_MONSTER) {
            Manager.model.self.cancelAction();
            Manager.control.getTask().rookieAsk();
            return;
        }
        var self = Manager.model.self;
        var selfPos = new egret.Point(self.x, self.y);
        var startPos = this.rookieStartP;
        var endPos = this.rookieEndP;
        var distance = egret.Point.distance(selfPos, startPos);
        if (distance <= 50) {
            switch (type) {
                case WalkType.KITE:
                    var kite = Manager.model.getGameobject().getSceneEffByType(SceneEffCVO.TYPE_COMMON);
                    if (!kite)
                        return;
                    var self_1 = Manager.model.self.view;
                    if (!self_1)
                        return;
                    kite.view.parent.removeChild(kite.view);
                    kite.view.x = -200;
                    kite.view.y = -150;
                    self_1.addChildAt(kite.view, 0);
                    Manager.model.self.view.eventWalk([selfPos, endPos], type, this.playActionCallBack1, this);
                    break;
                case WalkType.WATER:
                    this.playWaterEff();
                    Manager.render.add(this.playWaterEff, this, 200, 0, null, true);
                    Manager.model.self.needCanYing = true;
                    Manager.model.self.view.eventWalk([selfPos, endPos], type, this.playActionCallBack2, this);
                    break;
                default:
                    Manager.model.self.view.eventWalk([selfPos, endPos], type, null, null);
                    break;
            }
        }
    };
    JumpPointGameObjectInfo.prototype.playActionCallBack1 = function () {
        Manager.view.show(118 /* CloudTransferEffect */);
    };
    JumpPointGameObjectInfo.prototype.playActionCallBack2 = function () {
        Manager.render.remove(this.playWaterEff, this);
        Manager.model.self.needCanYing = false;
        Manager.render.add(this.playActionCallBack3, this, 1000, 1, null, true);
    };
    JumpPointGameObjectInfo.prototype.playActionCallBack3 = function () {
        Manager.view.show(127 /* RollingWordsView */);
    };
    Object.defineProperty(JumpPointGameObjectInfo.prototype, "rookieStartP", {
        /**新手剧情动作起点 */
        get: function () {
            var startP;
            var arr = this._cvo.script.split("|");
            if (!arr || arr.length != 2)
                return null;
            var temp = ArrayUtil.parseStringToArray(arr[0], ",");
            if (!temp || temp.length != 2)
                return null;
            startP = new egret.Point(temp[0], temp[1]);
            return startP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JumpPointGameObjectInfo.prototype, "rookieEndP", {
        /**新手剧情动作终点 */
        get: function () {
            var endP;
            var arr = this._cvo.script.split("|");
            if (!arr || arr.length != 2)
                return null;
            var temp = ArrayUtil.parseStringToArray(arr[1], ",");
            if (!temp || temp.length != 2)
                return null;
            endP = new egret.Point(temp[0], temp[1]);
            return endP;
        },
        enumerable: true,
        configurable: true
    });
    JumpPointGameObjectInfo.prototype.playWaterEff = function () {
        var shuihua = Manager.animation.createEffectAnimation("shuihua", 0, true, true);
        var self = Manager.model.self;
        shuihua.x = -260 + self.x;
        shuihua.y = -390 + self.y;
        Manager.layer.elementLayer2.addChild(shuihua);
    };
    JumpPointGameObjectInfo.prototype.remove = function (onlyView, isImmediately) {
        if (isImmediately === void 0) { isImmediately = true; }
        _super.prototype.remove.call(this, onlyView, isImmediately);
        if (!onlyView)
            this._cvo = null;
    };
    JumpPointGameObjectInfo.prototype.getType = function () {
        return GameObjectType.JUMP_POINT;
    };
    JumpPointGameObjectInfo.prototype.createGameObject = function () {
        return null;
    };
    return JumpPointGameObjectInfo;
}(GameObjectInfo));
//# sourceMappingURL=JumpPointGameObjectInfo.js.map